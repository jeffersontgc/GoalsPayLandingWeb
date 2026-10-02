import { useTranslations } from "next-intl";
import { LegalInlineContent } from "@/components/legal/LegalInlineContent";
import { getPlainText } from "@/lib/legal/parseLegalMarkdown";
import type { LegalTableBlock } from "@/types/legal";

interface LegalTableProps {
  table: LegalTableBlock;
}

/**
 * Tabla accesible: encabezados de columna con scope, título (caption) con el nombre de la
 * sección y una región enfocable que se desplaza en horizontal si no cabe en el móvil.
 */
export const LegalTable = ({ table }: LegalTableProps) => {
  const t = useTranslations("legal");
  const regionLabel = t("tableRegion", { label: table.label });

  return (
    <div
      role="region"
      aria-label={regionLabel}
      tabIndex={0}
      className="my-6 overflow-x-auto rounded-card border border-line bg-surface"
    >
      <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem] leading-relaxed">
        <caption className="sr-only">{table.label}</caption>
        <thead className="bg-elevated">
          <tr>
            {table.header.map((cell, index) => (
              <th
                key={`${getPlainText(cell)}-${index}`}
                scope="col"
                className="border-b border-line px-4 py-3 font-bold text-ink"
              >
                <LegalInlineContent nodes={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="border-b border-line last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top text-ink-2">
                  <LegalInlineContent nodes={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
