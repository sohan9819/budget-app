import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { toast } from 'sonner';

import { LogoutButton } from '@/components/buttons/logout-button';
import { AuthProvider } from '@/components/providers/auth-provider';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    toast.error('You must be logged in to access the dashboard.');
    redirect('/signin');
  }

  return (
    <AuthProvider session={session.session} user={session.user}>
      <h1>Welcome {session.user.name}</h1>
      <LogoutButton />
    </AuthProvider>
  );
}
