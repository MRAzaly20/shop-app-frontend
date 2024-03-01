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
				w='90%'
				h={200}
				maxW='400'
				bg='rgba(255,255,255,.3)'
				borderWidth='1'
				space={2}
				overflow='hidden'
				rounded='md'
				_dark={{
					borderColor: 'coolGray.500'
				}}
				_light={{
					borderColor: 'coolGray.200'
				}}>
				<View h={20}>
					<Skeleton h={20} />
				</View>
				<Skeleton.Text
					px='4'
					marginTop={6}
				/>
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

const SkeletonCard = ({
	bottom,
	top,
	left,
	right,
	marginBottom,
	marginLeft,
	marginRight,
	marginTop
}) => {
	return (
		<NativeBaseProvider>
			<Center
				flex={1}
				px='3'
				bottom={bottom}
				top={top}
				left={left}
				right={right}
				marginBottom={marginBottom}
				marginLeft={marginLeft}
				marginRight={marginRight}
				marginTop={marginTop}>
				<Example />
			</Center>
		</NativeBaseProvider>
	);
};
export { SkeletonCard };
