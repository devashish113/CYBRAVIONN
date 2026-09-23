import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Shield, CheckCircle2, Lock, Cpu, Globe, Search, Users, BarChart3, HardDrive, AlertTriangle, Activity, Database, Server, Network, Layers
} from 'lucide-react';

export const GRCModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-slate-800 dark:text-stone-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
        <div className="p-5 rounded-2xl shrink-0 shadow-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          <Shield className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-2xl md:text-4xl font-semibold tracking-tight mb-2 text-blue-600 dark:text-blue-400">Governance &amp; Compliance</h3>
          <p className="text-slate-600 dark:text-stone-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">{data.desc}</p>
        </div>
      </div>

      {/* Grid Dashboard Style Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Core Frameworks */}
        <div className="md:col-span-1 bg-slate-50 dark:bg-stone-900/50 rounded-2xl p-6 border border-slate-200 dark:border-white/5 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none" />
          <h4 className="text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300/70 mb-6 font-bold">Target Frameworks</h4>
          <div className="flex flex-col gap-3">
            {data.standards?.map((s: string, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-white dark:bg-white/[0.03] p-3 rounded-lg border border-slate-200 dark:border-white/5 shadow-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-semibold tracking-wider text-slate-800 dark:text-stone-300">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What We Do */}
        <div className="md:col-span-2 bg-slate-50 dark:bg-stone-900/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-white/5 relative shadow-sm">
          <h4 className="text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300/70 mb-6 font-bold flex items-center gap-2">
            <Activity className="w-4 h-4" /> Strategic Initiatives
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {data.whatWeDo?.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 text-blue-500 font-bold">■</span>
                <span className="text-sm font-light text-slate-700 dark:text-stone-300 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-4">
        <a href="#contact" onClick={close} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          Initiate GRC Review
        </a>
      </div>
    </div>
  );
};

export const VAPTModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-slate-800 dark:text-stone-200">
      {/* Terminal Theme Header */}
      <div className="mb-10 font-mono">
        <div className="flex items-center gap-2 mb-4 text-orange-500">
          <span className="animate-pulse">▶</span>
          <span className="text-xs tracking-widest uppercase font-bold">Initializing Security Scan...</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">VAPT &amp; Testing_</h3>
        <p className="text-slate-600 dark:text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl font-sans">{data.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Terminal Window (What We Do) */}
        <div className="bg-slate-900 dark:bg-black/80 rounded-2xl border border-slate-700 dark:border-stone-800 p-6 font-mono text-sm relative overflow-hidden shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/50 to-red-500/50" />
          <div className="text-stone-400 mb-4 font-semibold">// Target Scope Identified</div>
          <ul className="space-y-3">
            {data.whatWeDo?.map((item: string, i: number) => (
              <li key={i} className="flex gap-3 text-stone-200">
                <span className="text-orange-400 font-bold">{"$"}</span>
                <span className="opacity-90 hover:opacity-100 transition-opacity">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Red Teaming Impact */}
        <div className="flex flex-col justify-center">
          <h4 className="text-xs uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500 mb-6 font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Targeted Safeguards
          </h4>
          <div className="space-y-4">
            {data.standards?.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-800 dark:text-stone-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <a href="#contact" onClick={close} className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] font-mono">
          {"[ EXECUTE_ASSESSMENT ]"}
        </a>
      </div>
    </div>
  );
};

export const ArchitectureModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-slate-800 dark:text-stone-200">
      <div className="flex items-start gap-6 mb-12 border-b border-slate-200 dark:border-white/10 pb-8 relative z-10">
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-blue-600 dark:text-blue-400">
          <Cpu className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">{data.title}</h3>
          <p className="text-slate-600 dark:text-stone-300 font-light">{data.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 relative z-10">
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300/70 mb-6 font-bold">Architectural Layers</h4>
          <div className="space-y-4">
            {data.whatWeDo?.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-gradient-to-r dark:from-blue-900/20 dark:to-transparent border-l-4 border-blue-500 rounded-r-xl border border-slate-200 dark:border-white/5 shadow-xs">
                <Layers className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-sm font-medium text-slate-800 dark:text-stone-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-stone-900/80 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
          <h4 className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300/70 mb-6 font-bold">Design Standards</h4>
          <div className="space-y-3">
            {data.standards?.map((step: string, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-stone-950 border border-slate-200 dark:border-stone-800">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                <p className="text-sm font-semibold text-slate-800 dark:text-stone-200">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 relative z-10">
        <a href="#contact" onClick={close} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          Design Architecture
        </a>
      </div>
    </div>
  );
};

export const AIRiskModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-slate-800 dark:text-stone-200">
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex p-4 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 text-purple-600 dark:text-purple-400">
          <Globe className="w-12 h-12" />
        </div>
        <h3 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-slate-900 dark:text-white">{data.title}</h3>
        <p className="text-slate-600 dark:text-stone-400 max-w-2xl mx-auto">{data.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
        <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-purple-500/10 p-6 rounded-3xl shadow-sm">
          <h4 className="text-xs uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-6 font-bold">Governance Controls</h4>
          <ul className="space-y-4">
            {data.whatWeDo?.map((item: string, i: number) => (
              <li key={i} className="flex gap-3 items-start">
                <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <span className="text-sm text-slate-700 dark:text-stone-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col gap-4">
          {data.standards?.map((item: string, i: number) => (
            <div key={i} className="p-5 bg-purple-50 dark:bg-gradient-to-r dark:from-purple-500/10 dark:to-transparent border border-purple-200 dark:border-purple-500/20 rounded-2xl flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0" />
              <span className="text-sm font-semibold text-slate-800 dark:text-stone-200">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center relative z-10">
        <a href="#contact" onClick={close} className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          Secure AI Adoption
        </a>
      </div>
    </div>
  );
};

export const OSINTModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-slate-800 dark:text-stone-200">
      <div className="mb-12 border-b border-slate-200 dark:border-white/5 pb-8">
        <h3 className="text-3xl font-bold mb-4 flex items-center gap-3 text-blue-600 dark:text-blue-400">
          <Search className="w-8 h-8" /> {data.title}
        </h3>
        <p className="text-slate-600 dark:text-stone-400 font-mono text-sm font-medium">STATUS: ACTIVE MONITORING // {data.desc}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4 font-bold font-mono">Dossier Directives</h4>
          {data.whatWeDo?.map((item: string, i: number) => (
            <div key={i} className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-blue-500/20 rounded-xl flex items-center gap-4 hover:border-blue-400/50 transition-colors shadow-xs">
              <span className="text-blue-600 dark:text-blue-400 font-mono text-xs font-bold">[{String(i + 1).padStart(2, '0')}]</span>
              <span className="text-sm text-slate-800 dark:text-stone-300 font-mono">{item}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-slate-50 dark:bg-blue-900/10 border border-slate-200 dark:border-blue-500/20 rounded-2xl p-6 shadow-sm">
          <h4 className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-6 font-bold font-mono">Framework Standards</h4>
          <div className="space-y-4">
            {data.standards?.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-stone-950 border border-slate-200 dark:border-stone-800">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <p className="text-xs text-slate-800 dark:text-stone-300 font-mono font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <a href="#contact" onClick={close} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs uppercase tracking-widest font-bold transition-all font-mono shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          INITIATE_OSINT
        </a>
      </div>
    </div>
  );
};

export const ServiceModalRenderer = ({ activeBrief, data, close }: { activeBrief: number; data: any; close: () => void }) => {
  switch (activeBrief) {
    case 0: return <GRCModal data={data} close={close} />;
    case 1: return <VAPTModal data={data} close={close} />;
    case 2: return <ArchitectureModal data={data} close={close} />;
    case 3: return <AIRiskModal data={data} close={close} />;
    case 4: return <OSINTModal data={data} close={close} />;
    case 5: return <ArchitectureModal data={data} close={close} />;
    default: return <GRCModal data={data} close={close} />;
  }
};
