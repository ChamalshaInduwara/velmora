import type { Metadata } from "next";
import Image from "next/image";
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import ContactForm from "@/components/contact/contact-form";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

export const metadata: Metadata = {
  title: "Contact | Velmora Hotel & Resort",
  description:
    "Contact Velmora Hotel & Resort for bookings, enquiries and guest assistance.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[480px] items-end overflow-hidden">
        <Image
          src="/images/gallery/gallery-9.png"
          alt="Contact Velmora Hotel and Resort"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/85 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227] sm:text-sm">
              CONTACT VELMORA
            </p>

            <h1 className="mt-5 font-[var(--font-playfair)] text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              We&apos;re Here to Help
            </h1>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Contact our team for booking assistance, hotel information or
              general enquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              GET IN TOUCH
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
              Contact Velmora
            </h2>

            <div className="mx-auto mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 text-base leading-8 text-[#242424]/70">
              Our guest-service team is available to help with reservations,
              hotel information and enquiries.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Location */}
            <div className="border border-[#D8CBB8]/70 bg-white p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#C9A227]/50 text-[#C9A227]">
                <MapPin size={23} />
              </div>

              <h3 className="mt-5 font-[var(--font-playfair)] text-xl font-semibold text-[#14213D]">
                Location
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#242424]/65">
                Colombo, Sri Lanka
              </p>
            </div>

            {/* Phone */}
            <div className="border border-[#D8CBB8]/70 bg-white p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#C9A227]/50 text-[#C9A227]">
                <Phone size={23} />
              </div>

              <h3 className="mt-5 font-[var(--font-playfair)] text-xl font-semibold text-[#14213D]">
                Call Us
              </h3>

              <a
                href="tel:+94712345678"
                className="mt-3 block text-sm text-[#242424]/65 transition hover:text-[#C9A227]"
              >
                +94 71 234 5678
              </a>
            </div>

            {/* Email */}
            <div className="border border-[#D8CBB8]/70 bg-white p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#C9A227]/50 text-[#C9A227]">
                <Mail size={23} />
              </div>

              <h3 className="mt-5 font-[var(--font-playfair)] text-xl font-semibold text-[#14213D]">
                Email Us
              </h3>

              <a
                href="mailto:reservations@velmora.com"
                className="mt-3 block break-all text-sm text-[#242424]/65 transition hover:text-[#C9A227]"
              >
                reservations@velmora.com
              </a>
            </div>

            {/* Guest Service */}
            <div className="border border-[#D8CBB8]/70 bg-white p-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#C9A227]/50 text-[#C9A227]">
                <Clock3 size={23} />
              </div>

              <h3 className="mt-5 font-[var(--font-playfair)] text-xl font-semibold text-[#14213D]">
                Guest Service
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#242424]/65">
                Available 24 hours a day
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              SEND AN ENQUIRY
            </p>

            <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
              How Can We Help?
            </h2>

            <div className="mt-6 h-px w-16 bg-[#C9A227]" />

            <p className="mt-6 max-w-xl text-base leading-8 text-[#242424]/70">
              Send us your enquiry and the Velmora team will be able to assist
              with reservations, hotel information and general questions.
            </p>

            <div className="mt-9">
              <ContactForm />
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="min-h-[570px] overflow-hidden">
              <iframe
                title="Velmora Hotel and Resort location"
                src="https://www.google.com/maps?q=Colombo%20Sri%20Lanka&output=embed"
                className="h-[570px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="bg-[#14213D] p-6 text-white">
              <div className="flex gap-4">
                <MapPin
                  size={21}
                  className="mt-1 shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-[#C9A227]">
                    VELMORA HOTEL & RESORT
                  </p>

                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Colombo, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}