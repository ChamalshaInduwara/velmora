"use client";

import {
  LoaderCircle,
} from "lucide-react";

import {
  useState,
} from "react";

import { useRouter } from "next/navigation";

type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "CHECKED_IN"
  | "CHECKED_OUT";

type BookingStatusActionsProps = {
  bookingId: string;
  currentStatus: BookingStatus;
};

const transitions: Record<
  BookingStatus,
  BookingStatus[]
> = {
  PENDING: [
    "CONFIRMED",
    "CANCELLED",
  ],

  CONFIRMED: [
    "CHECKED_IN",
    "CANCELLED",
  ],

  CHECKED_IN: [
    "CHECKED_OUT",
  ],

  CHECKED_OUT: [],

  CANCELLED: [],
};

function formatStatus(
  value: string
) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
}

export default function BookingStatusActions({
  bookingId,
  currentStatus,
}: BookingStatusActionsProps) {
  const router = useRouter();

  const [loadingStatus, setLoadingStatus] =
    useState<BookingStatus | null>(
      null
    );

  const [error, setError] =
    useState("");

  const options =
    transitions[currentStatus];

  async function updateStatus(
    status: BookingStatus
  ) {
    if (
      status === "CANCELLED"
    ) {
      const confirmed =
        window.confirm(
          "Are you sure you want to cancel this booking?"
        );

      if (!confirmed) {
        return;
      }
    }

    setError("");
    setLoadingStatus(status);

    try {
      const response =
        await fetch(
          `/api/admin/bookings/${bookingId}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status,
            }),
          }
        );

      const data =
        (await response.json()) as {
          success?: boolean;
          error?: string;
        };

      if (
        !response.ok ||
        !data.success
      ) {
        setError(
          data.error ??
            "Status could not be updated."
        );

        return;
      }

      router.refresh();
    } catch {
      setError(
        "Unable to connect to the booking service."
      );
    } finally {
      setLoadingStatus(null);
    }
  }

  if (options.length === 0) {
    return (
      <p className="text-sm text-[#242424]/50">
        No further status actions are
        available for this booking.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {options.map((status) => {
          const destructive =
            status === "CANCELLED";

          return (
            <button
              key={status}
              type="button"
              disabled={
                loadingStatus !== null
              }
              onClick={() =>
                updateStatus(status)
              }
              className={
                destructive
                  ? "inline-flex min-h-11 items-center justify-center gap-2 border border-red-700 px-5 text-xs font-semibold tracking-[0.1em] text-red-700 transition hover:bg-red-700 hover:text-white disabled:opacity-50"
                  : "inline-flex min-h-11 items-center justify-center gap-2 bg-[#C9A227] px-5 text-xs font-bold tracking-[0.1em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white disabled:opacity-50"
              }
            >
              {loadingStatus ===
              status ? (
                <>
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                  />

                  UPDATING...
                </>
              ) : (
                formatStatus(status)
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}