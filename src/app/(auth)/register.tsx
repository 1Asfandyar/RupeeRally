import RegisterScreen from '@/feature/auth/screens/RegisterScreen';
import { useKeyboardVisible } from '@/hooks/useKeyboardVisible';
import { useRouter } from 'expo-router';

const Register = () => {
  const router = useRouter();
  const isKeyboardVisible = useKeyboardVisible();

  return (
    <RegisterScreen
      router={router}
      isKeyboardVisible={isKeyboardVisible}
    />
  );
};

export default Register;
