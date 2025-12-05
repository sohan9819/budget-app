import React from 'react';

import { useAtomValue } from 'jotai';
import { Coins } from 'lucide-react';

import { selectedCurrencyAtom } from '@/feature/user-settings/atoms';
import { CurrencyIcons } from '@/feature/user-settings/lib/currencies';

export const CurrencyIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const currency = useAtomValue(selectedCurrencyAtom);
  if (currency) {
    const CurrencyIcon = CurrencyIcons[currency.value];
    return <CurrencyIcon {...props} />;
  }
  return <Coins {...props} />;
};
