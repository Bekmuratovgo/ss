import { useState } from "react";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";

const useOrderBottomSheet = function() {
    const [bottomSheetState, setBottomSheetState] = useState<BottomSheetStateEnum>(BottomSheetStateEnum.LOADING);
    return({
        bottomSheetState,
        setBottomSheetState
    });
};

export default useOrderBottomSheet;