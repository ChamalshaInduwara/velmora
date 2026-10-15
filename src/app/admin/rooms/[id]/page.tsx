import Link from "next/link";

import {
  BedDouble,
  CircleCheck,
  Construction,
  Maximize2,
  PowerOff,
  Users,
} from "lucide-react";

import { notFound } from "next/navigation";

import RoomStatusControl from "@/components/admin/room-status-control";

import { prisma } from "@/lib/prisma";

export const dynamic =
  "force-dynamic";

type AdminRoomTypePageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatStatus(
  value: string
) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
}

export default async function AdminRoomTypePage({
  params,
}: AdminRoomTypePageProps) {
  const { id } =
    await params;

  const roomType =
    await prisma.roomType.findUnique({
      where: {
        id,
      },

      include: {
        rooms: {
          orderBy: [
            {
              floor: "asc",
            },
            {
              roomNumber:
                "asc",
            },
          ],
        },
      },
    });

  if (!roomType) {
    notFound();
  }

  const available =
    roomType.rooms.filter(
      (room) =>
        room.status ===
        "AVAILABLE"
    ).length;

  const maintenance =
    roomType.rooms.filter(
      (room) =>
        room.status ===
        "MAINTENANCE"
    ).length;

  const inactive =
    roomType.rooms.filter(
      (room) =>
        room.status ===
        "INACTIVE"
    ).length;

  return (
    <div>
      <Link
        href="/admin/rooms"
        className="text-xs font-semibold tracking-[0.1em] text-[#14213D] underline underline-offset-4"
      >
        ← BACK TO ROOM MANAGEMENT
      </Link>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
            ROOM TYPE
          </p>

          <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
            {roomType.name}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#242424]/60">
            {roomType.description ??
              roomType.shortDescription ??
              "Velmora accommodation."}
          </p>
        </div>

        <div className="bg-white px-6 py-4">
          <p className="text-xs text-[#242424]/45">
            NIGHTLY RATE
          </p>

          <p className="mt-1 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
            LKR{" "}
            {roomType.pricePerNight.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Room type info */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <article className="border border-[#D8CBB8]/70 bg-white p-5">
          <Users
            size={19}
            className="text-[#C9A227]"
          />

          <p className="mt-4 text-xs text-[#242424]/45">
            CAPACITY
          </p>

          <p className="mt-1 font-semibold text-[#14213D]">
            {roomType.capacity} guests
          </p>
        </article>

        <article className="border border-[#D8CBB8]/70 bg-white p-5">
          <BedDouble
            size={19}
            className="text-[#C9A227]"
          />

          <p className="mt-4 text-xs text-[#242424]/45">
            BED TYPE
          </p>

          <p className="mt-1 font-semibold text-[#14213D]">
            {roomType.bedType}
          </p>
        </article>

        <article className="border border-[#D8CBB8]/70 bg-white p-5">
          <Maximize2
            size={19}
            className="text-[#C9A227]"
          />

          <p className="mt-4 text-xs text-[#242424]/45">
            SIZE
          </p>

          <p className="mt-1 font-semibold text-[#14213D]">
            {roomType.sizeSqm
              ? `${roomType.sizeSqm} m²`
              : "—"}
          </p>
        </article>

        <article className="border border-[#D8CBB8]/70 bg-white p-5">
          <CircleCheck
            size={19}
            className="text-[#C9A227]"
          />

          <p className="mt-4 text-xs text-[#242424]/45">
            AVAILABLE
          </p>

          <p className="mt-1 text-2xl font-semibold text-[#14213D]">
            {available}
          </p>
        </article>

        <article className="border border-[#D8CBB8]/70 bg-white p-5">
          <Construction
            size={19}
            className="text-[#C9A227]"
          />

          <p className="mt-4 text-xs text-[#242424]/45">
            MAINTENANCE
          </p>

          <p className="mt-1 text-2xl font-semibold text-[#14213D]">
            {maintenance}
          </p>
        </article>
      </section>

      {/* Physical rooms */}
      <section className="mt-10">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
            PHYSICAL INVENTORY
          </p>

          <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
            Hotel Rooms
          </h2>

          <p className="mt-3 text-sm text-[#242424]/55">
            {roomType.rooms.length} physical room
            {roomType.rooms.length === 1
              ? ""
              : "s"}{" "}
            configured for this room type.
          </p>
        </div>

        <div className="overflow-x-auto border border-[#D8CBB8]/70 bg-white">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-[#14213D] text-white">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold tracking-[0.1em]">
                  ROOM
                </th>

                <th className="px-6 py-4 text-xs font-semibold tracking-[0.1em]">
                  FLOOR
                </th>

                <th className="px-6 py-4 text-xs font-semibold tracking-[0.1em]">
                  CURRENT STATUS
                </th>

                <th className="px-6 py-4 text-xs font-semibold tracking-[0.1em]">
                  CHANGE STATUS
                </th>
              </tr>
            </thead>

            <tbody>
              {roomType.rooms.map(
                (room) => (
                  <tr
                    key={room.id}
                    className="border-t border-[#D8CBB8]/60"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <BedDouble
                          size={18}
                          className="text-[#C9A227]"
                        />

                        <span className="font-semibold text-[#14213D]">
                          Room{" "}
                          {
                            room.roomNumber
                          }
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-[#242424]/65">
                      {room.floor ??
                        "—"}
                    </td>

                    <td className="px-6 py-5">
                      <span className="inline-flex bg-[#F6F1E8] px-3 py-2 text-xs font-semibold text-[#14213D]">
                        {formatStatus(
                          room.status
                        )}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <RoomStatusControl
                        roomId={
                          room.id
                        }
                        roomNumber={
                          room.roomNumber
                        }
                        currentStatus={
                          room.status
                        }
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {inactive > 0 && (
          <div className="mt-6 flex gap-3 border-l-4 border-[#14213D] bg-white px-5 py-4">
            <PowerOff
              size={19}
              className="mt-0.5 shrink-0 text-[#C9A227]"
            />

            <p className="text-sm leading-7 text-[#242424]/65">
              {inactive} room
              {inactive === 1
                ? ""
                : "s"}{" "}
              are currently inactive and are
              excluded from public booking
              availability.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}