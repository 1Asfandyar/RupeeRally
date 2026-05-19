import { Ionicons } from '@expo/vector-icons';
import { Image, View } from 'react-native';

import type { SharedExpenseAvatarProps } from '@/feature/transactions/types/addTransactionRecord.types';
import {
  getUserAvatarUrl,
  getUserInitial,
} from '@/feature/groups/utils/groupMembers.utils';
import ThemedText from '@/theme/components/ThemedText';
import { themeColors } from '@/theme/utilities';

const SharedExpenseAvatar = ({
  className = '',
  size = 38,
  user,
}: SharedExpenseAvatarProps) => {
  const avatarUrl = getUserAvatarUrl(user);

  if (avatarUrl) {
    return (
      <Image
        source={{ uri: avatarUrl }}
        className={`rounded-full bg-gray-100 ${className}`}
        style={{ height: size, width: size }}
      />
    );
  }

  return (
    <View
      className={`items-center justify-center rounded-full bg-primary/10 ${className}`}
      style={{ height: size, width: size }}
    >
      {getUserInitial(user) ? (
        <ThemedText className="text-primary" weight="semiBold">
          {getUserInitial(user)}
        </ThemedText>
      ) : (
        <Ionicons name="person" size={size * 0.48} color={themeColors.primary} />
      )}
    </View>
  );
};

export default SharedExpenseAvatar;
