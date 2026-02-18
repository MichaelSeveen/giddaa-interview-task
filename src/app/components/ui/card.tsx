import { cn } from "@/lib/utils";

export default function Card({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl border border-[#0000001A] p-6 w-full",
        className,
      )}
    >
      {title && (
        <h2 className="text-[1.5rem] leading-4 font-bold text-[#0A0A0A] mb-4">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-[0.875rem] leading-6 text-[#717171] mb-6">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
