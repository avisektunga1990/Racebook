import React, { useState } from 'react';
import { 
  Compass, MapPin, ExternalLink, RefreshCw, Flag, 
  ChevronRight, Utensils, Droplets, Info, Milestone, Layers
} from 'lucide-react';
import { AID_STATIONS, CATEGORIES } from '../../data/handbookData';
import { CategoryType } from '../../types';
import { RouteMapsGallery } from './RouteMapsGallery';

interface RouteMapInfographicProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
}

export const RouteMapInfographic: React.FC<RouteMapInfographicProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [selectedStationId, setSelectedStationId] = useState<string>('as-3');

  // Filter stations based on category
  const maxKmForCat = selectedCategory === '50k' ? 25 : selectedCategory === '75k' ? 37.5 : 50;
  const activeStations = AID_STATIONS.filter(s => s.km <= maxKmForCat);
  const selectedStation = AID_STATIONS.find(s => s.id === selectedStationId) || AID_STATIONS[3];

  return (
    <div className="space-y-8">
      {/* Official Route Maps Gallery (50K, 75K, 100K Satellite Views & Live GPS) */}
      <RouteMapsGallery
        activeCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* Course Schema & Sequential Station Mileposts */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 sm:p-7 shadow-sm">
        
        {/* Header with Title & Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e2e8f0]">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-700 font-bold border-l-3 border-[#ea580c] pl-3">
              Sequential Course Mileposts
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] mt-1.5 uppercase">
              Out-and-Back Riverside Course Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Tamluk Central Bus Stand ⇋ Haldia Highway Corridor along the Rupnarayan River
            </p>
          </div>

          {/* Category Switcher */}
          <div className="flex items-center bg-[#f8fafc] p-1 rounded border border-[#e2e8f0] text-xs shrink-0">
            {(['all', '50k', '75k', '100k'] as CategoryType[]).map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 rounded uppercase font-bold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#ea580c] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0f172a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      {/* Visual Sequence Infographic Diagram */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-3 px-1">
          <span className="flex items-center gap-1.5 text-[#ea580c]">
            <Flag className="w-3.5 h-3.5" /> START (0 KM)
          </span>
          <span className="flex items-center gap-1.5 text-blue-600">
            <RefreshCw className="w-3.5 h-3.5" /> TURNAROUND POINT
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700">
            FINISH (TAMLUK)
          </span>
        </div>

        {/* Milestone Node Track */}
        <div className="relative py-6 px-2 overflow-x-auto">
          {/* Track Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1.5 bg-[#e2e8f0] rounded-full">
            <div 
              className="h-full bg-[#ea580c] rounded-full transition-all duration-500"
              style={{
                width: selectedCategory === '50k' ? '50%' : selectedCategory === '75k' ? '75%' : '100%'
              }}
            />
          </div>

          {/* Station Markers */}
          <div className="relative flex justify-between items-center min-w-[620px] z-10">
            {AID_STATIONS.map((station) => {
              const isSelected = station.id === selectedStationId;
              const isTurnaround = station.turnaroundFor !== undefined;
              const isBeyond = station.km > maxKmForCat;

              return (
                <button
                  key={station.id}
                  id={`route-node-${station.id}`}
                  onClick={() => setSelectedStationId(station.id)}
                  disabled={isBeyond && selectedCategory !== 'all'}
                  className={`flex flex-col items-center group cursor-pointer transition-all ${
                    isBeyond && selectedCategory !== 'all' ? 'opacity-35 grayscale cursor-not-allowed' : ''
                  }`}
                >
                  {/* Kilometer Tag */}
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded mb-2 transition-colors ${
                    isSelected
                      ? 'bg-[#ea580c] text-white shadow-sm'
                      : isTurnaround
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-[#f1f5f9] text-slate-700 border border-[#e2e8f0]'
                  }`}>
                    {station.km} KM
                  </span>

                  {/* Marker Dot */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-transform duration-200 group-hover:scale-110 ${
                    isSelected
                      ? 'bg-[#ea580c] border-orange-500 text-white scale-110 shadow-sm'
                      : isTurnaround
                      ? 'bg-rose-600 border-rose-500 text-white'
                      : 'bg-white border-slate-300 text-slate-700'
                  }`}>
                    {station.km === 0 ? (
                      <Flag className="w-3.5 h-3.5" />
                    ) : isTurnaround ? (
                      <RefreshCw className="w-3.5 h-3.5" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Station Name Label */}
                  <div className="mt-2 text-center max-w-[90px]">
                    <span className={`text-[11px] font-bold line-clamp-1 block transition-colors ${
                      isSelected ? 'text-[#ea580c]' : 'text-slate-700'
                    }`}>
                      {station.name.split('(')[0]}
                    </span>
                    {station.turnaroundFor && (
                      <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 px-1 py-0.5 rounded border border-rose-200 block mt-0.5">
                        {station.turnaroundFor} U-Turn
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Turnaround Summary Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
          <div className={`p-3.5 rounded-lg border transition-all ${
            selectedCategory === '50k' ? 'bg-[#fff7ed] border-[#ffedd5]' : 'bg-[#f8fafc] border-[#e2e8f0]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#ea580c] font-mono">50K ULTRA</span>
              <span className="text-[10px] uppercase font-bold text-slate-500">Outbound: 25 KM</span>
            </div>
            <div className="text-sm font-bold text-[#0f172a] mt-1">25 KM U-Turn & Cut-Off Barrier</div>
            <p className="text-xs text-slate-600 mt-0.5">Bhangagara Borad Primary School (Cut-off: 4h / 08:30 AM) → Return to Start at Tamluk (Total: 50 KM)</p>
          </div>

          <div className={`p-3.5 rounded-lg border transition-all ${
            selectedCategory === '75k' ? 'bg-[#fff7ed] border-[#ffedd5]' : 'bg-[#f8fafc] border-[#e2e8f0]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#ea580c] font-mono">75K ULTRA</span>
              <span className="text-[10px] uppercase font-bold text-slate-500">Outbound: 37.5 KM</span>
            </div>
            <div className="text-sm font-bold text-[#0f172a] mt-1">37.5 KM U-Turn & Cooked Meals</div>
            <p className="text-xs text-slate-600 mt-0.5">Hostel of Parbatipur Patit Paboni High School (Vat, Dal, Alu Jeera) → Return to Start at Tamluk (75 KM)</p>
          </div>

          <div className={`p-3.5 rounded-lg border transition-all ${
            selectedCategory === '100k' ? 'bg-[#fff7ed] border-[#ffedd5]' : 'bg-[#f8fafc] border-[#e2e8f0]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#ea580c] font-mono">100K ULTRA</span>
              <span className="text-[10px] uppercase font-bold text-slate-500">Outbound: 50 KM</span>
            </div>
            <div className="text-sm font-bold text-[#0f172a] mt-1">50 KM U-Turn</div>
            <p className="text-xs text-slate-600 mt-0.5">Hanuman Mandir (Cut-off: 8h / 11:30 AM) → Return to Start at Tamluk (100 KM)</p>
          </div>
        </div>

        {/* Selected Station Deep-Dive Detail Card */}
        <div className="mt-6 p-4 sm:p-5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#0f172a] text-white text-xs font-bold font-mono">
                {selectedStation.km} KM MARKER
              </span>
              {selectedStation.turnaroundFor && (
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold uppercase">
                  Official {selectedStation.turnaroundFor} U-Turn
                </span>
              )}
              {selectedStation.isMajorNutrition && (
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase">
                  Major Cooked Meal Post
                </span>
              )}
            </div>
            <h4 className="text-lg font-bold text-[#0f172a] mt-1.5 flex items-center gap-2">
              <span>{selectedStation.name}</span>
            </h4>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {selectedStation.description}
            </p>

            {/* Station Available Supplies */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span className="text-xs text-slate-500 font-semibold mr-1">Provided:</span>
              {selectedStation.supplies.map((item, idx) => (
                <span 
                  key={idx}
                  className={`text-[11px] px-2 py-0.5 rounded border font-medium ${
                    item.category === 'solid-meal'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold'
                      : item.category === 'electrolyte'
                      ? 'bg-blue-50 border-blue-200 text-blue-800'
                      : 'bg-white border-[#e2e8f0] text-slate-700'
                  }`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>

          <a
            href={selectedStation.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-white hover:bg-slate-50 border border-[#e2e8f0] text-[#0f172a] text-xs font-bold transition-all shrink-0 cursor-pointer shadow-sm"
          >
            <MapPin className="w-4 h-4 text-[#ea580c]" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* Elevation & Course Terrain Note */}
        <div className="mt-4 p-3 rounded-lg bg-[#fff7ed] border border-[#ffedd5] flex items-start gap-2.5 text-xs text-[#9a3412]">
          <Info className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#0f172a]">Terrain & Elevation Note:</strong> The Tamluk–Haldia river corridor is predominantly flat deltaic asphalt and rural tarmac (elevation profile between 4m and 9m above sea level). The key challenge is not vertical gain, but pacing against humid monsoonal headwinds and maintaining continuous hydration discipline.
          </div>
        </div>

      </div>

    </div>

  </div>
);
};
