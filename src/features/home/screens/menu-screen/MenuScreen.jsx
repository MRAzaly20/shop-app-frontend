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
    View,
    Divider
} from "native-base";
import { useUserContext } from "../../../../context/UserContext";
import { useSignOut } from "../../../../hooks/use-sign-out";
import * as styles from "./style";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Image,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import CardUser from "../Elements/CardUser";
import CardInfo from "../Elements/CardInfo";
import Placeholder from "../Elements/Placeholder";
import Menu from "../Elements/CardMenu";
import ButtonMenu from "../Elements/ButtonMenu";

const backgroundImage = require("../../../../../assets/bg_.jpg");

const logo = {
    uri: "https://reactnative.dev/img/tiny_logo.png",
    width: 64,
    height: 64
};

const shuffle = array => {
    if (!array || !array.length) {
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
            navigation.navigate("LayarLain", { ...product });
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

            requestAnimationFrame(() => {
                setSortedProducts(sortedArray);
            });
        };

        fetchData();
    }, [data]);

    return (
        <FlatList
            data={["CardInfo", ...sortedProducts]}
            keyExtractor={(item, index) =>
                item === "CardInfo" ? item : index.toString()
            }
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
const apiUrl = "http://192.168.48.193:3000/account/create/uid";

export const MenuScreen = ({ navigation }) => {
    const [jsonData, setJsonData] = useState([]);
    const { user } = useUserContext();
    const [signOut, { isLoading }] = useSignOut();
    console.log(user);
    const [isHovered, setIsHovered] = useState(false);
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
                //console.log(data.products);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    }, []);

    const userName = user.email.split("@")[0];
    //console.log(productState.dynamic)
    const logoutStyle = isHovered
        ? [styling.logout, styling.hoveredCard]
        : styling.logout;

    const handlePress = () => {
        // Tambahkan logika yang diinginkan saat komponen diklik
    };
    //console.log(productState.all);
    return (
        <Center flex={1}>
            <ImageBackground
                source={backgroundImage} // Menambahkan gambar latar belakang
                style={{ flex: 1, width: 360, height: 820 }}
            >
                <VStack space={4} alignItems='center' w='100%'>
                    {/* Ganti user.email dengan userName */}
                    {/* <Heading>Hello, {userName}</Heading>*/}
                    <HStack
                        bg='rgba(255,255,255, .6)'
                        style={{ position: "absolute", top: 50 }}
                        justifyContent='center'
                        alignItems='center'
                        alignContent='center'
                        space={10}
                        w='95%'
                        borderRadius={20}
                        h={120}
                    >
                        <View justifyContent='center' alignItems='center'>
                            <Image
                                style={styles.userImg}
                                source={{
                                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSyfNZAgsQx7NEJSq7Z2tboN7kezLOBgcYWA&usqp=CAU"
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
                            marginTop={2}
                        >
                            <Text style={styles.welcome}>Welcome</Text>
                            <Text style={styles.userName}>{user.email}</Text>
                            <TouchableOpacity
                                // onPressIn={handlePressIn}
                                // onPressOut={handlePressOut}
                                // onPress={onPressCard}
                                activeOpacity={0.7}
                                style={styles.card}
                            >
                                <HStack
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    <Image
                                        style={styles.iconStatus}
                                        source={require("../../../../../assets/gold-member.png")}
                                    />
                                    <Text style={styles.title}>
                                        member gold
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 30,
                                            marginTop: 3,
                                            marginLeft: 4,
                                            marginRight: 3
                                        }}
                                    >
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
                            overflow: "hidden"
                        }}
                    >
                        <View w='100%' h='55%' bottom={200}>
                            <VStack
                                space={2}
                                display='column'
                                alignItems='center'
                                justifyContent='center'
                                style={{
                                    position: "relative",
                                    w: "100%",
                                    h: 300
                                }}
                            >
                                <HStack
                                    space={0}
                                    //bg='rgba(255,255,0,.5)'
                                    marginTop={5}
                                    alignItems='center'
                                    justifyContent='center'
                                    borderRadius={8}
                                    width={"85%"}
                                    height={65}
                                    backgroundColor='rgba(255,255,255,.5)'
                                >
                                    <Menu
                                        width={100}
                                        height='100%'
                                        onPress={handlePress}
                                        imageSource={require("../../../../../assets/cart2.png")}
                                        title='Keranjang   Anda'
                                    />
                                    <Divider
                                        bg='#fff'
                                        thickness='1'
                                        height={10}
                                        marginLeft={1}
                                        orientation='vertical'
                                    />
                                    <Menu
                                        width={90}
                                        height='100%'
                                        onPress={handlePress}
                                        imageSource={require("../../../../../assets/wishlist.png")}
                                        title='Wishlist'
                                    />
                                    <Divider
                                        bg='#fff'
                                        thickness='1'
                                        height={10}
                                        orientation='vertical'
                                    />
                                    <Menu
                                        width={100}
                                        height='100%'
                                        onPress={handlePress}
                                        imageSource={require("../../../../../assets/history.png")}
                                        title='Daftar Transaksi'
                                    />
                                </HStack>
                                <VStack
                                    bg='rgba(255,255,255,.4)'
                                    w='85%'
                                    borderRadius={8}
                                    justifyContent='center'
                                    //alignItems='center'
                                    marginTop={6}
                                    space={0}
                                >
                                    <ButtonMenu
                                        // backgroundColor='rgba(255,255,0,.1)'
                                        width='100%'
                                        height={60}
                                        borderTopLeftRadius={8}
                                        borderTopRightRadius={8}
                                        onPress={handlePress}
                                        imageSource={require("../../../../../assets/toko.png")}
                                        title='Toko Anda'
                                    />
                                    <Divider
                                        bg='#fff'
                                        thickness='1'
                                        marginLeft={45}
                                        width='75%'
                                        orientation='horizontal'
                                    />
                                    <ButtonMenu
                                        width='100%'
                                        //borderRadius={8}
                                        height={60}
                                        onPress={handlePress}
                                        imageSource={require("../../../../../assets/love.png")}
                                        title='Toko Yang Di-Follow'
                                    />
                                    <Divider
                                        bg='#fff'
                                        thickness='1'
                                        marginLeft={45}
                                        width='75%'
                                        orientation='horizontal'
                                    />
                                    <ButtonMenu
                                        width='100%'
                                        height={60}
                                        //borderRadius={8}
                                        onPress={handlePress}
                                        imageSource={require("../../../../../assets/address.png")}
                                        title='Alamat Pengiriman'
                                    />
                                    <Divider
                                        bg='#fff'
                                        thickness='1'
                                        marginLeft={45}
                                        width='75%'
                                        orientation='horizontal'
                                    />
                                    <ButtonMenu
                                        height={60}
                                        width='100%'
                                        //borderRadius={8}
                                        // backgroundColor='rgba(255,255,0,.1)'
                                        onPress={handlePress}
                                        imageSource={require("../../../../../assets/account.png")}
                                        title='Keamanan Akun'
                                    />
                                    <Divider
                                        bg='#fff'
                                        thickness='1'
                                        marginLeft={45}
                                        width='75%'
                                        orientation='horizontal'
                                    />
                                    <ButtonMenu
                                        height={60}
                                        width='100%'
                                        borderBottomLeftRadius={8}
                                        borderBottomRightRadius={8}
                                        // backgroundColor='rgba(255,255,0,.1)'
                                        onPress={handlePress}
                                        imageSource={require("../../../../../assets/notif.png")}
                                        title='Pengaturan Notifikasi'
                                    />
                                </VStack>
                                <View style={styling.logout}>
                                    <ButtonMenu
                                        isUseHover={true}
                                        width='100%'
                                        height={50}
                                        backgroundColor='rgba(255,255,255,.5)'
                                        borderRadius={50}
                                        onPress={handlePress}
                                        imageSource={require("../../../../../assets/logout.png")}
                                        title='Logout Akun'
                                    />
                                </View>
                            </VStack>
                        </View>
                    </View>
                </VStack>
            </ImageBackground>
        </Center>
    );
};

const styling = StyleSheet.create({
    logout: {
        width: "85%",
        borderRadius: 50,
        justifyContent: "center",
        marginTop: 20
    },
    hoveredCard: {
        transform: [
            {
                scale: 0.96
            }
        ]
    }
});

MenuScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};
