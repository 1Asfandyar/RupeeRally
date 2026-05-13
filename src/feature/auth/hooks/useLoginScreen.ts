import { useRouter } from 'expo-router';

import { ROUTES } from '@/config/routes';
import { useKeyboardVisible } from '@/hooks/useKeyboardVisible';
import { useLoginForm } from '@/feature/auth/hooks/useLoginForm';

const useLoginScreen = () => {
  const router = useRouter();
  const form = useLoginForm();
  const isKeyboardVisible = useKeyboardVisible();

  const openRegister = () => {
    router.replace(ROUTES.AUTH_REGISTER);
  };

  return {
    form,
    isKeyboardVisible,
    openRegister,
  };
};

export default useLoginScreen;
