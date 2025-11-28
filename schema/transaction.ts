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

export const CreteTransactionSchema = createInsertSchema(transaction, {
  userId: z.uuid(),
  description: z.string().optional(),
  amount: z.number().positive().multipleOf(0.01),
  type: z.enum(TRANSACTION_TYPES),
  date: z.date(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateTransaction = z.infer<typeof CreteTransactionSchema>;

export const UpdateTransaction = createUpdateSchema(transaction);
export type UpdateTransaction = z.infer<typeof UpdateTransaction>;
