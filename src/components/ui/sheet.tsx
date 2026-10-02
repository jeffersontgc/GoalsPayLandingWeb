"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-overlay data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  closeLabel: string;
}

/** Panel lateral (menú móvil). Radix atrapa el foco, cierra con Escape y lo devuelve al botón. */
export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, children, closeLabel, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      aria-describedby={undefined}
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col gap-6 overflow-y-auto border-l border-line bg-surface p-6 shadow-[0_8px_40px_var(--gp-shadow-strong)] data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-200 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-300",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-5 right-5 grid size-11 cursor-pointer place-items-center rounded-control text-ink-2 transition-colors hover:bg-surface-muted hover:text-ink">
        <X className="size-5" strokeWidth={ICON_STROKE_WIDTH} aria-hidden="true" />
        <span className="sr-only">{closeLabel}</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";
