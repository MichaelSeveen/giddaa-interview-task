import Image from "next/image";
import { SectionBadge } from "../ui/section-badge";
import { Marquee } from "../ui/marquee";
import { PlayVideoIcon } from "../icons/play-video-icon";
import { StarIcon } from "../icons/star-icon";
import { TESTIMONIAL_CARDS } from "@/data";
import type { TestimonialCardData } from "@/data";

function VideoTestimonialCard({ card }: { card: TestimonialCardData }) {
  return (
    <div
      className="relative rounded-[2.5rem] h-[445px] lg:w-[371px] shrink-0 px-4 py-6 bg-cover bg-center flex flex-col overflow-hidden"
      style={{ backgroundImage: `url('${card.imageSrc}')` }}
    >
      <div className="absolute inset-0 bg-[#00000099]"></div>
      <div className="z-10 h-full flex flex-col">
        <div className="flex flex-col">
          <p className="text-white text-[1.25rem] leading-8.5 font-medium w-[300px] h-[128px]">
            {card.quote}
          </p>
          <p className="text-white text-[1.5rem] leading-17 font-bold">
            {card.name}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="h-[35px] w-[123px] rounded-full inline-flex items-center justify-center gap-2.5 text-white font-medium text-[0.875rem] leading-17 bg-[linear-gradient(180deg,#001F3F_0%,#003366_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] py-4 px-3">
            {card.tag}
          </span>
          <button className="h-[35px] w-[123px] rounded-full inline-flex items-center justify-center gap-2.5 text-[#00000033] font-bold text-[0.875rem] leading-17 bg-white">
            <span className="bg-[linear-gradient(180deg,#001933_0%,#002952_100%)] bg-clip-text text-transparent">
              Play Video
            </span>
            <PlayVideoIcon gradientId={card.gradientId!} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewTestimonialCard({ card }: { card: TestimonialCardData }) {
  return (
    <div className="rounded-[2.5rem] h-[445px] lg:w-[371px] shrink-0 p-4 flex flex-col bg-white px-4 py-6">
      <div className="h-full flex flex-col gap-4">
        <Image
          src={card.imageSrc}
          alt="Testimonial Image 2"
          width={164}
          height={155}
          className="rounded-[40px] object-cover object-center aspect-[0.85/0.75]"
        />
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>

        <p className="text-[1.25rem] leading-7 text-[#4A5565] w-[339px] h-[79px]">
          {card.quote}
        </p>
        <p className="text-[1.5rem] leading-7 text-[#4A5565] font-bold">
          {card.name}
        </p>

        <span className="h-[35px] w-[123px] rounded-full inline-flex items-center justify-center gap-2.5 text-white font-medium text-[0.875rem] leading-17 bg-[linear-gradient(180deg,#001F3F_0%,#003366_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] py-4 px-3">
          {card.tag}
        </span>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="w-full bg-[#F2F2F2] py-20">
      <div className="container mx-auto flex flex-col gap-10 max-w-full">
        <div className="flex flex-col gap-6 px-4 md:px-6 lg:px-20">
          <SectionBadge label="Testimonials" />
          <h2 className="font-bold text-[2rem] leading-12.5 lg:text-[2.5rem] lg:leading-17 lg:w-[705px] lg:h-[53px] text-[#001F3F]">
            Hear From Customer&apos;s We Serve.
          </h2>
          <p className="text-[1rem] lg:text-[1.25rem] leading-8.5 text-[#4B4B4B] lg:h-[29px] lg:w-[705px]">
            Use the experience of our past customers to know if we&apos;re the
            right fit for you.
          </p>
        </div>

        {/* Testimonial Marquee */}
        <Marquee speed={35}>
          {TESTIMONIAL_CARDS.map((card) =>
            card.type === "video" ? (
              <VideoTestimonialCard key={card.name} card={card} />
            ) : (
              <ReviewTestimonialCard key={card.name} card={card} />
            ),
          )}
        </Marquee>
      </div>
    </section>
  );
}
