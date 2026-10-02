import { useLocale } from "next-intl";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

/** El idioma activo ya estrechado a los del sitio (next-intl lo devuelve como string). */
export const useSiteLocale = (): Locale => {
  const locale = useLocale();
  return isLocale(locale) ? locale : defaultLocale;
};
