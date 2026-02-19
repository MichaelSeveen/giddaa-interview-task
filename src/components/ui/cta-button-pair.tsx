import { cn } from "@/lib/utils";
import { Button } from "./button";
import { WhatsAppIcon } from "../icons/whatsapp-icon";

interface CTAButtonPairProps {
  variant?: "hero" | "section" | "card" | "banner";
  primaryLabel?: string;
  secondaryLabel?: string;
  containerClassName?: string;
}

const presets = {
  hero: {
    container: "flex flex-col md:flex-row items-center gap-6.5",
    primaryWidth: "w-full md:w-[250px]",
    primaryVariant: "primary" as const,
    secondaryWidth: "w-full md:w-[225px] border-0",
    secondaryVariant: "secondary" as const,
    whatsappFill: "#FFF",
  },
  section: {
    container: "hidden lg:flex lg:flex-row items-center lg:gap-6",
    primaryWidth: "w-[206px] font-medium",
    primaryVariant: "primary" as const,
    secondaryWidth: "w-[206px]",
    secondaryVariant: "secondary" as const,
    whatsappFill: "#FFF",
  },
  card: {
    container: "flex flex-col lg:flex-row items-center gap-6",
    primaryWidth: "w-full lg:w-51.75 border-0",
    primaryVariant: "secondary" as const,
    secondaryWidth: "w-full lg:w-49.25",
    secondaryVariant: "ghost" as const,
    whatsappFill: "var(--primary)",
  },
  banner: {
    container: "flex flex-col md:flex-row items-center gap-6",
    primaryWidth: "w-full lg:w-[205px]",
    primaryVariant: "primary" as const,
    secondaryWidth: "w-full lg:w-[185px]",
    secondaryVariant: "secondary" as const,
    whatsappFill: "#FFF",
  },
};

export function CTAButtonPair({
  variant = "section",
  primaryLabel = "Speak with an expert",
  secondaryLabel = "Assess Your Tax Needs",
  containerClassName,
}: CTAButtonPairProps) {
  const preset = presets[variant];

  return (
    <div className={cn(preset.container, containerClassName)}>
      <Button variant={preset.primaryVariant} className={preset.primaryWidth}>
        <WhatsAppIcon fill={preset.whatsappFill} />
        {primaryLabel}
      </Button>
      <Button
        variant={preset.secondaryVariant}
        className={preset.secondaryWidth}
      >
        {secondaryLabel}
      </Button>
    </div>
  );
}
