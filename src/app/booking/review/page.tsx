import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import {
  BedDouble,
  CalendarDays,
  Users,
} from "lucide-react";

import BookingSteps from "@/components/booking/booking-steps";
import ReviewBooking from "@/components/booking/review-booking";

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
    "Review Booking | Velmora Hotel & Resort",

  description:
    "Review your Velmora Hotel & Resort reservation before payment.",
};

export const dynamic = "force-dynamic";

type ReviewPageProps = {
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

export default async function ReviewPage({
  searchParams,
}: ReviewPageProps) {
  const params = await searchParams;

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

  const checkIn =
    parseBookingDate(
      checkInValue
    );

  const checkOut =
    parseBookingDate(
      checkOutValue
    );

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
          currentStep={3}
        />

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl bg-white p-8 text-center">
            <h1 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
              Invalid Booking
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#242424]/70">
              Some reservation
              information is missing
              or invalid. Please
              start the booking
              search again.
            </p>

            <Link
              href="/booking"
              className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#C9A227] px-7 text-xs font-bold tracking-[0.14em] text-[#14213D]"
            >
              RETURN TO BOOKING
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // Re-check real availability before review.
  const availability =
    await searchRoomAvailability({
      checkIn,
      checkOut,
      adults,
      children,
      rooms: requestedRooms,
      roomSlug,
    });

  const selectedRoom =
    availability.find(
      (room) =>
        room.slug === roomSlug
    );

  if (!selectedRoom) {
    return (
      <main className="bg-[#F6F1E8]">
        <TopBar />
        <Navbar />

        <BookingSteps
          currentStep={3}
        />

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl bg-white p-8 text-center">
            <h1 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
              Room No Longer Available
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#242424]/70">
              Availability changed
              while you were
              completing the booking.
              Please choose an
              available room again.
            </p>

            <Link
              href={`/booking?checkIn=${checkInValue}&checkOut=${checkOutValue}&adults=${adultsValue}&children=${childrenValue}&rooms=${roomsValue}`}
              className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#C9A227] px-7 text-xs font-bold tracking-[0.14em] text-[#14213D]"
            >
              SEARCH ROOMS AGAIN
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
        currentStep={3}
      />

      {/* Heading */}
      <section className="px-4 pb-12 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            REVIEW BOOKING
          </p>

          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            Review Your Reservation
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#242424]/70">
            Please review your room,
            stay and guest information
            before continuing to
            payment.
          </p>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_390px]">
          <ReviewBooking
            room={roomSlug}
            roomName={
              selectedRoom.name
            }
            checkIn={checkInValue}
            checkOut={
              checkOutValue
            }
            adults={
              adultsValue
            }
            childrenCount={
              childrenValue
            }
            rooms={roomsValue}
            nights={nights}
            pricePerNight={
              selectedRoom.pricePerNight
            }
            totalAmount={
              totalAmount
            }
            offer={params.offer}
          />

          {/* Stay Summary */}
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

              <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/90 to-transparent" />
            </div>

            <div className="p-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                STAY SUMMARY
              </p>

              <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold">
                {selectedRoom.name}
              </h2>

              <div className="mt-6 space-y-5 border-y border-white/15 py-6">
                <div className="flex gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 shrink-0 text-[#C9A227]"
                  />

                  <div>
                    <p className="text-xs text-white/45">
                      CHECK-IN
                    </p>

                    <p className="mt-1 text-sm text-white/80">
                      {
                        checkInValue
                      }
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 shrink-0 text-[#C9A227]"
                  />

                  <div>
                    <p className="text-xs text-white/45">
                      CHECK-OUT
                    </p>

                    <p className="mt-1 text-sm text-white/80">
                      {
                        checkOutValue
                      }
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Users
                    size={18}
                    className="mt-0.5 shrink-0 text-[#C9A227]"
                  />

                  <div>
                    <p className="text-xs text-white/45">
                      GUESTS
                    </p>

                    <p className="mt-1 text-sm text-white/80">
                      {adults} adult
                      {adults === 1
                        ? ""
                        : "s"}

                      {children > 0
                        ? `, ${children} child${
                            children ===
                            1
                              ? ""
                              : "ren"
                          }`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <BedDouble
                    size={18}
                    className="mt-0.5 shrink-0 text-[#C9A227]"
                  />

                  <div>
                    <p className="text-xs text-white/45">
                      ROOMS
                    </p>

                    <p className="mt-1 text-sm text-white/80">
                      {
                        requestedRooms
                      }{" "}
                      ×{" "}
                      {
                        selectedRoom.name
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-xs text-white/45">
                    TOTAL STAY
                  </p>

                  <p className="mt-1 text-sm text-white/65">
                    {nights} night
                    {nights === 1
                      ? ""
                      : "s"}
                  </p>
                </div>

                <p className="font-[var(--font-playfair)] text-2xl font-semibold text-[#C9A227]">
                  LKR{" "}
                  {totalAmount.toLocaleString()}
                </p>
              </div>

              {params.offer && (
                <div className="mt-6 border-l-2 border-[#C9A227] pl-4">
                  <p className="text-xs leading-6 text-white/60">
                    Offer:{" "}
                    {params.offer}
                  </p>

                  <p className="mt-1 text-xs leading-6 text-white/45">
                    Offer pricing will
                    be validated before
                    final payment.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}