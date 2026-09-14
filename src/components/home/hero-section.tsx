"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/hero/hero-1.png",
    eyebrow: "WELCOME TO VELMORA",
    title: "Where Every Stay Feels Extraordinary",
    description:
      "Experience elegant accommodation, relaxing spaces and unforgettable hospitality at Velmora Hotel & Resort.",
  },
  {
    image: "/images/hero/hero-2.png",
    eyebrow: "LUXURY • COMFORT • EXPERIENCE",
    title: "Stay in Timeless Comfort",
    description:
      "Discover beautifully designed rooms and suites created for peaceful, memorable stays.",
  },
  {
    image: "/images/hero/hero-3.png",
    eyebrow: "UNFORGETTABLE EXPERIENCES",
    title: "Relax, Dine and Discover",
    description:
      "Enjoy exceptional dining, beautiful surroundings and carefully crafted resort experiences.",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const previousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  };

  return (
    <section
      className="relative min-h-[calc(100vh-136px)] overflow-hidden bg-[#14213D]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-136px)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold tracking-[0.32em] text-[#C9A227] sm:text-sm">
            {slides[currentSlide].eyebrow}
          </p>

          <h1 className="max-w-3xl font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {slides[currentSlide].title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            {slides[currentSlide].description}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/rooms"
              className="inline-flex min-h-12 items-center justify-center border border-white px-7 text-sm font-semibold tracking-wide !text-white transition hover:bg-white hover:!text-black"
            >
              EXPLORE ROOMS
            </Link>

            <Link
              href="/booking"
              className="inline-flex min-h-12 items-center justify-center bg-[#C9A227] px-7 text-sm font-semibold tracking-wide text-[#14213D] transition hover:bg-[#D8B43A]"
            >
              BOOK YOUR STAY
            </Link>
          </div>
        </div>
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous hero slide"
        className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 text-white transition hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#14213D] md:flex"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next hero slide"
        className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/40 text-white transition hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#14213D] md:flex"
      >
        <ChevronRight size={22} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1 transition-all ${
              currentSlide === index
                ? "w-10 bg-[#C9A227]"
                : "w-6 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}