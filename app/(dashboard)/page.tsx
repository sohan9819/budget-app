'use client';

import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';

import { authUserAtom } from '@/atoms/authAtom';
import { Spinner } from '@/components/ui/spinner';

export default function DashboardPage() {
  const user = useAtomValue(authUserAtom);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // return a placeholder/skeleton to avoid hydration mismatch
    return <Spinner />;
  }

  return <h1>Welcome {user?.name}</h1>;
}
