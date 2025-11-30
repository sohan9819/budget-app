import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

import { transaction } from '@/db/schema';
import { TRANSACTION_TYPES } from '@/types';

const Transaction = createSelectSchema(transaction);
export type Transaction = z.infer<typeof Transaction>;

export const CreateTransactionSchema = createInsertSchema(transaction, {
  description: z.string().optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;

export const UpdateTransaction = createUpdateSchema(transaction);
export type UpdateTransaction = z.infer<typeof UpdateTransaction>;

// Form Schemas

export const CreateTransactionFormSchema = CreateTransactionSchema.extend({
  amount: z
    .transform(Number)
    .pipe(
      z
        .number()
        .positive('Please enter some valid amount')
        .multipleOf(0.01)
        .min(0.01, 'Please enter some valid amount'),
    ),
  type: z.enum(TRANSACTION_TYPES),
  categoryId: z.uuid('Category Icon is Required'),
  date: z.date('Please select a valid date'),
}).omit({
  userId: true,
});
export type CreateTransactionForm = z.infer<typeof CreateTransactionFormSchema>;
