"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Rooms",
    href: "/rooms",
  },
  {
    name: "Dining",
    href: "/dining",
  },
  {
    name: "Facilities",
    href: "/facilities",
  },
  {
    name: "Experiences",
    href: "/experiences",
  },
  {
    name: "Offers",
    href: "/offers",
  },
  {
    name: "About Us",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "My Booking",
    href: "/my-booking",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-navbar-theme]",
    );

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];

        if (visibleSection) {
          setIsLightBackground(
            visibleSection.target.getAttribute("data-navbar-theme") === "light",
          );
        }
      },
      {
        rootMargin: "-80px 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const surfaceClass = isLightBackground
    ? "border-b border-[#D8CBB8]/60 bg-[#F6F1E8]/95 text-[#14213D] shadow-sm backdrop-blur-md"
    : "border-b border-white/10 bg-[#14213D]/95 text-white shadow-sm backdrop-blur-md";
  const mobileMenuClass = isLightBackground
    ? "border-t border-[#D8CBB8]/60 bg-[#F6F1E8] lg:hidden"
    : "border-t border-white/10 bg-[#14213D] lg:hidden";
  const menuButtonClass = isLightBackground
    ? "border-[#14213D]/20 text-[#14213D]"
    : "border-white/20 text-white";
  const logoClass = isLightBackground ? "text-[#14213D]" : "text-white";
  const mobileLinkClass = isLightBackground
    ? "border-[#D8CBB8]/60 text-[#14213D]"
    : "border-white/10 text-white";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${surfaceClass}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex flex-col leading-none"
          onClick={() => setIsOpen(false)}
        >
          <span
            className={`font-[var(--font-playfair)] text-2xl font-semibold tracking-[0.16em] ${logoClass}`}
          >
            VELMORA
          </span>

          <span className="mt-1 text-[9px] font-medium tracking-[0.28em] text-[#C9A227]">
            HOTEL & RESORT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-[#C9A227] ${
                  isActive
                    ? "border-b-2 border-[#C9A227] pb-1 text-[#C9A227]"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Booking Button */}
        <div className="hidden lg:block">
          <Link
            href="/booking"
            className="inline-flex min-h-11 items-center justify-center bg-[#C9A227] px-6 text-sm font-semibold tracking-wide text-[#14213D] transition hover:bg-[#D8B43A]"
          >
            BOOK YOUR STAY
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className={`flex h-11 w-11 items-center justify-center border lg:hidden ${menuButtonClass}`}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={mobileMenuClass}>
          <nav
            className="mx-auto flex max-w-7xl flex-col px-4 py-5 sm:px-6"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`border-b py-4 text-sm font-medium transition-colors hover:text-[#C9A227] ${mobileLinkClass} ${
                    isActive ? "border-b-2 border-[#C9A227] text-[#C9A227]" : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="mt-6 flex min-h-12 items-center justify-center bg-[#C9A227] px-5 text-sm font-semibold tracking-wide text-[#14213D]"
            >
              BOOK YOUR STAY
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
