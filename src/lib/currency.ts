/**
 * Currency layer — display-level conversion only.
 *
 * Catalog and order pricing remain in USD cents (the internal record format),
 * and every price is converted at render time using indicative demo rates.
 * Rates are clearly presented as sample values for this demonstration store.
 */

export const CURRENCIES = [
  { code: "USD", label: "USD — US Dollar", rate: 1, locale: "en-US", decimals: 0 },
  { code: "PKR", label: "PKR — Pakistani Rupee", rate: 278, locale: "en-PK", decimals: 0 },
  { code: "GBP", label: "GBP — British Pound", rate: 0.79, locale: "en-GB", decimals: 0 },
  { code: "EUR", label: "EUR — Euro", rate: 0.92, locale: "en-IE", decimals: 0 },
  { code: "AED", label: "AED — UAE Dirham", rate: 3.67, locale: "en-AE", decimals: 0 },
  { code: "CAD", label: "CAD — Canadian Dollar", rate: 1.36, locale: "en-CA", decimals: 0 },
  { code: "INR", label: "INR — Indian Rupee", rate: 83.2, locale: "en-IN", decimals: 0 },
  { code: "AUD", label: "AUD — Australian Dollar", rate: 1.52, locale: "en-AU", decimals: 0 },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

export function currencyDef(code: string) {
  return CURRENCIES.find((currency) => currency.code === code) ?? CURRENCIES[0];
}

export function convertFromUsd(centsUsd: number, code: CurrencyCode): number {
  const def = currencyDef(code);
  return (centsUsd / 100) * def.rate;
}

/** Formats a USD-cent amount in the chosen currency. */
export function formatFromUsd(centsUsd: number, code: CurrencyCode): string {
  const def = currencyDef(code);
  const value = convertFromUsd(centsUsd, code);
  return new Intl.NumberFormat(def.locale, {
    style: "currency",
    currency: def.code,
    minimumFractionDigits: def.decimals,
    maximumFractionDigits: def.decimals,
  }).format(value);
}
