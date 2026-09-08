import React, { useState, useMemo } from 'react';
import { X, Search, Bookmark, ChevronRight, Compass, ShieldAlert, Sparkles, Navigation } from 'lucide-react';
import { SECTIONS } from '../data/handbookData';

interface TableOfContentsProps {
  isOpen: boolean;
  onClose: () => void;
  activeSectionId: string;
  onSelectSection: (id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  isOpen,
  onClose,
  activeSectionId,
  onSelectSection,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredSections = useMemo(() => {
    return SECTIONS.filter(section => {
      const matchesSearch = 
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.number.includes(searchQuery) ||
        section.shortTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === 'all' || section.categoryTag === selectedTag;

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  if (!isOpen) return null;

  const tagColors: Record<string, { bg: string; text: string; label: string }> = {
    all: { bg: 'bg-slate-800', text: 'text-slate-300', label: `All (${SECTIONS.length})` },
    heritage: { bg: 'bg-amber-950/60 border-amber-800/60', text: 'text-amber-400', label: 'Heritage & History' },
    operational: { bg: 'bg-blue-950/60 border-blue-800/60', text: 'text-blue-400', label: 'Course & Stations' },
    safety: { bg: 'bg-emerald-950/60 border-emerald-800/60', text: 'text-emerald-400', label: 'Safety & Gear' },
    logistics: { bg: 'bg-purple-950/60 border-purple-800/60', text: 'text-purple-400', label: 'Schedule & Expo' },
    inspiration: { bg: 'bg-rose-950/60 border-rose-800/60', text: 'text-rose-400', label: 'Spirit & Closing' },
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print">
      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 bg-[#0b1120] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded bg-orange-600/10 border border-orange-600/30 text-orange-500">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-wide uppercase">Table of Contents</h2>
                <p className="text-xs text-slate-400">{SECTIONS.length} Sections • Tamralipta Ultra Handbook</p>
              </div>
            </div>
            <button
              id="toc-close-button"
              onClick={onClose}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b border-slate-800 bg-[#0f172a]">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                id="toc-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sections (e.g., aid station, gear, cut-off)..."
                className="w-full bg-slate-900 border border-slate-700 rounded pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Tag Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(['all', 'heritage', 'operational', 'safety', 'logistics', 'inspiration'] as const).map(tag => (
                <button
                  key={tag}
                  id={`toc-filter-${tag}`}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-[11px] px-2.5 py-1 rounded border font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-orange-600 text-white border-orange-600 font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tagColors[tag]?.label || tag}
                </button>
              ))}
            </div>
          </div>

          {/* Section List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-slate-800/60 bg-[#0f172a]">
            {filteredSections.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No sections match &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredSections.map((sec) => {
                const isActive = sec.id === activeSectionId;
                return (
                  <button
                    key={sec.id}
                    id={`toc-link-${sec.id}`}
                    onClick={() => {
                      onSelectSection(sec.id);
                      onClose();
                    }}
                    className={`w-full text-left p-2.5 rounded flex items-start justify-between gap-3 transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-slate-800/90 border-l-3 border-orange-600 text-orange-400'
                        : 'hover:bg-slate-800/50 text-slate-300 border-l-3 border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                        isActive 
                          ? 'bg-orange-600 text-white' 
                          : 'bg-slate-800 text-slate-400 group-hover:text-white'
                      }`}>
                        {sec.number}
                      </span>
                      <div className="min-w-0">
                        <div className={`text-xs sm:text-sm font-semibold tracking-tight transition-colors ${
                          isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {sec.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 capitalize flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          {sec.categoryTag}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-orange-500 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                    }`} />
                  </button>
                );
              })
            )}
          </div>

          {/* Drawer Footer info */}
          <div className="p-4 border-t border-slate-800 bg-[#0b1120] text-xs text-slate-400 flex items-center justify-between">
            <span className="font-mono text-[11px]">20 Sept 2026 • Tamluk</span>
            <span className="text-[11px] font-semibold text-orange-400">Dquests Adventure</span>
          </div>

        </div>
      </div>
    </div>
  );
};
