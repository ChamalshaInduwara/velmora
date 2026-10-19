import type { Metadata } from "next";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import PolicyPage from "@/components/layout/policy-page";
import TopBar from "@/components/layout/top-bar";

export const metadata: Metadata = {
  title:
    "Terms & Conditions | Velmora Hotel & Resort",
  description:
    "Terms and conditions for using the Velmora Hotel & Resort website and reservation service.",
};

export default function TermsPage() {
  return (
    <>
      <TopBar />
      <Navbar />

      <PolicyPage
        eyebrow="TERMS"
        title="Terms & Conditions"
        description="These terms describe the conditions that apply when using the Velmora Hotel & Resort website and reservation services."
        sections={[
          {
            title:
              "Reservations",
            paragraphs: [
              "A reservation is considered confirmed when the system successfully creates the booking and provides a Velmora booking reference.",
              "Guests are responsible for providing accurate contact, guest and booking information.",
            ],
          },
          {
            title:
              "Room Availability",
            paragraphs: [
              "Room availability is based on the selected dates, room capacity, current reservations and operational room status.",
              "Rooms placed under maintenance or marked inactive are excluded from booking availability.",
            ],
          },
          {
            title:
              "Pricing",
            paragraphs: [
              "Reservation prices are calculated using the room rate stored by Velmora at the time the booking is created.",
              "The final booking total is shown during the reservation process before confirmation.",
            ],
          },
          {
            title:
              "Payments",
            paragraphs: [
              "The current Velmora booking system supports Pay at Hotel reservations.",
              "A Pay at Hotel reservation may initially display an initiated payment status until hotel staff record the payment as received.",
            ],
          },
          {
            title:
              "Guest Responsibilities",
            paragraphs: [
              "Guests must provide truthful reservation information and use the website only for legitimate hotel and travel-related purposes.",
            ],
          },
          {
            title:
              "Changes to These Terms",
            paragraphs: [
              "Velmora may update these terms as the hotel website and booking services evolve.",
            ],
          },
        ]}
      />

      <Footer />
    </>
  );
}