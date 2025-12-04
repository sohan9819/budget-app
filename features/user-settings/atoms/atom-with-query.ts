'use client';

import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

import {
  Currency,
  CURRENCY_CODES,
} from '@/features/user-settings/lib/currencies';
import { fetchUserSettings } from '@/features/user-settings/queries';
import type { UserSettings } from '@/features/user-settings/schema';

import { userSettingsKeys } from '../queries/keys';

/**
 * Jotai atom integrated with React Query for user settings
 * This atom automatically manages fetching, caching, and refetching through React Query
 */
export const userSettingsQueryAtom = atomWithQuery(() => ({
  queryKey: userSettingsKeys.all,
  queryFn: fetchUserSettings,
  staleTime: 12 * 60 * 60 * 1000, // 5 minutes
  retry: 1,
  refetchOnWindowFocus: true,
  refetchOnMount: true,
}));

/**
 * Get the user settings object from api response
 */
export const userSettingsAtom = atom<UserSettings | null>((get) => {
  const { data } = get(userSettingsQueryAtom);
  return data ?? null;
});

/**
 * Get user currency setting
 */
export const userCurrencyAtom = atom<Currency['value'] | null>((get) => {
  const settings = get(userSettingsAtom);
  return settings?.currency ?? CURRENCY_CODES[0];
});

/**
 * Derived atom to check if user settings are loading
 */
export const userSettingsLoadingAtom = atom<boolean>((get) => {
  const query = get(userSettingsQueryAtom);
  return query.isPending;
});

/**
 * Derived atom to get user settings error
 */
export const userSettingsErrorAtom = atom<Error | null>((get) => {
  const query = get(userSettingsQueryAtom);
  return query.error;
});
