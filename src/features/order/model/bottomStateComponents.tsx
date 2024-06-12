import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import { EnableGps } from "src/features/gps";
import { FinishedOrder, Loader, OrderDetails } from "src/features/main";
import { OrderProcess } from "src/features/main/ui/OrderProcess";
import { PaymentMethod } from "src/features/main/ui/PaymentMethod";
import OrderMenu from "../ui/OrderMenu";
import ArriveMenu from "../ui/ArrivaMenu";
import DepartureMenu from "../ui/DepartureMenu";
import DepartureCity from "../ui/DepartureCity";
import DepartureAddress from "../ui/DepartureAddress";
import ArrivalCity from "../ui/ArrivalCity";
import ArrivalcityAdditional from "../ui/arrivalCityAdditional"
import ArrivaladdressAdditional from "../ui/arrivalAddressAdditional"

import ArrivalAddress from "../ui/ArrivalAddress";
import { TBottomSheetMethods } from "../types/bottomSheetMethods";

export const getBottomSheetComponent = (state: BottomSheetStateEnum, props: TBottomSheetMethods & {}) => {
    const STATE_COMPONENTS = {
        [BottomSheetStateEnum.LOADING]: <Loader />,
        [BottomSheetStateEnum.ORDER_DETAIL]: <OrderDetails  setBottomSheetState={props.setBottomSheetState}/>,
        [BottomSheetStateEnum.ENABLE_GPS]: <EnableGps setBottomSheetState={props.setBottomSheetState}/>,
        [BottomSheetStateEnum.SET_ADDRESS]: <OrderMenu setBottomSheetState={props.setBottomSheetState}/>,
        [BottomSheetStateEnum.SET_DEPARTURE_LOCATION]: <DepartureMenu setBottomSheetState={props.setBottomSheetState}/>,
        [BottomSheetStateEnum.SET_DEPARTURE_CITY]: <DepartureCity setBottomSheetState={props.setBottomSheetState}/>,
        [BottomSheetStateEnum.SET_DEPARTURE_ADDRESS]: <DepartureAddress setBottomSheetState={props.setBottomSheetState}/>,
        [BottomSheetStateEnum.SET_ARRIVAL_LOCATION]: <ArriveMenu setBottomSheetState={props.setBottomSheetState}/>,
        [BottomSheetStateEnum.SET_ARRIVAL_CITY]: <ArrivalCity setBottomSheetState={props.setBottomSheetState}/>,
        [BottomSheetStateEnum.SET_ARRIVAL_CITY_ADDITIONAL]: <ArrivalcityAdditional setBottomSheetState={props.setBottomSheetState}/>,
        [BottomSheetStateEnum.SET_ARRIVAL_ADDRESS]: <ArrivalAddress setBottomSheetState={props.setBottomSheetState}/>,
        [BottomSheetStateEnum.SET_ARRIVAL_ADDRESS_ADDITIONAL]: <ArrivaladdressAdditional setBottomSheetState={props.setBottomSheetState}/>,

        [BottomSheetStateEnum.DEFINED_PAYMENT_METHOD]: <PaymentMethod setBottomSheetState={props.setBottomSheetState} />,
        [BottomSheetStateEnum.ORDER_PROCESS]: <OrderProcess setBottomSheetState={props.setBottomSheetState} />,
        [BottomSheetStateEnum.ORDER_FINISHED]: <FinishedOrder  setBottomSheetState={props.setBottomSheetState}/>
    }
    return STATE_COMPONENTS[state];
};
