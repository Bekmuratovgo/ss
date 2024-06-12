import AbstractApiRepository from "../../../app/api/ApiRepository";
import { UserRoleBackend } from "../../../types/role";
import { IGetSubscriptionTypes } from "@screens/subscription/subscription-response";
import { APP_URL } from "../../../appConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from '../../../app/types/authorization';
import { AxiosRequestConfig } from "axios";

const checkAuthorization = () => {
  return AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
};

class SubscriptionApi extends AbstractApiRepository {
  async getSubscriptionTypes(role?: UserRoleBackend) {
    const token = await checkAuthorization();
    const headers: AxiosRequestConfig["headers"] = {
      Authorization: `Bearer ${token}`,
    };
    return this.apiClient.get<IGetSubscriptionTypes>({
      url: `${APP_URL}/subscription/types`,
      config: {
        headers,
        params: {
            role
        },
      },
    });
  }
  async subscriptionSubscribe() {
    const token = await checkAuthorization();
    const headers: AxiosRequestConfig["headers"] = {
      Authorization: `Bearer ${token}`,
    };
    return this.apiClient.post<any>({
      url: `${APP_URL}/subscription/subscribe`,
      config: {
        headers,
      },
    });
  }

  async approve(type: string) {
    const token = await checkAuthorization();
    const headers: AxiosRequestConfig["headers"] = {
      Authorization: `Bearer ${token}`,
    };
    return this.apiClient.get<{message: string}>({
        url: APP_URL + '/subscription/approve',
        config: {
            headers,
            params: {
                type
            }
        }
    });
  }
}

export const subscriptionApi = new SubscriptionApi();
