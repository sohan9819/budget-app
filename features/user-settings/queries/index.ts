import {
  queryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { userSettingsKeys } from '@/features/user-settings/queries/keys';
import {
  getUserSettings,
  updateUserCurrency,
} from '@/features/user-settings/server';
// import { apiClient } from '@/lib/api-client';
import { CurrencyCode } from '@/lib/currencies';
import type { UserSettings } from '@/schema/user_settings';

/**
 * Client-side function to fetch user settings from API ( Not Required )
 */
// export const fetchUserSettings = async (): Promise<UserSettings> => {
//   const [userSettings] = await apiClient<UserSettings[]>('/api/user-settings', {
//     method: 'GET',
//     credentials: 'include',
//   });
//   return userSettings;
// };

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
