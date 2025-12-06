import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

import { category } from '@/db/schema';
import { TRANSACTION_TYPES } from '@/feature/transaction/types';

export const Category = createSelectSchema(category);
export type Category = z.infer<typeof Category>;

export const CreateCategorySchema = createInsertSchema(category);
export type CreateCategory = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = createUpdateSchema(category);
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;

// Form Schemas

export const CreateCategoryFormSchema = createInsertSchema(category, {
  type: z.enum(TRANSACTION_TYPES),
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  icon: z.string().min(1, 'Icon is required').max(5, 'Icon is too long'),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
});
export type CreateCategoryForm = z.infer<typeof CreateCategoryFormSchema>;
