import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Maximize2,
  Users,
} from "lucide-react";

import BookingSearch from "@/components/booking/booking-search";
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
    "Book Your Stay | Velmora Hotel & Resort",

  description:
    "Search room availability and begin your reservation at Velmora Hotel & Resort.",
};

export const dynamic = "force-dynamic";

type BookingPageProps = {
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
    rooms?: string;
    room?: string;
    offer?: string;
  }>;
};

export default async function BookingPage({
  searchParams,
}: BookingPageProps) {
  const params = await searchParams;

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
    Number.parseInt(adultsValue, 10);

  const children =
    Number.parseInt(childrenValue, 10);

  const requestedRooms =
    Number.parseInt(roomsValue, 10);

  const checkIn =
    checkInValue
      ? parseBookingDate(checkInValue)
      : null;

  const checkOut =
    checkOutValue
      ? parseBookingDate(checkOutValue)
      : null;

  const hasSearch =
    Boolean(checkInValue) &&
    Boolean(checkOutValue);

  let error: string | null = null;

  let results:
    Awaited<
      ReturnType<
        typeof searchRoomAvailability
      >
    > = [];

  let nights = 0;

  if (hasSearch) {
    if (!checkIn || !checkOut) {
      error =
        "Please enter valid booking dates.";
    } else if (
      checkOut.getTime() <=
      checkIn.getTime()
    ) {
      error =
        "Check-out must be after check-in.";
    } else if (
      !Number.isInteger(adults) ||
      adults < 1 ||
      !Number.isInteger(children) ||
      children < 0 ||
      !Number.isInteger(requestedRooms) ||
      requestedRooms < 1
    ) {
      error =
        "Please enter valid guest and room information.";
    } else {
      nights = calculateNights(
        checkIn,
        checkOut
      );

      results =
        await searchRoomAvailability({
          checkIn,
          checkOut,
          adults,
          children,
          rooms: requestedRooms,
          roomSlug: params.room,
        });
    }
  }

  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[420px] items-end overflow-hidden">
        <Image
          src="/images/booking/final-booking.png"
          alt="Book your stay at Velmora Hotel and Resort"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/85 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            RESERVATIONS
          </p>

          <h1 className="mt-4 font-[var(--font-playfair)] text-5xl font-semibold text-white sm:text-6xl">
            Book Your Stay
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
            Choose your dates and discover
            available rooms at Velmora Hotel
            & Resort.
          </p>
        </div>
      </section>

      {/* Search */}
      <BookingSearch
        initialCheckIn={checkInValue}
        initialCheckOut={checkOutValue}
        initialAdults={adultsValue}
        initialChildren={childrenValue}
        initialRooms={roomsValue}
        room={params.room}
        offer={params.offer}
      />

      {/* Results */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {!hasSearch && (
            <div className="mx-auto max-w-2xl text-center">
              <CalendarDays
                size={36}
                strokeWidth={1.4}
                className="mx-auto text-[#C9A227]"
              />

              <h2 className="mt-5 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D] sm:text-4xl">
                Select Your Travel Dates
              </h2>

              <p className="mt-5 text-base leading-8 text-[#242424]/70">
                Enter your check-in,
                check-out and guest details
                above to see rooms available
                for your stay.
              </p>
            </div>
          )}

          {error && (
            <div className="mx-auto max-w-2xl border-l-4 border-red-700 bg-white p-6">
              <p className="font-semibold text-red-700">
                {error}
              </p>
            </div>
          )}

          {hasSearch && !error && (
            <>
              {/* Search summary */}
              <div className="mb-12 flex flex-col gap-6 border border-[#D8CBB8]/70 bg-white p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
                    YOUR SEARCH
                  </p>

                  <h2 className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                    {results.length > 0
                      ? `${results.length} Available Room Type${
                          results.length ===
                          1
                            ? ""
                            : "s"
                        }`
                      : "No Rooms Available"}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#242424]/70">
                  <span>
                    {checkInValue} →{" "}
                    {checkOutValue}
                  </span>

                  <span>
                    {nights} night
                    {nights === 1
                      ? ""
                      : "s"}
                  </span>

                  <span>
                    {adults} adult
                    {adults === 1
                      ? ""
                      : "s"}
                  </span>

                  {children > 0 && (
                    <span>
                      {children} child
                      {children === 1
                        ? ""
                        : "ren"}
                    </span>
                  )}

                  <span>
                    {requestedRooms} room
                    {requestedRooms === 1
                      ? ""
                      : "s"}
                  </span>
                </div>
              </div>

              {results.length === 0 ? (
                <div className="mx-auto max-w-2xl bg-white p-8 text-center">
                  <h3 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                    No matching rooms found
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#242424]/70">
                    Try changing your dates,
                    number of rooms or guest
                    count and search again.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {results.map(
                    (room) => {
                      const stayTotal =
                        room.pricePerNight *
                        nights *
                        requestedRooms;

                      const nextParams =
                        new URLSearchParams({
                          room:
                            room.slug,

                          checkIn:
                            checkInValue,

                          checkOut:
                            checkOutValue,

                          adults:
                            adultsValue,

                          children:
                            childrenValue,

                          rooms:
                            roomsValue,
                        });

                      if (params.offer) {
                        nextParams.set(
                          "offer",
                          params.offer
                        );
                      }

                      return (
                        <article
                          key={room.id}
                          className="grid overflow-hidden border border-[#D8CBB8]/60 bg-white lg:grid-cols-[360px_1fr]"
                        >
                          {/* Image */}
                          <div className="relative min-h-[300px] lg:min-h-full">
                            <Image
                              src={
                                room.image
                              }
                              alt={room.name}
                              fill
                              sizes="(max-width: 1024px) 100vw, 360px"
                              className="object-cover"
                            />
                          </div>

                          {/* Room Info */}
                          <div className="p-6 sm:p-8">
                            <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
                              <div>
                                <p className="text-xs font-semibold tracking-[0.18em] text-[#C9A227]">
                                  AVAILABLE
                                </p>

                                <h3 className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                                  {
                                    room.name
                                  }
                                </h3>

                                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#242424]/70">
                                  {
                                    room.description
                                  }
                                </p>
                              </div>

                              <div className="shrink-0 xl:text-right">
                                <p className="text-xs text-[#242424]/50">
                                  FROM
                                </p>

                                <p className="mt-1 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                                  LKR{" "}
                                  {room.pricePerNight.toLocaleString()}
                                </p>

                                <p className="text-xs text-[#242424]/50">
                                  per night
                                </p>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="mt-7 grid gap-4 border-y border-[#D8CBB8]/60 py-5 sm:grid-cols-4">
                              <div className="flex items-center gap-3">
                                <Users
                                  size={
                                    18
                                  }
                                  className="text-[#C9A227]"
                                />

                                <span className="text-xs text-[#242424]/70">
                                  Up to{" "}
                                  {
                                    room.capacity
                                  }{" "}
                                  guests
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <BedDouble
                                  size={
                                    18
                                  }
                                  className="text-[#C9A227]"
                                />

                                <span className="text-xs text-[#242424]/70">
                                  {
                                    room.bedType
                                  }
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <Maximize2
                                  size={
                                    18
                                  }
                                  className="text-[#C9A227]"
                                />

                                <span className="text-xs text-[#242424]/70">
                                  {room.sizeSqm
                                    ? `${room.sizeSqm} m²`
                                    : "Size unavailable"}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <CheckCircle2
                                  size={
                                    18
                                  }
                                  className="text-[#C9A227]"
                                />

                                <span className="text-xs text-[#242424]/70">
                                  {
                                    room.availableRooms
                                  }{" "}
                                  left for
                                  these dates
                                </span>
                              </div>
                            </div>

                            {/* Bottom */}
                            <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                              <div>
                                <p className="text-xs font-semibold tracking-[0.15em] text-[#C9A227]">
                                  ESTIMATED
                                  STAY TOTAL
                                </p>

                                <p className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                                  LKR{" "}
                                  {stayTotal.toLocaleString()}
                                </p>

                                <p className="mt-1 text-xs text-[#242424]/50">
                                  {
                                    requestedRooms
                                  }{" "}
                                  room
                                  {requestedRooms ===
                                  1
                                    ? ""
                                    : "s"}{" "}
                                  ×{" "}
                                  {
                                    nights
                                  }{" "}
                                  night
                                  {nights ===
                                  1
                                    ? ""
                                    : "s"}
                                </p>
                              </div>

                              <div className="flex flex-col gap-3 sm:flex-row">
                                <Link
                                  href={`/rooms/${room.slug}`}
                                  className="flex min-h-12 items-center justify-center border border-[#14213D] px-6 text-xs font-semibold tracking-[0.12em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white"
                                >
                                  ROOM DETAILS
                                </Link>

                                <Link
                                  href={`/booking/guest-details?${nextParams.toString()}`}
                                  className="flex min-h-12 items-center justify-center bg-[#C9A227] px-7 text-xs font-bold tracking-[0.12em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white"
                                >
                                  SELECT ROOM
                                </Link>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}