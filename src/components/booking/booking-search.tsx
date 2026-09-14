"use client";

import { CalendarDays, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function BookingSearch() {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [rooms, setRooms] = useState("1");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out date must be after the check-in date.");
      return;
    }

    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
    });

    router.push(`/booking?${params.toString()}`);
  }

  return (
    <section className="relative z-30 bg-[#F6F1E8] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="relative -mt-6 border border-black/10 bg-white p-5 shadow-xl md:-mt-10 lg:p-7"
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-[1.2fr_1.2fr_0.8fr_0.8fr_0.8fr_auto] xl:items-end">
            {/* Check-in */}
            <div>
              <label
                htmlFor="check-in"
                className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-[#14213D]"
              >
                <CalendarDays size={15} className="text-[#C9A227]" />
                CHECK-IN
              </label>

              <input
                id="check-in"
                type="date"
                value={checkIn}
                min={today}
                onChange={(event) => {
                  setCheckIn(event.target.value);

                  if (
                    checkOut &&
                    event.target.value &&
                    checkOut <= event.target.value
                  ) {
                    setCheckOut("");
                  }
                }}
                className="h-12 w-full border border-[#D8CBB8] bg-[#F6F1E8]/40 px-4 text-sm text-[#242424] outline-none transition focus:border-[#C9A227]"
              />
            </div>

            {/* Check-out */}
            <div>
              <label
                htmlFor="check-out"
                className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-[#14213D]"
              >
                <CalendarDays size={15} className="text-[#C9A227]" />
                CHECK-OUT
              </label>

              <input
                id="check-out"
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(event) => setCheckOut(event.target.value)}
                className="h-12 w-full border border-[#D8CBB8] bg-[#F6F1E8]/40 px-4 text-sm text-[#242424] outline-none transition focus:border-[#C9A227]"
              />
            </div>

            {/* Adults */}
            <div>
              <label
                htmlFor="adults"
                className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-[#14213D]"
              >
                <Users size={15} className="text-[#C9A227]" />
                ADULTS
              </label>

              <select
                id="adults"
                value={adults}
                onChange={(event) => setAdults(event.target.value)}
                className="h-12 w-full border border-[#D8CBB8] bg-[#F6F1E8]/40 px-4 text-sm text-[#242424] outline-none transition focus:border-[#C9A227]"
              >
                {[1, 2, 3, 4, 5, 6].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>

            {/* Children */}
            <div>
              <label
                htmlFor="children"
                className="mb-2 text-xs font-semibold tracking-[0.15em] text-[#14213D]"
              >
                CHILDREN
              </label>

              <select
                id="children"
                value={children}
                onChange={(event) => setChildren(event.target.value)}
                className="h-12 w-full border border-[#D8CBB8] bg-[#F6F1E8]/40 px-4 text-sm text-[#242424] outline-none transition focus:border-[#C9A227]"
              >
                {[0, 1, 2, 3, 4].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>

            {/* Rooms */}
            <div>
              <label
                htmlFor="rooms"
                className="mb-2 text-xs font-semibold tracking-[0.15em] text-[#14213D]"
              >
                ROOMS
              </label>

              <select
                id="rooms"
                value={rooms}
                onChange={(event) => setRooms(event.target.value)}
                className="h-12 w-full border border-[#D8CBB8] bg-[#F6F1E8]/40 px-4 text-sm text-[#242424] outline-none transition focus:border-[#C9A227]"
              >
                {[1, 2, 3, 4, 5].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 bg-[#C9A227] px-6 text-xs font-bold tracking-[0.12em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white"
            >
              <Search size={17} />
              CHECK AVAILABILITY
            </button>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 text-sm font-medium text-red-700"
            >
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}