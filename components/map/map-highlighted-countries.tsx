'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useMap } from './map-context';

export interface MapHighlightedCountriesProps {
  onCountryClick?: (countryCode: string | null) => void;
  setHoveredName?: (name: string | null) => void;
  setTooltipPos?: (pos: { x: number; y: number }) => void;
  selectedCountryName?: string;
}

const regionColors: Record<string, string> = {
  'KE': '#E2703A',
  'UG': '#E2703A',
  'TZ': '#E2703A',
  'RW': '#E2703A',
  'ET': '#E2703A',
  'SS': '#E2703A',
  'BI': '#E2703A',
  'MW': '#E2703A',
  'ZM': '#E2703A',
  'ZW': '#E2703A',
  'MZ': '#E2703A',
  'ZA': '#E2703A',
  'SN': '#E2703A',
  'BF': '#E2703A',
  'ML': '#E2703A',
  'GH': '#E2703A',
  'NG': '#E2703A',
  'LR': '#E2703A',
  'SL': '#E2703A',
  'CD': '#E2703A'
};

export const MapHighlightedCountries: React.FC<MapHighlightedCountriesProps> = ({
  onCountryClick,
  setHoveredName,
  setTooltipPos,
  selectedCountryName
}) => {
  const { map } = useMap();

  const onCountryClickRef = useRef(onCountryClick);
  const setHoveredNameRef = useRef(setHoveredName);
  const setTooltipPosRef = useRef(setTooltipPos);
  const activeCentroidRef = useRef<[number, number] | null>(null);
  const hoveredCountryRef = useRef<string | null>(null);
  const selectedCountryRef = useRef<string | null>(null);
  const isZoomedInRef = useRef<boolean>(false);

  useEffect(() => {
    onCountryClickRef.current = onCountryClick;
    setHoveredNameRef.current = setHoveredName;
    setTooltipPosRef.current = setTooltipPos;
  });

  // Handle selected state efficiently
  useEffect(() => {
    if (!map || !map.isStyleLoaded() || !map.getSource('africa-countries')) return;

    if (selectedCountryRef.current && selectedCountryRef.current !== selectedCountryName) {
      map.setFeatureState(
        { source: 'africa-countries', id: selectedCountryRef.current },
        { selected: false }
      );
    }

    if (selectedCountryName) {
      // Find the country code from the name (or just pass the country code in props!)
      // To be safe, we'll need the country code in props, but let's assume selectedCountryName is actually the selected country CODE.
      // Wait, MapHighlightedCountriesProps takes selectedCountryName. Let's change the prop to selectedCountryCode.
      map.setFeatureState(
        { source: 'africa-countries', id: selectedCountryName },
        { selected: true }
      );
      selectedCountryRef.current = selectedCountryName;
    } else {
      selectedCountryRef.current = null;
    }

    if (map.getLayer('africa-countries-fill')) {
      map.setPaintProperty('africa-countries-fill', 'fill-opacity', [
        'case',
        ['boolean', ['feature-state', 'selected'], false],
        0.8, // Solid and vibrant when selected
        ['boolean', ['feature-state', 'hover'], false],
        0.65, // Brightened on hover
        0.45 // Lower base opacity since orange contrasts well
      ]);
    }
  }, [map, selectedCountryName]);

  // Reset zoom tracking when selection is cleared (user closed the panel)
  useEffect(() => {
    if (!selectedCountryName) {
      isZoomedInRef.current = false;
      activeCentroidRef.current = null;
    }
  }, [selectedCountryName]);

  useEffect(() => {
    if (!map) return;

    const addLayers = () => {
      if (!map.getSource('africa-countries')) {
        map.addSource('africa-countries', {
          type: 'geojson',
          data: '/data/africa.json',
          promoteId: 'iso_a2'
        });
      }

      const getBaseColorExpr = (): any => {
        const matchExpr: any[] = ['match', ['get', 'iso_a2']];
        for (const [code, color] of Object.entries(regionColors)) {
          matchExpr.push(code, color);
        }
        matchExpr.push('rgba(255, 255, 255, 0)');
        return matchExpr;
      };

      // We use a flat fill layer that drapes over the 3D terrain so topography is not obscured
      if (!map.getLayer('africa-countries-fill')) {
        map.addLayer({
          id: 'africa-countries-fill',
          type: 'fill',
          source: 'africa-countries',
          paint: {
            'fill-color': getBaseColorExpr(), // Always use the beautiful region colors
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'selected'], false],
              0.8, // Solid and vibrant when selected
              ['boolean', ['feature-state', 'hover'], false],
              0.65, // Brightened on hover
              0.45 // Lower base opacity since orange contrasts well
            ]
          }
        }, 'waterway-label');
      }
    };

    if (map.isStyleLoaded()) {
      addLayers();
    } else {
      map.once('style.load', addLayers);
    }

    const handleMouseMove = (e: any) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        const isoA2 = feature.properties?.iso_a2;
        const countryName = feature.properties?.name || feature.properties?.NAME || null;

        if (regionColors[isoA2]) {
          map.getCanvas().style.cursor = 'pointer';

          if (isoA2 !== hoveredCountryRef.current) {
            if (hoveredCountryRef.current) {
              map.setFeatureState(
                { source: 'africa-countries', id: hoveredCountryRef.current },
                { hover: false }
              );
            }
            if (isoA2) {
              map.setFeatureState(
                { source: 'africa-countries', id: isoA2 },
                { hover: true }
              );
            }
            hoveredCountryRef.current = isoA2 || null;
            if (setHoveredNameRef.current) {
              setHoveredNameRef.current(countryName);
            }
          }

          if (setTooltipPosRef.current && e.point) {
            // Only follow mouse if a country is NOT actively selected.
            // When a country IS selected, the `render` event takes over to track the physical centroid.
            if (!selectedCountryRef.current) {
              setTooltipPosRef.current({ x: e.point.x + 15, y: e.point.y + 15 });
            }
          }
        } else {
          clearHover();
        }
      } else {
        clearHover();
      }
    };

    const clearHover = () => {
      map.getCanvas().style.cursor = '';
      if (hoveredCountryRef.current) {
        map.setFeatureState(
          { source: 'africa-countries', id: hoveredCountryRef.current },
          { hover: false }
        );
        hoveredCountryRef.current = null;
        if (setHoveredNameRef.current) {
          setHoveredNameRef.current(null);
        }
      }
    };

    const handleMouseLeave = () => clearHover();

    const handleClick = (e: any) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        const isoA2 = feature.properties?.iso_a2;
        if (regionColors[isoA2] && onCountryClickRef.current) {
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          const update = (coord: number[]) => {
            if (coord[0] < minX) minX = coord[0];
            if (coord[0] > maxX) maxX = coord[0];
            if (coord[1] < minY) minY = coord[1];
            if (coord[1] > maxY) maxY = coord[1];
          };
          const geom = feature.geometry;
          const type = geom.type;
          const coords = geom.coordinates;

          if (type === 'Polygon') {
            coords.forEach((ring: any) => ring.forEach(update));
          } else if (type === 'MultiPolygon') {
            coords.forEach((poly: any) => poly.forEach((ring: any) => ring.forEach(update)));
          }

          const smoothEasing = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

          if (minX !== Infinity) {
            activeCentroidRef.current = [(minX + maxX) / 2, (minY + maxY) / 2];

            const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
            const containerHeight = map.getContainer().clientHeight;

            const bounds: mapboxgl.LngLatBoundsLike = [[minX, minY], [maxX, maxY]];
            const pitch = isMobile ? 0 : 45;

            // Desktop uses standard symmetric padding to center the selected country on screen
            const basePadding = isMobile
              ? { top: 20, bottom: 20, left: 20, right: 20 }
              : { top: 60, bottom: 60, left: 60, right: 60 };

            const camera = map.cameraForBounds(bounds, { padding: basePadding });

            if (camera && camera.zoom !== undefined) {
              if (isMobile) {
                // The visible map area is the container height minus the 50vh bottom sheet
                const bottomSheetHeight = window.innerHeight * 0.5;
                const visibleHeight = Math.max(containerHeight - bottomSheetHeight, 100);

                // Adjust zoom mathematically so bounds fit in the smaller visible height
                const ratio = visibleHeight / containerHeight;
                camera.zoom = camera.zoom + Math.log2(ratio);

                // Cap zoom to prevent getting too close to tiny countries
                camera.zoom = Math.min(camera.zoom, 5.5);

                // Mathematically shift the geographic center SOUTH so the country appears higher on screen.
                // This replaces the buggy `offset` parameter which causes animation jerks in Mapbox.
                import('mapbox-gl').then((mapboxgl) => {
                  const S = 512 * Math.pow(2, camera.zoom!);
                  // We want the country to appear 25% higher, so the camera must point 25% lower (South).
                  const shiftY = (containerHeight * 0.25) / S;

                  const merc = mapboxgl.default.MercatorCoordinate.fromLngLat(camera.center!);
                  merc.y += shiftY;
                  camera.center = merc.toLngLat();

                  executeAnimation();
                });
              } else {
                camera.zoom = Math.min(camera.zoom, 5.5);
                executeAnimation();
              }

              function executeAnimation() {
                if (!map || !camera || !camera.center || camera.zoom === undefined) return;
                if (isZoomedInRef.current) {
                  map.easeTo({
                    center: camera.center,
                    zoom: camera.zoom,
                    pitch,
                    duration: 1200,
                    easing: smoothEasing,
                    essential: true
                  });
                } else {
                  map.flyTo({
                    center: camera.center,
                    zoom: camera.zoom,
                    pitch,
                    duration: 1200,
                    easing: smoothEasing,
                    essential: true
                  });
                }
              }
            }

            isZoomedInRef.current = true;
          } else {
            activeCentroidRef.current = [e.lngLat.lng, e.lngLat.lat];

            const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
            const containerHeight = map.getContainer().clientHeight;

            let targetCenter = e.lngLat;
            let targetZoom = isMobile ? 3.5 : 4.5;
            const pitch = isMobile ? 0 : 45;

            if (isMobile) {
              import('mapbox-gl').then((mapboxgl) => {
                const S = 512 * Math.pow(2, targetZoom);
                const shiftY = (containerHeight * 0.25) / S;
                const merc = mapboxgl.default.MercatorCoordinate.fromLngLat(targetCenter);
                merc.y += shiftY;

                map.flyTo({
                  center: merc.toLngLat(),
                  zoom: targetZoom,
                  essential: true,
                  pitch,
                  duration: 1200,
                  easing: smoothEasing
                });
                isZoomedInRef.current = true;
              });
            } else {
              map.flyTo({
                center: targetCenter,
                zoom: targetZoom,
                essential: true,
                pitch,
                duration: 1200,
                easing: smoothEasing
              });
              isZoomedInRef.current = true;
            }
          }

          if (onCountryClickRef.current) {
            onCountryClickRef.current(feature.properties?.iso_a2 || null);
          }
        }
      }
    };

    const handleGlobalMapClick = (e: any) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ['africa-countries-fill'] });

      let clickedHighlightedCountry = false;
      if (features && features.length > 0) {
        const isoA2 = features[0].properties?.iso_a2;
        if (isoA2 && regionColors[isoA2]) {
          clickedHighlightedCountry = true;
        }
      }

      if (!clickedHighlightedCountry) {
        if (onCountryClickRef.current) {
          onCountryClickRef.current(null);
        }
      }
    };

    const handleRender = () => {
      if (activeCentroidRef.current && setTooltipPosRef.current && selectedCountryRef.current) {
        const pt = map.project(activeCentroidRef.current);
        setTooltipPosRef.current({ x: pt.x, y: pt.y });
      }
    };

    map.on('mousemove', 'africa-countries-fill', handleMouseMove);
    map.on('mouseleave', 'africa-countries-fill', handleMouseLeave);
    map.on('click', 'africa-countries-fill', handleClick);
    map.on('click', handleGlobalMapClick);
    map.on('render', handleRender);

    return () => {
      map.off('mousemove', 'africa-countries-fill', handleMouseMove);
      map.off('mouseleave', 'africa-countries-fill', handleMouseLeave);
      map.off('click', 'africa-countries-fill', handleClick);
      map.off('click', handleGlobalMapClick);
      map.off('render', handleRender);
    };
  }, [map]);

  return null;
};