// atoms/sessionAtom.ts
'use client';

import { atom } from 'jotai';

import type { Session, User } from 'better-auth'; // optional type if you want TS safety

// Basic atom to hold user session data
export const authSessionAtom = atom<Session | null>(null);
export const authUserAtom = atom<User | null>(null);

// Derived atom to check if user is authenticated
export const sessionStatusAtom = atom((get) => {
  const session = get(authSessionAtom);
  return session !== null;
});
