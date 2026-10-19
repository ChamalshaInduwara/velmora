import type {
  Metadata,
} from "next";

import ResetPasswordForm from "@/components/auth/reset-password-form";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import TopBar from "@/components/layout/top-bar";

export const metadata:
  Metadata = {
  title: "Reset Password",

  robots: {
    index: false,
    follow: false,
  },
};

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
    error?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params =
    await searchParams;

  const token =
    params.token ?? "";

  const invalidToken =
    params.error ===
    "INVALID_TOKEN";

  return (
    <>
      <TopBar />
      <Navbar />

      <main className="bg-[#F6F1E8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[560px] max-w-6xl items-center justify-center">
          <section className="w-full max-w-xl border border-[#D8CBB8]/70 bg-white p-6 sm:p-10">
            <ResetPasswordForm
              token={token}
              invalidToken={
                invalidToken
              }
            />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}