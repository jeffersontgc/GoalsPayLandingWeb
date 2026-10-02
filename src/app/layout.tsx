import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * El <html> (con su lang) lo pone app/[locale]/layout.tsx. Este layout solo existe porque
 * Next lo exige; la página 404 de la raíz trae su propio <html>.
 */
const RootLayout = ({ children }: RootLayoutProps) => children;

export default RootLayout;

