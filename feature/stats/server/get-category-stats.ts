'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { and, desc, eq, gte, lte, sum } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { category, transaction } from '@/db/schema';
import { auth } from '@/feature/auth/lib/auth';
import { DateRange } from '@/feature/stats/schema';

export type CategoryStatsData = Awaited<ReturnType<typeof getCategoryStats>>;

export async function getCategoryStats(dateRangeParam: DateRange) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  const stats = await db
    .select({
      totalAmount: sum(transaction.amount).mapWith(Number),
      type: transaction.type,
      category,
    })
    .from(transaction)
    .innerJoin(category, eq(transaction.categoryId, category.id))
    .where(
      and(
        eq(transaction.userId, session.user.id),
        gte(transaction.date, dateRangeParam.from),
        lte(transaction.date, dateRangeParam.to),
      ),
    )
    .groupBy(transaction.type, category.id)
    .orderBy(desc(sum(transaction.amount)));

  return stats;
}
