import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type LookupRequest = {
  bookingReference?: unknown;
  email?: unknown;
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
    const body =
      (await request.json()) as LookupRequest;

    const bookingReference =
      getString(
        body.bookingReference
      ).toUpperCase();

    const email =
      getString(
        body.email
      ).toLowerCase();

    if (
      !bookingReference ||
      !email
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Booking reference and email address are required.",
        },
        {
          status: 400,
        }
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    const booking =
      await prisma.booking.findFirst({
        where: {
          bookingReference,

          guest: {
            email,
          },
        },

        include: {
          guest: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },

          bookingRooms: {
            include: {
              roomType: {
                select: {
                  name: true,
                  slug: true,
                  bedType: true,
                  sizeSqm: true,
                  imageUrl: true,
                },
              },
            },
          },

          payments: {
            orderBy: {
              createdAt: "desc",
            },

            take: 1,
          },
        },
      });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error:
            "We could not find a booking matching that reference and email address.",
        },
        {
          status: 404,
        }
      );
    }

    const payment =
      booking.payments[0] ?? null;

    const roomType =
      booking.bookingRooms[0]
        ?.roomType ?? null;

    return NextResponse.json({
      success: true,

      booking: {
        bookingReference:
          booking.bookingReference,

        status:
          booking.status,

        checkIn:
          booking.checkIn.toISOString(),

        checkOut:
          booking.checkOut.toISOString(),

        adults:
          booking.adults,

        children:
          booking.children,

        numberOfRooms:
          booking.numberOfRooms,

        subtotal:
          booking.subtotal,

        totalAmount:
          booking.totalAmount,

        specialRequests:
          booking.specialRequests,

        createdAt:
          booking.createdAt.toISOString(),

        guest: {
          firstName:
            booking.guest.firstName,

          lastName:
            booking.guest.lastName,

          email:
            booking.guest.email,
        },

        room: roomType
          ? {
              name:
                roomType.name,

              slug:
                roomType.slug,

              bedType:
                roomType.bedType,

              sizeSqm:
                roomType.sizeSqm,

              imageUrl:
                roomType.imageUrl,
            }
          : null,

        payment: payment
          ? {
              method:
                payment.method,

              status:
                payment.status,

              amount:
                payment.amount,
            }
          : null,
      },
    });
  } catch (error) {
    console.error(
      "Booking lookup failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not retrieve the booking. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}