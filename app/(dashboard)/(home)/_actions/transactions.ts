'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { sql } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { monthHistory, transaction, yearHistory } from '@/db/schema';
import { auth } from '@/lib/auth';
import { CreateTransactionSchema } from '@/schema';
import type { CreateTransaction, CreateTransactionForm } from '@/schema';

export async function CreateTransaction(
  transactionFormData: CreateTransactionForm,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  const { user } = session;

  const { data: newTransaction, error: newTransactionError } =
    CreateTransactionSchema.safeParse({
      ...transactionFormData,
      userId: user.id,
    });

  if (newTransactionError) {
    throw newTransactionError;
  }

  const day = newTransaction.date.getUTCDate();
  const month = newTransaction.date.getUTCMonth();
  const year = newTransaction.date.getUTCFullYear();

  const income = newTransaction.type === 'income' ? newTransaction.amount : 0;
  const expense = newTransaction.type === 'expense' ? newTransaction.amount : 0;

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
}
