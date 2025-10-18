import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/drizzle'; // your drizzle instance
import { nextCookies } from 'better-auth/next-js';
import { schema } from '@/db/schema';
import { sendEmail } from '@/actions/sendEmail';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url: resetUrl }) => {
      console.log('Sending password reset email to : ', user);
      await sendEmail('passwordReset', user.email, {
        name: user.name,
        email: user.email,
        resetUrl,
      });
    },
    // onPasswordReset: async ({ user }) => {
    //   console.log(`Password for user ${user.email} has been reset.`);
    // },
  },
  emailVerification: {
    enabled: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url: verificationLink }) => {
      await sendEmail('verification', user.email, {
        name: user.name,
        verificationLink,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  plugins: [nextCookies()],
});
