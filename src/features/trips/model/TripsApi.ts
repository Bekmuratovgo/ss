import AsyncStorage from "@react-native-async-storage/async-storage";
import AbstractApiRepository from "src/app/api/ApiRepository";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { Endpoints } from "src/shared/utils/endpoints";

const checkAuthorization = () => {
    return AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
  };
  
  class TripsApi extends AbstractApiRepository {
    async getTrips(phone) {
        const token = await checkAuthorization()
        return this.apiClient.post({
            url: Endpoints.getTrips,
            data : {phone},
            config: {
                headers: {
                    Authorization: "Bearer " + token
                }
            },
        })
    };
 
  }
  
  export const tripsApi = new TripsApi();