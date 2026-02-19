import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends ComponentProps<"div"> {
  value?: number;
  label?: string;
  description?: string;
  displayValue?: string;
}

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
        <div
          data-slot="progress-indicator"
          className="h-full flex-1 rounded-full bg-[#2C59C3] transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 - clampedValue}%)` }}
        />
      </div>

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
