import { Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { fontFamilies } from '../fonts';
import { ThemedTextInputProps } from '../types';
import { themeColors, typography } from '../utilities';
import ThemedText from './ThemedText';

const ThemedInput = ({
  weight = 'regular',
  style,
  label,
  inlineLabel,
  inlineLabelIcon,
  isProminent = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  error,
  containerClassName = '',
  inputClassName = '',
  borderClassName = '',
  selectDate = false,
  ...props
}: ThemedTextInputProps) => {
  return (
    <View className={`mb-2 ${containerClassName} `}>
      {label && (
        <ThemedText className="text-gray-600 text-sm mb-1">{label}</ThemedText>
      )}

      <View
        className={`flex-row items-center border rounded-xl px-4 ${
          error
            ? 'border-red-400'
            : isProminent
              ? 'border-primary/30'
              : 'border-gray-200'
        } ${
          isProminent ? 'py-5 bg-primary/5' : 'py-4 bg-white'
        } overflow-hidden ${borderClassName}`}
      >
        {inlineLabel ? (
          <>
            <ThemedText
              className={`mr-1 ${isProminent ? 'text-base text-gray-900' : 'text-sm text-gray-600'}`}
              weight="semiBold"
            >
              {inlineLabel}
            </ThemedText>
            {inlineLabelIcon ? (
              <Ionicons
                name={inlineLabelIcon}
                size={18}
                style={{ marginRight: 10 }}
                color={themeColors.primary}
              />
            ) : null}
            <View className="mr-3 h-6 w-px bg-gray-300" />
          </>
        ) : null}

        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            style={{ marginRight: 8 }}
            color={themeColors.primary}
          />
        )}

        <TextInput
          {...props}
          secureTextEntry={secureTextEntry}
          pointerEvents={selectDate ? 'none' : 'auto'}
          placeholderTextColor={themeColors.gray400}
          className={`${typography.primaryControlSize} flex-1 min-w-0 text-gray-800 ${inputClassName}`}
          style={[
            {
              fontFamily: fontFamilies[weight],
              flexShrink: 1,
              minWidth: 0,
            },
            style,
          ]}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={{ flexShrink: 0 }}>
            <Ionicons name={rightIcon} size={20} color={themeColors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <ThemedText className="mt-1 text-xs text-red-500">{error}</ThemedText>
      ) : null}
    </View>
  );
};

export default ThemedInput;
