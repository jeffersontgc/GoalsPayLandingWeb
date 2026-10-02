import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Chapter } from "@/components/shared/Chapter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CONTROLLER } from "@/config/site";
import { FAQ_KEYS, SECTION_IDS } from "@/data/navigation";
import type { Locale } from "@/i18n/config";
import { getLegalPublicPath } from "@/lib/legal/documents";

const ANSWER_LINK_CLASSES = "font-bold text-link underline underline-offset-4 hover:no-underline";

interface FaqChapterProps {
  locale: Locale;
}

/** Preguntas frecuentes: un acordeón Radix (uno abierto a la vez, se puede cerrar), 720 de ancho. */
export const FaqChapter = ({ locale }: FaqChapterProps) => {
  const t = useTranslations("faq");
  const deleteAccountPath = getLegalPublicPath("deleteAccount", locale);

  const renderAnswer = (questionKey: (typeof FAQ_KEYS)[number]): ReactNode =>
    questionKey === "deleteAccount"
      ? t.rich("items.deleteAccount.answer", {
          email: CONTROLLER.email,
          mail: (chunks) => (
            <a href={`mailto:${CONTROLLER.email}`} className={ANSWER_LINK_CLASSES}>
              {chunks}
            </a>
          ),
          link: (chunks) => (
            <a href={deleteAccountPath} className={ANSWER_LINK_CLASSES}>
              {chunks}
            </a>
          ),
        })
      : t(`items.${questionKey}.answer`);

  return (
    <Chapter id={SECTION_IDS.faq} variant="canvas" eyebrow={t("eyebrow")} title={t("title")}>
      <Accordion type="single" collapsible className="max-w-[720px] border-t border-line">
        {FAQ_KEYS.map((questionKey) => (
          <AccordionItem key={questionKey} value={questionKey}>
            <AccordionTrigger>{t(`items.${questionKey}.question`)}</AccordionTrigger>
            <AccordionContent>{renderAnswer(questionKey)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Chapter>
  );
};
