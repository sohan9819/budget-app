'use server';

import { eq } from 'drizzle-orm';

import { dalRequireAuth, dalDbOperation } from '@/dal/helpers';
import { db } from '@/db/drizzle';
import { user_settings } from '@/db/schema';

// Example using DAL

export const getUserSettings = async () => {
  return dalRequireAuth((user) =>
    dalDbOperation(async () => {
      const [userSettings] = await db
        .select()
        .from(user_settings)
        .where(eq(user_settings.userId, user.id));
      return userSettings;
    }),
  );
};
