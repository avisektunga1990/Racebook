import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Download, Printer, BookOpen, Search, 
  Compass, ShieldCheck, CheckSquare, Clock
} from 'lucide-react';
import { SECTIONS, RACE_INFO } from '../data/handbookData';
import { CategoryType } from '../types';

interface HeaderProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenToc: () => void;
  onExportPdf: () => void;
  onPrint: () => void;
  activeSectionId: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenToc,
  onExportPdf,
  onPrint,
  activeSectionId,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
      setIsScrolled(totalScroll > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSection = SECTIONS.find(s => s.id === activeSectionId) || SECTIONS[0];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 no-print">
      {/* Top Reading Progress Bar */}
      <div className="w-full bg-slate-800 h-1">
        <div 
          className="bg-orange-600 h-1 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className={`px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isScrolled 
          ? 'bg-[#0f172a] border-b border-slate-800 shadow-md' 
          : 'bg-[#0f172a]/95 backdrop-blur-sm border-b border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-3">
          
          {/* Brand & Active Section Indicator */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              id="header-toc-button"
              onClick={onOpenToc}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-white bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 hover:border-orange-500 transition-all cursor-pointer shrink-0"
              title="Open Table of Contents"
            >
              <Menu className="w-4 h-4 text-orange-500" />
              <span className="hidden sm:inline">Contents</span>
            </button>

            <div className="hidden md:flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-extrabold text-white tracking-wider">TAMRALIPTA ULTRA</span>
                <span>•</span>
                <span className="truncate text-slate-300">20 Sept 2026</span>
              </div>
              <div className="text-xs font-semibold text-slate-200 truncate">
                <span className="text-orange-500 font-mono mr-1.5 font-bold">{currentSection.number}</span>
                {currentSection.title}
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center bg-slate-950 p-1 rounded border border-slate-800 text-xs font-semibold">
            <span className="hidden lg:inline px-2 text-slate-400 text-[11px] uppercase tracking-wider">Distance:</span>
            {(['all', '50k', '75k', '100k'] as CategoryType[]).map((cat) => (
              <button
                key={cat}
                id={`filter-cat-${cat}`}
                onClick={() => onSelectCategory(cat)}
                className={`px-2.5 py-1 rounded transition-all uppercase text-xs font-bold tracking-wide cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Action Buttons: PDF Export & Print */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="header-print-button"
              onClick={onPrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
              title="Print Handbook"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              id="header-export-pdf-button"
              onClick={onExportPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 rounded shadow-sm transition-all cursor-pointer"
              title="Download High-Resolution PDF Handbook"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Export PDF</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
