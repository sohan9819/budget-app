import React from 'react';

import { Check, X } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import type { LucideProps } from 'lucide-react';

export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4;

export interface PasswordStrengthIndicatorParams {
  strength: PasswordStrengthLevel;
  hasLength: boolean;
  hasLowerAndUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

const strengthStyle = {
  0: null,
  1: 'w-1/4 bg-red-400',
  2: 'w-1/2 bg-gradient-to-r from-red-400 to-orange-400',
  3: 'w-3/4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400',
  4: 'w-full bg-gradient-to-r from-red-400 via-orange-400 via-yellow-400 to-green-400',
} as const;

const strengthLevel = {
  0: null,
  1: 'very weak',
  2: 'weak',
  3: 'good',
  4: 'strong',
} as const;

export const PasswordStrengthIndicator = ({
  strength,
  hasLength,
  hasLowerAndUpper,
  hasNumber,
  hasSpecial,
}: PasswordStrengthIndicatorParams) => {
  return (
    strength > 0 && (
      <div className='flex flex-col'>
        <div className='w-full h-2 bg-foreground/10 rounded-md overflow-hidden'>
          <div className={cn('h-full rounded-md', strengthStyle[strength])} />
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <h5 className='text-sm text-foreground/50 w-max'>
              strength : {strengthLevel[strength]}
            </h5>
          </TooltipTrigger>
          <TooltipContent>
            <div className='flex flex-nowrap flex-row justify-start items-center gap-1 w-full'>
              <PasswordStrengthIndicatorIcon checked={hasLength} />
              <h6>has more than 12 charactes</h6>
            </div>
            <div className='flex flex-nowrap flex-row justify-start items-center gap-1 w-full'>
              <PasswordStrengthIndicatorIcon checked={hasLowerAndUpper} />
              <h6>has both upper and lower lettrs included</h6>
            </div>
            <div className='flex flex-nowrap flex-row justify-start items-center gap-1 w-full'>
              <PasswordStrengthIndicatorIcon checked={hasNumber} />
              <h6>has numbers included</h6>
            </div>
            <div className='flex flex-nowrap flex-row justify-start items-center gap-1 w-full'>
              <PasswordStrengthIndicatorIcon checked={hasSpecial} />
              <h6>has specail characters included</h6>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    )
  );
};

interface PasswordStrengthIndicatorIcon extends LucideProps {
  checked: boolean;
}
const PasswordStrengthIndicatorIcon = ({
  checked,
  className,
  ...props
}: PasswordStrengthIndicatorIcon) =>
  checked ? (
    <Check className={cn('h-4 stroke-green-400', className)} {...props} />
  ) : (
    <X className={cn('h-4 stroke-red-400', className)} {...props} />
  );
