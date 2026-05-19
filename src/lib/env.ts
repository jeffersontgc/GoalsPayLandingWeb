import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_PLAY_STORE_URL: z.string().url().or(z.literal("")).default(""),
  NEXT_PUBLIC_APP_STORE_URL: z.string().url().or(z.literal("")).default(""),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://goalspay.app"),
});

const serverSchema = z.object({
  APK_URL: z.string().url().or(z.literal("")).default(""),
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_PLAY_STORE_URL: process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "",
  NEXT_PUBLIC_APP_STORE_URL: process.env.NEXT_PUBLIC_APP_STORE_URL ?? "",
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://goalspay.app",
});

// Server-only: never import this from a client component.
export const serverEnv = serverSchema.parse({
  APK_URL: process.env.APK_URL ?? "",
});
