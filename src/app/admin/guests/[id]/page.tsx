import Link from "next/link";

import {
  CalendarDays,
  CircleUserRound,
  Mail,
  MapPin,
  Phone,
  UserCheck,
} from "lucide-react";

import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const dynamic =
  "force-dynamic";

type AdminGuestDetailsPageProps = {
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

export default async function AdminGuestDetailsPage({
  params,
}: AdminGuestDetailsPageProps) {
  const { id } =
    await params;

  const guest =
    await prisma.guest.findUnique({
      where: {
        id,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },

        bookings: {
          include: {
            bookingRooms: {
              include: {
                roomType: {
                  select: {
                    name: true,
                    slug: true,
                  },
                },

                room: {
                  select: {
                    roomNumber:
                      true,
                  },
                },
              },
            },

            payments: {
              orderBy: {
                createdAt:
                  "desc",
              },

              take: 1,
            },
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!guest) {
    notFound();
  }

  const totalBookings =
    guest.bookings.length;

  const confirmedBookings =
    guest.bookings.filter(
      (booking) =>
        booking.status ===
          "CONFIRMED" ||
        booking.status ===
          "CHECKED_IN"
    ).length;

  const cancelledBookings =
    guest.bookings.filter(
      (booking) =>
        booking.status ===
        "CANCELLED"
    ).length;

  const completedBookings =
    guest.bookings.filter(
      (booking) =>
        booking.status ===
        "CHECKED_OUT"
    ).length;

  const bookingValue =
    guest.bookings
      .filter(
        (booking) =>
          booking.status !==
          "CANCELLED"
      )
      .reduce(
        (
          total,
          booking
        ) =>
          total +
          booking.totalAmount,
        0
      );

  return (
    <div>
      <Link
        href="/admin/guests"
        className="text-xs font-semibold tracking-[0.1em] text-[#14213D] underline underline-offset-4"
      >
        ← BACK TO GUESTS
      </Link>

      {/* Heading */}
      <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
            GUEST PROFILE
          </p>

          <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
            {guest.firstName}{" "}
            {guest.lastName}
          </h1>

          <p className="mt-3 text-sm text-[#242424]/55">
            Guest since{" "}
            {formatDate(
              guest.createdAt
            )}
          </p>
        </div>

        {guest.user ? (
          <div className="flex items-center gap-3 bg-green-50 px-5 py-3">
            <UserCheck
              size={18}
              className="text-green-700"
            />

            <span className="text-xs font-semibold tracking-[0.1em] text-green-800">
              ACCOUNT LINKED
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-white px-5 py-3">
            <CircleUserRound
              size={18}
              className="text-[#C9A227]"
            />

            <span className="text-xs font-semibold tracking-[0.1em] text-[#14213D]">
              GUEST ONLY
            </span>
          </div>
        )}
      </div>

      {/* Stats */}
      <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total Bookings"
          value={totalBookings}
        />

        <StatCard
          label="Active"
          value={confirmedBookings}
        />

        <StatCard
          label="Completed"
          value={completedBookings}
        />

        <StatCard
          label="Cancelled"
          value={cancelledBookings}
        />

        <article className="border border-[#D8CBB8]/70 bg-[#14213D] p-6 text-white">
          <p className="text-xs font-semibold tracking-[0.12em] text-white/45">
            BOOKING VALUE
          </p>

          <p className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#C9A227]">
            LKR{" "}
            {bookingValue.toLocaleString()}
          </p>
        </article>
      </section>

      <div className="mt-8 grid gap-7 xl:grid-cols-[1fr_340px]">
        <div className="space-y-7">
          {/* Contact */}
          <section className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              CONTACT DETAILS
            </p>

            <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
              Guest Information
            </h2>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <Mail
                  size={19}
                  className="shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    EMAIL
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-[#14213D]">
                    {guest.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={19}
                  className="shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    PHONE
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#14213D]">
                    {guest.phone ??
                      "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin
                  size={19}
                  className="shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    COUNTRY
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#14213D]">
                    {guest.country ??
                      "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Booking history */}
          <section>
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                RESERVATION HISTORY
              </p>

              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                Guest Bookings
              </h2>
            </div>

            {guest.bookings.length ===
            0 ? (
              <div className="border border-[#D8CBB8]/70 bg-white p-8 text-center">
                <CalendarDays
                  size={32}
                  strokeWidth={1.4}
                  className="mx-auto text-[#C9A227]"
                />

                <p className="mt-4 text-sm text-[#242424]/60">
                  This guest has no
                  reservation history.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {guest.bookings.map(
                  (booking) => {
                    const roomType =
                      booking
                        .bookingRooms[
                        0
                      ]?.roomType;

                    const roomNumbers =
                      booking.bookingRooms
                        .map(
                          (
                            bookingRoom
                          ) =>
                            bookingRoom
                              .room
                              ?.roomNumber
                        )
                        .filter(
                          Boolean
                        );

                    const payment =
                      booking
                        .payments[0];

                    return (
                      <article
                        key={
                          booking.id
                        }
                        className="border border-[#D8CBB8]/70 bg-white p-6"
                      >
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs text-[#242424]/45">
                              BOOKING
                              REFERENCE
                            </p>

                            <h3 className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                              {
                                booking.bookingReference
                              }
                            </h3>

                            <p className="mt-2 text-sm text-[#242424]/60">
                              {roomType?.name ??
                                "Room reservation"}
                            </p>
                          </div>

                          <span className="inline-flex w-fit bg-[#F6F1E8] px-3 py-2 text-xs font-semibold text-[#14213D]">
                            {formatStatus(
                              booking.status
                            )}
                          </span>
                        </div>

                        <div className="mt-6 grid gap-5 border-y border-[#D8CBB8]/60 py-5 sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <p className="text-xs text-[#242424]/45">
                              CHECK-IN
                            </p>

                            <p className="mt-1 text-sm font-medium text-[#14213D]">
                              {formatDate(
                                booking.checkIn
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-[#242424]/45">
                              CHECK-OUT
                            </p>

                            <p className="mt-1 text-sm font-medium text-[#14213D]">
                              {formatDate(
                                booking.checkOut
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-[#242424]/45">
                              ROOMS
                            </p>

                            <p className="mt-1 text-sm font-medium text-[#14213D]">
                              {
                                booking.numberOfRooms
                              }

                              {roomNumbers.length >
                                0 &&
                                ` · ${roomNumbers.join(
                                  ", "
                                )}`}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-[#242424]/45">
                              TOTAL
                            </p>

                            <p className="mt-1 text-sm font-medium text-[#14213D]">
                              LKR{" "}
                              {booking.totalAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="text-xs text-[#242424]/55">
                            {payment
                              ? `Payment: ${formatStatus(
                                  payment.method
                                )} · ${formatStatus(
                                  payment.status
                                )}`
                              : "No payment record"}
                          </div>

                          <Link
                            href={`/admin/bookings/${booking.id}`}
                            className="inline-flex min-h-10 items-center justify-center bg-[#14213D] px-5 text-xs font-semibold tracking-[0.08em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
                          >
                            VIEW BOOKING
                          </Link>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            )}
          </section>
        </div>

        {/* Account */}
        <aside className="h-fit border border-[#D8CBB8]/70 bg-white p-6 xl:sticky xl:top-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
            CUSTOMER ACCOUNT
          </p>

          {guest.user ? (
            <>
              <div className="mt-5 flex h-12 w-12 items-center justify-center bg-green-50">
                <UserCheck
                  size={22}
                  className="text-green-700"
                />
              </div>

              <h2 className="mt-5 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                Linked Account
              </h2>

              <div className="mt-6 space-y-5 border-t border-[#D8CBB8]/70 pt-6">
                <div>
                  <p className="text-xs text-[#242424]/45">
                    ACCOUNT NAME
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#14213D]">
                    {guest.user.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#242424]/45">
                    ACCOUNT EMAIL
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-[#14213D]">
                    {guest.user.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#242424]/45">
                    ROLE
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#14213D]">
                    {formatStatus(
                      guest.user.role
                    )}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-5 flex h-12 w-12 items-center justify-center bg-[#F6F1E8]">
                <CircleUserRound
                  size={22}
                  className="text-[#C9A227]"
                />
              </div>

              <h2 className="mt-5 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                Guest Checkout
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#242424]/60">
                This guest has not
                linked their hotel
                reservations to a
                Velmora customer
                account.
              </p>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: number;
};

function StatCard({
  label,
  value,
}: StatCardProps) {
  return (
    <article className="border border-[#D8CBB8]/70 bg-white p-6">
      <p className="text-xs font-semibold tracking-[0.12em] text-[#242424]/45">
        {label}
      </p>

      <p className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
        {value.toLocaleString()}
      </p>
    </article>
  );
}