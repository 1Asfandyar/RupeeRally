import { Ionicons } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ThemedButton from '@/theme/components/ThemedButton';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

import {
  onboardingLayout,
  onboardingStyles,
} from '../styles/onboarding.styles';
import type { OnboardingViewProps } from '../types';
import AccountStep from './steps/AccountStep';
import BalanceStep from './steps/BalanceStep';
import CurrencyStep from './steps/CurrencyStep';
import WelcomeStep from './steps/WelcomeStep';

const OnboardingView = ({ flow }: OnboardingViewProps) => {
  const renderStep = () => {
    switch (flow.currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return (
          <CurrencyStep
            currencies={flow.currencyOptions}
            selectedCurrency={flow.selectedCurrency}
            onSelectCurrency={flow.setSelectedCurrencyCode}
          />
        );
      case 2:
        return (
          <AccountStep
            accountName={flow.accountName}
            selectedCurrency={flow.selectedCurrency}
            selectedAccountIcon={flow.selectedAccountIcon}
            selectedAccountColor={flow.selectedAccountColor}
            onAccountNameChange={flow.setAccountName}
            onSelectAccountIcon={flow.setSelectedAccountIcon}
            onSelectAccountColor={flow.setSelectedAccountColor}
          />
        );
      case 3:
        return (
          <BalanceStep
            accountName={flow.accountName}
            openingBalance={flow.openingBalance}
            selectedCurrency={flow.selectedCurrency}
            selectedAccountIcon={flow.selectedAccountIcon}
            selectedAccountColor={flow.selectedAccountColor}
            onOpeningBalanceChange={flow.setOpeningBalance}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className={onboardingStyles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className={onboardingStyles.keyboardAvoidingView}
      >
        <View className={onboardingStyles.headerContainer}>
          <View className={onboardingStyles.headerRow}>
            <TouchableOpacity
              activeOpacity={0.75}
              accessibilityRole="button"
              disabled={flow.currentStep === 0}
              onPress={flow.handleBack}
              className={`${onboardingStyles.backButton} ${
                flow.currentStep === 0 ? onboardingStyles.hiddenBackButton : ''
              }`}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color={themeColors.gray700}
              />
            </TouchableOpacity>

            <ThemedText className={onboardingStyles.stepLabel} weight="medium">
              Step {flow.currentStep + 1} of {flow.totalSteps}
            </ThemedText>
          </View>

          <View className={onboardingStyles.progressRow}>
            {Array.from({ length: flow.totalSteps }).map((_, index) => (
              <View
                key={index}
                className={`${onboardingStyles.progressSegment} ${
                  index <= flow.currentStep
                    ? onboardingStyles.activeProgressSegment
                    : onboardingStyles.inactiveProgressSegment
                }`}
              />
            ))}
          </View>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={onboardingLayout.scrollContent}
        >
          {renderStep()}
        </ScrollView>

        <View className={onboardingStyles.footer}>
          <ThemedButton
            title={flow.currentStep === flow.totalSteps - 1 ? 'Finish' : 'Continue'}
            onPress={flow.handleContinue}
            disabled={!flow.canContinue || flow.isCompleting}
            loading={
              flow.isCompleting && flow.currentStep === flow.totalSteps - 1
            }
            containerClassName={onboardingStyles.fullWidthButton}
            rightIcon={
              flow.currentStep === flow.totalSteps - 1
                ? 'checkmark'
                : 'arrow-forward'
            }
          />

          {flow.onboardingError ? (
            <ThemedText className={onboardingStyles.errorText}>
              {flow.onboardingError}
            </ThemedText>
          ) : null}

          {flow.showSkip ? (
            <ThemedButton
              title="Skip for now"
              onPress={flow.handleSkip}
              variant="ghost"
              loading={
                flow.isCompleting && flow.currentStep !== flow.totalSteps - 1
              }
              disabled={flow.isCompleting}
              containerClassName={onboardingStyles.skipButton}
            />
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingView;
