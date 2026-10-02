import type { Locale } from "@/i18n/config";
import type { CurrencyCode } from "@/data/currencies";

/** Región con la que se formatea cada moneda de ejemplo, para que el símbolo sea el local (C$). */
const REGION_BY_CURRENCY: Partial<Record<CurrencyCode, string>> = {
  NIO: "NI",
  MXN: "MX",
  GTQ: "GT",
};

const DEFAULT_REGION = "US";

const buildFormatter = (locale: Locale, currency: CurrencyCode): Intl.NumberFormat =>
  new Intl.NumberFormat(`${locale}-${REGION_BY_CURRENCY[currency] ?? DEFAULT_REGION}`, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  });

/** Monto entero con el símbolo corto de la moneda ("C$18,450"). */
export const formatMoney = (amount: number, locale: Locale, currency: CurrencyCode): string =>
  buildFormatter(locale, currency).format(amount);

/** Igual que formatMoney, con el signo siempre visible ("+ C$2,300", "− C$10,300"). */
export const formatSignedMoney = (
  amount: number,
  locale: Locale,
  currency: CurrencyCode,
): string => `${amount < 0 ? "−" : "+"} ${formatMoney(Math.abs(amount), locale, currency)}`;

const PERCENT_SCALE = 100;

export const getProgressPercent = (current: number, target: number): number =>
  target <= 0 ? 0 : Math.min(PERCENT_SCALE, Math.round((current / target) * PERCENT_SCALE));
