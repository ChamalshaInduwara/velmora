import { siteConfig } from "@/lib/site-config";

export default function HotelJsonLd() {
  const data = {
    "@context":
      "https://schema.org",

    "@type": "Hotel",

    name:
      siteConfig.name,

    description:
      siteConfig.description,

    url:
      siteConfig.url,

    telephone:
      siteConfig.contact.phone,

    email:
      siteConfig.contact.email,

    address: {
      "@type":
        "PostalAddress",

      addressLocality:
        siteConfig.location.city,

      addressCountry:
        siteConfig.location.countryCode,
    },

    image: [
      `${siteConfig.url}/images/hero/hero-1.jpg`,
      `${siteConfig.url}/images/hero/hero-2.jpg`,
      `${siteConfig.url}/images/hero/hero-3.jpg`,
    ],

    amenityFeature: [
      {
        "@type":
          "LocationFeatureSpecification",
        name:
          "Swimming Pool",
        value: true,
      },
      {
        "@type":
          "LocationFeatureSpecification",
        name:
          "Free Wi-Fi",
        value: true,
      },
      {
        "@type":
          "LocationFeatureSpecification",
        name:
          "Restaurant",
        value: true,
      },
      {
        "@type":
          "LocationFeatureSpecification",
        name:
          "Spa & Wellness",
        value: true,
      },
      {
        "@type":
          "LocationFeatureSpecification",
        name:
          "Fitness Centre",
        value: true,
      },
      {
        "@type":
          "LocationFeatureSpecification",
        name:
          "Parking",
        value: true,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(
            data
          ).replace(
            /</g,
            "\\u003c"
          ),
      }}
    />
  );
}