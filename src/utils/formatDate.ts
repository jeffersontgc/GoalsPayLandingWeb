import type { Locale } from "@/i18n/config";

/**
 * Fechas de calendario ("YYYY-MM-DD") formateadas sin pasar por la zona horaria del servidor:
 * se fijan a UTC para que "2026-09-28" no se muestre como el 27 en un huso negativo.
 */
const CALENDAR_TIME_ZONE = "UTC";

export const formatShortDate = (calendarDate: string, locale: Locale): string =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    timeZone: CALENDAR_TIME_ZONE,
  }).format(new Date(`${calendarDate}T00:00:00Z`));

/** Mes abreviado de una clave "YYYY-MM" ("abr", "Apr"). */
export const formatShortMonth = (monthKey: string, locale: Locale): string =>
  new Intl.DateTimeFormat(locale, { month: "short", timeZone: CALENDAR_TIME_ZONE }).format(
    new Date(`${monthKey}-01T00:00:00Z`),
  );
