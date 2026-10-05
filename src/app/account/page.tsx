import type { Metadata } from "next";

import {
  Mail,
  User,
} from "lucide-react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/auth/sign-out-button";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title:
    "My Account | Velmora Hotel & Resort",

  description:
    "Manage your Velmora Hotel & Resort customer account.",
};

export const dynamic =
  "force-dynamic";

export default async function AccountPage() {
  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });

  if (!session) {
    redirect(
      "/sign-in"
    );
  }

  return (
    <main className="bg-[#F6F1E8]">
      <TopBar />
      <Navbar />

      <section className="bg-[#14213D] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A227]">
            CUSTOMER ACCOUNT
          </p>

          <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold sm:text-5xl">
            Welcome,{" "}
            {session.user.name}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
            Manage your Velmora
            account and reservation
            information.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C9A227]">
              PROFILE
            </p>

            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
              Account Information
            </h2>

            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              <div className="flex gap-3">
                <User
                  size={19}
                  className="mt-0.5 shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    NAME
                  </p>

                  <p className="mt-1 font-medium text-[#14213D]">
                    {
                      session.user
                        .name
                    }
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={19}
                  className="mt-0.5 shrink-0 text-[#C9A227]"
                />

                <div>
                  <p className="text-xs text-[#242424]/45">
                    EMAIL
                  </p>

                  <p className="mt-1 break-all font-medium text-[#14213D]">
                    {
                      session.user
                        .email
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 border-t border-[#D8CBB8]/70 pt-7">
              <SignOutButton />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
