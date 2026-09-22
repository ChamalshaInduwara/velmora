import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  ConciergeBell,
  Dumbbell,
  Plane,
  Soup,
  Sparkles,
  Waves,
  Wifi,
  ArrowRight,
} from "lucide-react";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

export const metadata: Metadata = {
  title: "Facilities | Velmora Hotel & Resort",
  description:
    "Explore facilities and services available at Velmora Hotel & Resort.",
};

const facilities = [
  {
    title: "Swimming Pool",
    description:
      "Relax beside the pool and enjoy peaceful surroundings designed for leisure and comfort.",
    icon: Waves,
  },
  {
    title: "Free Wi-Fi",
    description:
      "Stay connected throughout the hotel with complimentary high-speed internet access.",
    icon: Wifi,
  },
  {
    title: "Restaurant",
    description:
      "Enjoy local and international cuisine prepared for memorable dining experiences.",
    icon: Soup,
  },
  {
    title: "Spa & Wellness",
    description:
      "Refresh your body and mind with relaxing wellness experiences in a calm environment.",
    icon: Sparkles,
  },
  {
    title: "Fitness Centre",
    description:
      "Maintain your fitness routine with modern facilities available during your stay.",
    icon: Dumbbell,
  },
  {
    title: "Airport Transfer",
    description:
      "Convenient airport transfer services can be arranged for Velmora hotel guests.",
    icon: Plane,
  },
  {
    title: "Parking",
    description:
      "Secure and convenient parking facilities are available for hotel guests.",
    icon: Car,
  },
  {
    title: "24-Hour Room Service",
    description:
      "Enjoy selected food and guest services from the comfort of your room at any time.",
    icon: ConciergeBell,
  },
];

export default function FacilitiesPage() {
  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[500px] items-end overflow-hidden">
        <Image
          src="/images/experiences/pool.png"
          alt="Facilities at Velmora Hotel and Resort"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/85 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
              HOTEL FACILITIES
            </p>

            <h1 className="mt-5 font-[var(--font-playfair)] text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Everything You Need for a Relaxing Stay
            </h1>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Discover thoughtful facilities and services designed around
              comfort, convenience and memorable hotel experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            COMFORT & CONVENIENCE
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            Designed Around Your Stay
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-7 text-base leading-8 text-[#242424]/70">
            Velmora brings together essential hotel services, relaxing leisure
            facilities and thoughtful guest support to make every stay more
            comfortable.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility) => {
              const Icon = facility.icon;

              return (
                <article
                  key={facility.title}
                  className="group border border-[#D8CBB8]/70 bg-[#F6F1E8] p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-[#C9A227] hover:shadow-lg"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#C9A227]/50 text-[#C9A227] transition group-hover:bg-[#C9A227] group-hover:text-[#14213D]">
                    <Icon size={25} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-6 font-[var(--font-playfair)] text-xl font-semibold text-[#14213D]">
                    {facility.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#242424]/65">
                    {facility.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="grid bg-[#14213D] lg:grid-cols-2">
        <div className="relative min-h-[460px]">
          <Image
            src="/images/experiences/spa.png"
            alt="Spa and wellness at Velmora"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex items-center px-6 py-16 text-white sm:px-10 md:px-14 lg:px-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              RELAX & RECHARGE
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold leading-tight sm:text-5xl">
              More Time to Enjoy Your Stay
            </h2>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-7 text-base leading-8 text-white/70">
              From poolside relaxation and wellness experiences to dining and
              fitness facilities, Velmora is designed to give guests more ways
              to enjoy their time at the hotel.
            </p>

            <Link
              href="/experiences"
              className="group mt-9 inline-flex min-h-12 items-center justify-center gap-3 bg-[#C9A227] px-7 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-white"
            >
              EXPLORE EXPERIENCES

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            YOUR STAY AWAITS
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            Enjoy Everything Velmora Has to Offer
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#242424]/70">
            Book your stay and enjoy elegant accommodation, thoughtful service
            and facilities designed around your comfort.
          </p>

          <Link
            href="/booking"
            className="group mt-9 inline-flex min-h-12 items-center justify-center gap-3 bg-[#14213D] px-8 text-xs font-bold tracking-[0.14em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
          >
            BOOK YOUR STAY

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}