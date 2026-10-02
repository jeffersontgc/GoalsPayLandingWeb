"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ICON_STROKE_WIDTH } from "@/config/site";
import { Button } from "@/components/ui/button";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

interface ThemeToggleProps {
  label: string;
}

/**
 * Alterna claro/oscuro. El ícono lo decide el CSS (clase .dark), así que no hay que esperar
 * a montar para pintarlo y no hay salto entre servidor y cliente.
 */
export const ThemeToggle = ({ label }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(resolvedTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME);
  };

  return (
    <Button variant="icon" size="icon" aria-label={label} title={label} onClick={handleToggle}>
      <Sun className="hidden dark:block" strokeWidth={ICON_STROKE_WIDTH} aria-hidden="true" />
      <Moon className="block dark:hidden" strokeWidth={ICON_STROKE_WIDTH} aria-hidden="true" />
    </Button>
  );
};
