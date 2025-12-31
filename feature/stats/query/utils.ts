'use client';

import { useQueryClient } from '@tanstack/react-query';

import { statsKeys, StatsType } from '@/feature/stats/query';

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
export const useStatsUtils = () => {
  const queryClient = useQueryClient();

  const invalidateStats = async () => {
    await queryClient.invalidateQueries({ queryKey: statsKeys.all });
  };

  const invalidateStatsType = async (type: StatsType) => {
    await queryClient.invalidateQueries({
      queryKey: statsKeys.typeLists(type),
    });
  };

  const refetchStats = async () => {
    await queryClient.refetchQueries({ queryKey: statsKeys.all });
  };

  return {
    invalidateStats,
    invalidateStatsType,
    refetchStats,
  };
};
