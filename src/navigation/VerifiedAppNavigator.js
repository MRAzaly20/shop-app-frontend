import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../features/home/screens/HomeScreen/HomeScreen";
import { ProductInfo } from "../features/product-info/screen/productInfo";
import { PhoneScreen } from "../features/home/screens/ScreenProduct/Phones";
import { LaptopsProduct } from "../features/home/screens/ScreenProduct/Laptops";
import { Fashion } from "../features/home/screens/ScreenProduct/Fashion";
import { Skincare } from "../features/home/screens/ScreenProduct/Skincare";
import { ReauthenticateScreen } from "../features/update-password/screens/ReauthenticateScreen";
import { UpdatePasswordScreen } from "../features/update-password/screens/UpdatePasswordScreen";
import { NetCheck } from "../features/payment-screen/NetworkCheck/Screen";
import { MenuScreen } from "../features/home/screens/menu-screen/MenuScreen";
import { CartScreen } from "../features/home/screens/CartScreen/CartScreen";
import { WishScreen } from "../features/home/screens/WishListScreen/WishScreen";

const Stack = createStackNavigator();

export const VerifiedAppNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ title: "Home" }}
        />
        <Stack.Screen
            name='Cart'
            component={CartScreen}
            options={{ title: "Cart Screen" }}
        />
        <Stack.Screen
            name='wish'
            component={WishScreen}
            options={{ title: "Wish List Screen" }}
        />
        <Stack.Screen
            name='Menu'
            component={MenuScreen}
            options={{ title: "Menu Screen" }}
        />
        <Stack.Screen
            name='ProductInfo'
            component={ProductInfo}
            options={{ title: "ProductInfo" }}
        />
        <Stack.Screen
            name='Phones'
            component={PhoneScreen}
            options={{ title: "PhonesProductInfo" }}
        />
        <Stack.Screen
            name='Laptops'
            component={LaptopsProduct}
            options={{ title: "LaptopsInfo" }}
        />
        <Stack.Screen
            name='Skincare'
            component={Skincare}
            options={{ title: "SkincareInfo" }}
        />
        <Stack.Screen
            name='Fashion'
            component={Fashion}
            options={{ title: "FashionInfo" }}
        />
        <Stack.Screen
            name='Reauthenticate'
            component={ReauthenticateScreen}
            options={{ title: "Sign in" }}
        />
        <Stack.Screen
            name='UpdatePassword'
            component={UpdatePasswordScreen}
            options={{ title: "Update Password" }}
        />
        <Stack.Screen
            name='NetCheck'
            component={NetCheck}
            options={{ title: "Check internet" }}
        />
    </Stack.Navigator>
);
