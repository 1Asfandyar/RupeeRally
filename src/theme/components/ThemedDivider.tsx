import { View } from 'react-native';

import ThemedText from './ThemedText';

type ThemedDividerProps = {
  label?: string;
  className?: string;
};

const ThemedDivider = ({
  label,
  className = '',
}: ThemedDividerProps) => {
  return (
    <View className={`flex-row items-center my-4 ${className}`}>
      <View className="flex-1 h-px bg-gray-300" />
      {label ? (
        <ThemedText className="mx-2 text-sm text-gray-500">
          {label}
        </ThemedText>
      ) : null}
      <View className="flex-1 h-px bg-gray-300" />
    </View>
  );
};

export default ThemedDivider;
