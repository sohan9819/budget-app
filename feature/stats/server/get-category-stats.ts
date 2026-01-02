'use server';

import { and, desc, eq, gte, lte, sum } from 'drizzle-orm';

import { dalDbOperation, dalRequireAuth } from '@/dal/helpers';
import { db } from '@/db/drizzle';
import { category, transaction } from '@/db/schema';
import { DateRange } from '@/feature/stats/schema';

// ---------------------- DAL Function -----------------------

export type CategoryStatsData = Awaited<
  ReturnType<typeof getCategoryStatsFromDB>
>;

export const getCategoryStats = async (dateRange: DateRange) =>
  dalRequireAuth((user) =>
    dalDbOperation(
      async () => await getCategoryStatsFromDB(user.id, dateRange),
    ),
  );

const getCategoryStatsFromDB = async (userId: string, dateRange: DateRange) =>
  await db
    .select({
      totalAmount: sum(transaction.amount).mapWith(Number),
      type: transaction.type,
      category,
    })
    .from(transaction)
    .innerJoin(category, eq(transaction.categoryId, category.id))
    .where(
      and(
        eq(transaction.userId, userId),
        gte(transaction.date, dateRange.from),
        lte(transaction.date, dateRange.to),
      ),
    )
    .groupBy(transaction.type, category.id)
    .orderBy(desc(sum(transaction.amount)));

// ---------------------------------------------------------------
