import { createContext } from "react";
import { IBottomSheetContext } from "../types/contextSchemas";



export const BottomSheetContext = createContext<IBottomSheetContext>({
    modalRef: null,
    setSnapPoints: null
});