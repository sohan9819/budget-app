'use client';

import React from 'react';

import { useAtomValue } from 'jotai';

import { authUserAtom } from '@/atoms/authAtom';

export const Test = () => {
  const user = useAtomValue(authUserAtom);

  return <div> Welcome, {user?.name}</div>;
};
