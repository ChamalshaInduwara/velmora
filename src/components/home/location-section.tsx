import {
  ExternalLink,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Plane,
} from "lucide-react";

export default function LocationSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
            FIND VELMORA
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            Discover Our Location
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-6 text-base leading-8 text-[#242424]/70">
            Conveniently located in Colombo, Velmora Hotel & Resort gives
            guests easy access to the city while providing a peaceful and
            elegant place to relax.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-14 grid overflow-hidden border border-[#D8CBB8]/60 lg:grid-cols-2">
          {/* Map */}
          <div className="relative min-h-[450px] bg-[#F6F1E8]">
            <iframe
              title="Velmora Hotel and Resort location"
              src="https://www.google.com/maps?q=Colombo%20Sri%20Lanka&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Information */}
          <div className="bg-[#14213D] px-6 py-12 text-white sm:px-10 lg:px-12 lg:py-14">
            <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
              VELMORA HOTEL & RESORT
            </p>

            <h3 className="mt-4 font-[var(--font-playfair)] text-3xl font-semibold sm:text-4xl">
              Your Escape in Colombo
            </h3>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
              Plan your arrival and explore the surrounding city from the
              comfort of Velmora Hotel & Resort.
            </p>

            {/* Details */}
            <div className="mt-9 space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C9A227]/50 text-[#C9A227]">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-[#C9A227]">
                    LOCATION
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/80">
                    Colombo, Sri Lanka
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C9A227]/50 text-[#C9A227]">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-[#C9A227]">
                    PHONE
                  </p>

                  <a
                    href="tel:+94712345678"
                    className="mt-1 block text-sm text-white/80 transition hover:text-[#C9A227]"
                  >
                    +94 71 234 5678
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C9A227]/50 text-[#C9A227]">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-[#C9A227]">
                    EMAIL
                  </p>

                  <a
                    href="mailto:reservations@velmora.com"
                    className="mt-1 block text-sm text-white/80 transition hover:text-[#C9A227]"
                  >
                    reservations@velmora.com
                  </a>
                </div>
              </div>

              {/* Airport */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C9A227]/50 text-[#C9A227]">
                  <Plane size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-[#C9A227]">
                    AIRPORT ACCESS
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/80">
                    Airport transfer service available for hotel guests.
                  </p>
                </div>
              </div>

              {/* Attractions */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#C9A227]/50 text-[#C9A227]">
                  <Landmark size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-[#C9A227]">
                    NEARBY EXPERIENCES
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/80">
                    Shopping, dining, cultural attractions and city experiences
                    are within convenient reach.
                  </p>
                </div>
              </div>
            </div>

            {/* Directions */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Colombo%2C%20Sri%20Lanka"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex min-h-12 items-center justify-center gap-3 bg-[#C9A227] px-7 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-white"
            >
              GET DIRECTIONS
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}