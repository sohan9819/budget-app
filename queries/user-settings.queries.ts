'use client';

import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/helper/apiClient';
import type { UserSettings } from '@/schema/user_settings';

/**
 * Client-side function to fetch user settings from API
 */
export const fetchUserSettings = async (): Promise<UserSettings[]> => {
  const response = await apiClient<UserSettings[]>('/api/user-settings', {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

/**
 * React Query hook for user settings management
 * This hook manages the user settings state with React Query's caching and refetching
 */
export const useUserSettingsQuery = () => {
  return useQuery({
    queryKey: ['userSettings'],
    queryFn: fetchUserSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
