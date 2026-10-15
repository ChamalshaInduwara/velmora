import { NextResponse } from "next/server";

import {
  BookingStatus,
  PaymentMethod,
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
          error:
            "Administrator access required.",
        },
        {
          status: 403,
        }
      );
    }

    const { id } = await context.params;

    const body =
      (await request.json()) as StatusRequest;

    if (body.status !== "PAID") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only marking a payment as paid is supported here.",
        },
        {
          status: 400,
        }
      );
    }

    const payment =
      await prisma.payment.findUnique({
        where: {
          id,
        },

        include: {
          booking: {
            select: {
              id: true,
              bookingReference: true,
              status: true,
            },
          },
        },
      });

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      payment.method !==
      PaymentMethod.PAY_AT_HOTEL
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Online card payments must be updated by the payment gateway.",
        },
        {
          status: 409,
        }
      );
    }

    if (
      payment.status ===
      PaymentStatus.PAID
    ) {
      return NextResponse.json({
        success: true,
        status:
          PaymentStatus.PAID,
      });
    }

    if (
      payment.status !==
      PaymentStatus.INITIATED
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            `Payment cannot move from ${payment.status} to PAID.`,
        },
        {
          status: 409,
        }
      );
    }

    if (
      payment.booking.status ===
      BookingStatus.CANCELLED
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A cancelled booking cannot be marked as paid.",
        },
        {
          status: 409,
        }
      );
    }

    const updatedPayment =
      await prisma.payment.update({
        where: {
          id: payment.id,
        },

        data: {
          status:
            PaymentStatus.PAID,

          paidAt:
            new Date(),
        },

        select: {
          id: true,
          amount: true,
          status: true,
          paidAt: true,
        },
      });

    return NextResponse.json({
      success: true,
      payment:
        updatedPayment,
    });
  } catch (error) {
    console.error(
      "Admin payment update failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "The payment could not be updated.",
      },
      {
        status: 500,
      }
    );
  }
}