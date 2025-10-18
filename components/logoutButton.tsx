'use client';

import React from 'react';

import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';

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
