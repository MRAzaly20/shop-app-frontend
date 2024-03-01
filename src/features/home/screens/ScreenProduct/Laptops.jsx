import React, {
	useEffect,
	useState,
	useMemo,
	useReducer,
	useCallback
} from 'react'; // Perbaikan impor useCallback
import PropTypes from 'prop-types';
import {
	Input,
	VStack,
	Center,
	Heading,
	Button,
	Text,
	HStack,
	IconButton,
	Icon,
	ScrollView,
	NativeBaseProvider,
	View
	// ... other imports
} from 'native-base';
// import { useUserContext } from "../../../../context/UserContext";
// import { useSignOut } from "../../../../hooks/use-sign-out";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ImageBackground, FlatList } from 'react-native';
import CardUser from '../Elements/CardUser';
import CardInfo from '../Elements/CardInfo';
import { CarouselFull } from './Elements/CarouselFull';
import { SkeletonCard } from './Elements/SkeletonCard';
import { Placeholder } from '../Elements/Placeholder';
import { LinearGradient } from 'expo-linear-gradient';
const backgroundImage = require('../../../../../assets/bg_.jpg');
const logo = {
	uri: 'https://reactnative.dev/img/tiny_logo.png',
	width: 64,
	height: 64
};

// Fungsi untuk mengacak array
const shuffle = array => {
	// Check if array is defined and has length property
	if (!array || !array.length) {
		// Return empty array or skip shuffle function
		return [];
	}
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex]
		];
	}

	return array;
};

export const LaptopsProduct = ({ navigation }) => {
	// const { user } = useUserContext();
	//     const [signOut, { isLoading }] = useSignOut();
	const [productState, setProductState] = useState({
		laptops: [],
		smartphones: [],
		all: [],
		dynamic: {},
		page: 1,
		totalPages: {}
	});
	const [isHovered, setIsHovered] = useState(false);
	const [carouselItems, setCarouselItems] = useState([]);
	const [phones, setPhones] = useState([]);
	const [laptops, setLaptops] = useState([]);

	const handlePressIn = useCallback(() => {
		setIsHovered(true);
	}, []);

	const handlePressOut = useCallback(() => {
		setIsHovered(false);
	}, []);

	const sortedProducts = useMemo(() => {
		return productState.all
			? [...productState.all].sort((a, b) => a.price - b.price)
			: [];
	}, [productState.all]);

	const fetchDiscount = async () => {
		try {
			const response = await fetch(
				'https://dummyjson.com/products/category/automotive'
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			//console.log(data.products);
			console.log(shuffle(data.products));
			return shuffle(data.products); // Shuffle the data using your shuffle function
		} catch (error) {
			console.error('Error fetching smartphones:', error.message);
			return [];
		}
	};

	const fetchSmartphones = async () => {
		try {
			const response = await fetch(
				'https://dummyjson.com/products/category/smartphones'
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			//console.log(data.products);
			console.log(shuffle(data.products));

			setPhones(data.products); // Shuffle the data using your shuffle function
		} catch (error) {
			console.error('Error fetching smartphones:', error.message);
			return [];
		}
	};

	const fetchLaptops = async () => {
		try {
			const response = await fetch(
				'https://dummyjson.com/products/category/laptops'
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			//console.log(data.products);
			console.log(shuffle(data.products));

			setLaptops(data.products); // Shuffle the data using your shuffle function
		} catch (error) {
			console.error('Error fetching smartphones:', error.message);
			return [];
		}
	};

	const fetchData = useCallback(async () => {
		try {
			const shuffledSmartphones = await fetchDiscount();
			setProductState(prevState => ({
				...prevState,
				smartphones: shuffledSmartphones,
				all: [...prevState.laptops, ...shuffledSmartphones]
			}));

			//console.log(shuffledSmartphones);
			setCarouselItems(shuffledSmartphones);
		} catch (error) {
			console.error('Error fetching data:', error.message);
		}
	}, [setProductState, setCarouselItems]);

	useEffect(() => {
		fetchData();
		fetchDiscount();
		fetchSmartphones();
		fetchLaptops();
	}, [fetchData]);
	// console.log(carouselItems);
	const items = [
		{
			id: 1,
			title: 'React JS',
			thumbnail:
				'https://icon-library.com/images/react-icon/react-icon-29.jpg'
		},
		{
			id: 2,
			title: 'JavaScript',
			thumbnail:
				'https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png'
		},
		{
			id: 3,
			title: 'Node JS',
			thumbnail:
				'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png'
		}
	];

	const handleCustomPress = useCallback(
		product => {
			navigation.navigate('LayarLain', { ...product });
		},
		[navigation]
	);
	const LoadingBar = () => {
		//console.log(1828);
		return (
			<HStack space={1}>
				<Placeholder marginTop={15} />
				<Placeholder marginTop={15} />
			</HStack>
		);
	};
	// const userName = user.email.split("@")[0];
	const CardInfoProduct = () => {
		return (
			<VStack
				space={2}
				marginLeft='5.3%'>
				<HStack space={0}>
					<CardInfo
						imageSource={
							'https://i.dummyjson.com/data/products/5/thumbnail.jpg'
						}
						title={'Phones'}
					/>
					<CardInfo
						imageSource={
							'https://i.dummyjson.com/data/products/10/1.jpg'
						}
						title={'Laptops'}
					/>
					<CardInfo
						imageSource={
							'https://i.dummyjson.com/data/products/45/thumbnail.jpg'
						}
						title={'Fashion'}
					/>
					<CardInfo
						imageSource={
							'https://i.dummyjson.com/data/products/17/3.jpg'
						}
						title={'Skincare'}
					/>
				</HStack>
			</VStack>
		);
	};
	//console.log(productState.all);f

	return (
		<Center flex={1}>
			<ImageBackground
				source={backgroundImage} // Menambahkan gambar latar belakang
				style={{ flex: 1, width: 360, height: 820 }}>
				<VStack
					space={4}
					alignItems='center'
					w='100%'
					h={800}>
					<HStack
						alignItems='center'
						alignContent='center'
						justifyItems='center'
						justifyContent='center'
						space={1}
						w='100%'
						h={6}
						style={{
							position: 'fixed',
							marginLeft: '6%',
							marginTop: 50
						}}>
						<Input
							InputLeftElement={
								<Icon
									as={<MaterialIcons name='search' />}
									size={5}
									ml='2'
									color='muted.400'
								/>
							}
							_light={{
								bg: '#fff',
								_hover: {
									bg: '#fff'
								},
								_focus: {
									bg: '#fff'
								}
							}}
							placeholder='search product'
							w='50%'
							h={10}
							fontSize={15}
							marginRight={2}
							left={-10}
							borderRadius={10}
						/>
						<IconButton
							size={8}
							icon={
								<Icon
									size={6}
									color='#fff'
									as={MaterialCommunityIcons}
									name='email'
								/>
							}
						/>
						<IconButton
							size={8}
							icon={
								<Icon
									size={6}
									color='#fff'
									as={MaterialCommunityIcons}
									name='bell'
								/>
							}
						/>
						<IconButton
							size={8}
							icon={
								<Icon
									size={6}
									color='#fff'
									as={MaterialCommunityIcons}
									name='cart'
								/>
							}
						/>
						<IconButton
							size={8}
							icon={
								<Icon
									size={6}
									color='#fff'
									as={MaterialIcons}
									name='menu'
								/>
							}
						/>
					</HStack>
					{/* Ganti user.email dengan userName */}
					{/* <Heading>Hello, {userName}</Heading>*/}
					<View
						alignItems='center'
						justifyContent='center'
						h={605}>
						{/*	<ScrollView w='100%'>
						   	{carouselItems.length > 0 ? (
						   		<CarouselCard
						   			top={200}
						   			items={carouselItems}
						   			marginLeft={15}
						   			marginRight={15}
						   		/>
						   	) : (
						   		<SkeletonCard bottom={180} />
						   	)}

							<LinearGradient
								colors={['purple', 'white']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
								style={{
									position: 'absolute',
									top: 30,
									left: 15,
									right: 0,

									alignItems: 'center',
									justifyContent: 'center',
									marginRight: '40%',
									width: '40%',
									height: '5%',
									borderWidth: 1,
									borderColor: '#fff',
									borderRadius: 50
								}}>
								<Text
									fontWeight='bold'
									color='#000'>
									Smartphone
								</Text>
							</LinearGradient>
						</ScrollView>*/}

						<ScrollView
							w='100%'
							h='200'>
							<View
								w='100%'
								h='auto'
								bg='rgba(255,255,255,0.4)'>
								{carouselItems.length > 0 ? (
									<CarouselFull
										top={-5}
										items={carouselItems}
										marginLeft={15}
										marginRight={15}
									/>
								) : (
									<SkeletonCard
										top={5}
										marginBottom={10}
									/>
								)}
							</View>
							{laptops.length > 0 ? (
								<View>
									<VStack
										marginTop={5}
										w='100%'
										h='auto'
										//	bg='rgba(255,255,255,0.4)'
										borderTopLeftRadius={10}
										justifyContent='flex-start'
										alignItems='flex-start'
										borderBottomRightRadius={10}>
										<LinearGradient
											colors={[
												'green',
												'yellow',
												'white'
											]}
											start={{ x: 0, y: 0 }}
											end={{ x: 1, y: 1.5 }}
											style={{
												right: 0,
												marginTop: 6,
												alignItems: 'center',
												justifyContent: 'center',

												width: '65%',
												height: 45,
												//	borderWidth: 1,
												borderColor: '#fff',
												borderRadius: 15
											}}>
											<Text
												fontWeight='bold'
												fontSize={20}
												color='#000'>
												Diskon hari ini 🥳
											</Text>
										</LinearGradient>
									</VStack>
									<VStack
										marginTop={5}
										w='100%'
										h='auto'
										bg='rgba(255,255,255,0.4)'
										borderTopLeftRadius={15}
										borderBottomRightRadius={15}>
										<ScrollView
											borderRadius={30}
											horizontal
											nestedScrollEnabled>
											<HStack
												marginLeft={4}
												marginRight={4}>
												{laptops.map(product => (
													<CardUser
														key={product.id}
														imageSource={
															product.thumbnail
														}
														title={product.title}
														price={product.price}
														rate={product.rating}
														stock={product.stock}
														onPressCard={() => {
															handleCustomPress(
																product
															);

															console.log(
																product
															);
														}}
														discountPercentage={
															product.discountPercentage
														}
													/>
												))}
											</HStack>
										</ScrollView>
									</VStack>
								</View>
							) : (
								<LoadingBar />
							)}
							{phones.length > 0 ? (
								<View>
									<VStack
										marginTop={5}
										w='100%'
										h='auto'
										//	bg='rgba(255,255,255,0.4)'
										borderTopLeftRadius={10}
										justifyContent='flex-start'
										alignItems='flex-start'
										borderBottomRightRadius={10}>
										<LinearGradient
											colors={[
												'green',
												'yellow',
												'white'
											]}
											start={{ x: 0, y: 0 }}
											end={{ x: 1, y: 1.5 }}
											style={{
												right: 0,
												marginTop: 6,
												alignItems: 'center',
												justifyContent: 'center',

												width: '65%',
												height: 45,
												//	borderWidth: 1,
												borderColor: '#fff',
												borderRadius: 15
											}}>
											<Text
												fontWeight='bold'
												fontSize={20}
												color='#000'>
												Disarankan untuk anda
											</Text>
										</LinearGradient>
									</VStack>
									<VStack
										marginTop={5}
										marginBottom={5}
										w='100%'
										h='auto'
										bg='rgba(255,255,255,0.4)'
										borderTopLeftRadius={15}
										borderBottomRightRadius={15}>
										<ScrollView
											borderRadius={30}
											horizontal
											nestedScrollEnabled>
											<HStack
												marginLeft={4}
												marginRight={4}>
												{phones.map(product => (
													<CardUser
														key={product.id}
														imageSource={
															product.thumbnail
														}
														title={product.title}
														price={product.price}
														rate={product.rating}
														stock={product.stock}
														onPressCard={() => {
															handleCustomPress(
																product
															);
															console.log(
																product
															);
														}}
														discountPercentage={
															product.discountPercentage
														}
													/>
												))}
											</HStack>
										</ScrollView>
									</VStack>
								</View>
							) : (
								<LoadingBar />
							)}
						</ScrollView>
					</View>

					<View
						alignItems='center'
						alignContent='center'
						justifyItems='center'
						justifyContent='center'
						borderTopRightRadius={20}
						borderTopLeftRadius={20}
						w='100%'
						h='8%'
						bg='rgba(0,0,0, .15)'
						style={{
							position: 'absolute',
							bottom: '5%',
							left: 0,
							right: 0
						}}>
						<HStack space={10}>
							<VStack
								alignItems='center'
								alignContent='center'
								justifyItems='center'
								justifyContent='center'
								space={1}>
								<IconButton
									size={6}
									icon={
										<Icon
											size={7}
											color='rgba(255,255,255, .7)'
											as={MaterialCommunityIcons}
											name='home'
										/>
									}
								/>
								<Text
									fontSize={12}
									color='rgba(255,255,255, .7)'>
									Home
								</Text>
							</VStack>
							<VStack
								alignItems='center'
								alignContent='center'
								justifyItems='center'
								justifyContent='center'
								space={1}>
								<IconButton
									size={6}
									icon={
										<Icon
											size={7}
											color='rgba(255,255,255, .7)'
											as={MaterialCommunityIcons}
											name='cards-heart-outline'
										/>
									}
								/>
								<Text
									fontSize={12}
									color='rgba(255,255,255, .7)'>
									Wishlist
								</Text>
							</VStack>
							<VStack
								alignItems='center'
								alignContent='center'
								justifyItems='center'
								justifyContent='center'
								space={1}>
								<IconButton
									size={6}
									icon={
										<Icon
											size={7}
											color='rgba(255,255,255, .7)'
											as={MaterialCommunityIcons}
											name='notebook-plus-outline'
										/>
									}
								/>
								<Text
									fontSize={12}
									color='rgba(255,255,255, .7)'>
									Transaction
								</Text>
							</VStack>
							<VStack
								alignItems='center'
								alignContent='center'
								justifyItems='center'
								justifyContent='center'
								space={1}>
								<IconButton
									size={6}
									icon={
										<Icon
											size={7}
											color='rgba(255,255,255, .7)'
											as={MaterialCommunityIcons}
											name='account'
										/>
									}
								/>
								<Text
									fontSize={12}
									color='rgba(255,255,255, .7)'>
									Account
								</Text>
							</VStack>
						</HStack>
					</View>
				</VStack>
			</ImageBackground>
		</Center>
	);
};

LaptopsProduct.propTypes = {
	navigation: PropTypes.object.isRequired
};
