import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { DalQueryError } from '@/dal/types';
import {
  CreateTransactionForm,
  Transaction,
} from '@/feature/transaction/schema';
import { TransactionType } from '@/feature/transaction/types';
import { createQueryKeys } from '@/lib/create-query-keys';

import { createTransactionFn } from './queryFns';

export type TransactionFilters = {
  type: TransactionType;
};

export const transactionKeys = createQueryKeys<
  'transaction',
  TransactionFilters
>('transaction');

/**
 * React Query hook for user settings management
 * This custom hook provides a mutation to update the user's currency setting
 */
export const useCreateTransactionMutation = (
  options?: UseMutationOptions<
    Transaction,
    Error | DalQueryError,
    CreateTransactionForm
  >,
) =>
  useMutation({
    mutationFn: createTransactionFn,
    ...options,
  });
