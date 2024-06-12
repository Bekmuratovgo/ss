import { orderApi } from "../api/OrderApi";


export const getCities = async (city: string) => {
    const { data } = await orderApi.getCities(city);
    return data;
};
export const getAddress = async (address: string) => {
    const { data } = await orderApi.getAddress(address);
    return data;
};

export const createOrder = async (orderData) => {
    const { data } = await orderApi.createOrder(orderData);
    return data;
}
export const getPrice = async (orderData) => {
    const { data } = await orderApi.getPrice(orderData);
    return data;
}