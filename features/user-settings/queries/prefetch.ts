import { QueryClient } from '@tanstack/react-query';

import { getUserSettingsQueryOptions } from '@/features/user-settings/queries';

/**
 * Server-side function to prefetch user settings data into React Query cache
 * This can be used in server components to prefetch user settings before rendering
 *
 * @param queryClient - The QueryClient instance to set data in
 */
export const prefetchUserSettings = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(getUserSettingsQueryOptions());
