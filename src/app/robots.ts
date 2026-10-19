import type {
  MetadataRoute,
} from "next";

import { siteConfig } from "@/lib/site-config";

export default function robots():
  MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",

      allow: "/",

      disallow: [
        "/admin/",
        "/api/",
        "/account/",
        "/sign-in",
        "/sign-up",
        "/booking/guest-details",
        "/booking/review",
        "/booking/payment",
        "/booking/confirmation",
      ],
    },

    sitemap:
      `${siteConfig.url}/sitemap.xml`,
  };
}