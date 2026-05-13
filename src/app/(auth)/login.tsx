import LoginScreen from '@/feature/auth/screens/LoginScreen';
import { useKeyboardVisible } from '@/hooks/useKeyboardVisible';
import { useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();
  const isKeyboardVisible = useKeyboardVisible();

  return (
    <LoginScreen
      router={router}
      isKeyboardVisible={isKeyboardVisible}
    />
  );
};

export default Login;
