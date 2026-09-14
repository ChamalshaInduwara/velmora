import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="bg-[#F6F1E8] px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Images */}
        <div className="relative mx-auto w-full max-w-xl pb-16 pr-8 sm:pb-20 sm:pr-14">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/about/about-main.png"
              alt="Elegant interior at Velmora Hotel and Resort"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-0 right-0 w-[48%] border-8 border-[#F6F1E8] sm:border-[10px]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/about/about-small.png"
                alt="Relaxing Velmora Hotel and Resort experience"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute left-5 top-5 h-24 w-24 border-l border-t border-[#C9A227] sm:-left-6 sm:-top-6 sm:h-32 sm:w-32" />
        </div>

        {/* Content */}
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
            ABOUT VELMORA
          </p>

          <h2 className="max-w-xl font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-[#14213D] sm:text-5xl lg:text-6xl">
            Where Comfort Meets Elegance
          </h2>

          <div className="mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-7 max-w-xl text-base leading-8 text-[#242424]/75">
            Velmora Hotel & Resort is designed for guests who value comfort,
            thoughtful hospitality and beautifully crafted surroundings. Every
            stay is created to offer a relaxing balance of modern luxury and
            timeless elegance.
          </p>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#242424]/75">
            From elegant accommodation and memorable dining to peaceful leisure
            spaces and personalised service, Velmora brings together everything
            needed for an unforgettable hotel experience.
          </p>

          <div className="mt-9">
            <Link
              href="/about"
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#14213D] px-7 text-xs font-semibold tracking-[0.14em] !text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
            >
              DISCOVER OUR STORY
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
