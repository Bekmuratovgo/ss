import { CARS_CLASSES } from "src/features/main/constants/constants";
import { Order } from "src/types/order";
import { OrderStatusEnum } from "../model/orderEnum";

export const TRIPS_MOCK: Order[] = [
    {
        order_animals: false,
        order_baby_chair: true,
        order_buster: false,
        order_client_phone: "+7 988 888 88 88",
        order_comment: "",
        order_count_bags: "0",
        order_count_people: "0",
        order_date: "23.12.2023",
        order_end: "г.Киото",
        order_start: "г.Токио",
        order_start_full: "Пр.Науки 34,д45",
        order_end_full: "ул.Маккейна 23, д13",
        order_tariff: CARS_CLASSES[0].label,
        order_time: "ближайшее",
        _id: "someId",
        order_status: OrderStatusEnum.in_process,
        order_dispatcher: "",
        order_payment: "Наличные",
        order_id: 9686997678,
        order_distance: 153,
        order_price: "20000",
        order_driver: {
            name: "Антон Чехов",
            phone_number: "+7 988 888 88 88",
            carNumber: "A484EP777",
            carColor: "Красная",
            carBrand: "BMW",
            carModel: "X5"
        }
    },
    {
        order_animals: false,
        order_baby_chair: true,
        order_buster: false,
        order_client_phone: "+7 988 888 88 88",
        order_comment: "",
        order_count_bags: "0",
        order_count_people: "0",
        order_price: "20000",
        order_date: "23.12.2023",
        order_end: "г.Киото",
        order_start: "г.Токио",
        order_start_full: "Пр.Науки 34,д45",
        order_end_full: "ул.Маккейна 23, д13",
        order_tariff: "",
        order_time: "ближайшее",
        _id: "someId2",
        order_status: OrderStatusEnum.selling,
        order_dispatcher: "",
        order_payment: "Наличные",
        order_id: 9686997678,
        order_distance: 153,
        order_driver: null
    },
]