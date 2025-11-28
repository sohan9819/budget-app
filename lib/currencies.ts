import {
  DollarSign,
  Euro,
  PoundSterling,
  IndianRupee,
  JapaneseYen,
  SwissFranc,
  Coins, // fallback
  CircleDollarSign,
  CircleEllipsis,
  LucideIcon,
} from 'lucide-react';

// Required for pgEnum
export const CURRENCY_CODES = [
  'USD',
  'EUR',
  'GBP',
  'INR',
  'JPY',
  'CNY',
  'AUD',
  'CAD',
  'CHF',
  'SGD',
  'NZD',
  'AED',
  'ZAR',
  'SEK',
  'BRL',
] as const;

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

export const CurrencyStrings: Record<Currency['value'], string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  CNY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'CHF',
  SGD: 'S$',
  NZD: 'NZ$',
  AED: 'د.إ',
  ZAR: 'R',
  SEK: 'kr',
  BRL: 'R$',
};

export const CurrencyIcons: Record<Currency['value'], LucideIcon> = {
  USD: DollarSign,
  EUR: Euro,
  GBP: PoundSterling,
  INR: IndianRupee,
  JPY: JapaneseYen,
  CNY: CircleDollarSign,
  AUD: CircleDollarSign,
  CAD: CircleDollarSign,
  CHF: SwissFranc,
  SGD: Coins,
  NZD: Coins,
  AED: CircleEllipsis,
  ZAR: Coins,
  SEK: Coins,
  BRL: Coins,
};

export type Currency = (typeof Currencies)[number];
export type CurrencyCode = Currency['value'];
export const CurrencyMap = Object.fromEntries(
  Currencies.map((c) => [c.value, c]),
) as Record<Currency['value'], Currency>;

export const CurrencyValues = Currencies.map((c) => c.value) as [
  CurrencyCode,
  ...CurrencyCode[],
];
