'use client';

import { useEffect } from 'react';

import { atom, useAtom } from 'jotai';
import { Check, ChevronsUpDown } from 'lucide-react';

import { SkeletonWrapper } from '@/components/skeleton-wrapper';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useCategoryQuery } from '@/queries/category/category.queries';
import { Category } from '@/schema';
import { TransactionType } from '@/types';

import { CategoryRow } from './category-row';
import { CreateCategoryDialog } from './create-category-dialog';

interface CategoryPickerProps {
  type: TransactionType;
}

const openAtom = atom(false);
const selectedCategoryAtom = atom<Category | null>(null);

export const CategoryComboBox = ({ type }: CategoryPickerProps) => {
  const [open, setOpen] = useAtom(openAtom);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const { data: categories, isLoading } = useCategoryQuery({ type });

  useEffect(() => {
    console.log('Categories: ', categories);
  }, [categories]);

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={isLoading}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' className='w-[150px] justify-start'>
              {selectedCategory ? (
                <CategoryRow category={selectedCategory} />
              ) : (
                'Select Category'
              )}
              <ChevronsUpDown className='opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0' align='start'>
            {categories && (
              <CategoryList
                setOpen={setOpen}
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                type={type}
              />
            )}
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={isLoading}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant='outline' className='w-[150px] justify-start'>
            {selectedCategory ? (
              <CategoryRow category={selectedCategory} />
            ) : (
              'Select Category'
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mt-4 h-screen'>
            {categories && (
              <CategoryList
                setOpen={setOpen}
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                type={type}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  );
};

function CategoryList({
  setOpen,
  categories,
  setSelectedCategory,
  type,
}: {
  setOpen: (open: boolean) => void;
  categories: Category[];
  setSelectedCategory: (category: Category | null) => void;
  type: TransactionType;
}) {
  return (
    <Command onSubmit={(e) => e.preventDefault()}>
      <CommandInput placeholder='Filter status...' />
      <CreateCategoryDialog type={type} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {categories.map((category) => (
            <CommandItem
              key={category.id}
              value={category.id}
              onSelect={(categoryId) => {
                setSelectedCategory(
                  categories.find((category) => category.id === categoryId) ||
                    null,
                );
                setOpen(false);
              }}>
              <CategoryRow category={category} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
