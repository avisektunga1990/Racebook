import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, Maximize2, Download, ExternalLink, 
  ZoomIn, ZoomOut, RotateCcw, Upload, Image as ImageIcon,
  Info, CheckCircle2, ChevronRight, X
} from 'lucide-react';
import { CategoryType } from '../../types';
import fiftyKmRouteMap from '../../assets/50km_route.png';

interface RouteMapsGalleryProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
}

type DistanceCategory = '50k' | '75k' | '100k';

interface IntermediateCutoffPoint {
  checkpoint: string;
  distance: string;
  limit: string;
  clockTime: string;
  type: string;
}

interface RoutePhotoConfig {
  id: DistanceCategory;
  name: string;
  distance: string;
  outbound: string;
  turnaroundLocation: string;
  turnaroundKm: string;
  cutoff: string;
  pace: string;
  elevation: string;
  surface: string;
  defaultPath: string;
  alternativePaths: string[];
  themeColor: string;
  accentBg: string;
  advice: string;
  intermediateCutoffs: IntermediateCutoffPoint[];
}

const ROUTE_CONFIGS: Record<DistanceCategory, RoutePhotoConfig> = {
  '50k': {
    id: '50k',
    name: '50 Km Route Photo',
    distance: '50.0 KM',
    outbound: '25 km Out + 25 km Back (Start — U-Turn — Return to Start)',
    turnaroundLocation: 'Bhangagara Borad Primary School',
    turnaroundKm: '25 KM Outbound',
    cutoff: '08h 00m',
    pace: '09:36 min/km',
    elevation: '+48m / -48m',
    surface: 'Flat Rupnarayan river embankment & tarmac trail',
    defaultPath: fiftyKmRouteMap,
    alternativePaths: ['/routes/50km.png', '/routes/50 Km.png', '/50km.png', '/50 Km.png'],
    themeColor: 'bg-blue-600 text-white',
    accentBg: 'border-blue-500 text-blue-700',
    advice: 'Flag off is at 04:30 AM sharp (reporting at 04:00 AM). The course is Start — U-Turn — Return to Start point. 50K runners must reach the 25 KM U-Turn at Bhangagara Borad Primary School within 4 hours (by 08:30 AM). The official finish barrier at Tamluk Central Bus Stand closes at 12:30 PM (8 hours total limit, required pace: 9:36 min/km). Watch for humidity rises along the Rupnarayan embankment after 08:30 AM.',
    intermediateCutoffs: [
      { checkpoint: 'Bhangagara Borad Primary School (50K U-Turn)', distance: '25 KM', limit: '04 Hours', clockTime: '08:30 AM', type: 'Turnaround Checkpoint' },
      { checkpoint: 'Tamluk Central Bus Stand (Return to Start Finish)', distance: '50 KM', limit: '08 Hours', clockTime: '12:30 PM', type: 'Final Finish Barrier' },
    ],
  },
  '75k': {
    id: '75k',
    name: '75 Km Route Photo',
    distance: '75.0 KM',
    outbound: '37.5 km Out + 37.5 km Back (Start — U-Turn — Return to Start)',
    turnaroundLocation: 'Hostel of Parbatipur Patit Paboni High School',
    turnaroundKm: '37.5 KM Outbound',
    cutoff: '12h 00m',
    pace: '09:36 min/km',
    elevation: '+65m / -65m',
    surface: 'Riverbank dikes & rural connecting roads past Kukrahati',
    defaultPath: '/routes/75km.png',
    alternativePaths: ['/75km.png', '/routes/75 km.png'],
    themeColor: 'bg-emerald-600 text-white',
    accentBg: 'border-emerald-500 text-emerald-700',
    advice: 'Flag off is at 03:30 AM sharp (reporting at 03:00 AM). Mandatory headlamp is required for the pre-dawn start. The course is Start — U-Turn — Return to Start point. Runners must cross the 25 KM outbound checkpoint at Bhangagara Borad Primary School within 4 hours (by 07:30 AM), make the U-Turn at Hostel of Parbatipur Patit Paboni High School at 37.5 km, and clear the 50 KM return checkpoint at Bhangagara Borad Primary School within 8 hours (by 11:30 AM). Final cut-off is 12 hours at 03:30 PM at Tamluk Central Bus Stand.',
    intermediateCutoffs: [
      { checkpoint: 'Bhangagara Borad Primary School (Outbound Checkpoint)', distance: '25 KM', limit: '04 Hours', clockTime: '07:30 AM', type: 'Intermediate Barrier' },
      { checkpoint: 'Hostel of Parbatipur Patit Paboni High School (75K U-Turn)', distance: '37.5 KM', limit: 'U-Turn Check', clockTime: 'Turnaround Point', type: '75K Turnaround Point' },
      { checkpoint: 'Bhangagara Borad Primary School (Return Checkpoint)', distance: '50 KM', limit: '08 Hours', clockTime: '11:30 AM', type: 'Intermediate Barrier' },
      { checkpoint: 'Tamluk Central Bus Stand (Return to Start Finish)', distance: '75 KM', limit: '12 Hours', clockTime: '03:30 PM', type: 'Final Finish Barrier' },
    ],
  },
  '100k': {
    id: '100k',
    name: '100 Km Route Photo',
    distance: '100.0 KM',
    outbound: '50 km Out + 50 km Back (Start — U-Turn — Return to Start)',
    turnaroundLocation: 'Hanuman Mandir',
    turnaroundKm: '50 KM Outbound',
    cutoff: '16h 00m',
    pace: '09:36 min/km',
    elevation: '+92m / -92m',
    surface: 'Deltaic riverbank, rural bypasses & Haldia industrial port road',
    defaultPath: '/routes/100km.png',
    alternativePaths: ['/100km.png', '/routes/100 km.png'],
    themeColor: 'bg-cyan-600 text-white',
    accentBg: 'border-cyan-500 text-cyan-700',
    advice: 'Flag off is at 03:30 AM sharp (reporting at 03:00 AM). The course is Start — U-Turn — Return to Start point. Mandatory cut-offs occur at each 25 KM milestone: 25 KM outbound at Bhangagara Borad Primary School within 4 hours (07:30 AM), 50 KM U-Turn at Hanuman Mandir within 8 hours (11:30 AM), and 75 KM return at Bhangagara Borad Primary School within 12 hours (03:30 PM). Final finish barrier closes at 07:30 PM (16 hours). Mandatory headlamp check begins on the return leg from 05:30 PM.',
    intermediateCutoffs: [
      { checkpoint: 'Bhangagara Borad Primary School (Outbound Checkpoint)', distance: '25 KM', limit: '04 Hours', clockTime: '07:30 AM', type: 'Intermediate Barrier' },
      { checkpoint: 'Hanuman Mandir (100K U-Turn Point)', distance: '50 KM', limit: '08 Hours', clockTime: '11:30 AM', type: '100K Turnaround Point' },
      { checkpoint: 'Bhangagara Borad Primary School (Return Checkpoint)', distance: '75 KM', limit: '12 Hours', clockTime: '03:30 PM', type: 'Intermediate Barrier' },
      { checkpoint: 'Tamluk Central Bus Stand (Return to Start Finish)', distance: '100 KM', limit: '16 Hours', clockTime: '07:30 PM', type: 'Final Finish Barrier' },
    ],
  },
};

export const RouteMapsGallery: React.FC<RouteMapsGalleryProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const [activeTab, setActiveTab] = useState<DistanceCategory>(
    activeCategory === '75k' ? '75k' : activeCategory === '100k' ? '100k' : '50k'
  );
  
  // Custom user-provided photos stored in browser (base64 data URLs)
  const [customPhotos, setCustomPhotos] = useState<Record<DistanceCategory, string | null>>({
    '50k': null,
    '75k': null,
    '100k': null,
  });

  // Track if default image failed to load
  const [imgLoadError, setImgLoadError] = useState<Record<DistanceCategory, boolean>>({
    '50k': false,
    '75k': false,
    '100k': false,
  });

  // Zoom and pan state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load any saved custom photos from localStorage on mount
  useEffect(() => {
    try {
      const saved50k = localStorage.getItem('tamralipta_route_photo_50k');
      const saved75k = localStorage.getItem('tamralipta_route_photo_75k');
      const saved100k = localStorage.getItem('tamralipta_route_photo_100k');
      setCustomPhotos({
        '50k': saved50k,
        '75k': saved75k,
        '100k': saved100k,
      });
    } catch {
      // localStorage may fail in restricted sandboxes
    }
  }, []);

  // Sync tab with external activeCategory prop
  useEffect(() => {
    if (activeCategory === '50k') setActiveTab('50k');
    else if (activeCategory === '75k') setActiveTab('75k');
    else if (activeCategory === '100k') setActiveTab('100k');
  }, [activeCategory]);

  // Reset zoom level when switching tabs
  useEffect(() => {
    setZoomLevel(1);
  }, [activeTab]);

  const currentConfig = ROUTE_CONFIGS[activeTab];
  const currentPhotoSrc = customPhotos[activeTab] || currentConfig.defaultPath;
  const isUsingCustom = Boolean(customPhotos[activeTab]);

  // Handle local image file upload / drop
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomPhotos((prev) => ({ ...prev, [activeTab]: dataUrl }));
        setImgLoadError((prev) => ({ ...prev, [activeTab]: false }));
        try {
          localStorage.setItem(`tamralipta_route_photo_${activeTab}`, dataUrl);
        } catch {
          // ignore storage limit error
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveCustomPhoto = () => {
    setCustomPhotos((prev) => ({ ...prev, [activeTab]: null }));
    try {
      localStorage.removeItem(`tamralipta_route_photo_${activeTab}`);
    } catch {}
  };

  return (
    <div className="space-y-6">
      
      {/* Route Photos Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-xl bg-white border border-[#e2e8f0] shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            id="tab-btn-50k"
            onClick={() => { setActiveTab('50k'); onSelectCategory('50k'); }}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === '50k'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-300 inline-block" />
            <span>50 Km Route Photo</span>
          </button>

          <button
            id="tab-btn-75k"
            onClick={() => { setActiveTab('75k'); onSelectCategory('75k'); }}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === '75k'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 inline-block" />
            <span>75 Km Route Photo</span>
          </button>

          <button
            id="tab-btn-100k"
            onClick={() => { setActiveTab('100k'); onSelectCategory('100k'); }}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === '100k'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 inline-block" />
            <span>100 Km Route Photo</span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-2">
          {/* Hidden File Input for uploading screenshot directly */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
          <button
            id="btn-upload-route-photo"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-[#e2e8f0] text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
            title="Upload or update this category route photo"
          >
            <Upload className="w-3.5 h-3.5 text-[#ea580c]" />
            <span className="hidden sm:inline">Upload/Change Photo</span>
          </button>
        </div>
      </div>

      {/* Main Route Photo Card */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
        
        {/* Card Header */}
        <div className="p-5 sm:p-6 border-b border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f8fafc]">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase ${currentConfig.themeColor}`}>
                {activeTab.toUpperCase()} ULTRA COURSE
              </span>
              <span className="text-xs text-slate-500 font-semibold">•</span>
              <span className="text-xs font-bold text-slate-700">
                Tamluk ⇋ {currentConfig.turnaroundLocation} ({currentConfig.turnaroundKm})
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] mt-1.5 uppercase">
              {currentConfig.name}: Official Satellite Overview
            </h3>
          </div>

          {/* Photo Navigation / Zoom Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center bg-white rounded-lg border border-[#e2e8f0] p-0.5 shadow-xs">
              <button
                id="btn-zoom-in"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                className="p-1.5 hover:bg-slate-100 text-slate-700 rounded transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                id="btn-zoom-out"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 1))}
                className="p-1.5 hover:bg-slate-100 text-slate-700 rounded transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {zoomLevel > 1 && (
                <button
                  id="btn-zoom-reset"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 hover:bg-slate-100 text-slate-700 rounded transition-all cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              id="btn-fullscreen-photo"
              onClick={() => setIsFullscreenModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-[#e2e8f0] text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>Full Screen</span>
            </button>

            {isUsingCustom && (
              <button
                id="btn-revert-photo"
                onClick={handleRemoveCustomPhoto}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium cursor-pointer"
                title="Revert to default photo"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Photo Display Viewport */}
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="relative bg-[#0b131f] overflow-hidden flex items-center justify-center min-h-[380px] max-h-[640px]"
        >
          {imgLoadError[activeTab] && !customPhotos[activeTab] ? (
            /* Upload Callout when photo not found on disk */
            <div className="p-8 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-[#ea580c]">
                <ImageIcon className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white uppercase">
                  {currentConfig.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Drag and drop the official <strong>{activeTab.toUpperCase()} satellite route screenshot</strong> here, or click the upload button to view the photo.
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-[#ea580c] hover:bg-orange-600 text-white text-xs font-bold transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Select {activeTab.toUpperCase()} Photo</span>
              </button>
            </div>
          ) : (
            /* Render Route Photo with interactive zoom and pan */
            <div className="w-full h-full overflow-auto flex items-center justify-center p-2 sm:p-4">
              <img
                src={currentPhotoSrc}
                alt={`${currentConfig.name} - Tamralipta Ultra`}
                referrerPolicy="no-referrer"
                onError={() => {
                  setImgLoadError((prev) => ({ ...prev, [activeTab]: true }));
                }}
                className="max-w-full max-h-[600px] object-contain rounded-lg shadow-2xl transition-transform duration-200 select-none"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  cursor: zoomLevel > 1 ? 'grab' : 'zoom-in',
                }}
                onClick={() => {
                  if (zoomLevel === 1) setZoomLevel(1.5);
                  else if (zoomLevel === 1.5) setZoomLevel(2);
                  else setZoomLevel(1);
                }}
              />
            </div>
          )}

          {/* Quick Watermark / Attribution pill */}
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-mono text-slate-300 border border-white/10 pointer-events-none">
            {activeTab.toUpperCase()} ROUTE PHOTO • {currentConfig.turnaroundKm}
          </div>
        </div>

        {/* Course Metrics & Turnaround Breakdown */}
        <div className="p-5 sm:p-6 bg-white border-t border-[#e2e8f0]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Distance</div>
              <div className="text-xl sm:text-2xl font-black text-[#0f172a] mt-0.5">
                {currentConfig.distance}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {currentConfig.outbound}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Official Cut-Off</div>
              <div className="text-xl sm:text-2xl font-black text-[#ea580c] mt-0.5">
                {currentConfig.cutoff}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Target Pace: {currentConfig.pace}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Turnaround Location</div>
              <div className="text-sm font-black text-[#0f172a] mt-1 line-clamp-1">
                {currentConfig.turnaroundLocation}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                At {currentConfig.turnaroundKm}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Surface & Elevation</div>
              <div className="text-xl sm:text-2xl font-black text-[#0f172a] mt-0.5">
                {currentConfig.elevation}
              </div>
              <div className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                {currentConfig.surface}
              </div>
            </div>

          </div>

          {/* Official Intermediate Cut-Off Schedule */}
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-[#e2e8f0]">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0f172a] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>Official Intermediate Cut-Offs (Gun Start: {currentConfig.id === '50k' ? '04:30 AM' : '03:30 AM'})</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">Pace Barrier: 9:36 min/km</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {currentConfig.intermediateCutoffs.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-[#e2e8f0] shadow-2xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-[#ea580c]">{item.distance}</span>
                    <span className="font-mono font-bold text-rose-600">{item.limit}</span>
                  </div>
                  <div className="text-xs font-bold text-[#0f172a] mt-1 line-clamp-1" title={item.checkpoint}>
                    {item.checkpoint}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <span>{item.type}</span>
                    <span className="font-mono font-semibold text-slate-700">By {item.clockTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Course Advice */}
          <div className="mt-4 p-4 rounded-xl bg-[#fff7ed] border border-[#fed7aa] flex items-start gap-3 text-xs text-[#9a3412]">
            <Info className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0f172a] font-bold">Course Navigation Advice: </strong>
              <span>{currentConfig.advice}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal for detailed inspection of route photo */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6">
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
            <div>
              <h4 className="font-bold text-base sm:text-lg">
                {currentConfig.name} — Full High-Resolution Photo View
              </h4>
              <p className="text-xs text-slate-400">
                Rupnarayan River Trail Corridor • Tamluk ⇋ {currentConfig.turnaroundLocation}
              </p>
            </div>
            <button
              id="btn-close-lightbox"
              onClick={() => setIsFullscreenModalOpen(false)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-4">
            <img
              src={currentPhotoSrc}
              alt={`${currentConfig.name} Fullscreen`}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          <div className="text-center text-xs text-slate-400 pt-3 border-t border-white/10 flex items-center justify-between">
            <span>Cut-Off: {currentConfig.cutoff} • Turnaround: {currentConfig.turnaroundLocation}</span>
            <button
              onClick={() => setIsFullscreenModalOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Close Viewer
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
