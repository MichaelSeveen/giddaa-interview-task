import { CTAButtonPair } from "../ui/cta-button-pair";
import { DecorativePattern } from "./brand-logo";
import { cn } from "@/lib/utils";

export default function FooterCTA({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[2.5rem] bg-[#F1F5FF] lg:h-65 flex flex-col md:flex-row items-center p-6 md:p-10",
        className,
      )}
    >
      <div className="flex-1 flex flex-col gap-6 mb-6 lg:mb-0">
        <h2 className="font-bold h-11.25 lg:h-13.25 text-[2rem] lg:text-[2.5rem] leading-17 text-[#001F3F]">
          Get Started
        </h2>
        <p className="lg:h-7 text-[1.25rem] leading-8.5 text-[#4B4B4B]">
          Begin your tax journey the right way and stay compliant.
        </p>
        <CTAButtonPair variant="banner" />
      </div>
      <DecorativePattern />
    </div>
  );
}
