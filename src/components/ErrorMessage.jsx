import React from 'react';
import PropTypes from 'prop-types';
import {
	Stack,
	Alert,
	IconButton,
	HStack,
	VStack,
	CloseIcon,
	Text,
	Center,
	NativeBaseProvider,
	View
} from 'native-base';

const ErrorCode = ({ status, title }) => {
	return (
		<Alert
			w='100%'
			status={status}
			justifyContent='center'
			alignItems='center'>
			<HStack
				space={2}
				justifyContent='center'
				alignItems='center'>
				<Alert.Icon mt='1' />
				<HStack
					space={2}
					flexShrink={1}>
					<Text
						fontSize='sm'
						color='coolGray.800'>
						{title}
					</Text>
				</HStack>
			</HStack>
		</Alert>
	);
};

const ErrorMessage = ({ error }) => {
	if (!error) return '';

	return (
		<NativeBaseProvider>
			<Center
				flex={1}
				px='3'>
				<ErrorCode
					status='error'
					title={error}
				/>
			</Center>
		</NativeBaseProvider>
	);
};

export { ErrorMessage };
