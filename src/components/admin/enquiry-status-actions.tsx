"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  LoaderCircle,
  PlayCircle,
} from "lucide-react";

type InquiryStatus = "NEW" | "IN_PROGRESS" | "RESOLVED";

type EnquiryStatusActionsProps = {
  inquiryId: string;
  currentStatus: InquiryStatus;
};

export default function EnquiryStatusActions({
  inquiryId,
  currentStatus,
}: EnquiryStatusActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nextStatus =
    currentStatus === "NEW"
      ? "IN_PROGRESS"
      : currentStatus === "IN_PROGRESS"
        ? "RESOLVED"
        : null;

  if (!nextStatus) {
    return (
      <p className="text-sm text-[#242424]/50">
        This enquiry has been resolved.
      </p>
    );
  }

  const label =
    nextStatus === "IN_PROGRESS" ? "START HANDLING" : "MARK RESOLVED";
  const Icon = nextStatus === "IN_PROGRESS" ? PlayCircle : CheckCircle2;

  async function updateStatus() {
    if (
      nextStatus === "RESOLVED" &&
      !window.confirm("Mark this enquiry as resolved?")
    ) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `/api/admin/enquiries/${inquiryId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatus }),
        }
      );
      const contentType = response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        setError(`Unexpected server response (${response.status}).`);
        return;
      }

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setError(data.error ?? "Status could not be updated.");
        return;
      }

      router.refresh();
    } catch {
      setError("Unable to connect to the enquiry service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={loading}
        onClick={updateStatus}
        className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C9A227] px-5 text-xs font-bold tracking-[0.1em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <LoaderCircle size={16} className="animate-spin" />
            UPDATING...
          </>
        ) : (
          <>
            <Icon size={16} />
            {label}
          </>
        )}
      </button>
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
