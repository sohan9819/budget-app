'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { eq } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { user_settings } from '@/db/schema';
import { auth } from '@/feature/auth/lib/auth';
import type { UserSettings } from '@/feature/user-settings/schema';

/**
 * Server-side function to fetch user settings
 * Use this in server components to get user settings
 */
export async function getUserSettings(): Promise<UserSettings> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/sign-in');
  }

  let [userSettings] = await db
    .select()
    .from(user_settings)
    .where(eq(user_settings.userId, session.user.id));

  if (!userSettings) {
    const insertedUserSettings = await db
      .insert(user_settings)
      .values({ userId: session.user.id })
      .returning();

    [userSettings] = insertedUserSettings;
  }

  return userSettings;
}
