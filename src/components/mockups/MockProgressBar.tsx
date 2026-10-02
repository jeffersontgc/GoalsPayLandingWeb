import { cn } from "@/lib/utils";

type ProgressBarSize = "regular" | "compact";

/** 10 px en la tarjeta de meta, 8 px en filas compactas (PROGRESS_BAR_HEIGHT de la App). */
const HEIGHT_CLASSES: Record<ProgressBarSize, string> = {
  regular: "h-2.5",
  compact: "h-2",
};

interface MockProgressBarProps {
  percent: number;
  size?: ProgressBarSize;
}

export const MockProgressBar = ({ percent, size = "compact" }: MockProgressBarProps) => (
  <div className={cn("w-full overflow-hidden rounded-pill bg-line", HEIGHT_CLASSES[size])}>
    <div className="h-full rounded-pill bg-pulse" style={{ width: `${percent}%` }} />
  </div>
);
