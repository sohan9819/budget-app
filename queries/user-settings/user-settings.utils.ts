'use client';

import { useQueryClient } from '@tanstack/react-query';

/**
 * Utility hook to invalidate and refetch user settings after mutations
 * Use this after updating user settings (currency, etc.)
 *
 * @example
 * ```tsx
 * const { invalidateUserSettings } = useUserSettingsUtils();
 *
 * const handleUpdateCurrency = async () => {
 *   await updateCurrency('USD');
 *   await invalidateUserSettings();
 * };
 * ```
 */
export function useUserSettingsUtils() {
  const queryClient = useQueryClient();

  const invalidateUserSettings = async () => {
    await queryClient.invalidateQueries({ queryKey: ['userSettings'] });
  };

  const refetchUserSettings = async () => {
    await queryClient.refetchQueries({ queryKey: ['userSettings'] });
  };

  return {
    invalidateUserSettings,
    refetchUserSettings,
  };
}
