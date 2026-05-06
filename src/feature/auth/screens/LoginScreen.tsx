import ThemedButton from '@/theme/components/ThemedButton'
import ThemedDivider from '@/theme/components/ThemedDivider'
import ThemedInput from '@/theme/components/ThemedInput'
import ThemedText from '@/theme/components/ThemedText'
import { themeColors } from '@/theme/utilities'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {
  return (
    <SafeAreaView className='flex-1 items-center justify-between py-44 px-6 bg-white'>
      <ThemedText className='text-4xl' weight='bold'>Login to My Own Money</ThemedText>
      <ThemedButton
        title='Login with Google'
        variant='outline'
        leftIcon='logo-google'
        textClassName='text-gray-700'
        containerClassName='w-full'
      />
      <ThemedDivider label='or continue with' />
      <View className='w-full'>
        <ThemedInput
            leftIcon='mail'
            placeholder='Email Address'
            containerClassName='w-full'
        />
        <ThemedInput
            leftIcon='lock-closed-sharp'
            placeholder='Password'
            containerClassName='w-full'
        />
        <ThemedButton
            title='Forgot Password?'
            variant='ghost'
            textClassName={themeColors.primary}
            containerClassName='self-end'
        />
      </View>
      <ThemedButton
        title='Login'
        containerClassName='w-full'
      />
    </SafeAreaView>
  )
}

export default LoginScreen
