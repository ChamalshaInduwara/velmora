import {
  BedDouble,
  BookOpenCheck,
  CircleDollarSign,
  Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic =
  "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    bookingCount,
    confirmedBookings,
    guestCount,
    roomCount,
    revenueData,
  ] = await Promise.all([
    prisma.booking.count(),

    prisma.booking.count({
      where: {
        status:
          "CONFIRMED",
      },
    }),

    prisma.guest.count(),

    prisma.room.count({
      where: {
        status:
          "AVAILABLE",
      },
    }),

    prisma.booking.aggregate({
      where: {
        status: {
          in: [
            "CONFIRMED",
            "CHECKED_IN",
            "CHECKED_OUT",
          ],
        },
      },

      _sum: {
        totalAmount: true,
      },
    }),
  ]);

  const estimatedRevenue =
    revenueData._sum
      .totalAmount ?? 0;

  const stats = [
    {
      label:
        "Total Bookings",
      value:
        bookingCount.toLocaleString(),
      icon:
        BookOpenCheck,
    },
    {
      label:
        "Confirmed",
      value:
        confirmedBookings.toLocaleString(),
      icon:
        BookOpenCheck,
    },
    {
      label:
        "Guests",
      value:
        guestCount.toLocaleString(),
      icon: Users,
    },
    {
      label:
        "Operational Rooms",
      value:
        roomCount.toLocaleString(),
      icon:
        BedDouble,
    },
  ];

  return (
    <div>
      <div>
        <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
          OVERVIEW
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
          Hotel Dashboard
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#242424]/60">
          Monitor Velmora
          reservations, guests
          and room operations.
        </p>
      </div>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(
          (stat) => {
            const Icon =
              stat.icon;

            return (
              <article
                key={
                  stat.label
                }
                className="border border-[#D8CBB8]/70 bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center bg-[#F6F1E8]">
                  <Icon
                    size={20}
                    className="text-[#C9A227]"
                  />
                </div>

                <p className="mt-6 text-xs font-semibold tracking-[0.12em] text-[#242424]/45">
                  {
                    stat.label
                  }
                </p>

                <p className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                  {
                    stat.value
                  }
                </p>
              </article>
            );
          }
        )}
      </section>

      <section className="mt-6 border border-[#D8CBB8]/70 bg-[#14213D] p-7 text-white">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#C9A227]">
            <CircleDollarSign
              size={22}
              className="text-[#14213D]"
            />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/50">
              BOOKING VALUE
            </p>

            <p className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#C9A227]">
              LKR{" "}
              {estimatedRevenue.toLocaleString()}
            </p>

            <p className="mt-2 text-xs leading-6 text-white/50">
              Total value of
              active and completed
              reservations. This is
              not necessarily
              collected revenue.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}