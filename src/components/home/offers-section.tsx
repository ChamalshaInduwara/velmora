import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { offers } from "@/data/offers";

export default function OffersSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
              SPECIAL OFFERS
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-[#14213D] sm:text-5xl">
              Make Your Stay Even More Special
            </h2>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 text-base leading-8 text-[#242424]/70">
              Discover exclusive Velmora packages created for relaxing
              getaways, romantic escapes, family stays and memorable dining
              experiences.
            </p>
          </div>

          <Link
            href="/offers"
            className="group inline-flex w-fit items-center gap-3 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:text-[#C9A227]"
          >
            VIEW ALL OFFERS

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Offer Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="group overflow-hidden border border-[#D8CBB8]/60 bg-[#F6F1E8]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute left-0 top-0 bg-[#C9A227] px-4 py-2 text-[10px] font-bold tracking-[0.13em] text-[#14213D]">
                  {offer.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                  {offer.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#242424]/65">
                  {offer.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-[#C9A227]">
                  {offer.price}
                </p>

                <Link
                  href={`/offers/${offer.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:text-[#C9A227]"
                >
                  VIEW DETAILS
                  <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}