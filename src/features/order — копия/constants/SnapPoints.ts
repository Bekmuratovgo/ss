import { Platform } from "react-native";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";

export let BOTTOM_SHEET_SNAP_POINTS = {
    [BottomSheetStateEnum.LOADING]: Platform.OS === "ios" ? [653] : [653],
    [BottomSheetStateEnum.ORDER_DETAIL]: Platform.OS === "ios" ? [500] : [623],
    [BottomSheetStateEnum.ENABLE_GPS]: Platform.OS === "ios" ? [440] : [440],
    [BottomSheetStateEnum.SET_ADDRESS]: Platform.OS === "ios" ? [390,480] : [390,480],
    [BottomSheetStateEnum.DEFINED_PAYMENT_METHOD]: Platform.OS === "ios" ? [225] : [225],
    [BottomSheetStateEnum.SET_DEPARTURE_LOCATION]: Platform.OS === "ios" ? [340] : [340],
    [BottomSheetStateEnum.SET_DEPARTURE_CITY]: Platform.OS === "ios" ? ['20%'] : ['20%'],
    [BottomSheetStateEnum.SET_DEPARTURE_ADDRESS]: Platform.OS === "ios" ?  ['20%'] : ['20%'],
    [BottomSheetStateEnum.SET_ARRIVAL_LOCATION]: Platform.OS === "ios" ? [320] : [320],
    [BottomSheetStateEnum.SET_ARRIVAL_CITY]: Platform.OS === "ios" ?  ['20%'] : ['20%'],
    [BottomSheetStateEnum.SET_ARRIVAL_ADDRESS]: Platform.OS === "ios" ?  ['20%'] : ['20%'],
    [BottomSheetStateEnum.SET_ARRIVAL_CITY_ADDITIONAL]: Platform.OS === "ios" ?  ['20%'] : ['20%'],
    [BottomSheetStateEnum.SET_ARRIVAL_ADDRESS_ADDITIONAL]: Platform.OS === "ios" ?  ['20%'] : ['20%'],
    [BottomSheetStateEnum.ORDER_PROCESS]: Platform.OS === "ios" ? [215] : [215],
    [BottomSheetStateEnum.ORDER_FINISHED]: Platform.OS === "ios" ? [440] : [440]
}

export const getBottomSheetSnapPoints = () => BOTTOM_SHEET_SNAP_POINTS;

export const setBottomSheetSnapPoint = (key, newValue) => {
    BOTTOM_SHEET_SNAP_POINTS = {
        ...BOTTOM_SHEET_SNAP_POINTS,
        [key]: newValue,
    };
};