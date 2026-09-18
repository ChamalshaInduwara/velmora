import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Dining", href: "/dining" },
  { name: "Experiences", href: "/experiences" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const policyLinks = [
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  {
    name: "Cancellation Policy",
    href: "/cancellation-policy",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#14213D] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <p className="font-[var(--font-playfair)] text-3xl font-semibold tracking-[0.12em]">
                VELMORA
              </p>

              <p className="mt-1 text-[10px] font-semibold tracking-[0.3em] text-[#C9A227]">
                HOTEL & RESORT
              </p>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">
              Experience elegant accommodation, memorable dining and warm
              hospitality at Velmora Hotel & Resort.
            </p>

            <p className="mt-5 font-[var(--font-playfair)] text-lg italic text-[#C9A227]">
              Where Comfort Meets Elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.16em] text-[#C9A227]">
              QUICK LINKS
            </h3>

            <div className="mt-6 flex flex-col gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="w-fit text-sm text-white/70 transition hover:text-[#C9A227]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.16em] text-[#C9A227]">
              CONTACT
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#C9A227]"
                />

                <p className="text-sm leading-6 text-white/70">
                  Colombo, Sri Lanka
                </p>
              </div>

              <a
                href="tel:+94712345678"
                className="flex w-fit gap-3 text-sm text-white/70 transition hover:text-[#C9A227]"
              >
                <Phone size={18} className="shrink-0 text-[#C9A227]" />
                +94 71 234 5678
              </a>

              <a
                href="mailto:reservations@velmora.com"
                className="flex w-fit gap-3 text-sm text-white/70 transition hover:text-[#C9A227]"
              >
                <Mail size={18} className="shrink-0 text-[#C9A227]" />
                reservations@velmora.com
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.16em] text-[#C9A227]">
              FOLLOW US
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/65">
              Follow Velmora for hotel updates, experiences and special
              offers.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Velmora Facebook"
                className="flex h-11 w-11 items-center justify-center border border-white/20 transition hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#14213D]"
              >
               <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="Velmora Instagram"
                className="flex h-11 w-11 items-center justify-center border border-white/20 transition hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#14213D]"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Velmora YouTube"
                className="flex h-11 w-11 items-center justify-center border border-white/20 transition hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-[#14213D]"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-xs text-white/50">
            © 2026 Velmora Hotel & Resort. All Rights Reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {policyLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-white/50 transition hover:text-[#C9A227]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}