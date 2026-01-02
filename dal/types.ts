import { DrizzleQueryError } from 'drizzle-orm';

export type DalReturn<T, E extends DalError = DalError> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
    };

export type DalError =
  | {
      type: 'no-user';
    }
  | {
      type: 'no-access';
    }
  | {
      type: 'invalid-params';
      reason?: string;
    }
  | {
      type: 'not-found';
      entity?: string;
    }
  | {
      type: 'conflict';
      reason?: string;
    }
  | {
      type: 'drizzle-error';
      error: DrizzleQueryError;
    }
  | {
      type: 'timeout';
    }
  | {
      type: 'unknown-error';
      error: unknown;
    };

export const DAL_ERROR_META = {
  'no-user': {
    message: 'Please log in to continue.',
    devMessage: 'User session not found.',
    code: 'DAL_NO_USER',
    status: 401,
  },

  'no-access': {
    message: 'You do not have permission to perform this action.',
    devMessage: 'User lacks required access.',
    code: 'DAL_NO_ACCESS',
    status: 403,
  },

  'invalid-params': {
    message: 'Some inputs are invalid.',
    devMessage: 'Invalid parameters passed to DAL.',
    code: 'DAL_INVALID_PARAMS',
    status: 400,
  },

  'not-found': {
    message: 'The requested item could not be found.',
    devMessage: 'Requested entity does not exist.',
    code: 'DAL_NOT_FOUND',
    status: 404,
  },

  conflict: {
    message: 'This action conflicts with existing data.',
    devMessage: 'Uniqueness or state conflict detected.',
    code: 'DAL_CONFLICT',
    status: 409,
  },

  'drizzle-error': {
    message: 'Something went wrong while saving your data.',
    devMessage: 'Database query failed.',
    code: 'DAL_DB_ERROR',
    status: 500,
  },

  timeout: {
    message: 'The request took too long. Please try again.',
    devMessage: 'Operation timed out.',
    code: 'DAL_TIMEOUT',
    status: 504,
  },

  'unknown-error': {
    message: 'Something went wrong. Please try again.',
    devMessage: 'Unhandled error.',
    code: 'DAL_UNKNOWN',
    status: 500,
  },
} as const;

export class ThrowableDalError extends Error {
  dalError: DalError;

  constructor(dalError: DalError) {
    super('ThrowableDalError');
    this.dalError = dalError;
  }
}

export function createSuccessReturn<T>(data: T): DalReturn<T> {
  return { success: true, data };
}

export function createErrorReturn<E extends DalError>(
  error: E,
): DalReturn<never, E> {
  return { success: false, error };
}

/**
 * Custom error class for React Query compatibility
 * This error wraps DAL errors so they can be properly caught by React Query
 */
export class DalQueryError extends Error {
  readonly type: DalError['type'];
  readonly code: string;
  readonly status: number;
  readonly cause?: unknown;
  readonly devMessage?: string;

  constructor(dalError: DalError) {
    const meta = DAL_ERROR_META[dalError.type];

    const message = (() => {
      switch (dalError.type) {
        case 'invalid-params':
          return dalError.reason
            ? `${meta.message} (${dalError.reason})`
            : meta.message;

        case 'not-found':
          return dalError.entity
            ? `${meta.message} (${dalError.entity})`
            : meta.message;

        case 'conflict':
          return dalError.reason
            ? `${meta.message} (${dalError.reason})`
            : meta.message;

        default:
          return meta.message;
      }
    })();

    super(message);

    this.name = 'DalQueryError';
    this.type = dalError.type;
    this.code = meta.code;
    this.status = meta.status;
    this.devMessage = meta.devMessage;

    if ('error' in dalError) {
      this.cause = dalError.error;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DalQueryError);
    }
  }
}
