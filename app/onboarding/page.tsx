import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { toast } from 'sonner';

import { CurrencyComboBox } from '@/components/currency-combo-box';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/auth';

export default async function WizardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session || !session?.user) {
    toast.error('You must be logged in to access the dashboard.');
    redirect('/signin');
  }

  return (
    <div className='container flex max-w-2xl flex-col items-center justify-between gap-4 px-2'>
      <div>
        <h1 className='text-center text-3xl'>
          Welcome ,{' '}
          <span className='ml-2 font-bold'>{session.user.name}! 👋</span>
        </h1>
        <h2 className='mt-4 text-center text-base text-muted-foreground'>
          Let&apos;s get started by setting up your currency
        </h2>
        <h3 className='mt-2 text-center text-sm text-muted-foreground'>
          You can change these settings at any time
        </h3>
      </div>
      <Separator />
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set your default currency for transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Separator />
      <Button className='w-full'>
        <Link href='/' className='w-full'>
          I&apos;m done! Take me to the dashboard
        </Link>
      </Button>
      <div className='mt-8'>
        <Logo />
      </div>
    </div>
  );
}
