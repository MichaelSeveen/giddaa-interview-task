"use server";

import type { TaxBand, IncomeFields, DeductionFields } from "@/config/types";

const PAYE_URL = "https://api.taxoga.com/public/tax/paye/calculator";

export async function calculatePAYE(
  income: IncomeFields,
  deductions: DeductionFields,
): Promise<TaxBand[]> {
  const res = await fetch(PAYE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      income: {
        salaryIncome: income.salaryIncome,
        businessIncome: income.businessIncome,
        rentalIncome: income.rentalIncome,
        investmentIncome: income.investmentIncome,
        otherIncome: income.otherIncome,
      },
      deductions: {
        rent: deductions.rent,
        pensionContribution: deductions.pensionContribution,
        nhfContribution: deductions.nhfContribution,
        lifeInsurance: deductions.lifeInsurance,
        nhisPremium: deductions.nhisPremium,
        gratitude: deductions.gratitude,
      },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`PAYE API returned ${res.status}`);
  }

  const json = await res.json();

  const bands: TaxBand[] = json.value.value;
  return bands;
}
