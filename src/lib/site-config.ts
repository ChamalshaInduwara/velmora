const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

export const siteConfig = {
  name: "Velmora Hotel & Resort",

  shortName: "Velmora",

  description:
    "Discover elegant accommodation, fine dining, relaxing experiences and memorable hospitality at Velmora Hotel & Resort in Colombo, Sri Lanka.",

  tagline:
    "Where Comfort Meets Elegance.",

  url: rawSiteUrl.replace(/\/$/, ""),

  location: {
    city: "Colombo",
    country: "Sri Lanka",
    countryCode: "LK",
  },

  contact: {
    phone: "+94 71 234 5678",
    email: "reservations@velmora.com",
  },
};