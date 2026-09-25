import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, MapPin, ShieldCheck, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface RegionData {
  id: string;
  region: string;
  hubCities: string[];
  frameworks: string[];
  specialty: string;
  activeClientsCount: string;
}

const regions: RegionData[] = [
  {
    id: "north-america",
    region: "North America (US & Canada)",
    hubCities: ["Silicon Valley", "New York", "Toronto"],
    frameworks: ["SOC 2 Type II", "NIST CSF 2.0", "HIPAA / HITECH", "FedRAMP Readiness"],
    specialty: "Fintech payment rails, SaaS multi-cloud DevSecOps, and enterprise AI model safety governance.",
    activeClientsCount: "12+ Enterprise Clients"
  },
  {
    id: "emea",
    region: "Europe & United Kingdom",
    hubCities: ["London", "Frankfurt", "Dublin"],
    frameworks: ["ISO/IEC 27001", "EU AI Act Compliance", "GDPR / Data Privacy", "NIS2 Directives"],
    specialty: "Sovereign AI air-gapped deployments, cross-border data protection, and critical infrastructure hardening.",
    activeClientsCount: "10+ Enterprise Clients"
  },
  {
    id: "apac",
    region: "Asia-Pacific & India",
    hubCities: ["Singapore", "Bangalore", "Sydney"],
    frameworks: ["DPDP Act 2023", "CERT-In Cyber Mandate", "ISO 27001", "MAS TRM Guidelines"],
    specialty: "Rapid startup SOC 2 certification, high-frequency banking VAPT, and sovereign defense advisory.",
    activeClientsCount: "15+ Enterprise Clients"
  },
  {
    id: "middle-east",
    region: "Middle East & Gulf (GCC)",
    hubCities: ["Dubai", "Abu Dhabi", "Riyadh"],
    frameworks: ["UAE NESA", "Saudi NCA ECC", "ISO 27001", "PCI-DSS v4.0"],
    specialty: "Critical energy infrastructure, smart city zero-trust perimeters, and financial institution defense.",
    activeClientsCount: "8+ Enterprise Clients"
  }
];

interface GlobalPresenceProps {
  isDarkMode?: boolean;
}

export const GlobalPresence: React.FC<GlobalPresenceProps> = ({ isDarkMode }) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>("north-america");
  const selectedRegion = regions.find(r => r.id === selectedRegionId) || regions[0];

  const handleSelectRegion = (id: string) => {
    cyberAudio.playClick();
    setSelectedRegionId(id);
  };

  return (
    <section id="global-reach" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-slate-50/70 dark:bg-stone-950/60 border-t border-slate-200/80 dark:border-stone-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-3 block font-bold">
            Worldwide Sovereign Reach
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Global Advisory &amp; Sovereign Jurisdiction Coverage
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-base md:text-lg max-w-2xl mt-4 font-light mx-auto">
            Cross-border compliance governance engineered to satisfy regional data sovereignty laws across the Americas, EMEA, and Asia-Pacific.
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {regions.map((reg) => {
            const isSelected = selectedRegionId === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => handleSelectRegion(reg.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-stone-900 border-blue-500/60 dark:border-blue-500 shadow-md ring-1 ring-blue-500/30'
                    : 'bg-white/60 dark:bg-stone-900/40 border-slate-200 dark:border-stone-800 hover:border-slate-300 dark:hover:border-stone-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin size={14} className={isSelected ? 'text-orange-500' : 'text-slate-400'} />
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-stone-400'
                  }`}>
                    {reg.region.split(' ')[0]}
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {reg.region}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Region Deep Dive Card */}
        <div className="bg-white dark:bg-stone-900/80 rounded-3xl border border-slate-200 dark:border-stone-800 p-6 md:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Globe size={13} />
              <span>Active Coverage Region</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {selectedRegion.region}
            </h3>

            <p className="text-slate-600 dark:text-stone-300 font-light leading-relaxed text-sm sm:text-base">
              {selectedRegion.specialty}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedRegion.hubCities.map((city) => (
                <span key={city} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-stone-800 text-xs font-mono text-slate-800 dark:text-stone-300 border border-slate-200 dark:border-stone-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Frameworks & Attestations */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-stone-950/80 rounded-2xl border border-slate-200 dark:border-stone-800 p-6 space-y-4">
            <div className="text-xs uppercase font-mono tracking-widest text-slate-500 dark:text-stone-400 font-bold">
              Enforced Regulatory Frameworks
            </div>

            <div className="space-y-2.5">
              {selectedRegion.frameworks.map((fw, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-900/60 border border-slate-200/80 dark:border-stone-800 text-xs">
                  <div className="flex items-center gap-2.5 font-semibold text-slate-900 dark:text-white">
                    <ShieldCheck size={16} className="text-blue-500" />
                    <span>{fw}</span>
                  </div>
                  <span className="text-[10px] font-mono text-orange-500 font-bold">ACTIVE MANDATE</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white dark:bg-stone-900 dark:hover:bg-blue-600/30 border border-slate-800 dark:border-stone-700 text-xs font-semibold font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>Scope Regional Compliance</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
