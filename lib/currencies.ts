export const Currencies = [
  {
    value: 'USD',
    label: '$ US Dollar',
    locale: 'en-US',
  },
  {
    value: 'EUR',
    label: '€ Euro',
    locale: 'de-DE',
  },
  {
    value: 'GBP',
    label: '£ British Pound',
    locale: 'en-GB',
  },
  {
    value: 'INR',
    label: '₹ Indian Rupee',
    locale: 'en-IN',
  },
  {
    value: 'JPY',
    label: '¥ Japanese Yen',
    locale: 'ja-JP',
  },
  {
    value: 'CNY',
    label: '¥ Chinese Yuan',
    locale: 'zh-CN',
  },
  {
    value: 'AUD',
    label: 'A$ Australian Dollar',
    locale: 'en-AU',
  },
  {
    value: 'CAD',
    label: 'C$ Canadian Dollar',
    locale: 'en-CA',
  },
  {
    value: 'CHF',
    label: 'CHF Swiss Franc',
    locale: 'de-CH',
  },
  {
    value: 'SGD',
    label: 'S$ Singapore Dollar',
    locale: 'en-SG',
  },
  {
    value: 'NZD',
    label: 'NZ$ New Zealand Dollar',
    locale: 'en-NZ',
  },
  {
    value: 'AED',
    label: 'د.إ UAE Dirham',
    locale: 'ar-AE',
  },
  {
    value: 'ZAR',
    label: 'R South African Rand',
    locale: 'en-ZA',
  },
  {
    value: 'SEK',
    label: 'kr Swedish Krona',
    locale: 'sv-SE',
  },
  {
    value: 'BRL',
    label: 'R$ Brazilian Real',
    locale: 'pt-BR',
  },
] as const;

export const CurrencyValues = Currencies.map((currency) => currency.value) as [
  string,
  ...string[],
];

export type Currency = (typeof Currencies)[number];
export const CurrencyMap = Object.fromEntries(
  Currencies.map((c) => [c.value, c]),
) as Record<Currency['value'], Currency>;
