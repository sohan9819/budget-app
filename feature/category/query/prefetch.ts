import { QueryClient } from '@tanstack/react-query';

import { categoryKeys } from '@/feature/category/query';
import type { Category } from '@/feature/category/schema';

/**
 * Server-side function to prefetch user settings data into React Query cache
 * This can be used in server components to prefetch user settings before rendering
 *
 * @param queryClient - The QueryClient instance to set data in
 * @param category - The user settings data to prefetch (already fetched on server)
 */
export function prefetchCategory(
  queryClient: QueryClient,
  category: Category[],
) {
  // Prefetch the user settings query with the provided data
  queryClient.setQueryData(categoryKeys.all, category);
}
