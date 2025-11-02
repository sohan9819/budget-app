'use client';

import { useAtomValue } from 'jotai';

import {
  userCurrencyAtom,
  userSettingsAtom,
  userSettingsDataAtom,
  userSettingsErrorAtom,
  userSettingsLoadingAtom,
} from '@/atoms/userSettingsAtom';

/**
 * Custom hook to easily access user settings state throughout the app
 * This hook provides:
 * - settings: The current user settings object
 * - currency: The current user's currency preference
 * - isLoading: Boolean indicating if settings are being fetched
 * - error: Error object if settings fetch failed
 *
 * @example
 * ```tsx
 * const { currency, isLoading } = useUserSettings();
 *
 * if (isLoading) return <Spinner />;
 * return <div>Currency: {currency}</div>;
 * ```
 */
export function useUserSettings() {
  const settings = useAtomValue(userSettingsAtom);
  const currency = useAtomValue(userCurrencyAtom);
  const isLoading = useAtomValue(userSettingsLoadingAtom);
  const error = useAtomValue(userSettingsErrorAtom);
  const allSettings = useAtomValue(userSettingsDataAtom);

  return {
    settings,
    currency,
    isLoading,
    error,
    allSettings, // Returns the full array if needed
  };
}
