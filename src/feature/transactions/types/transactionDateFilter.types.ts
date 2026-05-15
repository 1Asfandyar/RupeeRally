export type TransactionDateFilters = {
  fromDate: string;
  toDate: string;
};

export type TransactionDateFilterField = keyof TransactionDateFilters;

export type TransactionDateFilterCalendarDay = {
  dayLabel: string;
  isInMonth: boolean;
  isToday: boolean;
  value: string;
};

export type TransactionDateFilterModalProps = {
  dateFilters: TransactionDateFilters;
  isVisible: boolean;
  onApplyDateFilters: (filters: TransactionDateFilters) => void;
  onClearDateFilters: () => void;
  onClose: () => void;
};

export type TransactionDateFilterModalViewProps = {
  activeField: TransactionDateFilterField;
  calendarDays: TransactionDateFilterCalendarDay[];
  draftFilters: TransactionDateFilters;
  isVisible: boolean;
  monthLabel: string;
  onApply: () => void;
  onChangeMonth: (months: number) => void;
  onClear: () => void;
  onClose: () => void;
  onSelectDate: (value: string) => void;
  onSelectField: (field: TransactionDateFilterField) => void;
};

export type UseTransactionDateFilterModalParams =
  TransactionDateFilterModalProps;
