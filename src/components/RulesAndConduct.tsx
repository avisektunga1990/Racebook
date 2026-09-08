import React from 'react';
import { 
  Trash2, Car, HeartHandshake, ShieldAlert, 
  Sparkles, CheckCircle2, AlertOctagon, HelpCircle, UtensilsCrossed 
} from 'lucide-react';

export const RulesAndConduct: React.FC = () => {
  const rules = [
    {
      icon: Trash2,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      title: 'Leave No Trace (Zero Litter Policy)',
      desc: 'Tamralipta Ultra runs along the banks of the sacred Rupnarayan. If you carry a gel wrapper, blister packet, or bottle onto the course, you MUST carry it until the next designated aid station waste bin. Immediate disqualification for intentional littering.',
    },
    {
      icon: Car,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      title: 'Traffic Awareness & Rural Roads',
      desc: 'The race route operates on open public highways and village roads. Runners must run facing incoming traffic where advised, remain vigilant around vehicles, e-rickshaws, and cows, and obey course marshals and Bengal Police directives.',
    },
    {
      icon: HeartHandshake,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      title: 'Respect Fellow Runners & Villagers',
      desc: 'Cheer and support your peers. Be polite to local villagers along Natshal and Bhangagara who share their roads and well-wishes. Remember you are an ambassador of the ultra running community.',
    },
    {
      icon: ShieldAlert,
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      title: 'Emergency & Medical Reporting',
      desc: 'If you witness a runner in distress, severe dehydration, heat stroke, or collapse, notify the nearest aid station or roaming medical marshal immediately. Time will be compensated if you stop to administer medical aid.',
    },
    {
      icon: UtensilsCrossed,
      color: 'text-orange-700 bg-orange-50 border-orange-200',
      title: 'No Race-Day Food Experiments',
      desc: 'Pre-race food at start (white bread, bananas, jaggery, boiled potato, soaked chana) is provided for familiar carbohydrate topping. Consume only what your stomach has verified during long training runs.',
    },
    {
      icon: Sparkles,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      title: 'Preserve Archaeological Heritage',
      desc: 'You are running across an ancient landscape dating to prehistoric and maritime antiquity. Treat the shrines, monuments, and river embankments with utmost reverence.',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#fff7ed] border border-[#ffedd5] text-[#ea580c]">
          <AlertOctagon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xl font-black text-[#0f172a] uppercase">
            Participant Code of Conduct & Core Directives
          </h4>
          <p className="text-xs text-slate-600">
            Mandatory ethical and safety standards governing all competitors across 50K, 75K, and 100K
          </p>
        </div>
      </div>

      {/* Grid of Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule, idx) => {
          const IconComp = rule.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-3.5 ${rule.color}`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <h5 className="text-sm font-bold text-[#0f172a] mb-1.5">{rule.title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{rule.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mandatory Official Protocol</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
