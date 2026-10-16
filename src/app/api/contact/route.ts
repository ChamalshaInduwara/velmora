import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function POST(
  request: Request
) {
  try {
    const body =
      (await request.json()) as ContactRequestBody;

    const name =
      getString(body.name);

    const email =
      getString(
        body.email
      ).toLowerCase();

    const phone =
      getString(body.phone);

    const subject =
      getString(body.subject);

    const message =
      getString(body.message);

    if (
      name.length < 2 ||
      name.length > 120
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid name.",
        },
        {
          status: 400,
        }
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      phone &&
      (
        phone.length < 7 ||
        phone.length > 25
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid phone number.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      subject.length < 3 ||
      subject.length > 150
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid enquiry subject.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      message.length < 10 ||
      message.length > 3000
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your message must be between 10 and 3000 characters.",
        },
        {
          status: 400,
        }
      );
    }

    const inquiry =
      await prisma.contactInquiry.create({
        data: {
          name,
          email,

          phone:
            phone || null,

          subject,
          message,
        },

        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        inquiry,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Contact inquiry creation failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not send your enquiry. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}