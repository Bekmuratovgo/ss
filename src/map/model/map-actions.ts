import { mapApi } from "../api/MapApi"

export const getGeocode = async (address: string) => {
    const { data } = await mapApi.getGeocode(address);
    return data;
}