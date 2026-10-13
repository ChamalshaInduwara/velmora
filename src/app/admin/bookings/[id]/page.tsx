import Link from "next/link";

import {
  BedDouble,
  CalendarDays,
  CreditCard,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";

import { notFound } from "next/navigation";

import BookingStatusActions from "@/components/admin/booking-status-actions";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type AdminBookingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(
  value: Date
) {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      dateStyle: "medium",
      timeZone: "UTC",
    }
  ).format(value);
}

function formatStatus(
  value: string
) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
}

export default async function AdminBookingDetailsPage({
  params,
}: AdminBookingPageProps) {
  const { id } = await params;

  const booking =
    await prisma.booking.findUnique({
      where: {
        id,
      },

      include: {
        guest: true,

        bookingRooms: {
          include: {
            roomType: true,
            room: true,
          },
        },

        payments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!booking) {
    notFound();
  }

  const primaryRoom =
    booking.bookingRooms[0]
      ?.roomType;

  return (
    <div>
      <Link
        href="/admin/bookings"
        className="text-xs font-semibold tracking-[0.1em] text-[#14213D] underline underline-offset-4"
      >
        ← BACK TO BOOKINGS
      </Link>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
            BOOKING
          </p>

          <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
            {
              booking.bookingReference
            }
          </h1>

          <p className="mt-3 text-sm text-[#242424]/55">
            Created{" "}
            {formatDate(
              booking.createdAt
            )}
          </p>
        </div>

        <span className="inline-flex w-fit bg-white px-5 py-3 text-xs font-bold tracking-[0.1em] text-[#14213D]">
          {formatStatus(
            booking.status
          )}
        </span>
      </div>

      <div className="mt-10 grid gap-7 xl:grid-cols-[1fr_360px]">
        <div className="space-y-7">
          {/* Stay */}
          <section className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              STAY DETAILS
            </p>

            <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
              {primaryRoom?.name ??
                "Reservation"}
            </h2>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <CalendarDays
                  size={19}
                  className="text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    CHECK-IN
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(
                      booking.checkIn
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CalendarDays
                  size={19}
                  className="text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    CHECK-OUT
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(
                      booking.checkOut
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Users
                  size={19}
                  className="text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    GUESTS
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {
                      booking.adults
                    }{" "}
                    adults ·{" "}
                    {
                      booking.children
                    }{" "}
                    children
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <BedDouble
                  size={19}
                  className="text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    ROOM COUNT
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {
                      booking.numberOfRooms
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#D8CBB8]/70 pt-7">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#14213D]">
                ASSIGNED PHYSICAL ROOMS
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {booking.bookingRooms.map(
                  (bookingRoom) => (
                    <span
                      key={
                        bookingRoom.id
                      }
                      className="bg-[#F6F1E8] px-4 py-2 text-sm font-medium text-[#14213D]"
                    >
                      {bookingRoom
                        .room
                        ?.roomNumber ??
                        "Unassigned"}
                    </span>
                  )
                )}
              </div>
            </div>

            {booking.specialRequests && (
              <div className="mt-8 border-t border-[#D8CBB8]/70 pt-7">
                <p className="text-xs font-semibold tracking-[0.14em] text-[#14213D]">
                  SPECIAL REQUESTS
                </p>

                <p className="mt-3 text-sm leading-7 text-[#242424]/65">
                  {
                    booking.specialRequests
                  }
                </p>
              </div>
            )}
          </section>

          {/* Guest */}
          <section className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              GUEST
            </p>

            <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
              Guest Information
            </h2>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <User
                  size={19}
                  className="text-[#C9A227]"
                />

                <p className="text-sm font-medium">
                  {
                    booking.guest
                      .firstName
                  }{" "}
                  {
                    booking.guest
                      .lastName
                  }
                </p>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={19}
                  className="text-[#C9A227]"
                />

                <p className="break-all text-sm">
                  {
                    booking.guest
                      .email
                  }
                </p>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={19}
                  className="text-[#C9A227]"
                />

                <p className="text-sm">
                  {booking.guest
                    .phone ??
                    "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#242424]/45">
                  COUNTRY
                </p>

                <p className="mt-1 text-sm font-medium">
                  {booking.guest
                    .country ??
                    "Not provided"}
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-7">
          {/* Status */}
          <section className="border border-[#D8CBB8]/70 bg-white p-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              BOOKING STATUS
            </p>

            <p className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
              {formatStatus(
                booking.status
              )}
            </p>

            <div className="mt-6">
              <BookingStatusActions
                bookingId={
                  booking.id
                }
                currentStatus={
                  booking.status
                }
              />
            </div>
          </section>

          {/* Payment */}
          <section className="bg-[#14213D] p-6 text-white">
            <div className="flex gap-3">
              <CreditCard
                size={20}
                className="text-[#C9A227]"
              />

              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-[#C9A227]">
                  PAYMENT
                </p>

                <p className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold">
                  LKR{" "}
                  {booking.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {booking.payments.map(
              (payment) => (
                <div
                  key={
                    payment.id
                  }
                  className="mt-6 border-t border-white/15 pt-5 text-sm"
                >
                  <p className="text-white/60">
                    Method:{" "}
                    {formatStatus(
                      payment.method
                    )}
                  </p>

                  <p className="mt-2 text-white/60">
                    Status:{" "}
                    {formatStatus(
                      payment.status
                    )}
                  </p>
                </div>
              )
            )}
          </section>

          {/* Totals */}
          <section className="border border-[#D8CBB8]/70 bg-white p-6">
            <p className="text-xs text-[#242424]/45">
              SUBTOTAL
            </p>

            <p className="mt-2 font-semibold text-[#14213D]">
              LKR{" "}
              {booking.subtotal.toLocaleString()}
            </p>

            <div className="mt-5 border-t border-[#D8CBB8]/70 pt-5">
              <p className="text-xs text-[#242424]/45">
                TOTAL
              </p>

              <p className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                LKR{" "}
                {booking.totalAmount.toLocaleString()}
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}