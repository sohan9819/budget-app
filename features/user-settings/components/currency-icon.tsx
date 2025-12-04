import React from 'react';

import { useAtomValue } from 'jotai';
import { Coins } from 'lucide-react';

import { selectedCurrencyAtom } from '@/features/user-settings/atoms';
import { CurrencyIcons } from '@/features/user-settings/lib/currencies';

export const CurrencyIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const currency = useAtomValue(selectedCurrencyAtom);
  if (currency) {
    const CurrencyIcon = CurrencyIcons[currency.value];
    return <CurrencyIcon {...props} />;
  }
  return <Coins {...props} />;
};
