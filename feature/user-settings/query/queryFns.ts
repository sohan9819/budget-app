'use client';

import { dalToQueryFn } from '@/dal/helpers';
import { DalError } from '@/dal/types';
import {
  getUserSettings,
  updateUserCurrency,
} from '@/feature/user-settings/server';

import { CurrencyCode } from '../lib/currencies';
import { UserSettings } from '../schema';

export const getUserSettingsQueryFn = dalToQueryFn(getUserSettings);
export const updateUserCurrencyMutationFn = dalToQueryFn<
  CurrencyCode,
  UserSettings,
  DalError
>(updateUserCurrency);
