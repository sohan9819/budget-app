import { MonthHistoryData, YearHistoryData } from './types';

export const fillMissingMonths = (
  data: YearHistoryData[],
  year: number,
): YearHistoryData[] => {
  const byMonth = new Map<number, YearHistoryData>();

  for (const row of data) {
    byMonth.set(row.month, row);
  }

  return Array.from({ length: 12 }, (_, i) => {
    const month = i; // 0–11

    return (
      byMonth.get(i) ?? {
        year,
        month,
        income: 0,
        expense: 0,
      }
    );
  });
};

export function getDaysInMonth(year: number, month: number): number {
  // month: 1–12
  return new Date(year, month + 1, 0).getDate();
}

export const fillMissingDays = (
  data: MonthHistoryData[],
  year: number,
  month: number,
): MonthHistoryData[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const byDay = new Map<number, MonthHistoryData>();

  for (const row of data) {
    byDay.set(row.day, row);
  }

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;

    return (
      byDay.get(day) ?? {
        year,
        month,
        day,
        income: 0,
        expense: 0,
      }
    );
  });
};

export const fillMissingYears = (years: number[]): number[] => {
  const currentYear = new Date().getFullYear();
  if (!years.length) return [currentYear];
  const startYear = years[0];

  return Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i,
  );
};
