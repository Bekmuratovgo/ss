import { mainApi } from "../api/MainApi";

export const getCities = async (city: string) => {
    const { data } = await mainApi.getCities(city);
    return data;
};

export const createOrder = async (orderData) => {
    const { data } = await mainApi.createOrder(orderData);
    return data;
}