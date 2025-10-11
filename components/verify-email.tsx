'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { sendVerificationEmail } from '@/lib/auth-client';

interface VerifyEmailProps {
  email: string;
  name: string;
}

export function VerifyEmail({ email, name }: VerifyEmailProps) {
  const resendVerificationEmail = () => {
    // Logic to resend the verification email
    sendVerificationEmail({
      email,
      callbackURL: '/sign-in',
    });
    console.log('Resend verification email');
  };
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
          onClick={resendVerificationEmail}>
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
