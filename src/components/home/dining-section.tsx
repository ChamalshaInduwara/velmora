import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DiningSection() {
  return (
    <section className="bg-[#14213D]">
      <div className="grid min-h-[620px] lg:grid-cols-2">
        {/* Image */}
        <div className="relative min-h-[420px] lg:min-h-full">
          <Image
            src="/images/dining/dining-main.png"
            alt="Fine dining experience at Velmora Hotel and Resort"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="flex items-center px-6 py-16 sm:px-10 md:px-14 lg:px-16 xl:px-20">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
              CULINARY EXPERIENCES
            </p>

            <h2 className="mt-5 font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Taste Something Exceptional
            </h2>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-7 text-base leading-8 text-white/75">
              Enjoy beautifully prepared local and international cuisine
              created to make every dining experience memorable.
            </p>

            <p className="mt-5 text-base leading-8 text-white/70">
              From relaxed breakfasts to elegant evening dining, Velmora
              combines carefully selected ingredients, thoughtful presentation
              and warm hospitality.
            </p>

            <div className="mt-9">
              <Link
                href="/dining"
                className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#C9A227] px-7 text-xs font-bold tracking-[0.14em] text-[#14213D] transition hover:bg-white"
              >
                EXPLORE DINING

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}