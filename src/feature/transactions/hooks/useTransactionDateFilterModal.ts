import { useCallback, useEffect, useMemo, useState } from 'react';

import { EMPTY_TRANSACTION_DATE_FILTERS } from '@/feature/transactions/constants/transactionDateFilter.constants';
import type {
  TransactionDateFilterField,
  TransactionDateFilters,
  UseTransactionDateFilterModalParams,
} from '@/feature/transactions/types/transactionDateFilter.types';
import {
  addDateFilterMonths,
  formatDateFilterMonth,
  getDateFilterCalendarDays,
  getDateFilterMonthStart,
  parseDateFilterValue,
} from '@/feature/transactions/utils/transactionDateFilter.utils';

const useTransactionDateFilterModal = ({
  dateFilters,
  isVisible,
  onApplyDateFilters,
  onClearDateFilters,
  onClose,
}: UseTransactionDateFilterModalParams) => {
  const [activeField, setActiveField] =
    useState<TransactionDateFilterField>('fromDate');
  const [draftFilters, setDraftFilters] =
    useState<TransactionDateFilters>(dateFilters);
  const [visibleMonth, setVisibleMonth] = useState(() =>
    getDateFilterMonthStart(new Date()),
  );
  const calendarDays = useMemo(
    () => getDateFilterCalendarDays(visibleMonth),
    [visibleMonth],
  );
  const monthLabel = useMemo(
    () => formatDateFilterMonth(visibleMonth),
    [visibleMonth],
  );

  useEffect(() => {
    if (!isVisible) return;

    const initialDate =
      parseDateFilterValue(dateFilters.fromDate) ??
      parseDateFilterValue(dateFilters.toDate) ??
      new Date();

    setDraftFilters(dateFilters);
    setActiveField('fromDate');
    setVisibleMonth(getDateFilterMonthStart(initialDate));
  }, [dateFilters, isVisible]);

  const selectField = useCallback(
    (field: TransactionDateFilterField) => {
      const selectedDate =
        parseDateFilterValue(draftFilters[field]) ?? new Date();

      setActiveField(field);
      setVisibleMonth(getDateFilterMonthStart(selectedDate));
    },
    [draftFilters],
  );

  const changeMonth = useCallback((months: number) => {
    setVisibleMonth((currentMonth) =>
      addDateFilterMonths(currentMonth, months),
    );
  }, []);

  const selectDate = useCallback(
    (value: string) => {
      setDraftFilters((currentFilters) => {
        const nextFilters = {
          ...currentFilters,
          [activeField]: value,
        };

        if (
          activeField === 'fromDate' &&
          nextFilters.toDate &&
          value > nextFilters.toDate
        ) {
          nextFilters.toDate = '';
        }

        if (
          activeField === 'toDate' &&
          nextFilters.fromDate &&
          value < nextFilters.fromDate
        ) {
          nextFilters.fromDate = '';
        }

        return nextFilters;
      });

      if (activeField === 'fromDate') {
        setActiveField('toDate');
      }
    },
    [activeField],
  );

  const applyFilters = useCallback(() => {
    onApplyDateFilters(draftFilters);
    onClose();
  }, [draftFilters, onApplyDateFilters, onClose]);

  const clearFilters = useCallback(() => {
    setDraftFilters({ ...EMPTY_TRANSACTION_DATE_FILTERS });
    onClearDateFilters();
    onClose();
  }, [onClearDateFilters, onClose]);

  return {
    activeField,
    calendarDays,
    draftFilters,
    monthLabel,
    onApply: applyFilters,
    onChangeMonth: changeMonth,
    onClear: clearFilters,
    onSelectDate: selectDate,
    onSelectField: selectField,
  };
};

export default useTransactionDateFilterModal;
