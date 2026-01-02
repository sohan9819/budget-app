'use server';

import { sql } from 'drizzle-orm';

import { dalDbOperation, dalRequireAuth } from '@/dal/helpers';
import { db } from '@/db/drizzle';
import { monthHistory, transaction, yearHistory } from '@/db/schema';
import {
  CreateTransaction,
  CreateTransactionForm,
} from '@/feature/transaction/schema';

export const createTransaction = async (
  transactionFormData: CreateTransactionForm,
) =>
  dalRequireAuth((user) =>
    dalDbOperation(async () => {
      const newTransaction: CreateTransaction = {
        ...transactionFormData,
        userId: user.id,
      };
      const day = newTransaction.date.getDate();
      const month = newTransaction.date.getMonth();
      const year = newTransaction.date.getFullYear();

      const income =
        newTransaction.type === 'income' ? newTransaction.amount : 0;
      const expense =
        newTransaction.type === 'expense' ? newTransaction.amount : 0;

      return db.transaction(async (tx) => {
        // Insert the transaction
        const [createdTransaction] = await tx
          .insert(transaction)
          .values(newTransaction)
          .returning();

        // Upsert Month History
        await tx
          .insert(monthHistory)
          .values({
            userId: user.id,
            day,
            month,
            year,
            income,
            expense,
          })
          .onConflictDoUpdate({
            target: [
              monthHistory.day,
              monthHistory.month,
              monthHistory.year,
              monthHistory.userId,
            ],
            set: {
              income: sql`${monthHistory.income} + ${income}`,
              expense: sql`${monthHistory.expense} + ${expense}`,
            },
          });

        // Upsert Year History
        await tx
          .insert(yearHistory)
          .values({
            userId: user.id,
            month,
            year,
            income,
            expense,
          })
          .onConflictDoUpdate({
            target: [yearHistory.month, yearHistory.year, yearHistory.userId],
            set: {
              income: sql`${yearHistory.income} + ${income}`,
              expense: sql`${yearHistory.expense} + ${expense}`,
            },
          });

        return createdTransaction;
      });
    }),
  );
