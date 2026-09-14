import HeroSection from "@/components/home/hero-section";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

export default function Home() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <HeroSection />
    </main>
  );
}