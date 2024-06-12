import { tripsApi } from "./TripsApi";

export const getTrips = async (phone : string) => {
    const { data } = await tripsApi.getTrips(phone);
    return data;
  };