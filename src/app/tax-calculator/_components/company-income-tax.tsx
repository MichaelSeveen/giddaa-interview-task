"use client";

import { useState, useEffect } from "react";
import type {
  Industry,
  CompanyTaxConfig,
  TaxSummary,
  SelectOption,
} from "@/config/types";
import { formatNaira } from "@/lib/format";
import Alert from "@/app/components/ui/alert";
import Card from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import Label from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
import { Select } from "@/app/components/ui/dropdown";
import { Combobox } from "@/app/components/ui/combobox";

/* ─── Constants ──────────────────────────────────────────────────────────── */

const CURRENT_YEAR = new Date().getFullYear();

const PROFIT_OPTIONS: SelectOption[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function parseInput(raw: string): number {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

/* ─── Props ──────────────────────────────────────────────────────────────── */

interface CompanyIncomeTaxProps {
  industries: Industry[];
  config: CompanyTaxConfig;
  onSummaryChange: (summary: TaxSummary) => void;
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function CompanyIncomeTax({
  industries,
  config,
  onSummaryChange,
}: CompanyIncomeTaxProps) {
  /* ── State ─────────────────────────────────────────────────────────────── */

  const [industryId, setIndustryId] = useState("");
  const [revenueLevel, setRevenueLevel] = useState("");
  const [madeProfit, setMadeProfit] = useState("");
  const [totalNetProfit, setTotalNetProfit] = useState(0);
  const [yearOfIncorporation, setYearOfIncorporation] = useState(0);

  /* ── Derived: industry options for the Combobox ────────────────────────── */

  const industryOptions: SelectOption[] = industries.map((ind) => ({
    value: ind.id,
    label: ind.name,
  }));

  /* ── Derived: revenue Select options (from config threshold) ───────────── */

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

  /* ── Derived: selected industry's tax properties ──────────────────────── */

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

  /* ── Derived: tax calculation ──────────────────────────────────────────── */

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

  /* ── Derived: what to show in "Tax Breakdown by Bracket" ───────────────── */

  type BreakdownMode = "empty" | "tax-free" | "taxed";

  const breakdownMode: BreakdownMode = (() => {
    // No industry or revenue selected yet → empty
    if (!industryId || !revenueLevel) return "empty";

    // Tax-exempt industry → tax free
    if (isTaxExempt) return "tax-free";

    // Revenue < threshold → tax free
    if (revenueLevel === "less") return "tax-free";

    // Revenue > threshold but didn't make profit → tax free
    if (madeProfit === "no") return "tax-free";

    // Has exemption period and still within it → tax free
    if (isInExemptionPeriod) return "tax-free";

    // All conditions met and we have a profit → taxed
    if (shouldCalculateTax) return "taxed";

    // Otherwise → empty (waiting for more input)
    return "empty";
  })();

  /* ── Progressive disclosure: which fields are visible ──────────────────── */

  const showProfitQuestion = revenueLevel === "more";
  const showProfitFields = madeProfit === "yes";

  /* ── Report summary to parent ──────────────────────────────────────────── */

  useEffect(() => {
    onSummaryChange({ annual: taxPayable, monthly, effectiveRate });
  }, [taxPayable, monthly, effectiveRate, onSummaryChange]);

  /* ── Reset: clears everything except industry (avoid re-fetch) ─────────── */

  function handleReset() {
    setRevenueLevel("");
    setMadeProfit("");
    setTotalNetProfit(0);
    setYearOfIncorporation(0);
  }

  /* ── Cascade reset when changing revenue/profit ────────────────────────── */

  // When revenue changes away from "more", clear downstream fields
  function handleRevenueChange(value: string) {
    setRevenueLevel(value);
    if (value !== "more") {
      setMadeProfit("");
      setTotalNetProfit(0);
      setYearOfIncorporation(0);
    }
  }

  // When profit changes away from "yes", clear downstream fields
  function handleProfitChange(value: string) {
    setMadeProfit(value);
    if (value !== "yes") {
      setTotalNetProfit(0);
      setYearOfIncorporation(0);
    }
  }

  /* ── Render ──────────────────────────────────────────────────────────────── */

  return (
    <div className="flex flex-col gap-8 pb-8">
      <Alert className="lg:hidden flex">
        The business calculator calculates the income of registered limited
        liability companies.
      </Alert>

      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left column ──────────────────────────────────────────────────── */}
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

              {/* Did You Make a Profit? — visible only when "More" */}
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

              {/* Total Net Profit + Year of Incorporation — visible only when "Yes" */}
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
              <p className="text-[1.25rem] leading-7 text-[#2C59C3] font-bold">
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

        {/* ── Right column ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          {/* Annual Tax Liability (desktop) */}
          <Card className="hidden lg:block bg-[linear-gradient(180deg,#001F3F_0%,#003366_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] text-white">
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
                  description={
                    isTaxExempt
                      ? "You are in a tax-free industry"
                      : isInExemptionPeriod
                        ? `Tax exemption period applies (${selectedIndustry!.exemptionPeriodYears} years)`
                        : revenueLevel === "less"
                          ? `Revenue below ${formatNaira(config.taxableAmountThreshold)} threshold`
                          : "No profit reported"
                  }
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
                <p className="text-[1.5rem] font-bold leading-8 text-[#2C59C3]">
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

/* ─── Sub-components ─────────────────────────────────────────────────────── */

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
