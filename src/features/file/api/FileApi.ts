import AsyncStorage from "@react-native-async-storage/async-storage";
import AbstractApiRepository from "src/app/api/ApiRepository";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { Endpoints } from "src/shared/utils/endpoints";


export class FileApi extends AbstractApiRepository {
    async upload(formData: FormData) {
        const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
        return this.apiClient.post({
            url: Endpoints.uploadFiles,
            data: formData,
            config: {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            }
        });
    };
};