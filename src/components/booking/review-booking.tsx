"use client";

import { ArrowLeft, ArrowRight, Mail, MapPin, Phone, User } from "lucide-react";

import Link from "next/link";

import { useSyncExternalStore } from "react";

type GuestDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
};

const GUEST_STORAGE_KEY = "velmoraBookingGuest";

function subscribeToGuestStorage(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

function getGuestStorageSnapshot() {
  return window.sessionStorage.getItem(GUEST_STORAGE_KEY);
}

function getGuestStorageServerSnapshot() {
  return null;
}

type ReviewBookingProps = {
  room: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  childrenCount: string;
  rooms: string;
  nights: number;
  pricePerNight: number;
  totalAmount: number;
  offer?: string;
};

export default function ReviewBooking({
  room,
  roomName,
  checkIn,
  checkOut,
  adults,
  childrenCount,
  rooms,
  nights,
  pricePerNight,
  totalAmount,
  offer,
}: ReviewBookingProps) {
  const storedGuest = useSyncExternalStore(
    subscribeToGuestStorage,
    getGuestStorageSnapshot,
    getGuestStorageServerSnapshot,
  );

  let guestDetails: GuestDetails | null = null;

  if (storedGuest) {
    try {
      guestDetails = JSON.parse(storedGuest) as GuestDetails;
    } catch {
      guestDetails = null;
    }
  }

  const params = new URLSearchParams({
    room,
    checkIn,
    checkOut,
    adults,
    children: childrenCount,
    rooms,
  });

  if (offer) {
    params.set("offer", offer);
  }

  const guestDetailsUrl = `/booking/guest-details?${params.toString()}`;

  const paymentUrl = `/booking/payment?${params.toString()}`;

  if (!guestDetails) {
    return (
      <div className="border border-[#D8CBB8]/70 bg-white p-8 text-center">
        <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
          Guest Details Missing
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#242424]/70">
          We could not find the guest information for this reservation. Please
          return to the Guest Details step and complete the form again.
        </p>

        <Link
          href={guestDetailsUrl}
          className="mt-7 inline-flex min-h-12 items-center justify-center bg-[#C9A227] px-7 text-xs font-bold tracking-[0.14em] text-[#14213D]"
        >
          RETURN TO GUEST DETAILS
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Guest */}
      <section className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              PRIMARY GUEST
            </p>

            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
              Guest Information
            </h2>
          </div>

          <Link
            href={guestDetailsUrl}
            className="text-xs font-semibold tracking-[0.12em] text-[#14213D] underline underline-offset-4 transition hover:text-[#C9A227]"
          >
            EDIT DETAILS
          </Link>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="flex gap-3">
            <User size={18} className="mt-0.5 shrink-0 text-[#C9A227]" />

            <div>
              <p className="text-xs text-[#242424]/45">GUEST NAME</p>

              <p className="mt-1 text-sm font-medium text-[#242424]">
                {guestDetails.firstName} {guestDetails.lastName}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Mail size={18} className="mt-0.5 shrink-0 text-[#C9A227]" />

            <div>
              <p className="text-xs text-[#242424]/45">EMAIL</p>

              <p className="mt-1 break-all text-sm font-medium text-[#242424]">
                {guestDetails.email}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Phone size={18} className="mt-0.5 shrink-0 text-[#C9A227]" />

            <div>
              <p className="text-xs text-[#242424]/45">PHONE</p>

              <p className="mt-1 text-sm font-medium text-[#242424]">
                {guestDetails.phone}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-[#C9A227]" />

            <div>
              <p className="text-xs text-[#242424]/45">COUNTRY</p>

              <p className="mt-1 text-sm font-medium text-[#242424]">
                {guestDetails.country}
              </p>
            </div>
          </div>
        </div>

        {guestDetails.specialRequests && (
          <div className="mt-7 border-t border-[#D8CBB8]/60 pt-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-[#14213D]">
              SPECIAL REQUESTS
            </p>

            <p className="mt-3 text-sm leading-7 text-[#242424]/70">
              {guestDetails.specialRequests}
            </p>
          </div>
        )}
      </section>

      {/* Price */}
      <section className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
          PRICE SUMMARY
        </p>

        <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
          Reservation Total
        </h2>

        <div className="mt-7 space-y-4 text-sm">
          <div className="flex justify-between gap-6">
            <span className="text-[#242424]/65">{roomName}</span>

            <span className="font-medium text-[#242424]">
              LKR {pricePerNight.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between gap-6">
            <span className="text-[#242424]/65">Number of rooms</span>

            <span className="font-medium text-[#242424]">{rooms}</span>
          </div>

          <div className="flex justify-between gap-6">
            <span className="text-[#242424]/65">Number of nights</span>

            <span className="font-medium text-[#242424]">{nights}</span>
          </div>

          <div className="flex justify-between gap-6 border-t border-[#D8CBB8]/70 pt-5">
            <span className="font-semibold text-[#14213D]">
              Estimated Total
            </span>

            <span className="font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
              LKR {totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        <p className="mt-5 text-xs leading-6 text-[#242424]/50">
          Final payment details will be shown on the next step.
        </p>
      </section>

      {/* Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={guestDetailsUrl}
          className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#14213D] px-7 text-xs font-semibold tracking-[0.12em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white"
        >
          <ArrowLeft size={16} />
          BACK
        </Link>

        <Link
          href={paymentUrl}
          className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#C9A227] px-8 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white"
        >
          CONTINUE TO PAYMENT
          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
