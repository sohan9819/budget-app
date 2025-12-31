'use client';

import React from 'react';

import { useAtom } from 'jotai';
import { Star } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { periodAtom } from '.';

type Month = {
  index: number;
  label: string;
  isCurrent: boolean;
};

export const MonthSelector = () => {
  const [period, setPeriod] = useAtom(periodAtom);
  const currentMonth = new Date().getMonth();
  const months: Month[] = Array.from({ length: 12 }, (_, i) => ({
    index: i,
    label: new Date(2000, i).toLocaleString('default', { month: 'long' }),
    isCurrent: i === currentMonth,
  }));

  return (
    <Select
      value={period.month.toString()}
      onValueChange={(value) => {
        setPeriod({ month: parseInt(value), year: period.year });
      }}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a year' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Months</SelectLabel>
          {months.map((month) => (
            <SelectItem key={month.index} value={month.index.toString()}>
              {month.label}
              {month.isCurrent && <Star className='h-4 w-4 text-yellow-500' />}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
