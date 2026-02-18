import { HeroSection } from "./components/sections/hero-section";
import { MetricsSection } from "./components/sections/metrics-section";
import { HowItWorksSection } from "./components/sections/how-it-works-section";
import { WhoWeServeSection } from "./components/sections/who-we-serve-section";
import { WhyTrustUsSection } from "./components/sections/why-trust-us-section";
import { TestimonialsSection } from "./components/sections/testimonials-section";
import { TaxCommunitySection } from "./components/sections/tax-community-section";
import { FAQSection } from "./components/sections/faq-section";
import { ChatWidget } from "./components/shared/chat-widget";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MetricsSection />
      <HowItWorksSection />
      <WhoWeServeSection />
      <WhyTrustUsSection />
      <TestimonialsSection />
      <TaxCommunitySection />
      <FAQSection />
      <ChatWidget
        messages={[
          {
            title: "Did You Know?",
            description:
              "You don't need to pay tax if you earn more than N50 Million Naira",
          },
          {
            title: "I am Tunder",
            description: "Ask me anything about taxes in Nigeria.",
          },
        ]}
      />
    </>
  );
}
