import {
  queryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { DalQueryError } from '@/dal/types';
import { CurrencyCode } from '@/feature/user-settings/lib/currencies';
import type { UserSettings } from '@/feature/user-settings/schema';
import { createQueryKeys } from '@/lib/create-query-keys';

import {
  getUserSettingsQueryFn,
  updateUserCurrencyMutationFn,
} from './queryFns';

export const userSettingsKeys = createQueryKeys<'userSettings'>('userSettings');

/**
 * Get Query Options for user-settings
 * @returns Query Options for user-settings
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
 * Hook to get user settings
 * @param options Query options
 * @returns user settings query result
 */
export const useUserSettingsQuery = (
  options?: UseQueryOptions<UserSettings, Error | DalQueryError>,
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
 * Hook to update user settings currency
 * @param options Query options
 * @returns user settings mutation result
 */
export const useUserSettingsCurrencyMutation = (
  options?: UseMutationOptions<
    UserSettings,
    Error | DalQueryError,
    CurrencyCode
  >,
) =>
  useMutation({
    mutationFn: updateUserCurrencyMutationFn,
    mutationKey: userSettingsKeys.all,
    ...options,
  });
