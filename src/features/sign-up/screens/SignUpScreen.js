import React, { useState, useEffect } from 'react';

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
import { useSignUp } from '../hooks/use-sign-up';
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

export const SignUpScreen = () => {
	const [signUp, { isLoading, error }] = useSignUp();
	const [msg, setMsg] = useState('');

	return (
		<NativeBaseProvider style={{ backgroundColor: 'a0a0a0' }}>
			<Center
				flex={1}
				style={{ backgroundColor: 'a0a0a0' }}>
				<VStack
					space={2}
					alignItems='center'
					w={330}
					top={5}>
					<View
						p={5}
						style={{
							backgroundColor: 'rgba(255, 255, 255, 0.8)',
							position: 'relative'
						}}
						borderRadius={15}
						backdropFilter='blur(5px)'
						width={335}
						// Menyesuaikan lebar kotak
					>
						<Text
							fontSize='3xl'
							style={{ color: '#a0a0a0' }}
							mb={4}
							fontWeight='bold'>
							{' '}
							{/* Menyesuaikan ukuran font dan gaya */}
							Create account
						</Text>

						{error ? (
							<View
								position='relative'
								h={10}>
								<ErrorMessage error={error} />
							</View>
						) : (
							<></>
						)}

						<EmailAndPasswordForm
							onSubmit={signUp}
							isLoading={isLoading}
							withPasswordConfirmation={true}
							withInformation={true}
						/>
					</View>
				</VStack>
			</Center>
		</NativeBaseProvider>
	);
};
