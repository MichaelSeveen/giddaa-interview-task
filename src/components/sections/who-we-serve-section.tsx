import Image from "next/image";
import { SectionBadge } from "../ui/section-badge";
import { CTAButtonPair } from "../ui/cta-button-pair";
import { WHO_WE_SERVE_CARDS } from "@/data";
import type { ServiceCardData } from "@/data";
import { cn } from "@/lib/utils";

function ServiceCard({ card }: { card: ServiceCardData }) {
  return (
    <div className="sticky top-[10vh] transition-all md:top-[14vh]">
      <div
        className={cn(
          "flex flex-col-reverse items-center md:flex-row rounded-[40px] lg:rounded-[5rem] px-4 py-6 lg:p-10 gap-10",
          card.bgColor,
        )}
      >
        <div className="lg:h-[361px] flex flex-col gap-6 flex-1">
          <h3 className="lg:h-[27px] text-[1.875rem] leading-10 font-bold text-white">
            {card.title}
          </h3>
          <i className="lg:h-[68px] lg:w-[559px] text-[1rem] leading-8.5 text-white">
            {card.tagline}
          </i>
          <p className="hidden lg:block lg:h-[155px] lg:w-[559px] text-[1rem] leading-8.5 text-white">
            {card.description}
          </p>
          <CTAButtonPair variant="card" />
        </div>
        <div className="relative h-[204px] w-full lg:h-[450px] lg:w-full lg:flex-1">
          <Image
            src={card.imageSrc}
            alt="Hero Image"
            fill
            className="object-center object-cover rounded-[20px] lg:rounded-[2.5rem]"
          />
        </div>
      </div>
    </div>
  );
}

export function WhoWeServeSection() {
  return (
    <section className="w-full bg-[#FFEED0] pb-[120px] pt-20 md:pt-18.75">
      <div className="container mx-auto flex flex-col px-4 md:px-6 lg:px-20 gap-10 max-w-full">
        <div className="flex flex-col gap-6 lg:w-192.25">
          <SectionBadge label="Who we serve" variant="light" />
          <h2 className="font-bold text-[2rem] leading-12.5 lg:text-[2.5rem] lg:leading-17 h-[99px] lg:w-full lg:h-13.25 text-[#001F3F]">
            We are Experts for Every Tax Situation
          </h2>
          <p className="hidden lg:block text-[1.25rem] text-[#4B4B4B]">
            No matter your tax needs, file with confidence and get the most out
            of your return.
          </p>
          <p className="lg:hidden text-[1rem] leading-8.5 text-[#4B4B4B]">
            There’s nothing we’ve not seen. No matter your tax needs, we will
            get you the most out of your return, with no stress .
          </p>
        </div>
        <div className="relative min-h-500 flex flex-col gap-16">
          {WHO_WE_SERVE_CARDS.map((card) => (
            <ServiceCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
