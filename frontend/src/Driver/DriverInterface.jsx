import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import busLogo from './bus_logo.png'; 

const DriverInterface = () => {
  const [routePoints, setRoutePoints] = useState([]); 
  const [driverPosition, setDriverPosition] = useState(null);

  const driverIcon = L.icon({
    iconUrl: busLogo,
    iconSize: [20, 20],
  });

  useEffect(() => {
    const savedRoute = localStorage.getItem('savedRoute');
    if (savedRoute) {
      setRoutePoints(JSON.parse(savedRoute)); 
    }
  }, []);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDriverPosition([latitude, longitude]); 
      },
      (error) => {
        console.error('Error getting driver position:', error);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h3>Driver Interface</h3>
      {routePoints.length > 0 ? (
        <MapContainer
          className="map-container"
          center={driverPosition || [routePoints[0]?.lat, routePoints[0]?.lon]} 
          zoom={13}
          style={{ height: '90vh', width: '100vh' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

\          <Polyline
            positions={routePoints.map((point) => [point.lat, point.lon])} 
            color="blue"
          />

          {driverPosition && (
            <Marker position={driverPosition} icon={driverIcon}>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <div>No route points available to display.</div>
      )}
    </div>
  );
};

export default DriverInterface;
