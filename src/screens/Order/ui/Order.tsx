import { Platform, StyleSheet, View } from "react-native";
import { colors } from "src/shared/style";
import OrderStatusBarBackground from "./StatusBarBackground";
import { Map, setDepartureLocation } from "src/features/map";
import { OrderBottomSheet } from "src/features/order";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import {
    LocationScopeIcon,
    MenuIcon,
    StatusBarBackground,
} from "src/shared/img";
import { useEvent, useUnit } from "effector-react";
import { Profile } from "src/types/profile";
import { getProfile, setProfile } from "src/features/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { useEffect } from "react";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import { setGpsEnabled } from "src/features/gps";
import {
    $main,
    setEditingOrder,
    setOrder,
} from "src/features/main/model/MainStore";
import { setBottomSheetState } from "src/features/main/model/BottomSheetStore";
import { BottomSheetStateEnum } from "src/features/main/enums/bottomSheetState.enum";
import { $gps } from "src/features/gps";

const Order = function ({ navigation }) {
    const handleOpenDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };
    const [handleSetGpsEnabled] = useUnit([setGpsEnabled]);
    const [handleSetDepartureLocation] = useUnit([setDepartureLocation]);
    const gpsState = $gps.getState();
    const [
        { order, editingOrder, status },
        handleSetOrder,
        handleSetEditingOrder,
    ] = useUnit([$main, setOrder, setEditingOrder]);

    const handleSetProfile = useEvent(setProfile);

    const handleCheckAuth = async () => {
        const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
        console.log("Token: ", token);
        if (!token) {
            return navigation.navigate("Auth");
        }
        try {
            const profile: Profile = await getProfile();
            console.log("Profile: ", profile);
            handleSetProfile(profile);
        } catch (err) {
            return navigation.navigate("Auth");
        }
        return navigation.navigate("Main");
    };
    useEffect(() => {
        handleCheckAuth();
    }, []);

    const handleCheckGeolocation = async () => {
        try {
            const result = await check(
                Platform.OS === "android"
                    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            );
            if (result === RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;

                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();
                        const city =
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            data.address.hamlet;
                        const address = data.display_name;
                        console.log("Город:", city);
                        console.log("Адрес:", address);

                        handleSetOrder({
                            ...order,
                            departure: {
                                city: city,
                                address: address,
                                lat: latitude,
                                lot: longitude,
                            },
                        });
                        handleSetEditingOrder({
                            ...order,
                            departure: { city: city, address: address },
                        });
                    },
                    (error) => {
                        console.error("Failed to get current location", error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 1000,
                    }
                );
            }
        } catch (err) {
            console.error("Failed to request permission", err);
            setBottomSheetState(BottomSheetStateEnum.ENABLE_GPS);
        }
    };
    useEffect(() => {
        handleCheckGeolocation();
    }, []);
    return (
        <View style={styles.layout}>
            <View
                style={[
                    styles.header,
                    Platform.OS === "ios" && { marginTop: 50 },
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.menu_button,
                        Platform.OS === "ios" && { padding: 10 },
                    ]}
                    onPress={handleOpenDrawer}
                >
                    <MenuIcon />
                </TouchableOpacity>
            </View>
            <>
                <OrderStatusBarBackground />
                <Map />
                <OrderBottomSheet />
            </>
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.white,
        position: "relative",
    },
    status_bar: {
        width: "100%",
        height: 50,
        position: "absolute",
        top: 0,
        zIndex: 10,
    },
    header: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        position: "absolute",
        top: 0,
        zIndex: 10,
    },
    menu_button: {
        padding: 8,
        backgroundColor: colors.black,
        borderRadius: 12,
    },
    bottomSheetBackground: {
        backgroundColor: colors.background,
    },
    bottomSheetHandleIndicator: {
        width: "10%",
        backgroundColor: colors.opacity,
    },
    myLocation_container: {
        backgroundColor: colors.background,
        position: "absolute",
        right: 15,
        bottom: 235,
        padding: 10,
        borderRadius: 100,
    },
});

export default Order;
