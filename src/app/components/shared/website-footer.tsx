import { BrandLogo } from "./brand-logo";

export default function WebsiteFooter() {
  return (
    <footer className="pt-12 pb-20 bg-[#012B56] w-full">
      <div className="flex flex-col gap-8 container mx-auto px-4 md:px-8 lg:px-20">
        <div className="flex flex-col gap-4">
          <BrandLogo className="w-27.75 h-11 hidden lg:block" />
          <div className="lg:hidden flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10C0 4.477 4.477 0 10 0h12c5.523 0 10 4.477 10 10v12c0 5.523-4.477 10-10 10H10C4.477 32 0 27.523 0 22z"
                fill="url(#footer-logo-grad)"
              />
              <defs>
                <linearGradient
                  id="footer-logo-grad"
                  x1="16"
                  y1="0"
                  x2="16"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset="1" stopColor="#2ecc71" />
                </linearGradient>
              </defs>
            </svg>
            <p className="font-semibold text-[1rem] leading-6 text-white">
              Easy Tax
            </p>
          </div>
          <p className="hidden lg:block w-[481px] text-[0.875rem] leading-5 text-[#D1D5DC]">
            Where everyday individuals and businesses get premium tax support.
          </p>
          <p className="lg:hidden w-[328px] text-[0.875rem] leading-5 text-[#D1D5DC]">
            Making tax filing easy and compliant under Nigeria's new tax act
            2025.
          </p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="w-[228px] font-bold text-[1rem] leading-6 text-white">
              File Your Personal Taxes
            </h3>
            <ul className="flex flex-col gap-2 text-[#D1D5DC] w-[228px] text-[0.875rem] leading-5">
              <li>
                <a href="#">Diaspora & International Taxes</a>
              </li>
              <li>
                <a href="#">Self Employed and Business Owners</a>
              </li>
              <li>
                <a href="#">Freelancers & Remote Workers</a>
              </li>
              <li>
                <a href="#">Salary Earners</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="w-[228px] font-bold text-[1rem] leading-6 text-white">
              File Your Company Taxes
            </h3>
            <ul className="flex flex-col gap-2 text-[#D1D5DC] w-[228px] text-[0.875rem] leading-5">
              <li>
                <a href="#">Small & Mid Sized Businesses</a>
              </li>
              <li>
                <a href="#">Large Business</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="w-[228px] font-bold text-[1rem] leading-6 text-white">
              Tax Guides
            </h3>
            <ul className="flex flex-col gap-2 text-[#D1D5DC] w-[228px] text-[0.875rem] leading-5">
              <li>
                <a href="#">How to file my personal taxes</a>
              </li>
              <li>
                <a href="#">How to file my business taxes</a>
              </li>
              <li>
                <a href="#">How to file diaspora taxes</a>
              </li>
              <li>
                <a href="#">How to file taxes for my staff</a>
              </li>
              <li>
                <a href="#" className="font-bold underline underline-offset-2">
                  View All Guides
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="w-[228px] font-bold text-[1rem] leading-6 text-white">
              Resources
            </h3>
            <ul className="flex flex-col gap-2 text-[#D1D5DC] w-[228px] text-[0.875rem] leading-5">
              <li>
                <a href="#">Self Tax Assessment</a>
              </li>
              <li>
                <a href="#">Tax Calculator</a>
              </li>
              <li>
                <a href="#">Tax Chatbot</a>
              </li>
              <li>
                <a href="#">Tax Community</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="w-[228px] font-bold text-[1rem] leading-6 text-white">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 text-[#D1D5DC] w-[228px] text-[0.875rem] leading-5">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">How It Works</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col gap-4">
          <h3 className="w-[228px] font-bold text-[1rem] leading-6 text-white">
            Connect With Us
          </h3>
          <div className="flex gap-2">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="size-5.25"
            >
              <path
                d="M25.873,6.069c-2.619-2.623-6.103-4.067-9.814-4.069C8.411,2,2.186,8.224,2.184,15.874c-.001,2.446,.638,4.833,1.852,6.936l-1.969,7.19,7.355-1.929c2.026,1.106,4.308,1.688,6.63,1.689h.006c7.647,0,13.872-6.224,13.874-13.874,.001-3.708-1.44-7.193-4.06-9.815h0Zm-9.814,21.347h-.005c-2.069,0-4.099-.557-5.87-1.607l-.421-.25-4.365,1.145,1.165-4.256-.274-.436c-1.154-1.836-1.764-3.958-1.763-6.137,.003-6.358,5.176-11.531,11.537-11.531,3.08,.001,5.975,1.202,8.153,3.382,2.177,2.179,3.376,5.077,3.374,8.158-.003,6.359-5.176,11.532-11.532,11.532h0Zm6.325-8.636c-.347-.174-2.051-1.012-2.369-1.128-.318-.116-.549-.174-.78,.174-.231,.347-.895,1.128-1.098,1.359-.202,.232-.405,.26-.751,.086-.347-.174-1.464-.54-2.788-1.72-1.03-.919-1.726-2.054-1.929-2.402-.202-.347-.021-.535,.152-.707,.156-.156,.347-.405,.52-.607,.174-.202,.231-.347,.347-.578,.116-.232,.058-.434-.029-.607-.087-.174-.78-1.88-1.069-2.574-.281-.676-.567-.584-.78-.595-.202-.01-.433-.012-.665-.012s-.607,.086-.925,.434c-.318,.347-1.213,1.186-1.213,2.892s1.242,3.355,1.416,3.587c.174,.232,2.445,3.733,5.922,5.235,.827,.357,1.473,.571,1.977,.73,.83,.264,1.586,.227,2.183,.138,.666-.1,2.051-.839,2.34-1.649,.289-.81,.289-1.504,.202-1.649s-.318-.232-.665-.405h0Z"
                fill="#FFF"
                fillRule="evenodd"
              ></path>
            </svg>
            <p className="text-[0.875rem] leading-5 text-[#D1D5DC]">
              WhatsApp: +234 800 123 4567
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="#"
              className="bg-[#FFFFFF1A] inline-flex items-center justify-center size-8 rounded-full"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1.333h-2a3.333 3.333 0 0 0-3.333 3.333v2h-2v2.667h2v5.333h2.666V9.333h2L12 6.666H9.333v-2A.667.667 0 0 1 10 4h2z"
                  stroke="#fff"
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="#"
              className="bg-[#FFFFFF1A] inline-flex items-center justify-center size-8 rounded-full"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.667 2.666s-.467 1.4-1.334 2.267c1.067 6.667-6.266 11.533-12 7.733 1.467.067 2.934-.4 4-1.333-3.333-1-5-4.933-3.333-8C3.467 5.066 5.733 6.066 8 6c-.6-2.8 2.667-4.4 4.667-2.534.733 0 2-.8 2-.8"
                  stroke="#fff"
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="#"
              className="bg-[#FFFFFF1A] inline-flex items-center justify-center size-8 rounded-full"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  clipPath="url(#a)"
                  stroke="#fff"
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11.333 1.333H4.667a3.333 3.333 0 0 0-3.334 3.333v6.667a3.333 3.333 0 0 0 3.334 3.333h6.666a3.333 3.333 0 0 0 3.334-3.333V4.666a3.333 3.333 0 0 0-3.334-3.333" />
                  <path d="M10.667 7.58a2.667 2.667 0 1 1-5.276.782 2.667 2.667 0 0 1 5.276-.782m1-3.247h.006" />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h16v16H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>

            <a
              href="#"
              className="bg-[#FFFFFF1A] inline-flex items-center justify-center size-8 rounded-full"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.667 5.333a4 4 0 0 1 4 4V14H12V9.333a1.334 1.334 0 0 0-2.667 0V14H6.667V9.333a4 4 0 0 1 4-4M4 6H1.333v8H4zM2.667 4a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667"
                  stroke="#fff"
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="#"
              className="bg-[#FFFFFF1A] inline-flex items-center justify-center size-8 rounded-full"
            >
              <svg
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.429 2.37h-.572c-.63 0-1.143-.531-1.143-1.185V.593a.6.6 0 0 0-.167-.42A.56.56 0 0 0 9.143 0H6.857a.56.56 0 0 0-.404.174.6.6 0 0 0-.167.419v10.37c0 .817-.64 1.481-1.429 1.481-.788 0-1.428-.664-1.428-1.481s.64-1.482 1.428-1.482c.051 0 .096-.017.143-.03.047.013.092.03.143.03a.56.56 0 0 0 .404-.173.6.6 0 0 0 .167-.42v-2.37a.6.6 0 0 0-.167-.419.56.56 0 0 0-.404-.173c-.051 0-.096.017-.143.03-.047-.013-.092-.03-.143-.03C2.18 5.926 0 8.186 0 10.963S2.179 16 4.857 16c2.55 0 4.642-2.049 4.838-4.641.006-.034.02-.065.02-.1V5.726a4.2 4.2 0 0 0 1.789.195.56.56 0 0 0 .354-.197.6.6 0 0 0 .142-.39V2.962a.6.6 0 0 0-.167-.42.56.56 0 0 0-.404-.173m-.572 2.384c-.393-.023-.941-.124-1.353-.473a.56.56 0 0 0-.606-.076.6.6 0 0 0-.238.22.6.6 0 0 0-.089.316v6.222c0 2.124-1.666 3.852-3.714 3.852s-3.714-1.728-3.714-3.852c0-2.024 1.514-3.685 3.428-3.837v1.2c-1.282.15-2.285 1.267-2.285 2.636 0 1.47 1.153 2.667 2.571 2.667s2.572-1.196 2.572-2.667V1.185H8.57c0 1.307 1.026 2.37 2.286 2.37z"
                  fill="#fff"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Date and Copyright */}
        <div className="border-t border-[#FFFFFF1A] h-[53px] pt-8.25 flex items-center justify-center text-center">
          <p className="w-[545px] text-[0.875rem] leading-5 text-[#D1D5DC]">
            © 2025 TaxEase NG. All rights reserved. Built for compliance with
            Nigeria Tax Act 2025.
          </p>
        </div>
      </div>
    </footer>
  );
}
