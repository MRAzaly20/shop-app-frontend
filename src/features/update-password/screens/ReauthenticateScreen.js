import React from 'react'
import PropTypes from 'prop-types'
import {
  VStack,
  Center,
  extendTheme,
  NativeBaseProvider,
  Box
} from 'native-base'
import {
  useReauthenticate
} from '../hooks/use-reauthenticate'
import {
  ErrorMessage
} from '../../../components/ErrorMessage'
import {
  EmailAndPasswordForm
} from '../../../components/EmailAndPasswordForm'

export const ReauthenticateScreen = ({
  navigation
}) => {
  const [reAuthenticate,
    {
      isLoading,
      error
    }] = useReauthenticate()

  const handleReauthenticate = async (values) => {
    try {
      await reAuthenticate(values)
      navigation.navigate('UpdatePassword')
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
        <ErrorMessage error={error} />
        <EmailAndPasswordForm
        onSubmit={handleReauthenticate}
        isLoading={isLoading}
        buttonText="Re-authenticate"
        />
       </Box>
      </VStack>
    </Center>
  </NativeBaseProvider>
  )
}

ReauthenticateScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}