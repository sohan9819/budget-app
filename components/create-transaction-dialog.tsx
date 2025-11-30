'use client';

import { ReactNode, useCallback, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { CreateTransaction } from '@/app/(dashboard)/(home)/_actions/transactions';
import { CategoryComboBox } from '@/components/category';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CreateTransactionFormSchema, CreateTransactionForm } from '@/schema';
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
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const defaultFormValues = {
    type,
    amount: 0,
    categoryId: '',
    description: '',
  };

  const form = useForm<CreateTransactionForm>({
    resolver: zodResolver(CreateTransactionFormSchema),
    defaultValues: defaultFormValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateTransaction,
    onSuccess: () => {
      toast.success('Transaction created successfully 🎉', {
        id: 'create-transaction',
      });

      form.reset();

      queryClient.invalidateQueries({ queryKey: ['overview'] });

      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error('Something went wrong', {
        id: 'create-transaction',
      });
    },
  });

  const onSubmit = useCallback(
    (values: CreateTransactionForm) => {
      toast.loading('Creating transaction...', {
        id: 'create-transaction',
      });
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-3'>
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

            <div className='flex flex-col gap-4 my-4'>
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
                      <CategoryComboBox type={type} onChange={field.onChange} />
                    </FormControl>
                    <FormDescription>
                      Select a catgeory for this transaction
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          id='date'
                          className={cn(
                            'w-48 justify-between font-normal',
                            !field.value && 'text-muted-foreground',
                          )}>
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-auto overflow-hidden p-0'
                        align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>

                    <FormDescription>
                      Select a date for this transaction
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit' disabled={isPending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
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
