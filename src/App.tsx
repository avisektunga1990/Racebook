import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Compass, ShieldCheck, Download, 
  Printer, ArrowUp, Flag, RefreshCw, AlertTriangle, 
  Droplet, Zap, Utensils, CheckCircle2, ChevronRight, 
  Flame, BookOpen, Clock, Waves, Footprints, HeartHandshake,
  Tag, Smartphone, SunMedium, AlertCircle, Pill, CloudRain,
  ExternalLink, Menu, Phone
} from 'lucide-react';

import { RACE_INFO, SECTIONS, CATEGORIES, AID_STATIONS } from './data/handbookData';
import { CategoryType } from './types';
import { Header } from './components/Header';
import { TableOfContents } from './components/TableOfContents';
import { HeroCover } from './components/HeroCover';
import { RouteMapInfographic } from './components/Infographics/RouteMapInfographic';
import { AidStationGrid } from './components/Infographics/AidStationGrid';
import { WeatherGauge } from './components/Infographics/WeatherGauge';
import { InteractiveGearChecklist } from './components/InteractiveGearChecklist';
import { PaceCalculator } from './components/PaceCalculator';
import { RulesAndConduct } from './components/RulesAndConduct';
import { PdfExportModal } from './components/PdfExportModal';
import { RaceDirectorSection } from './components/RaceDirectorSection';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-01');

  // Track active section on scroll
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollY = window.scrollY + 180;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSectionId(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans">
      
      {/* Sticky Header Navigation */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenToc={() => setIsTocOpen(true)}
        onExportPdf={() => setIsPdfModalOpen(true)}
        onPrint={handlePrint}
        activeSectionId={activeSectionId}
      />

      {/* Interactive Table of Contents Drawer */}
      <TableOfContents
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        activeSectionId={activeSectionId}
        onSelectSection={scrollToSection}
      />

      {/* PDF Export Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        documentRefId="handbook-document-root"
      />

      {/* Main Handbook Content Root (Exportable to PDF & Print) */}
      <main id="handbook-document-root" className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-16">
        
        {/* Cover Section */}
        <HeroCover
          onExportPdf={() => setIsPdfModalOpen(true)}
          onPrint={handlePrint}
          onNavigateToSection={scrollToSection}
        />

        {/* Quick Document Navigation Index (Also visible in PDF print) */}
        <section className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm page-break-inside-avoid">
          <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#ea580c]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0f172a]">
                Handbook Directory & Quick Jump
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 font-semibold">21 Sections</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="text-left p-2.5 rounded-lg bg-[#f8fafc] hover:bg-[#fff7ed] border border-[#e2e8f0] hover:border-[#ea580c]/40 text-xs flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono font-bold text-[#ea580c]">{s.number}</span>
                  <span className="truncate text-slate-700 group-hover:text-[#0f172a] font-medium">{s.shortTitle}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ea580c] shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 01: WELCOME TO TAMRALIPTA */}
        {/* ==================================================================== */}
        <section id="sec-01" className="scroll-mt-24 page-break-inside-avoid">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTION 01</span>
            <span>•</span>
            <span>RACE WELCOME</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Welcome to Tamralipta Ultra
          </h2>

          <div className="mt-4 p-6 sm:p-8 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p className="text-base sm:text-lg font-medium text-[#0f172a]">
              Welcome to <strong>Tamralipta Ultra</strong>—a race where every kilometre carries a story.
            </p>
            <p>
              You are not simply running from Tamluk towards Haldia and back. You are running through a landscape shaped by rivers, trade, faith, resistance and generations of human endeavour.
            </p>
            <p>
              On race day, the Rupnarayan and Hooghly rivers will become your companions, the monsoon sky your backdrop, and the ancient land of Tamralipta your course.
            </p>
            
            <div className="p-4 sm:p-5 rounded-lg bg-[#fff7ed] border-l-4 border-[#ea580c] text-[#9a3412] font-cinzel font-bold text-base sm:text-lg tracking-wider space-y-1">
              <div>Run through history.</div>
              <div>Run beside the rivers.</div>
              <div>Run beyond your limits.</div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 02: TAMRALIPTA: FROM ANCIENT LANDS TO MODERN TAMLUK */}
        {/* ==================================================================== */}
        <section id="sec-02" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTION 02</span>
            <span>•</span>
            <span>HISTORICAL FOUNDATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Tamralipta: From Ancient Lands to Modern Tamluk
          </h2>

          {/* Sub-section: A Story That Begins Before the Port */}
          <div className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-3 text-sm text-slate-600 leading-relaxed">
            <h3 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
              <span>A Story That Begins Before the Port (Prehistoric Bengal)</span>
            </h3>
            <p>
              The history of the Tamluk region extends far beyond the historic port of Tamralipta.
            </p>
            <p>
              Archaeological discoveries from the wider Tamluk–Natsal region reveal a long sequence of human settlement. At <strong>Natshal</strong>, archaeological collections documented by the <em>National Mission on Monuments and Antiquities (NMMA)</em> include Neolithic stone celts and bone implements, while excavations have revealed Chalcolithic, Early Historic and Medieval cultural phases. Excavations at Tamluk itself have established a cultural sequence extending from the Neolithic period into historical and modern times.
            </p>
            <p className="text-slate-500 italic">
              This makes the landscape around today&apos;s race route part of a much larger archaeological story—one that connects prehistoric communities with the rise of one of eastern India&apos;s great ancient ports.
            </p>
          </div>

          {/* Sub-section: Tamralipta - The Great Ancient Port */}
          <div className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-4 text-sm text-slate-600 leading-relaxed">
            <h3 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Tamralipta — The Great Ancient Port</span>
            </h3>
            <p>
              Ancient <strong>Tamralipta</strong>, generally identified with present-day Tamluk, developed beside the waterways of the lower Rupnarayan system and close to the Bay of Bengal.
            </p>
            <p>
              Its rivers created a natural gateway between inland Bengal and the sea. Tamralipta became an important centre of maritime trade, connecting Bengal with regions across the Indian Ocean and Southeast Asia. Historical and archaeological sources describe it as both a commercial centre and an important Buddhist centre (Tamluk Municipality).
            </p>
            <p>
              The name of Tamralipta appears in ancient Indian traditions and in accounts associated with foreign travellers. Greek (Ptolemy) and Roman geographical traditions also contain references associated with the ancient port.
            </p>

            <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-center">
              <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider mb-2">A Port That Connected Worlds</div>
              <p className="text-xs text-slate-500 mb-3">From this region, waterways enabled the movement of:</p>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-[#0f172a]">
                <span className="px-2.5 py-1 rounded bg-white border border-[#cbd5e1]">PEOPLE</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-white border border-[#cbd5e1]">IDEAS</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-white border border-[#cbd5e1]">RELIGION</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-white border border-[#cbd5e1]">CULTURE</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-white border border-[#cbd5e1]">GOODS</span>
                <span>•</span>
                <span className="px-2.5 py-1 rounded bg-white border border-[#cbd5e1]">TECHNOLOGY</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-3">Tamralipta was therefore much more than a port. It was a meeting point between civilizations.</p>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 03 & 04: BUDDHISM & TRANSITION TO TAMLUK */}
        {/* ==================================================================== */}
        <section id="sec-03" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTIONS 03 & 04</span>
            <span>•</span>
            <span>BUDDHIST ENCLAVE & LIVING RIVER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Tamralipta, Buddhism & The Living River
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Section 03 Card */}
            <div className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <h3 className="text-base font-bold text-[#0f172a] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#ea580c]" />
                <span>Tamralipta and Buddhism</span>
              </h3>
              <p>
                Tamralipta became an important centre of Buddhism and Buddhist learning.
              </p>
              <p>
                The Chinese traveller <strong>Faxian (Fa-Hien)</strong> visited Tamralipta in the early fifth century CE and recorded Buddhist monasteries in the region. Centuries later, <strong>Xuanzang (Hiuen Tsang)</strong> also visited Tamralipti and described monasteries and a stupa associated in his account with Emperor Ashoka.
              </p>
              <p>
                From Tamralipta, maritime routes provided a gateway through which Buddhist monks, ideas and cultural influences could travel towards Sri Lanka and Southeast Asia.
              </p>
              <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-center font-bold text-[#ea580c] font-mono text-[11px]">
                TRADE → TRAVEL → KNOWLEDGE → CULTURE → CIVILIZATION
              </div>
            </div>

            {/* Section 04 Card */}
            <div id="sec-04" className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <h3 className="text-base font-bold text-[#0f172a] flex items-center gap-2">
                <Waves className="w-4 h-4 text-blue-600" />
                <span>From Tamralipta to Tamluk</span>
              </h3>
              <p>
                Over centuries, the geography of the region changed. River courses shifted. Sediments accumulated. The coastline moved farther away. The once-maritime city gradually lost its direct access to the sea.
              </p>
              <p>
                The ancient port disappeared beneath layers of changing landscape, while the settlement continued to evolve into the modern town of <strong>Tamluk</strong>. The Tamluk Municipality describes the city as the ancient Tamralipta and notes its long association with waterways, commerce, culture and agriculture.
              </p>
              <p>
                Today, Tamluk stands on the Rupnarayan and remains the headquarters of <strong>Purba Medinipur</strong>.
              </p>
              <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-center font-cinzel font-bold text-[#0f172a] text-xs">
                &ldquo;The ancient port may have disappeared. But the river remains. The journey continues.&rdquo;
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 05: LAND OF RESISTANCE (TAMRALIPTA JATIYA SARKAR) */}
        {/* ==================================================================== */}
        <section id="sec-05" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-2 text-rose-600 text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTION 05</span>
            <span>•</span>
            <span>FREEDOM STRUGGLE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Land of Resistance: Courage to Endure
          </h2>

          <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-4 text-slate-600 text-sm leading-relaxed">
            <p>
              The history of Tamluk is not only about ancient ships and Buddhist monasteries. It is also a history of <strong>resistance</strong>.
            </p>
            <p>
              During India&apos;s freedom struggle, Tamluk and the surrounding region became one of the important centres of the <strong>Quit India Movement</strong>.
            </p>
            <p>
              On <strong>17 December 1942</strong>, the <strong>Tamralipta Jatiya Sarkar (Tamralipta National Government)</strong> was established in the Tamluk–Contai region. It functioned as a parallel administration during the Quit India Movement and continued until 1944. The movement involved leaders including <strong>Satish Chandra Samanta, Sushil Kumar Dhara, Ajoy Mukherjee and Matangini Hazra</strong>. The parallel government undertook activities including relief work, education support and maintaining local administration.
            </p>

            <div className="p-4 sm:p-5 rounded-lg bg-[#fff1f2] border border-[#fecdd3]">
              <h4 className="text-base font-bold text-[#881337] flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-600" />
                <span>Matangini Hazra (1870 – 1942)</span>
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-700">
                Among the most enduring symbols of this struggle is Matangini Hazra. On <strong>29 September 1942</strong>, she led a large procession towards the Tamluk Police Station during the Quit India Movement. She was shot by British police while carrying the national flag and became a powerful symbol of courage and sacrifice.
              </p>
              <div className="mt-3 text-[#ea580c] font-cinzel font-bold text-sm tracking-wide">
                Courage to move forward. Courage to endure. Courage to finish.
              </div>
            </div>

            <p className="font-semibold text-[#0f172a]">
              And that is why Tamralipta is an extraordinary place for an ultra-marathon.
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 06 & 07: HALDIA CONNECTION & DQUESTS ADVENTURE */}
        {/* ==================================================================== */}
        <section id="sec-06" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTIONS 06 & 07</span>
            <span>•</span>
            <span>MODERN CORRIDOR & ORGANIZERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Tamralipta to Haldia & Dquests Adventure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <h3 className="text-base font-bold text-[#0f172a] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#ea580c]" />
                <span>Tamralipta to Modern Haldia</span>
              </h3>
              <p>
                The story that began with ancient maritime Tamralipta has another chapter in modern Bengal. Today, <strong>Haldia</strong> is one of the major industrial and deep-water port hubs of West Bengal, situated at the confluence of the Haldi and Hooghly rivers.
              </p>
              <p>
                For <strong>100 KM ultra runners</strong>, the course transitions from tranquil rural river embankments into this dynamic industrial belt, offering striking sights along the route:
              </p>
              <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                <div>• Haldia Port & Dock Complex — Heavy shipping berths, container yards & ocean-going vessels</div>
                <div>• Petrochemical Corridor — Towering refineries, flare stacks & illuminated processing plants</div>
                <div>• River Estuary Confluence — Vast water panoramas where the Haldi River meets the Hooghly</div>
                <div>• Modern Marine Infrastructure — Cargo jetties, heavy cranes & maritime navigation beacons</div>
                <div>• Haldia Green Belt & Avenues — Wide tree-lined asphalt corridors through the port city</div>
                              </div>
              <p className="text-[#ea580c] font-semibold pt-1">
                Where ancient river heritage meets the energy of modern Bengal.
              </p>
            </div>

            <div id="sec-07" className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <h3 className="text-base font-bold text-[#0f172a] flex items-center gap-2">
                <Footprints className="w-4 h-4 text-emerald-600" />
                <span>About Dquests Adventure</span>
              </h3>
              <p>
                <strong>Dquests Adventure</strong> is committed to building a culture of endurance, adventure and outdoor sport across Eastern India.
              </p>
              <p>
                Activities span: Ultra & Long-Distance Running, Endurance Cycling, Triathlon, Trail Running, Mountaineering, Rock Climbing, Sports Climbing, Open Water Swimming, and Adventure Training.
              </p>
              <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                <div>• Coast-to-Crest (C2C) — RAAM qualifying cycling race from Digha to Darjeeling</div>
                <div>• Royal Bengal Express — Siliguri to Kolkata 550km Cycling within 24 hours</div>
                <div>• Freedom of Ride — 90 km Cycle race around Kolkata</div>
                <div>• Goechala Trail Run — ITRA recognised mountain trail running in Sikkim</div>
                <div>• Kolkata City Triathlon — Only Triathlon event of eastern India</div>
                <div>• Rock Climbing Course — Introduction to the world of adventure in Purulia</div>
                <div>• International Yoga Day — Collective celebration of Yoga</div>
              </div>
              <p className="text-[#ea580c] font-semibold pt-1">
                Tamralipta Ultra is the next chapter in this journey.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 07B: RACE DIRECTOR (AVISEK TUNGA) */}
        {/* ==================================================================== */}
        <RaceDirectorSection />

        {/* ==================================================================== */}
        {/* SECTION 08: RACE CATEGORIES */}
        {/* ==================================================================== */}
        <section id="sec-08" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTION 08</span>
            <span>•</span>
            <span>OFFICIAL CATEGORIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Race Categories, Cut-Offs & Start Times
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.tag}
                className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col justify-between hover:border-[#ea580c]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#ea580c] uppercase">{cat.tag} CATEGORY</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#f1f5f9] text-slate-700">
                      {cat.distanceKm} KM
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-[#0f172a] mt-2">{cat.name}</h3>
                  <div className="mt-1 text-xs text-[#ea580c] font-cinzel italic font-semibold">{cat.motto}</div>

                  <div className="mt-6 space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Total Barrier Cut-Off:</span>
                      <span className="font-bold text-rose-600 font-mono text-sm">{cat.cutoffHours} Hours</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Race Flag-Off (Gun):</span>
                      <span className="font-bold text-[#0f172a] font-mono text-sm">{cat.startTime}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Mandatory Reporting:</span>
                      <span className="font-bold text-[#0f172a] font-mono">{cat.reportingTime}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                      <div className="text-slate-500 text-[11px] font-semibold">Turnaround Point:</div>
                      <div className="font-bold text-[#0f172a] mt-0.5">{cat.turnaroundKm} KM — {cat.turnaroundLocation}</div>
                    </div>

                    {/* Intermediate Cut-Offs Block */}
                    <div className="p-2.5 rounded-lg bg-orange-50/50 border border-orange-200">
                      <div className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wide mb-1.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#ea580c]" />
                        <span>Intermediate Cut-Offs:</span>
                      </div>
                      <div className="space-y-1">
                        {cat.intermediateCutoffs.map((ic, iIdx) => (
                          <div key={iIdx} className="flex items-center justify-between text-[11px] bg-white p-1 rounded border border-orange-100">
                            <span className="font-mono font-bold text-slate-700">{ic.km} KM ({ic.cutoffHours}h)</span>
                            <span className="font-mono text-rose-600 font-semibold">{ic.timeOfDay}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#ea580c] shrink-0" />
                  <span>Flag-off at {cat.startTime} • Report by {cat.reportingTime}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Start Point & Course Rule Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-orange-50 border border-orange-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-[#ea580c] text-white shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold font-mono uppercase text-[#ea580c] bg-white px-2 py-0.5 rounded border border-orange-200">
                    Official Start Point
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    Start — U-Turn — Return to Start Course Format
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#0f172a] mt-1">
                  Tamluk Central Bus Stand
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed">
                  All categories (50K, 75K, 100K) begin and finish at <strong>Tamluk Central Bus Stand</strong>. 
                  75K & 100K flag off at <strong>03:30 AM</strong> (mandatory reporting at <strong>03:00 AM</strong>); 50K flags off at <strong>04:30 AM</strong> (mandatory reporting at <strong>04:00 AM</strong>).
                </p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/rzN37AkfSzdqH3n79"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-3.5 py-2 rounded-lg bg-white border border-orange-300 text-xs font-bold text-[#ea580c] hover:bg-orange-100/50 inline-flex items-center gap-1.5 transition-all shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Start Point GPS Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Master Intermediate Cut-Off Table */}
          <div className="p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#e2e8f0]">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#0f172a] uppercase">
                  Official Intermediate Cut-Off Timings & Clock Barriers
                </h3>
                <p className="text-xs text-slate-600">
                  Start Point: <strong>Tamluk Central Bus Stand</strong> • Gun Times: 03:30 AM (75K & 100K) • 04:30 AM (50K) • Sweeper enforces barriers strictly
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold shrink-0">
                Pace Barrier: 9:36 min/km
              </span>
            </div>

            {/* Category Split Cards */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-lg bg-[#f8fafc] border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-800 text-xs font-mono uppercase">50K Ultra Timeline</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-900">Flag-Off: 04:30 AM</span>
                </div>
                <div className="mt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span>Start: Tamluk Central Bus Stand</span>
                    <span className="font-mono font-bold">04:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span>25K U-Turn: Bhangagara School</span>
                    <span className="font-mono font-bold text-rose-600">08:30 AM (4h)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>50K Finish: Tamluk Central Bus Stand</span>
                    <span className="font-mono font-bold text-blue-700">12:30 PM (8h)</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#f8fafc] border border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-800 text-xs font-mono uppercase">75K Ultra Timeline</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900">Flag-Off: 03:30 AM</span>
                </div>
                <div className="mt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span>Start: Tamluk Central Bus Stand</span>
                    <span className="font-mono font-bold">03:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span>25K Out: Bhangagara School</span>
                    <span className="font-mono font-bold text-rose-600">07:30 AM (4h)</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span>37.5K U-Turn: Parbatipur Hostel</span>
                    <span className="font-mono font-bold text-emerald-700">U-Turn & Meals</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span>50K Ret: Bhangagara School</span>
                    <span className="font-mono font-bold text-rose-600">11:30 AM (8h)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>75K Finish: Tamluk Central Bus Stand</span>
                    <span className="font-mono font-bold text-emerald-700">03:30 PM (12h)</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#f8fafc] border border-cyan-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-800 text-xs font-mono uppercase">100K Ultra Timeline</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-900">Flag-Off: 03:30 AM</span>
                </div>
                <div className="mt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span>Start: Tamluk Central Bus Stand</span>
                    <span className="font-mono font-bold">03:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span>25K Out: Bhangagara School</span>
                    <span className="font-mono font-bold text-rose-600">07:30 AM (4h)</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span>50K U-Turn: Hanuman Mandir</span>
                    <span className="font-mono font-bold text-rose-600">11:30 AM (8h)</span>
                  </div>
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <span>75K Ret: Bhangagara School</span>
                    <span className="font-mono font-bold text-rose-600">03:30 PM (12h)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>100K Finish: Tamluk Central Bus Stand</span>
                    <span className="font-mono font-bold text-cyan-700">07:30 PM (16h)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 09: RACE ROUTE INFOGRAPHIC */}
        {/* ==================================================================== */}
        <section id="sec-09" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTION 09</span>
            <span>•</span>
            <span>COURSE ROUTE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Race Route & Turnaround Sequence
          </h2>

          <div className="text-sm text-slate-600 leading-relaxed">
            The race follows an <strong>out-and-back riverside course</strong> beginning at Tamluk and progressing along the Rupnarayan river corridor towards Haldia. Review the official course route photos below for each category (50K, 75K, 100K).
            <div className="mt-2 text-xs font-mono font-bold text-[#ea580c]">
              
            </div>
          </div>

          <RouteMapInfographic
            selectedCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </section>

        {/* ==================================================================== */}
        {/* SECTION 10 & 11: AID STATIONS & NUTRITION STRATEGY */}
        {/* ==================================================================== */}
        <section id="sec-10" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTIONS 10 & 11</span>
            <span>•</span>
            <span>AID & HYDRATION STATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Aid & Hydration Stations & Menus
          </h2>

          <AidStationGrid />
        </section>

        {/* ==================================================================== */}
        {/* SECTION 12: RACE-DAY WEATHER INFOGRAPHIC */}
        {/* ==================================================================== */}
        <section id="sec-12" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTION 12</span>
            <span>•</span>
            <span>CLIMATE & MONSOON FORECAST</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Race-Day Weather: Expect Monsoon Conditions
          </h2>

          <WeatherGauge />
        </section>

        {/* ==================================================================== */}
        {/* SECTION 13: MANDATORY GEAR CHECKLIST */}
        {/* ==================================================================== */}
        <section id="sec-13" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTION 13</span>
            <span>•</span>
            <span>EQUIPMENT AUDIT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Mandatory & Recommended Gear
          </h2>

          <InteractiveGearChecklist />
        </section>

        {/* ==================================================================== */}
        {/* SECTION 14 & 15: BIB DISTRIBUTION & RACE BRIEFING */}
        {/* ==================================================================== */}
        <section id="sec-14" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTIONS 14 & 15</span>
            <span>•</span>
            <span>EXPO & BRIEFING (19 SEPTEMBER)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Eve of Race: Bib Expo & Mandatory Race Briefing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 14: Bib Distribution */}
            <div className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-[#ea580c] uppercase">19 SEPTEMBER 2026</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5]">12:00 PM – 4:00 PM</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a]">14 — Bib Distribution & Gear Check</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Venue: Tamluk Central Bus Stand</span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Bib Distribution & Timing Chip collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Official Race Kit Collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Physical Mandatory Gear Check (Headlamp mandatory for 75K & 100K; optional/recommended for 50K)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Participant ID Verification</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#fff7ed] border border-[#ffedd5] text-[11px] text-[#9a3412] font-bold">
                DO NOT WAIT UNTIL RACE MORNING. Complete your registration formalities and gear verification on 19 September.
              </div>
            </div>

            {/* 15: Mandatory Briefing */}
            <div id="sec-15" className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-rose-600 uppercase">19 SEPTEMBER 2026</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fff1f2] text-rose-700 border border-[#fecdd3]">4:00 PM – 5:00 PM</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a]">15 — Mandatory Race Briefing</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Venue: Tamluk Central Bus Stand</span>
              </div>

              <p className="text-xs text-slate-600">
                The race briefing is <strong>mandatory for all runners</strong>. Race Director <strong>Avisek Tunga</strong> (8013093371) and technical officials will cover:
              </p>

              <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
                <div>• Course direction & markings</div>
                <div>• Turnaround protocols</div>
                <div>• Barrier cut-off times</div>
                <div>• Aid stations & hydration</div>
                <div>• Medical support posts</div>
                <div>• Road & traffic precautions</div>
                <div>• Monsoon safety guidelines</div>
                <div>• Emergency procedures</div>
              </div>

              <div className="p-3 rounded-lg bg-[#fff1f2] border border-[#fecdd3] text-[11px] text-[#881337] font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Attendance is strictly mandatory. If you are unable to attend due to exceptional circumstances, contact Race Director in advance.</span>
                <a 
                  id="btn-briefing-call-rd"
                  href={`tel:${RACE_INFO.directorPhone}`}
                  className="px-2.5 py-1 rounded bg-[#ea580c] hover:bg-[#c2410c] text-white text-[10px] font-bold shrink-0 self-start sm:self-auto inline-flex items-center gap-1 transition-colors shadow-xs"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call RD: {RACE_INFO.directorPhone}</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 16 & 17: RACE MORNING & START-LINE NUTRITION */}
        {/* ==================================================================== */}
        <section id="sec-16" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTIONS 16 & 17</span>
            <span>•</span>
            <span>RACE DAY PROTOCOLS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Race Morning Timeline & Start-Line Fueling
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 16: Race Morning */}
            <div className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-[#0f172a] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ea580c]" />
                <span>16 — Race Morning Timeline</span>
              </h3>

              <div className="space-y-3">
                {/* Wave 1: 75K & 100K */}
                <div className="p-3.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-xs font-bold text-emerald-700 uppercase flex items-center justify-between">
                    <span>Wave 1: 75K & 100K Ultra</span>
                    <span className="font-mono text-slate-500">Gun: 03:30 AM</span>
                  </div>
                  <div className="mt-2 space-y-1.5 font-mono text-xs text-slate-600">
                    <div className="flex justify-between"><span>02:45 AM</span><span className="text-slate-500">Venue Gates Open (Tamluk Central Bus Stand)</span></div>
                    <div className="flex justify-between"><span>03:00 AM</span><span className="text-[#0f172a] font-bold">Mandatory Reporting & Drop Bag Deposit</span></div>
                    <div className="flex justify-between"><span>03:15 AM</span><span>Corral Lineup & Final Technical Briefing</span></div>
                    <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-1 rounded"><span>03:30 AM</span><span>OFFICIAL RACE START (75K & 100K GUN)</span></div>
                  </div>
                </div>

                {/* Wave 2: 50K */}
                <div className="p-3.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0]">
                  <div className="text-xs font-bold text-blue-700 uppercase flex items-center justify-between">
                    <span>Wave 2: 50K Ultra</span>
                    <span className="font-mono text-slate-500">Gun: 04:30 AM</span>
                  </div>
                  <div className="mt-2 space-y-1.5 font-mono text-xs text-slate-600">
                    <div className="flex justify-between"><span>03:30 AM</span><span className="text-slate-500">50K Runner Arrival Window</span></div>
                    <div className="flex justify-between"><span>04:00 AM</span><span className="text-[#0f172a] font-bold">Mandatory Reporting & Drop Bag Deposit</span></div>
                    <div className="flex justify-between"><span>04:15 AM</span><span>50K Corral Lineup & Technical Briefing</span></div>
                    <div className="flex justify-between text-blue-700 font-bold bg-blue-50 p-1 rounded"><span>04:30 AM</span><span>OFFICIAL RACE START (50K GUN)</span></div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-orange-50 border border-orange-200 text-xs text-orange-900">
                  <div className="font-bold text-orange-950 mb-0.5">Staggered Pre-Dawn Wave Flag-Offs:</div>
                  75K and 100K runners flag off at 03:30 AM sharp to maximize dark riverfront miles. 50K runners flag off at 04:30 AM sharp. Sweeper vehicles follow each wave strictly based on gun times.
                </div>
              </div>

              <p className="text-xs text-slate-500 italic">
                Runners should arrive ready to run. Do not depend on last-minute preparation.
              </p>
            </div>

            {/* 17: Start-Line Nutrition */}
            <div id="sec-17" className="p-6 rounded-xl bg-white border border-[#e2e8f0] shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-[#0f172a] flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#ea580c]" />
                <span>17 — Start-Line Nutrition</span>
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Basic pre-race food will be available at the Tamluk Central Bus Stand start venue (<a href="https://maps.app.goo.gl/rzN37AkfSzdqH3n79" target="_blank" rel="noopener noreferrer" className="text-[#ea580c] hover:underline font-semibold inline-flex items-center gap-0.5">Google Maps <ExternalLink className="w-3 h-3 inline" /></a>) during the 30-minute mandatory reporting window:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {['White Bread', 'Banana', 'Jaggery Gur', 'Boiled Potato', 'Salt', 'Soaked Chana', 'Normal Water'].map((food, fIdx) => (
                  <div key={fIdx} className="p-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center gap-2 text-[#0f172a] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
                    <span>{food}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-lg bg-[#fff7ed] border border-[#ffedd5] text-xs text-[#9a3412] leading-relaxed">
                <strong className="block text-[#c2410c] font-bold mb-1">Golden Rule of Race Day:</strong>
                Eat only what you have previously tested during training. Race day is <strong>not the day to experiment with new food</strong>.
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 18: CUT-OFF DISCIPLINE & PACING CALCULATOR */}
        {/* ==================================================================== */}
        <section id="sec-18" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTION 18</span>
            <span>•</span>
            <span>CUT-OFF BARRIERS & PACING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Cut-Off Discipline & Split Calculator
          </h2>

          <PaceCalculator />
        </section>

        {/* ==================================================================== */}
        {/* SECTION 19: RUNNER RESPONSIBILITY & CODE OF CONDUCT */}
        {/* ==================================================================== */}
        <section id="sec-19" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <span>SECTION 19</span>
            <span>•</span>
            <span>RUNNER CODE OF ETHICS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Runner Responsibility: Leave No Trace
          </h2>

          <RulesAndConduct />
        </section>

        {/* ==================================================================== */}
        {/* SECTION 20: THE SPIRIT OF TAMRALIPTA ULTRA */}
        {/* ==================================================================== */}
        <section id="sec-20" className="scroll-mt-24 page-break-inside-avoid">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-white to-[#fff7ed] border border-[#fed7aa] text-center relative overflow-hidden shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff7ed] border border-[#ffedd5] text-[#ea580c] text-xs font-bold uppercase tracking-widest mb-4">
              <span>SECTION 20</span>
              <span>•</span>
              <span>INSPIRATIONAL CREED</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase">
              The Spirit of Tamralipta Ultra
            </h2>

            <div className="mt-6 max-w-2xl mx-auto space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-serif">
              <p>You will run through a landscape where:</p>
              <div className="space-y-2 text-[#7c2d12] font-sans text-sm sm:text-base font-semibold">
                <div>Stone tools tell stories of prehistoric communities.</div>
                <div>Ancient ships connected Bengal to distant civilizations.</div>
                <div>Buddhist monks carried knowledge across the seas.</div>
                <div>Rivers shaped trade, agriculture and society.</div>
                <div>Freedom fighters challenged colonial rule.</div>
              </div>
              <p className="pt-4 text-[#0f172a] font-cinzel font-black text-xl sm:text-2xl tracking-wide uppercase">
                And today—Runners will carry that legacy forward.
              </p>
              <p className="text-slate-500 text-sm italic font-sans">
                The distance may be 50K, 75K or 100K. But the real journey is much longer.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SECTION 21: YOUR RACE & CLOSING CALL */}
        {/* ==================================================================== */}
        <section id="sec-21" className="scroll-mt-24 page-break-inside-avoid">
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1f5f9] text-slate-700 text-xs font-bold uppercase tracking-widest">
              <span>SECTION 21</span>
              <span>•</span>
              <span>YOUR CALL TO ENDURANCE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-wider">
              Your Race
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="p-5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#ea580c] transition-colors">
                <div className="text-xs font-mono font-bold text-[#ea580c]">50K ULTRA</div>
                <div className="text-base font-black text-[#0f172a] mt-1">EMBRACE THE CHALLENGE</div>
              </div>
              <div className="p-5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#ea580c] transition-colors">
                <div className="text-xs font-mono font-bold text-[#ea580c]">75K ULTRA</div>
                <div className="text-base font-black text-[#0f172a] mt-1">PUSH YOUR LIMITS</div>
              </div>
              <div className="p-5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#ea580c] transition-colors">
                <div className="text-xs font-mono font-bold text-[#ea580c]">100K ULTRA</div>
                <div className="text-base font-black text-[#0f172a] mt-1">GO BEYOND THE BOUNDARIES</div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto p-5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-slate-600 text-sm sm:text-base leading-relaxed italic">
              &ldquo;Whatever distance you choose, remember: The finish line is not merely where the race ends. It is where you discover what you are capable of.&rdquo;
            </div>

            <div className="pt-6 border-t border-[#e2e8f0] max-w-md mx-auto space-y-2">
              <div className="font-cinzel text-xl font-bold text-[#0f172a] tracking-widest uppercase">
                TAMRALIPTA ULTRA
              </div>
              <div className="text-xs font-bold text-[#ea580c] font-mono tracking-wider">
                20 SEPTEMBER 2026 • TAMLUK, WEST BENGAL
              </div>
              <div className="text-xs text-slate-500 font-semibold tracking-wider uppercase">
                50K | 75K | 100K • DQUESTS ADVENTURE
              </div>
              <div className="pt-4 text-xs font-black tracking-widest text-slate-700 uppercase space-y-1">
                <div>One Journey.</div>
                <div>Endless Lessons.</div>
                <div>Limitless Possibilities.</div>
              </div>
              <div className="text-sm font-bold text-[#ea580c] pt-3">
                See you at the start line. 🏃‍♂️🌧️🌊
              </div>
            </div>

            {/* Print & Download Action in Document Footer */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3 no-print">
              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="px-6 py-3 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Export High-Resolution PDF Handbook</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-5 py-3 rounded-lg bg-[#f8fafc] hover:bg-slate-100 border border-[#e2e8f0] text-[#0f172a] font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-[#e2e8f0] py-8 px-4 text-center text-xs text-slate-500 no-print">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="font-cinzel text-[#0f172a] font-bold tracking-wider">TAMRALIPTA ULTRA 2026</div>
            <div className="text-[11px] text-slate-500">
              Official Participant Manual • Organized by Dquests Adventure • Race Director: <a href={`tel:${RACE_INFO.directorPhone}`} className="font-semibold text-slate-700 hover:text-[#ea580c] transition-colors">Avisek Tunga (+91 {RACE_INFO.directorPhone})</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded-lg bg-[#f8fafc] hover:bg-slate-100 text-slate-600 hover:text-[#0f172a] border border-[#e2e8f0] transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
