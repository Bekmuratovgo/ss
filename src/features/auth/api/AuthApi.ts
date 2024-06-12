
import AbstractApiRepository from "src/app/api/ApiRepository";
import { APP_URL } from "src/appConfig";
import { Endpoints } from "src/shared/utils/endpoints";
import { RequestCodeResponse } from "../types/AuthResponse";


class AuthApi extends AbstractApiRepository {
    requestCode(phone_number: string) {
        return this.apiClient.post<RequestCodeResponse>({
            url: Endpoints.requestCode,
            data: { phone_number },
        });
    };
    verifyCode(phone_number: string, code: string) {
        return this.apiClient.post({
            url: Endpoints.verifyCoe,
            data: { phone_number, code }
        });
    };
};

export const authApi = new AuthApi();