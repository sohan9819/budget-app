import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

/**
 * API route to fetch session for client-side React Query
 */
export async function GET() {
  try {
    const sessionData = await auth.api.getSession({
      headers: await headers(),
    });

    return Response.json({
      session: sessionData?.session ?? null,
      user: sessionData?.user ?? null,
    });
  } catch (error) {
    console.error('Session API error:', error);
    return Response.json(
      {
        session: null,
        user: null,
        error: 'Failed to fetch session',
      },
      { status: 500 },
    );
  }
}
