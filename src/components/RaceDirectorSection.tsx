import React, { useState } from 'react';
import { 
  Trophy, Mountain, Bike, Footprints, 
  MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck, 
  Activity, Compass, UserCheck, Flame
} from 'lucide-react';
import { RACE_INFO } from '../data/handbookData';

export const RaceDirectorSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'director' | 'running' | 'skyrunning' | 'cycling' | 'climbing'>('all');

  return (
    <section id="sec-race-director" className="scroll-mt-24 space-y-6">
      <div className="flex items-center gap-2 text-[#ea580c] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
        <span>SECTION 07B</span>
        <span>•</span>
        <span>RACE LEADERSHIP & DIRECTION</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Meet the Race Director: Avisek Tunga
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Endurance Athlete, Guinness World Record Holder, Academician &amp; Native of Tamluk
          </p>
        </div>

        {/* Quick Contact Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            id="btn-call-race-director"
            href={`tel:${RACE_INFO.directorPhone}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call: {RACE_INFO.directorPhone}</span>
          </a>
          <a
            id="btn-email-race-director"
            href={`mailto:${RACE_INFO.directorEmail}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
          <a
            id="btn-web-race-director"
            href={RACE_INFO.directorWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>avisektunga.com</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Main Director Profile Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e2e8f0] shadow-sm space-y-6">
        
        {/* Top Bio & Roots Header */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-between pb-6 border-b border-[#e2e8f0]">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-[#ea580c] border border-orange-200 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Race Director</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>Hometown: Tamluk, Purba Medinipur (721636)</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Guinness World Record Holder</span>
              </span>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              <strong>Avisek Tunga</strong> was born and raised in <strong>Tamluk</strong>, the historic district headquarters of Purba Medinipur where the Tamralipta Ultra begins and finishes. Bringing world-class ultra-endurance running directly to his native soil along the Rupnarayan river corridor is a personal and athletic milestone.
            </p>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              As an ultra-runner, mountaineer, cyclist, and academician, Avisek combines scientific discipline with real-world extreme endurance across high-altitude Himalayas, desert crossings, and multi-day self-supported expeditions. He is the founder of <strong>Dquests Adventure Sports Academy</strong>, which develops athletes in ultra running, cycling, triathlon, mountaineering, and rock climbing.
            </p>
          </div>

          {/* Quick Leadership Card */}
          <div className="w-full lg:w-72 shrink-0 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5 pb-2 border-b border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Academic &amp; Leadership Roles</span>
            </div>
            
            <div>
              <div className="text-[11px] text-slate-500 font-semibold">Current Academic Role:</div>
              <div className="font-bold text-slate-800 mt-0.5">
                Assistant Professor, Department of Mechanical Engineering
              </div>
              <div className="text-[11px] text-slate-500">Meghnad Saha Institute of Technology (MSIT, Kol-150)</div>
            </div>

            <div>
              <div className="text-[11px] text-slate-500 font-semibold">Organization:</div>
              <div className="font-bold text-slate-800 mt-0.5">Dquests Adventure Sports Academy</div>
              <div className="text-[11px] text-slate-600">Founder &amp; Race Director</div>
            </div>
          </div>
        </div>

        {/* Milestone Category Filter */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { id: 'all', label: 'All Highlights' },
            { id: 'director', label: 'Race Director Experience' },
            { id: 'running', label: 'Ultra Running & Marathons' },
            { id: 'skyrunning', label: 'Skyrunning & FKTs' },
            { id: 'cycling', label: 'Cycling & World Record' },
            { id: 'climbing', label: 'Alpine Climbing & Triathlon' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Card 1: Race Director Experience */}
          {(activeTab === 'all' || activeTab === 'director') && (
            <div className="p-5 rounded-xl bg-[#fff7ed] border border-[#fed7aa] space-y-3">
              <div>
                <div className="flex items-center gap-2 text-[#ea580c] font-bold text-xs uppercase tracking-wide">
                  <Compass className="w-4 h-4" />
                  <span>Race Director Track Record</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Organizing premier ultra-distance, trail, and multi-sport endurance events across Eastern India.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mt-1.5 shrink-0" />
                  <div>
                    <strong>Coast to Crest (C2C):</strong> 830 km RAAM qualifying bicycle race from Digha to Darjeeling.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mt-1.5 shrink-0" />
                  <div>
                    <strong>Kolkata City Triathlon:</strong> Eastern India&apos;s landmark multi-sport competition.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mt-1.5 shrink-0" />
                  <div>
                    <strong>Goechala Trail Run:</strong> ITRA (International Trail Running Association) National League high-altitude race.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mt-1.5 shrink-0" />
                  <div>
                    <strong>Freedom of Ride:</strong> 90 km mass endurance cycling challenge around Kolkata.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mt-1.5 shrink-0" />
                  <div>
                    <strong>Rock Climbing Courses:</strong> Outdoor rock climbing instruction and youth adventure in Purulia.
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Card 2: Ultra Running & Marathons */}
          {(activeTab === 'all' || activeTab === 'running') && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wide">
                  <Footprints className="w-4 h-4 text-emerald-600" />
                  <span>Ultra Running &amp; Marathons</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Championship wins, national ultra qualifiers, and historic multi-day self-supported runs.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Trans Sahyadri 600 km:</strong> Self-supported run in 12 days in 2020 — First person in history.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Bengal Ultra 80K Champion:</strong> Outright champion in 2019.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Full Marathon Finisher (5x):</strong> Best timing 3:27:29 with 10th position in Kolkata Full Marathon.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Malnad Ultra 110 km &amp; Garhwal 74 km:</strong> Finisher &amp; La Ultra 111K qualifier in 2018.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Extreme Terrain:</strong> Solo 30 km Thar Desert run (2019); Hell Ultra Buddha Trail 65 km (11th place).
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Card 3: Skyrunning & High-Altitude FKTs */}
          {(activeTab === 'all' || activeTab === 'skyrunning') && (
            <div className="p-5 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] space-y-3">
              <div>
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wide">
                  <Mountain className="w-4 h-4 text-blue-600" />
                  <span>Himalayan Skyrunning &amp; FKTs</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Rapid alpine ascents and record Fastest Known Times across high Himalayan passes.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Yuksom to Goechala (4,600m):</strong> Return in 21 hours in 2022 (normally takes 9 days).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Sandakphu FKT:</strong> Maneybhanjan to Sandakphu in 5h 45m; return in 14h 45m (normally takes 5 days).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Yuksom to Dzongri Top:</strong> In 6h 25m &amp; return in 13h 50m in 2019 (Fastest Known Time).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Trans Ladakh 400 km:</strong> Self-supported skyrunning in 14 days in 2021 (normally takes 30 days supported).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Annapurna Circuit 150 km:</strong> Via Kangla &amp; Mesokanto La in 5 days (normally takes 14 days).
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Card 4: Cycling & World Record */}
          {(activeTab === 'all' || activeTab === 'cycling') && (
            <div className="p-5 rounded-xl bg-[#faf5ff] border border-[#e9d5ff] space-y-3">
              <div>
                <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wide">
                  <Bike className="w-4 h-4 text-purple-600" />
                  <span>Cycling &amp; World Record</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Guinness World Record holder and ultra-distance randonneur expeditions.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Guinness World Record:</strong> 3,600 km Trans Himalaya Cycling expedition from Leh to Kibitho (solo, self-supported).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Super Randonneur (SR):</strong> 200 km (7h 21m), 300 km (14h 02m), 400 km (24h), 600 km (36h 45m).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Les Randonneurs Mondiaux:</strong> 1,055 km LRM in 65h 53m; 1,200 km LRM in 88h 37m.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Tour de Bengal 2024 Champion:</strong> Winner of Eastern India&apos;s premier cycling tour.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Coast to Crest 830 km:</strong> 47h 45m self-supported, 4th position, RAAM qualified in 2023.
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Card 5: Extreme Triathlon & Multi-Sport */}
          {(activeTab === 'all' || activeTab === 'climbing') && (
            <div className="p-5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] space-y-3">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wide">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>Triathlon &amp; Multi-Sport</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Pioneer finishes in extreme high-altitude and longest-distance endurance triathlons.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Himalayan Nepal XTRI:</strong> First Indian to finish the World&apos;s Highest Triathlon.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>MOIL Tigerman Nagpur:</strong> Successfully completed India&apos;s longest triathlon (5 km Swim, 200 km Bike, 50 km Run).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Konark Full Herculean:</strong> Runner-Up (3.8 km Swim, 180 km Bike, 21.1 km Run) in 2023.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <div>
                    <strong>Konark Half Herculean:</strong> Runner-Up (1.9 km Swim, 90 km Bike, 21.1 km Run) in 2022.
                  </div>
                </li>
              </ul>
            </div>
          )}

          {/* Card 6: Alpine Mountaineering */}
          {(activeTab === 'all' || activeTab === 'climbing') && (
            <div className="p-5 rounded-xl bg-[#f8fafc] border border-slate-300 space-y-3">
              <div>
                <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wide">
                  <Mountain className="w-4 h-4 text-slate-700" />
                  <span>Alpine Mountaineering</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  High-altitude 6,000m+ summit ascents executed in unsupported alpine style.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1.5 shrink-0" />
                  <div>
                    <strong>Mt. Leo Purgyal (6,791m):</strong> Summited in Unsupported Style (2026, Successful).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1.5 shrink-0" />
                  <div>
                    <strong>Mt. Yunam (6,111m):</strong> Summited in Unsupported Style (2026, Successful).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1.5 shrink-0" />
                  <div>
                    <strong>Hanuman Tibba (5,932m):</strong> Alpine style climb (2013, Successful).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1.5 shrink-0" />
                  <div>
                    <strong>Four Peaks in 14 Days:</strong> Unsupported style in Tso Moriri, Ladakh (2022): Karzok Kangri (6,090m), Yulong Nang South (6,080m), Pt. 6070 &amp; Pt. 6010.
                  </div>
                </li>
              </ul>
            </div>
          )}

        </div>

        {/* Director's Personal Race Message */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200">
          <div className="flex items-start gap-3">
            <Flame className="w-5 h-5 text-[#ea580c] shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              <div className="font-bold text-[#0f172a] text-sm uppercase tracking-wide font-cinzel">
                A Message from Race Director Avisek Tunga:
              </div>
              <p className="italic leading-relaxed">
                &ldquo;Tamluk is my home. Every kilometer of this course along the Rupnarayan river has been chosen with profound respect for our ancient history, the deltaic wind, and the sacred grit of endurance runners. Whether you are running the 50K, pushing past limits in the 75K, or taking on the full 100K journey to the Haldia industrial corridor, our entire team is with you every step of the way. Pace wisely, respect the cut-offs, and run with courage.&rdquo;
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-orange-200/60 mt-2">
                <span className="font-bold text-[#ea580c]">
                  Official Inquiries &amp; Direct Assistance:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${RACE_INFO.directorPhone}`}
                    className="font-mono font-bold text-slate-800 hover:text-[#ea580c] transition-colors"
                  >
                    📞 +91 {RACE_INFO.directorPhone}
                  </a>
                  <span>•</span>
                  <a
                    href={`mailto:${RACE_INFO.directorEmail}`}
                    className="font-mono text-slate-600 hover:text-[#ea580c] transition-colors"
                  >
                    ✉️ {RACE_INFO.directorEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
