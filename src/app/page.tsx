import BookingSearch from "@/components/booking/booking-search";
import AboutSection from "@/components/home/about-section";
import HeroSection from "@/components/home/hero-section";
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
    </main>
  );
}