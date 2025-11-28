'use client';

import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/utils';
import { Category } from '@/schema';

import { CategoryFilters, categoryKeys } from '../keys';

/**
 * Client-side function to fetch category from API
 */
export const fetchCategory = async (
  params?: CategoryFilters,
): Promise<Category[]> => {
  const queryString = buildQueryString(params);
  const response = await apiClient<Category[]>(`/api/category${queryString}`, {
    method: 'GET',
    credentials: 'include',
  });
  return response;
};

/**
 * React Query hook for category management
 * This hook manages the category state with React Query's caching and refetching
 */
export const useCategoryQuery = (params?: CategoryFilters) => {
  return useQuery({
    queryKey: params ? categoryKeys.list(params) : categoryKeys.lists(),
    queryFn: () => fetchCategory(params),
    staleTime: Infinity, // longer stale time since static data
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
