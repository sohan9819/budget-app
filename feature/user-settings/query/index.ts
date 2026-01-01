import {
  queryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { CurrencyCode } from '@/feature/user-settings/lib/currencies';
import type { UserSettings } from '@/feature/user-settings/schema';
import {
  getUserSettingsQueryFn,
  updateUserCurrency,
} from '@/feature/user-settings/server';

export const userSettingsKeys = {
  all: ['userSettings'] as const,
};

/**
 * React Query options for user settings query
 */
export const getUserSettingsQueryOptions = () =>
  queryOptions({
    queryFn: getUserSettingsQueryFn,
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
    queryFn: getUserSettingsQueryFn,
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

export const getUserSettingsDALQueryOptions = () =>
  queryOptions({
    queryFn: getUserSettingsQueryFn,
    queryKey: [...userSettingsKeys.all, 'dal'],
    staleTime: 12 * 60 * 60 * 1000, // 12 hours
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
