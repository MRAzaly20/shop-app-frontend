import React from 'react';
import PropTypes from 'prop-types';
import { HStack, VStack, FormControl, Input, Icon, Button } from 'native-base';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MaterialIcons } from '@expo/vector-icons';

const buildValidationSchema = (withPasswordConfirmation, withInformation) =>
	Yup.object({
		email: Yup.string().email().required(),
		password: Yup.string().required().min(6),
		...(withPasswordConfirmation && {
			passwordConfirmation: Yup.string()
				.oneOf([Yup.ref('password'), null])
				.required()
		}),
		...(withInformation && {
			provinceConfirmation: Yup.string().required(),
			cityConfirmation: Yup.string().required(),
			domicileConfirmation: Yup.string().required(),
			postConfirmation: Yup.string().required()
		})
	});

export const EmailAndPasswordForm = ({
	buttonText = 'Create account',
	isLoading,
	onSubmit,
	withPasswordConfirmation = false,
	withInformation = false
}) => {
	const { handleChange, handleBlur, handleSubmit, values, touched, errors } =
		useFormik({
			initialValues: {
				email: '',
				password: '',
				...(withPasswordConfirmation && {
					passwordConfirmation: ''
				}),
				...(withInformation && {
					provinceConfirmation: '',
					cityConfirmation: '',
					domicileConfirmation: '',
					postConfirmation: ''
				})
			},
			validationSchema: buildValidationSchema(
				withPasswordConfirmation,
				withInformation
			),
			onSubmit: values => {
				// Call your onSubmit function here and pass 'values' as an argument
				onSubmit(values);
			}
		});

	return (
		<VStack
			space={4}
			alignItems='center'
			w='100%'>
			<FormControl
				isRequired
				isInvalid={touched.email && errors.email}>
				<FormControl.Label>Email</FormControl.Label>
				<Input
					autoCapitalize='none'
					keyboardType='email-address'
					onBlur={handleBlur('email')}
					onChangeText={handleChange('email')}
					value={values.email}
					InputLeftElement={
						<Icon
							as={<MaterialIcons name='email' />}
							size={5}
							ml='2'
							color='muted.400'
						/>
					}
					placeholder='email'
					variant='filled'
				/>
			</FormControl>

			<FormControl
				isRequired
				isInvalid={touched.password && errors.password}>
				<FormControl.Label>Password</FormControl.Label>
				<Input
					autoCapitalize='none'
					secureTextEntry
					autoCorrect={false}
					autoCompleteType='password'
					onBlur={handleBlur('password')}
					onChangeText={handleChange('password')}
					value={values.password}
					InputLeftElement={
						<Icon
							as={<MaterialIcons name='lock' />}
							size={5}
							ml='2'
							color='muted.400'
						/>
					}
					placeholder='password'
					variant='filled'
				/>
			</FormControl>

			{withPasswordConfirmation && (
				<FormControl
					isRequired
					isInvalid={
						touched.passwordConfirmation &&
						errors.passwordConfirmation
					}>
					<FormControl.Label>Confirm password</FormControl.Label>
					<Input
						autoCapitalize='none'
						secureTextEntry
						autoCorrect={false}
						autoCompleteType='password'
						onBlur={handleBlur('passwordConfirmation')}
						onChangeText={handleChange('passwordConfirmation')}
						value={values.passwordConfirmation}
						InputLeftElement={
							<Icon
								as={<MaterialIcons name='lock' />}
								size={5}
								ml='2'
								color='muted.400'
							/>
						}
						placeholder='confirm password'
						variant='filled'
					/>
				</FormControl>
			)}
			{withInformation && (
				<>
					<HStack space={2}>
						<FormControl
							w='50%'
							isRequired
							isInvalid={
								touched.provinceConfirmation &&
								errors.provinceConfirmation
							}>
							<FormControl.Label>Province</FormControl.Label>
							<Input
								autoCapitalize='none'
								autoCorrect={false}
								onBlur={handleBlur('provinceConfirmation')}
								onChangeText={handleChange(
									'provinceConfirmation'
								)}
								value={values.provinceConfirmation}
								InputLeftElement={
									<Icon
										as={<MaterialIcons name='place' />}
										size={5}
										ml='2'
										color='muted.400'
									/>
								}
								placeholder='Province'
								variant='filled'
							/>
						</FormControl>

						<FormControl
							w='50%'
							isRequired
							isInvalid={
								touched.cityConfirmation &&
								errors.cityConfirmation
							}>
							<FormControl.Label>City</FormControl.Label>
							<Input
								autoCapitalize='none'
								autoCorrect={false}
								autoCompleteType='password'
								onBlur={handleBlur('cityConfirmation')}
								onChangeText={handleChange('cityConfirmation')}
								value={values.cityConfirmation}
								InputLeftElement={
									<Icon
										as={<MaterialIcons name='pin-drop' />}
										size={5}
										ml='2'
										color='muted.400'
									/>
								}
								placeholder='City'
								variant='filled'
							/>
						</FormControl>
					</HStack>
					<HStack space={2}>
						<FormControl
							w='50%'
							isRequired
							isInvalid={
								touched.domicileConfirmation &&
								errors.domicileConfirmation
							}>
							<FormControl.Label>
								Residence address{' '}
							</FormControl.Label>
							<Input
								autoCapitalize='none'
								autoCorrect={false}
								onBlur={handleBlur('domicileConfirmation')}
								onChangeText={handleChange(
									'domicileConfirmation'
								)}
								value={values.domicileConfirmation}
								InputLeftElement={
									<Icon
										as={<MaterialIcons name='approval' />}
										size={5}
										ml='2'
										color='muted.400'
									/>
								}
								placeholder='Address'
								variant='filled'
							/>
						</FormControl>

						<FormControl
							w='50%'
							isRequired
							isInvalid={
								touched.postConfirmation &&
								errors.postConfirmation
							}>
							<FormControl.Label>Postal Code</FormControl.Label>
							<Input
								autoCapitalize='none'
								autoCorrect={false}
								autoCompleteType='password'
								onBlur={handleBlur('postConfirmation')}
								onChangeText={handleChange('postConfirmation')}
								value={values.postConfirmation}
								InputLeftElement={
									<Icon
										as={<MaterialIcons name='near-me' />}
										size={5}
										ml='2'
										color='muted.400'
									/>
								}
								placeholder='Postal Code'
								variant='filled'
							/>
						</FormControl>
					</HStack>
				</>
			)}

			<Button
				onPress={handleSubmit}
				isLoading={isLoading}
				size='lg' // Mengatur ukuran tombol
				colorScheme='teal' // Mengatur warna latar belakang
				_hover={{ backgroundColor: 'teal.500' }} // Efek hover
				_pressed={{ backgroundColor: 'teal.700' }} // Efek saat tombol ditekan
				_text={{ color: 'white' }} // Mengatur warna teks
				w={180}
				h={45}>
				{buttonText}
			</Button>
		</VStack>
	);
};

EmailAndPasswordForm.propTypes = {
	buttonText: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	withPasswordConfirmation: PropTypes.bool,
	withInformation: PropTypes.bool
};
