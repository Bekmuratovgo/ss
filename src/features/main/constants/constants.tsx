import { BuisinessClassCar, ComfortClassCar, MinivenClassCar, StandartClassCar, UrgentIcon, WhiteCreditCardIcon, WhiteWalletIcon } from "src/shared/img";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";

export const CARS_CLASSES = [
    { label: "Срочный", img: UrgentIcon, id: "", price: 40 },
    { label: "Стандарт", img: StandartClassCar, id: "658ae8fdd6d1b39add937b8c", price: 25},
    { label: "Комфорт", img: ComfortClassCar, id: "", price: 30 },
    { label: "Бизнес", img: BuisinessClassCar, id: "", price: 35 },
    { label: "Минивэн", img: MinivenClassCar, id: "", price: 40 },

];

export const PAYMENT_METHODS = {
    [PaymentMethodEnum.CASH]: { label: "Наличные", Icon: <WhiteWalletIcon width={25} /> },
    [PaymentMethodEnum.CARD]: { label: "Перевод", Icon: <WhiteCreditCardIcon width={25} /> },
}