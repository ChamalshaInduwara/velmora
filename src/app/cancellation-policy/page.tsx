import type { Metadata } from "next";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import PolicyPage from "@/components/layout/policy-page";
import TopBar from "@/components/layout/top-bar";

export const metadata: Metadata = {
  title:
    "Cancellation Policy | Velmora Hotel & Resort",
  description:
    "Read the Velmora Hotel & Resort reservation cancellation policy.",
};

export default function CancellationPolicyPage() {
  return (
    <>
      <TopBar />
      <Navbar />

      <PolicyPage
        eyebrow="RESERVATIONS"
        title="Cancellation Policy"
        description="This policy explains how confirmed Velmora reservations may be cancelled."
        sections={[
          {
            title:
              "Cancelling a Reservation",
            paragraphs: [
              "Eligible confirmed reservations may be cancelled through the My Booking area using the booking reference and guest email address.",
              "Registered guests may also view reservations associated with their account.",
            ],
          },
          {
            title:
              "Cancellation Timing",
            paragraphs: [
              "The current Velmora system allows an eligible reservation to be cancelled up to and including the scheduled check-in date, provided the stay has not already begun.",
              "Reservations that have already been checked in or checked out cannot be cancelled through the customer cancellation flow.",
            ],
          },
          {
            title:
              "Room Availability After Cancellation",
            paragraphs: [
              "When a reservation is cancelled successfully, its assigned room inventory is released from the blocking reservation pool and may become available for other bookings.",
            ],
          },
          {
            title:
              "Pay at Hotel Reservations",
            paragraphs: [
              "For unpaid Pay at Hotel reservations, an initiated payment record is cancelled when the reservation is cancelled.",
            ],
          },
          {
            title:
              "Assistance",
            paragraphs: [
              "If you have difficulty managing a reservation, contact Velmora Hotel & Resort and provide your booking reference.",
            ],
          },
        ]}
      />

      <Footer />
    </>
  );
}