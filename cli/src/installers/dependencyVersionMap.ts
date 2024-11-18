/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "@auth/core": "0.34.2",
  "next-auth": "^5.0.0-beta.20",
  "@auth/prisma-adapter": "^1.6.0",
  "@auth/drizzle-adapter": "^1.4.2",
  bcryptjs: "^2.4.3",
  "@types/bcryptjs": "^2.4.6",

  "@supabase/ssr": "^0.1.0",
  "@supabase/supabase-js": "^2.43.4",

  // betterAuth
  "better-auth": "^0.8.2-beta.1",

  // Prisma
  prisma: "^5.14.0",
  "@prisma/client": "^5.14.0",
  "@prisma/adapter-planetscale": "^5.14.0",

  // Drizzle
  "drizzle-kit": "^0.24.0",
  "drizzle-orm": "^0.33.0",
  "eslint-plugin-drizzle": "^0.2.3",
  mysql2: "^3.11.0",
  "@planetscale/database": "^1.19.0",
  postgres: "^3.4.4",
  "@libsql/client": "^0.9.0",

  // Lemonsqueezy
  "@lemonsqueezy/lemonsqueezy.js": "^3.3.0",

  // TailwindCSS
  tailwindcss: "^3.4.3",
  postcss: "^8.4.39",
  prettier: "^3.3.2",
  "prettier-plugin-tailwindcss": "^0.6.5",

  // tRPC
  "@trpc/client": "^11.0.0-rc.446",
  "@trpc/server": "^11.0.0-rc.446",
  "@trpc/react-query": "^11.0.0-rc.446",
  "@trpc/next": "^11.0.0-rc.446",
  "@tanstack/react-query": "^5.59.20",
  "@tanstack/react-query-next-experimental": "^5.59.20",
  superjson: "^2.2.1",
  "server-only": "^0.0.1",
  // Next-safe-action
  "next-safe-action": "^7.9.3",

  // Clerk
  "@clerk/nextjs": "^6.3.1",
  svix: "^1.40.0",
  resend: "^4.0.0",
  "@aws-sdk/client-ses": "^3.665.0",
  "@plunk/node": "^3.0.2",
  "@react-email/components": "^0.0.25",
  "@sendgrid/mail": "^8.1.3",
  "@types/nodemailer": "^6.4.16",
  mailersend: "^2.3.0",
  nodemailer: "^6.9.15",
  postmark: "^4.0.5",

  "@uploadthing/react": "^7.1.1",
  uploadthing: "^7.1.0",

  "lucide-react": "^0.454.0",
  "react-icons": "^5.3.0",

  "@kinde-oss/kinde-auth-nextjs": "^2.3.11",

  hono: "^4.6.9",
  "@hono/zod-validator": "^0.4.1",
  "@hono/auth-js": "^1.0.11",
  "@hono/clerk-auth": "^2.0.0",

  "next-themes": "^0.4.3",

  stripe: "^17.3.1",

  "@testing-library/jest-dom": "^6.1.4",
  "@testing-library/react": "^14.0.0",
  "@types/jest": "^29.5.6",
  jest: "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "ts-jest": "^29.1.1",

  "posthog-js": "^1.176.0",
  "posthog-node": "^4.2.1",
  "next-plausible": "^3.12.4",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
