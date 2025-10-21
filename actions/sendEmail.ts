import React from 'react';

import { Resend } from 'resend';

import { VerificationEmail, ResetPassword, DeleteAccount } from '@/email';
import type {
  VerificationEmailParams,
  ResetPasswordParams,
  DeleteAccountParams,
} from '@/email';
import { getErrorMessage } from '@/lib/utils';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplates = {
  verification: {
    subject: 'Verify your email address',
    render: ({ name, verificationLink }: VerificationEmailParams) =>
      React.createElement(VerificationEmail, { name, verificationLink }),
  },
  passwordReset: {
    subject: 'Reset your password',
    render: ({ name, email, resetUrl }: ResetPasswordParams) =>
      React.createElement(ResetPassword, { name, email, resetUrl }),
  },
  deleteAccount: {
    subject: 'Confirm your account deletion',
    render: ({ name, deleteAccountLink }: DeleteAccountParams) =>
      React.createElement(DeleteAccount, {
        name,
        deleteAccountLink,
      }),
  },
};

type EmailTemplates = typeof emailTemplates;
type TemplateKey = keyof EmailTemplates;
type TemplateParams<K extends TemplateKey> = Parameters<
  EmailTemplates[K]['render']
>[0];

export async function sendEmail<T extends TemplateKey>(
  type: T,
  to: string,
  params: TemplateParams<T>,
): Promise<{ data?: unknown; error?: string }> {
  try {
    const template = emailTemplates[type];
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM ?? 'Budget App <onboarding@resend.dev>',
      to,
      subject: template.subject,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      react: template.render(params as any),
    });
    return { data };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
