import React from 'react'
import PropTypes from 'prop-types'
import {
  VStack,
  FormControl,
  Input,
  Button,
  Icon,
  Center,
  NativeBaseProvider,
  Box
} from 'native-base'
import {
  MaterialIcons,
  FontAwesome
} from "@expo/vector-icons";
import {
  useUpdatePassword
} from '../hooks/use-update-password'
import {
  ErrorMessage
} from '../../../components/ErrorMessage'
import {
  UpdatePasswordForm
} from '../components/UpdatePasswordForm'

export const UpdatePasswordScreen = ({
  navigation
}) => {
  const [updatePassword,
    {
      isLoading,
      error
    }] = useUpdatePassword()

  const handleUpdatePassword = async (values) => {
    try {
      await updatePassword(values)
      navigation.popToTop()
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
        <UpdatePasswordForm
        onSubmit={handleUpdatePassword}
        isLoading={isLoading}
        />
       </Box>
      </VStack>
    </Center>
  </NativeBaseProvider>
  )
}

UpdatePasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}