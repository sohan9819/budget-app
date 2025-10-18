import { headers } from 'next/headers';

import { LogoutButton } from '@/components/logoutButton';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <h1>Welcome {session?.user.name}</h1>
      <LogoutButton />
    </div>
  );
}
