import type { ReactNode } from "react";
import type { AccordionItemData } from "./components/ui/accordion";

// FAQ Data
export const FAQ_DATA: AccordionItemData[] = [
  {
    id: "fees",
    title: "What is included in audit protection?",
    content:
      "Tax audit protection typically includes services that help you navigate the complexities of an audit. This can involve professional representation, assistance with documentation, and guidance on how to respond to inquiries from tax authorities. Additionally, it may cover the costs associated with legal fees and any potential penalties, ensuring you have support throughout the audit process.",
  },
  {
    id: "vat",
    title: "What is included in audit protection?",
    content:
      "Tax audit protection typically includes services that help you navigate the complexities of an audit. This can involve professional representation, assistance with documentation, and guidance on how to respond to inquiries from tax authorities. Additionally, it may cover the costs associated with legal fees and any potential penalties, ensuring you have support throughout the audit process.",
  },
  {
    id: "taxes",
    title: "What is included in audit protection?",
    content:
      "Tax audit protection typically includes services that help you navigate the complexities of an audit. This can involve professional representation, assistance with documentation, and guidance on how to respond to inquiries from tax authorities. Additionally, it may cover the costs associated with legal fees and any potential penalties, ensuring you have support throughout the audit process.",
  },
];

// Metrics Data
export interface MetricItem {
  value: string;
  label: string;
  bgColor: string;
  width: string;
}

export const METRICS_DATA: MetricItem[] = [
  {
    value: "N150M",
    label: "Tax Value Filed",
    bgColor: "bg-[#00C7BE]",
    width: "w-[33.84%] lg:w-[39%]",
  },
  {
    value: "250",
    label: "Active Audience",
    bgColor: "bg-[#FF9500]",
    width: "w-[37.41%] lg:w-[39%]",
  },
  {
    value: "145K",
    label: "Returns Filed",
    bgColor: "bg-[#32ADE6]",
    width: "w-[28.75%] lg:w-[22%]",
  },
];

// How It Works Data
export interface StepCardData {
  numberComponent: "one" | "two" | "three";
  title: string;
  description: string;
  mobileTitle: string;
  mobileDescription: string;
  titleHeight?: string;
  descHeight?: string;
}

export const HOW_IT_WORKS_STEPS: StepCardData[] = [
  {
    numberComponent: "one",
    title: "Identify the Taxes You Need to File",
    description:
      "Use our self-assessment tool or speak directly with a tax expert to confirm your obligations. We handle VAT, PAYE, Withholding Tax, Company Income Tax (CIT), and Personal Income Tax (PIT).",
    mobileTitle: "Choose the Right Tax Plan.",
    mobileDescription:
      "Choosing the right tax plan is crucial for success. Whether a freelancer, business owner, or employee, consider your situation. Options like File with an Expert, Expert Assist, and File by Myself help you maximize your return.",

    titleHeight: "h-[47px]",
    descHeight: "h-[135px]",
  },
  {
    numberComponent: "two",
    title: "Pay Filing fee and Submit Documents",
    description:
      "Once payment is made, share the required documents with our tax experts. We prepare and file your taxes on your behalf, while optimizing for legitimate tax savings.",
    mobileTitle: "File Your Tax Return.",
    mobileDescription:
      "Regardless of your tax situation, you can file confidently with the help of an expert, tackle it on your own, or utilize AI assistance. Each method ensures you maximize your return and receive the best value.",

    titleHeight: "h-[66px]",
    descHeight: "h-[125px]",
  },
  {
    numberComponent: "three",
    title: "Get Confirmation and Proof of Filing",
    description:
      "You'll receive an alert once your taxes have been successfully filed, along with proof of filing and a tax clearance certificate where applicable.",
    mobileTitle: "Claim Your Refund or Pay Your Taxes.",
    mobileDescription:
      "No matter your tax needs, file with confidence and get the most out of your return.",
    titleHeight: "h-[47px]",
    descHeight: "h-[91px]",
  },
];

// Who We Serve Data
export interface ServiceCardData {
  title: string;
  tagline: string;
  description: string;
  bgColor: string;
  imageSrc: string;
}

export const WHO_WE_SERVE_CARDS: ServiceCardData[] = [
  {
    title: "Small Business Owners",
    tagline:
      "We help you stay compliant, save money, and do the most important thing — focus on your business.",
    description:
      "Running a small business is already tough — tax shouldn't make it harder. The new law requires most registered businesses to file annual returns, even if they made no profit. We help you understand what's required, file quickly, and get your Tax Clearance Certificate (TCC) without stress.",
    bgColor: "bg-[#FF9500]",
    imageSrc: "/images/wws-image-1.jpg",
  },
  {
    title: "Salary Earners (Public and Private)",
    tagline:
      "We help you make sense of your payslip — and make sure your hard-earned money works for you.",
    description:
      "Even if your employer remits your PAYE, the Tax Act still gives you rights — to reliefs, refunds, and accurate filing. We help you verify what's been paid, claim what's yours, and stay compliant if you have side income or multiple jobs.",
    bgColor: "bg-[#34C759]",
    imageSrc: "/images/wws-image-2.jpg",
  },
  {
    title: "Large Businesses",
    tagline: "We keep your business ahead of FIRS changes — not chasing them.",
    description:
      "The new Tax Act holds large corporations to higher standards of transparency and reporting — from company income tax to withholding and VAT filings. We help your finance and audit teams stay fully compliant, avoid penalties, and file accurately. No more late filings, confusing updates, or system errors. You get structure, accountability, and peace of mind.",
    bgColor:
      "bg-[linear-gradient(180deg,#001F3F_0%,#003366_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))]",
    imageSrc: "/images/wws-image-3.jpg",
  },
  {
    title: "Remote Workers and Freelancers",
    tagline:
      "You shouldn't need to be a tax expert to earn from anywhere — we'll handle that part.",
    description:
      "Whether you're a designer, writer, developer, or influencer — your income still falls under the new digital and foreign income tax rules. We help you file correctly, track what's taxable, and avoid penalties for unreported earnings. No jargon. No fear. Just clarity.",
    bgColor: "bg-[#00C7BE]",
    imageSrc: "/images/wws-image-4.jpg",
  },
  {
    title: "Property Owners and Landlords",
    tagline:
      "You worked hard to own it — we'll make sure you keep more of what you earn from it.",
    description:
      "The 2025 Tax Act now makes rental income taxable, and property sales may attract capital gains tax. We make it easy to calculate what's due, file on time, and avoid overpaying. Whether you own a single flat or multiple estates, we help you stay compliant while protecting your income",
    bgColor: "bg-[#5856D6]",
    imageSrc: "/images/wws-image-5.jpg",
  },
];

// Why Trust Us Data
export interface TrustCardData {
  subtitle: string;
  title: string;
  tagline: string;
  description: string;
  stat: string;
  bgColor: string;
  imageSrc: string;
  imageAlt: string;
  subtitleColor: string;
  titleWidth?: string;
  titleHeight?: string;
  taglineHeight?: string;
  descHeight?: string;
  statHeight?: string;
  imageClassName?: string;
}

export const WHY_TRUST_US_CARDS: TrustCardData[] = [
  {
    subtitle: "Save as Much as Possible.",
    title: "Legally Maximize Your Returns",
    tagline:
      "Our goal isn't just to file your taxes — it's to keep more money in your pocket.",
    description:
      "We claim every legal relief and deduction you qualify for, from pensions, to rent — so you keep more of your money, legally.",
    stat: "Over N100M Saved",
    bgColor: "bg-[#32ADE6]",
    imageSrc: "/images/wtu-image-1.jpg",
    imageAlt: "Hero Image",
    subtitleColor: "text-[#001F3F]",
    titleHeight: "h-[79px]",
    taglineHeight: "h-[68px]",
    descHeight: "h-[63px]",
    statHeight: "lg:h-[39px]",
    imageClassName: "object-cover aspect-477/517",
  },
  {
    subtitle: "Trust & Experience",
    title: "Experience You Can Count On",
    tagline:
      "We speak the language of FIRS — and translate it into results for you.",
    description:
      "We've helped individuals, freelancers, and businesses navigate Nigeria's complex tax system. You get local insight and proven results — not guesswork.",
    stat: "200+ Returns Filed",
    bgColor: "bg-[#FF9500]",
    imageSrc: "/images/wtu-image-2.jpg",
    imageAlt: "Experience You Can Count On",
    subtitleColor: "text-[#6B4003]",
    titleWidth: "w-[310px] lg:w-[482px]",
    titleHeight: "h-[70px] lg:h-[34px]",
    taglineHeight: "h-[62px]",
    descHeight: "h-[101px]",
    statHeight: "lg:h-[37px]",
    imageClassName: "object-cover object-top",
  },
  {
    subtitle: "Razor Sharp Accuracy",
    title: "Accuracy That Protects You",
    tagline:
      "Because one wrong entry can cost you — we make sure it never does.",
    description:
      "We've helped individuals, freelancers, and businesses navigate Nigeria's complex tax system. You get local insight and proven results — not guesswork.",
    stat: "0% Tax Errors",
    bgColor: "bg-[#34C759]",
    imageSrc: "/images/wtu-image-3.jpg",
    imageAlt: "Accuracy That Protects You",
    subtitleColor: "text-[#00330D]",
    titleWidth: "w-[310px] lg:w-[482px]",
    titleHeight: "h-[70px] lg:h-[34px]",
    taglineHeight: "h-[68px]",
    descHeight: "h-[101px]",
    statHeight: "lg:h-[60px]",
    imageClassName: "object-center object-cover",
  },
  {
    subtitle: "Tax Experts Who Care",
    title: "Real Support From Real People",
    tagline:
      "Because good tax support should sound like a conversation, not a lecture.",
    description:
      "Our team of Nigerian tax experts is here to help by chat or phone — simple answers, no jargon.",
    stat: "Thoughtful Experts",
    bgColor: "bg-[#00C7BE]",
    imageSrc: "/images/wtu-image-4.jpg",
    imageAlt: "Hero Image",
    subtitleColor: "text-[#001F3F]",
    titleWidth: "w-[310px] lg:w-[482px]",
    titleHeight: "h-[70px] lg:h-[79px]",
    taglineHeight: "h-[68px]",
    descHeight: "h-[63px]",
    statHeight: "lg:h-[48px]",
    imageClassName: "object-center object-cover",
  },
  {
    subtitle: "Transparent Fees and Process",
    title: "Transparent From Start to Finish",
    tagline:
      "Trust starts with transparency — and we build it into every filing.",
    description:
      "You always know what's filed, what's due, and what you're paying for. No hidden charges, no inflated numbers.",
    stat: "You're In Control",
    bgColor: "bg-[#AF52DE]",
    imageSrc: "/images/wtu-image-5.jpg",
    imageAlt: "Transparent From Start to Finish",
    subtitleColor: "text-[#001F3F]",
    titleWidth: "w-[310px] lg:w-[482px]",
    titleHeight: "h-[70px] lg:h-[79px]",
    descHeight: "h-[63px]",
    statHeight: "lg:h-[68px]",
    imageClassName: "object-center object-cover",
  },
];

// Testimonial Data
export type TestimonialType = "video" | "review";

export interface TestimonialCardData {
  type: TestimonialType;
  quote: string;
  name: string;
  tag: string;
  imageSrc: string;
  gradientId?: string;
}

export const TESTIMONIAL_CARDS: TestimonialCardData[] = [
  {
    type: "video",
    quote:
      "\u201CChoosing the right tax plan is crucial for success. Whether a freelancer, business owner, or employee\u201D",
    name: "Juicy Fruit Ltd.",
    tag: "Company Tax",
    imageSrc: "/images/testimonial-image-1.jpg",
    gradientId: "z",
  },
  {
    type: "review",
    quote:
      "\u201CThe tax assessment tool is incredibly useful! It simplifies the process of evaluating my tax situation, making it\u201D",
    name: "Maryam Musa, CEO Meck Doramen",
    tag: "Personal Tax",
    imageSrc: "/images/testimonial-image-2.jpg",
  },
  {
    type: "video",
    quote:
      "\u201CChoosing the right tax plan is crucial for success. Whether a freelancer, business owner, or employee\u201D",
    name: "Nancy Ogunlise",
    tag: "Company Tax",
    imageSrc: "/images/testimonial-image-3.jpg",
    gradientId: "q",
  },
  {
    type: "video",
    quote:
      "\u201CChoosing the right tax plan is crucial for success. Whether a freelancer, business owner, or employee\u201D",
    name: "James Barber\u2019s Shop.",
    tag: "Company Tax",
    imageSrc: "/images/testimonial-image-4.jpg",
    gradientId: "j",
  },
];
