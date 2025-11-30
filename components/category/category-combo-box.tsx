'use client';

import { useCallback, useEffect } from 'react';

import { atom, useAtom, useSetAtom } from 'jotai';
import { Check, ChevronsUpDown } from 'lucide-react';

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
import { cn } from '@/lib/utils';
import { useCategoryQuery } from '@/queries/category/category.queries';
import { Category } from '@/schema';
import { TransactionType } from '@/types';

import { CategoryRow } from './category-row';
import { CreateCategoryDialog } from './create-category-dialog';
import { Spinner } from '../ui/spinner';

interface CategoryPickerProps {
  type: TransactionType;
  onChange: (categoryId: string) => void;
}

const openAtom = atom(false);
const selectedCategoryAtom = atom<Category | null>(null);

export const CategoryComboBox = ({ type, onChange }: CategoryPickerProps) => {
  const [open, setOpen] = useAtom(openAtom);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  // TODO : Can be replaced with atom effect ---------
  useEffect(() => {
    if (selectedCategory) {
      onChange(selectedCategory.id);
    }
  }, [onChange, selectedCategory]);
  // -------------------------------------------------

  // --------- Reset the value on component mount ---------
  useEffect(() => {
    setSelectedCategory(null);
  }, [setSelectedCategory]);
  // -----------------------------------------------------

  const { data: categories, isLoading } = useCategoryQuery({ type });

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-[150px] justify-between'>
            {selectedCategory ? (
              <CategoryRow category={selectedCategory} />
            ) : (
              'Select Category'
            )}
            <ChevronsUpDown className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0' align='start'>
          {isLoading && (
            <div className='flex flex-nowrap justify-center items-center text-sm h-8 gap-2 animate-pulse'>
              <Spinner /> Loading...
            </div>
          )}
          {categories && <CategoryList type={type} categories={categories} />}
        </PopoverContent>
      </Popover>
    );
  }

  return (
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
        <div className='mt-4 h-[60vh]'>
          {isLoading && (
            <p className='p-4 text-center'>
              Loading... <Spinner />
            </p>
          )}
          {categories && <CategoryList type={type} categories={categories} />}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

function CategoryList({
  type,
  categories,
}: {
  type: TransactionType;
  categories: Category[];
}) {
  const setOpen = useSetAtom(openAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  const handleCreatedCategory = useCallback(
    (category: Category) => {
      setSelectedCategory(category);
      setOpen(false);
    },
    [setOpen, setSelectedCategory],
  );

  return (
    <Command
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}>
      <CommandInput placeholder='Filter status...' />
      <CreateCategoryDialog
        type={type}
        handleCreatedCategory={handleCreatedCategory}
      />
      <CommandList>
        <CommandEmpty>
          <p>Category not found</p>
          <p className='text-xs text-muted-foreground '>
            Tip: Create a new category
          </p>
        </CommandEmpty>
        <CommandGroup>
          {categories.map((category) => (
            <CommandItem
              key={category.id}
              value={category.name}
              onSelect={(categoryName) => {
                setSelectedCategory(
                  categories.find(
                    (category) => category.name === categoryName,
                  ) || null,
                );
                setOpen(false);
              }}>
              <CategoryRow category={category} />
              <Check
                className={cn(
                  'ml-auto',
                  selectedCategory?.id === category.id
                    ? 'opacity-100'
                    : 'opacity-0',
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
