import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F1E8]">
      <TopBar />

      <Navbar />

      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-[#C9A227]">
            WELCOME TO VELMORA
          </p>

          <h1 className="text-5xl font-semibold text-[#14213D] md:text-7xl">
            Where Comfort Meets Elegance
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#242424]/75 md:text-lg">
            Experience elegant accommodation, relaxing spaces and
            unforgettable hospitality at Velmora Hotel & Resort.
          </p>
        </div>
      </section>
    </main>
  );
}