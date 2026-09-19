import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
import { experiences } from "@/data/experiences";

export const metadata: Metadata = {
  title: "Experiences | Velmora Hotel & Resort",
  description:
    "Discover spa, leisure, local experiences, weddings and events at Velmora Hotel & Resort.",
};

export default function ExperiencesPage() {
  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden">
        <Image
          src="/images/experiences/pool.png"
          alt="Velmora Hotel and Resort experiences"
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
              VELMORA EXPERIENCES
            </p>

            <h1 className="mt-5 font-[var(--font-playfair)] text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              More Than Just a Stay
            </h1>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Discover relaxing, meaningful and memorable experiences designed
              to make every Velmora stay special.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            DISCOVER VELMORA
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            Experiences Made to Be Remembered
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-7 text-base leading-8 text-[#242424]/70">
            Your stay at Velmora extends beyond accommodation. Relax, explore,
            celebrate and enjoy experiences created around comfort, leisure and
            memorable moments.
          </p>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl space-y-20">
          {experiences.map((experience, index) => (
            <article
              key={experience.id}
              id={experience.slug}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Image */}
              <div
                className={`relative min-h-[420px] overflow-hidden ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
                  EXPERIENCE {String(index + 1).padStart(2, "0")}
                </p>

                <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-[#14213D] sm:text-5xl">
                  {experience.title}
                </h2>

                <div className="mt-6 h-px w-16 bg-[#C9A227]" />

                <p className="mt-7 text-base leading-8 text-[#242424]/70">
                  {experience.longDescription}
                </p>

                <Link
                  href="/contact"
                  className="group mt-8 inline-flex items-center gap-3 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:text-[#C9A227]"
                >
                  LEARN MORE
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#14213D] px-4 py-20 text-center text-white sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            YOUR VELMORA EXPERIENCE
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold leading-tight sm:text-5xl">
            Make Every Moment Part of Your Stay
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70">
            Stay, relax, explore and create memorable moments at Velmora Hotel
            & Resort.
          </p>

          <Link
            href="/booking"
            className="group mt-9 inline-flex min-h-12 items-center justify-center gap-3 bg-[#C9A227] px-8 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-white"
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