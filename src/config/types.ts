import { ReactNode } from "react";

/* ─── UI Component Types ────────────────────────────────────────────────── */

export interface TabItem {
  value: string;
  label: string;
  content?: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  label: string;
  className?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface BaseSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/* ─── Tax API Types ─────────────────────────────────────────────────────── */

/** A single band from the PAYE calculator response. */
export interface TaxBand {
  band: string;
  rate: number;
  taxableAmount: number;
  taxPaid: number;
}

/** Parsed industry from the industries API. */
export interface Industry {
  id: string;
  name: string;
  requiresIncomeTax: boolean;
  hasExemptionPeriod: boolean;
  exemptionPeriodYears: number;
}

/** Parsed company income tax configuration. */
export interface CompanyTaxConfig {
  taxRate: number;
  taxableAmountThreshold: number;
}

/** Shared shape reported by each tab to the Calculator parent. */
export interface TaxSummary {
  annual: number;
  monthly: number;
  effectiveRate: number;
}

/* ─── Form State Types ──────────────────────────────────────────────────── */

export interface IncomeFields {
  salaryIncome: number;
  businessIncome: number;
  rentalIncome: number;
  investmentIncome: number;
  otherIncome: number;
}

export interface DeductionFields {
  rent: number;
  pensionContribution: number;
  nhfContribution: number;
  lifeInsurance: number;
  nhisPremium: number;
  gratitude: number;
}
