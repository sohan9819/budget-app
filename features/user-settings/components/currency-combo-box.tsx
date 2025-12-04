'use client';

import { useCallback, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

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
import { selectedCurrencyAtom } from '@/features/user-settings/atoms';
import {
  Currencies,
  Currency,
  CurrencyMap,
} from '@/features/user-settings/lib/currencies';
import {
  getUserSettingsQueryOptions,
  useUserSettingsCurrencyMutation,
} from '@/features/user-settings/queries';
import { useUserSettingsUtils } from '@/features/user-settings/queries/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

const openAtom = atom(false);

export function CurrencyComboBox() {
  const [open, setOpen] = useAtom(openAtom);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedCurrency, setSelectedCurrency] = useAtom(selectedCurrencyAtom);

  const { invalidateUserSettings } = useUserSettingsUtils();

  const { data, isLoading, isFetching, isError } = useQuery(
    getUserSettingsQueryOptions(),
  );

  const updateCurrencyMutation = useUserSettingsCurrencyMutation({
    onSuccess: (userSettings) => {
      const updatedCurrency =
        CurrencyMap[userSettings.currency as Currency['value']];
      setSelectedCurrency(updatedCurrency);
      invalidateUserSettings();
    },
  });

  const updateSelectedCurrency = useCallback(
    (currency: Currency | null) => {
      if (!currency) {
        toast.error('Please select a currency');
        return;
      }

      toast.promise<{
        userId: string;
        currency: string;
      }>(() => updateCurrencyMutation.mutateAsync(currency.value), {
        loading: 'Updating Currency...',
        success: ({ currency }) =>
          `Currency updated successfully to ${currency}`,
        error: 'Error updating currency',
      });
    },
    [updateCurrencyMutation],
  );

  useEffect(() => {
    if (data && !(isLoading || isFetching) && !isError) {
      setSelectedCurrency(CurrencyMap[data.currency as Currency['value']]);
    }
  }, [data, isError, isFetching, isLoading, setSelectedCurrency]);

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={isLoading || isFetching}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='w-full justify-start'
              disabled={updateCurrencyMutation.isPending}>
              {selectedCurrency ? (
                <>{selectedCurrency.label}</>
              ) : (
                <>Set currency</>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0' align='start'>
            <CurrencyList setSelectedCurrency={updateSelectedCurrency} />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={isLoading || isFetching}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant='outline'
            className='w-full justify-start'
            disabled={updateCurrencyMutation.isPending}>
            {selectedCurrency ? (
              <>{selectedCurrency.label}</>
            ) : (
              <>Set currency</>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mt-4 border-t'>
            <CurrencyList setSelectedCurrency={updateSelectedCurrency} />
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  );
}

function CurrencyList({
  setSelectedCurrency,
}: {
  setSelectedCurrency: (status: Currency | null) => void;
}) {
  const setOpen = useSetAtom(openAtom);
  const selectedCurrency = useAtomValue(selectedCurrencyAtom);
  return (
    <Command>
      <CommandInput placeholder='Filter status...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map(({ value, label }) => (
            <CommandItem
              key={value}
              value={`${value} ${label}`}
              onSelect={(value: string) => {
                const key = value.split(' ')[0] as keyof typeof CurrencyMap;
                setSelectedCurrency(CurrencyMap[key]);
                setOpen(false);
              }}>
              {label}
              <Check
                className={cn(
                  'ml-auto',
                  selectedCurrency?.value === value
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
