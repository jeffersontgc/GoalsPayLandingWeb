import { z } from "zod";

const DEFAULT_SITE_URL = "https://goalspay.app";

const publicSchema = z.object({
  NEXT_PUBLIC_PLAY_STORE_URL: z.string().url().or(z.literal("")).default(""),
  NEXT_PUBLIC_APP_STORE_URL: z.string().url().or(z.literal("")).default(""),
  NEXT_PUBLIC_SITE_URL: z.string().url().default(DEFAULT_SITE_URL),
});

const serverSchema = z.object({
  APK_URL: z.string().url().or(z.literal("")).default(""),
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_PLAY_STORE_URL: process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "",
  NEXT_PUBLIC_APP_STORE_URL: process.env.NEXT_PUBLIC_APP_STORE_URL ?? "",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
});

// Solo servidor: nunca lo importes desde un componente de cliente.
// NEXT_PUBLIC_APK_URL es el nombre que documentaban el README y .env.example antiguos; se
// acepta como respaldo por si es el que está configurado en Vercel.
export const serverEnv = serverSchema.parse({
  APK_URL: process.env.APK_URL ?? process.env.NEXT_PUBLIC_APK_URL ?? "",
});
