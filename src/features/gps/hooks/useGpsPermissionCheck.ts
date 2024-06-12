import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { PERMISSIONS, RESULTS, check } from "react-native-permissions";
import { BottomSheetStateEnum } from "src/features/order/enums/bottomSheetState.enum";

const OS_PERMISSIONS = {
    "android": PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    "ios": PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
}

const useGpsPermissionCheck = function(setBottomSheetState: (value: BottomSheetStateEnum) => void) {
    const [isGpsEnabled, setIsGpsEnabled] = useState<boolean>(false);
    
    function checkGpsPermission() {
        check(OS_PERMISSIONS[Platform.OS])
            .then((result) => {
                if (result === RESULTS.GRANTED) {
                    setIsGpsEnabled(true);
                    setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
                }
                else {
                    setBottomSheetState(BottomSheetStateEnum.ENABLE_GPS);
                }    
            }).catch(() => {
                setIsGpsEnabled(false);
                setBottomSheetState(BottomSheetStateEnum.ENABLE_GPS);
            });
    }

    useEffect(checkGpsPermission, []);
    
    return({
        isGpsEnabled
    });
};

export default useGpsPermissionCheck;