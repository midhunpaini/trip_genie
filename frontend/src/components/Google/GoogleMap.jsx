import React, { useEffect, useRef } from 'react';
const apiKey = process.env.REACT_APP_GOOGLE_PLACES_KEY

function Map({ places }) {
  const mapRef = useRef(null);
  const waypoints = []
  const markers = []
  const len = places.length-1
  for(let i = 1; i < len; i++){
    let obj =  { location: {lat:Number(places[i].latitude),lng:Number(places[i].longitude)},  stopover: true }
    waypoints.push(obj)
  }
  for(let i = 0; i <= len; i++){
    let obj =  { position: {lat:Number(places[i].latitude),lng:Number(places[i].longitude)}, title: Number(places[i].name) }
    markers.push(obj)
  }

  const origin = {lat:Number(places[0].latitude),lng:Number(places[0].longitude)}
  const destination = {lat:Number(places[len].latitude),lng:Number(places[len].longitude)}

  useEffect(() => {
    
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    googleMapsScript.async = true;
    googleMapsScript.onload = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: origin,
        zoom: 8,
      });

      markers.forEach(marker => {
        new window.google.maps.Marker({
          position: marker.position,
          map,
          title: marker.title,
        });
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({ map });

      const waypointsArray = waypoints.map(waypoint => ({
        location: waypoint.location,
        stopover: waypoint.stopover
      }));

      directionsService.route(
        {
          origin,
          destination,
          waypoints: waypointsArray,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            console.log('Directions request failed due to ' + status);
          }
        }
      );
    };
    document.body.appendChild(googleMapsScript);

    return () => {
      document.body.removeChild(googleMapsScript);
    };
  }, [markers, origin, destination, waypoints]);

  return <div className='border rounded-md' ref={mapRef} style={{ height: '400px', width: '100%' }} />;
}

export default Map;
