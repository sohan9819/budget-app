'use client';
import React, { useCallback } from 'react';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { atom, useAtom } from 'jotai';
import { CircleOff, PlusSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { CreateCategory as CreateCategoryFn } from '@/app/(dashboard)/(home)/_actions/category';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { categoryKeys } from '@/queries/keys';
import { Category, CreateCategory, CreateCategorySchema } from '@/schema';
import { TransactionType } from '@/types';

interface CreateCategoryDialogProps {
  type: TransactionType;
}

const openAtom = atom(false);

export const CreateCategoryDialog = ({ type }: CreateCategoryDialogProps) => {
  const [open, setOpen] = useAtom(openAtom);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCategoryFn,
    onSuccess: async (data: Category[]) => {
      form.reset({
        type,
      });

      const newCategory = data[0];

      toast.success(
        `Category ${newCategory.name} ${newCategory.icon} created successfully 🎉`,
        {
          id: 'create-category',
        },
      );

      queryClient.invalidateQueries({ queryKey: categoryKeys.list({ type }) });

      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error('Something went wrong', {
        id: 'create-category',
      });
    },
  });

  const form = useForm<CreateCategory>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });

  const onSubmit = useCallback(
    (values: CreateCategory) => {
      toast.loading('Creating category...', {
        id: 'create-category',
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
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground'>
          <PlusSquare className='mr-2 h-4 w-4' />
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                Create a New{' '}
                <span
                  className={cn('m-1', TransactionTypeStylings[type].title)}>
                  {type}
                </span>
                category
              </DialogTitle>
              <DialogDescription>
                Categories are used to group your transactions
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Name this ${type} category`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='icon'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant='outline' className='w-full h-[100px]'>
                          {form.watch('icon') ? (
                            <div className='flex flex-col items-center gap-2'>
                              <span className='text-5xl' role='img'>
                                {field.value}
                              </span>
                              <p className='text-xs text-muted-foreground'>
                                Click to change
                              </p>
                            </div>
                          ) : (
                            <div className='flex flex-col items-center gap-2'>
                              <CircleOff className='h-[48px] w-[48px]' />
                              <p className='text-xs text-muted-foreground'>
                                Click to select
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Picker
                          data={data}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    This is how your category will appear in this app
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit' disabled={isPending}>
                {isPending ? <Spinner /> : 'Create'}
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
