import Geolocation from "@react-native-community/geolocation";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { PERMISSIONS, RESULTS, check,checkMultiple } from "react-native-permissions";
import { $gps, setCurrentLocation, setGpsEnabled } from "src/features/gps";
import { BottomSheetStateEnum } from "src/features/main/enums/bottomSheetState.enum";
import { $bottomSheet, setBottomSheetState } from "src/features/main/model/BottomSheetStore";


const useGpsCheck = function() {
    const [initCheckFinish, setInitCheckFinish] = useState<boolean>(false);
    const [{isGpsEnabled}, handleSetGpsEnabled, handleSetCurrentLocation] = useUnit([$gps, setGpsEnabled, setCurrentLocation])
    const [{ bottomSheetState }, handleSetBottomSheetState] = useUnit([$bottomSheet, setBottomSheetState]);

    const handleCheckGpsPermission = async () => {
        try {
            const result = await check(Platform.OS === "android" ? PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

            
            if (result === RESULTS.GRANTED) {
                console.log('Granted', result);
                handleSetGpsEnabled(true);
                handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
            }
            else {
                console.log('Not granted', result);
                handleSetBottomSheetState(BottomSheetStateEnum.ENABLE_GPS);
            }
        } catch (err) {
            handleSetBottomSheetState(BottomSheetStateEnum.ENABLE_GPS);
        } finally {
            setInitCheckFinish(true);
        }
    }

    useEffect(() => {
        handleCheckGpsPermission();
    }, []);

    useEffect(() => {
        let watchPositionId;
        if (isGpsEnabled && initCheckFinish) {
            console.log('Watching...');
            watchPositionId = Geolocation.watchPosition((pos) => {
                handleSetCurrentLocation({lon: pos.coords.longitude, lat: pos.coords.latitude});
            }, (err) => {
                console.error('Failed to get current location', err);
            }, {
                distanceFilter: 0.5,
                interval: 5000
            })
        }
        return () => {
            if (watchPositionId) {
                Geolocation.clearWatch(watchPositionId);
            }
        }
    }, [isGpsEnabled, initCheckFinish]);

    return({
        isGpsEnabled,
        bottomSheetState
    });
};

export default useGpsCheck;