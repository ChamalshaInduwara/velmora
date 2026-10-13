import { NextResponse } from "next/server";

import {
  BookingStatus,
  PaymentStatus,
} from "@/generated/prisma/client";

import { getAdminFromRequest } from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type StatusRequest = {
  status?: unknown;
};

const allowedTransitions: Record<
  BookingStatus,
  BookingStatus[]
> = {
  PENDING: [
    BookingStatus.CONFIRMED,
    BookingStatus.CANCELLED,
  ],

  CONFIRMED: [
    BookingStatus.CHECKED_IN,
    BookingStatus.CANCELLED,
  ],

  CHECKED_IN: [
    BookingStatus.CHECKED_OUT,
  ],

  CHECKED_OUT: [],

  CANCELLED: [],
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { session, admin } =
      await getAdminFromRequest(request);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: "Administrator access required.",
        },
        {
          status: 403,
        }
      );
    }

    const { id } = await context.params;

    const body =
      (await request.json()) as StatusRequest;

    const requestedStatus =
      typeof body.status === "string"
        ? body.status
        : "";

    const validStatuses =
      Object.values(BookingStatus);

    if (
      !validStatuses.includes(
        requestedStatus as BookingStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid booking status.",
        },
        {
          status: 400,
        }
      );
    }

    const newStatus =
      requestedStatus as BookingStatus;

    const booking =
      await prisma.booking.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
          bookingReference: true,
          status: true,
        },
      });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (booking.status === newStatus) {
      return NextResponse.json({
        success: true,
        status: booking.status,
      });
    }

    const allowed =
      allowedTransitions[
        booking.status
      ];

    if (!allowed.includes(newStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: `Booking cannot move from ${booking.status} to ${newStatus}.`,
        },
        {
          status: 409,
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
            status: newStatus,
          },
        });

        /*
         * If an unpaid Pay-at-Hotel
         * reservation is cancelled,
         * cancel its pending payment
         * record too.
         */
        if (
          newStatus ===
          BookingStatus.CANCELLED
        ) {
          await tx.payment.updateMany({
            where: {
              bookingId: booking.id,

              status:
                PaymentStatus.INITIATED,
            },

            data: {
              status:
                PaymentStatus.CANCELLED,
            },
          });
        }
      }
    );

    return NextResponse.json({
      success: true,
      bookingReference:
        booking.bookingReference,
      status: newStatus,
    });
  } catch (error) {
    console.error(
      "Admin booking status update failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "The booking status could not be updated.",
      },
      {
        status: 500,
      }
    );
  }
}