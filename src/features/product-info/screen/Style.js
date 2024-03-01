import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        top: "10%",
        merginBottom: 5,
        //justifyContent: 'center',
        //alignItems: 'center',
        // Neumorphic styling
        left: "7%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        height: 298,
        width: "86%",
        shadowRadius: 4.65,
        elevation: 8
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 16
    },
    detailsContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    title: {
        fontSize: 18,
        fontWeight: "700"
        //marginBottom: 8,
    },
    text: {
        fontSize: 14
        // marginBottom: 4,
    },
    price: {
        fontSize: 15,
        marginBottom: 5,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: "2.5%",
        top: "10%",
        width: 115,
        height: 60
    },
    discountedPrice: {
        textDecorationLine: "line-through",
        color: "grey",
        fontSize: 13,
        bottom: "32%",
        marginLeft: "18%"
    },
    originalPrice: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: "7%",
        marginTop: "6%"
    },
    discountVw: {
        backgroundColor: "rgba(253,0,0, .3)",
        width: 40,
        height: 15,
        borderRadius: 3,
        marginTop: "6%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "7%"
    },
    discount: {
        fontSize: 11,
        color: "red",
        bottom: 2
    }
});
