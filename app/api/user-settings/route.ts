import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { eq } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import { user_settings } from '@/db/schema';
import { auth } from '@/lib/auth';

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    redirect('/signin');
  }

  let userSettings = await db
    .select()
    .from(user_settings)
    .where(eq(user_settings.userId, session.user.id));

  if (userSettings.length === 0) {
    const insertedUserSettings = await db
      .insert(user_settings)
      .values({ userId: session.user.id, currency: 'INR' })
      .returning();

    userSettings = insertedUserSettings;
  }

  // Revalidate the home page that uses the user currency
  revalidatePath('/');

  return Response.json(userSettings);
}
