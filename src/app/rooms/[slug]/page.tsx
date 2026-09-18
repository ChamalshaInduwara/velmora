import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Check,
  Maximize2,
  Users,
} from "lucide-react";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
import { rooms } from "@/data/rooms";

type RoomPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;

  const room = rooms.find((item) => item.slug === slug);

  if (!room) {
    return {
      title: "Room Not Found | Velmora Hotel & Resort",
    };
  }

  return {
    title: `${room.name} | Velmora Hotel & Resort`,
    description: room.description,
  };
}

export default async function RoomDetailsPage({
  params,
}: RoomPageProps) {
  const { slug } = await params;

  const room = rooms.find((item) => item.slug === slug);

  if (!room) {
    notFound();
  }

  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Room Hero */}
      <section className="relative min-h-[560px] overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-[#C9A227] transition hover:text-white"
            >
              <ArrowLeft size={16} />
              BACK TO ROOMS
            </Link>

            <h1 className="mt-5 font-[var(--font-playfair)] text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
              {room.name}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">
              {room.description}
            </p>
          </div>
        </div>
      </section>

      {/* Room Information */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* Left Content */}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              ROOM DETAILS
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
              A Stay Designed Around You
            </h2>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#242424]/70">
              {room.longDescription}
            </p>

            {/* Quick Information */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="border border-[#D8CBB8] bg-white p-6">
                <Users size={22} className="text-[#C9A227]" />

                <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-[#14213D]">
                  CAPACITY
                </p>

                <p className="mt-2 text-sm text-[#242424]/70">
                  Up to {room.guests} Guests
                </p>
              </div>

              <div className="border border-[#D8CBB8] bg-white p-6">
                <BedDouble size={22} className="text-[#C9A227]" />

                <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-[#14213D]">
                  BED TYPE
                </p>

                <p className="mt-2 text-sm text-[#242424]/70">
                  {room.bed}
                </p>
              </div>

              <div className="border border-[#D8CBB8] bg-white p-6">
                <Maximize2 size={22} className="text-[#C9A227]" />

                <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-[#14213D]">
                  ROOM SIZE
                </p>

                <p className="mt-2 text-sm text-[#242424]/70">
                  {room.size}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-14">
              <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                Room Amenities
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 border-b border-[#D8CBB8]/70 pb-4"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#C9A227]/15 text-[#C9A227]">
                      <Check size={16} />
                    </div>

                    <span className="text-sm text-[#242424]/75">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <aside className="h-fit bg-[#14213D] p-7 text-white lg:sticky lg:top-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              STARTING FROM
            </p>

            <div className="mt-4 flex items-end gap-2">
              <p className="font-[var(--font-playfair)] text-4xl font-semibold text-white">
                LKR {room.price.toLocaleString()}
              </p>
            </div>

            <p className="mt-1 text-sm text-white/55">
              per night
            </p>

            <div className="my-7 h-px bg-white/15" />

            <p className="text-sm leading-7 text-white/70">
              Select your travel dates and check availability for this room.
            </p>

            <Link
              href={`/booking?room=${room.slug}`}
              className="group mt-7 flex min-h-13 items-center justify-center gap-3 bg-[#C9A227] px-6 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-white"
            >
              CHECK AVAILABILITY

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/rooms"
              className="mt-4 flex min-h-12 items-center justify-center border border-white/25 px-6 text-xs font-semibold tracking-[0.14em] text-white transition hover:border-white"
            >
              VIEW OTHER ROOMS
            </Link>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}