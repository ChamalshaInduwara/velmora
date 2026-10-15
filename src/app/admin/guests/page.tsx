import Link from "next/link";

import {
  CircleUserRound,
  Mail,
  Search,
  UserCheck,
  Users,
} from "lucide-react";

import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type AdminGuestsPageProps = {
  searchParams: Promise<{
    q?: string;
    account?: string;
  }>;
};

export default async function AdminGuestsPage({
  searchParams,
}: AdminGuestsPageProps) {
  const params = await searchParams;

  const query =
    params.q?.trim() ?? "";

  const accountFilter =
    params.account ?? "";

  const where: Prisma.GuestWhereInput = {
    ...(query
      ? {
          OR: [
            {
              firstName: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),

    ...(accountFilter === "linked"
      ? {
          userId: {
            not: null,
          },
        }
      : {}),

    ...(accountFilter === "guest"
      ? {
          userId: null,
        }
      : {}),
  };

  const guests =
    await prisma.guest.findMany({
      where,

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },

        bookings: {
          select: {
            id: true,
            status: true,
            totalAmount: true,
            createdAt: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  const totalGuests =
    await prisma.guest.count();

  const linkedGuests =
    await prisma.guest.count({
      where: {
        userId: {
          not: null,
        },
      },
    });

  const guestOnlyCount =
    totalGuests - linkedGuests;

  const totalBookings =
    await prisma.booking.count();

  const stats = [
    {
      label: "Total Guests",
      value: totalGuests,
      icon: Users,
    },
    {
      label: "Account Linked",
      value: linkedGuests,
      icon: UserCheck,
    },
    {
      label: "Guest Only",
      value: guestOnlyCount,
      icon: CircleUserRound,
    },
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: Mail,
    },
  ];

  return (
    <div>
      <div>
        <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
          CUSTOMERS
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
          Guest Management
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#242424]/60">
          Search guests, review customer
          accounts and inspect complete
          reservation history.
        </p>
      </div>

      {/* Stats */}
      <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="border border-[#D8CBB8]/70 bg-white p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center bg-[#F6F1E8]">
                <Icon
                  size={20}
                  className="text-[#C9A227]"
                />
              </div>

              <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-[#242424]/45">
                {stat.label}
              </p>

              <p className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                {stat.value.toLocaleString()}
              </p>
            </article>
          );
        })}
      </section>

      {/* Search */}
      <form className="mt-10 grid gap-4 border border-[#D8CBB8]/70 bg-white p-5 md:grid-cols-[1fr_220px_auto]">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A227]"
          />

          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Name, email or phone..."
            className="h-12 w-full border border-[#D8CBB8] pl-11 pr-4 text-sm outline-none focus:border-[#C9A227]"
          />
        </div>

        <select
          name="account"
          defaultValue={accountFilter}
          className="h-12 border border-[#D8CBB8] bg-white px-4 text-sm outline-none focus:border-[#C9A227]"
        >
          <option value="">
            All guests
          </option>

          <option value="linked">
            Account linked
          </option>

          <option value="guest">
            Guest only
          </option>
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
          {guests.length} guest
          {guests.length === 1
            ? ""
            : "s"}{" "}
          found
        </p>

        {(query ||
          accountFilter) && (
          <Link
            href="/admin/guests"
            className="text-xs font-semibold text-[#14213D] underline underline-offset-4"
          >
            CLEAR FILTERS
          </Link>
        )}
      </div>

      {/* Guest table */}
      <div className="mt-6 overflow-x-auto border border-[#D8CBB8]/70 bg-white">
        <table className="w-full min-w-[980px] text-left">
          <thead className="bg-[#14213D] text-white">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                GUEST
              </th>

              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                CONTACT
              </th>

              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                ACCOUNT
              </th>

              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                BOOKINGS
              </th>

              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                BOOKING VALUE
              </th>

              <th className="px-5 py-4" />
            </tr>
          </thead>

          <tbody>
            {guests.map((guest) => {
              const activeBookings =
                guest.bookings.filter(
                  (booking) =>
                    booking.status !==
                    "CANCELLED"
                );

              const bookingValue =
                activeBookings.reduce(
                  (
                    total,
                    booking
                  ) =>
                    total +
                    booking.totalAmount,
                  0
                );

              return (
                <tr
                  key={guest.id}
                  className="border-t border-[#D8CBB8]/60"
                >
                  <td className="px-5 py-5">
                    <p className="font-semibold text-[#14213D]">
                      {guest.firstName}{" "}
                      {guest.lastName}
                    </p>

                    <p className="mt-1 text-xs text-[#242424]/45">
                      Guest since{" "}
                      {new Intl.DateTimeFormat(
                        "en-GB",
                        {
                          dateStyle:
                            "medium",
                        }
                      ).format(
                        guest.createdAt
                      )}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <p className="text-sm text-[#242424]">
                      {guest.email}
                    </p>

                    <p className="mt-1 text-xs text-[#242424]/45">
                      {guest.phone ??
                        "No phone"}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    {guest.user ? (
                      <span className="inline-flex bg-green-50 px-3 py-2 text-xs font-semibold text-green-800">
                        Linked
                      </span>
                    ) : (
                      <span className="inline-flex bg-[#F6F1E8] px-3 py-2 text-xs font-semibold text-[#242424]/60">
                        Guest Only
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-5 font-medium text-[#14213D]">
                    {
                      guest.bookings
                        .length
                    }
                  </td>

                  <td className="px-5 py-5 font-medium text-[#14213D]">
                    LKR{" "}
                    {bookingValue.toLocaleString()}
                  </td>

                  <td className="px-5 py-5">
                    <Link
                      href={`/admin/guests/${guest.id}`}
                      className="text-xs font-bold tracking-[0.08em] text-[#C9A227] transition hover:text-[#14213D]"
                    >
                      VIEW
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {guests.length === 0 && (
          <div className="p-10 text-center text-sm text-[#242424]/55">
            No guests matched your
            search.
          </div>
        )}
      </div>
    </div>
  );
}