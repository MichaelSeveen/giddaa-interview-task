import Image from "next/image";
import { SectionBadge } from "../ui/section-badge";

export function TaxCommunitySection() {
  return (
    <section className="w-full bg-[#FFEED0] py-20">
      <div className="container mx-auto flex flex-col gap-10 overflow-hidden">
        <div className="flex flex-col gap-6 px-4 md:px-6 lg:px-20">
          <SectionBadge label="Tax Community" />
          <h2 className="hidden lg:block font-bold text-[2.5rem] leading-17 w-[910px] h-[53px]">
            A Vibrant Community You Can Count On.
          </h2>
          <h2 className="block lg:hidden font-bold text-[2rem] leading-12.5">
            A Vibrant Community Awaits You.
          </h2>
          <p className="text-[1rem] leading-8.5 text-[#4B4B4B] w-73.25 lg:h-[22px] lg:w-[910px] lg:text-[1.25rem]">
            Find answers to your tax questions. Learn from real world scenarios
            and contribute to tax knowledge.
          </p>
        </div>

        {/* Marquee Container */}
        <div>
          {/* Marquee Card */}
          <div className="bg-white w-[413px] h-[241px] rounded-[2.5rem] p-4 flex gap-2.5">
            <div className="flex flex-col gap-2">
              <button type="button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.833 8.334v10M12.5 4.9l-.833 3.433h4.858a1.667 1.667 0 0 1 1.6 2.133l-1.942 6.667a1.67 1.67 0 0 1-1.6 1.2H3.333a1.667 1.667 0 0 1-1.666-1.666V10a1.667 1.667 0 0 1 1.666-1.667h2.3a1.67 1.67 0 0 0 1.492-.925L10 1.667A2.608 2.608 0 0 1 12.5 4.9"
                    stroke="#6a7282"
                    strokeWidth="1.667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className="text-[0.875rem] leading-5 text-[#6A7282]">12</p>
            </div>
            <div className="flex flex-col gap-5.25">
              <h3 className="w-[345px] h-[24px] font-semibold text-2xl">
                How can I avoid Tax?
              </h3>
              <p className="w-[345px] h-[60px] text-[0.875rem] leading-5 text-[#4A5565]">
                I work as a civil servant in Lagos and I&apos;m trying to
                understand how to calculate my taxable income. Do I include all
                allowances? What about housing ...
              </p>
              <div className="flex gap-5.25 w-[230px] h-[20px]">
                <p className="text-[0.875rem] leading-5 text-[#6A7282] w-[135px]">
                  Asked by Adebayo M.
                </p>
                <span className="text-[0.875rem] leading-5 text-[#6A7282] w-[74px]">
                  2 hours ago
                </span>
              </div>
              <button className="bg-white border border-[#0000001A] w-[118px] h-[32px] rounded-[0.5rem] inline-flex items-center justify-center gap-3.5 font-medium text-[0.875rem] leading-5 text-[#0A0A0A]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#a)">
                    <path
                      d="M1.995 10.895c.098.247.12.518.062.778l-.71 2.193a.666.666 0 0 0 .824.779l2.276-.666c.245-.048.499-.027.732.062a6.667 6.667 0 1 0-3.184-3.146"
                      stroke="#0a0a0a"
                      strokeWidth="1.333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h16v16H0z" />
                    </clipPath>
                  </defs>
                </svg>
                5 Answers
              </button>
            </div>
          </div>
        </div>

        <div className="relative max-sm:h-[684px] max-sm:w-[858px] grid place-content-center max-sm:ml-2 lg:aspect-2/1">
          <Image src="/images/cloud-image.svg" alt="Tax Community Cloud" fill />
        </div>
      </div>
    </section>
  );
}
