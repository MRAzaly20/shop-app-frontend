import React, { useState, useMemo } from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  VStack,
  Text,
  HStack,
  IconButton,
  Icon,
  View

  // ... other imports
} from "native-base";
import { ProgressBar } from "./ProgressBar";
import * as styles from "../CartScreen/style";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
//import * as Progress from "react-native-progress";
const CartCard = React.memo(
  ({
    imageSource,
    nameShop,
    title,
    price,
    discountPercentage,
    rate,
    stock
  }) => {
    console.log(rate)
    const [isHovered, setIsHovered] = useState(false);

    const handlePressIn = () => {
      setIsHovered(true);
    };

    const handlePressOut = () => {
      setIsHovered(false);
    };

    const truncatedTitle = useMemo(
      () => {
        return title.length > 20 ? `${title.substring(0, 20)}...` : title;
      },
      [title]
    );

    const discountedPrice = useMemo(
      () => {
        return (price * (1 - discountPercentage / 100)).toFixed(2);
      },
      [price, discountPercentage]
    );

    const uriImg = imageSource
      ? imageSource
      : "https://res.cloudinary.com/practicaldev/image/fetch/s--tCzwUWar--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dptoxeujpz8xljaa50xd.jpeg";

    //console.log(uriImg)

    const priceText = (
      <View>
        <Text style={styling.price}>
          <Text style={styling.originalPrice}>
            Rp {discountedPrice}
          </Text>
          {"  "}
          <Text style={styling.discountedPrice}>
            Rp {price}
          </Text>
        </Text>
        <Text style={styling.rate}>
          ⭐ {rate}
        </Text>
        <View style={styling.discountVw}>
          <Text style={styling.discount}>
            {discountPercentage}%
          </Text>
        </View>
      </View>
    );

    const cardStyle = isHovered
      ? [styles.card, styles.hoveredCard]
      : styles.card;

    return (
      <View>
        {/* <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPressCard}
                activeOpacity={0.7}
                style={cardStyle}
        >*/}

        <HStack
          bg="rgba(255,255,255, .6)"
          style={{ position: "relative", height: 150 }}
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          space={10}
          w="85%"
          borderRadius={20}
        >
          <View
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            top={0}
          >
            <Text style={styles.shopName}>
              {nameShop}
            </Text>
            <Image
              style={styles.userImg}
              source={{
                uri: uriImg
              }}
            />
          </View>
          <VStack
            space={1}
            justifyContent="flex-start"
            alignItems="flex-start"
            w={220}
            marginRight={2}
            marginLeft={5}
            marginTop={2}
          >
            <Text style={styles.welcome}>
              {title}
            </Text>
            {priceText}
            <HStack space={2}>
              <TouchableOpacity
                // onPressIn={handlePressIn}
                // onPressOut={handlePressOut}
                // onPress={onPressCard}
                activeOpacity={0.7}
                style={styles.card}
              >
                <HStack justifyContent="center" alignItems="center">
                  <Text style={styles.title} marginLeft={2} marginRight={2}>
                    Beli
                  </Text>
                </HStack>
              </TouchableOpacity>
              <IconButton
                size={8}
                width={10}
                height={10}
                borderRadius={50}
                onPress={() => console.log("Menu")}
                icon={
                  <Icon
                    size={7}
                    color="#000"
                    as={MaterialCommunityIcons}
                    name="cards-heart-outline"
                  />
                }
              />
            </HStack>
          </VStack>
        </HStack>
        {/*</TouchableOpacity>*/}
      </View>
    );
  }
);

const styling = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255, .4)",
    overflow: "hidden",
    display: "row",
    margin: 10,
    elevation: 3,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    transition: "0.3s",
    width: "90%",
    height: 500
  },
  hoveredCard: {
    transform: [
      {
        scale: 0.96
      }
    ],
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  image: {
    height: 130,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: 150
    //resizeMode: 'cover',
  },
  cardContent: {
    padding: 10
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12
  },
  price: {
    fontSize: 14,
    marginBottom: 5
  },
  discountedPrice: {
    textDecorationLine: "line-through",
    color: "grey"
  },
  originalPrice: {
    color: "red",
    fontWeight: "bold"
  },
  discountVw: {
    backgroundColor: "rgba(6,248,18, .4)",
    width: 50,
    height: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    left: "20%"
  },
  discount: {
    fontSize: 13,
    color: "green"
  },
  rate: {
    position: "absolute",
    top: "55%",
    fontSize: 13,
    color: "#000"
  },
  stock: {
    fontSize: 12,
    color: "grey",
    marginLeft: "6.5%"
  }
});

export default CartCard;
