import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

import { sendEmail } from '@/actions/sendEmail';
import { db } from '@/db/drizzle';
import { schema } from '@/db/schema';
import { user_settings } from '@/db/schema';

// Better Auth Config Options : https://www.better-auth.com/docs/reference/options
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins:
    process.env.NODE_ENV === 'production'
      ? [process.env.BETTER_AUTH_URL as string]
      : [
          'http://192.168.1.18:3000',
          'http://localhost:3000', // For local development
          // 'myapp://', // For deep linking in mobile apps
        ],
  logger: {
    disabled: false,
    disableColors: false,
    level: 'info',
    log: (level, message, ...args) => {
      // Custom logging implementation
      console.log(`[${level}] ${message}`, ...args);
    },
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 50,
  },
  databaseHooks: {
    user: {
      create: {
        async after(account) {
          await db
            .insert(user_settings)
            .values({ userId: account.id, currency: 'INR' })
            .returning();
        },
      },
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({
        user,
        url: deleteAccountLink,
      }) => {
        console.log('Sending verification to delete user, email to : ', user);
        await sendEmail('deleteAccount', user.email, {
          name: user.name,
          deleteAccountLink,
        });
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    maxPasswordLength: 16,
    sendResetPassword: async ({ user, url: resetUrl }) => {
      console.log('Sending password reset email to : ', user);
      await sendEmail('passwordReset', user.email, {
        name: user.name,
        email: user.email,
        resetUrl,
      });
    },
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
