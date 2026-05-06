import ThemedButton from '@/theme/components/ThemedButton'
import ThemedDivider from '@/theme/components/ThemedDivider'
import ThemedInput from '@/theme/components/ThemedInput'
import ThemedPhoneInput from '@/theme/components/ThemedPhoneInput'
import ThemedText from '@/theme/components/ThemedText'
import { RegisterViewProps } from '@/types/types'
import { Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RegisterScreen = (RegisterParams: RegisterViewProps) => {
  return (
    <SafeAreaView className={`flex-1 items-center pb-28 px-6 bg-white ${!RegisterParams.isKeyboardVisible ? 'justify-between' : ''}`}>
      {!RegisterParams.isKeyboardVisible && <Image
        source={require('../../../assets/logo/myownmoney_logo.png')}
        style={{ width: '40%', height: '40%' }}
        resizeMode="contain"
      />}
      <View className='w-full'>
        <ThemedInput
          leftIcon='person'
          placeholder='Full Name'
          containerClassName='w-full'
        />
        <ThemedInput
          leftIcon='mail'
          placeholder='Email Address'
          containerClassName='w-full'
        />
        <ThemedPhoneInput
          containerClassName='w-full'
        />
        <ThemedInput
          leftIcon='lock-closed-sharp'
          placeholder='Password'
          containerClassName='w-full'
        />
        <ThemedInput
          leftIcon='lock-closed-sharp'
          placeholder='Confirm Password'
          containerClassName='w-full'
        />
      </View>
      <ThemedButton
        title='Register'
        containerClassName='w-full'
      />
      <ThemedDivider label='or continue with' />
      <ThemedButton
        title='Register with Google'
        variant='outline'
        leftIcon='logo-google'
        textClassName='text-gray-700'
        containerClassName='w-full'
      />
      <View className="mt-4 flex-row justify-center items-center">
        <ThemedText className="text-l text-gray-500">
          Already have an account?{' '}
        </ThemedText>
        <ThemedButton
          title="Login"
          variant="ghost"
          weight="medium"
          onPress={() => RegisterParams.router.replace('/login')}
          containerClassName="self-start py-1"
          textClassName="text-l text-primary"
        />
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen