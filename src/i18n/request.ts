import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import es from "../../messages/es.json";
import en from "../../messages/en.json";

const allMessages: Record<Locale, AbstractIntlMessages> = {
  es: es as unknown as AbstractIntlMessages,
  en: en as unknown as AbstractIntlMessages,
};

function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = isLocale(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: allMessages[locale],
  };
});
