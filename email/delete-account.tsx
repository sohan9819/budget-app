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

export type DeleteAccountParams = {
  name: string;
  deleteAccountLink: string;
};

export default function DeleteAccount({
  name,
  deleteAccountLink,
}: DeleteAccountParams) {
  return (
    // Modify the content below for delete account email
    <Html>
      <Head />
      <Preview>Delete your account</Preview>
      <Tailwind>
        <Body className='bg-gray-100 text-black'>
          <Container>
            <Section className='bg-white borderBlack my-10 px-10 py-4 rounded-md'>
              <Heading className='leading-tight'>
                Please confirm your account deletion
              </Heading>
              <Text>
                We&apos;re sorry to see you go, {name}. If you&apos;re sure you
                want to delete your account, please click the button below.
              </Text>
              <Hr />
              <Button
                href={deleteAccountLink}
                className='bg-blue-500 text-white py-2 px-4 rounded-md'>
                Delete Account
              </Button>
              <Text className='text-sm'>
                <p>
                  If the button doesn&apos;t work, copy and paste the following
                  link into your browser
                </p>
                <Link href={deleteAccountLink}>{deleteAccountLink}</Link>
              </Text>
              <Hr />
              <Text className='mt-4 text-sm'>
                If you didn&apos;t request to delete your account, please ignore
                this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
