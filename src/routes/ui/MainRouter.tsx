import React, { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "@styles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Main } from "src/screens/Main";
import { Auth } from "src/screens/Auth";
import { Profile } from "src/screens/profile";
import { DrawerContent } from "src/widgets/Drawer";
import { Init } from "src/screens/init";
import { StackScreens } from "../types/StackScreens";
import {
    DefaultTheme,
    NavigationContainer,
    useNavigation,
} from "@react-navigation/native";
import { TripDetails } from "src/screens/TripDetails";
import { Trips } from "src/screens/Trips";
import { TouchableOpacity } from "react-native";

import { About } from "src/screens/About";
import { Order } from "src/screens/Order";
import { io } from "socket.io-client";
import { useUnit } from "effector-react";
import { $profile } from "src/features/profile";

type CustomStackNavigationOptions = NativeStackNavigationOptions & {
    unmountOnBlur?: boolean;
};

const Stack = createNativeStackNavigator<StackScreens>();
const Drawer = createDrawerNavigator();

export const MainRouter: React.FC = function MainRouter() {
    const [{ profile }] = useUnit([$profile]);

    useEffect(() => {
        const socket = io("http://http://5.35.89.71:3001:3001/order/client");

        socket.on("connect", () => {
            console.log("Connected to server");
            if (profile && profile.phone_number) {
                sendPhoneNumber(profile.phone_number);
            }
        });

        const sendPhoneNumber = (phoneNumber: string) => {
            socket.emit("clientConnected", { phone: phoneNumber });
        };
    }, [profile]);

    useEffect(() => {
        (async () => {
            await RNBootSplash.hide({ fade: true });
        })();
    }, []);
    const shouldShowDrawer = ({ route }: { route: { name: string } }) => {
        const bannedRoutes = ["Init", "Auth", "TripDetails"];
        return !bannedRoutes.includes(route.name);
    };

    return (
        <NavigationContainer
            theme={{
                ...DefaultTheme,
                colors: { ...DefaultTheme.colors, background: colors.white },
            }}
        >
            <Drawer.Navigator
                backBehavior="history"
                drawerContent={DrawerContent}
                screenOptions={({ route }) => ({
                    headerShown: false,
                    drawerType: "front",
                    overlayColor: "rgba(24, 50, 58, 0.41)",
                    drawerStyle: { width: "80%" },
                    swipeEnabled: shouldShowDrawer({ route }),
                })}
            >
                {/* <Stack.Screen name={"Init"} component={Init} /> */}
                <Stack.Screen name={"Main"} component={Order} />
                <Stack.Screen
                    name={"Auth"}
                    component={Auth}
                    options={
                        { unmountOnBlur: true } as CustomStackNavigationOptions
                    }
                />
                <Stack.Screen name={"Trips"} component={Trips} />
                <Stack.Screen name={"TripDetails"} component={TripDetails} />
                <Stack.Screen
                    name={"Profile"}
                    component={Profile}
                    options={
                        { unmountOnBlur: true } as CustomStackNavigationOptions
                    }
                />
                <Stack.Screen name={"About"} component={About} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
