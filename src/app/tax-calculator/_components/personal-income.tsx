"use client";

import { useState, useEffect, useTransition } from "react";
import type {
  TaxBand,
  TaxSummary,
  IncomeFields,
  DeductionFields,
} from "@/config/types";
import { calculatePAYE } from "../actions";
import { formatNaira } from "@/lib/format";
import Alert from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import NairaIcon from "@/components/icons/naira-icon";
import { parseInput } from "@/lib/utils";

const INITIAL_INCOME: IncomeFields = {
  salaryIncome: 0,
  businessIncome: 0,
  rentalIncome: 0,
  investmentIncome: 0,
  otherIncome: 0,
};

const INITIAL_DEDUCTIONS: DeductionFields = {
  rent: 0,
  pensionContribution: 0,
  nhfContribution: 0,
  lifeInsurance: 0,
  nhisPremium: 0,
  gratitude: 0,
};

const RATE_COLORS: Record<number, string> = {
  0: "bg-[#00C950]",
  15: "bg-[#2B7FFF]",
  18: "bg-[#4B1AFF]",
  21: "bg-[#BE9800]",
  23: "bg-[#FF6900]",
  25: "bg-[#FB2C36]",
};

function sumValues(obj: IncomeFields | DeductionFields): number {
  return Object.values(obj).reduce((a, b) => a + b, 0);
}

function bandLabel(rate: number): string {
  return rate === 0 ? "Tax-Free" : `${rate}% Band`;
}

interface PersonalIncomeProps {
  onSummaryChange: (summary: TaxSummary) => void;
}

export default function PersonalIncome({
  onSummaryChange,
}: PersonalIncomeProps) {
  const [income, setIncome] = useState<IncomeFields>(INITIAL_INCOME);
  const [deductions, setDeductions] =
    useState<DeductionFields>(INITIAL_DEDUCTIONS);
  const [taxBands, setTaxBands] = useState<TaxBand[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const grossIncome = sumValues(income);
  const totalDeductions = sumValues(deductions);
  const taxableIncome = grossIncome - totalDeductions;
  const totalTaxPaid = taxBands
    ? taxBands.reduce((s, b) => s + b.taxPaid, 0)
    : 0;

  const netIncome = taxableIncome - totalTaxPaid;
  const monthly = totalTaxPaid / 12;
  const effectiveRate =
    grossIncome > 0 ? (totalTaxPaid / grossIncome) * 100 : 0;

  // Report summary to parent whenever tax values change.
  useEffect(() => {
    onSummaryChange({
      annual: totalTaxPaid,
      monthly,
      effectiveRate,
    });
  }, [totalTaxPaid, monthly, effectiveRate, onSummaryChange]);

  function handleIncomeChange(field: keyof IncomeFields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setIncome((prev) => ({ ...prev, [field]: parseInput(e.target.value) }));
    };
  }

  function handleDeductionChange(field: keyof DeductionFields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setDeductions((prev) => ({
        ...prev,
        [field]: parseInput(e.target.value),
      }));
    };
  }

  function handleCalculate() {
    startTransition(async () => {
      try {
        const bands = await calculatePAYE(income, deductions);
        setTaxBands(bands);
      } catch (err) {
        console.error("PAYE calculation failed:", err);
      }
    });
  }

  function handleReset() {
    setIncome(INITIAL_INCOME);
    setDeductions(INITIAL_DEDUCTIONS);
    setTaxBands(null);
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <Alert className="lg:hidden flex">
        The personal income calculator calculates the income of individuals and
        registered business names. Business names are calculated using the
        personal income calculator because they are taxed like individuals.
      </Alert>

      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          {/* Income Sources */}
          <Card
            title="Income Sources"
            description="Enter your annual income from all your income sources."
          >
            <div className="flex flex-col gap-4 pb-4">
              <IncomeInput
                label="Salary/Employment Income (₦)"
                id="salary"
                placeholder="50000000"
                value={income.salaryIncome}
                onChange={handleIncomeChange("salaryIncome")}
              />
              <IncomeInput
                label="Business Income (₦)"
                id="business"
                placeholder="500000"
                value={income.businessIncome}
                onChange={handleIncomeChange("businessIncome")}
              />
              <IncomeInput
                label="Rental Income (₦)"
                id="rental"
                placeholder="3000000"
                value={income.rentalIncome}
                onChange={handleIncomeChange("rentalIncome")}
              />
              <IncomeInput
                label="Investment Income (₦)"
                id="investment"
                placeholder="0"
                value={income.investmentIncome}
                onChange={handleIncomeChange("investmentIncome")}
              />
              <IncomeInput
                label="Other Income (₦)"
                id="otherIncome"
                placeholder="0"
                value={income.otherIncome}
                onChange={handleIncomeChange("otherIncome")}
              />
            </div>
            <div className="flex items-center justify-between border-t border-[#0000001A] pt-4">
              <p className="text-[1rem] leading-6 text-charcoal">
                Total Income
              </p>
              <p className="text-[1.25rem] leading-7 text-primary font-bold">
                {formatNaira(grossIncome)}
              </p>
            </div>
          </Card>

          {/* Allowable Deductions */}
          <Card
            title="Allowable Deductions"
            description="Enter the annual amount of any of the following allowable deductions"
          >
            <div className="flex flex-col gap-4 pb-4">
              <IncomeInput
                label="Rent (₦)"
                id="rent"
                placeholder="5678986"
                value={deductions.rent}
                onChange={handleDeductionChange("rent")}
              />
              <IncomeInput
                label="Pension Contribution (₦)"
                id="pension"
                placeholder="5678986"
                value={deductions.pensionContribution}
                onChange={handleDeductionChange("pensionContribution")}
              />
              <IncomeInput
                label="NHF Contribution (₦)"
                id="nhf"
                placeholder="5678986"
                value={deductions.nhfContribution}
                onChange={handleDeductionChange("nhfContribution")}
              />
              <IncomeInput
                label="Life Insurance (₦)"
                id="lifeInsurance"
                placeholder="0"
                value={deductions.lifeInsurance}
                onChange={handleDeductionChange("lifeInsurance")}
              />
              <IncomeInput
                label="NHIS Premium (₦)"
                id="nhis"
                placeholder="0"
                value={deductions.nhisPremium}
                onChange={handleDeductionChange("nhisPremium")}
              />
              <IncomeInput
                label="Gratuity (₦)"
                id="gratuity"
                placeholder="0"
                value={deductions.gratitude}
                onChange={handleDeductionChange("gratitude")}
              />
            </div>
            <div className="flex items-center justify-between border-t border-[#0000001A] pt-4">
              <p className="text-[1rem] leading-6 text-charcoal">
                Total Deductions
              </p>
              <p className="text-[1.25rem] leading-7 text-primary font-bold">
                {formatNaira(totalDeductions)}
              </p>
            </div>
          </Card>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCalculate}
              disabled={isPending}
              className="bg-primary text-white px-4 py-2 h-11.25 w-58.75 lg:w-105.75 inline-flex items-center justify-center gap-4 font-medium text-[0.875rem] leading-5 rounded-[12px] disabled:opacity-60"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1.333H4c-.736 0-1.333.597-1.333 1.334v10.666c0 .737.597 1.334 1.333 1.334h8c.737 0 1.334-.597 1.334-1.334V2.667c0-.737-.597-1.334-1.334-1.334M5.333 4h5.333m.001 5.333V12m0-5.333h.007M8 6.667h.007m-2.674 0h.007M8 9.333h.007m-2.674 0h.007M8 12h.007m-2.674 0h.007"
                  stroke="#fff"
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isPending ? "Calculating…" : "Calculate Tax"}
            </button>
            <button
              onClick={handleReset}
              className="bg-white border border-[#0000001A] px-4 py-2 h-11.25 w-28.5 lg:w-32.25 inline-flex items-center justify-center gap-4 font-medium text-[0.875rem] leading-5 rounded-[12px]"
            >
              Reset All
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Annual Tax Liability */}
          <Card className="hidden lg:block bg-[linear-gradient(180deg,#001F3F_0%,#003366_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] text-white">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <NairaIcon />
                <span className="text-[1rem] leading-5">
                  Annual Tax Liability
                </span>
              </div>
              <h2 className="text-5xl font-bold tabular-nums">
                {formatNaira(totalTaxPaid)}
              </h2>
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
            {taxBands ? (
              <div className="flex flex-col gap-4">
                {taxBands.map((band) => {
                  const label = bandLabel(band.rate);
                  const progress =
                    totalTaxPaid > 0 ? (band.taxPaid / totalTaxPaid) * 100 : 0;
                  return (
                    <Progress
                      key={band.band}
                      label={label}
                      value={progress}
                      displayValue={formatNaira(band.taxPaid)}
                      description={`${formatNaira(band.taxableAmount)} taxed at ${label}`}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-charcoal py-4">
                Enter your income and click &quot;Calculate Tax&quot; to see
                your tax breakdown.
              </p>
            )}
          </Card>

          {/* Income Summary */}
          <Card title="Income Summary">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col pb-3 border-b border-[#0000001A] gap-3">
                <SummaryRow
                  label="Gross Income"
                  value={formatNaira(grossIncome)}
                />
                <SummaryRow
                  label="Total Deductions"
                  value={`-${formatNaira(totalDeductions)}`}
                  valueClassName="text-[#00A63E]"
                />
              </div>
              <div className="flex flex-col pb-3 border-b border-[#0000001A] gap-3">
                <SummaryRow
                  label="Taxable Income"
                  value={formatNaira(taxableIncome)}
                />
                <SummaryRow
                  label="Tax Payable"
                  value={`-${formatNaira(totalTaxPaid)}`}
                  valueClassName="text-[#C90000]"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[1rem] leading-6 text-charcoal">
                  Net Income
                </p>
                <p className="text-[1.5rem] font-bold leading-8 text-primary">
                  {formatNaira(netIncome)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 2025 Tax Brackets table */}
      <Card
        title="2025 Tax Brackets (Progressive Rates)"
        className="hidden lg:block"
      >
        {taxBands ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#0000001A] text-[#0A0A0A] font-bold text-[1rem] leading-6 h-12.25">
                <th className="text-left">Income Range</th>
                <th className="text-center">Tax Rate</th>
                <th className="text-right">Max Tax in Bracket</th>
              </tr>
            </thead>
            <tbody>
              {taxBands.map((band, i) => {
                const isLast = i === taxBands.length - 1;
                return (
                  <tr
                    key={band.band}
                    className={
                      isLast ? "h-12.25" : "border-b border-[#0000001A] h-12.25"
                    }
                  >
                    <td className="text-[1rem] leading-6 text-[#0A0A0A]">
                      {band.band}
                    </td>
                    <td className="text-center">
                      <Badge
                        className={RATE_COLORS[band.rate] ?? "bg-[#6B7280]"}
                      >
                        {band.rate}%
                      </Badge>
                    </td>
                    <td className="text-[1rem] leading-6 text-charcoal text-right">
                      {band.taxPaid > 0 ? formatNaira(band.taxPaid) : "₦0"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-charcoal py-4">
            Click &quot;Calculate Tax&quot; to see the 2025 progressive tax
            brackets applied to your income.
          </p>
        )}
      </Card>
    </div>
  );
}

function IncomeInput({
  label,
  id,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  id: string;
  placeholder: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type="number"
        id={id}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
      />
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
      <p className="text-charcoal">{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
}
