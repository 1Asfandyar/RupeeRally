import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

import ThemedInput from '@/theme/components/ThemedInput';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

import {
  accountColors,
  accountIcons,
} from '../../constants/onboarding.constants';
import { onboardingStyles } from '../../styles/onboarding.styles';
import type { AccountStepProps } from '../../types';

const AccountStep = ({
  accountName,
  selectedCurrency,
  selectedAccountIcon,
  selectedAccountColor,
  onAccountNameChange,
  onSelectAccountIcon,
  onSelectAccountColor,
}: AccountStepProps) => {
  return (
    <View className={onboardingStyles.stepContainer}>
      <View
        className="mb-8 h-24 w-24 items-center justify-center rounded-full"
        style={{ backgroundColor: `${selectedAccountColor}1A` }}
      >
        <Ionicons
          name={selectedAccountIcon}
          size={42}
          color={selectedAccountColor}
        />
      </View>

      <ThemedText className={onboardingStyles.title} weight="bold">
        Add your first account
      </ThemedText>
      <ThemedText className={onboardingStyles.description}>
        This helps us track your money better.
      </ThemedText>

      <View className={onboardingStyles.selectedCurrencyCard}>
        <ThemedText className={onboardingStyles.sectionLabel}>
          Selected currency
        </ThemedText>
        <ThemedText className={onboardingStyles.sectionValue} weight="semiBold">
          {selectedCurrency.code} - {selectedCurrency.name}
        </ThemedText>
      </View>

      <ThemedInput
        label="Account name"
        placeholder="Cash, Bank, Wallet"
        value={accountName}
        onChangeText={onAccountNameChange}
        leftIcon="wallet-outline"
        containerClassName="mt-6"
        returnKeyType="done"
      />

      <ThemedText className={onboardingStyles.inlineLabel} weight="medium">
        Choose icon
      </ThemedText>
      <View className={onboardingStyles.iconOptionsRow}>
        {accountIcons.map((item) => {
          const isSelected = selectedAccountIcon === item.icon;

          return (
            <TouchableOpacity
              key={item.icon}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelectAccountIcon(item.icon)}
              className={`${onboardingStyles.accountIconButton} ${
                isSelected
                  ? onboardingStyles.selectedOption
                  : onboardingStyles.unselectedOption
              }`}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={isSelected ? themeColors.primary : themeColors.gray600}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <ThemedText className={onboardingStyles.colorLabel} weight="medium">
        Choose color
      </ThemedText>
      <View className={onboardingStyles.colorOptionsRow}>
        {accountColors.map((item) => {
          const isSelected = selectedAccountColor === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelectAccountColor(item.value)}
              className={`${onboardingStyles.colorButton} ${
                isSelected
                  ? onboardingStyles.selectedColorButton
                  : onboardingStyles.unselectedColorButton
              }`}
            >
              <View
                className={onboardingStyles.colorSwatch}
                style={{ backgroundColor: item.value }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default AccountStep;
