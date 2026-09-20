import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
import { offers } from "@/data/offers";

export const metadata: Metadata = {
  title: "Special Offers | Velmora Hotel & Resort",
  description:
    "Discover special packages and offers available at Velmora Hotel & Resort.",
};

export default function OffersPage() {
  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[500px] items-end overflow-hidden">
        <Image
          src="/images/offers/weekend-retreat.png"
          alt="Special offers at Velmora Hotel and Resort"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/85 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
              SPECIAL OFFERS
            </p>

            <h1 className="mt-5 font-[var(--font-playfair)] text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Make Your Stay Even More Special
            </h1>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Discover carefully created packages for relaxing escapes,
              romantic stays, family getaways and memorable dining
              experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            EXCLUSIVE VELMORA PACKAGES
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            Find the Perfect Escape
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-7 text-base leading-8 text-[#242424]/70">
            Explore Velmora packages created to make your stay more relaxing,
            memorable and enjoyable.
          </p>
        </div>
      </section>

      {/* Offers */}
      <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="group overflow-hidden border border-[#D8CBB8]/60 bg-[#F6F1E8]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute left-0 top-0 bg-[#C9A227] px-5 py-3 text-[10px] font-bold tracking-[0.15em] text-[#14213D]">
                  {offer.badge}
                </div>
              </div>

              <div className="p-7 sm:p-8">
                <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                  {offer.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#242424]/70">
                  {offer.description}
                </p>

                <p className="mt-6 text-sm font-semibold text-[#C9A227]">
                  {offer.price}
                </p>

                <Link
                  href={`/offers/${offer.slug}`}
                  className="group/link mt-7 inline-flex items-center gap-3 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:text-[#C9A227]"
                >
                  VIEW DETAILS

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}