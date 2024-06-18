import {getBottomSheetOffset} from "@src/features/order/constants/SnapPoints";
import {BottomSheetStateEnum} from "@src/features/order/enums/bottomSheetState.enum";
import React, {Dispatch, memo, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import {Dimensions, LayoutChangeEvent, StyleSheet, View} from "react-native";
import WebView, {WebViewMessageEvent} from "react-native-webview";
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


export type MapProps = {
  bottomSheetState: BottomSheetStateEnum;
}

function Map({bottomSheetState}: MapProps) {
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
    const isUpdatedAddArrivals = order.additionalArrivals.length;

    useEffect(() => {
        if (this._webView && mapLoaded) {
            if (departureLocation?.lat && departureLocation?.lon) {
                this._webView.injectJavaScript(
                    `createMarker([${departureLocation.lat}, ${departureLocation.lon}], "start")`
                );
            } else {
              this._webView.injectJavaScript(
                `removeObject("start")`
              );
            }
        }
    }, [departureLocation]);

    useEffect(() => {
      if (this._webView && mapLoaded) {
        if (bottomSheetState) {
          this._webView.injectJavaScript(
            `setMapHeight(${getBottomSheetOffset(bottomSheetState)})`
          );
        }
      }
    }, [bottomSheetState]);

    useEffect(() => {
        if (this._webView && mapLoaded) {
          if(arrivalLocation?.lon && arrivalLocation?.lat) {
            this._webView.injectJavaScript(
              `createMarker([${arrivalLocation.lat}, ${arrivalLocation.lon}], "end")`
            );
          } else {
            this._webView.injectJavaScript(
              `
                removeObject("end")
                removeObject("stop")
              `
            );
          }
        }
    }, [arrivalLocation, isUpdatedAddArrivals]);

    useEffect(() => {
        if (this._webView && mapLoaded) {
          const stops = order.additionalArrivals.map(item => item?.lat && item?.lon ? [item.lat, item.lon] : null).filter(Boolean);

          if(stops.length) {
            this._webView.injectJavaScript(
              `createStops('${JSON.stringify(stops)}')`
            );
          } else {
            this._webView.injectJavaScript(
              `removeObject('stop')`
            );
          }
        }
    }, [order.additionalArrivals]);


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

                        setDepartureLocation({ lon, lat });
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

                        handleSetArrivalLocation({ lon, lat });
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
            (arrivalLocation)
        ) {
            handleSetArrivalLocation({ lon: null, lat: null });
        }
        if (
            (!order.departure.city || !order.departure.address) &&
            (departureLocation)
        ) {
            handleSetDepartureLocation({ lon: null, lat: null });
        }
    }, [order.arrival, order.departure]);

    const handleMessage = (event: WebViewMessageEvent) => {
      const {action, payload} = JSON.parse(event.nativeEvent.data)

      switch (action) {
        case 'inited':
          setMapLoaded(true);
          return
        case 'distance':
          setRouteDetails((prev) => ({
            ...prev,
            distance: parseFloat(
              payload.replace(",", ".")
            ),
          }));
          return
        case 'time':
          setRouteDetails((prev) => ({
            ...prev,
            time: parseInt(payload),
          }));
          return
        case 'route-removed':
          setRouteDetails({distance: null, time: null});
          console.log('setDeparture 9')
          handleSetOrder({...order, price: null});
          return;
        case 'map-log':
          console.error('map-log:', payload)
      }
    }

    return (
      <View style={styles.container}>
        <WebView
            ref={(c) => (this._webView = c)}
            source={{ html: require("./MapRenderer") }}
            allowFileAccess={true}
            allowFileAccessFromFileURLs
            allowUniversalAccessFromFileURLs
            allowsProtectedMedia
            onMessage={handleMessage}
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
