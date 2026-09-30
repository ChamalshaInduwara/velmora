import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, RoomStatus } from "../src/generated/prisma/client";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Neither DIRECT_URL nor DATABASE_URL is configured.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Starting Velmora database seed...");

  // Hotel
  const hotel = await prisma.hotel.upsert({
    where: {
      slug: "velmora-hotel-resort",
    },

    update: {
      name: "Velmora Hotel & Resort",
      description:
        "A modern luxury hotel and resort offering elegant accommodation, memorable dining, relaxing facilities and warm hospitality.",
      city: "Colombo",
      country: "Sri Lanka",
      phone: "+94 71 234 5678",
      email: "reservations@velmora.com",
    },

    create: {
      name: "Velmora Hotel & Resort",
      slug: "velmora-hotel-resort",
      description:
        "A modern luxury hotel and resort offering elegant accommodation, memorable dining, relaxing facilities and warm hospitality.",
      city: "Colombo",
      country: "Sri Lanka",
      phone: "+94 71 234 5678",
      email: "reservations@velmora.com",
    },
  });

  console.log(`Hotel ready: ${hotel.name}`);

  // Deluxe King
  const deluxeKing = await prisma.roomType.upsert({
    where: {
      hotelId_slug: {
        hotelId: hotel.id,
        slug: "deluxe-king",
      },
    },

    update: {
      name: "Deluxe King Room",
      shortDescription:
        "A refined room designed for comfort, relaxation and elegant stays.",
      description:
        "The Deluxe King Room combines timeless elegance with modern comfort and provides a peaceful space for couples and solo travellers.",
      capacity: 2,
      bedType: "King Bed",
      sizeSqm: 42,
      pricePerNight: 28000,
      imageUrl: "/images/rooms/deluxe-king.png",
      amenities: [
        "King-size bed",
        "Free high-speed Wi-Fi",
        "Air conditioning",
        "Smart TV",
        "Tea and coffee facilities",
        "Private bathroom",
        "In-room safe",
        "24-hour room service",
      ],
      isActive: true,
    },

    create: {
      hotelId: hotel.id,
      name: "Deluxe King Room",
      slug: "deluxe-king",
      shortDescription:
        "A refined room designed for comfort, relaxation and elegant stays.",
      description:
        "The Deluxe King Room combines timeless elegance with modern comfort and provides a peaceful space for couples and solo travellers.",
      capacity: 2,
      bedType: "King Bed",
      sizeSqm: 42,
      pricePerNight: 28000,
      imageUrl: "/images/rooms/deluxe-king.png",
      amenities: [
        "King-size bed",
        "Free high-speed Wi-Fi",
        "Air conditioning",
        "Smart TV",
        "Tea and coffee facilities",
        "Private bathroom",
        "In-room safe",
        "24-hour room service",
      ],
      isActive: true,
    },
  });

  // Ocean View Suite
  const oceanViewSuite = await prisma.roomType.upsert({
    where: {
      hotelId_slug: {
        hotelId: hotel.id,
        slug: "ocean-view-suite",
      },
    },

    update: {
      name: "Ocean View Suite",
      shortDescription:
        "A spacious suite with relaxing interiors and beautiful ocean views.",
      description:
        "The Ocean View Suite offers generous space, elegant interiors and beautiful views for guests looking for additional comfort and privacy.",
      capacity: 2,
      bedType: "King Bed",
      sizeSqm: 58,
      pricePerNight: 45000,
      imageUrl: "/images/rooms/ocean-view-suite.png",
      amenities: [
        "King-size bed",
        "Ocean view",
        "Private sitting area",
        "Free high-speed Wi-Fi",
        "Air conditioning",
        "Smart TV",
        "Luxury bathroom",
        "Mini refrigerator",
        "Tea and coffee facilities",
        "24-hour room service",
      ],
      isActive: true,
    },

    create: {
      hotelId: hotel.id,
      name: "Ocean View Suite",
      slug: "ocean-view-suite",
      shortDescription:
        "A spacious suite with relaxing interiors and beautiful ocean views.",
      description:
        "The Ocean View Suite offers generous space, elegant interiors and beautiful views for guests looking for additional comfort and privacy.",
      capacity: 2,
      bedType: "King Bed",
      sizeSqm: 58,
      pricePerNight: 45000,
      imageUrl: "/images/rooms/ocean-view-suite.png",
      amenities: [
        "King-size bed",
        "Ocean view",
        "Private sitting area",
        "Free high-speed Wi-Fi",
        "Air conditioning",
        "Smart TV",
        "Luxury bathroom",
        "Mini refrigerator",
        "Tea and coffee facilities",
        "24-hour room service",
      ],
      isActive: true,
    },
  });

  // Family Suite
  const familySuite = await prisma.roomType.upsert({
    where: {
      hotelId_slug: {
        hotelId: hotel.id,
        slug: "family-suite",
      },
    },

    update: {
      name: "Family Suite",
      shortDescription:
        "A comfortable and spacious suite designed for memorable family stays.",
      description:
        "The Family Suite offers generous living space and practical comfort for families travelling together.",
      capacity: 4,
      bedType: "1 King + 2 Single Beds",
      sizeSqm: 68,
      pricePerNight: 52000,
      imageUrl: "/images/rooms/family-suite.png",
      amenities: [
        "King bed and two single beds",
        "Family seating area",
        "Free high-speed Wi-Fi",
        "Air conditioning",
        "Smart TV",
        "Private bathroom",
        "Mini refrigerator",
        "Tea and coffee facilities",
        "In-room safe",
        "24-hour room service",
      ],
      isActive: true,
    },

    create: {
      hotelId: hotel.id,
      name: "Family Suite",
      slug: "family-suite",
      shortDescription:
        "A comfortable and spacious suite designed for memorable family stays.",
      description:
        "The Family Suite offers generous living space and practical comfort for families travelling together.",
      capacity: 4,
      bedType: "1 King + 2 Single Beds",
      sizeSqm: 68,
      pricePerNight: 52000,
      imageUrl: "/images/rooms/family-suite.png",
      amenities: [
        "King bed and two single beds",
        "Family seating area",
        "Free high-speed Wi-Fi",
        "Air conditioning",
        "Smart TV",
        "Private bathroom",
        "Mini refrigerator",
        "Tea and coffee facilities",
        "In-room safe",
        "24-hour room service",
      ],
      isActive: true,
    },
  });

  console.log("Room types ready.");

  const physicalRooms = [
    { roomNumber: "101", floor: 1, roomTypeId: deluxeKing.id },
    { roomNumber: "102", floor: 1, roomTypeId: deluxeKing.id },
    { roomNumber: "103", floor: 1, roomTypeId: deluxeKing.id },
    { roomNumber: "104", floor: 1, roomTypeId: deluxeKing.id },

    { roomNumber: "201", floor: 2, roomTypeId: oceanViewSuite.id },
    { roomNumber: "202", floor: 2, roomTypeId: oceanViewSuite.id },
    { roomNumber: "203", floor: 2, roomTypeId: oceanViewSuite.id },

    { roomNumber: "301", floor: 3, roomTypeId: familySuite.id },
    { roomNumber: "302", floor: 3, roomTypeId: familySuite.id },
    { roomNumber: "303", floor: 3, roomTypeId: familySuite.id },
  ];

  for (const room of physicalRooms) {
    await prisma.room.upsert({
      where: {
        hotelId_roomNumber: {
          hotelId: hotel.id,
          roomNumber: room.roomNumber,
        },
      },

      update: {
        roomTypeId: room.roomTypeId,
        floor: room.floor,
        status: RoomStatus.AVAILABLE,
      },

      create: {
        hotelId: hotel.id,
        roomTypeId: room.roomTypeId,
        roomNumber: room.roomNumber,
        floor: room.floor,
        status: RoomStatus.AVAILABLE,
      },
    });
  }

  console.log(`${physicalRooms.length} physical rooms ready.`);
  console.log("Velmora database seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
