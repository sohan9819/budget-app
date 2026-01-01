import { Logo } from '@/components/logo';
import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className='relative flex flex-col h-screen w-full justify-center items-center'>
      <Logo className='animate-pulse' />
      <Spinner className='mt-2' />
    </div>
  );
}
