import { useGpsPermissionCheck } from "src/features/gps";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import {Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from "react";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { colors } from "src/shared/style";
import {BOTTOM_SHEET_SNAP_POINTS, getBottomSheetOffset} from "../constants/SnapPoints";
import { getBottomSheetComponent } from "../model/bottomStateComponents";

export type OrderBottomSheetProps = {
  bottomSheetState: BottomSheetStateEnum;
  setBottomSheetState: Dispatch<SetStateAction<BottomSheetStateEnum>>
}

const OrderBottomSheet = function({bottomSheetState, setBottomSheetState}: OrderBottomSheetProps) {
    const sheetModalRef = useRef<BottomSheetModal>(null);
    useGpsPermissionCheck(setBottomSheetState)

    const snapPoints = useMemo(() => BOTTOM_SHEET_SNAP_POINTS[bottomSheetState], [bottomSheetState]);
    console.log(snapPoints, 'snapPoints');

    return(
        <BottomSheet
            ref={sheetModalRef}
            index={0}
            snapPoints={snapPoints}
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.bottomSheetHandleIndicator}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={true}>
                {getBottomSheetComponent(bottomSheetState, {setBottomSheetState})}
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: colors.background
    },
    bottomSheetHandleIndicator: {
        width: '10%',
        backgroundColor: colors.opacity
    },
});

export default memo(OrderBottomSheet);
