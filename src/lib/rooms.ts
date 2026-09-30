import { prisma } from "@/lib/prisma";

export async function getActiveRoomTypes() {
  return prisma.roomType.findMany({
    where: {
      isActive: true,
    },
    include: {
      _count: {
        select: {
          rooms: {
            where: {
              status: "AVAILABLE",
            },
          },
        },
      },
    },
    orderBy: {
      pricePerNight: "asc",
    },
  });
}

export async function getRoomTypeBySlug(slug: string) {
  return prisma.roomType.findFirst({
    where: {
      slug,
      isActive: true,
    },
    include: {
      rooms: {
        where: {
          status: "AVAILABLE",
        },
        select: {
          id: true,
          roomNumber: true,
          floor: true,
          status: true,
        },
        orderBy: {
          roomNumber: "asc",
        },
      },
    },
  });
}