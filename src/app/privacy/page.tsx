import type { Metadata } from "next";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import PolicyPage from "@/components/layout/policy-page";
import TopBar from "@/components/layout/top-bar";

export const metadata: Metadata = {
  title:
    "Privacy Policy | Velmora Hotel & Resort",
  description:
    "Learn how Velmora Hotel & Resort handles guest and booking information.",
};

export default function PrivacyPage() {
  return (
    <>
      <TopBar />
      <Navbar />

      <PolicyPage
        eyebrow="PRIVACY"
        title="Privacy Policy"
        description="This policy explains how information submitted through the Velmora Hotel & Resort website is collected and used."
        sections={[
          {
            title:
              "Information We Collect",
            paragraphs: [
              "When you make a reservation, create an account, or submit an enquiry, Velmora may collect information such as your name, email address, telephone number, country, booking dates, guest numbers, room selection and special requests.",
            ],
          },
          {
            title:
              "How Information Is Used",
            paragraphs: [
              "Guest information is used to process reservations, manage stays, provide booking confirmations, respond to enquiries and support hotel operations.",
              "Account information may also be used to display reservation history and provide access to customer features.",
            ],
          },
          {
            title:
              "Payment Information",
            paragraphs: [
              "Velmora currently supports Pay at Hotel reservations. The website records the payment method and payment status required for reservation management.",
              "The current system does not store payment card numbers.",
            ],
          },
          {
            title:
              "Data Security",
            paragraphs: [
              "Reasonable technical measures are used to protect stored information, including authenticated customer areas and role-protected administrative features.",
            ],
          },
          {
            title:
              "Contact Enquiries",
            paragraphs: [
              "Information submitted through the Contact page may be stored so that Velmora staff can review and respond to guest enquiries.",
            ],
          },
          {
            title:
              "Contact",
            paragraphs: [
              "Questions regarding this Privacy Policy may be directed to reservations@velmora.com.",
            ],
          },
        ]}
      />

      <Footer />
    </>
  );
}