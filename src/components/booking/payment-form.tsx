"use client";

import {
  CheckCircle2,
  Hotel,
  LoaderCircle,
} from "lucide-react";

import {
  useState,
  useSyncExternalStore,
} from "react";

import { useRouter } from "next/navigation";

type GuestDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
};

type PaymentFormProps = {
  room: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  childrenCount: string;
  rooms: string;
};

const GUEST_STORAGE_KEY =
  "velmoraBookingGuest";

function subscribeToGuestStorage(
  callback: () => void
) {
  window.addEventListener(
    "storage",
    callback
  );

  return () => {
    window.removeEventListener(
      "storage",
      callback
    );
  };
}

function getGuestStorageSnapshot() {
  return window.sessionStorage.getItem(
    GUEST_STORAGE_KEY
  );
}

function getGuestStorageServerSnapshot() {
  return null;
}

export default function PaymentForm({
  room,
  checkIn,
  checkOut,
  adults,
  childrenCount,
  rooms,
}: PaymentFormProps) {
  const router = useRouter();

  const storedGuest =
    useSyncExternalStore(
      subscribeToGuestStorage,
      getGuestStorageSnapshot,
      getGuestStorageServerSnapshot
    );

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [accepted, setAccepted] =
    useState(false);

  const [error, setError] =
    useState("");

  let guestDetails:
    | GuestDetails
    | null = null;

  if (storedGuest) {
    try {
      guestDetails =
        JSON.parse(
          storedGuest
        ) as GuestDetails;
    } catch {
      guestDetails = null;
    }
  }

  async function confirmBooking() {
    setError("");

    if (!guestDetails) {
      setError(
        "Guest details are missing. Please return to the previous step."
      );
      return;
    }

    if (!accepted) {
      setError(
        "Please confirm that your booking details are correct."
      );
      return;
    }

    setSubmitting(true);

    try {
      const response =
        await fetch(
          "/api/bookings",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              room,

              checkIn,
              checkOut,

              adults:
                Number(adults),

              children:
                Number(
                  childrenCount
                ),

              rooms:
                Number(rooms),

              paymentMethod:
                "PAY_AT_HOTEL",

              guest:
                guestDetails,
            }),
          }
        );

      const data =
        (await response.json()) as {
          success?: boolean;
          bookingReference?: string;
          error?: string;
        };

      if (
        !response.ok ||
        !data.bookingReference
      ) {
        setError(
          data.error ??
            "The booking could not be completed."
        );

        return;
      }

      sessionStorage.removeItem(
        GUEST_STORAGE_KEY
      );

      router.push(
        `/booking/confirmation?reference=${encodeURIComponent(
          data.bookingReference
        )}`
      );
    } catch {
      setError(
        "Unable to connect to the booking service. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!guestDetails) {
    return (
      <div className="border border-[#D8CBB8]/70 bg-white p-8 text-center">
        <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
          Guest Details Missing
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#242424]/70">
          Please return to Guest
          Details before confirming
          this reservation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <section className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
          PAYMENT METHOD
        </p>

        <h2 className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
          Pay at Hotel
        </h2>

        <div className="mt-7 border-2 border-[#C9A227] bg-[#F6F1E8]/50 p-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C9A227]">
              <Hotel
                size={20}
                className="text-[#14213D]"
              />
            </div>

            <div>
              <p className="font-semibold text-[#14213D]">
                Pay when you arrive
              </p>

              <p className="mt-2 text-sm leading-7 text-[#242424]/65">
                Your reservation will
                be confirmed now. The
                amount due will be
                collected by the hotel.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-7 flex gap-3">
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0 text-[#C9A227]"
          />

          <p className="text-sm leading-7 text-[#242424]/65">
            No card payment will be
            processed during this
            step.
          </p>
        </div>
      </section>

      <label className="flex cursor-pointer items-start gap-3 border border-[#D8CBB8]/70 bg-white p-5">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) =>
            setAccepted(
              event.target.checked
            )
          }
          className="mt-1 h-4 w-4 accent-[#C9A227]"
        />

        <span className="text-sm leading-7 text-[#242424]/70">
          I confirm that the guest,
          dates, room selection and
          reservation information are
          correct.
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="border-l-4 border-red-700 bg-red-50 px-5 py-4 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <button
        type="button"
        disabled={submitting}
        onClick={confirmBooking}
        className="flex min-h-13 w-full items-center justify-center gap-3 bg-[#C9A227] px-8 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <LoaderCircle
              size={18}
              className="animate-spin"
            />

            CONFIRMING BOOKING...
          </>
        ) : (
          "CONFIRM RESERVATION"
        )}
      </button>
    </div>
  );
}