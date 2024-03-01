import React, { useRef } from 'react';
import {
	VStack,
	Center,
	Heading,
	Text,
	Button,
	Icon,
	HStack
} from 'native-base';
import { useSendVerification } from '../hooks/use-send-verification';
import { useUserContext } from '../../../context/UserContext';
import { useSignOut } from '../../../hooks/use-sign-out';
import LottieView from 'lottie-react-native';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

export const VerifyEmailScreen = () => {
	const { reload: reloadUser, isLoading: isReloadingUser } = useUserContext();
	const animation = useRef();
	const [sendVerification, { isLoading: isResendingVerification }] =
		useSendVerification();
	const [signOut, { isLoading: isSigninOut }] = useSignOut();

	return (
		<Center
			flex={1}
			bg='#eee'>
			<LottieView
				autoPlay
				ref={animation}
				style={{
					width: 10,
					height: 200,
					backgroundColor: '#eee'
				}}
				top={-80}
				// Find more Lottie files at https://lottiefiles.com/featured
				source={require('../../../components/Lottie/EmailLottie.json')}
			/>
			<VStack
				space={4}
				alignItems='center'
				w='90%'
				marginTop={-20}>
				<Heading>Check your email</Heading>
				<Text color='#a0a0a0'>
					We sent you an email with instructions on how to verify your
					email address. To secure your account, please verify your
					email by clicking
				</Text>
			</VStack>
			<HStack
				space={4}
				alignItems='center'
				w='90%'
				marginTop={5}
				marginLeft='40%'>
				<Button
					endIcon={
						<Icon
							as={Ionicons}
							name='checkbox-outline'
							size='sm'
						/>
					}
					onPress={reloadUser}
					variant='outline'
					colorScheme='success'
					isLoading={isReloadingUser}>
					Done
				</Button>
				<Button
					onPress={signOut}
					isLoading={isSigninOut}
					variant='outline'
					colorScheme='secondary'
					endIcon={
						<Icon
							as={Ionicons}
							name='close'
							size='sm'
						/>
					}>
					Cancel
				</Button>
			</HStack>
			<VStack
				space={7}
				alignItems='space-beetwen'
				w='70%'
				marginTop={5}
				backgroundColor='#fff'
				borderRadius={10}
				h={110}>
				<Text
					left={6}
					marginTop={2}
					color='#a0a0a0'>
					Didn't receive the verification email?
				</Text>
				<Button
					onPress={sendVerification}
					marginTop='10%'
					bottom={8}
					marginLeft={5}
					//marginTop={5}
					marginRight={5}
					variant='outline'
					colorScheme='primary'
					isLoading={isResendingVerification}
					endIcon={
						<Icon
							as={FontAwesome}
							name='send-o'
							size='sm'
						/>
					}>
					Resend Email
				</Button>
			</VStack>
		</Center>
	);
};

// const Example = () => {
//   return <Stack direction={{
//     base: "column",
//     md: "row"
//   }} space={4}>
//       <Button leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}>
//         Upload
//       </Button>
//       <Button variant="subtle" endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}>
//         Download
//       </Button>
//     </Stack>;
// };
