'use server';

import { and, eq, gte, lte, sum } from 'drizzle-orm';

import { dalDbOperation, dalRequireAuth } from '@/dal/helpers';
import { db } from '@/db/drizzle';
import { transaction } from '@/db/schema';
import { DateRange } from '@/feature/stats/schema';

// ---------------------- DAL Function -----------------------

export const getBalanceStats = async (dateRangeParam: DateRange) =>
  dalRequireAuth((user) =>
    dalDbOperation(async () => {
      const totals = await db
        .select({
          totalAmount: sum(transaction.amount).mapWith(Number),
          type: transaction.type,
        })
        .from(transaction)
        .where(
          and(
            eq(transaction.userId, user.id),
            gte(transaction.date, dateRangeParam.from),
            lte(transaction.date, dateRangeParam.to),
          ),
        )
        .groupBy(transaction.type);

      const stats = {
        expense: totals.find((t) => t.type === 'expense')?.totalAmount || 0,
        income: totals.find((t) => t.type === 'income')?.totalAmount || 0,
      };

      return stats;
    }),
  );

// ---------------------------------------------------------------
