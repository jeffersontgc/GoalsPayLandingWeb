"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";

/** Clave de localStorage del tema: la que declara la Política de Cookies. */
const THEME_STORAGE_KEY = "theme";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Tema claro/oscuro siguiendo al sistema por defecto, y Framer Motion respetando
 * prefers-reduced-motion en todas sus animaciones.
 */
export const Providers = ({ children }: ProvidersProps) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    storageKey={THEME_STORAGE_KEY}
    disableTransitionOnChange
  >
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </ThemeProvider>
);
