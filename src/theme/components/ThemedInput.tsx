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
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
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
        className={`flex-row items-center border border-gray-200 rounded-xl px-4 py-4 bg-white overflow-hidden ${borderClassName}`}
      >
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
    </View>
  );
};

export default ThemedInput;
