import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
import { offers } from "@/data/offers";

type OfferPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return offers.map((offer) => ({
    slug: offer.slug,
  }));
}

export async function generateMetadata({
  params,
}: OfferPageProps): Promise<Metadata> {
  const { slug } = await params;

  const offer = offers.find((item) => item.slug === slug);

  if (!offer) {
    return {
      title: "Offer Not Found | Velmora Hotel & Resort",
    };
  }

  return {
    title: `${offer.title} | Velmora Hotel & Resort`,
    description: offer.description,
  };
}

export default async function OfferDetailsPage({
  params,
}: OfferPageProps) {
  const { slug } = await params;

  const offer = offers.find((item) => item.slug === slug);

  if (!offer) {
    notFound();
  }

  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[560px] overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/offers"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#C9A227] transition hover:text-white"
            >
              <ArrowLeft size={16} />
              BACK TO OFFERS
            </Link>

            <p className="mt-7 text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              {offer.badge}
            </p>

            <h1 className="mt-4 font-[var(--font-playfair)] text-5xl font-semibold leading-tight text-white sm:text-6xl">
              {offer.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">
              {offer.description}
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* Main Content */}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              OFFER DETAILS
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
              Make Your Velmora Stay Special
            </h2>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-7 text-base leading-8 text-[#242424]/70">
              {offer.longDescription}
            </p>

            {/* Inclusions */}
            <div className="mt-14">
              <h3 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                Package Includes
              </h3>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {offer.inclusions.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-b border-[#D8CBB8]/70 pb-4"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#C9A227]/15 text-[#C9A227]">
                      <Check size={16} />
                    </div>

                    <span className="text-sm text-[#242424]/75">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="mt-12 border-l-2 border-[#C9A227] bg-white p-6">
              <p className="text-sm leading-7 text-[#242424]/70">
                Package availability, final pricing and inclusions may depend
                on selected dates and availability.
              </p>
            </div>
          </div>

          {/* Booking Card */}
          <aside className="h-fit bg-[#14213D] p-7 text-white lg:sticky lg:top-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              SPECIAL PACKAGE
            </p>

            <h3 className="mt-4 font-[var(--font-playfair)] text-3xl font-semibold">
              {offer.title}
            </h3>

            <p className="mt-6 text-sm text-white/55">
              Starting from
            </p>

            <p className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#C9A227]">
              {offer.price.replace("From ", "")}
            </p>

            <div className="my-7 h-px bg-white/15" />

            <p className="text-sm leading-7 text-white/70">
              Select your travel dates and continue to the Velmora booking
              process.
            </p>

            <Link
              href={`/booking?offer=${offer.slug}`}
              className="group mt-7 flex min-h-13 items-center justify-center gap-3 bg-[#C9A227] px-6 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-white"
            >
              BOOK THIS OFFER

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/offers"
              className="mt-4 flex min-h-12 items-center justify-center border border-white/25 px-6 text-xs font-semibold tracking-[0.14em] text-white transition hover:border-white"
            >
              VIEW OTHER OFFERS
            </Link>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}