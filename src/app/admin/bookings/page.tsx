import Link from "next/link";

import {
  BookingStatus,
  Prisma,
} from "@/generated/prisma/client";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type AdminBookingsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
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

export default async function AdminBookingsPage({
  searchParams,
}: AdminBookingsPageProps) {
  const params =
    await searchParams;

  const query =
    params.q?.trim() ?? "";

  const statusValue =
    params.status ?? "";

  const validStatuses =
    Object.values(BookingStatus);

  const selectedStatus =
    validStatuses.includes(
      statusValue as BookingStatus
    )
      ? (statusValue as BookingStatus)
      : null;

  const where:
    Prisma.BookingWhereInput = {
    ...(selectedStatus
      ? {
          status:
            selectedStatus,
        }
      : {}),

    ...(query
      ? {
          OR: [
            {
              bookingReference: {
                contains:
                  query,
                mode:
                  "insensitive",
              },
            },

            {
              guest: {
                is: {
                  firstName: {
                    contains:
                      query,
                    mode:
                      "insensitive",
                  },
                },
              },
            },

            {
              guest: {
                is: {
                  lastName: {
                    contains:
                      query,
                    mode:
                      "insensitive",
                  },
                },
              },
            },

            {
              guest: {
                is: {
                  email: {
                    contains:
                      query,
                    mode:
                      "insensitive",
                  },
                },
              },
            },
          ],
        }
      : {}),
  };

  const bookings =
    await prisma.booking.findMany({
      where,

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

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div>
      <div>
        <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
          RESERVATIONS
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
          Booking Management
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#242424]/60">
          Search and manage Velmora
          guest reservations.
        </p>
      </div>

      {/* Search */}
      <form className="mt-10 grid gap-4 border border-[#D8CBB8]/70 bg-white p-5 md:grid-cols-[1fr_220px_auto]">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Reference, guest or email..."
          className="h-12 border border-[#D8CBB8] px-4 text-sm outline-none focus:border-[#C9A227]"
        />

        <select
          name="status"
          defaultValue={
            selectedStatus ?? ""
          }
          className="h-12 border border-[#D8CBB8] bg-white px-4 text-sm outline-none focus:border-[#C9A227]"
        >
          <option value="">
            All statuses
          </option>

          {validStatuses.map(
            (status) => (
              <option
                key={status}
                value={status}
              >
                {formatStatus(
                  status
                )}
              </option>
            )
          )}
        </select>

        <button
          type="submit"
          className="h-12 bg-[#14213D] px-7 text-xs font-bold tracking-[0.12em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
        >
          SEARCH
        </button>
      </form>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-[#242424]/55">
          {bookings.length} booking
          {bookings.length === 1
            ? ""
            : "s"}{" "}
          found
        </p>

        {(query ||
          selectedStatus) && (
          <Link
            href="/admin/bookings"
            className="text-xs font-semibold text-[#14213D] underline underline-offset-4"
          >
            CLEAR FILTERS
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto border border-[#D8CBB8]/70 bg-white">
        <table className="w-full min-w-[1000px] text-left">
          <thead className="bg-[#14213D] text-white">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                REFERENCE
              </th>

              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                GUEST
              </th>

              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                ROOM
              </th>

              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                STAY
              </th>

              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                TOTAL
              </th>

              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                STATUS
              </th>

              <th className="px-5 py-4" />
            </tr>
          </thead>

          <tbody>
            {bookings.map(
              (booking) => {
                const roomType =
                  booking
                    .bookingRooms[0]
                    ?.roomType;

                return (
                  <tr
                    key={
                      booking.id
                    }
                    className="border-t border-[#D8CBB8]/60"
                  >
                    <td className="px-5 py-5">
                      <p className="font-medium text-[#14213D]">
                        {
                          booking.bookingReference
                        }
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="text-sm font-medium text-[#242424]">
                        {
                          booking
                            .guest
                            .firstName
                        }{" "}
                        {
                          booking
                            .guest
                            .lastName
                        }
                      </p>

                      <p className="mt-1 text-xs text-[#242424]/45">
                        {
                          booking
                            .guest
                            .email
                        }
                      </p>
                    </td>

                    <td className="px-5 py-5 text-sm text-[#242424]/70">
                      {roomType?.name ??
                        "—"}
                    </td>

                    <td className="px-5 py-5 text-sm text-[#242424]/70">
                      {formatDate(
                        booking.checkIn
                      )}

                      <br />

                      <span className="text-xs text-[#242424]/40">
                        to
                      </span>

                      <br />

                      {formatDate(
                        booking.checkOut
                      )}
                    </td>

                    <td className="px-5 py-5 font-medium text-[#14213D]">
                      LKR{" "}
                      {booking.totalAmount.toLocaleString()}
                    </td>

                    <td className="px-5 py-5">
                      <span className="inline-flex bg-[#F6F1E8] px-3 py-2 text-xs font-semibold text-[#14213D]">
                        {formatStatus(
                          booking.status
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="text-xs font-bold tracking-[0.08em] text-[#C9A227] transition hover:text-[#14213D]"
                      >
                        VIEW
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>

        {bookings.length ===
          0 && (
          <div className="p-10 text-center text-sm text-[#242424]/55">
            No bookings matched
            your search.
          </div>
        )}
      </div>
    </div>
  );
}