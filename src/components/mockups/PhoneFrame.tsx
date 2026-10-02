import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  /** Descripción de lo que muestra la ilustración, para lectores de pantalla. */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * Marco de teléfono 9:19.5 (radio 44, borde de 8 px y una sola sombra). Es una ilustración:
 * un solo nombre accesible y el contenido fuera del árbol de accesibilidad.
 */
export const PhoneFrame = ({ label, children, className }: PhoneFrameProps) => (
  <div
    role="img"
    aria-label={label}
    className={cn(
      "relative mx-auto aspect-[9/19.5] w-[min(80vw,300px)] shrink-0 overflow-hidden rounded-device border-8 border-device bg-canvas shadow-mockup md:w-[360px]",
      className,
    )}
  >
    <div aria-hidden="true" className="flex h-full flex-col">
      <div className="flex h-9 shrink-0 items-start justify-center pt-2">
        <span className="h-5 w-20 rounded-pill bg-device" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 pb-4">{children}</div>
    </div>
  </div>
);
