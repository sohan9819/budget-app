import { atom } from 'jotai';

import { Currency } from '@/features/user-settings/lib/currencies';

export const selectedCurrencyAtom = atom<Currency | null>(null);
