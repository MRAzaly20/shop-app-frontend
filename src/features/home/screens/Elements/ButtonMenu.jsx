import React, { useState, useEffect, useRef } from "react";

import { HStack, View, Text, Image } from "react-native";
import { TouchableRipple } from "react-native-paper";

const ButtonMenu = ({
    isUseHover,
    onPress,
    imageSource,
    title,
    ...styleProps
}) => {
    /*const [heightItem, setHeightItem] = useState(null);
    useEffect(() => {
        setHeightItem(height);
    });
    console.log(heightItem);*/
    const [isHovered, setIsHovered] = useState(false);
    const handlePressIn = () => {
        setIsHovered(true);
    };

    const handlePressOut = () => {
        setIsHovered(false);
    };

    const cardStyle =
        isHovered && isUseHover
            ? [styles.card, styles.hoveredCard, styleProps]
            : [styles.card, styleProps];
    return (
        <View>
            <TouchableRipple
                rippleColor='rgba(0, 0, 255, 0.06)'
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                // style={[styles.card, styleProps]}
                style={cardStyle}
                borderless
            >
                <View style={styles.cardContent}>
                    <Image style={styles.iconStatus} source={imageSource} />
                    <View style={{ width: 200 }}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                </View>
            </TouchableRipple>
        </View>
    );
};

const styles = {
    card: {
        overflow: "hidden",
        //elevation: 3,
        transition: "0.6s",
        justifyContent: "center",
        transition: "0.6s",
        alignItems: "flex-start",
        alignContent: "flex-start",

        paddingLeft: 5,
        paddingRight: 5
        //elevation: 3
        //shadowColor: "rgba(0, 0, 0, 0.1)",
        /*shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.2*/
    },
    hoveredCard: {
        transform: [
            {
                scale: 0.98
            }
        ],
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    icon: {
        height: 20,
        borderRadius: 50,
        width: 20,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 4
        //resizeMode: 'cover',
    },
    iconStatus: {
        height: 30,
        width: 30,
        marginBottom: 4
        //resizeMode: 'cover',
    },
    cardContent: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 0
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 7,
        marginLeft: 0,
        textAlign: "center"
    },
    arrow: {
        fontWeight: "bold",
        fontSize: 35,
        bottom: 3,
        position: "absolute",
        left: 250
    }
};

export default ButtonMenu;
