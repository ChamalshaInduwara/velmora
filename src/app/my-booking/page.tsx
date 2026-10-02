import type { Metadata } from "next";

import MyBookingLookup from "@/components/booking/my-booking-lookup";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

export const metadata: Metadata = {
  title:
    "My Booking | Velmora Hotel & Resort",

  description:
    "Find and review your Velmora Hotel & Resort reservation.",
};

export default function MyBookingPage() {
  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      <section className="bg-[#14213D] px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            RESERVATIONS
          </p>

          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold sm:text-5xl">
            Find My Booking
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
            Enter your booking
            reference and the email
            address used for your
            reservation.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <MyBookingLookup />
        </div>
      </section>

      <Footer />
    </main>
  );
}