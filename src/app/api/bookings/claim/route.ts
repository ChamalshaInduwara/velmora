import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ClaimRequest = {
  bookingReference?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function POST(
  request: Request
) {
  try {
    const session =
      await auth.api.getSession({
        headers: request.headers,
      });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You must be signed in to claim a booking.",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      (await request.json()) as ClaimRequest;

    const bookingReference =
      getString(
        body.bookingReference
      ).toUpperCase();

    if (!bookingReference) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Booking reference is required.",
        },
        {
          status: 400,
        }
      );
    }

    const accountEmail =
      session.user.email
        .trim()
        .toLowerCase();

    const booking =
      await prisma.booking.findUnique({
        where: {
          bookingReference,
        },

        include: {
          guest: true,
        },
      });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error:
            "We could not find that booking.",
        },
        {
          status: 404,
        }
      );
    }

    const bookingEmail =
      booking.guest.email
        .trim()
        .toLowerCase();

    if (
      bookingEmail !==
      accountEmail
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This booking was made using a different email address.",
        },
        {
          status: 403,
        }
      );
    }

    if (
      booking.accountUserId &&
      booking.accountUserId !==
        session.user.id
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This booking is already linked to another account.",
        },
        {
          status: 409,
        }
      );
    }

    if (
      booking.accountUserId ===
      session.user.id
    ) {
      return NextResponse.json(
        {
          success: true,
          alreadyClaimed: true,
          message:
            "This booking is already linked to your account.",
        }
      );
    }

    await prisma.$transaction(
      async (tx) => {
        await tx.booking.update({
          where: {
            id: booking.id,
          },

          data: {
            accountUserId:
              session.user.id,
          },
        });

        if (
          !booking.guest.userId
        ) {
          await tx.guest.update({
            where: {
              id: booking.guest.id,
            },

            data: {
              userId:
                session.user.id,
            },
          });
        } else if (
          booking.guest.userId !==
          session.user.id
        ) {
          throw new Error(
            "Guest profile is linked to another account."
          );
        }
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Booking linked to your account successfully.",
    });
  } catch (error) {
    console.error(
      "Booking claim failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not link this booking to your account.",
      },
      {
        status: 500,
      }
    );
  }
}