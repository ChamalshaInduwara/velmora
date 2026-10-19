"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";

import Link from "next/link";

import { authClient } from "@/lib/auth-client";

type ResetPasswordFormProps = {
  token: string;
  invalidToken: boolean;
};

export default function ResetPasswordForm({
  token,
  invalidToken,
}: ResetPasswordFormProps) {
  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [isPending, setIsPending] =
    useState(false);

  const tokenUnavailable =
    invalidToken || !token;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (tokenUnavailable) {
      setError(
        "This password reset link is invalid or has expired."
      );

      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );

      return;
    }

    if (password.length > 128) {
      setError(
        "Password must not exceed 128 characters."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    setIsPending(true);

    try {
      const {
        error: resetError,
      } =
        await authClient.resetPassword({
          newPassword:
            password,
          token,
        });

      if (resetError) {
        setError(
          resetError.message ??
            "This password reset link is invalid or has expired."
        );

        return;
      }

      setPassword("");
      setConfirmPassword("");
      setSuccess(true);
    } catch {
      setError(
        "Unable to reset your password. Please try again."
      );
    } finally {
      setIsPending(false);
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#F6F1E8]">
          <CheckCircle2
            size={28}
            className="text-[#C9A227]"
          />
        </div>

        <p className="mt-7 text-xs font-semibold tracking-[0.22em] text-[#C9A227]">
          PASSWORD UPDATED
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
          Password reset complete
        </h1>

        <p className="mt-5 text-sm leading-7 text-[#242424]/60">
          Your Velmora password has
          been updated successfully.
          Please sign in using your new
          password.
        </p>

        <Link
          href="/sign-in"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#14213D] px-8 text-xs font-bold tracking-[0.14em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
        >
          SIGN IN
        </Link>
      </div>
    );
  }

  if (tokenUnavailable) {
    return (
      <div className="text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-red-700">
          INVALID LINK
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
          Reset link unavailable
        </h1>

        <p className="mt-5 text-sm leading-7 text-[#242424]/60">
          This password reset link is
          invalid or has expired. Request
          a new link to continue.
        </p>

        <Link
          href="/forgot-password"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#14213D] px-8 text-xs font-bold tracking-[0.14em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
        >
          REQUEST NEW LINK
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.22em] text-[#C9A227]">
        ACCOUNT SECURITY
      </p>

      <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
        Create a new password
      </h1>

      <p className="mt-4 text-sm leading-7 text-[#242424]/60">
        Enter a new password for your
        Velmora account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        <div>
          <label
            htmlFor="new-password"
            className="mb-2 block text-xs font-semibold tracking-[0.12em] text-[#14213D]"
          >
            NEW PASSWORD
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A227]"
            />

            <input
              id="new-password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              autoComplete="new-password"
              value={password}
              disabled={isPending}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Minimum 8 characters"
              className="h-12 w-full border border-[#D8CBB8] bg-white pl-11 pr-12 text-sm outline-none transition focus:border-[#C9A227] disabled:opacity-60"
            />

            <button
              type="button"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              onClick={() =>
                setShowPassword(
                  (current) =>
                    !current
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#242424]/45 transition hover:text-[#14213D]"
            >
              {showPassword ? (
                <EyeOff
                  size={17}
                />
              ) : (
                <Eye
                  size={17}
                />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-xs font-semibold tracking-[0.12em] text-[#14213D]"
          >
            CONFIRM PASSWORD
          </label>

          <input
            id="confirm-password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            value={confirmPassword}
            disabled={isPending}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
            placeholder="Repeat your new password"
            className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm outline-none transition focus:border-[#C9A227] disabled:opacity-60"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            {error}
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
              UPDATING...
            </>
          ) : (
            "RESET PASSWORD"
          )}
        </button>
      </form>
    </div>
  );
}