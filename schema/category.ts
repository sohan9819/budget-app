import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

import { category } from '@/db/schema';
import { TRANSACTION_TYPES } from '@/types';

export const Category = createSelectSchema(category);
export type Category = z.infer<typeof Category>;

export const CreateCategorySchema = createInsertSchema(category, {
  type: z.enum(TRANSACTION_TYPES),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
});
export type CreateCategory = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = createUpdateSchema(category);
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
