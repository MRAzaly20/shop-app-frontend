import React, { useRef } from "react";
import PropTypes from "prop-types";
import { VStack, Center, Button } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";

export const GuestWelcomeScreen = ({ navigation }) => {
    const handlePressOnSignIn = () => {
        navigation.navigate("SignIn");
    };
    const animation = useRef();
    const handlePressOnSignUp = () => {
        navigation.navigate("SignUp");
    };

    return (
        <Center flex={1}>
            <StatusBar backgroundColor={"transparent"} translucent />
            <LinearGradient
                colors={["#0091ff", "#00ffe1"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0.7, y: 1.6 }}
                style={stylesApp.ball}
            ></LinearGradient>
            <LinearGradient
                colors={["#0091ff", "#00ffe1"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 0.7 }}
                style={stylesApp.ball2}
            ></LinearGradient>
            <VStack
                space={4}
                alignItems='center'
                w='70%'
                h='50%'
                backdropFilter='blur(5px)' // Efek blur
                borderRadius={10}
                p={4} // Padding
                style={{
                    position: "relative",
                    left: "0%",
                    top: "0",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    borderColor: "#fff",
                    borderWidth: 2
                }}
            >
                <Text
                    fontSize='2xl'
                    style={{ color: "#a0a0a0", fontWeight: "bold" }}
                    mb={4}
                >
                    Welcome to Our App!
                </Text>
                <Text style={{ color: "#a0a0a0", fontWeight: "bold" }} mb={4}>
                    Discover a world of possibilities
                </Text>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: 10,
                        height: 200,
                        backgroundColor: "transparent"
                    }}
                    top={-30}
                    // Find more Lottie files at https://lottiefiles.com/featured
                    source={require("../../../components/Lottie/ShopLottie.json")}
                />
                <Center>
                    <LinearGradient
                        size='lg'
                        onPress={handlePressOnSignIn}
                        colors={["rgba(230,36,217, 0.7)", "rgba(90,7,200,0.6)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 160,
                            height: 45,
                            borderRadius: 50
                        }}
                        top='-110%'
                    >
                        <TouchableOpacity
                            onPress={handlePressOnSignIn}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <Text style={stylesApp.buttonText}>sign in</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </Center>
                <Center>
                    <Button
                        size='lg'
                        colorScheme='blue'
                        _text={{ color: "white", fontSize: 16 }}
                        onPress={handlePressOnSignUp}
                        mt={2}
                        w={160}
                        h={45}
                        top='-28%'
                        borderRadius={50}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(46, 198, 61, 0.7)"
                        }}
                    >
                        <TouchableOpacity
                            onPress={handlePressOnSignUp}
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                top: -2
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 17,
                                    fontWeight: "bold"
                                }}
                            >
                                create account
                            </Text>
                        </TouchableOpacity>
                    </Button>
                </Center>
            </VStack>
            <LinearGradient
                colors={["#0091ff", "#00ffe1"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 0.8 }}
                style={stylesApp.ball3}
            ></LinearGradient>
            <LinearGradient
                colors={["#0091ff", "#00ffe1"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={stylesApp.ball4}
            ></LinearGradient>
            <LinearGradient
                colors={["#0091ff", "#00ffe1"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 0.9 }}
                style={stylesApp.ballParrent}
            ></LinearGradient>
            <LinearGradient
                colors={["#0091ff", "#00ffe1"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0.7, y: 1.4 }}
                style={stylesApp.ballParrent2}
            ></LinearGradient>
        </Center>
    );
};

GuestWelcomeScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};

const stylesApp = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingHorizontal: 30,
        backgroundColor: "#ededed"
    },
    box: {
        width: 300,
        height: 300,
        borderRadius: 250,
        position: "relative",
        left: -100,
        top: -150
    },
    StackBg: {
        position: "relative",
        left: -65,
        top: 130
    },
    ball: {
        width: 30,
        height: 325,
        borderRadius: 250,
        position: "absolute",
        left: "0%",
        top: "65%",
        transform: [
            {
                rotate: "40deg"
            }
        ]
    },
    ball2: {
        width: 30,
        height: 325,
        borderRadius: 250,
        position: "absolute",
        left: "0%",
        top: "80%",
        transform: [
            {
                rotate: "40deg"
            }
        ]
    },
    ball3: {
        width: 30,
        height: 325,
        borderRadius: 250,
        position: "absolute",
        left: "0%",
        top: "0%",
        zIndex: -100,
        transform: [
            {
                rotate: "40deg"
            }
        ]
    },
    ball4: {
        width: 30,
        height: 325,
        borderRadius: 250,
        position: "absolute",
        left: "0%",
        top: "15%",
        zIndex: -100,
        transform: [
            {
                rotate: "40deg"
            }
        ]
    },
    ballParrent: {
        width: 155,
        height: 155,
        borderRadius: 250,
        position: "absolute",
        left: "70%",
        top: "86%",
        zIndex: 1,
        transform: [
            {
                rotate: "225deg"
            }
        ]
    },
    ballParrent2: {
        width: 165,
        height: 165,
        borderRadius: 250,
        position: "absolute",
        left: "60%",
        bottom: "82%",
        zIndex: 1,
        transform: [
            {
                rotate: "220deg"
            }
        ]
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 19,
        fontWeight: "bold",
        position: "relative",
        left: 0,
        top: 7
    },
    glassCard: {
        width: 343,
        height: 220,
        backgroundColor: "rgba(255,255,255, 0.6)",
        borderRadius: 25,
        position: "relative",
        top: -610,
        left: -20,
        borderColor: "#fff",
        borderWidth: 2,
        elevation: 150
    },
    Frame: {
        width: 343,
        height: 340,
        backgroundColor: "rgba(255,255,255, 0.6)",
        borderRadius: 25,
        position: "relative",
        top: -630,
        left: -20,
        borderColor: "#fff",
        borderWidth: 2,
        elevation: 150
    },
    stream: {
        width: 120,
        height: 45,
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "space-evenly",
        position: "relative",
        left: 200,
        top: 6
    },
    stream_status: {
        width: "80%",
        height: 45,
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "space-evenly",
        position: "relative",
        left: "10%",
        top: 13,
        borderWidth: 1,
        borderColor: "#fff"
    },
    userNav: {
        width: 320,
        height: 70,
        backgroundColor: "#fff",
        position: "relative",
        top: -590,
        left: -10,
        borderRadius: 30
    },
    Img: {
        position: "relative",
        left: 20,
        top: 20
    },
    web: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255,255,255, 0)"
    },
    modalView: {
        margin: 45,
        marginTop: 200,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        elevation: 100
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF"
    },
    buttonClose: {
        backgroundColor: "#D70404"
    },
    buttonCloseAdd: {
        backgroundColor: "#2196F3"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center",
        color: "#fff"
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 3,
        padding: 10,
        borderRadius: 5,
        borderColor: "rgba(16, 191, 255, 0.5)"
    }
});
