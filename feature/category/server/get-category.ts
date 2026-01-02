'use server';

import { and, asc, eq } from 'drizzle-orm';

import { dalDbOperation, dalRequireAuth } from '@/dal/helpers';
import { db } from '@/db/drizzle';
import { category } from '@/db/schema';
import { CategoryFilters } from '@/feature/category/query';

export const getCategory = async (filters?: CategoryFilters) =>
  dalRequireAuth((user) =>
    dalDbOperation(
      async () =>
        await db
          .select()
          .from(category)
          .where(
            and(
              eq(category.userId, user.id),
              filters?.type ? eq(category.type, filters.type) : undefined,
            ),
          )
          .orderBy(asc(category.name)),
    ),
  );
