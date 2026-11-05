'use client';

import React from 'react';
import { useMap } from './map-context';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

export const MapControls: React.FC = () => {
  const { map } = useMap();

  const handleZoomIn = () => {
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    if (map) map.zoomOut();
  };

  return (
    <div className="absolute right-4 bottom-4 flex flex-col gap-1.5 z-10 p-1 rounded-xl bg-white/75 backdrop-blur-md border border-white/60 shadow-md">
      <Button variant="ghost" size="icon-sm" onClick={handleZoomIn} aria-label="Zoom in" className="hover:bg-black/5 text-deep-forest transition-[transform,background-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-primary-green">
        <Plus className="h-4 w-4" />
      </Button>
      <div className="h-px bg-stone-200/60 mx-1" />
      <Button variant="ghost" size="icon-sm" onClick={handleZoomOut} aria-label="Zoom out" className="hover:bg-black/5 text-deep-forest transition-[transform,background-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-primary-green">
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
};
