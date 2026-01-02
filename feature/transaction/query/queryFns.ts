'use client';

import { dalToQueryFn } from '@/dal/helpers';
import { DalError } from '@/dal/types';
import { createTransaction } from '@/feature/transaction/server';

import { CreateTransactionForm, Transaction } from '../schema';

export const createTransactionFn = dalToQueryFn<
  CreateTransactionForm,
  Transaction,
  DalError
>(createTransaction);
