'use client';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { resendVerificationEmail } from '@/helper';

interface VerifyEmailProps {
  email: string;
  name: string;
}

export function VerifyEmail({ email, name }: VerifyEmailProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hi {name}, Please Verify Your Email</CardTitle>
        <CardDescription>
          Check your inbox for a verification link to verify your email. 📧
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant='outline'
          type='button'
          onClick={() => resendVerificationEmail(email)}>
          Resend Verification Email
        </Button>
        <Button variant='link' className='mt-2'>
          <Link href='/sign-in' className='flex items-center'>
            Go to Sign In <ArrowRight className='ml-2' />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
