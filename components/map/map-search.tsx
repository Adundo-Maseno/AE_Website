'use client';

import React, { useState, useMemo } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Globe, Filter } from 'lucide-react';

export interface FacetedCountryItem {
  name: string;
  code: string;
  region: string;
  projects?: number;
  focus?: string[];
  workDone?: string[];
}

interface MapSearchProps {
  onCountrySelect: (countryCode: string) => void;
  countries: FacetedCountryItem[];
  className?: string;
}

export const MapSearch: React.FC<MapSearchProps> = ({ onCountrySelect, countries, className = '' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = useMemo(() => {
    const list = Array.from(new Set(countries.map(c => c.region))).filter(Boolean);
    return ['all', ...list];
  }, [countries]);

  const uniqueThemes = useMemo(() => {
    const themes = new Set<string>();
    countries.forEach(c => {
      c.focus?.forEach(f => themes.add(f));
    });
    return Array.from(themes).slice(0, 8);
  }, [countries]);

  const filteredCountries = useMemo(() => {
    const q = query.toLowerCase().trim();
    return countries.filter(c => {
      const matchesRegion = selectedRegion === 'all' || c.region === selectedRegion;
      const matchesQuery = !q ||
        c.name.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        (c.focus && c.focus.some(f => f.toLowerCase().includes(q))) ||
        (c.workDone && c.workDone.some(w => w.toLowerCase().includes(q)));
      return matchesRegion && matchesQuery;
    });
  }, [countries, query, selectedRegion]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-label="Search and filter countries by region or agricultural theme"
          className={`flex items-center gap-3 px-4 py-2.5 bg-white/90 hover:bg-white backdrop-blur-md border border-stone-200/90 rounded-2xl shadow-lg hover:shadow-xl transition-[transform,background-color,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 cursor-pointer group text-left ${className}`}
        >
          <div className="w-8 h-8 rounded-xl bg-primary-green/10 flex items-center justify-center text-primary-green group-hover:bg-primary-green group-hover:text-white transition-colors duration-300">
            <Search className="w-4 h-4" />
          </div>
          <div className="flex flex-col flex-1 min-w-0 pr-2">
            <span className="text-xs font-semibold text-deep-forest truncate">
              {query || (selectedRegion !== 'all' ? `Region: ${selectedRegion}` : 'Search countries or themes...')}
            </span>
            <span className="text-[10px] text-charcoal/50 font-normal">
              Interactive Seed Systems Map
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60 bg-mist/80 px-2 py-0.5 rounded-md border border-stone-200/50">
            Filter
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[320px] sm:w-[380px] p-0 rounded-2xl border-stone-200 shadow-2xl overflow-hidden bg-white z-[100]"
        align="start"
      >
        <Command shouldFilter={false} className="bg-white">
          <div className="p-3 border-b border-stone-100 flex flex-col gap-2 bg-stone-50/50">
            <CommandInput
              placeholder="Search by country, region, or crop..."
              value={query}
              onValueChange={setQuery}
              className="border-none focus:ring-0 text-deep-forest text-sm font-medium bg-transparent"
            />
            {/* Quick Region Facet Pills (Farm Africa blueprint) */}
            <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 text-[11px]">
              {regions.map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRegion(r)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green font-medium ${selectedRegion === r
                    ? 'bg-deep-forest text-white shadow-sm'
                    : 'bg-white border border-stone-200/80 text-charcoal/70 hover:bg-stone-100'
                    }`}
                >
                  {r === 'all' ? 'All Regions' : r}
                </button>
              ))}
            </div>
          </div>

          <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
            <CommandEmpty className="py-8 text-center text-xs text-charcoal/60 font-light">
              No matching agricultural programs found.
            </CommandEmpty>

            <CommandGroup heading={`Portfolio Countries (${filteredCountries.length})`} className="tabular-nums">
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.name}
                  onSelect={() => {
                    onCountrySelect(country.code);
                    setOpen(false);
                    setQuery('');
                  }}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-mist/80 aria-selected:bg-mist transition-colors group mb-1"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-mist flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition-colors duration-200 text-deep-forest">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-deep-forest truncate">{country.name}</span>
                      <span className="text-[10px] text-charcoal/50 flex items-center gap-1.5">
                        <span className="uppercase tracking-wider font-semibold">{country.region}</span>
                        {country.projects ? <span className="tabular-nums">• {country.projects} projects</span> : null}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-primary-green bg-primary-green/10 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    Fly to
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>

            {uniqueThemes.length > 0 && !query && (
              <CommandGroup heading="Agricultural Focus Themes">
                <div className="flex flex-wrap gap-1.5 p-1">
                  {uniqueThemes.map(theme => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => setQuery(theme)}
                      className="text-[10px] px-2.5 py-1 rounded-md bg-mist/60 hover:bg-primary-green/15 text-deep-forest border border-stone-200/50 transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green font-medium text-left"
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
