import React from 'react';

import { Eye, EyeClosed } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends React.ComponentProps<'input'> {
  visibility: boolean;
  onChangeVisibility: () => void;
}

export const PasswordInput = ({
  className,
  placeholder,
  visibility,
  onChangeVisibility,
  ...props
}: PasswordInputProps) => {
  return (
    <div className={cn('flex gap-1', className)}>
      <Input
        placeholder={placeholder}
        type={visibility ? 'text' : 'password'}
        {...props}
      />
      <Button
        variant={'ghost'}
        size={'icon'}
        type='button'
        onClick={onChangeVisibility}>
        {visibility ? <Eye /> : <EyeClosed />}
      </Button>
    </div>
  );
};
