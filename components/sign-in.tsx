'use client';

import { z } from 'zod';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { googleSignIn, githubSignIn } from '@/lib/auth-client';

import { signIn } from '@/server/user';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    await signIn(email, password)
      .then(() => {
        toast.success('Logged in successfully!');
      })
      .catch((error) => {
        toast.error('Failed to login. Please check your credentials.', {
          description: 'If you do not have an account, please sign up first.',
        });
        // console.log('Error : ', error); // TODO: Remove this log in production
      });
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-6'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='snicker@example.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex flex-col gap-3'>
                  <Button
                    type='submit'
                    className='w-full flex items-center justify-center'
                    disabled={isSubmitting}>
                    Login
                    {isSubmitting && <Loader className='animate-spin' />}
                  </Button>
                </div>
              </div>
              <div className='mt-5 flex items-center justify-center gap-3'>
                <Button
                  variant='outline'
                  className='flex-1'
                  type='button'
                  onClick={googleSignIn}>
                  Login with Google
                </Button>
                <Button
                  variant='outline'
                  className='flex-1'
                  type='button'
                  onClick={githubSignIn}>
                  Login with Github
                </Button>
              </div>
              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link href='/sign-up' className='underline underline-offset-4'>
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
