import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, Square, ShieldAlert, ShieldCheck, 
  RotateCcw, AlertCircle, Sparkles, Filter, Flashlight
} from 'lucide-react';
import { GEAR_ITEMS } from '../data/handbookData';
import { GearItem } from '../types';

export const InteractiveGearChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tamralipta_gear_checklist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<'all' | '50k' | '75k' | '100k'>('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'mandatory' | 'recommended' | 'missing'>('all');

  useEffect(() => {
    try {
      localStorage.setItem('tamralipta_gear_checklist_v1', JSON.stringify(checkedIds));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [checkedIds]);

  const isMandatoryForItem = (item: GearItem, cat: 'all' | '50k' | '75k' | '100k'): boolean => {
    if (!item.isMandatory) return false;
    if (item.mandatoryCategories) {
      if (cat === 'all') return true;
      return item.mandatoryCategories.includes(cat);
    }
    return true;
  };

  const toggleItem = (id: string) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const checkAllMandatory = () => {
    const mandatoryIds = GEAR_ITEMS
      .filter(g => isMandatoryForItem(g, selectedCategory))
      .map(g => g.id);
    setCheckedIds(prev => Array.from(new Set([...prev, ...mandatoryIds])));
  };

  const resetAll = () => {
    if (window.confirm('Reset gear verification checklist?')) {
      setCheckedIds([]);
    }
  };

  const mandatoryItems = GEAR_ITEMS.filter(g => isMandatoryForItem(g, selectedCategory));
  const mandatoryTotal = mandatoryItems.length;
  const mandatoryChecked = mandatoryItems.filter(g => checkedIds.includes(g.id)).length;
  const isMandatoryComplete = mandatoryChecked === mandatoryTotal;

  const filteredItems = GEAR_ITEMS.filter(item => {
    const mandatory = isMandatoryForItem(item, selectedCategory);
    if (activeFilter === 'mandatory') return mandatory;
    if (activeFilter === 'recommended') return !mandatory;
    if (activeFilter === 'missing') return !checkedIds.includes(item.id);
    return true;
  });

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 sm:p-7 shadow-sm">
      
      {/* Header & Status Gauge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e2e8f0]">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-700 font-bold border-l-3 border-[#ea580c] pl-3 mb-1.5">
            Operational Readiness Matrix
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase">
            Mandatory & Recommended Gear Checklist
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Verified during Mandatory Bib Distribution & Gear Check on 19 September
          </p>
        </div>

        {/* Progress Badge */}
        <div className={`px-4 py-2.5 rounded-lg border flex items-center gap-3 shrink-0 ${
          isMandatoryComplete
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : 'bg-[#fff7ed] border-[#ffedd5] text-[#9a3412]'
        }`}>
          <div className="text-right">
            <div className="text-[11px] font-bold uppercase">
              {selectedCategory === 'all' ? 'Mandatory Status' : `${selectedCategory.toUpperCase()} Mandatory Status`}
            </div>
            <div className="text-base font-black font-mono">
              {mandatoryChecked} / {mandatoryTotal} Verified
            </div>
          </div>
          {isMandatoryComplete ? (
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          ) : (
            <ShieldAlert className="w-6 h-6 text-[#ea580c] shrink-0" />
          )}
        </div>
      </div>

      {/* Category Customizer Tabs */}
      <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide shrink-0">
            Filter by Race Category:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0f172a] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setSelectedCategory('50k')}
            className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
              selectedCategory === '50k'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'
            }`}
          >
            50K Ultra (Headlamp Exempt)
          </button>
          <button
            onClick={() => setSelectedCategory('75k')}
            className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
              selectedCategory === '75k'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            75K Ultra (Headlamp Mandatory)
          </button>
          <button
            onClick={() => setSelectedCategory('100k')}
            className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
              selectedCategory === '100k'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-white text-cyan-700 border border-cyan-200 hover:bg-cyan-50'
            }`}
          >
            100K Ultra (Headlamp Mandatory)
          </button>
        </div>
      </div>

      {/* Action Controls & Filter Buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-[#f8fafc] p-1 rounded border border-[#e2e8f0] text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
              activeFilter === 'all' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-slate-600 hover:text-[#0f172a]'
            }`}
          >
            All Items ({GEAR_ITEMS.length})
          </button>
          <button
            onClick={() => setActiveFilter('mandatory')}
            className={`px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
              activeFilter === 'mandatory' ? 'bg-[#ea580c] text-white shadow-sm' : 'text-slate-600 hover:text-[#ea580c]'
            }`}
          >
            Mandatory Only ({mandatoryTotal})
          </button>
          <button
            onClick={() => setActiveFilter('recommended')}
            className={`px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
              activeFilter === 'recommended' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-700'
            }`}
          >
            Recommended ({GEAR_ITEMS.length - mandatoryTotal})
          </button>
          <button
            onClick={() => setActiveFilter('missing')}
            className={`px-3 py-1.5 rounded font-bold transition-all cursor-pointer ${
              activeFilter === 'missing' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-rose-700'
            }`}
          >
            Missing ({GEAR_ITEMS.length - checkedIds.length})
          </button>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={checkAllMandatory}
            className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            Check All {selectedCategory === 'all' ? 'Mandatory' : `${selectedCategory.toUpperCase()} Mandatory`}
          </button>
          <button
            onClick={resetAll}
            className="p-1.5 text-slate-500 hover:text-[#0f172a] hover:bg-slate-100 rounded transition-colors cursor-pointer"
            title="Reset Checklist"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gear Grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map((item) => {
          const isChecked = checkedIds.includes(item.id);
          const isMandatory = isMandatoryForItem(item, selectedCategory);
          const isHeadlamp = item.id === 'gear-6';

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 rounded-lg border flex items-start gap-3 transition-all cursor-pointer group ${
                isChecked
                  ? 'bg-[#f8fafc] border-[#cbd5e1] text-slate-700'
                  : isHeadlamp && (selectedCategory === '75k' || selectedCategory === '100k' || selectedCategory === 'all')
                  ? 'bg-amber-50/40 border-amber-300 hover:border-amber-500 text-[#0f172a]'
                  : isMandatory
                  ? 'bg-white border-orange-200 hover:border-[#ea580c] text-[#0f172a]'
                  : 'bg-white border-[#e2e8f0] hover:border-slate-400 text-slate-700'
              }`}
            >
              {/* Checkbox Icon */}
              <button
                type="button"
                className={`mt-0.5 shrink-0 transition-colors ${
                  isChecked ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 fill-emerald-100" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs sm:text-sm font-bold ${
                    isChecked ? 'line-through text-slate-400' : 'text-[#0f172a]'
                  }`}>
                    {item.name}
                  </span>
                  
                  {isHeadlamp ? (
                    selectedCategory === '50k' ? (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-50 text-blue-800 border border-blue-200">
                        RECOMMENDED (50K EXEMPT)
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1">
                        <Flashlight className="w-3 h-3 text-amber-700" />
                        MANDATORY (75K & 100K ONLY)
                      </span>
                    )
                  ) : isMandatory ? (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-rose-50 text-rose-700 border border-rose-200">
                      MANDATORY
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-blue-50 text-blue-700 border border-blue-200">
                      RECOMMENDED
                    </span>
                  )}
                </div>

                {item.notes && (
                  <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                    {item.notes}
                  </p>
                )}

                {isHeadlamp && selectedCategory === '50k' && (
                  <div className="mt-1.5 text-[10px] font-medium text-blue-700 bg-blue-50/70 px-2 py-1 rounded border border-blue-100">
                    ℹ️ 50K starts at 04:30 AM and finishes in broad daylight (by 12:30 PM). Headlamp is optional/recommended, not strictly inspected for 50K.
                  </div>
                )}
                {isHeadlamp && (selectedCategory === '75k' || selectedCategory === '100k' || selectedCategory === 'all') && (
                  <div className="mt-1.5 text-[10px] font-medium text-amber-800 bg-amber-50/80 px-2 py-1 rounded border border-amber-200">
                    ⚡ Mandatory gear for 75K & 100K due to pre-dawn flag-off (03:30 AM) and evening return running (up to 07:30 PM). Inspected at Bib Expo.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Inspection Warning Box */}
      <div className="mt-5 p-4 rounded-lg bg-[#fff7ed] border border-[#ffedd5] flex items-start gap-3 text-xs text-[#9a3412]">
        <AlertCircle className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#0f172a]">Strict Inspection Protocol:</strong> Gear check is strictly enforced during Bib Distribution on <strong>19 September 2026 (12:00 PM – 4:00 PM)</strong>. 
          <span className="block mt-1">
            <strong>Headlamp Rule:</strong> Mandatory <strong>only for 75km and 100km</strong> runners (03:30 AM pre-dawn start & evening finish). Runners in the <strong>50km category are exempt</strong> from the mandatory headlamp requirement (recommended only). Any participant in the 75K or 100K category found missing a headlamp or other mandatory items will not be issued a timing bib until compliance is verified.
          </span>
        </div>
      </div>

    </div>
  );
};
