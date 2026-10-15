import Link from "next/link";

import {
  BedDouble,
  CircleCheck,
  Construction,
  PowerOff,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const dynamic =
  "force-dynamic";

export default async function AdminRoomsPage() {
  const roomTypes =
    await prisma.roomType.findMany({
      include: {
        rooms: true,

        _count: {
          select: {
            rooms: true,
          },
        },
      },

      orderBy: {
        pricePerNight: "asc",
      },
    });

  const allRooms =
    roomTypes.flatMap(
      (roomType) =>
        roomType.rooms
    );

  const availableCount =
    allRooms.filter(
      (room) =>
        room.status ===
        "AVAILABLE"
    ).length;

  const maintenanceCount =
    allRooms.filter(
      (room) =>
        room.status ===
        "MAINTENANCE"
    ).length;

  const inactiveCount =
    allRooms.filter(
      (room) =>
        room.status ===
        "INACTIVE"
    ).length;

  const stats = [
    {
      label:
        "Total Physical Rooms",

      value:
        allRooms.length,

      icon:
        BedDouble,
    },

    {
      label:
        "Available",

      value:
        availableCount,

      icon:
        CircleCheck,
    },

    {
      label:
        "Maintenance",

      value:
        maintenanceCount,

      icon:
        Construction,
    },

    {
      label:
        "Inactive",

      value:
        inactiveCount,

      icon:
        PowerOff,
    },
  ];

  return (
    <div>
      <div>
        <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
          INVENTORY
        </p>

        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
          Room Management
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#242424]/60">
          Manage Velmora room
          types and physical hotel
          inventory.
        </p>
      </div>

      {/* Stats */}
      <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(
          (stat) => {
            const Icon =
              stat.icon;

            return (
              <article
                key={
                  stat.label
                }
                className="border border-[#D8CBB8]/70 bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center bg-[#F6F1E8]">
                  <Icon
                    size={20}
                    className="text-[#C9A227]"
                  />
                </div>

                <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-[#242424]/45">
                  {
                    stat.label
                  }
                </p>

                <p className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                  {
                    stat.value
                  }
                </p>
              </article>
            );
          }
        )}
      </section>

      {/* Room types */}
      <section className="mt-10">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
            ROOM TYPES
          </p>

          <h2 className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
            Accommodation Inventory
          </h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {roomTypes.map(
            (roomType) => {
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
                <article
                  key={
                    roomType.id
                  }
                  className="border border-[#D8CBB8]/70 bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.15em] text-[#C9A227]">
                        {roomType.isActive
                          ? "ACTIVE"
                          : "INACTIVE TYPE"}
                      </p>

                      <h3 className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                        {
                          roomType.name
                        }
                      </h3>
                    </div>

                    <span className="bg-[#F6F1E8] px-3 py-2 text-xs font-semibold text-[#14213D]">
                      {
                        roomType._count
                          .rooms
                      }{" "}
                      rooms
                    </span>
                  </div>

                  <div className="mt-6 space-y-3 border-y border-[#D8CBB8]/60 py-5 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#242424]/55">
                        Price
                      </span>

                      <span className="font-medium text-[#14213D]">
                        LKR{" "}
                        {roomType.pricePerNight.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-[#242424]/55">
                        Capacity
                      </span>

                      <span className="font-medium text-[#14213D]">
                        {
                          roomType.capacity
                        }{" "}
                        guests
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-[#242424]/55">
                        Bed
                      </span>

                      <span className="text-right font-medium text-[#14213D]">
                        {
                          roomType.bedType
                        }
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-[#F6F1E8] p-3">
                      <p className="text-lg font-semibold text-[#14213D]">
                        {available}
                      </p>

                      <p className="mt-1 text-[10px] text-[#242424]/50">
                        AVAILABLE
                      </p>
                    </div>

                    <div className="bg-[#F6F1E8] p-3">
                      <p className="text-lg font-semibold text-[#14213D]">
                        {maintenance}
                      </p>

                      <p className="mt-1 text-[10px] text-[#242424]/50">
                        MAINT.
                      </p>
                    </div>

                    <div className="bg-[#F6F1E8] p-3">
                      <p className="text-lg font-semibold text-[#14213D]">
                        {inactive}
                      </p>

                      <p className="mt-1 text-[10px] text-[#242424]/50">
                        INACTIVE
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/admin/rooms/${roomType.id}`}
                    className="mt-6 inline-flex min-h-11 w-full items-center justify-center bg-[#14213D] px-6 text-xs font-bold tracking-[0.1em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
                  >
                    MANAGE ROOMS
                  </Link>
                </article>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
}