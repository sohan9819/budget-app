import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { toast } from 'sonner';

import Navbar from '@/components/navbar';
import { AuthProvider } from '@/components/providers/auth-provider';
import { auth } from '@/lib/auth';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    toast.error('You must be logged in to access the dashboard.');
    redirect('/signin');
  }
  return (
    <AuthProvider session={session.session} user={session.user}>
      <div className='relative flex h-screen w-full flex-col'>
        <Navbar />
        <div className='w-full max-w-sm'>{children}</div>
      </div>
    </AuthProvider>
  );
}
