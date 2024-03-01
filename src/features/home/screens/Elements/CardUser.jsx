import React, { PureComponent, useState, useMemo } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from "./ProgressBar";
//import * as Progress from "react-native-progress";
const CardUser = React.memo(
    ({
        imageSource,
        title,
        price,
        discountPercentage,
        rate,
        onPressCard,
        stock
    }) => {
        const [isHovered, setIsHovered] = useState(false);

        const handlePressIn = () => {
            setIsHovered(true);
        };

        const handlePressOut = () => {
            setIsHovered(false);
        };

        const truncatedTitle = useMemo(() => {
            return title.length > 20 ? `${title.substring(0, 20)}...` : title;
        }, [title]);

        const discountedPrice = useMemo(() => {
            return (price * (1 - discountPercentage / 100)).toFixed(2);
        }, [price, discountPercentage]);

        const priceText = (
            <View>
                <Text style={styles.price}>
                    <Text style={styles.originalPrice}>
                        Rp {discountedPrice}
                    </Text>
                    {"  "}
                    <Text style={styles.discountedPrice}>Rp {price}</Text>
                </Text>
                <Text style={styles.rate}>⭐ {rate} </Text>
                <View style={styles.discountVw}>
                    <Text style={styles.discount}>{discountPercentage}%</Text>
                </View>
            </View>
        );

        const cardStyle = isHovered
            ? [styles.card, styles.hoveredCard]
            : styles.card;

        return (
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPressCard}
                activeOpacity={0.7}
                style={cardStyle}
            >
                <Image source={{ uri: imageSource }} style={styles.image} />
                <>
                    <View style={styles.cardContent}>
                        <Text style={styles.title}>{truncatedTitle}</Text>
                        {priceText}
                    </View>
                    <View marginLeft='6.5%' marginBottom={5}>
                        <ProgressBar
                            progress={stock}
                            color='rgba(235,14,14,0.63)'
                        />
                    </View>
                    <Text style={styles.stock} marginBottom={7}>
                        Tersedia {stock} unit
                    </Text>
                </>
            </TouchableOpacity>
        );
    }
);

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255, .4)",
        overflow: "hidden",
        margin: 10,
        elevation: 3,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.2,
        transition: "0.3s",
        width: 150
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
        left: "51%"
    },
    discount: {
        fontSize: 13,
        color: "green"
    },
    rate: {
        position: "absolute",
        top: "55%"
    },
    stock: {
        fontSize: 12,
        color: "grey",
        marginLeft: "6.5%"
    }
});
export default CardUser;
