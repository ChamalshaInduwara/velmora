"use client";

import { FormEvent, useState } from "react";

import { ArrowRight, Mail, Phone, User } from "lucide-react";

import { useRouter } from "next/navigation";

type GuestDetailsFormProps = {
  room: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  childrenCount: string;
  rooms: string;
  offer?: string;
};

export default function GuestDetailsForm({
  room,
  checkIn,
  checkOut,
  adults,
  childrenCount,
  rooms,
  offer,
}: GuestDetailsFormProps) {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState("");

  const [specialRequests, setSpecialRequests] = useState("");

  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }

    if (!lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!country.trim()) {
      setError("Please enter your country.");
      return;
    }

    const guestDetails = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country: country.trim(),
      specialRequests: specialRequests.trim(),
    };

    sessionStorage.setItem("velmoraBookingGuest", JSON.stringify(guestDetails));

    const params = new URLSearchParams({
      room,
      checkIn,
      checkOut,
      adults,
      children: childrenCount,
      rooms,
    });

    if (offer) {
      params.set("offer", offer);
    }

    router.push(`/booking/review?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="first-name"
            className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
          >
            FIRST NAME *
          </label>

          <div className="relative">
            <User
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A227]"
            />

            <input
              id="first-name"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="h-12 w-full border border-[#D8CBB8] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#C9A227]"
              placeholder="First name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="last-name"
            className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
          >
            LAST NAME *
          </label>

          <input
            id="last-name"
            type="text"
            autoComplete="family-name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm outline-none transition focus:border-[#C9A227]"
            placeholder="Last name"
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="guest-email"
            className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
          >
            EMAIL ADDRESS *
          </label>

          <div className="relative">
            <Mail
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A227]"
            />

            <input
              id="guest-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full border border-[#D8CBB8] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#C9A227]"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="guest-phone"
            className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
          >
            PHONE NUMBER *
          </label>

          <div className="relative">
            <Phone
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A227]"
            />

            <input
              id="guest-phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="h-12 w-full border border-[#D8CBB8] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#C9A227]"
              placeholder="+94 77 123 4567"
            />
          </div>
        </div>
      </div>

      {/* Country */}
      <div>
        <label
          htmlFor="country"
          className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
        >
          COUNTRY *
        </label>

        <input
          id="country"
          type="text"
          autoComplete="country-name"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          className="h-12 w-full border border-[#D8CBB8] bg-white px-4 text-sm outline-none transition focus:border-[#C9A227]"
          placeholder="Sri Lanka"
        />
      </div>

      {/* Special Requests */}
      <div>
        <label
          htmlFor="special-requests"
          className="mb-2 block text-xs font-semibold tracking-[0.14em] text-[#14213D]"
        >
          SPECIAL REQUESTS
        </label>

        <textarea
          id="special-requests"
          rows={5}
          value={specialRequests}
          onChange={(event) => setSpecialRequests(event.target.value)}
          placeholder="Airport transfer, dietary requirements, room preferences..."
          className="w-full resize-none border border-[#D8CBB8] bg-white px-4 py-4 text-sm outline-none transition focus:border-[#C9A227]"
        />

        <p className="mt-2 text-xs leading-6 text-[#242424]/50">
          Special requests are subject to availability and cannot be guaranteed.
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="group flex min-h-13 w-full items-center justify-center gap-3 bg-[#C9A227] px-8 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white sm:w-auto"
      >
        CONTINUE TO REVIEW
        <ArrowRight
          size={17}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
