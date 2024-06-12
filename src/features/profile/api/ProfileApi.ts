
import AsyncStorage from "@react-native-async-storage/async-storage";
import AbstractApiRepository from "src/app/api/ApiRepository";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { APP_URL } from "src/appConfig";
import { Endpoints } from "src/shared/utils/endpoints";
import { Profile } from "src/types/profile";


class ProfileApi extends AbstractApiRepository {
    async getProfile() {
        const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
        return this.apiClient.get<Profile>({
            url: Endpoints.getProfile,
            config: {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        });
    };
    async updateProfile(data) {
        const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
        return this.apiClient.put({
            url: Endpoints.updateProfile,
            data,
            config: {
                headers: {
                    Authorization: "Bearer " + token
                }
            },
        })
    };
    async updateFcmToken(fcm_token: string) {
        const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
        return this.apiClient.put({
            url: Endpoints.updateFcmToken,
            data: { fcm_token },
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        })
    }
};

export const profileApi = new ProfileApi();