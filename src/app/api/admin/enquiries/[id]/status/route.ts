import { NextResponse } from "next/server";

import { InquiryStatus } from "@/generated/prisma/client";
import { getAdminFromRequest } from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type StatusRequest = {
  status?: unknown;
};

const allowedTransitions: Record<InquiryStatus, InquiryStatus[]> = {
  NEW: [InquiryStatus.IN_PROGRESS],
  IN_PROGRESS: [InquiryStatus.RESOLVED],
  RESOLVED: [],
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { session, admin } = await getAdminFromRequest(request);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 }
      );
    }

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Administrator access required." },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = (await request.json()) as StatusRequest;
    const requestedStatus =
      typeof body.status === "string" ? body.status : "";
    const validStatuses = Object.values(InquiryStatus);

    if (!validStatuses.includes(requestedStatus as InquiryStatus)) {
      return NextResponse.json(
        { success: false, error: "Invalid enquiry status." },
        { status: 400 }
      );
    }

    const newStatus = requestedStatus as InquiryStatus;
    const inquiry = await prisma.contactInquiry.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found." },
        { status: 404 }
      );
    }

    if (inquiry.status === newStatus) {
      return NextResponse.json({ success: true, status: inquiry.status });
    }

    if (!allowedTransitions[inquiry.status].includes(newStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: `Enquiry cannot move from ${inquiry.status} to ${newStatus}.`,
        },
        { status: 409 }
      );
    }

    const updatedInquiry = await prisma.contactInquiry.update({
      where: { id },
      data: { status: newStatus },
      select: { id: true, status: true, updatedAt: true },
    });

    return NextResponse.json({
      success: true,
      inquiry: updatedInquiry,
    });
  } catch (error) {
    console.error("Admin enquiry status update failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "The enquiry status could not be updated.",
      },
      { status: 500 }
    );
  }
}
