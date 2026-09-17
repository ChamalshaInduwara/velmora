import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalBookingSection() {
  return (
    <section className="relative min-h-[560px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/booking/final-booking.png"
        alt="Velmora Hotel and Resort luxury experience"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/80 via-black/35 to-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
            YOUR ESCAPE AWAITS
          </p>

          <h2 className="mt-5 font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            Ready for Your Velmora Experience?
          </h2>

          <div className="mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            Book your stay and experience comfort, elegance and unforgettable
            hospitality at Velmora Hotel & Resort.
          </p>

          <div className="mt-9">
            <Link
              href="/booking"
              className="group inline-flex min-h-13 items-center justify-center gap-3 bg-[#C9A227] px-8 text-xs font-bold tracking-[0.15em] text-[#14213D] transition hover:bg-white"
            >
              BOOK YOUR STAY

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}