import React from 'react'
import PropTypes from 'prop-types'
import {
  Center,
  VStack,
  Text,
  extendTheme,
  NativeBaseProvider,
  Box
} from 'native-base'
import {
  usePasswordReset
} from '../hooks/use-password-reset'
import {
  ErrorMessage
} from '../../../components/ErrorMessage'
import {
  EmailForm
} from '../components/EmailForm'

export const ForgotPasswordScreen = ({
  navigation
}) => {
  const [sendPasswordReset,
    {
      isLoading,
      error
    }] = usePasswordReset()

  const handlePasswordReset = async (values) => {
    try {
      await sendPasswordReset(values)
      navigation.navigate('SignIn')
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <NativeBaseProvider style={ { backgroundColor: "a0a0a0" }}>
      <Center flex={1} style={ { backgroundColor: "a0a0a0" }}>
        <VStack space={4} alignItems="center" w="90%">
          <Box
      p={6}
      style={ { backgroundColor: "rgba(255, 255, 255, 0.6)" }}
      borderRadius={15}
      backdropFilter="blur(5px)"
      width="85%"  // Menyesuaikan lebar kotak
      >

        <Text marginBottom="15%" color="#a0a0a0">
          Please, enter your email address. You will receive link to create a
          new password via email.
        </Text>
        <ErrorMessage error={error} />
        <EmailForm onSubmit={handlePasswordReset} isLoading={isLoading} />
       </Box>
      </VStack>
    </Center>
  </NativeBaseProvider>
  )
}

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}