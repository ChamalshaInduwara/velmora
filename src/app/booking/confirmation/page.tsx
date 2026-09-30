import type { Metadata } from "next";

import Link from "next/link";

import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Hotel,
  Users,
} from "lucide-react";

import BookingSteps from "@/components/booking/booking-steps";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title:
    "Booking Confirmation | Velmora Hotel & Resort",

  description:
    "Your Velmora Hotel & Resort reservation confirmation.",
};

export const dynamic =
  "force-dynamic";

type ConfirmationPageProps = {
  searchParams: Promise<{
    reference?: string;
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

export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const params =
    await searchParams;

  const reference =
    params.reference?.trim();

  const booking = reference
    ? await prisma.booking.findUnique({
        where: {
          bookingReference:
            reference,
        },

        include: {
          guest: true,

          bookingRooms: {
            include: {
              roomType: true,
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
      })
    : null;

  if (!booking) {
    return (
      <main className="bg-[#F6F1E8]">
        <TopBar />
        <Navbar />

        <BookingSteps
          currentStep={5}
        />

        <section className="px-4 py-24">
          <div className="mx-auto max-w-2xl bg-white p-8 text-center">
            <h1 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
              Confirmation Not
              Found
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#242424]/70">
              We could not find this
              reservation.
            </p>

            <Link
              href="/booking"
              className="mt-7 inline-flex min-h-12 items-center bg-[#C9A227] px-7 text-xs font-bold text-[#14213D]"
            >
              BOOK A STAY
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const payment =
    booking.payments[0];

  const roomType =
    booking.bookingRooms[0]
      ?.roomType;

  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      <BookingSteps
        currentStep={5}
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white p-6 text-center sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A227]">
              <CheckCircle2
                size={32}
                className="text-[#14213D]"
              />
            </div>

            <p className="mt-7 text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              RESERVATION
              CONFIRMED
            </p>

            <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
              Thank You,{" "}
              {
                booking.guest
                  .firstName
              }
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#242424]/65">
              Your stay at Velmora
              Hotel & Resort has
              been reserved
              successfully.
            </p>

            <div className="mx-auto mt-8 max-w-md border border-[#C9A227]/50 bg-[#F6F1E8] p-5">
              <p className="text-xs tracking-[0.16em] text-[#242424]/50">
                BOOKING REFERENCE
              </p>

              <p className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                {
                  booking.bookingReference
                }
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <section className="bg-white p-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                STAY DETAILS
              </p>

              <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                {roomType?.name ??
                  "Velmora Room"}
              </h2>

              <div className="mt-7 space-y-6">
                <div className="flex gap-3">
                  <CalendarDays
                    size={18}
                    className="text-[#C9A227]"
                  />

                  <div>
                    <p className="text-xs text-[#242424]/45">
                      DATES
                    </p>

                    <p className="mt-1 text-sm">
                      {formatDate(
                        booking.checkIn
                      )}
                      {" → "}
                      {formatDate(
                        booking.checkOut
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Users
                    size={18}
                    className="text-[#C9A227]"
                  />

                  <div>
                    <p className="text-xs text-[#242424]/45">
                      GUESTS
                    </p>

                    <p className="mt-1 text-sm">
                      {
                        booking.adults
                      }{" "}
                      adult
                      {booking.adults ===
                      1
                        ? ""
                        : "s"}

                      {booking.children >
                      0
                        ? `, ${booking.children} child${
                            booking.children ===
                            1
                              ? ""
                              : "ren"
                          }`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Hotel
                    size={18}
                    className="text-[#C9A227]"
                  />

                  <div>
                    <p className="text-xs text-[#242424]/45">
                      ROOMS
                    </p>

                    <p className="mt-1 text-sm">
                      {
                        booking.numberOfRooms
                      }{" "}
                      room
                      {booking.numberOfRooms ===
                      1
                        ? ""
                        : "s"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#14213D] p-7 text-white">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                PAYMENT
              </p>

              <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold">
                Pay at Hotel
              </h2>

              <div className="mt-7 flex gap-3">
                <CreditCard
                  size={19}
                  className="text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-white/45">
                    AMOUNT DUE
                  </p>

                  <p className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#C9A227]">
                    LKR{" "}
                    {booking.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="mt-7 text-sm leading-7 text-white/65">
                Payment will be
                collected at the
                hotel.
              </p>

              {payment && (
                <p className="mt-4 text-xs text-white/45">
                  Payment record:{" "}
                  {
                    payment.status
                  }
                </p>
              )}
            </section>
          </div>

          <div className="mt-8 bg-white p-7">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              PRIMARY GUEST
            </p>

            <p className="mt-3 font-semibold text-[#14213D]">
              {
                booking.guest
                  .firstName
              }{" "}
              {
                booking.guest
                  .lastName
              }
            </p>

            <p className="mt-2 text-sm text-[#242424]/65">
              {
                booking.guest
                  .email
              }
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center bg-[#14213D] px-8 text-xs font-bold tracking-[0.14em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
            >
              RETURN HOME
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}