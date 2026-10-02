import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Prefijo siempre (/es, /en): las URLs legales que enlaza la App llevan el idioma delante y
 * así todas las páginas siguen el mismo patrón. "/" redirige al idioma del navegador o al de
 * la cookie NEXT_LOCALE (nombre y duración por defecto de next-intl: 1 año, SameSite=Lax),
 * que es lo que declara la Política de Cookies.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
