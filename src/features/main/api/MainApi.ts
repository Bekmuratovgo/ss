import AbstractApiRepository from "src/app/api/ApiRepository";
import { APP_URL } from "src/appConfig";
import { ICity } from "src/types/city";
import { Location } from "../types/address";
import { Endpoints } from "src/shared/utils/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "src/app/types/authorization";


const checkAuthorization = async () => {
    return AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
  };

class MainApi extends AbstractApiRepository {
    async getCities(city: string) {
        const token = await checkAuthorization();
        return this.apiClient.get<ICity[]>({
            url: Endpoints.getCity,
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                },
                params: {
                    city
                }
            }
        });
    };

    async createOrder(data) {
        const token = await checkAuthorization();
        // console.log(token);
        return this.apiClient.post({
            url: Endpoints.createOrder,
            data,
            config: {
                headers: {
                    // Authorization: 'Bearer ' + token
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiIrOTk2OTk3MTI5MTAyIiwidXNlcl9pZCI6IjY1OTEwZDI3NmNlNDE4NTcwZjU2ZTlkMiIsImlhdCI6MTcwNDc2ODU0MH0.xIHEReQCFEu83fuHHxYkLV3FDPAYWbqdnpcmcUZ-UjE'
                }
            }
        })
    }
}

export const mainApi = new MainApi();