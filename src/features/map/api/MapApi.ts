import AbstractApiRepository from "src/app/api/ApiRepository";
class MapApi extends AbstractApiRepository {
    async getGeocode(address: string) {
        // const apiKey = "035b796f-9668-4e4d-9fa3-dd2a1ca31999";
        const apiKey = "68d5aecf-911e-44d1-a833-f50832c1f69a";
        const res = this.apiClient.get({
            url: `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(address)}&format=json`
        });
        console.log(res, 'CHECK--1');
        
        return res;
    };
}

export const mapApi = new MapApi();