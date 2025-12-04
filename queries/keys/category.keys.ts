import { TransactionType } from '@/types';

import { createQueryKeys } from './factory';

export type CategoryFilters = {
  type: TransactionType;
};

export const categoryKeys = createQueryKeys<'category', CategoryFilters>(
  'category',
);
