import React, { useState, useEffect, useRef } from "react";

import { TouchableOpacity, HStack, View, Text, Image } from "react-native";

const Menu = ({ onPress, imageSource, title, ...styleProps }) => {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={onPress}
                style={[styles.card, styleProps]}
            >
                <View style={styles.cardContent}>
                    <Image style={styles.iconStatus} source={imageSource} />
                    <Text style={styles.title}>{title}</Text>
                </View>
            </TouchableOpacity>
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
        marginBottom: 5
        //resizeMode: 'cover',
    },
    cardContent: {
        width: "auto",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 5
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 7,
        marginLeft: 4,
        textAlign: "center"
    },
    arrow: {
        fontWeight: "bold",
        fontSize: 35,
        bottom: 5,
        position: "absolute",
        left: 250
    }
};

export default Menu;
