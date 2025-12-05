'use client';

import { useQuery } from '@tanstack/react-query';

import { categoryKeys } from '@/feature/category/query/keys';
import { CategoryFilters } from '@/feature/category/types';

import { getCategory } from '../server/get-category';

/**
 * React Query hook for category management
 * This hook manages the category state with React Query's caching and refetching
 */
export const useCategoryQuery = (params?: CategoryFilters) => {
  return useQuery({
    queryKey: params ? categoryKeys.list(params) : categoryKeys.lists(),
    queryFn: () => getCategory(params),
    staleTime: Infinity, // longer stale time since static data
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
