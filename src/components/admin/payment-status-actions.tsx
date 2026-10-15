"use client";

import {
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

type PaymentStatusActionsProps = {
  paymentId: string;
  method: string;
  status: string;
};

export default function PaymentStatusActions({
  paymentId,
  method,
  status,
}: PaymentStatusActionsProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (
    method !== "PAY_AT_HOTEL" ||
    status !== "INITIATED"
  ) {
    return null;
  }

  async function markAsPaid() {
    const confirmed =
      window.confirm(
        "Confirm that payment has been received from the guest?"
      );

    if (!confirmed) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response =
        await fetch(
          `/api/admin/payments/${paymentId}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status: "PAID",
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
            "Payment could not be updated."
        );

        return;
      }

      router.refresh();
    } catch {
      setError(
        "Unable to connect to the payment service."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        disabled={loading}
        onClick={markAsPaid}
        className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C9A227] px-5 text-xs font-bold tracking-[0.1em] text-[#14213D] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
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
          <>
            <CheckCircle2 size={16} />
            MARK AS PAID
          </>
        )}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-4 border-l-4 border-red-600 bg-white/10 px-4 py-3 text-xs leading-6 text-red-200"
        >
          {error}
        </p>
      )}
    </div>
  );
}