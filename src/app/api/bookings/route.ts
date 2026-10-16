import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import {
  BookingStatus,
  PaymentMethod,
  PaymentStatus,
  Prisma,
  RoomStatus,
} from "@/generated/prisma/client";

import {
  calculateNights,
  parseBookingDate,
} from "@/lib/booking-utils";

import { sendBookingConfirmationEmail } from "@/lib/email/booking-confirmation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

class BookingRequestError extends Error {
  status: number;

  constructor(
    message: string,
    status = 400
  ) {
    super(message);
    this.status = status;
  }
}

type GuestInput = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  country?: unknown;
  specialRequests?: unknown;
};

type BookingRequestBody = {
  room?: unknown;
  checkIn?: unknown;
  checkOut?: unknown;
  adults?: unknown;
  children?: unknown;
  rooms?: unknown;
  paymentMethod?: unknown;
  guest?: GuestInput;
};

function getString(
  value: unknown
) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function createBookingReference() {
  const datePart = new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  const randomPart = randomUUID()
    .slice(0, 8)
    .toUpperCase();

  return `VLM-${datePart}-${randomPart}`;
}

export async function POST(
  request: Request
) {
  try {
    const session =
      await auth.api.getSession({
        headers: request.headers,
      });

    const body =
      (await request.json()) as BookingRequestBody;

    const roomSlug =
      getString(body.room);

    const checkInValue =
      getString(body.checkIn);

    const checkOutValue =
      getString(body.checkOut);

    const adults =
      Number(body.adults);

    const children =
      Number(body.children);

    const requestedRooms =
      Number(body.rooms);

    if (
      body.paymentMethod !==
      "PAY_AT_HOTEL"
    ) {
      throw new BookingRequestError(
        "The selected payment method is not currently supported."
      );
    }

    const guest = body.guest ?? {};

    const firstName =
      getString(guest.firstName);

    const lastName =
      getString(guest.lastName);

    const email =
      getString(
        guest.email
      ).toLowerCase();

    const authenticatedUserId =
      session &&
      session.user.email.toLowerCase() ===
        email
        ? session.user.id
        : null;

    const phone =
      getString(guest.phone);

    const country =
      getString(guest.country);

    const specialRequests =
      getString(
        guest.specialRequests
      );

    if (
      !roomSlug ||
      !checkInValue ||
      !checkOutValue
    ) {
      throw new BookingRequestError(
        "Booking information is incomplete."
      );
    }

    const checkIn =
      parseBookingDate(
        checkInValue
      );

    const checkOut =
      parseBookingDate(
        checkOutValue
      );

    if (
      !checkIn ||
      !checkOut ||
      checkOut <= checkIn
    ) {
      throw new BookingRequestError(
        "Invalid booking dates."
      );
    }

    const today = new Date();

    today.setUTCHours(
      0,
      0,
      0,
      0
    );

    if (checkIn < today) {
      throw new BookingRequestError(
        "Check-in cannot be in the past."
      );
    }

    if (
      !Number.isInteger(adults) ||
      adults < 1 ||
      !Number.isInteger(children) ||
      children < 0 ||
      !Number.isInteger(
        requestedRooms
      ) ||
      requestedRooms < 1
    ) {
      throw new BookingRequestError(
        "Invalid guest or room count."
      );
    }

    if (
      firstName.length < 2 ||
      lastName.length < 2
    ) {
      throw new BookingRequestError(
        "Please provide a valid guest name."
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email)
    ) {
      throw new BookingRequestError(
        "Please provide a valid email address."
      );
    }

    if (
      phone.length < 7 ||
      phone.length > 25
    ) {
      throw new BookingRequestError(
        "Please provide a valid phone number."
      );
    }

    if (!country) {
      throw new BookingRequestError(
        "Please provide the guest country."
      );
    }

    if (
      specialRequests.length >
      1000
    ) {
      throw new BookingRequestError(
        "Special requests are too long."
      );
    }

    const nights =
      calculateNights(
        checkIn,
        checkOut
      );

    const blockingStatuses: BookingStatus[] =
      [
        BookingStatus.PENDING,
        BookingStatus.CONFIRMED,
        BookingStatus.CHECKED_IN,
      ];

    const booking =
      await prisma.$transaction(
        async (tx) => {
          const hotel =
            await tx.hotel.findUnique({
              where: {
                slug: "velmora-hotel-resort",
              },
              select: {
                id: true,
              },
            });

          if (!hotel) {
            throw new BookingRequestError(
              "Velmora hotel record was not found.",
              500
            );
          }

          const roomType =
            await tx.roomType.findFirst({
              where: {
                hotelId:
                  hotel.id,
                slug: roomSlug,
                isActive: true,
              },
            });

          if (!roomType) {
            throw new BookingRequestError(
              "The selected room type is unavailable.",
              409
            );
          }

          const totalGuests =
            adults + children;

          if (
            roomType.capacity *
              requestedRooms <
            totalGuests
          ) {
            throw new BookingRequestError(
              "The selected rooms cannot accommodate all guests.",
              409
            );
          }

          /*
           * Final availability check.
           *
           * Select physical rooms that:
           * - belong to this room type
           * - are operational
           * - do not have an overlapping
           *   blocking reservation
           */
          const availableRooms =
            await tx.room.findMany({
              where: {
                hotelId:
                  hotel.id,

                roomTypeId:
                  roomType.id,

                status:
                  RoomStatus.AVAILABLE,

                bookingRooms: {
                  none: {
                    booking: {
                      status: {
                        in: blockingStatuses,
                      },

                      checkIn: {
                        lt: checkOut,
                      },

                      checkOut: {
                        gt: checkIn,
                      },
                    },
                  },
                },
              },

              orderBy: {
                roomNumber: "asc",
              },

              take: requestedRooms,
            });

          if (
            availableRooms.length <
            requestedRooms
          ) {
            throw new BookingRequestError(
              "The selected room is no longer available for these dates. Please search again.",
              409
            );
          }

          const databaseGuest =
            await tx.guest.upsert({
              where: {
                email,
              },

              update: {
                firstName,
                lastName,
                phone,
                country,
              },

              create: {
                firstName,
                lastName,
                email,
                phone,
                country,
              },
            });

          const pricePerNight =
            roomType.pricePerNight;

          const roomTotal =
            pricePerNight *
            nights;

          const subtotal =
            roomTotal *
            requestedRooms;

          const bookingReference =
            createBookingReference();

          return tx.booking.create({
            data: {
              bookingReference,

              hotelId:
                hotel.id,

              guestId:
                databaseGuest.id,

              accountUserId:
                authenticatedUserId,

              checkIn,
              checkOut,

              adults,
              children,

              numberOfRooms:
                requestedRooms,

              status:
                BookingStatus.CONFIRMED,

              subtotal,

              totalAmount:
                subtotal,

              specialRequests:
                specialRequests ||
                null,

              bookingRooms: {
                create:
                  availableRooms.map(
                    (room) => ({
                      roomTypeId:
                        roomType.id,

                      roomId:
                        room.id,

                      pricePerNight,

                      nights,

                      roomTotal,
                    })
                  ),
              },

              payments: {
                create: {
                  amount:
                    subtotal,

                  status:
                    PaymentStatus.INITIATED,

                  method:
                    PaymentMethod.PAY_AT_HOTEL,
                },
              },
            },

            select: {
              bookingReference:
                true,

              totalAmount:
                true,

              status:
                true,

              bookingRooms: {
                take: 1,

                select: {
                  roomType: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          });
        },
        {
          isolationLevel:
            Prisma
              .TransactionIsolationLevel
              .Serializable,

          maxWait: 5000,

          timeout: 10000,
        }
      );

    const roomName =
      booking.bookingRooms[0]
        ?.roomType.name ??
      "Velmora Room";

    try {
      await sendBookingConfirmationEmail({
        bookingReference:
          booking.bookingReference,

        guest: {
          firstName,
          lastName,
          email,
        },

        roomName,

        checkIn,
        checkOut,

        nights,

        adults,
        children,

        numberOfRooms:
          requestedRooms,

        totalAmount:
          booking.totalAmount,

        paymentMethod:
          "PAY_AT_HOTEL",
      });
    } catch (emailError) {
      console.error(
        "Booking was created, but confirmation email failed:",
        emailError
      );
    }

    return NextResponse.json(
      {
        success: true,

        bookingReference:
          booking.bookingReference,

        totalAmount:
          booking.totalAmount,

        status:
          booking.status,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (
      error instanceof
      BookingRequestError
    ) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: error.status,
        }
      );
    }

    const prismaCode =
      typeof error === "object" &&
      error !== null &&
      "code" in error
        ? String(
            (
              error as {
                code?: unknown;
              }
            ).code
          )
        : null;

    if (
      prismaCode === "P2034"
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Another reservation was created at the same time. Please check availability and try again.",
        },
        {
          status: 409,
        }
      );
    }

    console.error(
      "Booking creation failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          "We could not complete the booking. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}