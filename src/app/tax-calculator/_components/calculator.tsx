"use client";

import { useState, useCallback } from "react";
import { Tabs } from "@/app/components/ui/tabs";
import type { Industry, CompanyTaxConfig, TaxSummary } from "@/config/types";
import { formatNaira } from "@/lib/format";
import PersonalIncome from "./personal-income";
import CompanyIncomeTax from "./company-income-tax";

interface CalculatorProps {
  industries: Industry[];
  config: CompanyTaxConfig;
}

const EMPTY_SUMMARY: TaxSummary = {
  annual: 0,
  monthly: 0,
  effectiveRate: 0,
};

export default function Calculator({ industries, config }: CalculatorProps) {
  const [activeTab, setActiveTab] = useState("personal");

  // Each tab reports its summary so the mobile card shows the active tab's values.
  const [personalSummary, setPersonalSummary] =
    useState<TaxSummary>(EMPTY_SUMMARY);
  const [companySummary, setCompanySummary] =
    useState<TaxSummary>(EMPTY_SUMMARY);

  const handlePersonalSummary = useCallback(
    (s: TaxSummary) => setPersonalSummary(s),
    [],
  );
  const handleCompanySummary = useCallback(
    (s: TaxSummary) => setCompanySummary(s),
    [],
  );

  const activeSummary =
    activeTab === "personal" ? personalSummary : companySummary;

  return (
    <>
      <Tabs
        label="Income type"
        selectedValue={activeTab}
        onSelect={setActiveTab}
        tabs={[
          {
            value: "personal",
            label: "Personal Income",
            content: <PersonalIncome onSummaryChange={handlePersonalSummary} />,
          },
          {
            value: "company",
            label: "Company Income Tax",
            content: (
              <CompanyIncomeTax
                industries={industries}
                config={config}
                onSummaryChange={handleCompanySummary}
              />
            ),
          },
        ]}
      />

      {/* ── Mobile fixed Annual Tax Liability card ─────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden w-full">
        <div className="relative bg-[linear-gradient(180deg,rgba(0,31,63,0.7)_0%,rgba(0,51,102,0.7)_100%)] backdrop-blur-md border border-white/10 text-white p-6 rounded-t-3xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.72777 17.1367V11.0407H-0.000234358V9.43272H1.72777V7.53672H-0.000234358V5.92872H1.72777V0.00071764H4.60777L6.76777 5.92872H9.40777V0.00071764H11.5198V5.92872H13.2478V7.53672H11.5198V9.43272H13.2478V11.0407H11.5198V17.1367H8.63977L6.45577 11.0407H3.83977V17.1367H1.72777ZM3.83977 9.43272H5.90377L5.23177 7.53672H3.79177L3.83977 9.43272ZM9.43177 13.6567H9.52777L9.45577 11.0407H8.54377L9.43177 13.6567ZM3.76777 5.92872H4.67977L3.76777 3.14472H3.67177L3.76777 5.92872ZM7.99177 9.43272H9.45577L9.40777 7.53672H7.31977L7.99177 9.43272Z"
                  fill="white"
                ></path>
              </svg>
              <span className="text-[1rem] leading-5">
                Annual Tax Liability
              </span>
            </div>
            <h2 className="text-5xl font-bold tabular-nums">
              {formatNaira(activeSummary.annual)}
            </h2>
            <div className="border-t border-[#FFFFFF33] pt-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-[0.75rem] leading-4 opacity-75">Monthly</p>
                <p className="text-[1.25rem] leading-7 font-bold">
                  {formatNaira(activeSummary.monthly)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[0.75rem] leading-4 opacity-75">
                  Effective Rate
                </p>
                <p className="text-[1.25rem] leading-7 font-bold">
                  {activeSummary.effectiveRate.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
