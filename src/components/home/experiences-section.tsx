import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/experiences";

export default function ExperiencesSection() {
  return (
    <section className="bg-[#F6F1E8] px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
            VELMORA EXPERIENCES
          </p>

          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
            More Than Just a Stay
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

          <p className="mt-6 text-base leading-8 text-[#242424]/70">
            Discover relaxing, memorable and meaningful experiences designed
            to make every moment at Velmora special.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {experiences.map((experience) => (
            <article
              key={experience.id}
              className="group relative min-h-[420px] overflow-hidden"
            >
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
                <h3 className="font-[var(--font-playfair)] text-3xl font-semibold text-white">
                  {experience.title}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">
                  {experience.description}
                </p>

                <Link
                  href="/experiences"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#C9A227] transition hover:text-white"
                >
                  DISCOVER MORE
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Main button */}
        <div className="mt-12 text-center">
          <Link
            href="/experiences"
            className="inline-flex min-h-12 items-center justify-center bg-[#14213D] px-8 text-xs font-semibold tracking-[0.14em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
          >
            EXPLORE ALL EXPERIENCES
          </Link>
        </div>
      </div>
    </section>
  );
}