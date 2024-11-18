import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  admin,
  bearer,
  multiSession,
  oneTap,
  organization,
  passkey,
  twoFactor,
} from "better-auth/plugins";

import { db } from "~/db";

const from = process.env.BETTER_AUTH_EMAIL || "delivered@resend.dev";
const to = process.env.TEST_EMAIL || "";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailVerification: {
    async sendVerificationEmail(user, url) {
      // uncomment this and use your mailing service here if you want to send emails for verification
      //   const res = await sendMail({
      //     from,
      //     to: to || user.email,
      //     subject: "Verify your email address",
      //     react: Email({ url: "https://mywebsite.com" }),
      //   });
      // },
      // sendOnSignUp: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async (user, url) => {
      // await sendEmail({
      //   to: user.email,
      //   subject: "Reset your password",
      //   text: `Click the link to reset your password: ${url}`,
      // });
    },
  },
  plugins: [
    passkey(),
    bearer(),
    admin(),
    multiSession(),
    oneTap(),
    twoFactor({
      otpOptions: {
        async sendOTP(user, otp) {
          //   await sendMail({
          //     from,
          //     to: user.email,
          //     subject: "Your OTP",
          //     html: `Your OTP is ${otp}`,
          //   });
        },
      },
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});

export type Session = auth.$Infer.Session;
