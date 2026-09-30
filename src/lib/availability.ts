import {
  BookingStatus,
  RoomStatus,
} from "@/generated/prisma/client";

import { prisma } from "@/lib/prisma";

type AvailabilitySearchInput = {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  rooms: number;
  roomSlug?: string;
};

const blockingStatuses: BookingStatus[] = [
  BookingStatus.PENDING,
  BookingStatus.CONFIRMED,
  BookingStatus.CHECKED_IN,
];

export async function searchRoomAvailability({
  checkIn,
  checkOut,
  adults,
  children,
  rooms,
  roomSlug,
}: AvailabilitySearchInput) {
  const hotel = await prisma.hotel.findUnique({
    where: {
      slug: "velmora-hotel-resort",
    },
    select: {
      id: true,
    },
  });

  if (!hotel) {
    throw new Error("Velmora hotel record was not found.");
  }

  const roomTypes = await prisma.roomType.findMany({
    where: {
      hotelId: hotel.id,
      isActive: true,
      ...(roomSlug
        ? {
            slug: roomSlug,
          }
        : {}),
    },

    include: {
      rooms: {
        where: {
          status: RoomStatus.AVAILABLE,
        },

        select: {
          id: true,
        },
      },
    },

    orderBy: {
      pricePerNight: "asc",
    },
  });

  const overlappingReservations = await prisma.bookingRoom.groupBy({
    by: ["roomTypeId"],

    where: {
      booking: {
        hotelId: hotel.id,

        status: {
          in: blockingStatuses,
        },

        checkIn: {
          lt: checkOut,
        },

        checkOut: {
          gt: checkIn,
        },
      },
    },

    _count: {
      _all: true,
    },
  });

  const reservedCountByRoomType = new Map(
    overlappingReservations.map((item) => [
      item.roomTypeId,
      item._count._all,
    ])
  );

  const totalGuests = adults + children;

  return roomTypes
    .map((roomType) => {
      const operationalRooms = roomType.rooms.length;

      const reservedRooms =
        reservedCountByRoomType.get(roomType.id) ?? 0;

      const availableRooms = Math.max(
        operationalRooms - reservedRooms,
        0
      );

      const canFitGuests =
        roomType.capacity * rooms >= totalGuests;

      const hasRequestedRoomCount =
        availableRooms >= rooms;

      return {
        id: roomType.id,
        slug: roomType.slug,
        name: roomType.name,

        description:
          roomType.shortDescription ??
          "Elegant accommodation at Velmora Hotel & Resort.",

        image:
          roomType.imageUrl ??
          "/images/rooms/deluxe-king.jpg",

        capacity: roomType.capacity,
        bedType: roomType.bedType,
        sizeSqm: roomType.sizeSqm,
        pricePerNight: roomType.pricePerNight,

        operationalRooms,
        reservedRooms,
        availableRooms,

        canFitGuests,
        hasRequestedRoomCount,

        available:
          canFitGuests &&
          hasRequestedRoomCount,
      };
    })
    .filter((roomType) => roomType.available);
}