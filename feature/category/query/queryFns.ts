import { dalToQueryFn } from '@/dal/helpers';
import { DalError } from '@/dal/types';

import { CategoryFilters } from '.';
import { Category, CreateCategoryForm } from '../schema';
import { createCategory, getCategory } from '../server';

export const getCategoryFn = dalToQueryFn<
  CategoryFilters | undefined,
  Category[],
  DalError
>(getCategory);

export const createCategoryFn = dalToQueryFn<
  CreateCategoryForm,
  Category,
  DalError
>(createCategory);
