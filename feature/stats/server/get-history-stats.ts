'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { and, asc, eq, sum } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { monthHistory, yearHistory } from '@/db/schema';
import { auth } from '@/feature/auth/lib/auth';

import { fillMissingDays, fillMissingMonths } from '../helper';
import { YearHistoryData, MonthHistoryData, Period, Timeframe } from '../types';

// ---------- Overload Signatures ----------
export async function getHistoryStats(
  timeframe: Timeframe.MONTH,
  { year, month }: Period,
): Promise<MonthHistoryData[]>;

export async function getHistoryStats(
  timeframe: Timeframe.YEAR,
  { year, month }: Period,
): Promise<YearHistoryData[]>;
// ---------- Overload Signatures ----------

export async function getHistoryStats(
  timeframe: Timeframe,
  { year, month }: Period,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  switch (timeframe) {
    case Timeframe.MONTH:
      return await getMonthHistoryData(session.user.id, year, month);
    case Timeframe.YEAR:
      return await getYearHistoryData(session.user.id, year);
    default:
      throw new Error('Invalid timeframe');
  }
}

const getYearHistoryData = async (userId: string, year: number) => {
  const data: YearHistoryData[] = await db
    .select({
      year: yearHistory.year,
      month: yearHistory.month,
      income: sum(yearHistory.income).mapWith(Number),
      expense: sum(yearHistory.expense).mapWith(Number),
    })
    .from(yearHistory)
    .where(and(eq(yearHistory.userId, userId), eq(yearHistory.year, year)))
    .groupBy(yearHistory.month, yearHistory.year)
    .orderBy(asc(yearHistory.month));

  if (!data || data.length === 0) return [];

  const historyStats = fillMissingMonths(data, year);

  return historyStats;
};

const getMonthHistoryData = async (
  userId: string,
  year: number,
  month: number,
) => {
  const data: MonthHistoryData[] = await db
    .select({
      year: monthHistory.year,
      month: monthHistory.month,
      day: monthHistory.day,
      income: sum(monthHistory.income).mapWith(Number),
      expense: sum(monthHistory.expense).mapWith(Number),
    })
    .from(monthHistory)
    .where(
      and(
        eq(monthHistory.userId, userId),
        eq(monthHistory.year, year),
        eq(monthHistory.month, month),
      ),
    )
    .groupBy(monthHistory.day, monthHistory.month, monthHistory.year)
    .orderBy(asc(monthHistory.day));

  if (!data || data.length === 0) return [];

  const historyStats = fillMissingDays(data, year, month);
  return historyStats;
};
