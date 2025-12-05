import { atom } from 'jotai';

import type { Session, User } from 'better-auth';

export interface AuthState {
  user: User;
  session: Session;
}

export const authAtom = atom<AuthState | null>(null);
export const authUserAtom = atom<User | null>((get) => {
  const auth = get(authAtom);
  return auth?.user || null;
});
export const authSessionAtom = atom<Session | null>((get) => {
  const auth = get(authAtom);
  return auth?.session || null;
});
