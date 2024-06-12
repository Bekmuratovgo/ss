import AbstractApiRepository from "../../../app/api/ApiRepository";
import { APP_URL, TYPE } from "../../../appConfig";
import { IUsersDriverInfoResponse } from "@screens/init/init-response";

class InitApi extends AbstractApiRepository {
  usersDriverInfo(token?: string) {
    return this.apiClient.get<IUsersDriverInfoResponse>({
      url: `${APP_URL}/users/${TYPE}/info`,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }
}

export const initApi = new InitApi();
