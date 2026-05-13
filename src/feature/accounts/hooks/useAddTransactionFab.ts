import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ROUTES } from '@/config/routes';

const useAddTransactionFab = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomOffset = Math.max(insets.bottom, 12) + 104;

  const closeMenu = () => {
    setIsExpanded(false);
  };

  const handleTogglePress = () => {
    setIsExpanded((currentValue) => !currentValue);
  };

  const handleAddPersonalPress = () => {
    closeMenu();
    router.push(ROUTES.ADD_PERSONAL_RECORD);
  };

  const handleAddSharedPress = () => {
    closeMenu();
    router.push(ROUTES.ADD_SHARED_RECORD);
  };

  return {
    bottomOffset,
    isExpanded,
    onAddPersonalPress: handleAddPersonalPress,
    onAddSharedPress: handleAddSharedPress,
    onTogglePress: handleTogglePress,
  };
};

export default useAddTransactionFab;
