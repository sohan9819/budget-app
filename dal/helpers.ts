import { redirect } from 'next/navigation';

import { DrizzleQueryError } from 'drizzle-orm';

import {
  createErrorReturn,
  createSuccessReturn,
  DAL_ERROR_META,
  DalError,
  DalQueryError,
  DalReturn,
  ThrowableDalError,
} from '@/dal/types';
import { getAuthSession } from '@/feature/auth/server/auth';

import type { User } from 'better-auth';

export function dalLoginRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === 'no-user') return redirect('/login');

  return dalReturn as DalReturn<T, Exclude<E, { type: 'no-user' }>>;
}

export function dalUnauthorizedRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  redirectPath = '/',
) {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === 'no-access') return redirect(redirectPath);

  return dalReturn as DalReturn<T, Exclude<E, { type: 'no-access' }>>;
}

export function dalThrowError<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) {
  if (dalReturn.success) return dalReturn;

  throw dalReturn.error;
}

export function dalVerifySuccess<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  { unauthorizedRedirectPath }: { unauthorizedRedirectPath?: string } = {},
): T {
  const res = dalThrowError(
    dalUnauthorizedRedirect(
      dalLoginRedirect(dalReturn),
      unauthorizedRedirectPath,
    ),
  );
  return res.data;
}

export async function dalRequireAuth<T, E extends DalError>(
  operation: (user: User) => Promise<DalReturn<T, E>>,
) {
  const { user } = await getAuthSession();

  if (user == null) {
    return createErrorReturn({ type: 'no-user' });
  }

  return operation(user);
}

export async function dalDbOperation<T>(operation: () => Promise<T>) {
  try {
    const data = await operation();
    return createSuccessReturn(data);
  } catch (e) {
    if (e instanceof ThrowableDalError) {
      return createErrorReturn(e.dalError);
    }
    if (e instanceof DrizzleQueryError) {
      return createErrorReturn({ type: 'drizzle-error', error: e });
    }
    return createErrorReturn({ type: 'unknown-error', error: e });
  }
}

export function dalFormatErrorMessage(error: DalError): string {
  const meta = DAL_ERROR_META[error.type];

  switch (error.type) {
    case 'invalid-params':
      return error.reason ? `${meta.message} (${error.reason})` : meta.message;

    case 'not-found':
      return error.entity ? `${meta.message} (${error.entity})` : meta.message;

    case 'conflict':
      return error.reason ? `${meta.message} (${error.reason})` : meta.message;

    default:
      return meta.message;
  }
}

/**
 * Converts a DAL function to a React Query compatible function
 * This function unwraps the DalReturn, throwing an error on failure
 * and returning the data on success, making it compatible with React Query's error handling
 *
 * @example
 * ```ts
 * const queryFn = dalToQueryFn(() => getUserSettingsDal());
 * // Can now be used in React Query:
 * useQuery({ queryFn });
 * ```
 */
export function dalToQueryFn<T, E extends DalError>(
  dalFunction: () => Promise<DalReturn<T, E>>,
): () => Promise<T> {
  return async () => {
    const result = await dalFunction();
    if (result.success) {
      return result.data;
    }
    // Throw the error so React Query can catch it in the error state
    throw new DalQueryError(result.error);
  };
}

// TODO : Can be removed if not used anywhere
/**
 * Converts a DAL function result to a React Query compatible value
 * This is useful when you already have a DalReturn and want to unwrap it
 *
 * @example
 * ```ts
 * const result = await getUserSettingsDal();
 * const data = await dalUnwrap(result); // throws if error, returns data if success
 * ```
 */
export async function dalUnwrap<T, E extends DalError>(
  dalReturn: Promise<DalReturn<T, E>> | DalReturn<T, E>,
): Promise<T> {
  const result = await Promise.resolve(dalReturn);
  if (result.success) {
    return result.data;
  }
  throw new DalQueryError(result.error);
}
