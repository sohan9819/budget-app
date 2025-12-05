'use client';

import { useQueryClient } from '@tanstack/react-query';

import { categoryKeys } from '@/feature/category/query';
import { CategoryFilters } from '@/feature/category/query';

/**
 * Utility hook to invalidate and refetch category after mutations
 * Use this after updating category (type, etc.)
 *
 * @example
 * ```tsx
 * const { invalidateCategory } = useCategoryUtils();
 *
 * const handleUpdateCategory = async () => {
 *   await updateCategory({type});
 *   await invalidateCategory();
 * };
 * ```
 */
export function useCategoryUtils() {
  const queryClient = useQueryClient();

  const invalidateCategory = async () => {
    await queryClient.invalidateQueries({ queryKey: categoryKeys.all });
  };

  const invalidateFilterCategory = async (filter: CategoryFilters) => {
    await queryClient.invalidateQueries({
      queryKey: categoryKeys.list(filter),
    });
  };

  const refetchCategory = async () => {
    await queryClient.refetchQueries({ queryKey: categoryKeys.all });
  };

  return {
    invalidateCategory,
    invalidateFilterCategory,
    refetchCategory,
  };
}
