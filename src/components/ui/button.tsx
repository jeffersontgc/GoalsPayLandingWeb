import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default:
          "text-white bg-[linear-gradient(135deg,#6366f1_0%,#22d3a6_100%)] shadow-[0_0_40px_rgba(99,102,241,0.45)] hover:brightness-110 hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] active:scale-[0.98]",
        secondary:
          "bg-white/[0.04] border border-white/10 text-[color:var(--color-text-primary)] backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20",
        outline:
          "border border-white/15 text-[color:var(--color-text-primary)] hover:bg-white/[0.04]",
        ghost:
          "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] hover:bg-white/[0.04]",
        link: "text-[color:var(--color-brand-300)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
        xl: "h-15 px-9 text-lg",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
