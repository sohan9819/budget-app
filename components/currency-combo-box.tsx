'use client';

import { useCallback, useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

import { UpdateUserCurrency } from '@/app/onboarding/_actions/user-settings';
import {
  userCurrencyAtom,
  userSettingsLoadingAtom,
} from '@/atoms/userSettingsAtom';
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
import { Currencies, Currency, CurrencyMap } from '@/lib/currencies';
import { cn } from '@/lib/utils';
import { useUserSettingsUtils } from '@/queries/user-settings/user-settings.utils';

const openAtom = atom(false);
const selectedCurrencyAtom = atom<Currency | null>(null);

export const CurrencyComboBox = () => {
  const [open, setOpen] = useAtom(openAtom);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedCurrency, setSelectedCurrency] = useAtom(selectedCurrencyAtom);

  // Use Jotai atoms instead of useQuery
  const currency = useAtomValue(userCurrencyAtom);
  const isLoading = useAtomValue(userSettingsLoadingAtom);
  const { invalidateUserSettings } = useUserSettingsUtils();

  // Initialize selected currency from atom
  useEffect(() => {
    if (currency) {
      const currencyObj = CurrencyMap[currency as Currency['value']];
      if (currencyObj) {
        setSelectedCurrency(currencyObj);
      }
    }
  }, [currency, setSelectedCurrency]);

  const updateCurrencyMutation = useMutation({
    mutationFn: UpdateUserCurrency,
    onSuccess: async (data) => {
      const { updatedUserSettings } = data[0];
      const updatedCurrency =
        CurrencyMap[updatedUserSettings.currency as Currency['value']];
      setSelectedCurrency(updatedCurrency);
      // Invalidate to refetch and update atoms
      await invalidateUserSettings();
    },
  });

  const updateSelectedCurrency = useCallback(
    (currency: Currency | null) => {
      if (!currency) {
        toast.error('Please select a currency');
        return;
      }

      toast.promise<
        {
          updatedUserSettings: {
            userId: string;
            currency: string;
          };
        }[]
      >(() => updateCurrencyMutation.mutateAsync(currency.value), {
        loading: 'Updating Currency...',
        success: (data) =>
          `Currency updated successfully to ${data[0].updatedUserSettings.currency}`,
        error: 'Error updating currency',
      });
    },
    [updateCurrencyMutation],
  );

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={isLoading}>
        <Popover open={open} onOpenChange={setOpen} modal={true}>
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
            <CurrencyList />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={isLoading}>
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
            <CurrencyList />
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  );
};

const CurrencyList = () => {
  const setOpen = useSetAtom(openAtom);
  const [selectedCurrency, setSelectedCurrency] = useAtom(selectedCurrencyAtom);
  return (
    <Command>
      <CommandInput placeholder='Filter status...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map(({ value, label }) => (
            <CommandItem
              key={value}
              value={value}
              onSelect={(value: string) => {
                const key = value as keyof typeof CurrencyMap;
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
};
