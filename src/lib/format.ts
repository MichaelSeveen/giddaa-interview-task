const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Format a number as Nigerian Naira.
 *
 * Examples:
 *   formatNaira(1426200)  → "₦1,426,200"
 *   formatNaira(0)        → "₦0"
 *   formatNaira(-5702453) → "-₦5,702,453"
 */
export function formatNaira(amount: number): string {
  return nairaFormatter.format(amount);
}
