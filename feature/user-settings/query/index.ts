import {
  queryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { CurrencyCode } from '@/feature/user-settings/lib/currencies';
import { userSettingsKeys } from '@/feature/user-settings/query/keys';
import type { UserSettings } from '@/feature/user-settings/schema';
import {
  getUserSettings,
  updateUserCurrency,
} from '@/feature/user-settings/server';

/**
 * React Query options for user settings query
 */
export const getUserSettingsQueryOptions = () =>
  queryOptions({
    queryFn: getUserSettings,
    queryKey: userSettingsKeys.all,
    staleTime: 12 * 60 * 60 * 1000, // 12 hours
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

/**
 * React Query hook for user settings management
 * This custom hook provides a query to fetch the user's settings
 */
export const useUserSettingsQuery = (
  options?: UseQueryOptions<UserSettings, Error>,
) => {
  return useQuery({
    queryFn: getUserSettings,
    queryKey: userSettingsKeys.all,
    staleTime: 12 * 60 * 60 * 1000, // 12 hours
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    ...options,
  });
};

/**
 * React Query hook for user settings management
 * This custom hook provides a mutation to update the user's currency setting
 */
export const useUserSettingsCurrencyMutation = (
  options?: UseMutationOptions<UserSettings, Error, CurrencyCode>,
) =>
  useMutation({
    mutationFn: updateUserCurrency,
    mutationKey: userSettingsKeys.all,
    ...options,
  });
