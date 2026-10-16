import Link from "next/link";
import {
  CalendarDays,
  Mail,
  MessageSquareText,
  Phone,
  User,
} from "lucide-react";
import { notFound } from "next/navigation";

import EnquiryStatusActions from "@/components/admin/enquiry-status-actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(value);
}

function formatStatus(value: string) {
  return value.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) =>
    letter.toUpperCase()
  );
}

export default async function AdminEnquiryDetailsPage({ params }: Props) {
  const { id } = await params;
  const inquiry = await prisma.contactInquiry.findUnique({ where: { id } });

  if (!inquiry) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/enquiries"
        className="text-xs font-semibold tracking-[0.1em] text-[#14213D] underline underline-offset-4"
      >
        ← BACK TO ENQUIRIES
      </Link>
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
            ENQUIRY
          </p>
          <h1 className="mt-3 max-w-3xl font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
            {inquiry.subject}
          </h1>
          <p className="mt-3 text-sm text-[#242424]/55">
            Received {formatDate(inquiry.createdAt)}
          </p>
        </div>
        <span className="inline-flex w-fit bg-white px-5 py-3 text-xs font-bold tracking-[0.1em] text-[#14213D]">
          {formatStatus(inquiry.status)}
        </span>
      </div>

      <div className="mt-10 grid gap-7 xl:grid-cols-[1fr_340px]">
        <div className="space-y-7">
          <section className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <MessageSquareText size={20} className="mt-1 text-[#C9A227]" />
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-[#C9A227]">
                  MESSAGE
                </p>
                <h2 className="mt-2 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
                  {inquiry.subject}
                </h2>
              </div>
            </div>
            <div className="mt-8 border-t border-[#D8CBB8]/70 pt-7">
              <p className="whitespace-pre-wrap text-sm leading-8 text-[#242424]/70">
                {inquiry.message}
              </p>
            </div>
          </section>

          <section className="border border-[#D8CBB8]/70 bg-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#C9A227]">
              SENDER
            </p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
              Contact Information
            </h2>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <User size={19} className="text-[#C9A227]" />
                <div>
                  <p className="text-xs text-[#242424]/45">NAME</p>
                  <p className="mt-1 text-sm font-medium text-[#14213D]">
                    {inquiry.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={19} className="text-[#C9A227]" />
                <div>
                  <p className="text-xs text-[#242424]/45">EMAIL</p>
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="mt-1 block break-all text-sm font-medium text-[#14213D] underline underline-offset-4"
                  >
                    {inquiry.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone size={19} className="text-[#C9A227]" />
                <div>
                  <p className="text-xs text-[#242424]/45">PHONE</p>
                  <p className="mt-1 text-sm font-medium text-[#14213D]">
                    {inquiry.phone ?? "Not provided"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CalendarDays size={19} className="text-[#C9A227]" />
                <div>
                  <p className="text-xs text-[#242424]/45">RECEIVED</p>
                  <p className="mt-1 text-sm font-medium text-[#14213D]">
                    {formatDate(inquiry.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit border border-[#D8CBB8]/70 bg-white p-6 xl:sticky xl:top-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#C9A227]">
            ENQUIRY STATUS
          </p>
          <p className="mt-3 font-[var(--font-playfair)] text-2xl font-semibold text-[#14213D]">
            {formatStatus(inquiry.status)}
          </p>
          <p className="mt-3 text-sm leading-7 text-[#242424]/55">
            Update the enquiry as your team begins handling the guest request.
          </p>
          <div className="mt-6">
            <EnquiryStatusActions
              inquiryId={inquiry.id}
              currentStatus={inquiry.status}
            />
          </div>
          <div className="mt-7 border-t border-[#D8CBB8]/70 pt-6">
            <a
              href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                `Re: ${inquiry.subject}`
              )}`}
              className="inline-flex min-h-11 w-full items-center justify-center bg-[#14213D] px-5 text-xs font-bold tracking-[0.1em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
            >
              REPLY BY EMAIL
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
