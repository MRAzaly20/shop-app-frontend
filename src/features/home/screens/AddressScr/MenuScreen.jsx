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
import { useUserContext } from '../../../../context/UserContext';
import { useSignOut } from '../../../../hooks/use-sign-out';
import * as styles from './style';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
	Image,
	ImageBackground,
	FlatList,
	TouchableOpacity
} from 'react-native';
import CardUser from '../Elements/CardUser';
import CardInfo from '../Elements/CardInfo';
import Placeholder from '../Elements/Placeholder';
import Menu from '../Elements/CardMenu';

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
export const ProductList = ({ data, navigation }) => {
	const [sortedProducts, setSortedProducts] = useState([]);
	const [showCardInfoProduct, setShowCardInfoProduct] = useState(true);

	const handleCustomPress = useCallback(
		product => {
			navigation.navigate('LayarLain', { ...product });
		},
		[navigation]
	);
	useEffect(() => {
		const fetchData = async () => {
			const groupedProducts = data.reduce((acc, product) => {
				const category = product.category;
				if (!acc[category]) {
					acc[category] = [];
				}
				acc[category].push(product);
				return acc;
			}, {});

			const allCategories = [
				...new Set(data.map(product => product.category))
			];
			const sortedArray = allCategories.map(category => ({
				category,
				products: shuffle(groupedProducts[category] || [])
			}));

			// Rendering bertahap
			requestAnimationFrame(() => {
				setSortedProducts(sortedArray);
			});
		};

		fetchData();
	}, [data]);

	return (
		<FlatList
			data={['CardInfo', ...sortedProducts]}
			keyExtractor={(item, index) =>
				item === 'CardInfo' ? item : index.toString()
			}
			renderItem={({ item, index }) => {
				if (item === 'CardInfo') {
					return <CardInfoProduct />;
				}
				// Implement logic for other items (if needed)
				return renderItem({ item, index });
			}}
		/>
	);
};
const apiUrl = 'http://localhost:3000/account/create/uid';

export const MenuScreen = ({ navigation }) => {
	const [jsonData, setJsonData] = useState([]);
	const { user } = useUserContext();
	const [signOut, { isLoading }] = useSignOut();
	console.log(user);
	const handlePressIn = useCallback(() => {
		setIsHovered(true);
	}, []);

	const handlePressOut = useCallback(() => {
		setIsHovered(false);
	}, []);

	const handleCustomPress = useCallback(
		product => {
			navigation.navigate('LayarLain', { ...product });
		},
		[navigation]
	);
	const requestData = {
		email: user.email,
		uid: user.uid
	};
	useEffect(() => {
		const UserID = async () => {
			try {
				const fetchResponse = await fetch(apiUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(requestData)
				});

				const Response = await fetchResponse.json();
				//console.log(data.products);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
	}, []);

	const userName = user.email.split('@')[0];
	//console.log(productState.dynamic)
	const handlePress = () => {
		// Tambahkan logika yang diinginkan saat komponen diklik
	};
	//console.log(productState.all);
	return (
		<Center flex={1}>
			<ImageBackground
				source={backgroundImage} // Menambahkan gambar latar belakang
				style={{ flex: 1, width: 360, height: 820 }}>
				<VStack
					space={4}
					alignItems='center'
					w='100%'>
					{/* Ganti user.email dengan userName */}
					{/* <Heading>Hello, {userName}</Heading>*/}
					<HStack
						bg='rgba(255,255,255, .6)'
						style={{ position: 'absolute', top: 50 }}
						justifyContent='center'
						alignItems='center'
						alignContent='center'
						space={10}
						w='95%'
						borderRadius={20}
						h={120}>
						<View
							justifyContent='center'
							alignItems='center'>
							<Image
								style={styles.userImg}
								source={{
									uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSyfNZAgsQx7NEJSq7Z2tboN7kezLOBgcYWA&usqp=CAU'
								}}
							/>
						</View>
						<VStack
							space={1}
							justifyContent='flex-start'
							alignItems='flex-start'
							w={220}
							marginRight={2}
							marginLeft={5}
							marginTop={2}>
							<Text style={styles.welcome}>Welcome</Text>
							<Text style={styles.userName}>{user.email}</Text>
							<TouchableOpacity
								// onPressIn={handlePressIn}
								// onPressOut={handlePressOut}
								// onPress={onPressCard}
								activeOpacity={0.7}
								style={styles.card}>
								<HStack
									justifyContent='center'
									alignItems='center'>
									<Image
										style={styles.iconStatus}
										source={require('../../../../../assets/gold-member.png')}
									/>
									<Text style={styles.title}>
										member gold
									</Text>
									<Text
										style={{
											fontWeight: 'bold',
											fontSize: 30,
											marginTop: 3,
											marginLeft: 4,
											marginRight: 3
										}}>
										›
									</Text>
								</HStack>
							</TouchableOpacity>
						</VStack>
					</HStack>

					<View
						w='100%'
						h='100%'
						display='column'
						alignItems='center'
						justifyContent='center'
						marginTop='50%'
						bg='rgba(255,255,255, .6)'
						borderWidth={2}
						borderColor='#fff'
						borderLeftRadius={30}
						borderRightRadius={30}
						style={{
							borderTopLeftRadius: 30,
							borderTopRightRadius: 30,
							overflow: 'hidden'
						}}>
						<View
							w='100%'
							h='55%'
							bottom={200}>
							<ScrollView>
								<VStack
									space={2}
									display='column'
									alignItems='center'
									justifyContent='center'
									style={{
										position: 'relative',
										w: '100%',
										h: '100%'
									}}>
									<Menu
										onPress={handlePress}
										imageSource={require('../../../../../assets/cart.png')}
										title='Keranjang Anda'
									/>
									<Menu
										onPress={handlePress}
										imageSource={require('../../../../../assets/wishlist.png')}
										title='Wishlist'
									/>
									<Menu
										onPress={handlePress}
										imageSource={require('../../../../../assets/history.png')}
										title='Daftar Transaksi Anda'
									/>
									<Menu
										onPress={handlePress}
										imageSource={require('../../../../../assets/toko.png')}
										title='Toko Anda'
									/>
									<Menu
										onPress={handlePress}
										imageSource={require('../../../../../assets/love.png')}
										title='Toko Yang Di-Follow'
									/>
									<Menu
										onPress={handlePress}
										imageSource={require('../../../../../assets/address.png')}
										title='Alamat Pengiriman'
									/>
									<Menu
										onPress={handlePress}
										imageSource={require('../../../../../assets/account.png')}
										title='Keamanan Akun'
									/>
									<Menu
										onPress={handlePress}
										imageSource={require('../../../../../assets/logout.png')}
										title='Logout Akun'
									/>
								</VStack>
							</ScrollView>
						</View>
					</View>
				</VStack>
			</ImageBackground>
		</Center>
	);
};

MenuScreen.propTypes = {
	navigation: PropTypes.object.isRequired
};
