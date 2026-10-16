import Link from "next/link";

import {
  BedDouble,
  BookOpenCheck,
  LayoutDashboard,
  MessageSquareText,
  Users,
} from "lucide-react";

import { redirect } from "next/navigation";

import SignOutButton from "@/components/auth/sign-out-button";

import { getAdminUser } from "@/lib/admin-auth";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: BookOpenCheck,
  },
  {
    label: "Rooms",
    href: "/admin/rooms",
    icon: BedDouble,
  },
  {
    label: "Guests",
    href: "/admin/guests",
    icon: Users,
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: MessageSquareText,
  },
];

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const admin =
    await getAdminUser();

  if (!admin) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[#F6F1E8]">
      <header className="border-b border-white/10 bg-[#14213D] text-white">
        <div className="mx-auto flex min-h-20 max-w-[1600px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/admin"
              className="font-[var(--font-playfair)] text-2xl font-semibold tracking-[0.08em]"
            >
              VELMORA
            </Link>

            <p className="mt-1 text-[10px] font-semibold tracking-[0.3em] text-[#C9A227]">
              ADMINISTRATION
            </p>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">
              {admin.name}
            </p>

            <p className="mt-1 text-xs text-white/50">
              {admin.email}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[250px_1fr]">
        <aside className="border-r border-[#D8CBB8]/70 bg-white p-5 lg:min-h-[calc(100vh-80px)]">
          <nav className="space-y-2">
            {adminLinks.map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    className="flex min-h-11 items-center gap-3 px-4 text-sm font-medium text-[#14213D] transition hover:bg-[#F6F1E8]"
                  >
                    <Icon
                      size={18}
                      className="text-[#C9A227]"
                    />

                    {
                      item.label
                    }
                  </Link>
                );
              }
            )}
          </nav>

          <div className="mt-8 border-t border-[#D8CBB8]/70 pt-6">
            <Link
              href="/"
              className="mb-4 block px-4 text-xs font-semibold tracking-[0.12em] text-[#14213D]"
            >
              VIEW WEBSITE
            </Link>

            <SignOutButton />
          </div>
        </aside>

        <main className="min-w-0 p-5 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}