'use client';

import {
  useQuery,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';

import {
  createCategoryFn,
  getCategoryFn,
} from '@/feature/category/query/queryFns';
import { Category, CreateCategoryForm } from '@/feature/category/schema';
import { TransactionType } from '@/feature/transaction/types';
import { createQueryKeys } from '@/lib/create-query-keys';

export type CategoryFilters = {
  type: TransactionType;
};

export const categoryKeys = createQueryKeys<'category', CategoryFilters>(
  'category',
);

/**
 * React Query hook for fetching categories based on filters
 * @param params CategoryFilters
 * @returns categories list
 */
export const useCategoryQuery = (params?: CategoryFilters) => {
  return useQuery({
    queryKey: params ? categoryKeys.list(params) : categoryKeys.lists(),
    queryFn: () => getCategoryFn(params),
    staleTime: Infinity, // longer stale time since static data
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

/**
 * React Query mutation hook for creating a new category
 * @param options  UseMutationOptions<Category, Error, CreateCategoryForm>
 * @returns created category object
 */
export const useCreateCategoryMutation = (
  options?: UseMutationOptions<Category, Error, CreateCategoryForm>,
) =>
  useMutation({
    mutationFn: createCategoryFn,
    ...options,
  });
