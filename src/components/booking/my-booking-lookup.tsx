"use client";

import Image from "next/image";
import Link from "next/link";

import {
  BedDouble,
  CalendarDays,
  CreditCard,
  LoaderCircle,
  Search,
  Users,
} from "lucide-react";

import {
  FormEvent,
  useState,
} from "react";

type BookingResult = {
  bookingReference: string;
  status: string;

  checkIn: string;
  checkOut: string;

  adults: number;
  children: number;

  numberOfRooms: number;

  subtotal: number;
  totalAmount: number;

  specialRequests:
    | string
    | null;

  createdAt: string;

  guest: {
    firstName: string;
    lastName: string;
    email: string;
  };

  room: {
    name: string;
    slug: string;
    bedType: string;
    sizeSqm:
      | number
      | null;
    imageUrl:
      | string
      | null;
  } | null;

  payment: {
    method: string;
    status: string;
    amount: number;
  } | null;
};

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      dateStyle: "medium",
      timeZone: "UTC",
    }
  ).format(
    new Date(value)
  );
}

function formatStatus(
  value: string
) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

export default function MyBookingLookup() {
  const [
    bookingReference,
    setBookingReference,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    cancelling,
    setCancelling,
  ] = useState(false);

  const [
    cancellationMessage,
    setCancellationMessage,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [booking, setBooking] =
    useState<BookingResult | null>(
      null
    );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setCancellationMessage("");
    setBooking(null);

    if (
      !bookingReference.trim()
    ) {
      setError(
        "Please enter your booking reference."
      );
      return;
    }

    if (!email.trim()) {
      setError(
        "Please enter the email address used for the booking."
      );
      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/bookings/lookup",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              bookingReference:
                bookingReference.trim(),

              email:
                email.trim(),
            }),
          }
        );

      const data =
        (await response.json()) as {
          success?: boolean;
          booking?:
            BookingResult;
          error?: string;
        };

      if (
        !response.ok ||
        !data.booking
      ) {
        setError(
          data.error ??
            "Booking not found."
        );
        return;
      }

      setBooking(
        data.booking
      );
    } catch {
      setError(
        "Unable to connect to the booking service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCancellation() {
    if (!booking) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to cancel booking ${booking.bookingReference}?`
      );

    if (!confirmed) {
      return;
    }

    setError("");
    setCancellationMessage("");
    setCancelling(true);

    try {
      const response =
        await fetch(
          "/api/bookings/cancel",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              bookingReference:
                booking.bookingReference,

              email:
                email.trim(),
            }),
          }
        );

      const data =
        (await response.json()) as {
          success?: boolean;
          status?: string;
          message?: string;
          error?: string;
        };

      if (
        !response.ok ||
        !data.success
      ) {
        setError(
          data.error ??
            "The booking could not be cancelled."
        );

        return;
      }

      setBooking((current) =>
        current
          ? {
              ...current,
              status:
                "CANCELLED",

              payment:
                current.payment &&
                current.payment.status ===
                  "INITIATED"
                  ? {
                      ...current.payment,
                      status:
                        "CANCELLED",
                    }
                  : current.payment,
            }
          : current
      );

      setCancellationMessage(
        data.message ??
          "Your booking has been cancelled successfully."
      );
    } catch {
      setError(
        "Unable to connect to the booking service. Please try again."
      );
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* Search */}
      <form
        onSubmit={handleSubmit}
        className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="booking-reference"
              className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
            >
              BOOKING REFERENCE
            </label>

            <input
              id="booking-reference"
              type="text"
              value={
                bookingReference
              }
              onChange={(event) =>
                setBookingReference(
                  event.target.value
                )
              }
              placeholder="VLM-20261002-XXXXXXXX"
              className="h-12 w-full border border-[#D8CBB8] px-4 text-sm uppercase outline-none transition focus:border-[#C9A227]"
            />
          </div>

          <div>
            <label
              htmlFor="booking-email"
              className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
            >
              BOOKING EMAIL
            </label>

            <input
              id="booking-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="you@example.com"
              className="h-12 w-full border border-[#D8CBB8] px-4 text-sm outline-none transition focus:border-[#C9A227]"
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-5 border-l-4 border-red-700 bg-red-50 px-5 py-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex min-h-12 items-center justify-center gap-3 bg-[#C9A227] px-8 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle
                size={17}
                className="animate-spin"
              />

              FINDING BOOKING...
            </>
          ) : (
            <>
              <Search size={17} />

              FIND MY BOOKING
            </>
          )}
        </button>
      </form>

      {/* Result */}
      {booking && (
        <article className="overflow-hidden border border-[#D8CBB8]/70 bg-white">
          {booking.room && (
            <div className="relative h-[280px]">
              <Image
                src={
                  booking.room
                    .imageUrl ??
                  "/images/rooms/deluxe-king.jpg"
                }
                alt={
                  booking.room.name
                }
                fill
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/80 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 text-white sm:p-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                  YOUR RESERVATION
                </p>

                <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold">
                  {
                    booking.room
                      .name
                  }
                </h2>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8">
            {cancellationMessage && (
              <div className="mb-7 border-l-4 border-green-700 bg-green-50 px-5 py-4">
                <p className="text-sm font-medium text-green-800">
                  {cancellationMessage}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-6 border-b border-[#D8CBB8]/70 pb-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-[#242424]/45">
                  BOOKING REFERENCE
                </p>

                <p className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                  {
                    booking.bookingReference
                  }
                </p>
              </div>

              <div>
                <span className="inline-flex bg-[#F6F1E8] px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#14213D]">
                  {formatStatus(
                    booking.status
                  )}
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex gap-3">
                <CalendarDays
                  size={19}
                  className="shrink-0 text-[#C9A227]"
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
                  className="shrink-0 text-[#C9A227]"
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
                  className="shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    GUESTS
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {booking.adults +
                      booking.children}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <BedDouble
                  size={19}
                  className="shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    ROOMS
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {
                      booking.numberOfRooms
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-8 border-t border-[#D8CBB8]/70 pt-8 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-[#C9A227]">
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

                <p className="mt-2 text-sm text-[#242424]/60">
                  {
                    booking.guest
                      .email
                  }
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-[#C9A227]">
                  TOTAL
                </p>

                <p className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                  LKR{" "}
                  {booking.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {booking.payment && (
              <div className="mt-8 flex gap-3 border-t border-[#D8CBB8]/70 pt-7">
                <CreditCard
                  size={19}
                  className="shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    PAYMENT
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#14213D]">
                    {formatStatus(
                      booking.payment
                        .method
                    )}
                    {" · "}
                    {formatStatus(
                      booking.payment
                        .status
                    )}
                  </p>
                </div>
              </div>
            )}

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

            {booking.status ===
              "CANCELLED" && (
              <div className="mt-6 border-l-4 border-red-700 bg-red-50 px-5 py-4">
                <p className="text-sm font-medium text-red-800">
                  This reservation has been
                  cancelled.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {booking.room && (
                <Link
                  href={`/rooms/${booking.room.slug}`}
                  className="inline-flex min-h-12 items-center justify-center border border-[#14213D] px-7 text-xs font-semibold tracking-[0.12em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white"
                >
                  VIEW ROOM DETAILS
                </Link>
              )}

              {booking.status ===
                "CONFIRMED" && (
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={
                    handleCancellation
                  }
                  className="inline-flex min-h-12 items-center justify-center border border-red-700 px-7 text-xs font-semibold tracking-[0.12em] text-red-700 transition hover:bg-red-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {cancelling
                    ? "CANCELLING..."
                    : "CANCEL BOOKING"}
                </button>
              )}
            </div>
          </div>
        </article>
      )}
    </div>
  );
}