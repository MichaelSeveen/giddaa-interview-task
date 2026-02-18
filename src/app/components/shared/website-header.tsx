import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { WhatsAppIcon } from "../icons";

export default function WebsiteHeader() {
  return (
    <header className="bg-background fixed w-full top-0 z-50 py-4 border-b border-[#E9E9E9] h-18.75">
      <nav
        className="flex items-center justify-between container mx-auto px-4 md:px-6 lg:px-20"
        aria-label="Main navigation"
      >
        <Link href="/">
          <BrandLogo className="h-10 w-auto" />
        </Link>
        <ul className="hidden lg:flex gap-8 text-sm">
          <li className="w-26.75 h-5">Tax Resources</li>
          <li className="hover:text-primary w-36.25 h-5">
            <Link href="/tax-calculator">Tax Calculator</Link>
          </li>
          <li className="w-[2.68rem] h-5">Pricing</li>
          <li className="w-25 h-5">Success Stories</li>
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="#"
            className="underline font-bold underline-offset-2 px-4 py-2 text-sm"
          >
            Login
          </Link>
          <button
            type="button"
            className="text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 box-border border border-transparent font-bold leading-5 rounded-base text-sm px-4 py-2 text-center inline-flex items-center justify-center gap-2 dark:focus:ring-primary/55 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 rounded-xl"
          >
            {/* Whatsapp logo */}
            <WhatsAppIcon />
            Speak with an expert
          </button>

          <button className="text-primary bg-white border-2 border-primary hover:text-primary focus:ring-4 focus:ring-brand-subtle font-bold leading-5 rounded-base text-sm px-4 py-2 focus:outline-none rounded-xl">
            Seek Tax Support
          </button>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center focus:ring-4 focus:ring-primary size-8 focus:outline-none [&_svg]:shrink-0 [&_svg]:size-5"
        >
          <svg
            aria-hidden="true"
            stroke="currentColor"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 8l16 0" />
            <path d="M4 16l16 0" />
          </svg>

          <span className="sr-only">Hamburger Icon</span>
        </button>
      </nav>
    </header>
  );
}
