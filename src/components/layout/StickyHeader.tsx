"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A partir de este desplazamiento la cabecera muestra su borde inferior. */
const SCROLL_THRESHOLD_PX = 8;

interface StickyHeaderProps {
  children: ReactNode;
}

/** Cabecera fija con fondo sólido (sin blur); el borde aparece solo al hacer scroll. */
export const StickyHeader = ({ children }: StickyHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-canvas transition-colors duration-200",
        isScrolled ? "border-line" : "border-transparent",
      )}
    >
      {children}
    </header>
  );
};
