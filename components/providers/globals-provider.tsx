'use client';

import { useEffect } from 'react';

import { useSetAtom } from 'jotai';
import { toast } from 'sonner';

import { DalQueryError } from '@/dal/types';
import { userSettingsAtom } from '@/feature/user-settings/atoms';
import { useUserSettingsQuery } from '@/feature/user-settings/query';

import ErrorScreen from '../error-screen';
import { Logo } from '../logo';
import { Spinner } from '../ui/spinner';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const setUserSettings = useSetAtom(userSettingsAtom);
  const { data, isLoading, isFetching, isError, error, refetch } =
    useUserSettingsQuery();

  useEffect(() => {
    if (data && !(isLoading || isFetching) && !isError) {
      setUserSettings(data);
    }
    if (!(isLoading || isFetching) && isError) {
      console.log('Error type : ', error instanceof DalQueryError);
      if (error instanceof DalQueryError) {
        console.log(error.code); // analytics
        console.log(error.devMessage); // logs
        console.log(error.cause); // root cause
        console.log(error.type); // root cause
        toast.error('Error fetching user data', {
          description: error.message,
          action: {
            label: 'Try Again',
            onClick: () => refetch(),
          },
        });
      } else {
        // refetch();
        toast.error('Error fetching user data', {
          description: error?.message,
          action: {
            label: 'Try Again',
            onClick: () => refetch(),
          },
        });
        console.log('Error : ', error);
      }
    }
  }, [data, error, isError, isFetching, isLoading, refetch, setUserSettings]);

  return (
    <>
      {isFetching || isLoading ? (
        <div className='relative flex flex-col h-screen w-full justify-center items-center'>
          <Logo className='animate-pulse' />
          <Spinner className='mt-2' />
        </div>
      ) : isError ? (
        <ErrorScreen
          title={'Error fetching user data'}
          description={error?.message}
          action={{
            label: 'Try Again',
            onClick: () => refetch(),
          }}
        />
      ) : (
        children
      )}
    </>
  );
}
