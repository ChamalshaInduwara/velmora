import { resend } from "@/lib/email/resend";

function getFromAddress() {
  return (
    process.env.AUTH_EMAIL_FROM ??
    process.env.BOOKING_EMAIL_FROM
  );
}

export async function sendVerificationEmail({
  email,
  name,
  url,
}: {
  email: string;
  name: string;
  url: string;
}) {
  if (!resend) {
    console.warn(
      "Verification email skipped: RESEND_API_KEY is not configured."
    );

    return;
  }

  const from = getFromAddress();

  if (!from) {
    console.warn(
      "Verification email skipped: no sender address is configured."
    );

    return;
  }

  const result = await resend.emails.send({
    from,
    to: email,
    subject: "Verify your Velmora account",
    html: `
      <div style="font-family:Arial,sans-serif;background:#F6F1E8;padding:32px;">
        <div style="max-width:600px;margin:auto;background:#FFFFFF;">
          <div style="background:#14213D;padding:30px;text-align:center;color:#FFFFFF;">
            <h1 style="margin:0;font-family:Georgia,serif;">
              VELMORA
            </h1>

            <p style="color:#C9A227;letter-spacing:2px;">
              HOTEL & RESORT
            </p>
          </div>

          <div style="padding:32px;">
            <h2 style="font-family:Georgia,serif;color:#14213D;">
              Verify your email
            </h2>

            <p style="line-height:1.8;color:#555555;">
              Hello ${name},
            </p>

            <p style="line-height:1.8;color:#555555;">
              Please verify your email address to activate your Velmora account.
            </p>

            <a
              href="${url}"
              style="
                display:inline-block;
                margin-top:16px;
                background:#C9A227;
                color:#14213D;
                padding:14px 24px;
                text-decoration:none;
                font-weight:bold;
              "
            >
              VERIFY EMAIL
            </a>

            <p style="margin-top:28px;font-size:12px;color:#777777;">
              If you did not create this account, you can ignore this email.
            </p>
          </div>
        </div>
      </div>
    `,
  });

  if (result.error) {
    console.error(
      "Verification email failed:",
      result.error
    );
  }
}

export async function sendPasswordResetEmail({
  email,
  name,
  url,
}: {
  email: string;
  name: string;
  url: string;
}) {
  if (!resend) {
    console.warn(
      "Password reset email skipped: RESEND_API_KEY is not configured."
    );

    return;
  }

  const from = getFromAddress();

  if (!from) {
    console.warn(
      "Password reset email skipped: no sender address is configured."
    );

    return;
  }

  const result = await resend.emails.send({
    from,
    to: email,
    subject: "Reset your Velmora password",
    html: `
      <div style="font-family:Arial,sans-serif;background:#F6F1E8;padding:32px;">
        <div style="max-width:600px;margin:auto;background:#FFFFFF;">
          <div style="background:#14213D;padding:30px;text-align:center;color:#FFFFFF;">
            <h1 style="margin:0;font-family:Georgia,serif;">
              VELMORA
            </h1>

            <p style="color:#C9A227;letter-spacing:2px;">
              HOTEL & RESORT
            </p>
          </div>

          <div style="padding:32px;">
            <h2 style="font-family:Georgia,serif;color:#14213D;">
              Reset your password
            </h2>

            <p style="line-height:1.8;color:#555555;">
              Hello ${name},
            </p>

            <p style="line-height:1.8;color:#555555;">
              We received a request to reset your Velmora account password.
            </p>

            <a
              href="${url}"
              style="
                display:inline-block;
                margin-top:16px;
                background:#C9A227;
                color:#14213D;
                padding:14px 24px;
                text-decoration:none;
                font-weight:bold;
              "
            >
              RESET PASSWORD
            </a>

            <p style="margin-top:28px;font-size:12px;color:#777777;">
              If you did not request this change, you can ignore this email.
            </p>
          </div>
        </div>
      </div>
    `,
  });

  if (result.error) {
    console.error(
      "Password reset email failed:",
      result.error
    );
  }
}