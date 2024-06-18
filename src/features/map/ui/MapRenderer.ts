module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://api-maps.yandex.ru/2.1/?apikey=d692a7d7-638d-46ce-84f0-57c51f83ad0c&lang=ru_RU"></script>
  <meta name="viewport" content="width=device-width, initil-scale=1.0"/>
  <style>
      body {
          margin: 0;
      }

      .map-holder {
          width: 100%;
          height: 60vh;
          border: 1px solid #000;
      }
  </style>
</head>
<body>
<div id="map" class="map-holder"></div>
</body>
<script>
<!-- ------- Variables ----- -->
  const markerIcons = ({
      start: 'greenCircleDotIcon',
      end: 'blueCircleDotIcon',
      stop: 'redStretchyIcon'
  });
    
  let map;
  let route;
  
  const markers = new Proxy({
    start: null,
    end: null,
    stop: []
  }, {
    set(target, property, value) {
      target[property] = value;
      routeControl()
      centerMap()
      return true;
    }
  });
  
  const setMapHeight = (height) => {
    const mapElement = document.querySelector('.map-holder');
    
    mapElement.style.height = height + 'px';
    if (map) {
      map.container.fitToViewport();
    }
  }
  
  
  const initMap = () => {
    map = new ymaps.Map('map', {
      center: [55.751574, 37.573856],
      zoom: 10,
      controls: [],
      margin: [-10, 10, 50, 10]
     }, 
     {
        yandexMapDisablePoiInteractivity: true
     }
    );
    sendMessage('inited', true);
  };
  
  /**
  * Creates a marker and adds it to the map.
  * @param {[number, number]} coordinates - The coordinates of the marker.
  * @param {'start'|'end'} type - The type of the marker.
  * @returns {ymaps.Placemark} The created marker.
  */
  const createMarker = ([lat, lon], type) => { 
    try {
      if(markers[type]) removeObject(type)
     
      const marker = new ymaps.Placemark([lat, lon], {}, {preset: 'islands#' + markerIcons[type]});
      map.geoObjects.add(marker);
      markers[type] = marker
    
      return marker;
    } catch (e) {
      sendMessage('map-log', e);
    }
  };
  
  /**
  * Creates stops and adds it to the map.
  * @param {string} stopsString - [number, number][] The coordinates of the stops
  * @returns {ymaps.Placemark[]} The created stops.
  */
  const createStops = (stopsString) => {
    if(markers.stop.length) removeObject('stop')
    
    const stops = JSON.parse(stopsString)
    
    markers.stop = stops.map((stop, index) => {
      const stopMarker = new ymaps.Placemark(stop, {iconContent: index + 1}, {preset: 'islands#' + markerIcons['stop']});
      map.geoObjects.add(stopMarker)
      
      return stopMarker;
    });
     
    return markers.stop;
  };
  
  /**
  * Creates a route and adds it to the map.
  * @param {[number, number]} start - The starting point of the route.
  * @param {[number, number]} end - The ending point of the route.
  * @param {Array<[number, number]>} stops - An array of stop points.
  * @returns {ymaps.multiRouter.MultiRoute} The created route.
  */
  const createRoute = (start, end, stops) => {
    if(route) removeObject('route')
    
    const referencePoints = stops.length ? [start, ...stops, end] : [start, end];

    route = new ymaps.multiRouter.MultiRoute({
        referencePoints: referencePoints,
        params: {
          results: 1
        }
      },
      {
        wayPointVisible: false,
        balloonLayout: null,
        editorDrawOver: false,
        boundsAutoApply: true
      }
    );
  
    map.geoObjects.add(route);
    
    route.model.events.add('requestsuccess', () => {
      const activeRoute = route.getActiveRoute();
      
      sendMessage('distance', activeRoute.properties.get('distance').text);
      sendMessage('time', activeRoute.properties.get('duration').text);
    });
    
    return route;
  };

  /**
  * Remove specific type of geo objects from the map.
  * @param {'start'|'end'|'stop'|'route'|'all'} type - The type of geo object to remove.
  */
  const removeObject = (type) => {
    switch (type) {
      case 'start':
        map.geoObjects.remove(markers.start);
        markers.start = null;
        return;
      case 'end':
        map.geoObjects.remove(markers.end);
        markers.end = null;
        return;
      case 'stop': 
        markers.stop.forEach((marker) => {
          map.geoObjects.remove(marker);
        });
        markers.stop = [];
        return;
      case 'route': 
        map.geoObjects.remove(route);
        route  = null;
        sendMessage('route-removed', true);
        return;
      case 'all':
        map.geoObjects.remove(markers.start);
        map.geoObjects.remove(markers.end);
        map.geoObjects.remove(route);
        markers.stop.forEach((marker) => {
          map.geoObjects.remove(marker);
        });
        
        markers.start = null;
        markers.end = null;
        markers.stop = [];
        route = null;
    }
  };
  
  /**
 * Centers the map to show all relevant markers.
 */
  const centerMap = async () => {
    if(map) {
      const coordinates = [];
      if (markers.start) coordinates.push(markers.start.geometry.getCoordinates());
      if (markers.end) coordinates.push(markers.end.geometry.getCoordinates());
      if (markers.stop.length) markers.stop.forEach(marker => coordinates.push(marker.geometry.getCoordinates()));
  
      if (coordinates.length === 1) {
          map.setCenter(coordinates[0], 16);
      } else if (coordinates.length > 1) {
          const bounds = ymaps.util.bounds.fromPoints(coordinates);
          await map.setBounds(bounds, {
              checkZoomRange: true,
          });    
      }
    }
  };
  
  const routeControl = () => {
    if(markers.start && markers.end) {
      const stopsCoordinates = markers.stop.map(item => item.geometry.getCoordinates())
      
      createRoute(markers.start.geometry.getCoordinates(), markers.end.geometry.getCoordinates(), stopsCoordinates)
    } else {
      if(route) {
        removeObject('route')}
      }
    }
  
  const sendMessage = (action, payload) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({action, payload}));
  };
  
  ymaps.ready(initMap);
</script>
</html>
`
