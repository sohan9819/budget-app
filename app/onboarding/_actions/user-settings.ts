'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { eq } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { user_settings } from '@/db/schema';
import { auth } from '@/lib/auth';
import { UpdateUserSettings } from '@/schema';

export async function UpdateUserCurrency(currency: string) {
  const parsedBody = UpdateUserSettings.safeParse({ currency });
  if (parsedBody.error) {
    throw parsedBody.error;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  const { user } = session;

  const userSettings = await db
    .update(user_settings)
    .set(parsedBody.data)
    .where(eq(user_settings.userId, user.id))
    .returning({ updatedUserSettings: user_settings });

  return userSettings;
}
