import { NextResponse } from "next/server";

import {
  BookingStatus,
  RoomStatus,
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

    const requestedStatus =
      typeof body.status === "string"
        ? body.status
        : "";

    const validStatuses =
      Object.values(RoomStatus);

    if (
      !validStatuses.includes(
        requestedStatus as RoomStatus
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid room status.",
        },
        {
          status: 400,
        }
      );
    }

    const newStatus =
      requestedStatus as RoomStatus;

    const room =
      await prisma.room.findUnique({
        where: {
          id,
        },

        include: {
          roomType: {
            select: {
              name: true,
            },
          },
        },
      });

    if (!room) {
      return NextResponse.json(
        {
          success: false,
          error: "Room not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      room.status === newStatus
    ) {
      return NextResponse.json({
        success: true,
        status: room.status,
      });
    }

    /*
     * Before taking a room out of service,
     * check whether it has a current or
     * future blocking reservation.
     */
    if (
      newStatus === RoomStatus.MAINTENANCE ||
      newStatus === RoomStatus.INACTIVE
    ) {
      const now = new Date();

      const activeReservation =
        await prisma.bookingRoom.findFirst({
          where: {
            roomId: room.id,

            booking: {
              status: {
                in: [
                  BookingStatus.PENDING,
                  BookingStatus.CONFIRMED,
                  BookingStatus.CHECKED_IN,
                ],
              },

              checkOut: {
                gt: now,
              },
            },
          },

          include: {
            booking: {
              select: {
                bookingReference: true,
                checkIn: true,
                checkOut: true,
                status: true,
              },
            },
          },
        });

      if (activeReservation) {
        return NextResponse.json(
          {
            success: false,

            error:
              `Room ${room.roomNumber} cannot be moved to ${newStatus} because it is assigned to booking ${activeReservation.booking.bookingReference}.`,
          },
          {
            status: 409,
          }
        );
      }
    }

    const updatedRoom =
      await prisma.room.update({
        where: {
          id: room.id,
        },

        data: {
          status: newStatus,
        },

        select: {
          id: true,
          roomNumber: true,
          status: true,
        },
      });

    return NextResponse.json({
      success: true,
      room: updatedRoom,
    });
  } catch (error) {
    console.error(
      "Admin room status update failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "The room status could not be updated.",
      },
      {
        status: 500,
      }
    );
  }
}
