import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

export const metadata: Metadata = {
  title: "About Us | Velmora Hotel & Resort",
  description:
    "Discover the story, hospitality and experience of Velmora Hotel & Resort.",
};

const values = [
  {
    title: "Warm Hospitality",
    description:
      "Thoughtful service and genuine care are at the heart of every Velmora stay.",
    icon: HeartHandshake,
  },
  {
    title: "Elegant Comfort",
    description:
      "Beautiful spaces combine modern comfort with timeless hotel elegance.",
    icon: Sparkles,
  },
  {
    title: "Memorable Experiences",
    description:
      "Every stay is designed to create relaxing and meaningful memories.",
    icon: Star,
  },
  {
    title: "Convenient Location",
    description:
      "Velmora offers a comfortable base for discovering Colombo and nearby experiences.",
    icon: MapPin,
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden">
        <Image
          src="/images/about/about-main.png"
          alt="Velmora Hotel and Resort"
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
              ABOUT VELMORA
            </p>

            <h1 className="mt-5 font-[var(--font-playfair)] text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Where Comfort Meets Elegance
            </h1>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Discover the atmosphere, hospitality and thoughtful experiences
              that define Velmora Hotel & Resort.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Images */}
          <div className="relative mx-auto w-full max-w-xl pb-16 pr-8 sm:pb-20 sm:pr-14">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/about/about-main.png"
                alt="Velmora hotel interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-0 w-[48%] border-8 border-[#F6F1E8] sm:border-[10px]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/about/about-small.png"
                  alt="Velmora hotel experience"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute left-5 top-5 h-24 w-24 border-l border-t border-[#C9A227] sm:-left-6 sm:-top-6 sm:h-32 sm:w-32" />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              OUR STORY
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-[#14213D] sm:text-5xl">
              A Place Created for Meaningful Stays
            </h2>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-7 text-base leading-8 text-[#242424]/70">
              Velmora Hotel & Resort is designed to provide guests with a calm,
              elegant and welcoming place to stay. The hotel combines
              comfortable accommodation, thoughtful hospitality and refined
              surroundings to create an experience that feels both relaxing
              and memorable.
            </p>

            <p className="mt-5 text-base leading-8 text-[#242424]/70">
              From beautifully designed rooms and dining experiences to leisure
              facilities and personalised guest service, every part of Velmora
              is created around comfort, convenience and quality.
            </p>

            <p className="mt-5 text-base leading-8 text-[#242424]/70">
              Whether visiting for a short escape, family stay, celebration or
              relaxing holiday, Velmora aims to make every guest feel welcome.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              THE VELMORA EXPERIENCE
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
              What Makes Velmora Special
            </h2>

            <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 text-base leading-8 text-[#242424]/70">
              Every detail is designed to support a comfortable, elegant and
              memorable stay.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="border border-[#D8CBB8]/70 bg-[#F6F1E8] p-7 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#C9A227]/50 text-[#C9A227]">
                    <Icon size={25} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-6 font-[var(--font-playfair)] text-xl font-semibold text-[#14213D]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#242424]/65">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Split */}
      <section className="grid bg-[#14213D] lg:grid-cols-2">
        <div className="relative min-h-[460px]">
          <Image
            src="/images/gallery/gallery-4.png"
            alt="Velmora pool and leisure experience"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex items-center px-6 py-16 text-white sm:px-10 md:px-14 lg:px-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              MORE THAN ACCOMMODATION
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold leading-tight sm:text-5xl">
              Stay. Relax. Dine. Discover.
            </h2>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-7 text-base leading-8 text-white/70">
              Velmora brings accommodation, dining, leisure, wellness and
              memorable experiences together in one elegant destination.
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
            Experience Velmora for Yourself
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#242424]/70">
            Discover elegant accommodation, relaxing spaces and warm
            hospitality at Velmora Hotel & Resort.
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