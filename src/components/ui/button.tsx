import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "lg";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "text-white bg-primary border border-transparent",
    "hover:bg-primary/90",
    "focus:ring-primary/50",
  ),
  secondary: cn(
    "text-primary bg-white border-2 border-primary",
    "hover:text-primary/90",
    "focus:ring-primary/50",
  ),
  ghost: cn("text-white border-2 border-white", "focus:ring-primary/50"),
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-12.5 px-4 py-2 text-[0.875rem]",
  lg: "h-12.5 px-4 py-2 text-sm",
};

function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 shrink-0",
        "rounded-xl font-bold leading-5 text-center",
        "focus:ring-4 focus:outline-none [&_svg:not([class*='size-'])]:size-4.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
