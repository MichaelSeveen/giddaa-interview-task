"use client";

import { useState, useCallback } from "react";
import { Tabs } from "@/components/ui/tabs";
import type { Industry, CompanyTaxConfig, TaxSummary } from "@/config/types";
import { formatNaira } from "@/lib/format";
import PersonalIncome from "./personal-income";
import CompanyIncomeTax from "./company-income-tax";
import NairaIcon from "@/components/icons/naira-icon";

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
      {/* Annual tax liability for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden w-full">
        <div className="relative bg-[linear-gradient(180deg,rgba(0,31,63,0.7)_0%,rgba(0,51,102,0.7)_100%)] backdrop-blur-md border border-white/10 text-white p-6 rounded-t-3xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <NairaIcon />
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
