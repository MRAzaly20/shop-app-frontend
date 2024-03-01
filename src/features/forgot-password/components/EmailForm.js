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
  email: Yup.string().email().required(),
})

export const EmailForm = ({
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
      email: ''
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
      isInvalid={touched.email && errors.email}
      >
        <FormControl.Label style={ { color: "#a0a0a0" }}>Email</FormControl.Label>
        <Input
        autoCapitalize="none"
        keyboardType="email-address"
        onBlur={handleBlur('email')}
        onChangeText={handleChange('email')}
        value={values.email}
        variant="filled"
        InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5}
          ml="2" color="muted.400" />}
        />
      </FormControl>

      <Button
      variant="outline"
      colorScheme="success"
      onPress={handleSubmit}
      isLoading={isLoading}
      endIcon={<Icon as={FontAwesome}
        name="send-o"
        size="sm" />}
      >
        send email
      </Button>
    </VStack>
  )
}

EmailForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}