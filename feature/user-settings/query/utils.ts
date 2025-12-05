'use client';

import { useQueryClient } from '@tanstack/react-query';

import { userSettingsKeys } from '@/feature/user-settings/query/keys';

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
export const useUserSettingsUtils = () => {
  const queryClient = useQueryClient();

  const invalidateUserSettings = async () => {
    await queryClient.invalidateQueries({ queryKey: userSettingsKeys.all });
  };

  const refetchUserSettings = async () => {
    await queryClient.refetchQueries({ queryKey: userSettingsKeys.all });
  };

  return {
    invalidateUserSettings,
    refetchUserSettings,
  };
};
