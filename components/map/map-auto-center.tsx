'use client';

import React, { useEffect, useRef } from 'react';
import { getOptimalZoom } from './map-utils';
import { useMap } from './map-context';

export interface MapAutoCenterProps {
  selectedCountryName?: string;
}

export const MapAutoCenter: React.FC<MapAutoCenterProps> = ({ selectedCountryName }) => {
  const { map } = useMap();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!map) return;

    const resetCenter = (immediate = false) => {
      // Don't auto-center if a country is currently selected/zoomed in
      if (selectedCountryName) return;
      
      const smoothEasing = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
      
      // Use dynamic explicit zoom and center for the globe projection.
      // We offset the center latitude slightly south (-2.0) to account for the header.
      map.flyTo({
        center: [17.0, -2.0],
        zoom: getOptimalZoom(),
        pitch: 0,
        essential: true,
        duration: 800, // Snap back quickly
        easing: smoothEasing
      });
    };

    const handleInteraction = (e: any) => {
      // If user drags or zooms, we restart the inactivity timer to return back
      if (e && e.originalEvent) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => resetCenter(false), 1500); // 1.5 seconds to snap back when spun away
      }
    };

    const stopTimer = (e: any) => {
      if (e && e.originalEvent) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    };

    // Listen for move and zoom events
    map.on('movestart', stopTimer);
    map.on('moveend', handleInteraction);
    map.on('zoomstart', stopTimer);
    map.on('zoomend', handleInteraction);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      // On mount, position the map quickly
      timeoutRef.current = setTimeout(() => resetCenter(false), 150);
    } else if (!selectedCountryName) {
      // User closed the dossier panel -> refocus IMMEDIATELY!
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      resetCenter(true);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      map.off('movestart', stopTimer);
      map.off('moveend', handleInteraction);
      map.off('zoomstart', stopTimer);
      map.off('zoomend', handleInteraction);
    };
  }, [map, selectedCountryName]);

  return null;
};