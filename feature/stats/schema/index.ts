import { differenceInDays } from 'date-fns';
import z from 'zod';

import { MAX_DATE_RANGE_DAYS } from '../components/overview/constants';

export const DateRangeSchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((args) => {
    const { from, to } = args;
    const days = differenceInDays(to, from);

    const isValidRange = days >= 0 && days <= MAX_DATE_RANGE_DAYS;
    return isValidRange;
  });

export type DateRange = z.infer<typeof DateRangeSchema>;
