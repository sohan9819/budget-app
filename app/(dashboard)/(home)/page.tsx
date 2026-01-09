import { Button } from '@/components/ui/button';
import { getAuthSession } from '@/feature/auth/server/auth';
import { History } from '@/feature/stats/components/history';
import { Overview } from '@/feature/stats/components/overview';
import { CreatTransactionDialog } from '@/feature/transaction/components/create-transaction-dialog';

export default async function DashboardPage() {
  const { user } = await getAuthSession();

  return (
    <div className='h-full bg-background'>
      <div className='border-b bg-card'>
        <div className='container flex flex-wrap items-center justify-between px-6 py-8 mx-auto gap-4'>
          <p className='text-3xl font-bold'>Hello, {user?.name}! 👋 </p>
          <div className='flex items-center gap-3'>
            <CreatTransactionDialog type={'income'}>
              <Button variant={'outline'} className='!border-emerald-500 '>
                New income 🤑
              </Button>
            </CreatTransactionDialog>
            <CreatTransactionDialog type={'expense'}>
              <Button variant={'destructive'}>New expense 😤</Button>
            </CreatTransactionDialog>
          </div>
        </div>
      </div>
      <Overview />
      <History />
    </div>
  );
}
