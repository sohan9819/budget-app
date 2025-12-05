import { useQueryClient } from '@tanstack/react-query';

import {
  transactionKeys,
  type TransactionFilters,
} from '@/feature/transaction/query';

export const useTransactionUtils = () => {
  const queryClient = useQueryClient();

  const invalidateAllTransaction = async () => {
    await queryClient.invalidateQueries({ queryKey: transactionKeys.all });
  };
  const invalidateListsTransaction = async () => {
    await queryClient.invalidateQueries({
      queryKey: transactionKeys.lists(),
    });
  };
  const invalidateFilterTransaction = async (filter: TransactionFilters) => {
    await queryClient.invalidateQueries({
      queryKey: transactionKeys.list(filter),
    });
  };

  const invalidateDetailTransaction = async (id: string) => {
    await queryClient.invalidateQueries({
      queryKey: transactionKeys.detail(id),
    });
  };

  const refetchTransaction = async () => {
    await queryClient.refetchQueries({ queryKey: transactionKeys.all });
  };

  return {
    invalidateAllTransaction,
    invalidateListsTransaction,
    invalidateFilterTransaction,
    invalidateDetailTransaction,
    refetchTransaction,
  };
};
