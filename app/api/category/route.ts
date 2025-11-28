import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { and, asc, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/db/drizzle';
import { category } from '@/db/schema';
import { auth } from '@/lib/auth';
import { TRANSACTION_TYPES } from '@/types';

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  const { searchParams } = new URL(request.url);
  const paramType = searchParams.get('type');
  console.log('Param : ', paramType);

  const validator = z.enum(TRANSACTION_TYPES).nullable();
  const queryParams = validator.safeParse(paramType);
  if (!queryParams.success) {
    return Response.json(queryParams.error, {
      status: 400,
    });
  }

  const type = queryParams.data;

  const categories = await db
    .select()
    .from(category)
    .where(
      and(
        eq(category.userId, session.user.id),
        type ? eq(category.type, type) : undefined,
      ),
    )
    .orderBy(asc(category.name));

  return Response.json(categories);
}
