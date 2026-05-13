import { useRouter } from 'expo-router';

import { ROUTES } from '@/config/routes';
import { useKeyboardVisible } from '@/hooks/useKeyboardVisible';
import { useRegisterForm } from '@/feature/auth/hooks/useRegisterForm';

const useRegisterScreen = () => {
  const router = useRouter();
  const form = useRegisterForm();
  const isKeyboardVisible = useKeyboardVisible();

  const openLogin = () => {
    router.replace(ROUTES.AUTH_LOGIN);
  };

  return {
    form,
    isKeyboardVisible,
    openLogin,
  };
};

export default useRegisterScreen;
