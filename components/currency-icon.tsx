import React from 'react';

import { useAtomValue } from 'jotai';
import { Coins } from 'lucide-react';

import { userCurrencyAtom } from '@/atoms/userSettingsAtom';
import { CurrencyIcons } from '@/lib/currencies';

export const CurrencyIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const currency = useAtomValue(userCurrencyAtom);
  if (currency) {
    const CurrencyIcon = CurrencyIcons[currency];
    return <CurrencyIcon {...props} />;
  }
  return <Coins {...props} />;
};
