import {
  Car,
  Dumbbell,
  Plane,
  Soup,
  Sparkles,
  Waves,
  Wifi,
  ConciergeBell,
} from "lucide-react";

const facilities = [
  {
    name: "Swimming Pool",
    description:
      "Relax and unwind in our beautifully designed swimming pool area.",
    icon: Waves,
  },
  {
    name: "Free Wi-Fi",
    description:
      "Stay connected with complimentary high-speed Wi-Fi throughout the hotel.",
    icon: Wifi,
  },
  {
    name: "Restaurant",
    description:
      "Enjoy carefully prepared local and international cuisine.",
    icon: Soup,
  },
  {
    name: "Spa & Wellness",
    description:
      "Refresh your body and mind with relaxing spa and wellness treatments.",
    icon: Sparkles,
  },
  {
    name: "Fitness Centre",
    description:
      "Maintain your fitness routine with modern exercise facilities.",
    icon: Dumbbell,
  },
  {
    name: "Airport Transfer",
    description:
      "Convenient airport transfer services available for hotel guests.",
    icon: Plane,
  },
  {
    name: "Parking",
    description:
      "Secure and convenient parking facilities for Velmora guests.",
    icon: Car,
  },
  {
    name: "24-Hour Room Service",
    description:
      "Enjoy selected food and guest services from the comfort of your room.",
    icon: ConciergeBell,
  },
];

export default function FacilitiesSection() {
  return (
    <section className="bg-[#F6F1E8] px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
            HOTEL FACILITIES
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            Everything You Need for a Relaxing Stay
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-6 text-base leading-8 text-[#242424]/70">
            Discover thoughtful facilities and services designed to make every
            Velmora stay comfortable, convenient and memorable.
          </p>
        </div>

        {/* Facility Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility) => {
            const Icon = facility.icon;

            return (
              <article
                key={facility.name}
                className="group border border-[#D8CBB8]/60 bg-white p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-[#C9A227] hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#C9A227]/50 text-[#C9A227] transition group-hover:bg-[#C9A227] group-hover:text-[#14213D]">
                  <Icon size={25} strokeWidth={1.6} />
                </div>

                <h3 className="mt-6 font-[var(--font-playfair)] text-xl font-semibold text-[#14213D]">
                  {facility.name}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#242424]/65">
                  {facility.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}