import type { Metadata } from "next";

import BookingSearch from "@/components/booking/booking-search";
import AboutSection from "@/components/home/about-section";
import DiningSection from "@/components/home/dining-section";
import ExperiencesSection from "@/components/home/experiences-section";
import FacilitiesSection from "@/components/home/facilities-section";
import FinalBookingSection from "@/components/home/final-booking-section";
import GallerySection from "@/components/home/gallery-section";
import HeroSection from "@/components/home/hero-section";
import LocationSection from "@/components/home/location-section";
import OffersSection from "@/components/home/offers-section";
import ReviewsSection from "@/components/home/reviews-section";
import RoomsSection from "@/components/home/rooms-section";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";
import HotelJsonLd from "@/components/seo/hotel-json-ld";

export const metadata: Metadata = {
  title: "Luxury Hotel in Colombo, Sri Lanka",
  description:
    "Experience elegant rooms, fine dining, wellness, leisure and memorable hospitality at Velmora Hotel & Resort in Colombo, Sri Lanka.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <HotelJsonLd />

      <main>
        <TopBar />
        <Navbar />

        <HeroSection />
        <BookingSearch />
        <AboutSection />
        <RoomsSection />
        <FacilitiesSection />
        <DiningSection />
        <ExperiencesSection />
        <OffersSection />
        <GallerySection />
        <ReviewsSection />
        <LocationSection />
        <FinalBookingSection />

        <Footer />
      </main>
    </>
  );
}