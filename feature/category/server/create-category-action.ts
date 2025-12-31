'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/db/drizzle';
import { category } from '@/db/schema';
import { auth } from '@/feature/auth/lib/auth';
import { CreateCategoryForm } from '@/feature/category/schema';

export async function createCategory(categoryFormData: CreateCategoryForm) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  const { user } = session;

  const [newCategory] = await db
    .insert(category)
    .values({
      ...categoryFormData,
      userId: user.id,
    })
    .returning();

  return newCategory;
}
