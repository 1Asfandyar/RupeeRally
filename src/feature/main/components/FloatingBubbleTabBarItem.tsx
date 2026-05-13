import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { MainTabBarItem } from '@/feature/main/types/mainTabBar.types';
import { themeColors } from '@/theme/utilities';

type FloatingBubbleTabBarItemProps = {
  isFocused: boolean;
  item: MainTabBarItem;
  onPress: () => void;
};

const FloatingBubbleTabBarItem = ({
  isFocused,
  item,
  onPress,
}: FloatingBubbleTabBarItemProps) => {
  return (
    <Pressable
      accessibilityLabel={item.accessibilityLabel}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      onPress={onPress}
      style={styles.tabSlot}
    >
      <View style={[styles.iconButton, isFocused ? styles.activeIconButton : null]}>
        <Ionicons
          name={item.iconName}
          size={isFocused ? 28 : 18}
          color={isFocused ? themeColors.white : themeColors.gray400}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  activeIconButton: {
    backgroundColor: themeColors.primary,
    borderRadius: 29,
  },
  iconButton: {
    alignItems: 'center',
    height: 58,
    justifyContent: 'center',
    width: 58,
  },
  tabSlot: {
    alignItems: 'center',
    flex: 1,
    height: 58,
    justifyContent: 'center',
  },
});

export default FloatingBubbleTabBarItem;
