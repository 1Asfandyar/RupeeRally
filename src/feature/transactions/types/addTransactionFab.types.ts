export type AddTransactionFabViewProps = {
  bottomOffset: number;
  isExpanded: boolean;
  onAddPersonalPress: () => void;
  onAddSharedPress: () => void;
  onTogglePress: () => void;
};

export type AddTransactionFabProps = {
  selectedAccountId?: number;
};

export type AddTransactionFabStore = {
  closeMenu: () => void;
  isExpanded: boolean;
  toggleMenu: () => void;
};
