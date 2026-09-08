import React from 'react';
import { 
  Calendar, MapPin, Compass, ShieldCheck, Download, 
  Printer, ArrowRight, Waves, Flame, Award, HeartHandshake, CheckCircle2 
} from 'lucide-react';
import { RACE_INFO } from '../data/handbookData';

interface HeroCoverProps {
  onExportPdf: () => void;
  onPrint: () => void;
  onNavigateToSection: (id: string) => void;
}

export const HeroCover: React.FC<HeroCoverProps> = ({
  onExportPdf,
  onPrint,
  onNavigateToSection,
}) => {
  return (
    <section 
      id="hero-cover" 
      className="relative overflow-hidden bg-white border border-[#e2e8f0] rounded-xl p-6 sm:p-10 shadow-sm page-break-avoid"
    >
      <div className="relative max-w-5xl mx-auto">
        
        {/* Header Block: Title, Subtitle, and Export Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#e2e8f0]">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ea580c] mb-2">
              <span>Official Participant Manual • 2026 Edition</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0f172a] uppercase">
              TAMRALIPTA ULTRA
            </h1>
            <p className="text-[#ea580c] font-bold text-sm sm:text-base tracking-widest uppercase mt-1">
              WHERE HISTORY MEETS ENDURANCE
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 no-print shrink-0">
            <button
              id="hero-download-pdf-cta"
              onClick={onExportPdf}
              className="px-4 py-2.5 rounded bg-[#0f172a] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#ea580c] stroke-[2.5]" />
              <span>Export PDF Handbook</span>
            </button>
            <button
              id="hero-print-button"
              onClick={onPrint}
              className="px-3.5 py-2.5 rounded bg-[#f8fafc] hover:bg-slate-100 border border-[#e2e8f0] text-[#0f172a] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Event Key Metadata Strip */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-slate-700">
            <Calendar className="w-4 h-4 text-[#ea580c] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{RACE_INFO.date}</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-slate-700">
            <MapPin className="w-4 h-4 text-[#ea580c] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{RACE_INFO.location}</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-slate-700">
            <Award className="w-4 h-4 text-[#ea580c] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">Organized by {RACE_INFO.organizer}</span>
          </div>
        </div>

        {/* Stat Grid: 50K, 75K, 100K */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-center">
            <div className="text-2xl font-black text-[#0f172a]">50K ULTRA</div>
            <div className="text-xs text-rose-600 mt-1 font-bold">08:00 Total Cut-Off</div>
            <div className="text-[11px] text-[#ea580c] font-bold mt-0.5 uppercase">Flag Off: 04:30 AM</div>
            <div className="text-[11px] text-slate-500 mt-1">Intermediate: 25 KM in 4h (08:30 AM)</div>
          </div>
          <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-center">
            <div className="text-2xl font-black text-[#0f172a]">75K ULTRA</div>
            <div className="text-xs text-rose-600 mt-1 font-bold">12:00 Total Cut-Off</div>
            <div className="text-[11px] text-[#ea580c] font-bold mt-0.5 uppercase">Flag Off: 03:30 AM</div>
            <div className="text-[11px] text-slate-500 mt-1">Intermediates: 25K (07:30 AM) • 50K (11:30 AM)</div>
          </div>
          <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-center">
            <div className="text-2xl font-black text-[#0f172a]">100K ULTRA</div>
            <div className="text-xs text-rose-600 mt-1 font-bold">16:00 Total Cut-Off</div>
            <div className="text-[11px] text-[#ea580c] font-bold mt-0.5 uppercase">Flag Off: 03:30 AM</div>
            <div className="text-[11px] text-slate-500 mt-1">Intermediates: 25K (7:30A) • 50K (11:30A) • 75K (3:30P)</div>
          </div>
        </div>

        {/* Narrative Banner */}
        <div className="mt-6 p-4 rounded-lg bg-[#fff7ed] border border-[#ffedd5] text-[#9a3412] text-xs sm:text-sm leading-relaxed">
          <b>Race Philosophy:</b> You are not simply running from Tamluk towards Haldia and back. You are running through a landscape shaped by rivers, trade, faith, resistance and generations of human endeavour. Run through history. Run beside the rivers. Run beyond your limits.
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-2 no-print">
          <button
            id="hero-jump-route"
            onClick={() => onNavigateToSection('sec-09')}
            className="px-3 py-2 rounded bg-white hover:bg-slate-50 border border-[#e2e8f0] text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>Route Map</span>
          </button>

          <button
            id="hero-jump-aid"
            onClick={() => onNavigateToSection('sec-10')}
            className="px-3 py-2 rounded bg-white hover:bg-slate-50 border border-[#e2e8f0] text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Waves className="w-3.5 h-3.5 text-blue-600" />
            <span>Aid Stations</span>
          </button>

          <button
            id="hero-jump-gear"
            onClick={() => onNavigateToSection('sec-13')}
            className="px-3 py-2 rounded bg-white hover:bg-slate-50 border border-[#e2e8f0] text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Gear Checklist</span>
          </button>

          <button
            id="hero-jump-calculator"
            onClick={() => onNavigateToSection('sec-18')}
            className="px-3 py-2 rounded bg-white hover:bg-slate-50 border border-[#e2e8f0] text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
            <span>Pacing Calculator</span>
          </button>
        </div>

        {/* Key Operational Metrics Ribbon */}
        <div className="mt-6 pt-6 border-t border-[#e2e8f0] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
            <div className="text-xl font-extrabold text-[#0f172a]">3 Distances</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">50K • 75K • 100K</div>
          </div>
          <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
            <div className="text-xl font-extrabold text-[#0f172a]">5 Stations</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Hot Meals at 37.5K</div>
          </div>
          <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
            <div className="text-xl font-extrabold text-[#0f172a]">03:30 / 04:30</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Flag-Off Times</div>
          </div>
          <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
            <div className="text-xl font-extrabold text-[#0f172a]">Prehistoric</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Ancient Port Route</div>
          </div>
        </div>

      </div>
    </section>
  );
};
