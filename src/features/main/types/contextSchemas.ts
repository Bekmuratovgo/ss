import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export interface IBottomSheetContext {
    modalRef: React.RefObject<BottomSheetModalMethods> | null;
    setSnapPoints: ((points: (string | number)[]) => void) | null;
}