import { QueryClient } from '@tanstack/react-query';

import type { UserSettings } from '@/schema/user_settings';

/**
 * Server-side function to prefetch user settings data into React Query cache
 * This can be used in server components to prefetch user settings before rendering
 *
 * @param queryClient - The QueryClient instance to set data in
 * @param userSettings - The user settings data to prefetch (already fetched on server)
 */
export function prefetchUserSettings(
  queryClient: QueryClient,
  userSettings: UserSettings[],
) {
  // Prefetch the user settings query with the provided data
  queryClient.setQueryData(['userSettings'], userSettings);
}
