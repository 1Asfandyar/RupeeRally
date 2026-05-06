import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { ThemedButtonProps } from '../types';
import { themeColors, typography } from '../utilities';
import ThemedText from './ThemedText';

const ThemedButton = ({
  title,
  weight = 'semiBold',
  variant = 'primary',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  iconSize = 18,
  containerClassName = '',
  textClassName = '',
  ...props
}: ThemedButtonProps) => {
  const isDisabled = disabled || loading;

  const variantStyles = {
    primary: {
      container: 'bg-primary',
      text: 'text-white',
      icon: themeColors.white,
    },
    outline: {
      container: 'border border-primary bg-transparent',
      text: 'text-primary',
      icon: themeColors.primary,
    },
    ghost: {
      container: 'bg-transparent',
      text: 'text-primary',
      icon: themeColors.primary,
    },
  };

  const colors = variantStyles[variant];

  const loaderColor = variant === 'primary' ? themeColors.white : themeColors.gray500;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      className={`rounded-xl py-4 px-4 flex-row items-center justify-center ${
        colors.container
      } ${isDisabled ? 'opacity-60' : ''} ${containerClassName}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <View className="flex-row items-center">
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={iconSize}
              color={colors.icon}
              style={{ marginRight: 8 }}
            />
          )}
          <ThemedText
            weight={weight}
            className={`${typography.primaryControlSize} ${colors.text} ${textClassName}`}
          >
            {title}
          </ThemedText>
          {rightIcon && (
            <Ionicons
              name={rightIcon}
              size={iconSize}
              color={colors.icon}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ThemedButton;
