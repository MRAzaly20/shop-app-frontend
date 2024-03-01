import React, { PureComponent, useState, useMemo } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
//import * as Progress from "react-native-progress";
const CardInfo = React.memo(({ imageSource, title, onPressCard }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handlePressIn = () => {
        setIsHovered(true);
    };

    const handlePressOut = () => {
        setIsHovered(false);
    };

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
                    <Text style={styles.title}>{title}</Text>
                </View>
            </>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255, 0.3)",
        overflow: "hidden",
        margin: 10,
        //elevation: 3,
        transition: "0.6s",
        width: 60,
        justifyContent: "center",
        transition: "0.6s",
        alignItems: "center",
        paddingTop: 3,
        paddingLeft: 3,
        paddingRight: 3
    },
    hoveredCard: {
        transform: [
            {
                scale: 0.98
            }
        ],
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    image: {
        height: 45,
        borderRadius: 6,
        width: 55,
        marginLeft: 5,
        marginRight: 5
        //resizeMode: 'cover',
    },
    cardContent: {
        padding: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 12,
        //fontWeight: "bold",
        marginBottom: 8
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
export default CardInfo;
