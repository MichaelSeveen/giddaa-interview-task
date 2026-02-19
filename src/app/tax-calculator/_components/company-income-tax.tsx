"use client";

import { useState, useEffect } from "react";
import type {
  Industry,
  CompanyTaxConfig,
  TaxSummary,
  SelectOption,
} from "@/config/types";
import { formatNaira } from "@/lib/format";
import { parseInput } from "@/lib/utils";
import Alert from "@/components/ui/alert";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { Combobox } from "@/components/ui/combobox";
import NairaIcon from "@/components/icons/naira-icon";

const CURRENT_YEAR = new Date().getFullYear();

const PROFIT_OPTIONS: SelectOption[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

interface CompanyIncomeTaxProps {
  industries: Industry[];
  config: CompanyTaxConfig;
  onSummaryChange: (summary: TaxSummary) => void;
}

export default function CompanyIncomeTax({
  industries,
  config,
  onSummaryChange,
}: CompanyIncomeTaxProps) {
  const [industryId, setIndustryId] = useState("");
  const [revenueLevel, setRevenueLevel] = useState("");
  const [madeProfit, setMadeProfit] = useState("");
  const [totalNetProfit, setTotalNetProfit] = useState(0);
  const [yearOfIncorporation, setYearOfIncorporation] = useState(0);

  const industryOptions: SelectOption[] = industries.map((ind) => ({
    value: ind.id,
    label: ind.name,
  }));

  const revenueOptions: SelectOption[] = [
    {
      value: "less",
      label: `Less than ${formatNaira(config.taxableAmountThreshold)}`,
    },
    {
      value: "more",
      label: `More than ${formatNaira(config.taxableAmountThreshold)}`,
    },
  ];

  const selectedIndustry =
    industries.find((industry) => industry.id === industryId) ?? null;

  const isTaxExempt = selectedIndustry
    ? !selectedIndustry.requiresIncomeTax
    : false;

  const isInExemptionPeriod = (() => {
    if (!selectedIndustry?.hasExemptionPeriod) return false;
    if (!yearOfIncorporation || yearOfIncorporation <= 0) return false;
    const yearsSinceIncorporation = CURRENT_YEAR - yearOfIncorporation;
    return yearsSinceIncorporation <= selectedIndustry.exemptionPeriodYears;
  })();

  const shouldCalculateTax =
    !isTaxExempt &&
    revenueLevel === "more" &&
    madeProfit === "yes" &&
    !isInExemptionPeriod &&
    totalNetProfit > 0;

  const taxPayable = shouldCalculateTax
    ? (config.taxRate / 100) * totalNetProfit
    : 0;

  const monthly = taxPayable / 12;
  const effectiveRate = shouldCalculateTax ? config.taxRate : 0;

  type BreakdownMode = "empty" | "tax-free" | "taxed";

  const breakdownMode: BreakdownMode = (() => {
    if (!industryId || !revenueLevel) return "empty";
    if (isTaxExempt) return "tax-free";
    if (revenueLevel === "less") return "tax-free";
    if (madeProfit === "no") return "tax-free";
    if (isInExemptionPeriod) return "tax-free";
    if (shouldCalculateTax) return "taxed";
    return "empty";
  })();

  const showProfitQuestion = revenueLevel === "more";
  const showProfitFields = madeProfit === "yes";

  useEffect(() => {
    onSummaryChange({ annual: taxPayable, monthly, effectiveRate });
  }, [taxPayable, monthly, effectiveRate, onSummaryChange]);

  function handleReset() {
    setRevenueLevel("");
    setMadeProfit("");
    setTotalNetProfit(0);
    setYearOfIncorporation(0);
  }

  function handleRevenueChange(value: string) {
    setRevenueLevel(value);
    if (value !== "more") {
      setMadeProfit("");
      setTotalNetProfit(0);
      setYearOfIncorporation(0);
    }
  }

  function handleProfitChange(value: string) {
    setMadeProfit(value);
    if (value !== "yes") {
      setTotalNetProfit(0);
      setYearOfIncorporation(0);
    }
  }

  function getTaxFreeReason(): string {
    if (isTaxExempt) return "You are in a tax-free industry";
    if (isInExemptionPeriod)
      return `Tax exemption period applies (${selectedIndustry!.exemptionPeriodYears} years)`;
    if (revenueLevel === "less")
      return `Revenue below ${formatNaira(config.taxableAmountThreshold)} threshold`;
    return "No profit reported";
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <Alert className="lg:hidden flex">
        The business calculator calculates the income of registered limited
        liability companies.
      </Alert>

      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <Card
            title="Income Sources"
            description="Enter your annual income from all your income sources."
          >
            <div className="flex flex-col gap-6 pb-4">
              {/* Industry */}
              <div className="flex flex-col gap-2">
                <Label>Industry</Label>
                <Combobox
                  label="Industry"
                  options={industryOptions}
                  value={industryId}
                  onChange={setIndustryId}
                  placeholder="Select Industry"
                />
              </div>

              {/* Total Sales/Revenue */}
              <div className="flex flex-col gap-2">
                <Label>Total Sales/Revenue</Label>
                <Select
                  label="Total Sales/Revenue"
                  options={revenueOptions}
                  value={revenueLevel}
                  onChange={handleRevenueChange}
                  placeholder="Select revenue range"
                />
              </div>

              {/* Did You Make a Profit? */}
              {showProfitQuestion && (
                <div className="flex flex-col gap-2">
                  <p className="text-[0.75rem] leading-6 text-[#717171]">
                    Did your business make a profit for the last financial year?
                  </p>
                  <Label>Did You Make a Profit?</Label>
                  <Select
                    label="Did You Make a Profit?"
                    options={PROFIT_OPTIONS}
                    value={madeProfit}
                    onChange={handleProfitChange}
                    placeholder="Select"
                  />
                </div>
              )}

              {/* Total Net Profit */}
              {showProfitFields && (
                <>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="netProfit">Total Net Profit (₦)</Label>
                    <Input
                      type="number"
                      id="netProfit"
                      placeholder="75000000"
                      value={totalNetProfit || ""}
                      onChange={(e) =>
                        setTotalNetProfit(parseInput(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="year">Year of Incorporation</Label>
                    <Input
                      type="number"
                      id="year"
                      placeholder="2016"
                      value={yearOfIncorporation || ""}
                      onChange={(e) =>
                        setYearOfIncorporation(parseInput(e.target.value))
                      }
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#0000001A] pt-4">
              <p className="text-[1rem] leading-6 text-[#717171]">
                Total Income
              </p>
              <p className="text-[1.25rem] leading-7 text-primary font-bold">
                {formatNaira(totalNetProfit)}
              </p>
            </div>
          </Card>

          <button
            onClick={handleReset}
            className="bg-white border border-[#0000001A] px-4 py-2 h-11.25 w-full inline-flex items-center justify-center gap-4 font-medium text-[0.875rem] leading-5 rounded-[12px]"
          >
            Reset All
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="hidden lg:block bg-[linear-gradient(180deg,#001F3F_0%,#003366_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] text-white">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <NairaIcon />
                <span className="text-[1rem] leading-5">
                  Annual Tax Liability
                </span>
              </div>
              <p className="text-5xl font-bold tabular-nums">
                {formatNaira(taxPayable)}
              </p>
              <div className="border-t border-[#FFFFFF33] pt-4 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-[0.75rem] leading-4 opacity-75">Monthly</p>
                  <p className="text-[1.25rem] leading-7 font-bold tabular-nums">
                    {formatNaira(monthly)}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[0.75rem] leading-4 opacity-75">
                    Effective Rate
                  </p>
                  <p className="text-[1.25rem] leading-7 font-bold tabular-nums">
                    {effectiveRate.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Tax Breakdown by Bracket */}
          <Card title="Tax Breakdown by Bracket">
            {breakdownMode === "taxed" ? (
              <div className="flex flex-col gap-4">
                <Progress
                  label={`${config.taxRate}% Tax Band`}
                  value={100}
                  displayValue={formatNaira(taxPayable)}
                  description={`${formatNaira(totalNetProfit)} taxed at ${config.taxRate}% Tax Band`}
                />
              </div>
            ) : breakdownMode === "tax-free" ? (
              <div className="flex flex-col gap-4">
                <Progress
                  label="Tax-Free Band"
                  value={0}
                  displayValue={formatNaira(0)}
                  description={getTaxFreeReason()}
                />
              </div>
            ) : (
              <p className="text-sm text-[#717171] py-4">
                Select an industry and revenue range to see your tax breakdown.
              </p>
            )}
          </Card>

          {/* Income Summary */}
          <Card title="Income Summary">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col pb-3 border-b border-[#0000001A] gap-3">
                <SummaryRow
                  label="Gross Income"
                  value={formatNaira(totalNetProfit)}
                />
              </div>
              <div className="flex flex-col pb-3 border-b border-[#0000001A] gap-3">
                <SummaryRow
                  label="Taxable Income"
                  value={formatNaira(totalNetProfit)}
                />
                <SummaryRow
                  label="Tax Payable"
                  value={taxPayable > 0 ? `-${formatNaira(taxPayable)}` : "₦0"}
                  valueClassName={taxPayable > 0 ? "text-[#C90000]" : undefined}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[1rem] leading-6 text-[#717171]">
                  Net Income
                </p>
                <p className="text-[1.5rem] font-bold leading-8 text-primary">
                  {formatNaira(totalNetProfit)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between text-[1rem] leading-6">
      <p className="text-[#717171]">{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
}
