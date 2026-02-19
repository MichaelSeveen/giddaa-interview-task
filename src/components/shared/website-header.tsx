import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { WhatsAppIcon } from "../icons/whatsapp-icon";
import ChevronDownIcon from "../icons/chevron-down-icon";
import { Button } from "../ui/button";

export default function WebsiteHeader() {
  return (
    <header className="bg-background fixed inset-x-0 top-0 z-50 py-4 border-b border-[#E9E9E9] h-18.75">
      <nav
        className="flex items-center justify-between container mx-auto px-4 md:px-6 lg:px-20 max-w-full"
        aria-label="Main navigation"
      >
        <Link href="/">
          <BrandLogo className="h-10 w-auto" />
        </Link>
        <ul className="hidden lg:flex gap-8 text-sm">
          <li className="w-[130px] h-5 flex items-center justify-between">
            Tax Resources <ChevronDownIcon className="text-charcoal" />
          </li>
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
          <Button type="button" className="h-10 font-medium">
            <WhatsAppIcon />
            Speak with an expert
          </Button>

          <Button variant="secondary" className="h-10">
            Seek Tax Support
          </Button>
        </div>

        <Button className="lg:hidden bg-transparent">
          <svg
            aria-hidden="true"
            stroke="black"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
          >
            <path d="M4 8l16 0" />
            <path d="M4 16l16 0" />
          </svg>

          <span className="sr-only">Hamburger Icon</span>
        </Button>
      </nav>
    </header>
  );
}
