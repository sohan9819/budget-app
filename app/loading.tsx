import React from 'react';

import { Logo } from '@/components/logo';
import { Spinner } from '@/components/ui/spinner';

const Loading = () => {
  return (
    <div className='relative flex flex-col h-screen w-full justify-center items-center'>
      <Logo className='animate-pulse' />
      <Spinner className='mt-2' />
    </div>
  );
};

export default Loading;
