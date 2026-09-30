import Link from "next/link";

import RoomCard from "@/components/rooms/room-card";
import { getActiveRoomTypes } from "@/lib/rooms";

export default async function RoomsSection() {
  const rooms = await getActiveRoomTypes();

  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
            ROOMS & SUITES
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            Stay in Exceptional Comfort
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-6 text-base leading-8 text-[#242424]/70">
            Discover thoughtfully designed rooms and suites created for
            comfort, relaxation and unforgettable stays.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              slug={room.slug}
              name={room.name}
              image={room.imageUrl ?? "/images/rooms/deluxe-king.png"}
              description={
                room.shortDescription ??
                "Experience comfort and elegance at Velmora Hotel & Resort."
              }
              guests={room.capacity}
              bed={room.bedType}
              size={room.sizeSqm ? `${room.sizeSqm} m²` : "—"}
              price={room.pricePerNight}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/rooms"
            className="inline-flex min-h-12 items-center justify-center bg-[#C9A227] px-8 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-[#14213D] hover:text-white"
          >
            VIEW ALL ROOMS
          </Link>
        </div>
      </div>
    </section>
  );
}