import React from 'react';

import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

export type ResetPasswordParams = {
  name?: string;
  email: string;
  resetUrl: string;
};

export default function ResetPassword({
  name,
  email,
  resetUrl,
}: ResetPasswordParams) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Password - Action required</Preview>
      <Tailwind>
        <Body className='bg-gray-100 text-black'>
          <Container>
            <Section className='bg-white borderBlack my-10 px-10 py-4 rounded-md'>
              <Heading className='leading-tight'>Reset your Password</Heading>
              <Text>
                <p>Hi {name || 'there'},</p>
                <p>
                  We received a request to reset the password for your account
                  associated with {email} . Click the link below to reset it.
                </p>
              </Text>
              <Hr />
              <Button
                href={resetUrl}
                className='bg-blue-500 text-white py-2 px-4 rounded-md'>
                Reset Password
              </Button>
              <Text className='text-sm'>
                <p>
                  If the button doesn&apos;t work, copy and paste the following
                  link into your browser
                </p>
                {resetUrl}
              </Text>
              <Hr />
              <Text className='mt-4 text-sm'>
                If you didn&apos;t request a password reset, please ignore this
                email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
