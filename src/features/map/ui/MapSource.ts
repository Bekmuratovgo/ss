module.exports = `<!DOCTYPE html>
<html lang="en">

<head>
    <script src="https://api-maps.yandex.ru/2.1/?apikey=d692a7d7-638d-46ce-84f0-57c51f83ad0c&lang=ru_RU" type="text/javascript"></script>
    <meta name="viewport" content="width=device-width, initil-scale=1.0"/>
    <style>
        body {
            margin: 0;
        }
        
        .map-holder {
            width: 100%;
            height: 100vh;
            border: 1px solid #000;
        }
    </style>
</head>

<body>
    <div id="map" class="map-holder"></div>
    <script>
        var myMap = null;
        var price_tarif = 18;
        var multiRoute = null,
            startMarker = null,
            endMarker = null,
            startMarkerLocation = null,
            endMarkerLocation = null,
            myLocation = null,
            myLocationMarker = null,
            stops = [];
            


        ymaps.ready(init);
        let additionalStops = [];
        let stopMarkers = [];

        function init() {
            myMap = new ymaps.Map("map", {
                center: [55.861479, 37.428102],
                zoom: 9,
                controls: []
            },{
                yandexMapDisablePoiInteractivity: true
            });
            window.ReactNativeWebView.postMessage(\`map:init\`);   
        }

        function removeStartMarker() {
            if (myMap !== null && startMarker !== null) {
                myMap.geoObjects.remove(startMarker);
                startMarkerLocation = null;
                removeRoutes();
            }
        }

        function removeEndMarker() {
            if (myMap !== null && endMarker !== null) {
                myMap.geoObjects.remove(endMarker);
                endMarkerLocation = null;
                removeRoutes();
            }
        }


        function addStartMarker(lat, lon) {
            removeStartMarker();
            startMarker = new ymaps.Placemark([lat, lon], {}, {
                preset: 'islands#greenCircleDotIcon'
            });
            startMarkerLocation = [lat, lon];
            if (myMap !== null) {
                myMap.geoObjects.add(startMarker);
                fitMarkers();
            }
        };

        function addEndMarker(lat, lon) {
            window.ReactNativeWebView.postMessage(\`Adding end marker\`);

            removeEndMarker();
            endMarker = new ymaps.Placemark([lat, lon], {}, {
                preset: 'islands#blueCircleDotIcon'
            });
            endMarkerLocation = [lat, lon];
            if (myMap !== null) {
                myMap.geoObjects.add(endMarker);
                fitMarkers();
            }
        };

        function addMyLocation(lat, lon) {
            if (myLocationMarker !== null) {
                myMap.geoObjects.remove(myLocationMarker);
                myLocation = null;
            }
            if (ymaps) {
                myLocationMarker = new ymaps.Placemark([lat, lon], {}, {
                    preset: 'islands#greenCircleDotIcon' // Здесь можно изменить пресет
                });
                myLocation = [lat, lon];
                myMap.geoObjects.add(myLocationMarker);
            }
        }
        

        function setMyPosition() {
            if (myLocation !== null) {
                myMap.setCenter(myLocation, 5, {
                    checkZoomRange: true
                });
            }
        }

        function addStop(lat, lon, index) {
            

            const stopLocationMarker = new ymaps.Placemark([lat, lon], {
                iconContent : String(index)
            }, {
                preset: 'islands#redStretchyIcon' // Здесь можно изменить пресет
            });

            myMap.geoObjects.add(stopLocationMarker);
            stopMarkers.push(stopLocationMarker);

            fitMarkers();
        }

        function removeMarkerInMap() {
            fitMarkers();
            removeStopMarkersAll()
            removeStopMarkers()
            renderStopMarkers()
        }
        function removeStopMarkersAll() {
            stopMarkers.forEach(marker => {
                myMap.geoObjects.remove(marker);
            });
        
            // Очищаем массив маркеров
            stopMarkers.length = 0;
        }
    

        function removeStopMarkers() {
            stops = stops.map(stop => {
                myMap.geoObjects.remove(stop.marker);
                return {lat: stop.lat, lon: stop.lon, marker: null};
            });
        };

        function renderStopMarkers() {
            stops = stops.map(item => {
                let marker = new ymaps.Placemark([item.lat, item.lon], {}, {
                    preset: 'islands#blueCircleDotIcon'
                });
                return {lat: item.lat, lon: item.lon, marker};
            })
        };

        function fitMarkers() {
            if (startMarkerLocation !== null && endMarkerLocation !== null) {
                myMap.setBounds(myMap.geoObjects.getBounds()).then(() => {
                    let zoom = myMap.getZoom();
                    if (zoom > 2) {
                        myMap.setZoom(zoom - 1);
                    }
                    removeRoutes();
                    setRoutes(); 
                });
            } else if (startMarkerLocation !== null) {
                window.ReactNativeWebView.postMessage(\`Setting start: \${startMarkerLocation}\`);
                myMap.setCenter(startMarkerLocation, 15, {
                    checkZoomRange: false
                });

            } else if (endMarkerLocation !== null) {
                window.ReactNativeWebView.postMessage(\`Setting end: \${endMarkerLocation}\`);
                myMap.setCenter(endMarkerLocation, 15, {
                    checkZoomRange: false
                });
            };
        }


        function removeStop(lat, lon) {
            const currentStop = stops.findIndex(item => item.lat === lat && item.lon === lon);
            if (currentStop > -1) {
                stops.splice(currentStop, 1);
                removeStopMarkers();
                renderStopMarkers();
            }
        };
        function removeStopMarker(index) {
            if (stops[index]) {
                myMap.geoObjects.remove(stops[index]);
                stops.splice(index, 1);
            }
        }
        async function setRoutes() {
            if (startMarkerLocation === null || endMarkerLocation === null) {
                return;
            }
            if (multiRoute !== null) {
                myMap.geoObjects.remove(multiRoute);
            }


            const tempFilterStops =  additionalStops.filter((item) => Boolean(item?.lat) && Boolean(item?.lon))

            const tempStops = [startMarkerLocation]
            
            for(const item of tempFilterStops ){ 
                tempStops.push([item.lat,item.lon])
            }
            tempStops.push(endMarkerLocation)
            startMarkerLocation.forEach((item) => {
                window.ReactNativeWebView.postMessage(\`startMarkerLocation:\${JSON.stringify(item)}\`);
            })
    
            multiRoute = new ymaps.multiRouter.MultiRoute({
                // Описание опорных точек мультимаршрута.
                referencePoints: tempStops,
                // Параметры маршрутизации.
                params: {
                    // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
                    results: 1
                }
            }, {
                wayPointVisible: false,
                balloonLayout: null,
                editorDrawOver: false,
                boundsAutoApply: true
            });
            myMap.geoObjects.add(multiRoute);
            multiRoute.model.events.add("requestsuccess", function() {
                const activeRoute = multiRoute.getActiveRoute();
                window.ReactNativeWebView.postMessage(\`distance:\${activeRoute.properties.get("distance").text}\`);
                window.ReactNativeWebView.postMessage(\`time:\${activeRoute.properties.get("duration").text}\`);
            })
        };

        function removeAllMarkers() {
            removeStartMarker();
            removeEndMarker();
            if (stops.length > 0) {
                stops.forEach(marker => myMap.geoObjects.remove(marker));
                stops = [];
            }
        }

        async function removeRoutes() {
            if (multiRoute !== null) {
                myMap.geoObjects.remove(multiRoute);
                multiRoute = null;
                window.ReactNativeWebView.postMessage(\`price:clear\`);
            }
        };

        function sayMessage(m) {
            window.ReactNativeWebView.postMessage(\`Another hello \${m}\`);
        }
    </script>
</body>

</html>`