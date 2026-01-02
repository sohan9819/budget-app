'use server';

import { eq } from 'drizzle-orm';

import { dalDbOperation, dalRequireAuth } from '@/dal/helpers';
import { db } from '@/db/drizzle';
import { user_settings } from '@/db/schema';
import { CurrencyCode } from '@/feature/user-settings/lib/currencies';

export const updateUserCurrency = async (currency: CurrencyCode) => {
  return dalRequireAuth((user) =>
    dalDbOperation(async () => {
      const [userSettings] = await db
        .update(user_settings)
        .set({ currency })
        .where(eq(user_settings.userId, user.id))
        .returning();
      return userSettings;
    }),
  );
};
