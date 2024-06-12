import { useUnit } from "effector-react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    $main,
    setEditingOrder,
    setMarkerRemove,
    setOrder,
} from "src/features/main/model/MainStore";
import { BuildingIcon, CrossIcon, LocationMarkIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { TBottomSheetMethods } from "../types/bottomSheetMethods";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import { Button } from "src/shared/components/Button";
import { BOTTOM_SHEET_SNAP_POINTS } from "../constants/SnapPoints";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { BottomSheetModal, useBottomSheet } from "@gorhom/bottom-sheet";
import { setBottomSheetState, $bottomSheet } from 'src/features/main/model/BottomSheetStore';
import { setSnapPoints } from "../model/bottomSheetStateStore";
import { getGeocode } from "src/map/model/map-actions";

type Props = TBottomSheetMethods & {};

const ArriveMenu: FC<Props> = function ({ setBottomSheetState}) {
    const [{ order, editingOrder, }, handleSetOrder, handleSetEditingOrder] =
        useUnit([$main, setOrder, setEditingOrder]);
        const [bottomSheet, setBottomSheet] = useState<BottomSheetStateEnum>(BottomSheetStateEnum.LOADING);
        const sheetModalRef = useRef<BottomSheetModal>(null);

        const [{snapPoints}, handleSetSnapPoints] = useUnit([$bottomSheet, setSnapPoints]);
        const { snapToPosition } = useBottomSheet();
        const [snapPos, setSnapPos] = useState(BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.SET_ARRIVAL_LOCATION][0]);
        useEffect(() => {
            const points = BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.SET_ARRIVAL_LOCATION];
            if (order.additionalArrivals.length === 0) {
                snapToPosition(points[0]);
                handleSetSnapPoints(points);
                setSnapPos(points[0]);
            }
            else if (order.additionalArrivals.length == 1) {
                snapToPosition(points[0] + 200);
                handleSetSnapPoints(points.map(pos => pos + 200));
                setSnapPos(points[0] + 200);
            }
            else if  (order.additionalArrivals.length == 2) {
                snapToPosition(points[0] + 250);
                handleSetSnapPoints(points.map(pos => pos + 250));
                setSnapPos(points[0] + 250);
            }
            else if  (order.additionalArrivals.length == 3) {
                snapToPosition(points[0] + 400);
                handleSetSnapPoints(points.map(pos => pos + 400));
                setSnapPos(points[0] + 400);
            }
        }, [order.additionalArrivals]);

      const [handleMarkerRemove] =   useUnit([setMarkerRemove])

    const index = order.index;

    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
      }, []);
    
    const handleSnapPress = useCallback((index) => {
        sheetModalRef.current?.snapToIndex(index);
      }, []);

    async function applyLocation() {

        try {
            handleSetOrder({...order, newArrivals: [...order.additionalArrivals]});
            let stopsArr: any = [...order.additionalArrivals];
            for (let i = 0; i < stopsArr.length; i++){
                if (stopsArr[i].city !== '' && stopsArr[i].address !== '') {
                    const res: any = await getGeocode(`${stopsArr[i].city},${stopsArr[i].address}`);
                    
                    const points = res.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos;
                    if (points) {
                        const lat = parseFloat(points.split(' ')[1]);
                        const lon = parseFloat(points.split(' ')[0]);
        
                        const additionalArrivals = order.additionalArrivals?.slice() || [];
    
                        additionalArrivals[index] = {
                            ...additionalArrivals[index],
                            lat: lat,
                            lon: lon
                        };
                        stopsArr[i] = {
                            ...stopsArr[i],
                            lat,
                            lon
                        }
                    }
                }
            }
            handleSetOrder({ ...order, arrival: editingOrder.arrival, additionalArrivals: [...stopsArr], newArrivals: [] });
        } catch(err) {
            console.error('Failed to get geocode of additional arrival address: ', err)
        } finally {
            sheetModalRef.current?.snapToPosition(Platform.OS === "ios" ? 653 : 623);
            setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
        }
        
    }

    function onClose() {
        handleSetEditingOrder({ ...editingOrder, arrival: order.arrival });
        handleSetOrder({...order, newArrivals: []});
        setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    }

    function openCitySelection() {
        setBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_CITY);
    }

    function openAddressSelection() {
        setBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_ADDRESS);
    }
    function openCitySelectionAdditional(index: number) {
        handleSetOrder({ ...order, index: index  });
        setBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_CITY_ADDITIONAL);
    }
    function openAddressSelectionAddress(index: number) {
        handleSetOrder({ ...order, index: index });

        setBottomSheetState(
            BottomSheetStateEnum.SET_ARRIVAL_ADDRESS_ADDITIONAL
        );
    }



    function handlePlusAdditional() {
        if (order.additionalArrivals.length <= 2) {
            const arrival = {
                city: '',
                address: '',
            }
             const additionalArrivals = order?.additionalArrivals?.slice() || [];
             additionalArrivals.push(arrival);
    
            handleSetOrder({...order, additionalArrivals,  index: index + 1});
        }

    }



    function handleDeleteAdditional(indexToDelete: number) {
        const additionalArrivals = order?.additionalArrivals?.slice().filter((_, indexAdditional) => indexAdditional !== indexToDelete) || [];
        const removeMarker = order.additionalArrivals.find((_,indexAdditional) => indexAdditional == indexToDelete)
        handleMarkerRemove({lat: removeMarker.lat, lon: removeMarker.lon})

        handleSetOrder({ ...order, additionalArrivals,  index: index - 1 });

    }

    


    return (
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity onPress={onClose} style={styles.close_button}>
                    <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>
                    Куда едем?
                </Text>
            </View>
            <View style={styles.container_body}>
                <Button onPress={openCitySelection} projectType="address_input">
                    <BuildingIcon width={25} />
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[fonts.regular, styles.button_text]}
                    >
                        {editingOrder.arrival.city || "Выберите город"}
                    </Text>
                </Button>
                <Button
                    onPress={openAddressSelection}
                    projectType="address_input"
                >
                    <LocationMarkIcon width={25} />
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[fonts.regular, styles.button_text]}
                    >
                        {editingOrder.arrival.address || "Адрес"}
                    </Text>
                </Button>
            </View>
            {[ ...order.additionalArrivals].map((arrival, index) => (
                <View style={{ display: "flex", flexDirection: "row" }} key={index}>
                    <View style={styles.container_body_add}>
                        <Button
                            onPress={() => openCitySelectionAdditional(index)}
                            projectType="address_input"
                        >
                            <BuildingIcon width={25} />
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[fonts.regular, styles.button_text]}
                            >
                                {arrival.city || "Выберите город"}
                            </Text>
                        </Button>
                        <Button
                            onPress={() => openAddressSelectionAddress(index)}
                            projectType="address_input"
                        >
                            <LocationMarkIcon width={25} />
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[fonts.regular, styles.button_text]}
                            >
                                {arrival.address || "Адрес"}
                            </Text>
                        </Button>
                    </View>
                    <View style={styles.buttom_circle}>
                        <Text
                            onPress={() => handleDeleteAdditional(index)}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={[fonts.regular, styles.button_textAdd]}
                        >
                            X
                        </Text>
                    </View>
                </View>
            ))}

            <View style={styles.additional_container}>
                {order.additionalArrivals.length < 3 && (
                    <TouchableOpacity>
    <Text
                        onPress={handlePlusAdditional}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.additional_text}
                    >
                        Добавить остановку
                    </Text>
                    </TouchableOpacity>
                
                )}
            </View>
            <View style={styles.buttons_holder}>
                <Button onPress={applyLocation} projectType="primary">
                    <Text style={[fonts.medium, styles.apply_button_text]}>
                        Применить
                    </Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    container_header: {},
    additional_container: {
        display: "flex",
        alignItems: "center",
        marginBottom: 25,
    },
    additional_text: {
        color: colors.white,
        textDecorationLine: "underline",
        width: "90%",
        fontSize: 17,
    },
    header_title: {
        width: "100%",
        fontSize: 16,
        color: colors.white,
        textAlign: "center",
        marginVertical: 5,
    },
    close_button: {
        backgroundColor: colors.opacity,
        borderRadius: 12,
        padding: 8,
        position: "absolute",
        left: 0,
        zIndex: 1,
    },
    button_text: {
        fontSize: 16,
        color: colors.white,
        width: "80%",
    },
    button_textAdd: {
        fontSize: 16,
        border: "2px solid #fff",
        color: colors.white,
        fontWeight: "700",
        width: "100%",
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 12,
        padding: 8,
    },
    container_body: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "column",
        rowGap: 10,
    },
    container_body_add: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "column",
        rowGap: 10,
    },
    buttons_holder: {},
    buttom_circle: {
        marginLeft: 10,
        backgroundColor: "transparent",
        borderRadius: 10,
        color: colors.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    apply_button_text: {
        textAlign: "center",
        color: colors.black,
        fontSize: 16,
    },
});

export default ArriveMenu;

