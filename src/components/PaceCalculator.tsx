import React, { useState } from 'react';
import { 
  Clock, Gauge, Timer, AlertTriangle, CheckCircle2, 
  ChevronRight, RefreshCw, Flag, ShieldCheck 
} from 'lucide-react';
import { CATEGORIES, AID_STATIONS } from '../data/handbookData';
import { CategoryType } from '../types';

export const PaceCalculator: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<'50k' | '75k' | '100k'>('50k');
  
  // Custom target hours state
  const [targetHours, setTargetHours] = useState<number>(7);
  const [targetMinutes, setTargetMinutes] = useState<number>(30);

  const category = CATEGORIES.find(c => c.tag === selectedCat) || CATEGORIES[0];
  const totalTargetMinutes = targetHours * 60 + targetMinutes;
  const avgPaceMinutes = totalTargetMinutes / category.distanceKm;
  const paceMin = Math.floor(avgPaceMinutes);
  const paceSec = Math.round((avgPaceMinutes - paceMin) * 60);

  const cutoffMinutes = category.cutoffHours * 60;
  const bufferMinutes = cutoffMinutes - totalTargetMinutes;
  const isWithinCutoff = bufferMinutes >= 0;

  // Key Checkpoints for the selected category with official barrier indicators
  const checkpoints = [
    { km: 5.5, name: 'Kichukhhon Resturant (Outbound)', isOfficialBarrier: false },
    { km: 17, name: 'Natsal Bhai Bhai Sangha (Outbound)', isOfficialBarrier: false },
    ...(category.distanceKm === 50
      ? [{ km: 25, name: 'Bhangagara Borad Primary School (50K U-Turn)', isOfficialBarrier: true, barrierLimit: '4h 00m', clockTime: '08:30 AM' }]
      : [{ km: 25, name: 'Bhangagara Borad Primary School (Outbound Checkpoint)', isOfficialBarrier: true, barrierLimit: '4h 00m', clockTime: '07:30 AM' }]),
    ...(category.distanceKm >= 75 ? [{ km: 37.5, name: category.distanceKm === 75 ? 'Hostel of Parbatipur Patit Paboni High School (75K U-Turn)' : 'Hostel of Parbatipur Patit Paboni High School (Outbound Kitchen)', isOfficialBarrier: false }] : []),
    ...(category.distanceKm >= 100
      ? [{ km: 50, name: 'Hanuman Mandir (100K U-Turn Point)', isOfficialBarrier: true, barrierLimit: '8h 00m', clockTime: '11:30 AM' }]
      : category.distanceKm === 75
      ? [{ km: 50, name: 'Bhangagara Borad Primary School (Return Checkpoint)', isOfficialBarrier: true, barrierLimit: '8h 00m', clockTime: '11:30 AM' }]
      : []),
    ...(category.distanceKm >= 100 ? [{ km: 62.5, name: 'Hostel of Parbatipur Patit Paboni High School (Return Kitchen)', isOfficialBarrier: false }] : []),
    ...(category.distanceKm >= 100
      ? [{ km: 75, name: 'Bhangagara Borad Primary School (Return Checkpoint)', isOfficialBarrier: true, barrierLimit: '12h 00m', clockTime: '03:30 PM' }]
      : []),
    ...(category.distanceKm >= 50 ? [{ km: category.distanceKm - 17, name: 'Natsal Bhai Bhai Sangha (Return Leg)', isOfficialBarrier: false }] : []),
    { km: category.distanceKm - 5.5, name: 'Kichukhhon Resturant (Final Return Aid)', isOfficialBarrier: false },
    {
      km: category.distanceKm,
      name: 'Tamluk Central Bus Stand (OFFICIAL FINISH)',
      isOfficialBarrier: true,
      barrierLimit: `${category.cutoffHours}h 00m`,
      clockTime: category.distanceKm === 50 ? '12:30 PM' : category.distanceKm === 75 ? '03:30 PM' : '07:30 PM',
    },
  ];

  // Helper to format minutes into HH:MM
  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return `${h}h ${m < 10 ? '0' : ''}${m}m`;
  };

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 sm:p-7 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e2e8f0]">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-700 font-bold border-l-3 border-[#ea580c] pl-3 mb-1.5">
            Operational Pacing Matrix
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase">
            Cut-Off Discipline & Checkpoint Target Calculator
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Calculate your required passage times to safely finish ahead of the official barrier cut-off
          </p>
        </div>

        {/* Distance Selector */}
        <div className="flex items-center bg-[#f8fafc] p-1 rounded border border-[#e2e8f0] text-xs shrink-0">
          {(['50k', '75k', '100k'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCat(cat);
                const defaultHours = cat === '50k' ? 7 : cat === '75k' ? 10.5 : 14;
                setTargetHours(Math.floor(defaultHours));
                setTargetMinutes((defaultHours % 1) * 60);
              }}
              className={`px-3 py-1.5 rounded uppercase font-bold tracking-wide transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-[#0f172a] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0f172a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Target Setting & Pace Summary Banner */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Category Official Rules */}
        <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
          <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block">Official Barrier Rules</span>
          <div className="text-xl font-black text-[#0f172a] mt-1">{category.name}</div>
          
          <div className="mt-2 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-500">Total Cut-Off:</span>
              <span className="font-bold text-rose-600 font-mono">{category.cutoffHours}h 00m Limit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Race Start Time:</span>
              <span className="font-bold text-[#0f172a] font-mono">{category.startTime} (Gun)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Mandatory Reporting:</span>
              <span className="font-bold text-[#0f172a] font-mono">{category.reportingTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Turnaround Point:</span>
              <span className="font-bold text-[#0f172a]">{category.turnaroundKm} KM</span>
            </div>
          </div>

          {/* Intermediate Cut-offs List */}
          <div className="mt-3 pt-2.5 border-t border-[#e2e8f0]">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Intermediate Cut-Off Barriers:
            </div>
            <div className="space-y-1">
              {category.intermediateCutoffs.map((ic, iIdx) => (
                <div key={iIdx} className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-700 font-semibold">{ic.km} KM ({ic.cutoffHours}h)</span>
                  <span className="font-bold text-rose-600">By {ic.timeOfDay}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Time Sliders */}
        <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block">Set Target Goal</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-2xl font-black text-[#0f172a] font-mono">
                {targetHours}h {targetMinutes < 10 ? '0' : ''}{targetMinutes}m
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded font-bold uppercase ${
                isWithinCutoff ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                {isWithinCutoff ? `${formatTime(bufferMinutes)} Buffer` : 'Exceeds Cut-off'}
              </span>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>Hours ({targetHours}h)</span>
                <span>Max: {category.cutoffHours}h</span>
              </div>
              <input
                type="range"
                min={category.distanceKm === 50 ? 4 : category.distanceKm === 75 ? 6 : 9}
                max={category.cutoffHours + 1}
                step={1}
                value={targetHours}
                onChange={(e) => setTargetHours(Number(e.target.value))}
                className="w-full accent-[#ea580c] cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>Minutes ({targetMinutes}m)</span>
              </div>
              <input
                type="range"
                min={0}
                max={45}
                step={15}
                value={targetMinutes}
                onChange={(e) => setTargetMinutes(Number(e.target.value))}
                className="w-full accent-[#ea580c] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Required Average Pace */}
        <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block">Required Avg Pace</span>
            <div className="text-3xl font-black text-[#0f172a] font-mono mt-1">
              {paceMin}:{paceSec < 10 ? '0' : ''}{paceSec} <span className="text-sm font-normal text-slate-500">/km</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Equivalent Speed: ~{((category.distanceKm / totalTargetMinutes) * 60).toFixed(2)} km/h
            </p>
          </div>

          <div className="mt-3 p-2.5 rounded bg-white border border-[#e2e8f0] text-[11px] text-slate-700">
            <strong className="text-[#ea580c]">Cut-off Pace Barrier:</strong> Maximum allowed overall average is <strong>9:36 min/km (6.25 km/h)</strong> across all categories.
          </div>
        </div>

      </div>

      {/* Target Checkpoint Splits Table */}
      <div className="mt-5 overflow-x-auto border border-[#e2e8f0] rounded-lg">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-[#f8fafc] text-slate-600 uppercase tracking-wider border-b border-[#e2e8f0] text-[11px]">
            <tr>
              <th className="p-3">Checkpoint Marker</th>
              <th className="p-3">Station Name & Designation</th>
              <th className="p-3">Target Elapsed Time</th>
              <th className="p-3">Official Barrier Cut-Off</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] bg-white">
            {checkpoints.map((cp, idx) => {
              const targetSplitMin = (cp.km / category.distanceKm) * totalTargetMinutes;
              const cutoffSplitMin = (cp.km / category.distanceKm) * cutoffMinutes;
              const isPass = targetSplitMin <= cutoffSplitMin;

              return (
                <tr 
                  key={idx} 
                  className={`transition-colors ${
                    cp.isOfficialBarrier ? 'bg-orange-50/40 hover:bg-orange-50/70 font-medium' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="p-3 font-mono font-bold text-[#ea580c]">
                    <div className="flex items-center gap-1.5">
                      <span>{cp.km} KM</span>
                      {cp.isOfficialBarrier && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-2xs">
                          BARRIER
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-[#0f172a]">
                    <div className="font-semibold">{cp.name}</div>
                    {cp.isOfficialBarrier && cp.clockTime && (
                      <div className="text-[11px] text-rose-700 font-semibold mt-0.5">
                        Mandatory check barrier closes at {cp.clockTime}
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-mono text-slate-700">
                    {formatTime(targetSplitMin)}
                  </td>
                  <td className="p-3 font-mono font-bold">
                    {cp.isOfficialBarrier ? (
                      <div className="text-rose-600">
                        <span>{cp.barrierLimit}</span>
                        <span className="text-[10px] text-slate-500 font-normal block font-sans">
                          (Gun + {cp.barrierLimit} | {cp.clockTime})
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-600 font-normal">
                        ~{formatTime(cutoffSplitMin)}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                      isPass ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      {isPass ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {isPass ? 'On Target' : 'Beyond Cut-off'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Official Rule Disciplinary Reminder */}
      <div className="mt-5 p-4 rounded-lg bg-[#fff7ed] border border-[#ffedd5] flex items-start gap-3 text-xs text-[#9a3412]">
        <ShieldCheck className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#0f172a]">Official Cut-Off Directive:</strong> Runners failing to reach the designated turnaround or aid stations within the official limits will have their timing chip deactivated and will be transported back to the Tamluk Central Bus Stand by the official sweeper vehicle for athlete safety. <strong>Cut-off decisions by race officials are absolute and final.</strong>
        </div>
      </div>

    </div>
  );
};
