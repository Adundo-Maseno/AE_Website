'use client';

import React from 'react';
import { MapProvider } from './map-context';
import { MapControls } from './map-controls';
import { MapHighlightedCountries } from './map-highlighted-countries';
import { MapAutoCenter } from './map-auto-center';
import type { CountryProject } from './types';

interface InteractiveMapboxProps {
  onCountryClick?: (countryName: string | null) => void;
  setHoveredName?: (name: string | null) => void;
  setTooltipPos?: (pos: { x: number; y: number }) => void;
  selectedCountryName?: string;
  activeProjects?: CountryProject[];
  selectedProjectIndex?: number | null;
  setSelectedProjectIndex?: (index: number | null) => void;
  cityCoordinates?: Record<string, [number, number]>;
  onMapReady?: (map: any) => void;
}

export const InteractiveMapbox: React.FC<InteractiveMapboxProps> = ({
  onCountryClick,
  setHoveredName,
  setTooltipPos,
  selectedCountryName,
  onMapReady,
}) => {
  return (
    <div className="w-full h-full relative">
      <MapProvider onMapReady={onMapReady}>
        <MapAutoCenter selectedCountryName={selectedCountryName} />
        <MapControls />
        <MapHighlightedCountries
          onCountryClick={onCountryClick}
          setHoveredName={setHoveredName}
          setTooltipPos={setTooltipPos}
          selectedCountryName={selectedCountryName}
        />
      </MapProvider>
    </div>
  );
};
