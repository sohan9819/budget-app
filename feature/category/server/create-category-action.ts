'use server';

import { dalDbOperation, dalRequireAuth } from '@/dal/helpers';
import { db } from '@/db/drizzle';
import { category } from '@/db/schema';
import { CreateCategoryForm } from '@/feature/category/schema';

export const createCategory = async (categoryFormData: CreateCategoryForm) =>
  dalRequireAuth((user) =>
    dalDbOperation(async () => {
      const [newCategory] = await db
        .insert(category)
        .values({
          ...categoryFormData,
          userId: user.id,
        })
        .returning();

      return newCategory;
    }),
  );
