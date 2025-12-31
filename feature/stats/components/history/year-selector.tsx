'use client';

import React from 'react';

import { useAtom } from 'jotai';

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

interface YearSelectorProps {
  years: number[];
}

export const YearSelector = ({ years }: YearSelectorProps) => {
  const [period, setPeriod] = useAtom(periodAtom);

  return (
    <Select
      value={period.year.toString()}
      onValueChange={(value) =>
        setPeriod({ month: period.month, year: parseInt(value) })
      }>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a year' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Years</SelectLabel>
          {years.map((year, index) => (
            <SelectItem key={index} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
