import {
  pgTable,
  text,
  timestamp,
  boolean,
  unique,
  uuid,
  doublePrecision,
  date,
  integer,
  primaryKey,
  pgEnum,
} from 'drizzle-orm/pg-core';

import { CurrencyValues } from '@/lib/currencies';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const currencyEnum = pgEnum('currency_enum', CurrencyValues);

export const user_settings = pgTable('user_settings', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  currency: currencyEnum('currency').notNull().default('INR'),
});

export const category = pgTable(
  'category',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    icon: text('icon').notNull(),
    type: text('type').default('expense'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [unique('unique_category').on(t.name, t.userId, t.type)],
);

export const transaction = pgTable('transaction', {
  id: uuid().defaultRandom().primaryKey(),
  amount: doublePrecision('amount').notNull(),
  description: text('description'),
  date: date(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => category.id, { onDelete: 'restrict' }),
  type: text().default('expense'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

const monthHistory = pgTable(
  'month_history',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    day: integer('day').notNull(),
    month: integer('month').notNull(),
    year: integer('year').notNull(),
    income: doublePrecision('income').notNull(),
    expense: doublePrecision('expense').notNull(),
  },
  (t) => [
    primaryKey({
      name: 'unique_month_history',
      columns: [t.day, t.month, t.year, t.userId],
    }),
  ],
);

const yearHistory = pgTable(
  'year_history',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    month: integer('month').notNull(),
    year: integer('year').notNull(),
    income: doublePrecision('income').notNull(),
    expense: doublePrecision('expense').notNull(),
  },
  (t) => [
    primaryKey({
      name: 'unique_year_history',
      columns: [t.month, t.year, t.userId],
    }),
  ],
);

export const schema = {
  user,
  session,
  account,
  verification,
  currencyEnum,
  user_settings,
  category,
  transaction,
  monthHistory,
  yearHistory,
};
