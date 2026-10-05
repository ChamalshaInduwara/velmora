import type { Metadata } from "next";

import Link from "next/link";

import {
  BedDouble,
  CalendarDays,
  CreditCard,
  Mail,
  User,
  Users,
} from "lucide-react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/auth/sign-out-button";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title:
    "My Account | Velmora Hotel & Resort",

  description:
    "Manage your Velmora Hotel & Resort customer account.",
};

export const dynamic =
  "force-dynamic";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(value);
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function AccountPage() {
  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });

  if (!session) {
    redirect(
      "/sign-in"
    );
  }

  const bookings =
    await prisma.booking.findMany({
      where: {
        accountUserId: session.user.id,
      },
      include: {
        bookingRooms: {
          include: {
            roomType: {
              select: {
                name: true,
                slug: true,
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
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      <section className="bg-[#14213D] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            CUSTOMER ACCOUNT
          </p>

          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold sm:text-5xl">
            Welcome,{" "}
            {session.user.name}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
            Manage your Velmora
            account and reservation
            information.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              PROFILE
            </p>

            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
              Account Information
            </h2>

            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              <div className="flex gap-3">
                <User
                  size={19}
                  className="mt-0.5 shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    NAME
                  </p>

                  <p className="mt-1 font-medium text-[#14213D]">
                    {
                      session.user
                        .name
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={19}
                  className="mt-0.5 shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    EMAIL
                  </p>

                  <p className="mt-1 break-all font-medium text-[#14213D]">
                    {
                      session.user
                        .email
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 border-t border-[#D8CBB8]/70 pt-7">
              <SignOutButton />
            </div>
          </div>

          <section className="mt-12">
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                RESERVATIONS
              </p>

              <h2 className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                My Bookings
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#242424]/60">
                Reservations created while signed into this account appear
                here.
              </p>
            </div>

            {bookings.length === 0 ? (
              <div className="border border-[#D8CBB8]/70 bg-white p-8 text-center">
                <BedDouble
                  size={34}
                  strokeWidth={1.4}
                  className="mx-auto text-[#C9A227]"
                />

                <h3 className="mt-5 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                  No Account Bookings Yet
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#242424]/60">
                  Book your next stay while signed in and it will appear here
                  automatically.
                </p>

                <Link
                  href="/booking"
                  className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#C9A227] px-8 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white"
                >
                  BOOK YOUR STAY
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => {
                  const roomType = booking.bookingRooms[0]?.roomType;
                  const payment = booking.payments[0];

                  return (
                    <article
                      key={booking.id}
                      className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8"
                    >
                      <div className="flex flex-col gap-5 border-b border-[#D8CBB8]/70 pb-6 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs text-[#242424]/45">
                            BOOKING REFERENCE
                          </p>

                          <h3 className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                            {booking.bookingReference}
                          </h3>

                          {roomType && (
                            <p className="mt-2 text-sm text-[#242424]/60">
                              {roomType.name}
                            </p>
                          )}
                        </div>

                        <span className="inline-flex w-fit bg-[#F6F1E8] px-4 py-2 text-xs font-bold tracking-[0.1em] text-[#14213D]">
                          {formatStatus(booking.status)}
                        </span>
                      </div>

                      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex gap-3">
                          <CalendarDays
                            size={18}
                            className="shrink-0 text-[#C9A227]"
                          />
                          <div>
                            <p className="text-xs text-[#242424]/45">
                              CHECK-IN
                            </p>
                            <p className="mt-1 text-sm font-medium text-[#14213D]">
                              {formatDate(booking.checkIn)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <CalendarDays
                            size={18}
                            className="shrink-0 text-[#C9A227]"
                          />
                          <div>
                            <p className="text-xs text-[#242424]/45">
                              CHECK-OUT
                            </p>
                            <p className="mt-1 text-sm font-medium text-[#14213D]">
                              {formatDate(booking.checkOut)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Users
                            size={18}
                            className="shrink-0 text-[#C9A227]"
                          />
                          <div>
                            <p className="text-xs text-[#242424]/45">GUESTS</p>
                            <p className="mt-1 text-sm font-medium text-[#14213D]">
                              {booking.adults + booking.children}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <CreditCard
                            size={18}
                            className="shrink-0 text-[#C9A227]"
                          />
                          <div>
                            <p className="text-xs text-[#242424]/45">TOTAL</p>
                            <p className="mt-1 text-sm font-medium text-[#14213D]">
                              LKR {booking.totalAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-7 flex flex-col gap-4 border-t border-[#D8CBB8]/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm text-[#242424]/60">
                          {payment && (
                            <>
                              Payment:{" "}
                              <span className="font-medium text-[#14213D]">
                                {formatStatus(payment.method)} ·{" "}
                                {formatStatus(payment.status)}
                              </span>
                            </>
                          )}
                        </div>

                        {roomType && (
                          <Link
                            href={`/rooms/${roomType.slug}`}
                            className="inline-flex min-h-11 items-center justify-center border border-[#14213D] px-6 text-xs font-semibold tracking-[0.1em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white"
                          >
                            VIEW ROOM
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <section className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              PREVIOUS BOOKINGS
            </p>

            <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
              Looking for an older reservation?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#242424]/65">
              Reservations made before signing into your account can still be
              accessed using your booking reference and booking email.
            </p>

            <Link
              href="/my-booking"
              className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#14213D] px-6 text-xs font-semibold tracking-[0.12em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
            >
              FIND EXISTING BOOKING
            </Link>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
