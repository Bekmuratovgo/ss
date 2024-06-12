import { useUnit } from "effector-react";
import { FC, memo } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { Earth, EarthIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { setGpsEnabled } from "../model/GpsStore";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { Button } from "src/shared/components/Button";
import { BottomSheetStateEnum } from "src/features/main/enums/bottomSheetState.enum";
import { TBottomSheetMethods } from "src/features/order/types/bottomSheetMethods";
import Geolocation from "@react-native-community/geolocation";
import { setDepartureLocation } from "src/features/map";
import {
    setEditingOrder,
    setOrder,
    $main,
} from "src/features/main/model/MainStore";

type Props = TBottomSheetMethods & {};

export const EnableGps: FC<Props> = memo(({ setBottomSheetState }) => {
    const [handleSetGpsEnabled] = useUnit([setGpsEnabled]);
    const [handleSetDepartureLocation] = useUnit([setDepartureLocation]);

    const [
        { order, editingOrder, status },
        handleSetOrder,
        handleSetEditingOrder,
    ] = useUnit([$main, setOrder, setEditingOrder]);
    const handlePressLaterButton = () => {
        setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    };

    const handleEnableGps = async () => {
        try {
            const result = await request(
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

                        handleSetDepartureLocation({
                            lat: latitude,
                            lon: longitude,
                        });
                        handleSetOrder({
                            ...order,
                            departure: {
                                city: city,
                                address: address,
                                lat: latitude,
                                lot: longitude,
                            },
                        });
                    },
                    (error) => {
                        console.error("Failed to get current location", error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 1000,
                    }
                );
                handleSetGpsEnabled(true);
            }
        } catch (err) {
            console.error("Failed to request permission", err);
        } finally {
            setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={Earth} style={styles.earth_icon} />
            <Text style={[fonts.bold, styles.title]}>Где вы находитесь?</Text>
            <View style={styles.description_holder}>
                <Text style={[fonts.medium, styles.description]}>
                    Установите ваше местоположение,чтобы мы могли найти
                    ближайший к вам доступный автомобиль
                </Text>
            </View>
            <View style={styles.buttons_holder}>
                <Button onPress={handleEnableGps} projectType="primary">
                    <Text style={[fonts.regular, styles.primary_text]}>
                        Включить GPS
                    </Text>
                </Button>
                <Button
                    onPress={handlePressLaterButton}
                    projectType="secondary"
                >
                    <Text style={[fonts.regular, styles.secondary_text]}>
                        Включить позже
                    </Text>
                </Button>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    bototmSheetBackground: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    earth_icon: {
        marginVertical: 20,
    },
    title: {
        fontSize: 16,
        color: colors.white,
    },
    description_holder: {
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    description: {
        fontWeight: "400",
        fontSize: 16,
        textAlign: "center",
        color: colors.white,
    },
    buttons_holder: {
        width: "100%",
        marginVertical: 10,
        flexDirection: "column",
        rowGap: 10,
    },
    primary_text: {
        color: colors.black,
        textAlign: "center",
    },
    secondary_text: {
        color: colors.white,
        textAlign: "center",
    },
});
