import React, {
  useEffect,
  useState,
  useMemo,
  useReducer,
  useCallback
} from "react"; // Perbaikan impor useCallback
import PropTypes from "prop-types";
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
} from "native-base";
import { useUserContext } from "../../../../context/UserContext";
import { useSignOut } from "../../../../hooks/use-sign-out";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity
} from "react-native";
import CardUser from "../Elements/CardUser";
import CardInfo from "../Elements/CardInfo";
import Placeholder from "../Elements/Placeholder";
import { MenuScreen } from "../menu-screen/MenuScreen";

const backgroundImage = require("../../../../../assets/bg_.jpg");
const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
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
      navigation.navigate("ProductInfo", { ...product });
    },
    [navigation]
  );
  useEffect(
    () => {
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
    },
    [data]
  );

  const CardInfoProduct = useCallback(
    ({ item, index }) => {
      return (
        <VStack space={2} marginLeft="5.3%">
          <HStack space={0}>
            <CardInfo
              imageSource={
                "https://i.dummyjson.com/data/products/5/thumbnail.jpg"
              }
              title={"Phones"}
              onPressCard={() => navigation.navigate("Phones")}
            />
            <CardInfo
              imageSource={"https://i.dummyjson.com/data/products/10/1.jpg"}
              title={"Laptops"}
              onPressCard={() => navigation.navigate("Laptops")}
            />
            <CardInfo
              imageSource={
                "https://i.dummyjson.com/data/products/45/thumbnail.jpg"
              }
              title={"Fashion"}
              onPressCard={() => navigation.navigate("Fashion")}
            />
            <CardInfo
              imageSource={"https://i.dummyjson.com/data/products/17/3.jpg"}
              title={"Skincare"}
              onPressCard={() => navigation.navigate("Skincare")}
            />
          </HStack>
        </VStack>
      );
    },
    [navigation]
  );
  const renderItem = useCallback(
    ({ item, index }) =>
      <View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginLeft: 10,
              marginVertical: 5
            }}
          >
            {item.category}
          </Text>
          {item.products.length > 0
            ? <HStack
                key={item.category}
                overflow="hidden"
                marginBottom={5}
                w="100%"
                h="auto"
                bg="rgba(255,255,255,.3)"
                borderTopLeftRadius={15}
                borderBottomRightRadius={15}
              >
                <FlatList
                  data={item.products}
                  keyExtractor={product => product.id.toString()}
                  horizontal
                  renderItem={({ item: product }) =>
                    <CardUser
                      key={product.id}
                      imageSource={product.thumbnail}
                      title={product.title}
                      price={product.price}
                      rate={product.rating}
                      stock={product.stock}
                      onPressCard={() => handleCustomPress(product)}
                      discountPercentage={product.discountPercentage}
                    />}
                />
              </HStack>
            : <Text>No products in this category</Text>}
        </View>
      </View>,
    [navigation]
  );

  return (
    <FlatList
      data={["CardInfo", ...sortedProducts]}
      keyExtractor={(item, index) =>
        item === "CardInfo" ? item : index.toString()}
      renderItem={({ item, index }) => {
        if (item === "CardInfo") {
          return <CardInfoProduct />;
        }
        // Implement logic for other items (if needed)
        return renderItem({ item, index });
      }}
    />
  );
};
const apiUrl = "http://192.168.51.90:3000/account/create/uid";

export const HomeScreen = ({ navigation }) => {
  const [jsonData, setJsonData] = useState([]);
  const { user } = useUserContext();
  const [signOut, { isLoading }] = useSignOut();
  //console.log(user);
  const handlePressIn = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleCustomPress = useCallback(
    product => {
      navigation.navigate("LayarLain", { ...product });
    },
    [navigation]
  );
  const requestData = {
    email: user.email,
    uid: user.uid
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/product?limit=70");
        const data = await response.json();
        setJsonData(data.products);
        ////console.log(data.products);
      } catch (error) {
        //console.error('Error fetching data:', error);
      }
    };
    const UserID = async () => {
      try {
        const fetchResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        });

        const Response = await fetchResponse.json();
        ////console.log(data.products);
      } catch (error) {
        //console.error('Error fetching data:', error);
      }
    };
    fetchData();
    UserID();
  }, []);

  const userName = user.email.split("@")[0];
  ////console.log(productState.dynamic)

  ////console.log(productState.all);
  return (
    <Center flex={1}>
      <ImageBackground
        source={backgroundImage} // Menambahkan gambar latar belakang
        style={{ flex: 1, width: 360, height: 820 }}
      >
        <VStack space={4} alignItems="center" w="100%" h={800}>
          <HStack
            alignItems="center"
            alignContent="center"
            justifyItems="center"
            justifyContent="center"
            space={1}
            w="100%"
            h={6}
            style={{ marginLeft: "6%", marginTop: "16%" }}
          >
            <Input
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="search" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              _light={{
                bg: "#fff",
                _hover: {
                  bg: "#fff"
                },
                _focus: {
                  bg: "#fff"
                }
              }}
              placeholder="search product"
              w="50%"
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
                  color="#fff"
                  as={MaterialCommunityIcons}
                  name="email"
                />
              }
            />
            <IconButton
              size={8}
              icon={
                <Icon
                  size={6}
                  color="#fff"
                  as={MaterialCommunityIcons}
                  name="bell"
                />
              }
            />
            <IconButton
              size={8}
              icon={
                <Icon
                  size={6}
                  color="#fff"
                  as={MaterialCommunityIcons}
                  name="cart"
                />
              }
              onPress={() => navigation.navigate("Cart")}
            />
            <IconButton
              size={8}
              onPress={() => navigation.navigate("Menu")}
              icon={
                <Icon size={6} color="#fff" as={MaterialIcons} name="menu" />
              }
            />
          </HStack>
          {/* Ganti user.email dengan userName */}
          {/* <Heading>Hello, {userName}</Heading>*/}
          <View
            display="column"
            alignItems="center"
            justifyContent="center"
            marginTop={2}
            w="100%"
            h="100%"
            bg="rgba(255,255,255, .6)"
            borderWidth={2}
            borderColor="#fff"
            borderLeftRadius={30}
            borderRightRadius={30}
            style={{ position: "relative" }}
          >
            <View
              w="100%"
              h="74%"
              bottom="13%"
              // bg='rgba(255,0,0,1)'
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                overflow: "hidden"
              }}
            >
              <ProductList
                data={jsonData} // Pastikan Anda memiliki prop 'data' yang diperlukan
                navigation={navigation}
                handleCustomPress={handleCustomPress} // Teruskan handleCustomPress sebagai prop
              />
              {/*<FlatList
								style={{
									borderTopLeftRadius: 30,
									borderTopRightRadius: 30,
									overflow: 'hidden'
								}}
								data={['CardInfo', 'Skeleton']}
								keyExtractor={item => item}
								renderItem={({ item }) => {
									if (item === 'CardInfo') {
										return (
											<>
												<CardInfoProduct />
											</>
										);
									}
									if (
										item === 'Skeleton' &&
										productState.dynamic === undefined
									) {
										return (
											<>
												<Placeholder
													top={50}
													left={0}
												/>
												<Text color='transparent'>
													loading
												</Text>
											</>
										);
									}

									const category = item;
									//console.log('category', category);
									if (productState.dynamic !== undefined) {
										return (
											<>
												{productState.dynamic !==
													undefined &&
												Object.keys(
													productState.dynamic
												).length > 0 ? (
													<HStack
														key={category}
														style={{
															overflow: 'hidden'
														}}
														marginBottom={5}
														w='100%'
														h='auto'
														bg='rgba(255,255,255,.3)'
														borderTopLeftRadius={15}
														borderBottomRightRadius={
															15
														}>
														<FlatList
															data={
																productState
																	.dynamic[
																	category
																]
															}
															keyExtractor={product =>
																product.id.toString()
															}
															horizontal
															showsHorizontalScrollIndicator={
																false
															}
															renderItem={({
																item: product
															}) => (
																<CardUser
																	key={
																		product.id
																	}
																	imageSource={
																		product.thumbnail
																	}
																	title={
																		product.title
																	}
																	price={
																		product.price
																	}
																	rate={
																		product.rating
																	}
																	stock={
																		product.stock
																	}
																	onPressCard={() =>
																		handleCustomPress(
																			product
																		)
																	}
																	discountPercentage={
																		product.discountPercentage
																	}
																/>
															)}
														/>
													</HStack>
												) : (
													productState.dynamic ===
														undefined &&
													//console.log('kosong')
												)}
											</>
										);
									}
								}}
								onEndReachedThreshold={0.1}
							/>*/}
            </View>
          </View>
          <View
            alignItems="center"
            alignContent="center"
            justifyItems="center"
            justifyContent="center"
            borderTopRightRadius={20}
            borderTopLeftRadius={20}
            w="100%"
            h="8%"
            bg="rgba(0,0,0, .15)"
            style={{
              position: "absolute",
              bottom: "5%",
              left: 0,
              right: 0
            }}
          >
            <HStack space={10}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("NetCheck")}
              >
                <VStack
                  alignItems="center"
                  alignContent="center"
                  justifyItems="center"
                  justifyContent="center"
                  space={1}
                >
                  <IconButton
                    size={6}
                    //onPress={navigation.navigate('NetCheck')}
                    icon={
                      <Icon
                        size={7}
                        color="rgba(255,255,255, .7)"
                        as={MaterialCommunityIcons}
                        name="home"
                      />
                    }
                  />
                  <Text fontSize={12} color="rgba(255,255,255, .7)">
                    Home
                  </Text>
                </VStack>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("wish")}
              >
                <VStack
                  alignItems="center"
                  alignContent="center"
                  justifyItems="center"
                  justifyContent="center"
                  space={1}
                >
                  <IconButton
                    size={6}
                    icon={
                      <Icon
                        size={7}
                        color="rgba(255,255,255, .7)"
                        as={MaterialCommunityIcons}
                        name="cards-heart-outline"
                      />
                    }
                  />
                  <Text fontSize={12} color="rgba(255,255,255, .7)">
                    Wishlist
                  </Text>
                </VStack>
              </TouchableOpacity>
              <VStack
                alignItems="center"
                alignContent="center"
                justifyItems="center"
                justifyContent="center"
                space={1}
              >
                <IconButton
                  size={6}
                  icon={
                    <Icon
                      size={7}
                      color="rgba(255,255,255, .7)"
                      as={MaterialCommunityIcons}
                      name="notebook-plus-outline"
                    />
                  }
                />
                <Text fontSize={12} color="rgba(255,255,255, .7)">
                  Transaction
                </Text>
              </VStack>
              <VStack
                alignItems="center"
                alignContent="center"
                justifyItems="center"
                justifyContent="center"
                space={1}
              >
                <IconButton
                  size={6}
                  icon={
                    <Icon
                      size={7}
                      color="rgba(255,255,255, .7)"
                      as={MaterialCommunityIcons}
                      name="account"
                    />
                  }
                />
                <Text fontSize={12} color="rgba(255,255,255, .7)">
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

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
