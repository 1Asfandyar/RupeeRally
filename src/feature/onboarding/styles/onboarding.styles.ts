export const onboardingStyles = {
  screen: 'flex-1 bg-white',
  keyboardAvoidingView: 'flex-1',
  headerContainer: 'px-6 pt-2',
  headerRow: 'mb-6 flex-row items-center justify-between',
  backButton:
    'h-11 w-11 items-center justify-center rounded-full border border-gray-200',
  hiddenBackButton: 'opacity-0',
  stepLabel: 'text-sm text-gray-500',
  progressRow: 'mb-2 flex-row',
  progressSegment: 'mr-2 h-2 flex-1 rounded-full',
  activeProgressSegment: 'bg-primary',
  inactiveProgressSegment: 'bg-gray-200',
  stepContainer: 'flex-1 py-8',
  welcomeContainer: 'flex-1 items-center justify-center py-8',
  fullWidthImage: 'w-full',
  welcomeCopy: 'mt-10 w-full items-center',
  title: 'text-3xl text-gray-900',
  centeredTitle: 'text-center text-3xl text-gray-900',
  description: 'mt-3 text-base leading-6 text-gray-500',
  centeredDescription: 'mt-4 text-center text-lg text-gray-500',
  heroIconContainer:
    'mb-8 h-24 w-24 items-center justify-center rounded-full bg-primary/10',
  optionsList: 'mt-8',
  currencyOption: 'mb-3 flex-row items-center rounded-2xl border px-4 py-4',
  selectedOption: 'border-primary bg-primary/10',
  unselectedOption: 'border-gray-200 bg-white',
  currencyIconContainer:
    'h-12 w-12 items-center justify-center rounded-full bg-white',
  optionCopy: 'ml-4 flex-1',
  optionTitle: 'text-base text-gray-900',
  optionDescription: 'mt-1 text-sm text-gray-500',
  selectedCurrencyCard:
    'mt-7 rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3',
  sectionLabel: 'text-xs uppercase text-gray-500',
  sectionValue: 'mt-1 text-base text-gray-900',
  inlineLabel: 'mt-5 text-sm text-gray-600',
  iconOptionsRow: 'mt-3 flex-row',
  accountIconButton:
    'mr-3 h-14 w-14 items-center justify-center rounded-2xl border',
  colorLabel: 'mt-6 text-sm text-gray-600',
  colorOptionsRow: 'mt-3 flex-row',
  colorButton:
    'mr-3 h-12 w-12 items-center justify-center rounded-full border',
  selectedColorButton: 'border-gray-900',
  unselectedColorButton: 'border-gray-200',
  colorSwatch: 'h-9 w-9 rounded-full',
  balanceCopy: 'mt-8',
  accountPreview:
    'mt-7 flex-row items-center rounded-2xl border border-gray-200 px-4 py-4',
  accountPreviewIcon: 'h-12 w-12 items-center justify-center rounded-full',
  accountPreviewCopy: 'ml-4 flex-1',
  footer: 'px-6 pb-8 pt-4',
  fullWidthButton: 'w-full',
  errorText: 'mt-3 text-center text-sm text-red-500',
  skipButton: 'mt-2 w-full',
} as const;

export const onboardingLayout = {
  scrollContent: { flexGrow: 1, paddingHorizontal: 24 },
  welcomeIllustration: { height: 320 },
  balanceIllustration: { height: 260 },
} as const;
