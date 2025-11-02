import { QueryClient } from '@tanstack/react-query';

import type { SessionResponse } from '@/queries/auth.queries';

/**
 * Server-side function to prefetch session data into React Query cache
 * This can be used in server components to prefetch session before rendering
 *
 * @param sessionResponse - The session data to prefetch (already fetched on server)
 * @returns QueryClient with prefetched session data
 */
export function prefetchSession(sessionResponse: SessionResponse) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });

  // Prefetch the session query with the provided data
  queryClient.setQueryData(['session'], sessionResponse);

  return queryClient;
}
