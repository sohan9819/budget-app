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
  Button,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

export type VerificationEmailParams = {
  name: string;
  verificationLink: string;
};

export default function VerificationEmail({
  name,
  verificationLink,
}: VerificationEmailParams) {
  return (
    <Html>
      <Head />
      <Preview>Please verify your email</Preview>
      <Tailwind>
        <Body className='bg-gray-100 text-black'>
          <Container>
            <Section className='bg-white borderBlack my-10 px-10 py-4 rounded-md'>
              <Heading className='leading-tight'>
                Please verify your email
              </Heading>
              <Text>
                Thanks {name} for signing up! Before getting started, please
                verify your email address by clicking the link below.
              </Text>
              <Hr />
              <Button
                href={verificationLink}
                className='bg-blue-500 text-white py-2 px-4 rounded-md'>
                Verify Email
              </Button>
              <Text className='text-sm'>
                <p>
                  If the button doesn&apos;t work, copy and paste the following
                  link into your browser
                </p>
                <Link href={verificationLink}>{verificationLink}</Link>
              </Text>
              <Hr />
              <Text className='mt-4 text-sm'>
                If you didn&apos;t request this email, please ignore it.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
