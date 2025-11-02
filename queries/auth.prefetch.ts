import { getQueryClient } from '@/lib/get-query-client';

import type { SessionResponse } from './auth.queries';

/**
 * Server-side function to prefetch session data into React Query cache
 * This can be used in server components to prefetch session before rendering
 *
 * @param sessionResponse - The session data to prefetch (already fetched on server)
 * @returns QueryClient with prefetched session data
 */
export function prefetchAuthSession(sessionResponse: SessionResponse) {
  const queryClient = getQueryClient();

  // Prefetch the session query with the provided data
  queryClient.setQueryData(['session'], sessionResponse);

  return queryClient;
}
