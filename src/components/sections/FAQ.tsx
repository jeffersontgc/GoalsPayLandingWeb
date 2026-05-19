"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/shared/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  q: string;
  a: string;
}

export function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FAQItem[];

  return (
    <Section id="faq" eyebrow={t("eyebrow")} title={t("title")}>
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="glass rounded-3xl px-6 md:px-8">
          {items.map((item, idx) => (
            <AccordionItem key={item.q} value={`faq-${idx}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
