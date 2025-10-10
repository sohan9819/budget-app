'use server';

import { auth } from '@/lib/auth';
const signIn = async (email: string, password: string) => {
  await auth.api.signInEmail({
    body: {
      email: email,
      password: password,
    },
  });
};

const signUp = async (name: string, email: string, password: string) => {
  await auth.api.signUpEmail({
    body: {
      name: name,
      email: email,
      password: password,
    },
  });
};

export { signIn, signUp };
