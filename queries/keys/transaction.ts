import { TransactionType } from '@/types';

import { createQueryKeys } from './factory';

export type TransactionFilters = {
  type: TransactionType;
};

export const transactionKeys = createQueryKeys<
  'transaction',
  TransactionFilters
>('transaction');
