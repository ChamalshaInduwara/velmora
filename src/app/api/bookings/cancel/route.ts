import { NextResponse } from "next/server";

import {
  BookingStatus,
  PaymentStatus,
} from "@/generated/prisma/client";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type CancelBookingRequest = {
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
      (await request.json()) as CancelBookingRequest;

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

    const booking =
      await prisma.booking.findFirst({
        where: {
          bookingReference,

          guest: {
            email,
          },
        },

        include: {
          payments: true,
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

    if (
      booking.status ===
      BookingStatus.CANCELLED
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This booking has already been cancelled.",
        },
        {
          status: 409,
        }
      );
    }

    if (
      booking.status ===
        BookingStatus.CHECKED_IN ||
      booking.status ===
        BookingStatus.CHECKED_OUT
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This booking can no longer be cancelled online.",
        },
        {
          status: 409,
        }
      );
    }

    const today = new Date();

    today.setUTCHours(
      0,
      0,
      0,
      0
    );

    if (
      booking.checkIn <= today
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Bookings cannot be cancelled online on or after the check-in date.",
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
            status:
              BookingStatus.CANCELLED,
          },
        });

        await tx.payment.updateMany({
          where: {
            bookingId:
              booking.id,

            status:
              PaymentStatus.INITIATED,
          },

          data: {
            status:
              PaymentStatus.CANCELLED,
          },
        });
      }
    );

    return NextResponse.json({
      success: true,
      status:
        BookingStatus.CANCELLED,
      message:
        "Your booking has been cancelled successfully.",
    });
  } catch (error) {
    console.error(
      "Booking cancellation failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not cancel the booking. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}