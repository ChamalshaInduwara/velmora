import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  Users,
} from "lucide-react";

import BookingSteps from "@/components/booking/booking-steps";

import PaymentForm from "@/components/booking/payment-form";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

import {
  calculateNights,
  parseBookingDate,
} from "@/lib/booking-utils";

import { searchRoomAvailability } from "@/lib/availability";

export const metadata: Metadata = {
  title:
    "Payment | Velmora Hotel & Resort",

  description:
    "Confirm payment details for your Velmora reservation.",
};

export const dynamic =
  "force-dynamic";

type PaymentPageProps = {
  searchParams: Promise<{
    room?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
    rooms?: string;
    offer?: string;
  }>;
};

export default async function PaymentPage({
  searchParams,
}: PaymentPageProps) {
  const params =
    await searchParams;

  const roomSlug =
    params.room ?? "";

  const checkInValue =
    params.checkIn ?? "";

  const checkOutValue =
    params.checkOut ?? "";

  const adultsValue =
    params.adults ?? "2";

  const childrenValue =
    params.children ?? "0";

  const roomsValue =
    params.rooms ?? "1";

  const adults =
    Number.parseInt(
      adultsValue,
      10
    );

  const children =
    Number.parseInt(
      childrenValue,
      10
    );

  const requestedRooms =
    Number.parseInt(
      roomsValue,
      10
    );

  const checkIn =
    parseBookingDate(
      checkInValue
    );

  const checkOut =
    parseBookingDate(
      checkOutValue
    );

  const validRequest =
    Boolean(roomSlug) &&
    Boolean(checkIn) &&
    Boolean(checkOut) &&
    checkIn !== null &&
    checkOut !== null &&
    checkOut > checkIn &&
    Number.isInteger(adults) &&
    adults >= 1 &&
    Number.isInteger(children) &&
    children >= 0 &&
    Number.isInteger(
      requestedRooms
    ) &&
    requestedRooms >= 1;

  if (
    !validRequest ||
    !checkIn ||
    !checkOut
  ) {
    return (
      <main className="bg-[#F6F1E8]">
        <TopBar />
        <Navbar />

        <BookingSteps
          currentStep={4}
        />

        <section className="px-4 py-24">
          <div className="mx-auto max-w-2xl bg-white p-8 text-center">
            <h1 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
              Invalid Booking
            </h1>

            <p className="mt-4 text-sm text-[#242424]/70">
              Please restart your
              reservation.
            </p>

            <Link
              href="/booking"
              className="mt-7 inline-flex min-h-12 items-center bg-[#C9A227] px-7 text-xs font-bold text-[#14213D]"
            >
              RETURN TO BOOKING
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /*
   * Re-check before showing
   * payment.
   */
  const availability =
    await searchRoomAvailability({
      checkIn,
      checkOut,
      adults,
      children,
      rooms:
        requestedRooms,
      roomSlug,
    });

  const selectedRoom =
    availability.find(
      (room) =>
        room.slug ===
        roomSlug
    );

  if (!selectedRoom) {
    return (
      <main className="bg-[#F6F1E8]">
        <TopBar />
        <Navbar />

        <BookingSteps
          currentStep={4}
        />

        <section className="px-4 py-24">
          <div className="mx-auto max-w-2xl bg-white p-8 text-center">
            <h1 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
              Room No Longer
              Available
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#242424]/70">
              Availability changed
              before payment. Please
              search again.
            </p>

            <Link
              href="/booking"
              className="mt-7 inline-flex min-h-12 items-center bg-[#C9A227] px-7 text-xs font-bold text-[#14213D]"
            >
              SEARCH AGAIN
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const nights =
    calculateNights(
      checkIn,
      checkOut
    );

  const totalAmount =
    selectedRoom.pricePerNight *
    nights *
    requestedRooms;

  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      <BookingSteps
        currentStep={4}
      />

      <section className="px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            PAYMENT
          </p>

          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            Complete Your
            Reservation
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#242424]/70">
            Review the amount due
            and confirm your Pay at
            Hotel reservation.
          </p>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_390px]">
          <PaymentForm
            room={roomSlug}
            checkIn={
              checkInValue
            }
            checkOut={
              checkOutValue
            }
            adults={
              adultsValue
            }
            childrenCount={
              childrenValue
            }
            rooms={
              roomsValue
            }
          />

          <aside className="h-fit overflow-hidden bg-[#14213D] text-white lg:sticky lg:top-8">
            <div className="relative aspect-[16/10]">
              <Image
                src={
                  selectedRoom.image
                }
                alt={
                  selectedRoom.name
                }
                fill
                sizes="390px"
                className="object-cover"
              />
            </div>

            <div className="p-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                RESERVATION
                SUMMARY
              </p>

              <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold">
                {
                  selectedRoom.name
                }
              </h2>

              <div className="mt-6 space-y-5 border-y border-white/15 py-6">
                <div className="flex gap-3">
                  <CalendarDays
                    size={18}
                    className="text-[#C9A227]"
                  />

                  <span className="text-sm text-white/75">
                    {checkInValue}
                    {" → "}
                    {checkOutValue}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Users
                    size={18}
                    className="text-[#C9A227]"
                  />

                  <span className="text-sm text-white/75">
                    {adults +
                      children}{" "}
                    guest
                    {adults +
                      children ===
                    1
                      ? ""
                      : "s"}
                  </span>
                </div>

                <p className="text-sm text-white/75">
                  {requestedRooms}{" "}
                  room
                  {requestedRooms ===
                  1
                    ? ""
                    : "s"}{" "}
                  × {nights} night
                  {nights === 1
                    ? ""
                    : "s"}
                </p>
              </div>

              <div className="mt-6 flex items-end justify-between gap-5">
                <span className="text-sm text-white/60">
                  Amount Due
                </span>

                <span className="font-[var(--font-playfair)] text-2xl font-semibold text-[#C9A227]">
                  LKR{" "}
                  {totalAmount.toLocaleString()}
                </span>
              </div>

              {params.offer && (
                <p className="mt-6 border-l-2 border-[#C9A227] pl-4 text-xs leading-6 text-white/55">
                  Selected offer:{" "}
                  {params.offer}.
                  Promotional pricing
                  has not yet been
                  applied to this
                  booking total.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}