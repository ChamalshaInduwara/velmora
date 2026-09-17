import BookingSearch from "@/components/booking/booking-search";
import AboutSection from "@/components/home/about-section";
import DiningSection from "@/components/home/dining-section";
import ExperiencesSection from "@/components/home/experiences-section";
import FacilitiesSection from "@/components/home/facilities-section";
import GallerySection from "@/components/home/gallery-section";
import HeroSection from "@/components/home/hero-section";
import LocationSection from "@/components/home/location-section";
import OffersSection from "@/components/home/offers-section";
import ReviewsSection from "@/components/home/reviews-section";
import RoomsSection from "@/components/home/rooms-section";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

export default function Home() {
  return (
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
    </main>
  );
}