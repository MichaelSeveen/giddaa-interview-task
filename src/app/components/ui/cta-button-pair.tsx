import { WhatsAppIcon } from "../icons";

interface CTAButtonPairProps {
  variant?: "hero" | "section" | "card" | "banner";
  primaryLabel?: string;
  secondaryLabel?: string;
  whatsappFill?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
  containerClassName?: string;
}

export function CTAButtonPair({
  variant = "section",
  primaryLabel = "Speak with an expert",
  secondaryLabel = "Assess Your Tax Needs",
  whatsappFill,
  primaryClassName,
  secondaryClassName,
  containerClassName,
}: CTAButtonPairProps) {
  const presets = {
    hero: {
      container: "flex flex-col md:flex-row items-center gap-6.5",
      primary:
        "text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 box-border border border-transparent font-bold leading-5 rounded-base text-sm px-4 py-2 text-center inline-flex items-center justify-center gap-2 dark:focus:ring-primary/55 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 rounded-xl h-12.5 w-full md:w-[250px]",
      secondary:
        "text-primary bg-white hover:text-primary focus:ring-4 focus:ring-brand-subtle font-bold leading-5 rounded-base text-sm px-4 py-2 focus:outline-none rounded-xl h-12.5 w-full md:w-[225px]",
      fill: "#FFF",
    },
    section: {
      container: "hidden lg:flex lg:flex-row items-center lg:gap-6",
      primary:
        "text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 box-border border border-transparent font-medium text-[0.875rem] leading-5 text-center inline-flex items-center justify-center gap-2 dark:focus:ring-primary/55 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 rounded-xl h-12.5 w-[206px]",
      secondary:
        "text-primary bg-white hover:text-primary border-2 border-primary focus:ring-4 focus:ring-primary/50 font-bold text-[0.875rem] leading-5 focus:outline-none rounded-xl h-12.5 w-[206px]",
      fill: "#FFF",
    },
    card: {
      container: "flex flex-col lg:flex-row items-center gap-6",
      primary:
        "text-primary bg-white hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-bold text-[0.875rem] leading-5 text-center inline-flex items-center justify-center gap-2 dark:focus:ring-primary/55 [&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 rounded-xl h-12.5 w-full lg:w-51.75",
      secondary:
        "text-white border-2 border-white focus:ring-4 focus:ring-primary/50 font-bold text-[0.875rem] leading-5 focus:outline-none rounded-xl h-12.5 w-full lg:w-49.25",
      fill: "var(--primary)",
    },
    banner: {
      container: "flex flex-col md:flex-row items-center gap-6",
      primary:
        "text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 box-border border border-transparent font-bold leading-5 rounded-[0.75rem] text-sm px-4 py-2 text-center inline-flex items-center justify-center gap-2 dark:focus:ring-primary/55 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 h-12.5 w-full lg:w-[205px]",
      secondary:
        "text-primary bg-white border-2 border-primary hover:text-primary focus:ring-4 focus:ring-brand-subtle font-bold leading-5 text-sm px-4 py-2 focus:outline-none rounded-[0.75rem] h-12.5 w-full lg:w-[185px]",
      fill: "#FFF",
    },
  };

  const preset = presets[variant];

  return (
    <div className={containerClassName ?? preset.container}>
      <button type="button" className={primaryClassName ?? preset.primary}>
        <WhatsAppIcon fill={whatsappFill ?? preset.fill} />
        {primaryLabel}
      </button>
      <button className={secondaryClassName ?? preset.secondary}>
        {secondaryLabel}
      </button>
    </div>
  );
}
