"use client";

import {
  CheckCircle2,
  LoaderCircle,
  Search,
} from "lucide-react";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export default function ClaimBookingForm() {
  const router = useRouter();

  const [
    bookingReference,
    setBookingReference,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const reference =
      bookingReference
        .trim()
        .toUpperCase();

    if (!reference) {
      setError(
        "Please enter your booking reference."
      );
      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/bookings/claim",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              bookingReference:
                reference,
            }),
          }
        );

      const data =
        (await response.json()) as {
          success?: boolean;
          message?: string;
          error?: string;
        };

      if (
        !response.ok ||
        !data.success
      ) {
        setError(
          data.error ??
            "The booking could not be linked."
        );
        return;
      }

      setSuccess(
        data.message ??
          "Booking linked successfully."
      );

      setBookingReference("");

      router.refresh();
    } catch {
      setError(
        "Unable to connect to the booking service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8"
    >
      <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
        EXISTING RESERVATION
      </p>

      <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
        Add a Previous Booking
      </h2>

      <p className="mt-4 text-sm leading-7 text-[#242424]/65">
        Enter the booking reference
        for a reservation made using
        the same email address as this
        account.
      </p>

      <div className="mt-7">
        <label
          htmlFor="claim-reference"
          className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
        >
          BOOKING REFERENCE
        </label>

        <input
          id="claim-reference"
          type="text"
          value={bookingReference}
          onChange={(event) =>
            setBookingReference(
              event.target.value
            )
          }
          placeholder="VLM-20261005-XXXXXXXX"
          className="h-12 w-full border border-[#D8CBB8] px-4 text-sm uppercase outline-none transition focus:border-[#C9A227]"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 border-l-4 border-red-700 bg-red-50 px-5 py-4 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {success && (
        <div className="mt-5 flex gap-3 border-l-4 border-green-700 bg-green-50 px-5 py-4">
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0 text-green-700"
          />

          <p className="text-sm text-green-800">
            {success}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex min-h-12 items-center justify-center gap-3 bg-[#C9A227] px-7 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle
              size={17}
              className="animate-spin"
            />

            LINKING BOOKING...
          </>
        ) : (
          <>
            <Search size={17} />

            ADD TO MY ACCOUNT
          </>
        )}
      </button>
    </form>
  );
}