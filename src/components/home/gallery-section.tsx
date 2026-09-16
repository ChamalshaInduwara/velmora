import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleryImages } from "@/data/gallery";

export default function GallerySection() {
  return (
    <section className="bg-[#14213D] px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
              VELMORA GALLERY
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-white sm:text-5xl">
              A Glimpse of Your Velmora Experience
            </h2>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 text-base leading-8 text-white/70">
              Explore the spaces, moments and experiences that make every stay
              at Velmora Hotel & Resort unforgettable.
            </p>
          </div>

          <Link
            href="/gallery"
            className="group inline-flex w-fit items-center gap-3 text-xs font-bold tracking-[0.14em] text-[#C9A227] transition hover:text-white"
          >
            VIEW FULL GALLERY

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="mt-14 grid auto-rows-[240px] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((item, index) => {
            const largeItem =
              index === 0
                ? "md:row-span-2 lg:col-span-2 lg:row-span-2"
                : index === 3
                  ? "lg:col-span-2"
                  : "";

            return (
              <article
                key={item.id}
                className={`group relative overflow-hidden ${largeItem}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition group-hover:opacity-95" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-[#C9A227]">
                    {item.category.toUpperCase()}
                  </p>

                  <h3 className="mt-2 font-[var(--font-playfair)] text-xl font-semibold text-white sm:text-2xl">
                    {item.title}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}