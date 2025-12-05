import { atom } from 'jotai';

import { Currency } from '@/feature/user-settings/lib/currencies';

export const selectedCurrencyAtom = atom<Currency | null>(null);
