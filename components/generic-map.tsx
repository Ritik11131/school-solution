import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { LatLngBounds, GeoJSON as LeafletGeoJSON } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface GenericMapProps {
  geojsonData?: GeoJSON.FeatureCollection;
  className?: string;
}

// This component handles fitting bounds
const GeoJSONLayer: React.FC<{ data: GeoJSON.FeatureCollection }> = ({ data }) => {
  const map = useMap();
  const geoJsonRef = useRef<LeafletGeoJSON>(null);

  useEffect(() => {
    if (geoJsonRef.current) {
      const bounds = geoJsonRef.current.getBounds();
      map.fitBounds(bounds);
    }
    
  }, [data, map]);

  return <GeoJSON data={data} ref={geoJsonRef} />;
};

const GenericMap: React.FC<GenericMapProps> = ({ geojsonData, className = 'h-[600px] w-full' }) => {
  // Calculate initial bounds from GeoJSON
  const calculateInitialBounds = (): LatLngBounds => {
    const layer = new LeafletGeoJSON(geojsonData);
    return layer.getBounds();
  };

  const initialBounds = calculateInitialBounds();

  return (
    <MapContainer
      bounds={initialBounds}
      className={className}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geojsonData && <GeoJSONLayer data={geojsonData} />}
    </MapContainer>
  );
};

export default GenericMap;