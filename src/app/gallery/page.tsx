import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery | Velmora Hotel & Resort",
  description:
    "Explore rooms, dining, pool, spa, events and hotel views at Velmora Hotel & Resort.",
};

export default function GalleryPage() {
  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[500px] items-end overflow-hidden">
        <Image
          src="/images/gallery/gallery-1.png"
          alt="Velmora Hotel and Resort gallery"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/80 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
              VELMORA GALLERY
            </p>

            <h1 className="mt-5 font-[var(--font-playfair)] text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Discover the Velmora Experience
            </h1>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Explore the spaces, details and moments that define Velmora Hotel
              & Resort.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            EXPLORE VELMORA
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            A Glimpse Into Your Stay
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-7 text-base leading-8 text-[#242424]/70">
            From elegant rooms and relaxing poolside moments to memorable
            dining, wellness and special events, explore what awaits at Velmora.
          </p>
        </div>
      </section>

      {/* Full Gallery */}
      <section className="bg-[#14213D] px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-[240px] gap-4 md:auto-rows-[280px] md:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-12">
            {galleryImages.map((item, index) => {
              const gridClass = [
                "lg:col-span-7 lg:row-span-2",
                "lg:col-span-5",
                "lg:col-span-5",
                "lg:col-span-4",
                "lg:col-span-4",
                "lg:col-span-4",
                "lg:col-span-5",
                "lg:col-span-7",
                "lg:col-span-12",
              ][index];

              return (
                <article
                  key={item.id}
                  className={`group relative overflow-hidden ${gridClass}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 60vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition duration-300 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-[#C9A227]">
                      {item.category.toUpperCase()}
                    </p>

                    <h2 className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-white">
                      {item.title}
                    </h2>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
