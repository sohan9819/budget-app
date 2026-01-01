'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { asc, eq } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { monthHistory } from '@/db/schema';
import { auth } from '@/feature/auth/lib/auth';

import { fillMissingYears } from '../helper';

export const getHistoryPeriods = async (): Promise<number[]> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  const years = (
    await db
      .selectDistinctOn([monthHistory.year], { year: monthHistory.year })
      .from(monthHistory)
      .where(eq(monthHistory.userId, session.user.id))
      .orderBy(asc(monthHistory.year))
  ).map((r) => r.year);

  return fillMissingYears(years);
};
