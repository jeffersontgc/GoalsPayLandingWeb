"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b border-line", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

/** La pregunta entera es el botón (44 px o más); el chevron marca el estado. */
export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header asChild>
    <h3>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-display text-lg font-semibold text-ink transition-colors hover:text-link",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
          className="size-5 shrink-0 text-ink-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </h3>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className="accordion-content" {...props}>
    <div className={cn("type-body max-w-[65ch] pb-6 text-ink-2", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
