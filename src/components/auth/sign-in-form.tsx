"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FormEvent,
  useState,
} from "react";

import {
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const cleanEmail =
      email.trim().toLowerCase();

    if (
      !cleanEmail ||
      !password
    ) {
      setError(
        "Please enter your email address and password."
      );
      return;
    }

    setLoading(true);

    try {
      const {
        error: signInError,
      } =
        await authClient.signIn.email({
          email: cleanEmail,
          password,
        });

      if (signInError) {
        setError(
          signInError.message ??
            "Invalid email or password."
        );
        return;
      }

      router.push(
        "/account"
      );

      router.refresh();
    } catch {
      setError(
        "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="signin-email"
          className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
        >
          EMAIL ADDRESS
        </label>

        <div className="relative">
          <Mail
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A227]"
          />

          <input
            id="signin-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="you@example.com"
            className="h-12 w-full border border-[#D8CBB8] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#C9A227]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="signin-password"
          className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
        >
          PASSWORD
        </label>

        <div className="relative">
          <LockKeyhole
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A227]"
          />

          <input
            id="signin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="Your password"
            className="h-12 w-full border border-[#D8CBB8] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#C9A227]"
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="border-l-4 border-red-700 bg-red-50 px-5 py-4 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-12 w-full items-center justify-center gap-3 bg-[#C9A227] px-8 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle
              size={18}
              className="animate-spin"
            />

            SIGNING IN...
          </>
        ) : (
          "SIGN IN"
        )}
      </button>

      <p className="text-center text-sm text-[#242424]/60">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-[#14213D] underline underline-offset-4 transition hover:text-[#C9A227]"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}
