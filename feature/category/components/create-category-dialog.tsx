'use client';
import React, { useCallback } from 'react';

// import data from '@emoji-mart/data';
// import Picker from '@emoji-mart/react';
// import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { atom, useAtom } from 'jotai';
import { CircleOff, PlusSquare } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
import {
  Category,
  CreateCategoryForm,
  CreateCategoryFormSchema,
} from '@/feature/category/schema';
import { TransactionType } from '@/feature/transaction/types';
import { cn } from '@/lib/utils';

import { useCreateCategoryMutation } from '../query';
import { useCategoryUtils } from '../query/utils';

interface CreateCategoryDialogProps {
  type: TransactionType;
  handleCreatedCategory: (category: Category) => void;
}

const openAtom = atom(false);

export const CreateCategoryDialog = ({
  type,
  handleCreatedCategory,
}: CreateCategoryDialogProps) => {
  const [open, setOpen] = useAtom(openAtom);
  const { invalidateFilterCategory } = useCategoryUtils();
  const { resolvedTheme } = useTheme();

  const { mutate, isPending } = useCreateCategoryMutation({
    onSuccess: async (newCategory: Category) => {
      form.reset({ type });

      toast.success(
        `Category ${newCategory.name} ${newCategory.icon} created successfully 🎉`,
        {
          id: 'create-category',
        },
      );

      invalidateFilterCategory({ type });
      handleCreatedCategory(newCategory);
      setOpen((prev) => !prev);
    },
    onError: (error) => {
      console.log('Category Error : ', error);
      toast.error('Something went wrong', {
        id: 'create-category',
        description: `${error.message}`,
      });
    },
  });

  const form = useForm<CreateCategoryForm>({
    resolver: zodResolver(CreateCategoryFormSchema),
    defaultValues: {
      name: '',
      icon: '',
      type,
    },
  });

  const onSubmit: SubmitHandler<CreateCategoryForm> = useCallback(
    (values: CreateCategoryForm) => {
      console.log('Creating a new catgeory');
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={(e) => e.stopPropagation()}>
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

            <div className='flex flex-col gap-4 my-4'>
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
                    <FormDescription>
                      This is how your category will appear in this app
                    </FormDescription>
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
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full h-[100px]'>
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
                        <PopoverContent className='w-auto h-auto p-0'>
                          {/* <Picker
                          data={data}
                          theme={resolvedTheme}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native);
                          }}
                        /> */}
                          <EmojiPicker
                            onEmojiClick={(emoji) =>
                              field.onChange(emoji.emoji)
                            }
                            theme={resolvedTheme as Theme}
                            style={{
                              width: '40vw',
                              minWidth: '20rem',
                              height: '45vh',
                              minHeight: '15rem',
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
            </div>

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
        {/* <DevTool control={form.control} /> */}
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
