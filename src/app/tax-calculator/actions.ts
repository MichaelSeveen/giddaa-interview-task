"use server";

import type { TaxBand, IncomeFields, DeductionFields } from "@/config/types";

const PAYE_URL = "https://api.taxoga.com/public/tax/paye/calculator";

/**
 * Call the PAYE tax calculator API.
 *
 * This is a Server Action — the request runs server-side, keeping the
 * external API URL out of the client bundle.
 */
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
    // Dynamic body — no caching
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`PAYE API returned ${res.status}`);
  }

  const json = await res.json();

  // Shape: { value: { value: TaxBand[] } }
  const bands: TaxBand[] = json.value.value;
  return bands;
}
