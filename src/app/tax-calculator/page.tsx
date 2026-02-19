import type { Metadata } from "next";
import type { Industry, CompanyTaxConfig } from "@/config/types";
import FooterCTA from "@/components/shared/footer-cta";
import Alert from "@/components/ui/alert";
import Calculator from "./_components/calculator";

export const metadata: Metadata = {
  metadataBase: new URL("https://giddaa-interview-task.vercel.app"),
  title: "Giddaa | Tax Calculator",
  description: "Calculate your tax liability under Nigeria's Tax Act 2025",
};

const INDUSTRIES_URL =
  "https://api.taxoga.com/public/option-type/TAX_INDUSTRIES/options?pageNumber=1&pageSize=500";
const CONFIG_URL =
  "https://api.taxoga.com/public/system-configuration/COMPANY_INCOME_TAX_CONFIGURATION";

const CACHE_OPTIONS: RequestInit = { next: { revalidate: 3600 } };

async function fetchIndustries(): Promise<Industry[]> {
  const res = await fetch(INDUSTRIES_URL, CACHE_OPTIONS);
  if (!res.ok) throw new Error(`Industries API returned ${res.status}`);

  const json = await res.json();
  const rawList: Array<{
    id: string;
    name: string;
    extraProperty: string;
  }> = json.value.value.data;

  return rawList.map((item) => {
    const extra = JSON.parse(item.extraProperty) as {
      RequiresIncomeTax: boolean;
      HasExemptionPeriod: boolean;
      ExemptionPeriodYears: number;
    };
    return {
      id: item.id,
      name: item.name,
      requiresIncomeTax: extra.RequiresIncomeTax,
      hasExemptionPeriod: extra.HasExemptionPeriod,
      exemptionPeriodYears: extra.ExemptionPeriodYears,
    };
  });
}

async function fetchCompanyTaxConfig(): Promise<CompanyTaxConfig> {
  const res = await fetch(CONFIG_URL, CACHE_OPTIONS);
  if (!res.ok) throw new Error(`Config API returned ${res.status}`);

  const json = await res.json();
  const parsed = JSON.parse(json.value.value.value) as {
    TaxRate: number;
    TaxableAmountThreshold: number;
  };

  return {
    taxRate: parsed.TaxRate,
    taxableAmountThreshold: parsed.TaxableAmountThreshold,
  };
}

export default async function TaxCalculatorPage() {
  const [industries, config] = await Promise.all([
    fetchIndustries(),
    fetchCompanyTaxConfig(),
  ]);

  return (
    <section className="bg-background">
      <div className="container mx-auto flex flex-col pt-10 pb-20 lg:pt-12.5 px-4 md:px-6 lg:px-26">
        <div className="flex flex-col items-center justify-center text-center gap-2 mb-6">
          <h1 className="text-[2.25rem] leading-10 font-bold text-[#001F3F]">
            Tax Calculator
          </h1>
          <p className="max-sm:w-90.25 text-[1.25rem] leading-7 text-[#4A5565]">
            Calculate your tax liability under Nigeria's Tax Act 2025
          </p>
        </div>
        <div className="self-center w-full">
          <Calculator industries={industries} config={config} />
        </div>

        <Alert className="hidden lg:flex lg:mb-8">
          This calculator uses the latest tax brackets and rates from Nigeria's
          Tax Act 2025. The first ₦800,000 of annual income is tax-free. Results
          are estimates and should be verified with one of our tax
          professionals.
        </Alert>
        <FooterCTA />
      </div>
    </section>
  );
}
