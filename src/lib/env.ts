import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_APK_URL: z.string().url().or(z.literal("")).default(""),
  NEXT_PUBLIC_PLAY_STORE_URL: z.string().url().or(z.literal("")).default(""),
  NEXT_PUBLIC_APP_STORE_URL: z.string().url().or(z.literal("")).default(""),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://goalspay.app"),
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_APK_URL: process.env.NEXT_PUBLIC_APK_URL ?? "",
  NEXT_PUBLIC_PLAY_STORE_URL: process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "",
  NEXT_PUBLIC_APP_STORE_URL: process.env.NEXT_PUBLIC_APP_STORE_URL ?? "",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://goalspay.app",
});
