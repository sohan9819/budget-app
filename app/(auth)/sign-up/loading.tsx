import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Skeleton className='flex flex-col space-y-3 items-center mt-2 border border-solid p-2 w-max mx-auto rounded-md'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[200px] bg-foreground/10' />
        <Skeleton className='h-4 w-[250px] bg-foreground/10' />
      </div>
      <div className='w-full flex flex-col flex-nowrap gap-1'>
        <Skeleton className='h-4 w-[120px] bg-foreground/10' />
        <Skeleton className='h-6 w-11/12 bg-foreground/10' />
      </div>
      <div className='w-full flex flex-col flex-nowrap gap-1'>
        <Skeleton className='h-4 w-[120px] bg-foreground/10' />
        <div className='flex flex-nowrap flex-row gap-1'>
          <Skeleton className='h-6 w-11/12 bg-foreground/10' />
          <Skeleton className='h-6 min-w-6 bg-foreground/10' />
        </div>
        <Skeleton className='h-2 w-[60px] ml-auto bg-foreground/10' />
      </div>
      <div className='w-full flex flex-row flex-nowrap gap-1 items-center'>
        <Skeleton className='h-6 w-6 bg-foreground/10' />
        <Skeleton className='h-4 w-1/2 bg-foreground/10' />
      </div>
      <div className='space-y-2 flex flex-col items-center'>
        <Skeleton className='h-8 w-[250px] bg-foreground/10' />
        <div className='flex justify-center gap-2 w-full'>
          <Skeleton className='h-8 w-full bg-foreground/10' />
          <Skeleton className='h-8 w-full bg-foreground/10' />
        </div>
        <Skeleton className='h-2 w-[200px] bg-foreground/10' />
      </div>
    </Skeleton>
  );
}
