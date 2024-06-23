import order from "@screens/Order/ui/Order";
import { createEvent, createStore } from "effector";
import { MainStatusEnum } from "../enums/mainStatus.enum";
import { EditingOrder, Order } from "../types/order";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";

type MainState = {
    status: MainStatusEnum;
    order: Order;
    finishedOrder: Order | null;
    editingOrder: EditingOrder;
    orderDetailModal: boolean;
    proceedingOrderId: number | null;
    isOrderCancelling: boolean;
    orderProcessStatus:
        | null
        | "seeking"
        | "received"
        | "complete"
        | "took"
        | "cancelled"
        | "null";
};

export const defaultOrderData = {
  departure: {
    city: "",
    address: "",
  },
  arrival: {
    city: "",
    address: "",
  },
  additionalArrivals: [],
  newArrivals: [],
  additional: [],
  date: new Date(),
  carClass: 0,
  params: {
    babyChair: false,
    buster: false,
    animalTransfer: false,
  },
  baggage: "",
  index: 0,
  passangersAmount: "",
  comment: "",
  paymentMethod: PaymentMethodEnum.CASH,
  isUrgent: false,
  price: null,
}

export const defaultEditingOrder = {
  departure: {
    city: "",
    address: "",
  },
  arrival: {
    city: "",
    address: "",
  },
}

const initialState: MainState = {
    status: MainStatusEnum.NULL,
    order: defaultOrderData,
    editingOrder: defaultEditingOrder,
    finishedOrder: null,
    orderDetailModal: false,
    proceedingOrderId: null,
    orderProcessStatus: null,
    isOrderCancelling: false
};

export const setOrder = createEvent<Order>();
export const setEditingOrder = createEvent<EditingOrder>();
export const setOrderDetailsModal = createEvent<boolean>();
export const setProceedingOrderId = createEvent<number | null>();
export const setStatus = createEvent<MainStatusEnum>();
export const setIsOrderCancelling = createEvent<boolean>();
export const resetOrder = createEvent();
export const setOrderProcessStatus = createEvent<
    null | "seeking" | "received" | "complete" | "took" | "null" | 'cancelled'
>();
export const setFinishedOrder = createEvent<null | Order>();

export const $main = createStore<MainState>(initialState)
    .on(setOrder, (state, order) => ({ ...state, order }))
    .on(setEditingOrder, (state, editingOrder) => ({ ...state, editingOrder }))
    .on(setOrderDetailsModal, (state, orderDetailModal) => ({
        ...state,
        orderDetailModal,
    }))
    .on(setStatus, (state, status) => ({ ...state, status }))
    .on(resetOrder, (state) => ({
        ...state,
        order: { ...initialState.order },
        editingOrder: { ...initialState.editingOrder },
    }))
    .on(setOrderProcessStatus, (state, orderProcessStatus) => ({
        ...state,
        orderProcessStatus,
    }))
    .on(setFinishedOrder, (state, finishedOrder) => ({
        ...state,
        finishedOrder,
    }))
    .on(setProceedingOrderId, (state, orderId) => ({
      ...state,
      proceedingOrderId: orderId
    }))
    .on(setIsOrderCancelling, (state, isCancelling) => ({
      ...state,
      isOrderCancelling: isCancelling
    }))


interface Marker {
    lat: number;
    lon: number;
}

export const setMarkerRemove = createEvent<Marker>();
export const resetMarkerRemove = createEvent();

export const $tempMarkerRemove = createStore<Marker | null>(null)
.on(setMarkerRemove,(_, payload) => payload)
.on(resetMarkerRemove,() => null)




