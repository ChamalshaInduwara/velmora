"use client";

import {
  LogOut,
  LoaderCircle,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      await authClient.signOut();

      router.push(
        "/sign-in"
      );

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleSignOut}
      className="inline-flex min-h-12 items-center justify-center gap-2 border border-red-700 px-6 text-xs font-semibold tracking-[0.12em] text-red-700 transition hover:bg-red-700 hover:text-white disabled:opacity-50"
    >
      {loading ? (
        <>
          <LoaderCircle
            size={17}
            className="animate-spin"
          />

          SIGNING OUT...
        </>
      ) : (
        <>
          <LogOut size={17} />

          SIGN OUT
        </>
      )}
    </button>
  );
}
