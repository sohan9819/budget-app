'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { asc, eq } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { monthHistory } from '@/db/schema';
import { auth } from '@/feature/auth/lib/auth';

export const getHistoryPeriods = async () => {
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

  if (years.length === 0) {
    // Return the current year
    return [new Date().getFullYear()];
  }

  return years;
};
