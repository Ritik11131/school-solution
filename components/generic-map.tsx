import { useEffect, useRef, memo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface GenericMapProps {
  geojsonData?: GeoJSON.FeatureCollection;
  markers?: { colorCode: string; items: { name: string; latitude: number; longitude: number }[] };
  className?: string;
}

const GenericMap = memo(({ geojsonData, markers = { colorCode: '', items: [] }, className = 'h-[500px] w-full' }: GenericMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize the map
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [0, 0], // Initial center
      zoom: 2, // Initial zoom level
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstanceRef.current);

    // Only initialize marker layer if markers are expected
  if (markers && markers.items.length > 0) {
    markerLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
  }

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

    // Add new GeoJSON layer only if geojsonData is valid
    if (geojsonData && geojsonData?.features?.length > 0) {
      geoJsonLayerRef.current = L.geoJSON(geojsonData,{
        pointToLayer: (feature, latlng) => {
          // Create a marker for Point features
          return L.marker(latlng, {
            icon: L.icon({
              iconUrl: "/marker.png", // Path to the image in the public folder
              iconSize: [35, 40], // Size of the icon
              iconAnchor: [17, 40], // Adjusted anchor point for the icon (centered horizontally and at the bottom vertically)
              popupAnchor: [0, -40], // Adjusted popup position (40px above the icon)
            }),
          });
        },
        onEachFeature: (feature, layer) => {
          // Bind a popup to each feature
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
          }
        }
      }).addTo(mapInstanceRef.current);

      // Fit bounds to GeoJSON
      const bounds = geoJsonLayerRef.current.getBounds();
      mapInstanceRef.current.fitBounds(bounds);
    }
  }, [geojsonData]);

  useEffect(() => {
    if (!mapInstanceRef.current || !markerLayerRef.current) return;

    // Clear existing markers
    markerLayerRef.current.clearLayers();

    // Add markers to the layer
    markers?.items?.forEach(({ latitude, longitude, name }) => {
      if (latitude && longitude) {
        const circle: L.CircleMarker = L.circleMarker([latitude, longitude], {
          radius: 5,
          color: markers.colorCode || 'blue',
          fillColor: markers.colorCode || 'blue',
          fillOpacity: 0.5,
        }).bindPopup(name);
        markerLayerRef.current?.addLayer(circle);
      }
    });

    // Adjust map bounds to fit markers
    if (markers.items.length > 0) {
      const bounds = L.featureGroup(
        markers.items.map(({ latitude, longitude }) =>
          L.circleMarker([latitude, longitude])
        )
      ).getBounds();
      mapInstanceRef.current.fitBounds(bounds);
    }
  }, [markers]);

  return <div ref={mapRef} className={className} />;
});

export default GenericMap;