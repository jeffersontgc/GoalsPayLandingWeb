import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Botones de MASTER.md §4.1: 52 px (24 de padding) o 44 px (20) en la navegación, radio 14,
 * DM Sans 700. El primario (--gp-primary) con texto blanco da 6.1:1 y va una vez por vista; el
 * secundario es marino en claro y claro en oscuro; "ghost" es texto en azul.
 */
export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-control font-sans font-bold whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary-hover",
        secondary: "bg-secondary text-on-secondary hover:bg-secondary-hover",
        outline: "border-[1.5px] border-line text-ink hover:border-ink",
        ghost: "text-link underline-offset-4 hover:underline",
        icon: "text-ink-2 hover:bg-surface-muted hover:text-ink",
      },
      size: {
        md: "h-[52px] px-6 text-base",
        sm: "h-11 px-5 text-[0.9375rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  },
);
Button.displayName = "Button";
