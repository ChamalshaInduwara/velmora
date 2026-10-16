import Link from "next/link";
import {
  CircleCheck,
  Clock3,
  Inbox,
  MessageSquareText,
  Search,
} from "lucide-react";

import { InquiryStatus, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; status?: string }>;
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function formatStatus(value: string) {
  return value.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) =>
    letter.toUpperCase()
  );
}

export default async function AdminEnquiriesPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const validStatuses = Object.values(InquiryStatus);
  const selectedStatus = validStatuses.includes(
    params.status as InquiryStatus
  )
    ? (params.status as InquiryStatus)
    : null;
  const where: Prisma.ContactInquiryWhereInput = {
    ...(selectedStatus ? { status: selectedStatus } : {}),
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { subject: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const [enquiries, totalCount, newCount, progressCount, resolvedCount] =
    await Promise.all([
      prisma.contactInquiry.findMany({ where, orderBy: { createdAt: "desc" } }),
      prisma.contactInquiry.count(),
      prisma.contactInquiry.count({ where: { status: InquiryStatus.NEW } }),
      prisma.contactInquiry.count({
        where: { status: InquiryStatus.IN_PROGRESS },
      }),
      prisma.contactInquiry.count({
        where: { status: InquiryStatus.RESOLVED },
      }),
    ]);
  const stats = [
    { label: "Total Enquiries", value: totalCount, icon: MessageSquareText },
    { label: "New", value: newCount, icon: Inbox },
    { label: "In Progress", value: progressCount, icon: Clock3 },
    { label: "Resolved", value: resolvedCount, icon: CircleCheck },
  ];

  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.25em] text-[#C9A227]">
        GUEST SUPPORT
      </p>
      <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold text-[#14213D]">
        Enquiry Management
      </h1>
      <p className="mt-4 text-sm leading-7 text-[#242424]/60">
        Review and manage contact enquiries submitted through the Velmora
        website.
      </p>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article
              key={stat.label}
              className="border border-[#D8CBB8]/70 bg-white p-6"
            >
              <Icon size={20} className="text-[#C9A227]" />
              <p className="mt-5 text-xs font-semibold tracking-[0.12em] text-[#242424]/45">
                {stat.label}
              </p>
              <p className="mt-2 font-[var(--font-playfair)] text-3xl font-semibold text-[#14213D]">
                {stat.value}
              </p>
            </article>
          );
        })}
      </section>

      <form className="mt-10 grid gap-4 border border-[#D8CBB8]/70 bg-white p-5 md:grid-cols-[1fr_220px_auto]">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A227]"
          />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Name, email or subject..."
            className="h-12 w-full border border-[#D8CBB8] pl-11 pr-4 text-sm outline-none focus:border-[#C9A227]"
          />
        </div>
        <select
          name="status"
          defaultValue={selectedStatus ?? ""}
          className="h-12 border border-[#D8CBB8] bg-white px-4 text-sm outline-none focus:border-[#C9A227]"
        >
          <option value="">All statuses</option>
          {validStatuses.map((status) => (
            <option key={status} value={status}>
              {formatStatus(status)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-12 bg-[#14213D] px-7 text-xs font-bold tracking-[0.12em] text-white transition hover:bg-[#C9A227] hover:text-[#14213D]"
        >
          SEARCH
        </button>
      </form>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-[#242424]/55">
          {enquiries.length} {enquiries.length === 1 ? "enquiry" : "enquiries"}
        </p>
        {(query || selectedStatus) && (
          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold text-[#14213D] underline underline-offset-4"
          >
            CLEAR FILTERS
          </Link>
        )}
      </div>

      <div className="mt-6 overflow-x-auto border border-[#D8CBB8]/70 bg-white">
        <table className="w-full min-w-[950px] text-left">
          <thead className="bg-[#14213D] text-white">
            <tr>
              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                SENDER
              </th>
              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                SUBJECT
              </th>
              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                RECEIVED
              </th>
              <th className="px-5 py-4 text-xs font-semibold tracking-[0.1em]">
                STATUS
              </th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {enquiries.map((inquiry) => (
              <tr
                key={inquiry.id}
                className="border-t border-[#D8CBB8]/60"
              >
                <td className="px-5 py-5">
                  <p className="font-semibold text-[#14213D]">{inquiry.name}</p>
                  <p className="mt-1 text-xs text-[#242424]/45">
                    {inquiry.email}
                  </p>
                </td>
                <td className="px-5 py-5 text-sm text-[#242424]/70">
                  {inquiry.subject}
                </td>
                <td className="px-5 py-5 text-sm text-[#242424]/60">
                  {formatDate(inquiry.createdAt)}
                </td>
                <td className="px-5 py-5">
                  <span className="inline-flex bg-[#F6F1E8] px-3 py-2 text-xs font-semibold text-[#14213D]">
                    {formatStatus(inquiry.status)}
                  </span>
                </td>
                <td className="px-5 py-5">
                  <Link
                    href={`/admin/enquiries/${inquiry.id}`}
                    className="text-xs font-bold tracking-[0.08em] text-[#C9A227] transition hover:text-[#14213D]"
                  >
                    VIEW
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {enquiries.length === 0 && (
          <div className="p-10 text-center text-sm text-[#242424]/55">
            No enquiries matched your search.
          </div>
        )}
      </div>
    </div>
  );
}
