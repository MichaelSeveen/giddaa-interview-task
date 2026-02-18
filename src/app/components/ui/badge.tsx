import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[8px] border border-transparent px-2 py-0.5 text-[0.75rem] leading-4 font-medium h-5.5 w-11 text-white",
        className,
      )}
      {...props}
    />
  );
}
