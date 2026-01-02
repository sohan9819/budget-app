'use server';

import { asc, eq } from 'drizzle-orm';

import { dalDbOperation, dalRequireAuth } from '@/dal/helpers';
import { db } from '@/db/drizzle';
import { monthHistory } from '@/db/schema';

import { fillMissingYears } from '../helper';

export const getHistoryPeriods = async () =>
  dalRequireAuth((user) =>
    dalDbOperation(async () => {
      const years = (
        await db
          .selectDistinctOn([monthHistory.year], { year: monthHistory.year })
          .from(monthHistory)
          .where(eq(monthHistory.userId, user.id))
          .orderBy(asc(monthHistory.year))
      ).map((r) => r.year);

      return fillMissingYears(years);
    }),
  );
