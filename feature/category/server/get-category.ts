'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { and, asc, eq } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { category } from '@/db/schema';
import { auth } from '@/feature/auth/lib/auth';
import { CategoryFilters } from '@/feature/category/query';

export async function getCategory(filters?: CategoryFilters) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  return await db
    .select()
    .from(category)
    .where(
      and(
        eq(category.userId, session.user.id),
        filters?.type ? eq(category.type, filters.type) : undefined,
      ),
    )
    .orderBy(asc(category.name));
}
