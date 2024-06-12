import React, { memo, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { useUnit } from "effector-react";
import {
    $map,
    setArrivalLocation,
    setDepartureLocation,
} from "../model/MapStore";
import {
    $main,
    $tempMarkerRemove,
    resetMarkerRemove,
    setOrder,
} from "src/features/main/model/MainStore";
import { CARS_CLASSES } from "src/features/main/constants/constants";
import {
    $gps,
    setMyLocationTrigger as triggerMyPosition,
} from "src/features/gps";
import { getGeocode } from "../model/map-actions";

function Map() {
    const [
        { arrivalLocation, departureLocation, defaultLocation },
        handleSetDepartureLocation,
        handleSetArrivalLocation,
    ] = useUnit([$map, setDepartureLocation, setArrivalLocation]);

    const [{ order }, handleSetOrder] = useUnit([$main, setOrder]);
    const [markerRemove, handleResetMarkerRemove] = useUnit([
        $tempMarkerRemove,
        resetMarkerRemove,
    ]);
    const [
        { setMyLocationTrigger, lat: myLat, lon: myLon },
        handleSetMyPosition,
    ] = useUnit([$gps, triggerMyPosition]);
    const [routeDetails, setRouteDetails] = useState({
        distance: null,
        time: null,
    });
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [firstLocationLoad, setFirstLocationLoad] = useState<boolean>(false);
    const stops = order.additionalArrivals;

    useEffect(() => {
        if (this._webView && mapLoaded) {
            if (departureLocation) {
                this._webView.injectJavaScript(
                    `addStartMarker(${departureLocation.lat}, ${departureLocation.lon})`
                );
            } else {
                this._webView.injectJavaScript("removeStartMarker()");
            }
        }
    }, [departureLocation]);
    const isUpdatedAddArrivals = order.additionalArrivals.length;
    useEffect(() => {
        if (!this._webView || !mapLoaded) return;

        if (arrivalLocation) {
            console.log("arr location", arrivalLocation);
            let test = "";

            const query = `${arrivalLocation.lat}, ${arrivalLocation.lon}`;

            for (const add of order.additionalArrivals) {
                test += `{lat:${add.lat}, lon:${add.lon}},`;
            }
            console.log("query", query);
            this._webView.injectJavaScript(
                `
                additionalStops = [${test}]
                addEndMarker(${query})`
            );
        } else {
            this._webView.injectJavaScript("removeEndMarker()");
        }
    }, [arrivalLocation, isUpdatedAddArrivals]);

    useEffect(() => {
        if (this._webView && mapLoaded) {
            if (markerRemove) {
                this._webView.injectJavaScript(`removeMarkerInMap()`);
            }
            order.additionalArrivals.forEach(({ lat, lon }) => {
                console.log("index from additionalArrivals");

                if (lat && lon) {
                    this._webView.injectJavaScript(
                        `addStop(${lat}, ${lon},${+1})`
                    );
                }
            });
            handleResetMarkerRemove();
        }
    }, [order.additionalArrivals, markerRemove]);

    // Добавим обработчик для удаления маркера по индексу

    // useEffect(() => {
    //     if (routeDetails.distance) {
    //         const carClass = CARS_CLASSES[order.carClass];
    //         let price = Math.max(routeDetails.distance * carClass.price, 10); // Дистанция умноженная на тариф
    //         if (order.passangersAmount === "") {
    //             price += 1500;
    //         }
    //         else {
    //             price += parseInt(order.passangersAmount) <= 5 ? 1500 : 2500;
    //         }
    //         if (order.baggage === "") {
    //             price += 200;
    //         }
    //         else {
    //             price += parseInt(order.baggage) <= 5 ? 200 : 500;
    //         }
    //         if (order.params.buster) {
    //             price += 200;
    //         }
    //         if (order.params.babyChair) {
    //             price += 500;
    //         }
    //         if (order.params.animalTransfer) {
    //             price += 500;
    //         }
    //         price = Math.ceil(price);
    //         handleSetOrder({...order, price: price});
    //     }
    //     else {
    //         handleSetOrder({...order, price: null});
    //     }
    // }, [routeDetails, order.params, order.carClass, order.passangersAmount, order.baggage]);

    useEffect(() => {
        if (setMyLocationTrigger) {
            if (this._webView) {
                this._webView.injectJavaScript("setMyPosition()");
            }
            handleSetMyPosition(false);
        }
    }, [setMyLocationTrigger]);

    useEffect(() => {
        if (order.departure.city && order.departure.address) {
            getGeocode(`${order.departure.city},${order.departure.address}`)
                .then((res: any) => {
                    const points =
                        res.response?.GeoObjectCollection?.featureMember[0]
                            ?.GeoObject?.Point?.pos;
                    if (points) {
                        const lat = parseFloat(points.split(" ")[1]);
                        const lon = parseFloat(points.split(" ")[0]);

                        handleSetArrivalLocation({ lon, lat });
                    }
                })
                .catch((err) =>
                    console.error(
                        "Failed to get geocode of departure address: ",
                        err
                    )
                );
        }
        if (order.arrival.city && order.arrival.address) {
            getGeocode(`${order.arrival.city},${order.arrival.address}`)
                .then((res: any) => {
                    const points =
                        res.response?.GeoObjectCollection?.featureMember[0]
                            ?.GeoObject?.Point?.pos;
                    if (points) {
                        const lat = parseFloat(points.split(" ")[1]);
                        const lon = parseFloat(points.split(" ")[0]);

                        handleSetDepartureLocation({ lon, lat });
                    }
                })
                .catch((err) =>
                    console.error(
                        "Failed to get geocode of arrival address: ",
                        err
                    )
                );
        }

        if (
            (!order.arrival.city || !order.arrival.address) &&
            (arrivalLocation || arrivalLocation)
        ) {
            handleSetArrivalLocation({ lon: null, lat: null });
        }
        if (
            (!order.departure.city || !order.departure.address) &&
            (departureLocation || departureLocation)
        ) {
            handleSetDepartureLocation({ lon: null, lat: null });
        }
    }, [order.arrival, order.departure]);

    return (
        <View style={styles.container}>
            <WebView
                ref={(c) => (this._webView = c)}
                source={{ html: require("./MapSource") }}
                allowFileAccess={true}
                allowFileAccessFromFileURLs
                allowUniversalAccessFromFileURLs
                allowsProtectedMedia
                onMessage={(e) => {
                    const [messageKey, messageValue] =
                        e.nativeEvent.data.split(":");

                    if (messageKey === "stops") {
                    }
                    if (messageKey === "map") {
                        setMapLoaded(true);
                    }
                    if (messageKey === "distance") {
                        setRouteDetails((prev) => ({
                            ...prev,
                            distance: parseFloat(
                                messageValue.replace(",", ".")
                            ),
                        }));
                    }
                    if (messageKey === "time") {
                        setRouteDetails((prev) => ({
                            ...prev,
                            time: parseInt(messageValue),
                        }));
                    }
                    if (messageKey === "price" && messageValue === "clear") {
                        setRouteDetails({ distance: null, time: null });
                        handleSetOrder({ ...order, price: null });
                    }
                    if (messageKey === "addStop") {
                        console.log("addStop", { messageValue });
                    }
                    if (messageKey === "Route") {
                        console.log("route result", { messageValue });
                    }
                    if (messageKey === "RouteTemp") {
                        console.log("routeTemp result", { messageValue });
                    }
                    if (messageKey === "tempStops") {
                        console.log("tempStops result", { messageValue });
                    }
                    if (messageKey === "endMarkerLocation") {
                        console.log("endMarkerLocation result", {
                            messageValue,
                        });
                    }
                }}
            />
        </View>
    );
}

export default memo(Map);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
