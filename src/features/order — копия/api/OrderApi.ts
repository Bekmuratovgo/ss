import AbstractApiRepository from "src/app/api/ApiRepository";
import { ICity } from "src/types/city";
import { Endpoints } from "src/shared/utils/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { IAddress } from "src/types/address";


const checkAuthorization = async () => {
    return AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
  };

class OrderApi extends AbstractApiRepository {
    async getCities(query: string) {
        const apiKey = 'e35cdf79-1eb6-4895-96c0-038767c7af03';
        return this.apiClient.get<ICity[]>({
            url: `https://suggest-maps.yandex.ru/v1/suggest?apikey=${apiKey}&text=${query}&types=locality` // Free yandex api to search objects (locality == cities, villages and regions)
        });
    };
    async getAddress(query: string) {
        const apiKey = 'e35cdf79-1eb6-4895-96c0-038767c7af03';
        return this.apiClient.get<IAddress[]>({
            url: `https://suggest-maps.yandex.ru/v1/suggest?apikey=${apiKey}&text=${query}&results=3&&types=street,house,district,metro` // Free yandex api to search street
        });
    };

    async createOrder(data) {
        const token = await checkAuthorization();
        return this.apiClient.post({
            url: Endpoints.createOrder,
            data,
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        })
    };
    async getPrice(data) {
        const token = await checkAuthorization();
        return this.apiClient.post({
            url: Endpoints.getPrice,
            data,
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        })
    }
}

export const orderApi = new OrderApi();