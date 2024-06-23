import {orderApi} from "@src/features/order/api/OrderApi";
import { mainApi } from "../api/MainApi";

export const getCities = async (city: string) => {
    const { data } = await mainApi.getCities(city);
    return data;
};

export const createOrder = async (orderData) => {
    const { data } = await mainApi.createOrder(orderData);
    return data;
}

export const deleteOrder = async (orderId: number) => {
  const { data } = await mainApi.deleteOrder(orderId);

  return data;
}
