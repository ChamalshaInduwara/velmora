import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function TopBar() {
  return (
    <div className="border-b border-[#C9A227]/40 bg-[#14213D] text-white">
      <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <MapPin
            size={14}
            className="shrink-0 text-[#C9A227]"
          />

          <span>Colombo, Sri Lanka</span>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <div className="flex items-center gap-2">
            <Clock3 size={14} className="text-[#C9A227]" />
            <span>24/7 Guest Service</span>
          </div>

          <a
            href="tel:+94712345678"
            className="flex items-center gap-2 transition-colors hover:text-[#C9A227]"
          >
            <Phone size={14} className="text-[#C9A227]" />
            <span>+94 71 234 5678</span>
          </a>

          <a
            href="mailto:reservations@velmora.com"
            className="flex items-center gap-2 transition-colors hover:text-[#C9A227]"
          >
            <Mail size={14} className="text-[#C9A227]" />
            <span>reservations@velmora.com</span>
          </a>
        </div>

        <a
          href="tel:+94712345678"
          className="flex items-center gap-2 md:hidden"
          aria-label="Call Velmora Hotel"
        >
          <Phone size={14} className="text-[#C9A227]" />
          <span>Call Us</span>
        </a>
      </div>
    </div>
  );
}