import AbstractApiRepository from "src/app/api/ApiRepository";
class MapApi extends AbstractApiRepository {
    async getGeocode(address: string) {
        // const apiKey = "035b796f-9668-4e4d-9fa3-dd2a1ca31999";
        const apiKey = "d692a7d7-638d-46ce-84f0-57c51f83ad0c";
        return this.apiClient.get({
            url: `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(address)}&format=json`
        });
    };
}

export const mapApi = new MapApi();