import { Platform } from "react-native";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";

export const BOTTOM_SHEET_SNAP_POINTS = {
    [BottomSheetStateEnum.LOADING]: Platform.OS === "ios" ? [653] : [623],
    [BottomSheetStateEnum.ORDER_DETAIL]: Platform.OS === "ios" ? [600] : [623],
    [BottomSheetStateEnum.ENABLE_GPS]: Platform.OS === "ios" ? [440] : [410],
    [BottomSheetStateEnum.SET_ADDRESS]: Platform.OS === "ios" ? [653] : [623],
    [BottomSheetStateEnum.DEFINED_PAYMENT_METHOD]: Platform.OS === "ios" ? [225] : [195],
    [BottomSheetStateEnum.SET_DEPARTURE_LOCATION]: Platform.OS === "ios" ? [325] : [295],
    [BottomSheetStateEnum.SET_DEPARTURE_CITY]: Platform.OS === "ios" ? [285] : [255],
    [BottomSheetStateEnum.SET_DEPARTURE_ADDRESS]: Platform.OS === "ios" ? [285] : [255],
    [BottomSheetStateEnum.SET_ARRIVAL_LOCATION]: Platform.OS === "ios" ? [325] : [295],
    [BottomSheetStateEnum.SET_ARRIVAL_CITY]: Platform.OS === "ios" ? [285, 485] : [255, 455],
    [BottomSheetStateEnum.SET_ARRIVAL_ADDRESS]: Platform.OS === "ios" ? [285] : [255],
    [BottomSheetStateEnum.ORDER_PROCESS]: Platform.OS === "ios" ? [215] : [195],
    [BottomSheetStateEnum.ORDER_FINISHED]: Platform.OS === "ios" ? [440] : [410]
}