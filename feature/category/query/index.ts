'use client';

import {
  useQuery,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

import { Category, CreateCategoryForm } from '@/feature/category/schema';
import { createCategory } from '@/feature/category/server';
import { getCategory } from '@/feature/category/server';
import { TransactionType } from '@/feature/transaction/types';
import { createQueryKeys } from '@/lib/create-query-keys';

export type CategoryFilters = {
  type: TransactionType;
};

export const categoryKeys = createQueryKeys<'category', CategoryFilters>(
  'category',
);

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

/**
 * React Query hook for category management
 * This custom hook provides a mutation to create new category
 */
export const useCreateCategoryMutation = (
  options?: UseMutationOptions<Category, Error, CreateCategoryForm>,
) =>
  useMutation({
    mutationFn: createCategory,
    ...options,
  });
