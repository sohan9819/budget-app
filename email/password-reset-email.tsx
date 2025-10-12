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
  Link,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

type ResetPasswordProps = {
  email: string;
  resetUrl: string;
};

export default function PasswordResetEmail({
  email,
  resetUrl,
}: ResetPasswordProps) {
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
                Hi there {email}, we received a request to reset your password.
                Click the link below to reset it.
              </Text>
              <Hr />
              <Link href={resetUrl}>Click here to reset your password</Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
