"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50 bg-[#14213D] text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex flex-col leading-none"
          onClick={() => setIsOpen(false)}
        >
          <span className="font-[var(--font-playfair)] text-2xl font-semibold tracking-[0.16em] text-white">
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-[#C9A227]"
            >
              {link.name}
            </Link>
          ))}
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
          className="flex h-11 w-11 items-center justify-center border border-white/20 lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#14213D] lg:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col px-4 py-5 sm:px-6"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-white/10 py-4 text-sm font-medium transition-colors hover:text-[#C9A227]"
              >
                {link.name}
              </Link>
            ))}

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