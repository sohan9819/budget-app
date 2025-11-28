'use client';

import React, { ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CategoryComboBox } from '@/components/category';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CreteTransactionSchema, CreateTransaction } from '@/schema';
import { TransactionType } from '@/types';

import { CurrencyIcon } from './currency-icon';

interface CreatTransactionDialogProps {
  children: ReactNode;
  type: TransactionType;
}

export const CreatTransactionDialog = ({
  children,
  type,
}: CreatTransactionDialogProps) => {
  const form = useForm<CreateTransaction>({
    resolver: zodResolver(CreteTransactionSchema),
    defaultValues: {
      type,
      amount: 0,
      date: new Date(),
    },
  });

  async function onSubmit(values: CreateTransaction) {
    console.log('Create Transaction Values : ', values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>
                Create a New{' '}
                <span
                  className={cn('m-1', TransactionTypeStylings[type].title)}>
                  {type}
                </span>
                transaction
              </DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <CurrencyIcon className='-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        className='bg-background pl-9'
                        placeholder='0.00'
                        min='0'
                        step='0.01'
                        type='number'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Transacrion amount</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Add some description about the ${type}`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Transacrion description (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <CategoryComboBox type={type} />
                  </FormControl>
                  <FormDescription>
                    Select a catgeory for this transaction
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

enum StyleKeys {
  Title = 'title',
}

const TransactionTypeStylings: Record<
  TransactionType,
  Record<StyleKeys, string>
> = {
  income: {
    [StyleKeys.Title]: 'text-emerald-600',
  },
  expense: {
    [StyleKeys.Title]: 'text-destructive',
  },
};

// const placeholderDescription: Record<TransactionType, string> = {
//   income: 'Add some description about the income',
//   expense: 'Add some description about the expense',
// };
