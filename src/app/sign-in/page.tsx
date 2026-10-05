import type { Metadata } from "next";

import SignInForm from "@/components/auth/sign-in-form";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

export const metadata: Metadata = {
  title:
    "Sign In | Velmora Hotel & Resort",

  description:
    "Sign in to your Velmora Hotel & Resort account.",
};

export default function SignInPage() {
  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
              WELCOME BACK
            </p>

            <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D] sm:text-5xl">
              Sign In
            </h1>

            <p className="mt-5 text-sm leading-7 text-[#242424]/65">
              Sign in to access
              your Velmora customer
              account.
            </p>
          </div>

          <div className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
            <SignInForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
