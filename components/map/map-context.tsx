'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useLocale } from 'next-intl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Ensure the token is set (it should be in .env.local)
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapContextType {
  map: mapboxgl.Map | null;
  mapContainer: React.RefObject<HTMLDivElement | null>;
  isLoaded: boolean;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};

interface MapProviderProps {
  children: React.ReactNode;
  initialOptions?: Omit<mapboxgl.MapboxOptions, 'container'>;
  onMapReady?: (map: mapboxgl.Map) => void;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children, initialOptions, onMapReady }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    if (!mapContainer.current) return;

    const token =
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
      (typeof document !== 'undefined' ? document.body?.dataset?.mapboxToken : '') ||
      '';

    if (!token) {
      console.error('NEXT_PUBLIC_MAPBOX_TOKEN is missing!');
      return;
    }

    mapboxgl.accessToken = token;

    const defaultOptions: Omit<mapboxgl.MapboxOptions, 'container'> = {
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [17.0, 2.0], // Centered on Africa
      zoom: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0.8 : 1.6, // Zoomed in closer for better framing on laptops
      pitch: 0,        // Completely flat top-down view until zoomed in
      projection: { name: 'globe' }, // Ensure globe projection is used
      cooperativeGestures: true, // Allow page scrolling over map on mobile & desktop with cooperative gesture guidance
      renderWorldCopies: false,
    };

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      ...defaultOptions,
      ...initialOptions,
    });

    mapInstance.on('style.load', () => {
      const setMapboxLanguage = (m: mapboxgl.Map, lang: string) => {
        const style = m.getStyle();
        if (!style || !style.layers) return;
        style.layers.forEach((layer: any) => {
          if (layer.layout && layer.layout['text-field']) {
            const textField = m.getLayoutProperty(layer.id, 'text-field');
            if (!textField) return;

            let newTextField = JSON.parse(JSON.stringify(textField));
            const replaceLang = (obj: any) => {
              if (Array.isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                  if (obj[i] === 'name_en' || obj[i] === 'name') {
                    obj[i] = `name_${lang}`;
                  } else if (Array.isArray(obj[i])) {
                    replaceLang(obj[i]);
                  }
                }
              }
            };

            if (Array.isArray(newTextField)) {
              replaceLang(newTextField);
              m.setLayoutProperty(layer.id, 'text-field', newTextField as any);
            } else if (typeof newTextField === 'string') {
              newTextField = newTextField.replace(/{name_en}/g, `{name_${lang}}`).replace(/{name}/g, `{name_${lang}}`);
              m.setLayoutProperty(layer.id, 'text-field', newTextField);
            }
          }
        });
      };

      setMapboxLanguage(mapInstance, locale === 'fr' ? 'fr' : 'en');

      // Add 3D Terrain for a rich geographical feel
      mapInstance.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      mapInstance.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

      // Ensure the background behind the globe matches our clean UI without any atmospheric glow or halo
      mapInstance.setFog({
        color: 'transparent',
        'high-color': 'transparent',
        'space-color': 'transparent',
        'star-intensity': 0
      });

      // Style waterbodies to a deeper, richer marine blue to contrast the terrain
      if (mapInstance.getLayer('water')) {
        mapInstance.setPaintProperty('water', 'fill-color', '#a1c6e1');
      }

      // Hide roads, POIs, and transit lines to declutter and look like a premium thematic atlas
      const layersToHide = [
        'road-label',
        'road-number-shield',
        'transit-label',
        'poi-label',
        'airport-label',
        'state-label',
        'settlement-minor-label'
      ];

      layersToHide.forEach(layer => {
        if (mapInstance.getLayer(layer)) {
          mapInstance.setLayoutProperty(layer, 'visibility', 'none');
        }
      });

      // Improve typography and color of major labels
      if (mapInstance.getLayer('country-label')) {
        mapInstance.setPaintProperty('country-label', 'text-color', '#1c2b22');
        mapInstance.setPaintProperty('country-label', 'text-halo-color', 'rgba(255, 255, 255, 0.85)');
        mapInstance.setPaintProperty('country-label', 'text-halo-width', 1.5);
      }

      if (mapInstance.getLayer('settlement-major-label')) {
        mapInstance.setPaintProperty('settlement-major-label', 'text-color', '#0f3d1e');
        mapInstance.setPaintProperty('settlement-major-label', 'text-halo-color', 'rgba(255, 255, 255, 0.9)');
      }
    });

    mapInstance.on('load', () => {
      setMap(mapInstance);
      setIsLoaded(true);
      if (onMapReady) onMapReady(mapInstance);
    });

    return () => {
      mapInstance.remove();
      setMap(null);
      setIsLoaded(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapContext.Provider value={{ map, mapContainer, isLoaded }}>
      <div className="relative w-full h-full">
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
        {isLoaded && children}
      </div>
    </MapContext.Provider>
  );
};
