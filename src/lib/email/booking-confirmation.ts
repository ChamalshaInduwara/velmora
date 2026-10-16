import { resend } from "@/lib/email/resend";

type BookingConfirmationEmailInput = {
  bookingReference: string;

  guest: {
    firstName: string;
    lastName: string;
    email: string;
  };

  roomName: string;

  checkIn: Date;
  checkOut: Date;

  nights: number;

  adults: number;
  children: number;
  numberOfRooms: number;

  totalAmount: number;

  paymentMethod:
    | "PAY_AT_HOTEL"
    | "CARD";
};

function formatDate(
  date: Date
) {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      dateStyle: "long",
      timeZone: "UTC",
    }
  ).format(date);
}

function escapeHtml(
  value: string
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPaymentMethod(
  value:
    | "PAY_AT_HOTEL"
    | "CARD"
) {
  return value ===
    "PAY_AT_HOTEL"
    ? "Pay at Hotel"
    : "Card";
}

export async function sendBookingConfirmationEmail({
  bookingReference,
  guest,
  roomName,
  checkIn,
  checkOut,
  nights,
  adults,
  children,
  numberOfRooms,
  totalAmount,
  paymentMethod,
}: BookingConfirmationEmailInput) {
  if (!resend) {
    console.warn(
      "Booking email skipped: RESEND_API_KEY is not configured."
    );

    return {
      success: false,
      skipped: true,
    };
  }

  const from =
    process.env.BOOKING_EMAIL_FROM;

  if (!from) {
    console.warn(
      "Booking email skipped: BOOKING_EMAIL_FROM is not configured."
    );

    return {
      success: false,
      skipped: true,
    };
  }

  const guestName =
    `${guest.firstName} ${guest.lastName}`;

  const safeGuestName =
    escapeHtml(guestName);

  const safeReference =
    escapeHtml(
      bookingReference
    );

  const safeRoomName =
    escapeHtml(roomName);

  const paymentLabel =
    formatPaymentMethod(
      paymentMethod
    );

  const result =
    await resend.emails.send({
      from,

      to: guest.email,

      subject:
        `Velmora Booking Confirmation — ${bookingReference}`,

      html: `
        <!DOCTYPE html>
        <html>
          <body
            style="
              margin:0;
              padding:0;
              background:#F6F1E8;
              font-family:Arial,Helvetica,sans-serif;
              color:#242424;
            "
          >
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                background:#F6F1E8;
                padding:32px 16px;
              "
            >
              <tr>
                <td align="center">

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      max-width:640px;
                      background:#FFFFFF;
                      border-collapse:collapse;
                    "
                  >

                    <tr>
                      <td
                        style="
                          background:#14213D;
                          padding:32px;
                          text-align:center;
                        "
                      >
                        <div
                          style="
                            font-family:Georgia,serif;
                            font-size:30px;
                            letter-spacing:4px;
                            color:#FFFFFF;
                          "
                        >
                          VELMORA
                        </div>

                        <div
                          style="
                            margin-top:8px;
                            font-size:11px;
                            letter-spacing:3px;
                            color:#C9A227;
                          "
                        >
                          HOTEL & RESORT
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:36px 32px 24px;
                        "
                      >
                        <div
                          style="
                            font-size:12px;
                            font-weight:bold;
                            letter-spacing:2px;
                            color:#C9A227;
                          "
                        >
                          BOOKING CONFIRMED
                        </div>

                        <h1
                          style="
                            margin:12px 0 16px;
                            font-family:Georgia,serif;
                            font-size:30px;
                            font-weight:normal;
                            color:#14213D;
                          "
                        >
                          Thank you, ${safeGuestName}
                        </h1>

                        <p
                          style="
                            margin:0;
                            font-size:15px;
                            line-height:1.8;
                            color:#555555;
                          "
                        >
                          Your reservation at Velmora Hotel & Resort
                          has been confirmed. Please keep your booking
                          reference for check-in and future enquiries.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:0 32px 24px;
                        "
                      >
                        <div
                          style="
                            background:#F6F1E8;
                            padding:22px;
                          "
                        >
                          <div
                            style="
                              font-size:11px;
                              letter-spacing:2px;
                              color:#777777;
                            "
                          >
                            BOOKING REFERENCE
                          </div>

                          <div
                            style="
                              margin-top:8px;
                              font-size:22px;
                              font-weight:bold;
                              color:#14213D;
                            "
                          >
                            ${safeReference}
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:0 32px 32px;
                        "
                      >
                        <table
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            border-collapse:collapse;
                          "
                        >
                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#777777;font-size:13px;">
                              Room
                            </td>

                            <td align="right" style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#14213D;font-size:14px;">
                              ${safeRoomName}
                            </td>
                          </tr>

                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#777777;font-size:13px;">
                              Check-in
                            </td>

                            <td align="right" style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#14213D;font-size:14px;">
                              ${formatDate(checkIn)}
                            </td>
                          </tr>

                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#777777;font-size:13px;">
                              Check-out
                            </td>

                            <td align="right" style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#14213D;font-size:14px;">
                              ${formatDate(checkOut)}
                            </td>
                          </tr>

                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#777777;font-size:13px;">
                              Stay
                            </td>

                            <td align="right" style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#14213D;font-size:14px;">
                              ${nights}
                              night${nights === 1 ? "" : "s"}
                            </td>
                          </tr>

                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#777777;font-size:13px;">
                              Guests
                            </td>

                            <td align="right" style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#14213D;font-size:14px;">
                              ${adults}
                              adult${adults === 1 ? "" : "s"}
                              ${
                                children > 0
                                  ? ` · ${children} ${children === 1 ? "child" : "children"}`
                                  : ""
                              }
                            </td>
                          </tr>

                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#777777;font-size:13px;">
                              Rooms
                            </td>

                            <td align="right" style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#14213D;font-size:14px;">
                              ${numberOfRooms}
                            </td>
                          </tr>

                          <tr>
                            <td style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#777777;font-size:13px;">
                              Payment
                            </td>

                            <td align="right" style="padding:14px 0;border-bottom:1px solid #E6DED2;color:#14213D;font-size:14px;">
                              ${paymentLabel}
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding:20px 0;
                                font-weight:bold;
                                color:#14213D;
                              "
                            >
                              Total
                            </td>

                            <td
                              align="right"
                              style="
                                padding:20px 0;
                                font-family:Georgia,serif;
                                font-size:24px;
                                font-weight:bold;
                                color:#C9A227;
                              "
                            >
                              LKR ${totalAmount.toLocaleString()}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          background:#14213D;
                          padding:28px 32px;
                          text-align:center;
                        "
                      >
                        <p
                          style="
                            margin:0;
                            color:#FFFFFF;
                            font-size:13px;
                            line-height:1.8;
                          "
                        >
                          Velmora Hotel & Resort<br />
                          Colombo, Sri Lanka<br />
                          +94 71 234 5678<br />
                          reservations@velmora.com
                        </p>

                        <p
                          style="
                            margin:14px 0 0;
                            color:#C9A227;
                            font-size:11px;
                            letter-spacing:1px;
                          "
                        >
                          WHERE COMFORT MEETS ELEGANCE.
                        </p>
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

  if (result.error) {
    console.error(
      "Booking confirmation email failed:",
      result.error
    );

    return {
      success: false,
      skipped: false,
    };
  }

  return {
    success: true,
    skipped: false,
    emailId:
      result.data?.id,
  };
}