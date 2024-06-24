import {OrderStatusEnum} from "src/features/trips/model/orderEnum";

export type OrderDriver = {
  "__v": number,
  "_id": string,
  "avatar": string,
  "balance": number,
  "carBrandId": {
    title: string
  },
  "carColor": string,
  "carModel": string,
  "carPhotoArray": string[],
  "code": string,
  "fcm_token": null,
  "firstName": string,
  "is_banned": boolean,
  "lastLoginTime": string,
  "lastName": string,
  "middleName": string,
  "notification": boolean,
  "passportArray": string[],
  "phone": string,
  "popup": boolean,
  "publicNumber": string,
  "regComplete": string,
  "sound_signal": boolean,
  "subToUrgent": boolean,
  "subToUrgentDate": string,
  "subscription_status": boolean,
  "subscription_until": string,
  "tariffId": string,
  "telegram": string
}

export type Order = {
  _id?: string;
  order_id?: number;
  order_start: string;
  order_end: string;
  order_start_full: string;
  order_end_full: string;
  order_tariff: string;
  order_count_people: string;
  order_count_bags: string;
  order_date: string | Date;
  order_time: string;
  order_comment: string;
  order_client_phone: string;
  order_buster: boolean;
  order_animals: boolean;
  order_baby_chair: boolean;
  order_status: OrderStatusEnum;
  order_price?: string;
  order_dispatcher?: string;
  order_driver?: OrderDriver;
  order_payment: string;
  order_distance: number;
}


