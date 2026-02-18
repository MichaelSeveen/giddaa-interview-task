import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function Label({
  className,
  ...props
}: ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-[0.875rem] font-medium leading-2.5 text-[#0A0A0A]",
        className,
      )}
      {...props}
    />
  );
}
