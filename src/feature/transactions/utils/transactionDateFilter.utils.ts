import { TRANSACTION_DATE_FILTER_CALENDAR_DAY_COUNT } from '@/feature/transactions/constants/transactionDateFilter.constants';
import type { TransactionDateFilterCalendarDay } from '@/feature/transactions/types/transactionDateFilter.types';

export const toDateFilterValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const parseDateFilterValue = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return toDateFilterValue(date) === value ? date : null;
};

export const getDateFilterMonthStart = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const addDateFilterMonths = (date: Date, months: number) =>
  new Date(date.getFullYear(), date.getMonth() + months, 1);

export const formatDateFilterValue = (value: string) => {
  const date = parseDateFilterValue(value);

  if (!date) return 'Select date';

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateFilterMonth = (date: Date) =>
  date.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

export const getDateFilterCalendarDays = (
  visibleMonth: Date,
): TransactionDateFilterCalendarDay[] => {
  const monthStart = getDateFilterMonthStart(visibleMonth);
  const calendarStart = new Date(monthStart);
  calendarStart.setDate(monthStart.getDate() - monthStart.getDay());
  const todayValue = toDateFilterValue(new Date());

  return Array.from(
    { length: TRANSACTION_DATE_FILTER_CALENDAR_DAY_COUNT },
    (_, index) => {
      const date = new Date(calendarStart);
      date.setDate(calendarStart.getDate() + index);
      const value = toDateFilterValue(date);

      return {
        dayLabel: String(date.getDate()),
        isInMonth: date.getMonth() === visibleMonth.getMonth(),
        isToday: value === todayValue,
        value,
      };
    },
  );
};
