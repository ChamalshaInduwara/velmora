import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, BedDouble, CalendarDays, Users } from "lucide-react";

import BookingSteps from "@/components/booking/booking-steps";

import GuestDetailsForm from "@/components/booking/guest-details-form";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

import { calculateNights, parseBookingDate } from "@/lib/booking-utils";

import { searchRoomAvailability } from "@/lib/availability";

export const metadata: Metadata = {
  title: "Guest Details | Velmora Hotel & Resort",

  description:
    "Enter guest information for your Velmora Hotel & Resort reservation.",
};

export const dynamic = "force-dynamic";

type GuestDetailsPageProps = {
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

export default async function GuestDetailsPage({
  searchParams,
}: GuestDetailsPageProps) {
  const params = await searchParams;

  const roomSlug = params.room;

  const checkInValue = params.checkIn ?? "";

  const checkOutValue = params.checkOut ?? "";

  const adultsValue = params.adults ?? "2";

  const childrenValue = params.children ?? "0";

  const roomsValue = params.rooms ?? "1";

  const adults = Number.parseInt(adultsValue, 10);

  const children = Number.parseInt(childrenValue, 10);

  const requestedRooms = Number.parseInt(roomsValue, 10);

  const checkIn = parseBookingDate(checkInValue);

  const checkOut = parseBookingDate(checkOutValue);

  const validRequest =
    roomSlug &&
    checkIn &&
    checkOut &&
    checkOut > checkIn &&
    Number.isInteger(adults) &&
    adults >= 1 &&
    Number.isInteger(children) &&
    children >= 0 &&
    Number.isInteger(requestedRooms) &&
    requestedRooms >= 1;

  if (!validRequest) {
    return (
      <main className="bg-[#F6F1E8]">
        <TopBar />
        <Navbar />

        <BookingSteps currentStep={2} />

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl bg-white p-8 text-center">
            <h1 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
              Invalid Booking Information
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#242424]/70">
              Your booking information is incomplete or invalid. Please search
              for an available room again.
            </p>

            <Link
              href="/booking"
              className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#14213D] px-7 text-xs font-bold tracking-[0.14em] text-white"
            >
              RETURN TO BOOKING
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const availability = await searchRoomAvailability({
    checkIn,
    checkOut,
    adults,
    children,
    rooms: requestedRooms,
    roomSlug,
  });

  const selectedRoom = availability.find((room) => room.slug === roomSlug);

  if (!selectedRoom) {
    return (
      <main className="bg-[#F6F1E8]">
        <TopBar />
        <Navbar />

        <BookingSteps currentStep={2} />

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl bg-white p-8 text-center">
            <h1 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
              Room No Longer Available
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#242424]/70">
              This room no longer has enough availability for the selected
              dates. Please search again.
            </p>

            <Link
              href="/booking"
              className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#C9A227] px-7 text-xs font-bold tracking-[0.14em] text-[#14213D]"
            >
              SEARCH AGAIN
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const nights = calculateNights(checkIn, checkOut);

  const estimatedTotal = selectedRoom.pricePerNight * nights * requestedRooms;

  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      <BookingSteps currentStep={2} />

      {/* Header */}
      <section className="px-4 pb-12 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href={`/booking?checkIn=${checkInValue}&checkOut=${checkOutValue}&adults=${adultsValue}&children=${childrenValue}&rooms=${roomsValue}`}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#14213D] transition hover:text-[#C9A227]"
          >
            <ArrowLeft size={16} />
            BACK TO ROOM SELECTION
          </Link>

          <p className="mt-9 text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            GUEST DETAILS
          </p>

          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            Tell Us About Your Stay
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#242424]/70">
            Enter the primary guest details below. You will have an opportunity
            to review everything before confirming the reservation.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_390px]">
          {/* Form */}
          <div className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
            <GuestDetailsForm
              room={roomSlug}
              checkIn={checkInValue}
              checkOut={checkOutValue}
              adults={adultsValue}
              childrenCount={childrenValue}
              rooms={roomsValue}
              offer={params.offer}
            />
          </div>

          {/* Summary */}
          <aside className="h-fit overflow-hidden bg-[#14213D] text-white lg:sticky lg:top-8">
            <div className="relative aspect-[16/10]">
              <Image
                src={selectedRoom.image}
                alt={selectedRoom.name}
                fill
                sizes="390px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/80 to-transparent" />
            </div>

            <div className="p-7">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                YOUR STAY
              </p>

              <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold">
                {selectedRoom.name}
              </h2>

              <div className="mt-6 space-y-4 border-y border-white/15 py-6">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 shrink-0 text-[#C9A227]"
                  />

                  <div>
                    <p className="text-xs text-white/50">DATES</p>

                    <p className="mt-1 text-sm text-white/80">
                      {checkInValue}
                      {" → "}
                      {checkOutValue}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users size={18} className="mt-0.5 shrink-0 text-[#C9A227]" />

                  <div>
                    <p className="text-xs text-white/50">GUESTS</p>

                    <p className="mt-1 text-sm text-white/80">
                      {adults} adult
                      {adults === 1 ? "" : "s"}
                      {children > 0
                        ? `, ${children} child${children === 1 ? "" : "ren"}`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BedDouble
                    size={18}
                    className="mt-0.5 shrink-0 text-[#C9A227]"
                  />

                  <div>
                    <p className="text-xs text-white/50">ROOMS</p>

                    <p className="mt-1 text-sm text-white/80">
                      {requestedRooms} × {selectedRoom.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm text-white/65">
                  <span>
                    LKR {selectedRoom.pricePerNight.toLocaleString()}
                    {" × "}
                    {nights} night
                    {nights === 1 ? "" : "s"}
                    {" × "}
                    {requestedRooms} room
                    {requestedRooms === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-5">
                  <span className="text-sm text-white/65">Estimated Total</span>

                  <span className="font-[var(--font-playfair)] text-2xl font-semibold text-[#C9A227]">
                    LKR {estimatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {params.offer && (
                <p className="mt-5 border-l-2 border-[#C9A227] pl-4 text-xs leading-6 text-white/60">
                  Your selected offer will be validated during the final booking
                  review.
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
