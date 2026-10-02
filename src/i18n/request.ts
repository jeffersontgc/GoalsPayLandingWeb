import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import es from "../../messages/es.json";
import en from "../../messages/en.json";

// El inglés tiene que tener exactamente las mismas claves que el español (y al revés).
const englishMessages: IntlMessages = en;
const spanishMessages: typeof en = es;

const allMessages: Record<Locale, IntlMessages> = {
  es: spanishMessages,
  en: englishMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = isLocale(requested) ? requested : defaultLocale;
  return { locale, messages: allMessages[locale] };
});
