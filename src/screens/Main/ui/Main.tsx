import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/routers";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    Image,
    Modal,
    Text,
} from "react-native";
import { StackScreens } from "src/routes";
import {
    LocationScopeIcon,
    MenuIcon,
    StatusBarBackground,
} from "src/shared/img";
import { colors } from "src/shared/style";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Map } from "src/features/map";
import {
    $gps,
    setCurrentLocation,
    setGpsEnabled,
    setMyLocationTrigger,
} from "src/features/gps";
import { useUnit } from "effector-react";
import BottomSheet, {
    BottomSheetModal,
    useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import {
    $bottomSheet,
    setBottomSheetState,
} from "src/features/main/model/BottomSheetStore";
import { BottomSheetStateEnum } from "src/features/main/enums/bottomSheetState.enum";
import { OrderDetails } from "src/features/main";
import { $main } from "src/features/main/model/MainStore";
import { getGeocode } from "src/features/map/model/map-actions";
import {
    $map,
    setArrivalLocation,
    setDepartureLocation,
} from "src/features/map/model/MapStore";
import { BOTTOM_SHEET_SNAP_POINTS } from "src/features/main/constants/SnapPoints";
import { STATE_COMPONENTS } from "../constants/StateComponents";
import Geolocation from "@react-native-community/geolocation";
import useGpsCheck from "../hooks/useGpsCheck";

Geolocation.setRNConfiguration({
    skipPermissionRequests: true,
    locationProvider: "auto",
    enableBackgroundLocationUpdates: false,
    authorizationLevel: "whenInUse",
});

type MainProps = NativeStackScreenProps<StackScreens, "Main">;

export const Main: FC<MainProps> = ({ navigation }) => {
    const sheetModalRef = useRef<BottomSheetModal>(null);
    const [
        { isGpsEnabled },
        handleSetGpsEnabled,
        handleSetCurrentLocation,
        handleSetMyPosition,
    ] = useUnit([
        $gps,
        setGpsEnabled,
        setCurrentLocation,
        setMyLocationTrigger,
    ]);
    const [{ bottomSheetState }, handleSetBottomSheetState] = useUnit([
        $bottomSheet,
        setBottomSheetState,
    ]);
    const [{ orderDetailModal, order }] = useUnit([$main]);
    const [
        { arrivalLocation, departureLocation },
        handleSetDepartureLocation,
        handleSetArrivalLocation,
    ] = useUnit([$map, setDepartureLocation, setArrivalLocation]);
    const [initCheckFinish, setInitCheckFinish] = useState<boolean>(false);
    // const {  } = useGpsCheck();

    const handleOpenDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    useEffect(() => {
        let watchPositionId;
        if (isGpsEnabled && initCheckFinish) {
            console.log("Watching...");
            watchPositionId = Geolocation.watchPosition(
                (pos) => {
                    handleSetCurrentLocation({
                        lon: pos.coords.longitude,
                        lat: pos.coords.latitude,
                    });
                },
                (err) => {
                    console.error("Failed to get current location", err);
                },
                {
                    distanceFilter: 0.5,
                    interval: 5000,
                }
            );
        }
        return () => {
            if (watchPositionId) {
                Geolocation.clearWatch(watchPositionId);
            }
        };
    }, [isGpsEnabled, initCheckFinish]);

    // useEffect(() => {
    //     // Получение геокода адреса отправной точки, если заполнены данные
    //     if (order.departure.city && order.departure.address) {
    //         getGeocode(`${order.departure.city},${order.departure.address}`)
    //             .then((res: any) => {
    //                 const points =
    //                     res.response?.GeoObjectCollection?.featureMember[0]
    //                         ?.GeoObject?.Point?.pos;
    //                 if (points) {
    //                     const lat = parseFloat(points.split(" ")[1]);
    //                     const lon = parseFloat(points.split(" ")[0]);

    //                     handleSetArrivalLocation({ lon, lat });
    //                 }
    //             })
    //             .catch((err) =>
    //                 console.error(
    //                     "Failed to get geocode of departure address: ",
    //                     err
    //                 )
    //             );
    //     }
    //     // Получение геокода адреса конечной точки, если заполнены данные

    //     // Чистка геокода адресов, если адреса были очищены
    //     if (
    //         (!order.arrival.city || !order.arrival.address) &&
    //         arrivalLocation
    //     ) {
    //         handleSetArrivalLocation({ lon: null, lat: null });
    //     }
    //     if (
    //         (!order.departure.city || !order.departure.address) &&
    //         (departureLocation || departureLocation)
    //     ) {
    //         handleSetDepartureLocation({ lon: null, lat: null });
    //     }
    // }, [order.arrival, order.departure]);

    const handleMoveToMyPosition = () => {
        handleSetMyPosition(true);
    };

    console.log("Sheet state: ", bottomSheetState);

    const snapPoints = useMemo(
        () => BOTTOM_SHEET_SNAP_POINTS[bottomSheetState],
        [bottomSheetState]
    );

    return (
        <View style={styles.layout}>
            {Platform.OS === "ios" && (
                <Image source={StatusBarBackground} style={styles.status_bar} />
            )}
            <Modal visible={orderDetailModal}>
                <OrderDetails />
            </Modal>
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

            <Map />
            {bottomSheetState === BottomSheetStateEnum.ORDER_PROCESS &&
                isGpsEnabled && (
                    <TouchableOpacity
                        style={styles.myLocation_container}
                        onPress={handleMoveToMyPosition}
                    >
                        <LocationScopeIcon />
                    </TouchableOpacity>
                )}
            {initCheckFinish && (
                <BottomSheet
                    ref={sheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    keyboardBlurBehavior="restore"
                    android_keyboardInputMode="adjustResize"
                    backgroundStyle={styles.bottomSheetBackground}
                    handleIndicatorStyle={styles.bottomSheetHandleIndicator}
                    enableContentPanningGesture={false}
                    enableHandlePanningGesture={true}
                >
                    {STATE_COMPONENTS[bottomSheetState]}
                </BottomSheet>
            )}
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
        // position: 'relative'
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
