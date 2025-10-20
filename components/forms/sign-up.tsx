'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { PasswordInput } from '@/components/password-input';
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
import { Spinner } from '@/components/ui/spinner';
import { VerifyEmail } from '@/components/verify-email';
import { googleSignIn, githubSignIn } from '@/lib/auth-client';
import { signUp } from '@/lib/auth-client';
import { cn, getErrorMessage } from '@/lib/utils';

const formSchema = z
  .object({
    name: z.string().min(4, 'Name must be at least 4 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [verifyEmail, setVerifyEmail] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    await signUp
      .email(
        {
          name,
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.success('Account created successfully!', {
              description:
                'Please check your mail to verify your email address',
            });
            setVerifyEmail(true);
          },
          onError: () => {
            toast.error('Failed to create account', {
              description:
                'If you already have an account, please sign in instead.',
              action: {
                label: 'Retry',
                onClick: () => {
                  onSubmit(values);
                },
              },
            });
          },
        },
      )
      .catch((error) => {
        toast.error('Failed to create account', {
          description: getErrorMessage(error),
          action: {
            label: 'Retry',
            onClick: () => {
              onSubmit(values);
            },
          },
        });
      });
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {verifyEmail ? (
        <VerifyEmail email={form.watch('email')} name={form.watch('name')} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Enter your email below to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-6'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder='snicker' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='confirm password'
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
                      Create Account
                      {isSubmitting && <Spinner />}
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
                  Already have an account?{' '}
                  <Link
                    href='/sign-in'
                    className='underline underline-offset-4'>
                    Sign in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
