import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

import { user_settings } from '@/db/schema';

export const UserSettings = createSelectSchema(user_settings);
export type UserSettings = z.infer<typeof UserSettings>;

export const InsertUserSettings = createInsertSchema(user_settings);
export type InsertUserSettings = z.infer<typeof InsertUserSettings>;

export const UpdateUserSettings = createUpdateSchema(user_settings);
export type UpdateUserSettings = z.infer<typeof UpdateUserSettings>;
