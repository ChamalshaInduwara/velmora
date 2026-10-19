import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/lib/email/auth-emails";

import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(
    prisma,
    {
      provider: "postgresql",
    }
  ),

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,

    autoSignInAfterVerification:
      false,

    expiresIn: 60 * 60,

    sendVerificationEmail:
      async ({
        user,
        url,
      }) => {
        await sendVerificationEmail({
          email: user.email,
          name: user.name,
          url,
        });
      },
  },

  emailAndPassword: {
    enabled: true,

    requireEmailVerification:
      true,

    minPasswordLength: 8,

    maxPasswordLength: 128,

    resetPasswordTokenExpiresIn:
      60 * 60,

    revokeSessionsOnPasswordReset:
      true,

    sendResetPassword:
      async ({
        user,
        url,
      }) => {
        await sendPasswordResetEmail({
          email: user.email,
          name: user.name,
          url,
        });
      },
  },
});