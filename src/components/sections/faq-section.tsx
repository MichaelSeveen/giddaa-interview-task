import { Accordion } from "../ui/accordion";
import { SectionBadge } from "../ui/section-badge";
import { FAQ_DATA } from "@/data";
import FooterCTA from "../shared/footer-cta";

export function FAQSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto flex flex-col px-4 md:px-6 lg:px-20 max-w-full">
        <div className="flex flex-col gap-6 mb-10">
          <SectionBadge label="FAQs" />
          <h2 className="font-bold text-[2rem] leading-12.5 lg:text-[2.5rem] lg:leading-17 lg:w-227.5 lg:h-13.25 text-[#001F3F]">
            Your Questions, Answered.
          </h2>
          <p className="text-[1rem] leading-8.5 lg:text-[1.25rem] text-[#4B4B4B] lg:h-5.5 w-[320px] lg:w-227.5">
            Find answers to the most common questions people ask.
          </p>
        </div>
        <Accordion items={FAQ_DATA} />

        <FooterCTA className="mt-18" />
      </div>
    </section>
  );
}
