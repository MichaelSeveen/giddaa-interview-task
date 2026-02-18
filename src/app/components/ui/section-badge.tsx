interface SectionBadgeProps {
  label: string;
  variant?: "light" | "dark";
}

export function SectionBadge({ label, variant = "dark" }: SectionBadgeProps) {
  const baseClasses =
    "h-8.75 font-semibold text-[0.875rem] leading-17 inline-flex items-center justify-center rounded-full px-4 w-fit";

  if (variant === "light") {
    return <p className={`${baseClasses} text-black bg-white`}>{label}</p>;
  }

  return (
    <p
      className={`${baseClasses} text-white bg-[linear-gradient(180deg,#001F3F_0%,#003366_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))]`}
    >
      {label}
    </p>
  );
}
