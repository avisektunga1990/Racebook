import React from 'react';
import { 
  CloudRain, Droplets, Thermometer, Wind, Zap, 
  AlertTriangle, ShieldAlert, Sparkles, CheckCircle2 
} from 'lucide-react';

export const WeatherGauge: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-700 font-bold border-l-3 border-[#ea580c] pl-3 mb-1.5">
              Climatological Assessment • September 2026
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase">
              Monsoon Ultra Conditions in Purba Medinipur
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              20 September falls squarely within the humid, wet post-monsoon period in Tamluk. Running through rain and high moisture is an integral part of the Tamralipta challenge.
            </p>
          </div>

          <div className="px-4 py-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-center shrink-0">
            <div className="text-2xl sm:text-3xl font-black text-[#ea580c] font-mono">290 mm</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Sept Avg Rainfall (~22 Days)</div>
          </div>
        </div>
      </div>

      {/* 4 Metric Infographic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Temperature */}
        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Temperature</span>
            <Thermometer className="w-4 h-4 text-[#ea580c]" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#0f172a] font-mono">28° – 32°C</div>
            <p className="text-xs text-slate-600 mt-1">Warm tropical temperatures; feels warmer due to moisture.</p>
          </div>
        </div>

        {/* Humidity */}
        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Relative Humidity</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#0f172a] font-mono">85% – 95%</div>
            <p className="text-xs text-slate-600 mt-1">High sweat rate; body cooling via evaporation is diminished.</p>
          </div>
        </div>

        {/* Rain & Sky */}
        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Precipitation</span>
            <CloudRain className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-[#0f172a]">Rain / Overcast</div>
            <p className="text-xs text-slate-600 mt-1">Overcast skies, sudden cloudbursts, and intermittent drizzle.</p>
          </div>
        </div>

        {/* Surface & Thunder */}
        <div className="p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Road Hazards</span>
            <Zap className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-[#0f172a]">Wet Tarmac</div>
            <p className="text-xs text-slate-600 mt-1">Slippery roads, standing puddles, potential thunder squalls.</p>
          </div>
        </div>

      </div>

      {/* Critical Monsoon Footwear & Chafing Strategy */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#fff7ed] border border-[#ffedd5] shadow-sm">
        <h4 className="text-sm sm:text-base font-bold text-[#9a3412] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#ea580c]" />
          <span>Essential Monsoon Runner Strategy: Protect Your Feet & Skin</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs sm:text-sm text-slate-700">
          <div className="p-3.5 rounded-lg bg-white border border-[#ffedd5]">
            <strong className="text-[#0f172a] block mb-1">🦶 Double Sock & Dry Bag Strategy:</strong>
            Wet socks combined with 8 to 16 hours of continuous friction creates macerated skin and deep blisters. Pack 1 or 2 spare pairs of technical socks inside double ziplock bags in your drop bag or hydration pack. Swap into fresh socks at the 37.5 KM or 50 KM turnaround.
          </div>

          <div className="p-3.5 rounded-lg bg-white border border-[#ffedd5]">
            <strong className="text-[#0f172a] block mb-1">🧴 Anti-Chafing Barrier:</strong>
            Apply liberal anti-chafing balm or silicone gel to your inner thighs, armpits, toes, and sports bra/bib contact points before starting. Reapply at major nutrition stations.
          </div>
        </div>
      </div>

    </div>
  );
};
