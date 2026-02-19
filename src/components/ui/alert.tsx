import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function Alert({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "gap-2 lg:gap-3 px-4 py-3.5 rounded-[24px] lg:rounded-[10px] text-[0.875rem] leading-5 text-[#717182] border border-primary",
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 size-4"
      >
        <path
          d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334m0-4V8m0-2.667h.007"
          stroke="#0a0a0a"
          strokeWidth="1.333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p>{props.children}</p>
    </div>
  );
}
