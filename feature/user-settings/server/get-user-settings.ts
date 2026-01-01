'use server';

import { eq } from 'drizzle-orm';

import { dalToQueryFn } from '@/dal/helpers';
import { dalRequireAuth, dalDbOperation } from '@/dal/helpers';
import { DalError, DalReturn } from '@/dal/types';
import { db } from '@/db/drizzle';
import { user_settings } from '@/db/schema';
import type { UserSettings } from '@/feature/user-settings/schema';

export const getUserSettings = async (): Promise<
  DalReturn<UserSettings, DalError>
> => {
  return dalRequireAuth((user) =>
    dalDbOperation(async () => {
      let [userSettings] = await db
        .select()
        .from(user_settings)
        .where(eq(user_settings.userId, user.id));

      if (!userSettings) {
        const insertedUserSettings = await db
          .insert(user_settings)
          .values({ userId: user.id })
          .returning();

        [userSettings] = insertedUserSettings;
      }

      throw new Error('Hello world');

      return userSettings;
    }),
  );
};

export const getUserSettingsQueryFn = dalToQueryFn(getUserSettings);
