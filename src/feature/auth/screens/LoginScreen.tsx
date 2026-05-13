import ThemedButton from '@/theme/components/ThemedButton'
import ThemedDivider from '@/theme/components/ThemedDivider'
import ThemedInput from '@/theme/components/ThemedInput'
import ThemedText from '@/theme/components/ThemedText'
import { LoginViewProps } from '@/types/types'
import { ROUTES } from '@/config/routes'
import { useLoginForm } from '@/feature/auth/hooks/useLoginForm'
import { Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = (LoginParams: LoginViewProps) => {
  const {
    values,
    fieldErrors,
    formError,
    isLoading,
    submit,
    updateField,
    validateField,
  } = useLoginForm(LoginParams.router)

  return (
    <SafeAreaView className={`flex-1 items-center pb-28 px-6 bg-white ${!LoginParams.isKeyboardVisible ? 'justify-between' : ''}`}>
      {!LoginParams.isKeyboardVisible && <Image
        source={require('../../../assets/logo/myownmoney_logo.png')}
        style={{ width: '40%', height: '40%' }}
        resizeMode="contain"
      />}
      <View className='w-full'>
        <ThemedInput
          leftIcon='mail'
          placeholder='Email Address'
          containerClassName='w-full'
          value={values.email}
          onChangeText={(value) => updateField('email', value)}
          onBlur={() => validateField('email')}
          autoCapitalize='none'
          keyboardType='email-address'
          autoComplete='email'
          textContentType='emailAddress'
          returnKeyType='next'
          error={fieldErrors.email}
        />
        <ThemedInput
          leftIcon='lock-closed-sharp'
          placeholder='Password'
          containerClassName='w-full'
          value={values.password}
          onChangeText={(value) => updateField('password', value)}
          onBlur={() => validateField('password')}
          secureTextEntry
          autoComplete='password'
          textContentType='password'
          returnKeyType='done'
          error={fieldErrors.password}
        />
        <ThemedButton
          title='Forgot Password?'
          variant='ghost'
          textClassName='text-primary'
          containerClassName='self-end'
          disabled
        />
      </View>
      {formError ? (
        <ThemedText className='w-full text-center text-sm text-red-500'>
          {formError}
        </ThemedText>
      ) : null}
      <ThemedButton
        title='Login'
        containerClassName='w-full'
        onPress={submit}
        loading={isLoading}
      />
      <ThemedDivider label='or continue with' />
      <ThemedButton
        title='Login with Google'
        variant='outline'
        leftIcon='logo-google'
        textClassName='text-gray-700'
        containerClassName='w-full'
        disabled
      />
      <View className="mt-4 flex-row justify-center items-center">
        <ThemedText className="text-l text-gray-500">
          Dont have an account?{' '}
        </ThemedText>
        <ThemedButton
          title="Register"
          variant="ghost"
          weight="medium"
          onPress={() => LoginParams.router.replace(ROUTES.AUTH_REGISTER)}
          containerClassName="self-start py-1"
          textClassName="text-l text-primary"
        />
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
