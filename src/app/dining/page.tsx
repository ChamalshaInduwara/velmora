import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, UtensilsCrossed } from "lucide-react";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

export const metadata: Metadata = {
  title: "Dining | Velmora Hotel & Resort",
  description:
    "Discover memorable local and international dining experiences at Velmora Hotel & Resort.",
};

const diningExperiences = [
  {
    title: "Signature Restaurant",
    subtitle: "LOCAL & INTERNATIONAL CUISINE",
    image: "/images/dining/dining-main.png",
    description:
      "Enjoy thoughtfully prepared dishes inspired by local flavours and international favourites in an elegant and welcoming setting.",
    hours: "6:30 AM - 10:30 PM",
  },
  {
    title: "Elegant Evening Dining",
    subtitle: "DINNER EXPERIENCE",
    image: "/images/gallery/gallery-3.png",
    description:
      "Spend the evening enjoying carefully prepared cuisine, refined presentation and warm Velmora hospitality.",
    hours: "6:30 PM - 10:30 PM",
  },
  {
    title: "Special Dining Experience",
    subtitle: "MEMORABLE MOMENTS",
    image: "/images/offers/dining-experience.png",
    description:
      "Celebrate special moments with a memorable dining experience designed for couples, families and special occasions.",
    hours: "Advance Reservation",
  },
];

export default function DiningPage() {
  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image
          src="/images/dining/dining-main.png"
          alt="Dining at Velmora Hotel and Resort"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/80 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
              CULINARY EXPERIENCES
            </p>

            <h1 className="mt-5 font-[var(--font-playfair)] text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Taste Something Exceptional
            </h1>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Discover beautifully prepared local and international cuisine
              created to make every dining experience at Velmora memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              DINING AT VELMORA
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-[#14213D] sm:text-5xl">
              Made to Be Remembered
            </h2>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-7 text-base leading-8 text-[#242424]/70">
              Dining at Velmora combines carefully selected ingredients,
              thoughtful presentation and warm hospitality. From relaxed
              mornings to elegant evening meals, every experience is designed
              to feel welcoming and memorable.
            </p>

            <p className="mt-5 text-base leading-8 text-[#242424]/70">
              Guests can enjoy local flavours alongside international cuisine
              while relaxing in elegant surroundings created for every part of
              the day.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/gallery/gallery-3.png"
              alt="Velmora restaurant interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Dining Experiences */}
      <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              OUR EXPERIENCES
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
              Discover Velmora Dining
            </h2>

            <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {diningExperiences.map((experience) => (
              <article
                key={experience.title}
                className="group overflow-hidden border border-[#D8CBB8]/60 bg-[#F6F1E8]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#C9A227]">
                    {experience.subtitle}
                  </p>

                  <h3 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                    {experience.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#242424]/70">
                    {experience.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-[#D8CBB8]/70 pt-5">
                    <Clock3 size={17} className="text-[#C9A227]" />

                    <span className="text-xs font-medium text-[#242424]/65">
                      {experience.hours}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight */}
      <section className="bg-[#14213D] px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <UtensilsCrossed
            size={34}
            strokeWidth={1.4}
            className="mx-auto text-[#C9A227]"
          />

          <p className="mt-7 text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            A VELMORA EXPERIENCE
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold sm:text-5xl">
            Make Your Dining Experience Special
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70">
            Whether you are staying at Velmora or planning a special occasion,
            discover dining created around memorable moments.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center border border-white/40 px-7 text-xs font-semibold tracking-[0.14em] text-white transition hover:bg-white hover:text-[#14213D]"
            >
              CONTACT US
            </Link>

            <Link
              href="/booking"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#C9A227] px-7 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-white"
            >
              BOOK YOUR STAY

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}