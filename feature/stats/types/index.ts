export enum Timeframe {
  YEAR = 'year',
  MONTH = 'month',
}
export type Period = { year: number; month: number };

export type YearHistoryData = {
  expense: number;
  income: number;
  year: number;
  month: number;
};
export type MonthHistoryData = {
  expense: number;
  income: number;
  year: number;
  month: number;
  day: number;
};
