"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  ArrowLeft,
  LoaderCircle,
  Mail,
} from "lucide-react";

import Link from "next/link";

import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordForm() {
  const [email, setEmail] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [isPending, setIsPending] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail =
      email.trim().toLowerCase();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        normalizedEmail
      )
    ) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    setIsPending(true);

    try {
      const {
        error: resetError,
      } =
        await authClient.requestPasswordReset({
          email:
            normalizedEmail,

          redirectTo:
            `${window.location.origin}/reset-password`,
        });

      if (resetError) {
        setError(
          resetError.message ??
            "We could not process the password reset request."
        );

        return;
      }

      /*
       * Keep this response generic.
       * We do not reveal whether an
       * account exists for the email.
       */
      setSuccess(
        "If an account exists for this email address, a password reset link has been sent."
      );

      setEmail("");
    } catch {
      setError(
        "Unable to connect to the authentication service. Please try again."
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <Link
        href="/sign-in"
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#14213D] transition hover:text-[#C9A227]"
      >
        <ArrowLeft size={15} />
        BACK TO SIGN IN
      </Link>

      <div className="mt-8">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#C9A227]">
          ACCOUNT RECOVERY
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
          Forgot your password?
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#242424]/60">
          Enter the email address
          associated with your Velmora
          account and we&apos;ll send you
          a reset link.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        <div>
          <label
            htmlFor="reset-email"
            className="mb-2 block text-xs font-semibold tracking-[0.12em] text-[#14213D]"
          >
            EMAIL ADDRESS
          </label>

          <div className="relative">
            <Mail
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A227]"
            />

            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              value={email}
              disabled={isPending}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="you@example.com"
              className="h-12 w-full border border-[#D8CBB8] bg-white pl-11 pr-4 text-sm text-[#242424] outline-none transition placeholder:text-[#242424]/35 focus:border-[#C9A227] disabled:opacity-60"
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="border-l-4 border-[#C9A227] bg-[#F6F1E8] px-4 py-3 text-sm leading-6 text-[#14213D]"
          >
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#14213D] px-6 text-xs font-bold tracking-[0.14em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
              SENDING...
            </>
          ) : (
            "SEND RESET LINK"
          )}
        </button>
      </form>
    </div>
  );
}