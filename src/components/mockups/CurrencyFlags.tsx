import { CURRENCY_CODES, getFlagPath } from "@/data/currencies";

const FLAG_WIDTH = 20;
const FLAG_HEIGHT = 15;

/** Las 14 monedas con su bandera. El código va en texto; la bandera es decorativa. */
export const CurrencyFlags = () => (
  <ul className="flex flex-wrap gap-2">
    {CURRENCY_CODES.map((currency) => (
      <li
        key={currency}
        className="inline-flex items-center gap-1.5 rounded-chip bg-elevated px-2 py-1.5 text-sm font-bold text-ink tabular"
      >
        {/* SVG estático de flag-icons: next/image no optimiza vectores. */}
        <img
          src={getFlagPath(currency)}
          alt=""
          width={FLAG_WIDTH}
          height={FLAG_HEIGHT}
          loading="lazy"
          decoding="async"
          className="rounded-[2px]"
        />
        {currency}
      </li>
    ))}
  </ul>
);
