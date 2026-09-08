import React from 'react';
import { 
  Droplet, Zap, Utensils, Coffee, Apple, MapPin, 
  ExternalLink, AlertTriangle, ShieldCheck, Clock, Repeat
} from 'lucide-react';
import { AID_STATIONS } from '../../data/handbookData';

export const AidStationGrid: React.FC = () => {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'hydration':
        return { bg: 'bg-blue-50 text-blue-800 border-blue-200', icon: Droplet };
      case 'electrolyte':
        return { bg: 'bg-amber-50 text-amber-800 border-amber-200', icon: Zap };
      case 'solid-meal':
        return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold', icon: Utensils };
      case 'snack':
        return { bg: 'bg-purple-50 text-purple-800 border-purple-200', icon: Coffee };
      case 'carb':
      default:
        return { bg: 'bg-orange-50 text-orange-800 border-orange-200', icon: Apple };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Legend strip */}
      <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-lg bg-white border border-[#e2e8f0] text-xs text-slate-700 shadow-sm">
        <span className="font-bold text-[#0f172a] uppercase tracking-wider text-[11px]">Nutrition Legend:</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[11px]">
          <Droplet className="w-3 h-3" /> Pure Hydration
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[11px]">
          <Zap className="w-3 h-3" /> Electrolytes & Salts
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-200 text-[11px]">
          <Apple className="w-3 h-3" /> Fast Energy & Fruit
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-bold">
          <Utensils className="w-3 h-3" /> Hot Cooked Meals
        </span>
      </div>

      {/* Grid of Stations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AID_STATIONS.map((station) => {
          const isMajor = station.isMajorNutrition;
          const isTurnaround = !!station.turnaroundFor;
          const isTimeCheck = station.isTimeCheckPoint;

          return (
            <div
              key={station.id}
              id={`aid-card-${station.id}`}
              className={`rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden bg-white shadow-sm ${
                isMajor
                  ? 'border-emerald-500 ring-1 ring-emerald-500/30'
                  : isTurnaround
                  ? 'border-orange-300 ring-1 ring-orange-200'
                  : 'border-[#e2e8f0]'
              }`}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-[#e2e8f0]">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#0f172a] text-white text-xs font-bold font-mono">
                    {station.km === 0 ? 'START / FINISH' : `${station.km} KM`}
                  </span>

                  <div className="flex flex-wrap items-center gap-1">
                    {isTimeCheck && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-700" /> Time Check Point
                      </span>
                    )}

                    {isTurnaround && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-800 border border-rose-200">
                        {station.turnaroundFor} U-Turn
                      </span>
                    )}

                    {isMajor && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Hot Cooked Meals
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-base font-bold text-[#0f172a] mt-2 leading-snug">
                  {station.name}
                </h4>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {station.description}
                </p>

                {/* Runner Access Callout Box */}
                <div className="mt-3 p-2.5 rounded-lg bg-orange-50/80 border border-orange-200 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wide flex items-center gap-1.5">
                      <Repeat className="w-3.5 h-3.5 text-[#ea580c]" />
                      <span>Runner Access:</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-orange-950 px-1.5 py-0.5 rounded bg-orange-200/60">
                      {station.accessCountSummary}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1 pt-1.5 border-t border-orange-200/60">
                    {station.runnerAccess.map((access, aIdx) => (
                      <div key={aIdx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[11px] gap-0.5">
                        <span className="font-bold text-slate-900 shrink-0">
                          {access.categoryLabel} ({access.times === 1 ? 'Once' : 'Twice'}):
                        </span>
                        <span className="text-slate-600 text-[10px] sm:text-right font-mono">
                          {access.legs}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Body: Supplies Checklist */}
              <div className="p-4 flex-1 bg-[#f8fafc]">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Available Station Supplies:
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {station.supplies.map((supply, sIdx) => {
                    const badge = getCategoryBadge(supply.category);
                    const IconComponent = badge.icon;
                    return (
                      <span
                        key={sIdx}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium ${badge.bg}`}
                      >
                        <IconComponent className="w-3 h-3 shrink-0" />
                        <span>{supply.name}</span>
                      </span>
                    );
                  })}
                </div>

                {/* Specific callout for 37.5K Major Station */}
                {isMajor && (
                  <div className="mt-3 p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                    <strong className="block text-emerald-950 font-bold mb-0.5">Cooked Meals (Vat, Dal, Alu Jeera, Chatni):</strong>
                    Runners in 75K and 100K are provided hot fresh meals here before embarking on their return leg.
                  </div>
                )}
              </div>

              {/* Card Footer: Maps Link */}
              <div className="p-3.5 bg-white border-t border-[#e2e8f0] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {station.km === 0 ? 'Start & Finish Point' : station.turnaroundFor ? `${station.turnaroundFor} U-Turn Point (${station.km} KM)` : `${station.km} KM Checkpoint`}
                </span>
                
                <a
                  href={station.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#ea580c] hover:underline"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

      {/* Strategic Rule Callout Box - Professional Polish advisory container */}
      <div className="p-4 sm:p-5 rounded-lg bg-[#fff7ed] border border-[#ffedd5] text-[#9a3412] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-orange-100 text-[#ea580c] shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#9a3412]">
              Rule 11: Self-Sufficiency Principle Between Stations
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-3xl leading-relaxed">
              Aid stations are placed 6 to 12.5 kilometres apart. <strong>Do not begin the race depending entirely on aid stations.</strong> You must carry your own hydration bottle/vest, personal electrolytes, and tested fuel. If you have allergies, dietary constraints, or medical needs, carry your own supplies.
            </p>
          </div>
        </div>
        
        <div className="shrink-0 flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-[#ffedd5] text-xs font-semibold text-[#ea580c]">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Cupless Event</span>
        </div>
      </div>

    </div>
  );
};
