import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface GenericMapProps {
  geojsonData: GeoJSON.FeatureCollection;
  className?: string;
}

const GenericMap = ({ geojsonData, className = 'h-[600px] w-full' }: GenericMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize the map
    mapInstanceRef.current = L.map(mapRef.current);

    // Add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove existing GeoJSON layer if it exists
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.remove();
    }

    // Add new GeoJSON layer
    geoJsonLayerRef.current = L.geoJSON(geojsonData).addTo(mapInstanceRef.current);

    // Fit bounds to GeoJSON
    const bounds = geoJsonLayerRef.current.getBounds();
    mapInstanceRef.current.fitBounds(bounds);
  }, [geojsonData]);

  return <div ref={mapRef} className={className} />;
};

export default GenericMap;