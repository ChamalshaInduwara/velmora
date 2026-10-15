"use client";

import {
  LoaderCircle,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  useState,
} from "react";

type RoomStatus =
  | "AVAILABLE"
  | "MAINTENANCE"
  | "INACTIVE";

type RoomStatusControlProps = {
  roomId: string;
  roomNumber: string;
  currentStatus: RoomStatus;
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

export default function RoomStatusControl({
  roomId,
  roomNumber,
  currentStatus,
}: RoomStatusControlProps) {
  const router = useRouter();

  const [status, setStatus] =
    useState<RoomStatus>(
      currentStatus
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleUpdate() {
    if (
      status === currentStatus
    ) {
      return;
    }

    if (
      status === "MAINTENANCE" ||
      status === "INACTIVE"
    ) {
      const confirmed =
        window.confirm(
          `Change room ${roomNumber} to ${formatStatus(status)}?`
        );

      if (!confirmed) {
        setStatus(
          currentStatus
        );
        return;
      }
    }

    setError("");
    setLoading(true);

    try {
      const response =
        await fetch(
          `/api/admin/rooms/${roomId}/status`,
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
            "Room status could not be updated."
        );

        setStatus(
          currentStatus
        );

        return;
      }

      router.refresh();
    } catch {
      setError(
        "Unable to connect to the room service."
      );

      setStatus(
        currentStatus
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={status}
          disabled={loading}
          onChange={(event) =>
            setStatus(
              event.target
                .value as RoomStatus
            )
          }
          className="h-11 border border-[#D8CBB8] bg-white px-3 text-sm outline-none focus:border-[#C9A227]"
        >
          <option value="AVAILABLE">
            Available
          </option>

          <option value="MAINTENANCE">
            Maintenance
          </option>

          <option value="INACTIVE">
            Inactive
          </option>
        </select>

        <button
          type="button"
          disabled={
            loading ||
            status === currentStatus
          }
          onClick={handleUpdate}
          className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#14213D] px-5 text-xs font-bold tracking-[0.1em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <>
              <LoaderCircle
                size={16}
                className="animate-spin"
              />

              UPDATING...
            </>
          ) : (
            "UPDATE"
          )}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 max-w-lg border-l-4 border-red-700 bg-red-50 px-4 py-3 text-xs leading-6 text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}