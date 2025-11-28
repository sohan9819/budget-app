import { TransactionType } from '@/types';

// import { createQueryKeys } from './_factory';

// export const categoryKeys = createQueryKeys('category');

export type CategoryFilters = {
  type: TransactionType;
};

export const categoryKeys = {
  all: ['category'] as const,
  lists: () => ['category', 'list'] as const,
  list: (filters: CategoryFilters) =>
    ['category', 'list', { filters }] as const,
  detail: (id: string) => ['category', 'detail', id] as const,
};
