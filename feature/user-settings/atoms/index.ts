import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { Currency, CurrencyMap } from '@/feature/user-settings/lib/currencies';
import { UserSettings } from '@/feature/user-settings/schema';

export const userSettingsAtom = atomWithStorage<UserSettings>('userSettings', {
  userId: '',
  currency: 'INR',
} as UserSettings);
export const selectedCurrencyAtom = atom(
  (get) => {
    const settings = get(userSettingsAtom);
    if (settings?.currency) {
      return CurrencyMap[settings.currency as Currency['value']];
    }
    return null;
  },
  (get, set, { value }: Currency) => {
    set(userSettingsAtom, {
      ...get(userSettingsAtom),
      currency: value,
    });
  },
);
