import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends ComponentProps<"div"> {
  /** Current progress value (0–100). */
  value?: number;
  /** Label shown on the left side of the bar. */
  label?: string;
  /** Description shown below the bar. */
  description?: string;
  /** Custom display value shown on the right side of the header row. When omitted, defaults to the percentage. */
  displayValue?: string;
}

/**
 * Progress — an accessible progress bar.
 *
 * ARIA pattern: Progressbar
 * https://www.w3.org/WAI/ARIA/apg/patterns/meter/
 *
 * Features:
 * - `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
 * - `aria-label` falls back to the visible label for assistive tech
 * - Optional label (left) + percentage (right) header row
 * - Optional description below the bar
 */
function Progress({
  className,
  value = 0,
  label,
  description,
  displayValue,
  ...props
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const descriptionId = description
    ? props.id
      ? `${props.id}-desc`
      : undefined
    : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* ── Header row: label + percentage ──────────────────────────────── */}
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-[0.875rem] leading-5 font-bold text-[#3D3D3D]">
            {label}
          </span>
          <span className="text-[0.875rem] leading-5">
            {displayValue ?? `${Math.round(clampedValue)}%`}
          </span>
        </div>
      )}

      {/* ── Track ───────────────────────────────────────────────────────── */}
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        aria-describedby={descriptionId}
        data-slot="progress"
        className="relative flex h-2 w-full items-center overflow-hidden rounded-full bg-[#E5E7EB]"
        {...props}
      >
        {/* ── Indicator ──────────────────────────────────────────────────── */}
        <div
          data-slot="progress-indicator"
          className="h-full flex-1 rounded-full bg-[#2C59C3] transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 - clampedValue}%)` }}
        />
      </div>

      {/* ── Description ─────────────────────────────────────────────────── */}
      {description && (
        <p
          id={descriptionId}
          className="text-[0.75rem] leading-4 text-[#6A7282]"
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { Progress };
export type { ProgressProps };
