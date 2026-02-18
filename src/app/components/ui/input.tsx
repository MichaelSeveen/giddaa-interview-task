import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11.25 w-full rounded-xl border ring-inset border-[#E9E9E9] bg-white px-3 py-1 text-sm focus:text-base ring-offset-transparent placeholder:text-[#717182] placeholder:text-sm text-black outline-none ring-offset-0 disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:border-[#E9E9E9] disabled:text-[#717182] disabled:placeholder:text-[#717182] focus:ring-2 hover:ring-2 ring-primary focus:shadow-[0px_0px_4px_4px_#2C59C333]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
