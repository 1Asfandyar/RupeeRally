import LoginScreen from "@/feature/auth/screens/LoginScreen"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const Login = () => {
  const router = useRouter()
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  
  return (
    <LoginScreen
      router={router}
      isKeyboardVisible={isKeyboardVisible}
    />
  )
}

export default Login
