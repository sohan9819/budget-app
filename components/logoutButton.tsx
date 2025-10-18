'use client';

import React from 'react';
import { signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export function LogoutButton() {
  return (
    <Button
      variant={'outline'}
      onClick={() => {
        signOut().then(() => {
          redirect('/sign-in');
        });
      }}>
      LogoutButton
    </Button>
  );
}
