import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { styles } from "./Style";
import { useUserContext } from "../../../context/UserContext";
import {
  VStack,
  Button,
  Text,
  HStack,
  IconButton,
  Icon,
  ScrollView,
  AlertDialog
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createCart, createWishList } from "../hooks/use-create";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

export const ProductInfo = ({ route }) => {
  const {
    id,
    shop,
    thumbnail,
    title,
    price,
    rating,
    description,
    stock,
    brand,
    category,
    discountPercentage
  } = route.params;

  const { user } = useUserContext();
  const [images, setImages] = useState([]);
  const [thumb, setThumb] = useState(thumbnail);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [bg, setBg] = useState("#ededed");
  const [isWish, setIsWish] = useState(false);
  const [data, setData] = useState();
  //console.log(images)

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  const onCloseCart = () => setIsOpenCart(false);

  const cancelRefCart = React.useRef(null);

  const NameShop = shop && shop.length() > 0 ? shop : "ExpoShop";
  const userEmail = user ? user.email : "";
  //const userEmail = 'muhammadrazaly4@gmail.com'
  const options = {
    method: "GET"
  };

  useEffect(
    () => {
      const getDataStorage = async () => {
        try {
          const value = await AsyncStorage.getItem(title);

          return value != null ? JSON.parse(value) : null;
        } catch (error) {
          console.error(error);
        }
      };

      const fetchData = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await response.json();
          setImages(data.images);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const getData = async () => {
        const response = await fetch(
          `http://192.168.51.90:3000/wishlist/getOneProduct?email=${userEmail}&product=${title}`,
          options
        )
          .then(response => response.json())
          .then(response => {
            if (response) {
              const _data = response.data;
              setData(_data);
              setIsWish(_data);
              console.log(isWish);
            } else {
              console.log("error when get data");
            }
          });
      };
      getDataStorage()
        .then(result => {
          console.log(result);
          NetInfo.fetch().then(state => {
            if (result && !state.isConnected) {
              console.log("get from storage");
              setData(result);
              setIsWish(result);
            } else if (result == null && state.isConnected) {
              console.log("get from fetch");
              getData();
            } else if (result && state.isConnected) {
              console.log("get from storage");
              setData(result);
              setIsWish(result);
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
      fetchData();
    },
    [data, isWish]
  );
  const handleImagePress = selectedImage => {
    setThumb(selectedImage);
  };
  //console.log(user);
  const storeDataStorage = async (name, value) => {
    try {
      JSONValue = JSON.stringify(value);
      await AsyncStorage.setItem(name, JSONValue);
    } catch (error) {
      console.error(error);
    }
  };
  const addToCart = async () => {
    console.log(userEmail);

    const cartData = {
      productName: title,
      shopName: NameShop,
      typeProduct: category,
      shopOwnerEmail: "expo@gmail.com",
      price: price,
      discount: discountPercentage,
      rating: rating,
      description: description,
      stock: stock,
      brand: brand,
      customerEmail: userEmail,
      base64data: thumbnail,
      useImageList: images
    };

    console.log("CART DATA :", cartData);
    try {
      /*const response = await axios.post(
                "http://localhost:3000/cart/createCart",
                cartData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );*/
      await createCart(cartData);
      //console.log(response.data);
      setIsOpenCart(!isOpen); // Output respon dari server
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const addToWIshList = async () => {
    console.log(rating);

    const cartData = {
      productName: title,
      shopName: NameShop,
      typeProduct: category,
      shopOwnerEmail: "expo@gmail.com",
      price: price,
      discount: discountPercentage,
      rating: rating,
      description: description,
      stock: stock,
      brand: brand,
      customerEmail: userEmail,
      base64data: thumbnail,
      useImageList: images
    };

    console.log("CART DATA :", cartData);

    try {
      const response = await createWishList(cartData);
      console.log(response);
      setIsWish(true);
      storeDataStorage(title, true);
      if (response != 409) setIsOpen(!isOpen);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const discountedPrice = (price * (1 - discountPercentage / 100)).toFixed(2);

  const priceText = price
    ? <View h={70}>
        <View style={styles.price}>
          <Text style={styles.originalPrice}>
            Rp {discountedPrice}
          </Text>
          <View style={styles.discountVw}>
            <Text style={styles.discount}>
              {discountPercentage}%
            </Text>
          </View>
        </View>
        <Text style={styles.discountedPrice}>
          Rp {price}
        </Text>
      </View>
    : <View>
        <Text style={styles.price}>
          {price}
        </Text>
      </View>;

  return (
    <View flex={1}>
      <ScrollView top="6%" bg="#eee" h="100%">
        <HStack
          style={{ overflow: "hidden" }}
          marginBottom={5}
          w="95%"
          marginLeft="2.6%"
          h={260}
          bg="rgba(255,255,255, 1)"
          borderRadius={16}
          borderWidth={1.5}
          borderColor="#fff"
        >
          <Image source={{ uri: thumb }} style={styles.image} />
          <IconButton
            size={8}
            width={10}
            height={10}
            borderRadius={50}
            position="absolute"
            top={205}
            left={280}
            bg="#ededed"
            _hover={{
              bg: "#fff"
            }}
            _pressed={{
              bg: "#fff"
            }}
            icon={
              !isWish
                ? <Icon
                    size={7}
                    color="#000"
                    as={MaterialCommunityIcons}
                    name="cards-heart-outline"
                  />
                : <Image
                    source={require("../../../../assets/love_id.png")}
                    style={{ left: 1.3, top: 1, width: 55, height: 56 }}
                  />
            }
            onPress={() => addToWIshList()}
          />
        </HStack>
        <VStack
          style={{ overflow: "hidden" }}
          marginBottom={2}
          w="95%"
          marginLeft="2.6%"
          h={110}
          bg="rgba(255,255,255, 1)"
          borderTopLeftRadius={15}
          borderTopRightRadius={15}
          borderBottomRightRadius={15}
          borderBottomLeftRadius={15}
        >
          <Text left="4%" top="4%" fontWeight="bold" fontSize={14}>
            Variasi Produk Lainnya
          </Text>
          <ScrollView borderRadius={30} horizontal nestedScrollEnabled>
            {images.map((image, index) =>
              <View
                key={index}
                style={{
                  marginRight: 10,
                  top: 15
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleImagePress(image)}
                >
                  <Image
                    marginLeft={5}
                    borderRadius={16}
                    source={{ uri: image }}
                    style={{
                      width: 90,
                      height: "85%",
                      borderWidth: 1,
                      borderColor: "#eee"
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </VStack>

        <VStack
          style={{ overflow: "hidden" }}
          marginBottom={2}
          w="95%"
          marginLeft="2.6%"
          h="auto"
          bg="rgba(14,169,235,0.366)"
          borderRadius={16}
        >
          <View
            style={{
              position: "absolute",
              width: "79%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,139,255,.4)",
              borderBottomRightRadius: 200
            }}
          />
          <View
            justifyContent="flex-start"
            alignItems="flex-start"
            marginLeft="5%"
            marginTop="3%"
          >
            <Text fontSize={20} color="#fff" fontWeight="bold">
              {title}
            </Text>
          </View>
          <View w={200}>
            {priceText}
          </View>
          <View w={200}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 70,
                height: 25,
                backgroundColor: "rgba(0,139,255,.4)",
                borderRadius: 6,
                marginLeft: "4.5%",
                borderColor: "#f1f1f1",
                borderWidth: 1,
                top: "-38%"
              }}
            >
              <Text left="9%" top="6%" fontSize={15}>
                ⭐ {rating}
              </Text>
            </TouchableOpacity>
          </View>
        </VStack>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Informasi</AlertDialog.Header>
            <AlertDialog.Body>
              Berhasil menambahkan produk ke WishList
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Lihat Keranjang
                </Button>
                <Button colorScheme="danger" onPress={onClose}>
                  Close
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        <AlertDialog
          leastDestructiveRef={cancelRefCart}
          isOpen={isOpenCart}
          onClose={onCloseCart}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Informasi</AlertDialog.Header>
            <AlertDialog.Body>
              Berhasil menambahkan produk ke Keranjang anda
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onCloseCart}
                  ref={cancelRefCart}
                >
                  Lihat Keranjang
                </Button>
                <Button colorScheme="danger" onPress={onCloseCart}>
                  Close
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        <VStack
          style={{ overflow: "hidden" }}
          marginBottom={5}
          w="95%"
          marginLeft="2.6%"
          h={190}
          bg="rgba(255,255,255, 1)"
          borderRadius={16}
        >
          <View
            style={{
              position: "absolute",

              width: "45%",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,139,255,.4)",
              borderBottomRightRadius: 100
            }}
          />
          <View
            style={{
              position: "absolute",
              top: "48%",
              flex: 1,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,139,255,.4)",
              borderRadius: 5,
              left: "3%",
              marginTop: 1,
              marginBottom: 10
            }}
          >
            <Text
              style={{
                marginHorizontal: "2%",
                marginBottom: 0.5,
                fontSize: 15,
                color: "#fff"
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)} | {brand}
            </Text>
          </View>
          <Text fontSize={20} color="#fff" fontWeight="bold" left="3%" top="3%">
            Detail Produk
          </Text>
          <HStack space={1} top="8.5%" left="7%">
            <Text color="rgb(2,142,37)" top={0.5}>
              STOCK
            </Text>
            <View
              style={{
                width: 50,
                height: 25,
                borderRadius: 6,
                marginLeft: "1.6%",
                borderColor: "rgba(0,0,0, .1)",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text marginBottom={0.2}>
                {stock}
              </Text>
            </View>
          </HStack>

          {/*<Text>{description}</Text>*/}
        </VStack>
        <VStack
          style={{ overflow: "hidden" }}
          bottom={85}
          w="95%"
          marginLeft="2.5%"
          h="auto"
          bg="rgba(255,255,255, 1)"
          borderRadius={16}
          justifyContent="flex-start"
          alignItems="flex-start"
          marginBottom={5}
        >
          <Text
            style={{
              fontSize: 15,
              // marginLeft: "-3%",
              padding: 10,
              color: "#a0a0a0"
            }}
          >
            {description}
          </Text>
        </VStack>

        <VStack
          style={{ overflow: "hidden" }}
          marginBottom={5}
          w="100%"
          h={4}
          justifyContent="center"
          alignItems="center"
          bg="rgba(255, 255,255, 0)"
          borderTopLeftRadius={15}
          borderBottomRightRadius={15}
        />
      </ScrollView>
      <HStack
        space={2}
        alignItems="flex-start"
        //alignContent='flex-start'
        justifyItems="flex-start"
        //justifyContent='flex-start'
        borderTopRightRadius={20}
        borderTopLeftRadius={20}
        padding={3}
        w="100%"
        h="9%"
        borderWidth={1}
        borderColor="#f1f1f1"
        bg="rgba(255,255,255, 1)"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <Button
          endIcon={
            <Icon
              as={MaterialCommunityIcons}
              name="message-text-outline"
              size="md"
            />
          }
          //onPress={reloadUser}
          variant="outline"
          colorScheme="success"
          //	right='37%'
          borderRadius={7}
          //isLoading={isReloadingUser}
        />
        <Button
          //onPress={reloadUser}
          variant="outline"
          colorScheme="success"
          marginLeft="8%"
          borderRadius={7}
          w={120}
          fontWeight="bold"
          //isLoading={isReloadingUser}
        >
          Beli
        </Button>
        <Button
          onPress={addToCart}
          colorScheme="success"
          borderRadius={7}
          w={120}
          fontWeight="bold"
          //isLoading={isReloadingUser}
        >
          + Keranjang
        </Button>
      </HStack>
    </View>
  );
};
