import React from 'react';
import { Resend } from 'resend';
import VerificationEmail from '@/email/verification-email';
// import PasswordResetEmail from '@/email/password-reset-email';
import { getErrorMessage } from '@/lib/utils';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (name: string, email: string, url: string) => {
  try {
    const data = await resend.emails.send({
      from: 'Budget App - SignIn <onboarding@resend.dev>',
      to: email,
      subject: 'Message from Budget App',
      react: React.createElement(VerificationEmail, {
        name,
        verificationLink: url,
      }),
    });
    return { data };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
