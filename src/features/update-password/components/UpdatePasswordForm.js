import React from 'react'
import PropTypes from 'prop-types'
import {
  VStack,
  FormControl,
  Input,
  Button,
  Icon,
  Center
} from 'native-base'
import {
  useFormik
} from 'formik'
import * as Yup from 'yup'
import {
  MaterialIcons,
  FontAwesome
} from "@expo/vector-icons";


const validationSchema = Yup.object({
  password: Yup.string().required().min(6),
  passwordConfirmation: Yup.string()
  .oneOf([Yup.ref('password'), null])
  .required(),
})

export const UpdatePasswordForm = ({
  isLoading, onSubmit
}) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors
  } =
  useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: (formValues) => {
      // Call your onSubmit function here and pass 'formValues' as an argument
      onSubmit(formValues);
    },
  })

  return (
    <VStack space={4} alignItems="center" w="100%">
      <FormControl
      isRequired
      isInvalid={touched.password && errors.password}
      >
        <FormControl.Label marginTop="13%">New password</FormControl.Label>
        <Input
        autoCapitalize="none"
        secureTextEntry
        autoCorrect={false}
        autoCompleteType="password"
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        value={values.password}
        InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
        placeholder="password"
        variant="filled"
        />
      </FormControl>

      <FormControl
      isRequired
      isInvalid={touched.passwordConfirmation && errors.passwordConfirmation}
      >
        <FormControl.Label marginTop="4%">Confirm new password</FormControl.Label>
        <Input
        autoCapitalize="none"
        secureTextEntry
        autoCorrect={false}
        autoCompleteType="password"
        onBlur={handleBlur('passwordConfirmation')}
        onChangeText={handleChange('passwordConfirmation')}
        value={values.passwordConfirmation}
        InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />}
        placeholder="confirm password"
        variant="filled"
        />
      </FormControl>

      <Button marginTop="7%" colorScheme="secondary" variant="outline" onPress={handleSubmit} isLoading={isLoading}>
        Update password
      </Button>
    </VStack>
  )
}

UpdatePasswordForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}