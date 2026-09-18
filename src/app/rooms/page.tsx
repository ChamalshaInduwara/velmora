import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
import RoomCard from "@/components/rooms/room-card";
import { rooms } from "@/data/rooms";

export const metadata: Metadata = {
  title: "Rooms & Suites | Velmora Hotel & Resort",
  description:
    "Explore elegant rooms and suites at Velmora Hotel & Resort.",
};

export default function RoomsPage() {
  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Page Hero */}
      <section className="relative flex min-h-[430px] items-center overflow-hidden">
        <Image
          src="/images/hero/hero-1.png"
          alt="Velmora Hotel and Resort rooms and suites"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#14213D]/70" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
              VELMORA ACCOMMODATION
            </p>

            <h1 className="mt-5 font-[var(--font-playfair)] text-5xl font-semibold text-white sm:text-6xl lg:text-7xl">
              Rooms & Suites
            </h1>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Discover elegant accommodation designed for comfort, relaxation
              and memorable stays at Velmora Hotel & Resort.
            </p>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              FIND YOUR PERFECT STAY
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
              Choose Your Room
            </h2>

            <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 text-base leading-8 text-[#242424]/70">
              Whether you are planning a relaxing escape, romantic getaway or
              family holiday, discover a space designed for your stay.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                slug={room.slug}
                name={room.name}
                image={room.image}
                description={room.description}
                guests={room.guests}
                bed={room.bed}
                size={room.size}
                price={room.price}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}