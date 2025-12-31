'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { and, eq, gte, lte, sum } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { transaction } from '@/db/schema';
import { auth } from '@/feature/auth/lib/auth';
import { DateRange } from '@/feature/stats/schema';

export async function getBalanceStats(dateRangeParam: DateRange) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  const totals = await db
    .select({
      totalAmount: sum(transaction.amount).mapWith(Number),
      type: transaction.type,
    })
    .from(transaction)
    .where(
      and(
        eq(transaction.userId, session.user.id),
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
}

// export type GetBalanceStatsResponseType = Awaited<
//   ReturnType<typeof getBalanceStats>
// >;

// async function getBalanceStats(userId: string, from: Date, to: Date) {
//   const totals = await db
//     .select({
//       totalAmount: sum(transaction.amount).mapWith(Number),
//       type: transaction.type,
//     })
//     .from(transaction)
//     .where(
//       and(
//         eq(transaction.userId, userId),
//         gte(transaction.date, from),
//         lte(transaction.date, to),
//       ),
//     )
//     .groupBy(transaction.type);

//   return {
//     expense: totals.find((t) => t.type === 'expense')?.totalAmount || 0,
//     income: totals.find((t) => t.type === 'income')?.totalAmount || 0,
//   };
// }
