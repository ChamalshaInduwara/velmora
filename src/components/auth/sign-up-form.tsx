"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FormEvent,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

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

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const cleanName =
      name.trim();

    const cleanEmail =
      email.trim().toLowerCase();

    if (cleanName.length < 2) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        cleanEmail
      )
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const {
        error: signUpError,
      } =
        await authClient.signUp.email({
          name: cleanName,
          email: cleanEmail,
          password,
        });

      if (signUpError) {
        setError(
          signUpError.message ??
            "Unable to create your account."
        );
        return;
      }

      router.push(
        "/account"
      );

      router.refresh();
    } catch {
      setError(
        "Unable to create your account. Please try again."
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
          htmlFor="signup-name"
          className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
        >
          FULL NAME
        </label>

        <div className="relative">
          <User
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A227]"
          />

          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            placeholder="Your full name"
            className="h-12 w-full border border-[#D8CBB8] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#C9A227]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="signup-email"
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
            id="signup-email"
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
          htmlFor="signup-password"
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
            id="signup-password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            autoComplete="new-password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="Minimum 8 characters"
            className="h-12 w-full border border-[#D8CBB8] bg-white pl-11 pr-12 text-sm outline-none transition focus:border-[#C9A227]"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (current) =>
                  !current
              )
            }
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#242424]/50 transition hover:text-[#14213D]"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="signup-confirm-password"
          className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
        >
          CONFIRM PASSWORD
        </label>

        <input
          id="signup-confirm-password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(
              event.target.value
            )
          }
          placeholder="Re-enter your password"
          className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm outline-none transition focus:border-[#C9A227]"
        />
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

            CREATING ACCOUNT...
          </>
        ) : (
          "CREATE ACCOUNT"
        )}
      </button>

      <p className="text-center text-sm text-[#242424]/60">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-[#14213D] underline underline-offset-4 transition hover:text-[#C9A227]"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
