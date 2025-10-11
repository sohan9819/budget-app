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

type VerificationEmailProps = {
  name: string;
  verificationLink: string;
};

export default function VerificationEmail({
  name,
  verificationLink,
}: VerificationEmailProps) {
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
              <Link href={verificationLink}>
                Click here to verify your email
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
