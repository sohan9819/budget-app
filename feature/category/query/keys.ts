import { CategoryFilters } from '@/feature/category/types';
import { createQueryKeys } from '@/lib/create-query-keys';

export const categoryKeys = createQueryKeys<'category', CategoryFilters>(
  'category',
);
