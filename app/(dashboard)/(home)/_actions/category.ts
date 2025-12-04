'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/db/drizzle';
import { category } from '@/db/schema';
import { auth } from '@/features/auth/lib/auth';
import { type CreateCategory, CreateCategorySchema } from '@/schema';

export async function CreateCategory(categoryData: CreateCategory) {
  const parsedBody = CreateCategorySchema.safeParse(categoryData);

  if (parsedBody.error) {
    throw parsedBody.error;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  const { user } = session;

  const newCategory = { ...parsedBody.data, userId: user.id };

  return await db.insert(category).values(newCategory).returning();
}
