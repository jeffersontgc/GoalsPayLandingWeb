"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { NavLink } from "@/types/navigation";

interface MobileMenuProps {
  links: NavLink[];
  openLabel: string;
  closeLabel: string;
  title: string;
  /** Idioma, tema y descarga: se pintan en el servidor y llegan ya hechos. */
  children: ReactNode;
}

export const MobileMenu = ({ links, openLabel, closeLabel, title, children }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="icon" size="icon" aria-label={openLabel}>
          <Menu strokeWidth={ICON_STROKE_WIDTH} aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={closeLabel}>
        <SheetTitle className="font-display text-xl font-bold text-ink">{title}</SheetTitle>
        <nav aria-label={title}>
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex min-h-12 items-center rounded-control px-4 text-base font-medium text-ink-2 transition-colors hover:bg-surface-muted hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
};
