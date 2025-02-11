import {Dimensions, Platform} from "react-native";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";

export let BOTTOM_SHEET_SNAP_POINTS = {
    [BottomSheetStateEnum.LOADING]: Platform.OS === "ios" ? [653] : [653],
    [BottomSheetStateEnum.ORDER_DETAIL]: Platform.OS === "ios" ? [560] : [623],
    [BottomSheetStateEnum.ENABLE_GPS]: Platform.OS === "ios" ? [440] : [440],
    [BottomSheetStateEnum.SET_ADDRESS]: Platform.OS === "ios" ? [390,390] : [440,500],
    [BottomSheetStateEnum.DEFINED_PAYMENT_METHOD]: Platform.OS === "ios" ? [225] : [225],
    [BottomSheetStateEnum.SET_DEPARTURE_LOCATION]: Platform.OS === "ios" ? [325] : [325],
    [BottomSheetStateEnum.SET_DEPARTURE_CITY]: Platform.OS === "ios" ? ['20%'] : ['25%'],
    [BottomSheetStateEnum.SET_DEPARTURE_ADDRESS]: Platform.OS === "ios" ?  ['20%'] : ['25%'],
    [BottomSheetStateEnum.SET_ARRIVAL_LOCATION]: Platform.OS === "ios" ? [300,700] : [325],
    [BottomSheetStateEnum.SET_ARRIVAL_CITY]: Platform.OS === "ios" ?  ['20%'] : ['25%'],
    [BottomSheetStateEnum.SET_ARRIVAL_ADDRESS]: Platform.OS === "ios" ?  ['20%'] : ['25%'],
    [BottomSheetStateEnum.SET_ARRIVAL_CITY_ADDITIONAL]: Platform.OS === "ios" ?  ['20%'] : ['25%'],
    [BottomSheetStateEnum.SET_ARRIVAL_ADDRESS_ADDITIONAL]: Platform.OS === "ios" ?  ['20%'] : ['25%'],
    [BottomSheetStateEnum.ORDER_PROCESS]: Platform.OS === "ios" ? [215] : [225],
    [BottomSheetStateEnum.ORDER_FINISHED]: Platform.OS === "ios" ? [440] : [450]
}

export function getBottomSheetOffset(stateEnum: BottomSheetStateEnum) {
  const deviceHeight = Dimensions.get("window").height;
  const snapPoints = BOTTOM_SHEET_SNAP_POINTS[stateEnum];

  if (!snapPoints || snapPoints.length === 0) {
    return 0;
  }

  let minPoint = Infinity;

  snapPoints.forEach(point => {
    if (typeof point === 'string' && point.endsWith('%')) {
      const percentageValue = parseFloat(point);
      const pixelValue = (percentageValue / 100) * deviceHeight;
      if (pixelValue < minPoint) {
        minPoint = pixelValue;
      }
    } else if (typeof point === 'number') {
      if (point < minPoint) {
        minPoint = point;
      }
    }
  });

  return (deviceHeight - minPoint) + 80;
}

export const getBottomSheetSnapPoints = () => BOTTOM_SHEET_SNAP_POINTS;

export const setBottomSheetSnapPoint = (key, newValue) => {
    BOTTOM_SHEET_SNAP_POINTS = {
        ...BOTTOM_SHEET_SNAP_POINTS,
        [key]: newValue,
    };
};
