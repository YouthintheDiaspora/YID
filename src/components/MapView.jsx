import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polygon, useMap, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getEventsForYear } from '../data/historicalEvents';
import { getPopulationForYear } from '../data/populationData';
import MigrationOverlay from './MigrationOverlay';

// Create a simple red pin icon
const redPinIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map updates
function MapUpdater({ cities }) {
  const map = useMap();

  useEffect(() => {
    if (cities.length > 0) {
      // Fit map to show all markers
      const bounds = cities.map(city => city.coordinates);
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [cities, map]);

  return null;
}

// Component to handle pin placement
function PinPlacer({ pinPlacementMode, onPlacePin }) {
  const map = useMapEvents({
    click(e) {
      if (pinPlacementMode) {
        // Get the wrapped lat/lng that's guaranteed to be in proper range
        const wrappedLatLng = map.wrapLatLng(e.latlng);
        console.log('Original click:', e.latlng.lat, e.latlng.lng);
        console.log('Wrapped coords:', wrappedLatLng.lat, wrappedLatLng.lng);
        onPlacePin(wrappedLatLng.lat, wrappedLatLng.lng);
        // Zoom to the pin location
        map.setView([wrappedLatLng.lat, wrappedLatLng.lng], 10, {
          animate: true,
          duration: 0.5
        });
      }
    }
  });

  // Change cursor when in pin placement mode
  useEffect(() => {
    if (pinPlacementMode) {
      map.getContainer().style.cursor = 'crosshair';
    } else {
      map.getContainer().style.cursor = '';
    }
  }, [pinPlacementMode, map]);

  return null;
}

// Component to track zoom level
function ZoomTracker({ setZoom }) {
  const map = useMapEvents({
    zoomend() {
      setZoom(map.getZoom());
    }
  });

  useEffect(() => {
    setZoom(map.getZoom());
  }, [map, setZoom]);

  return null;
}

function MapView({ cities, selectedYear, onCityClick, onEventClick, showMigrations, pinPlacementMode, onPlacePin, userPins, highlightedCities = [], activeMigrations = [], zaydaMode = false }) {
  const [zoom, setZoom] = useState(2);
  const activeEvents = getEventsForYear(selectedYear);

  console.log('=== MapView Render ===');
  console.log('zaydaMode:', zaydaMode);
  console.log('cities:', cities.length, cities);
  console.log('selectedYear:', selectedYear);
  console.log('showMigrations:', showMigrations);
  console.log('activeMigrations:', activeMigrations.length, activeMigrations);
  console.log('highlightedCities:', highlightedCities);
  console.log('userPins:', userPins?.length || 0);

  // In Zayda mode, we're already receiving only the 3 cities
  const displayCities = cities;

  // Calculate marker size based on population
  const getMarkerSize = (population) => {
    if (!population || population === 0) return 3;
    // Logarithmic scale for better visualization
    const size = Math.log10(population) * 3;
    return Math.max(5, Math.min(size, 30));
  };

  // Get color based on population size
  const getMarkerColor = (population) => {
    if (!population || population === 0) return '#cccccc';
    if (population > 500000) return '#b8860b'; // Dark goldenrod for largest
    if (population > 200000) return '#daa520'; // Goldenrod
    if (population > 100000) return '#f0c14b'; // Amazon gold
    if (population > 50000) return '#ffd700'; // Gold
    if (population > 10000) return '#ffe55c'; // Light gold
    return '#fff8dc'; // Cornsilk for smallest
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0 }}>
      <MapContainer
        center={[30, 15]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        minZoom={2}
        maxZoom={18}
        worldCopyJump={false}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          noWrap={false}
        />

        <MapUpdater cities={displayCities} />
        <ZoomTracker setZoom={setZoom} />
        <PinPlacer pinPlacementMode={pinPlacementMode} onPlacePin={onPlacePin} />

        {/* Historical event overlays - hide in Zayda mode */}
        {!zaydaMode && activeEvents.map((event) =>
          event.regions.map((region, idx) => (
            <Polygon
              key={`${event.id}-${idx}`}
              positions={region.coordinates}
              pathOptions={{
                color: event.type === 'holocaust' ? '#8B0000' : '#DC143C',
                fillColor: event.type === 'holocaust' ? '#8B0000' : '#DC143C',
                fillOpacity: 0.2,
                weight: 2,
                opacity: 0.6
              }}
              eventHandlers={{
                click: () => onEventClick && onEventClick(event)
              }}
            >
              <Popup>
                <div style={{ minWidth: '250px', maxWidth: '300px' }}>
                  <h3 style={{
                    margin: '0 0 8px 0',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#8B0000'
                  }}>
                    {event.name}
                  </h3>
                  <p style={{ margin: '4px 0', fontSize: '13px', fontWeight: 'bold' }}>
                    {event.startYear === event.endYear
                      ? event.startYear
                      : `${event.startYear}-${event.endYear}`}
                  </p>
                  <p style={{ margin: '8px 0', fontSize: '13px', lineHeight: '1.4' }}>
                    {event.description.substring(0, 150)}...
                  </p>
                  <p style={{
                    margin: '8px 0',
                    fontSize: '12px',
                    fontStyle: 'italic',
                    color: '#666'
                  }}>
                    {event.casualties}
                  </p>
                  <button
                    onClick={() => onEventClick && onEventClick(event)}
                    style={{
                      marginTop: '8px',
                      padding: '6px 12px',
                      backgroundColor: '#8B0000',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      width: '100%'
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </Popup>
            </Polygon>
          ))
        )}

        {displayCities.map((city) => {
          const population = getPopulationForYear(city, selectedYear);
          const radius = getMarkerSize(population);
          const color = getMarkerColor(population);

          // Check if this city is highlighted
          const isHighlighted = highlightedCities.length > 0 &&
            highlightedCities.some(highlightName =>
              city.name.toLowerCase().includes(highlightName.toLowerCase()) ||
              highlightName.toLowerCase().includes(city.name.toLowerCase())
            );

          // If there are highlighted cities (search active), ONLY show highlighted cities
          if (highlightedCities.length > 0) {
            if (!isHighlighted) {
              return null; // Hide all non-highlighted cities
            }
          } else {
            // No search active - use zoom-based filtering
            const minPopulationForZoom = zoom < 5 ? 100000 : 0;
            if (population < minPopulationForZoom) {
              return null;
            }
          }

          return (
            <CircleMarker
              key={city.id}
              center={city.coordinates}
              radius={isHighlighted ? radius * 1.5 : radius}
              fillColor={isHighlighted ? '#4169E1' : color}
              color={isHighlighted ? '#FFFFFF' : '#8b6914'}
              weight={isHighlighted ? 3 : 2}
              opacity={1}
              fillOpacity={isHighlighted ? 1 : 0.8}
              eventHandlers={{
                click: () => onCityClick(city)
              }}
            >
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    {city.name}
                  </h3>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>
                    <strong>{city.country}</strong>
                  </p>
                  <p style={{ margin: '4px 0', fontSize: '14px' }}>
                    <strong>Population ({selectedYear}):</strong> {population ? population.toLocaleString() : 'No data'}
                  </p>
                  <button
                    onClick={() => onCityClick(city)}
                    style={{
                      marginTop: '8px',
                      padding: '6px 12px',
                      backgroundColor: '#b8860b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Migration routes overlay */}
        <MigrationOverlay
          selectedYear={selectedYear}
          showMigrations={showMigrations}
          customMigrations={activeMigrations.length > 0 ? activeMigrations : null}
        />

        {/* User-placed pins */}
        {userPins && userPins.length > 0 && userPins.map((pin) => {
          const lat = Number(pin.coordinates[0]);
          const lng = Number(pin.coordinates[1]);

          console.log(`Pin ${pin.id}: Rendering at [${lat}, ${lng}]`);

          return (
            <Marker
              key={pin.id}
              position={[lat, lng]}
              icon={redPinIcon}
              eventHandlers={{
                click: () => onCityClick(pin)
              }}
            >
              <Popup>
                <div style={{ minWidth: '150px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    📍 {pin.name}
                  </h3>
                  <p style={{ margin: '4px 0', fontSize: '13px' }}>
                    Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
                  </p>
                  <button
                    onClick={() => onCityClick(pin)}
                    style={{
                      marginTop: '8px',
                      padding: '6px 12px',
                      backgroundColor: '#DC143C',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      width: '100%'
                    }}
                  >
                    Add Information
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;
