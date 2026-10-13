import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getAdminFromRequest(
  request: Request
) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return {
      session: null,
      admin: null,
    };
  }

  const admin = await prisma.user.findFirst({
    where: {
      id: session.user.id,
      role: "ADMIN",
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return {
    session,
    admin,
  };
}