import { Platform } from "react-native";

export const getModalHeight = (snapPoints: (number | string)[] | (number | string)) => {
    if (Platform.OS === "ios") {
        if (Array.isArray(snapPoints)) {
            return  snapPoints.map(item => typeof item === "number" ? item + 30 : item);
        }
        return typeof snapPoints === "number" ? snapPoints + 30 : snapPoints;
    }
    return snapPoints;
}