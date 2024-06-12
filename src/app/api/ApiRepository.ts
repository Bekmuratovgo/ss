import { ApiClientTypes, IApiClient } from "./ApiInterfaces";
import AxiosClient from "./axios/AxiosClient";

export default abstract class AbstractApiRepository<
  T extends IApiClient = AxiosClient
> {
  protected apiClient!: T;

  private static clients: { [key: number]: IApiClient } = {
    [ApiClientTypes.axios]: new AxiosClient(),
  };

  constructor(apiClientType = ApiClientTypes.axios) {
    //@ts-ignore
    this.setApiClient(AbstractApiRepository.clients[apiClientType]);
  }

  private setApiClient = (apiClient: T) => {
    this.apiClient = apiClient;
  };
}
