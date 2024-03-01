import React from 'react';
import {
	View,
	Skeleton,
	VStack,
	Center,
	NativeBaseProvider
} from 'native-base';
const Example = () => {
	return (
		<Center w='350'>
			<VStack
				w='40%'
				h={210}
				maxW='400'
				//	borderWidth='1'

				space={3.5}
				rounded='md'
				_dark={{
					borderColor: 'coolGray.500'
				}}
				_light={{
					borderColor: 'coolGray.200'
				}}
				//bg='rgba(255,255,0,0.2)'
			>
				<View
					h={120}
					borderRadius={15}
					bg='#f1f1f1'></View>
				<View
					h={3}
					w={60}
					borderRadius={5}
					bg='#f1f1f1'></View>
				<View
					h={3}
					w={30}
					borderRadius={5}
					bg='#f1f1f1'></View>
				<View
					h={3}
					w={20}
					borderRadius={5}
					bg='#f1f1f1'></View>

				{/*<Skeleton
                    px='4'
                    my='4'
                    rounded='md'
                    startColor='primary.100'
                    marginBottom={3}
                />*/}
			</VStack>
		</Center>
	);
};

const Placeholder = ({
	bottom,
	top,
	left,
	right,
	marginLeft,
	marginRight,
	marginTop,
	marginBottom
}) => {
	return (
		<NativeBaseProvider>
			<Center
				flex={1}
				px='3'
				top={top}
				left={left}
				right={right}
				bottom={bottom}
				marginBottom={marginBottom}
				marginTop={marginTop}
				marginLeft={marginLeft}
				marginRight={marginRight}>
				<Example />
			</Center>
		</NativeBaseProvider>
	);
};
export { Placeholder };
