import { EnableGps } from "src/features/gps";
import { ArriveAddressMenu, DepartureAddressMenu, FinishedOrder, Loader, SelectArrivalAddress, SelectArrivalCity, SelectDepartureAddress, SelectDepartureCity } from "src/features/main";
import { BottomSheetStateEnum } from "src/features/main/enums/bottomSheetState.enum";
import { OrderProcess } from "src/features/main/ui/OrderProcess";
import { PaymentMethod } from "src/features/main/ui/PaymentMethod";
import { SetAddress } from "src/features/main/ui/SetAddress";

export const STATE_COMPONENTS = {
    [BottomSheetStateEnum.LOADING]: <Loader />,
    [BottomSheetStateEnum.ENABLE_GPS]: <EnableGps />,
    [BottomSheetStateEnum.SET_ADDRESS]: <SetAddress />,
    [BottomSheetStateEnum.SET_DEPARTURE_LOCATION]: <DepartureAddressMenu />,
    [BottomSheetStateEnum.SET_DEPARTURE_CITY]: <SelectDepartureCity/>,
    [BottomSheetStateEnum.SET_DEPARTURE_ADDRESS]: <SelectDepartureAddress />,
    [BottomSheetStateEnum.SET_ARRIVAL_LOCATION]: <ArriveAddressMenu />,
    [BottomSheetStateEnum.SET_ARRIVAL_CITY]: <SelectArrivalCity/>,
    [BottomSheetStateEnum.SET_ARRIVAL_ADDRESS]: <SelectArrivalAddress />,
    [BottomSheetStateEnum.DEFINED_PAYMENT_METHOD]: <PaymentMethod />,
    [BottomSheetStateEnum.ORDER_PROCESS]: <OrderProcess />,
    [BottomSheetStateEnum.ORDER_FINISHED]: <FinishedOrder />
}