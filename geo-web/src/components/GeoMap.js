import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const GeoMap = ({ coordinates, ip }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!coordinates || !mapContainer.current) return;

    // Initialize map if not already done
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView(
        [coordinates.lat, coordinates.lng],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map.current);
    } else {
      // Update existing map
      map.current.setView([coordinates.lat, coordinates.lng], 13);
    }

    // Remove old markers
    map.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.current.removeLayer(layer);
      }
    });

    // Add new marker
    const icon = L.icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    L.marker([coordinates.lat, coordinates.lng], { icon })
      .bindPopup(`<strong>IP: ${ip}</strong><br>Lat: ${coordinates.lat}<br>Lng: ${coordinates.lng}`)
      .addTo(map.current)
      .openPopup();

    return () => {
      // Cleanup if needed
    };
  }, [coordinates, ip]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default GeoMap;
