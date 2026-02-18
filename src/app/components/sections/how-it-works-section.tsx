import { NumberOne, NumberThree, NumberTwo } from "../card-numbers";
import { SectionBadge } from "../ui/section-badge";
import { CTAButtonPair } from "../ui/cta-button-pair";
import { HOW_IT_WORKS_STEPS } from "../../data";
import type { StepCardData } from "../../data";
import type { ReactNode } from "react";

const NUMBER_COMPONENTS: Record<StepCardData["numberComponent"], ReactNode> = {
  one: <NumberOne />,
  two: <NumberTwo />,
  three: <NumberThree />,
};

function StepCard({ step }: { step: StepCardData }) {
  return (
    <div className="sticky flex justify-center top-[25vh]">
      <div className="w-full flex flex-col lg:max-w-122.5 bg-white rounded-[3.75rem] p-8 lg:p-10 gap-5.25">
        {NUMBER_COMPONENTS[step.numberComponent]}
        {/* Desktop title */}
        <p
          className={`hidden md:block w-102.5 ${step.titleHeight ? ` ${step.titleHeight}` : ""} text-[1.5rem] ${step.numberComponent === "two" ? "leading-10" : "leading-17"} font-bold text-[#001F3F]`}
        >
          {step.title}
        </p>
        {/* Mobile title */}
        <p className="block md:hidden text-[1.5rem] leading-8.5 font-bold text-[#001F3F] w-71">
          {step.mobileTitle}
        </p>
        {/* Desktop description */}
        <p
          className={`hidden md:block w-102.5  ${step.descHeight ? ` ${step.descHeight}` : ""} text-[1rem] leading-8.5 text-[#4B4B4B]`}
        >
          {step.description}
        </p>
        {/* Mobile description */}
        <p className="block md:hidden text-[1rem] leading-8.5 text-[#4B4B4B]">
          {step.mobileDescription}
        </p>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="w-full bg-[#F2F2F2] pb-22.5 lg:pb-31.25 pt-20">
      <div className="relative container mx-auto px-4 md:px-6 lg:px-20">
        <div className="relative flex flex-col md:flex-row gap-20 w-full">
          <div className="flex flex-col gap-6 md:sticky md:top-[25vh] md:self-start flex-1">
            <SectionBadge label="How it works" variant="light" />
            <h2 className="font-bold text-[2rem] leading-12.5 lg:text-[2.5rem] w-88.25 lg:leading-17 lg:w-150.75 lg:h-31">
              3 Easy Steps to Tax Compliance{" "}
              <span className="hidden">& Savings</span>.
            </h2>
            <p className="text-[#4B4B4B] text-[1rem] lg:text-[1.25rem] leading-8.5 w-86.25 h-14.75 lg:w-150.75 lg:h-15.75">
              No matter your tax needs, file with confidence and get the most
              out of your return.
            </p>

            <CTAButtonPair variant="section" />
          </div>

          {/* Stacking Cards */}
          <div className="relative flex flex-col flex-1 min-h-300 gap-6">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <StepCard key={step.numberComponent} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
