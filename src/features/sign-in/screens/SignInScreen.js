import React from 'react';
import PropTypes from 'prop-types';
import {
	Center,
	VStack,
	Button,
	Text,
	Input,
	extendTheme,
	NativeBaseProvider,
	Box,
	View,
	FormControl
} from 'native-base';
import { useSignIn } from '../hooks/use-sign-in';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { EmailAndPasswordForm } from '../../../components/EmailAndPasswordForm';

const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: 'linear-gradient(to right, #ff8888, #ff88ff)',
				backdropFilter: 'blur(10px)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
			}
		}
	}
});

export const SignInScreen = ({ navigation }) => {
	const [signIn, { isLoading, error }] = useSignIn();

	const handlePressOnForgotPassword = () => {
		navigation.navigate('ForgotPassword');
	};
	return (
		<NativeBaseProvider style={{ backgroundColor: 'a0a0a0' }}>
			<Center
				flex={1}
				style={{ backgroundColor: 'a0a0a0' }}>
				<VStack
					space={4}
					alignItems='center'
					w='90%'>
					<Box
						p={6}
						style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
						borderRadius={15}
						backdropFilter='blur(5px)'
						width='85%' // Menyesuaikan lebar kotak
					>
						<Text
							fontSize='3xl'
							style={{ color: '#a0a0a0' }}
							mb={4}
							fontWeight='bold'>
							{' '}
							{/* Menyesuaikan ukuran font dan gaya */}
							Sign In
						</Text>
						{error ? (
							<View
								position='relative'
								h={20}>
								<ErrorMessage error={error} />
							</View>
						) : (
							<></>
						)}
						<EmailAndPasswordForm
							onSubmit={signIn}
							isLoading={isLoading}
							buttonText='Sign in'
						/>
						<Button
							// Menyesuaikan ukuran tombol
							variant='outline' // Menggunakan varian outline
							onPress={handlePressOnForgotPassword}
							m={3}
							size='lg'
							width={180}
							left={3}>
							Forgot password
						</Button>
					</Box>
				</VStack>
			</Center>
		</NativeBaseProvider>
	);
};

SignInScreen.propTypes = {
	navigation: PropTypes.object.isRequired
};

export default SignInScreen;
