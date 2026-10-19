import type {
  MetadataRoute,
} from "next";

import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap():
  Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/rooms",
    "/dining",
    "/facilities",
    "/experiences",
    "/offers",
    "/gallery",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cancellation-policy",
  ];

  const entries:
    MetadataRoute.Sitemap =
    staticRoutes.map(
      (route) => ({
        url:
          `${siteConfig.url}${route}`,

        lastModified:
          new Date(),

        changeFrequency:
          route === ""
            ? "weekly"
            : "monthly",

        priority:
          route === ""
            ? 1
            : 0.7,
      })
    );

  /*
   * Include database-backed
   * room detail pages.
   *
   * If the database is temporarily
   * unavailable while generating the
   * sitemap, the static sitemap still
   * remains valid.
   */
  try {
    const roomTypes =
      await prisma.roomType.findMany({
        where: {
          isActive: true,
        },

        select: {
          slug: true,
          updatedAt: true,
        },
      });

    entries.push(
      ...roomTypes.map(
        (room) => ({
          url:
            `${siteConfig.url}/rooms/${room.slug}`,

          lastModified:
            room.updatedAt,

          changeFrequency:
            "weekly" as const,

          priority: 0.8,
        })
      )
    );
  } catch (error) {
    console.error(
      "Sitemap room retrieval failed:",
      error
    );
  }

  return entries;
}