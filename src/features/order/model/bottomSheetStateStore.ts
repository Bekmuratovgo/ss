import { createEvent, createStore } from "effector";
import { Platform } from "react-native";
import { BOTTOM_SHEET_SNAP_POINTS } from "../constants/SnapPoints";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";

type BottomSheetState = {
    index: number,
    snapPoints: number[],
    bottomSheetState: BottomSheetStateEnum
};

const initialState: BottomSheetState = {
    index: 0,
    snapPoints: Platform.OS === "ios" ? [197, 653] : [177, 623],
    bottomSheetState: BottomSheetStateEnum.LOADING
}

export const setSnapPoints = createEvent<number[]>();
export const setIndex = createEvent<number>();
export const setBottomSheetState = createEvent<BottomSheetStateEnum>();

export const $bottomSheet = createStore<BottomSheetState>(initialState)
    .on(setSnapPoints, (state, snapPoints) => ({...state, snapPoints}))
    .on(setIndex, (state, index) => ({...state, index}))
    .on(setBottomSheetState, (state, bottomSheetState) => ({
        ...state, 
        bottomSheetState, 
        snapPoints: BOTTOM_SHEET_SNAP_POINTS[bottomSheetState]
    }))
