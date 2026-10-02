/**
 * Las 14 monedas que acepta la App, en el mismo orden que el enum `Currency` del backend
 * (backend/src/common/enums/index.ts).
 */
export const CURRENCY_CODES = [
  "USD",
  "EUR",
  "GTQ",
  "MXN",
  "NIO",
  "CRC",
  "PAB",
  "HNL",
  "BRL",
  "VEF",
  "DOP",
  "ARS",
  "PYG",
  "CLP",
] as const;

export type CurrencyCode = (typeof CURRENCY_CODES)[number];

/** Bandera de cada moneda (public/flags, de flag-icons, MIT). El euro usa la de la UE. */
export const CURRENCY_FLAG_FILES: Record<CurrencyCode, string> = {
  USD: "us",
  EUR: "eu",
  GTQ: "gt",
  MXN: "mx",
  NIO: "ni",
  CRC: "cr",
  PAB: "pa",
  HNL: "hn",
  BRL: "br",
  VEF: "ve",
  DOP: "do",
  ARS: "ar",
  PYG: "py",
  CLP: "cl",
};

export const getFlagPath = (currency: CurrencyCode): string =>
  `/flags/${CURRENCY_FLAG_FILES[currency]}.svg`;
