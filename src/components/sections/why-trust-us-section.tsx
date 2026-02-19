import Image from "next/image";
import { SectionBadge } from "../ui/section-badge";
import { WHY_TRUST_US_CARDS } from "@/data";
import type { TrustCardData } from "@/data";
import { cn } from "@/lib/utils";

function TrustCard({ card }: { card: TrustCardData }) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse md:flex-row max-md:max-w-[355px] lg:w-[1013px] shrink-0 h-[655px] lg:h-[517px] rounded-[2.5rem] overflow-hidden gap-4 md:gap-6 lg:gap-10 sticky left-0",
        card.bgColor,
      )}
    >
      <div className="flex-1 flex flex-col justify-center gap-4 lg:gap-5.25 lg:w-[479px] lg:h-full pb-6 px-6 lg:pl-6 lg:pb-0 lg:pr-0">
        <span
          className={cn(
            "lg:w-[409px] h-[24px] text-[1rem] leading-7.5 lg:text-[1.25rem] lg:leading-8.5",
            card.subtitleColor,
          )}
        >
          {card.subtitle}
        </span>
        <h3
          className={cn(
            "text-white text-[1.875rem] max-sm:max-w-[310px] leading-10 lg:text-[2.25rem] lg:leading-11 font-bold space-y-15 tracking-tight",
            card.titleWidth,
            card.titleHeight,
          )}
        >
          {card.title}
        </h3>
        <i
          className={cn(
            "text-[1rem] leading-7.5 lg:text-[1.25rem] lg:leading-8.5 text-[#F0F0F0] max-sm:w-[304px]",
            card.taglineHeight,
          )}
        >
          {card.tagline}
        </i>
        <p
          className={cn(
            "text-[0.875rem] leading-6 lg:text-[1rem] lg:leading-8.5 text-white w-[323px] lg:w-[459px]",
            card.descHeight,
          )}
        >
          {card.description}
        </p>
        <span
          className={cn(
            "text-[2.25rem] leading-11 lg:text-[3rem] lg:leading-15 font-bold space-y-15 tracking-tight text-[#00134380] w-[409px] w-[498px]",
            card.statHeight,
          )}
        >
          {card.stat}
        </span>
      </div>
      <div className="relative h-full w-full lg:w-[477px] max-md:flex-1">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          className={card.imageClassName ?? "object-cover"}
        />
      </div>
    </div>
  );
}

export function WhyTrustUsSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto flex flex-col gap-10 max-w-full">
        <div className="flex flex-col gap-6 px-4 md:px-6 lg:px-20">
          <SectionBadge label="Why Trust Us" />
          <h2 className="hidden lg:block font-bold text-[2.5rem] leading-17 h-[53px] text-[#001F3F]">
            Work With Nigeria&apos;s Top Tax Experts
          </h2>
          <h2 className="lg:hidden font-bold text-[2rem] leading-12.5 text-[#001F3F]">
            Tax Expertise Meets Great Software.
          </h2>
          <p className="text-[1rem] lg:text-[1.25rem] leading-8 text-[#4B4B4B] lg:h-[92px] lg:w-[1185px]">
            Before the 2025 tax act, we filed 200 returns for 30 companies.
            We&apos;ve added great software to help more businesses and
            individuals stay compliant and maximize their tax returns.
          </p>
        </div>

        <div className="no-scrollbar flex gap-6 lg:gap-8 overflow-x-auto px-4 md:px-8 lg:px-20 md:gap-20">
          {WHY_TRUST_US_CARDS.map((card) => (
            <TrustCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
