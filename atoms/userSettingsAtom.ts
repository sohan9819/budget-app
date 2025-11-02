'use client';

import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

import { fetchUserSettings } from '@/queries/user-settings.queries';
import type { UserSettings } from '@/schema/user_settings';

/**
 * Jotai atom integrated with React Query for user settings
 * This atom automatically manages fetching, caching, and refetching through React Query
 */
export const userSettingsQueryAtom = atomWithQuery(() => ({
  queryKey: ['userSettings'],
  queryFn: fetchUserSettings,
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: 1,
  refetchOnWindowFocus: true,
  refetchOnMount: true,
}));

/**
 * Derived atoms for easy access to user settings data
 */
export const userSettingsDataAtom = atom<UserSettings[] | undefined>((get) => {
  const query = get(userSettingsQueryAtom);
  return query.data;
});

/**
 * Get the first user settings object (since API returns array)
 */
export const userSettingsAtom = atom<UserSettings | null>((get) => {
  const data = get(userSettingsDataAtom);
  return data?.[0] ?? null;
});

/**
 * Get user currency setting
 */
export const userCurrencyAtom = atom<string | null>((get) => {
  const settings = get(userSettingsAtom);
  return settings?.currency ?? null;
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
