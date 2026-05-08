import { motion } from 'motion/react';
import { 
  ArrowRight, Shield, CheckCircle2, Lock, Cpu, Globe, Search, Users, BarChart3, HardDrive, AlertTriangle, Activity, Database, Server, Network
} from 'lucide-react';

export const GRCModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-stone-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
        <div className="p-5 rounded-2xl shrink-0 shadow-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Shield className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-2xl md:text-4xl font-semibold tracking-tight mb-2 text-blue-400">Governance & Compliance</h3>
          <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed max-w-2xl">{data.desc}</p>
        </div>
      </div>

      {/* Grid Dashboard Style Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Core Frameworks */}
        <div className="md:col-span-1 bg-stone-900/50 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none" />
          <h4 className="text-xs uppercase tracking-[0.2em] text-blue-300/70 mb-6 font-bold">Target Frameworks</h4>
          <div className="flex flex-col gap-3">
            {data.standards.map((s: string, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-white/[0.03] p-3 rounded-lg border border-white/5">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm font-semibold tracking-wider text-stone-300">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What We Do */}
        <div className="md:col-span-2 bg-stone-900/50 rounded-2xl p-6 md:p-8 border border-white/5 relative">
          <h4 className="text-xs uppercase tracking-[0.2em] text-blue-300/70 mb-6 font-bold flex items-center gap-2">
            <Activity className="w-4 h-4" /> Strategic Initiatives
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {data.whatWeDo.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 text-blue-400">■</span>
                <span className="text-sm font-light text-stone-300 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Pipeline */}
      <div className="mb-12">
        <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6 font-bold">Implementation Pathway</h4>
        <div className="flex flex-col md:flex-row gap-4">
          {data.process.map((step: string, i: number) => (
            <div key={i} className="flex-1 bg-white/[0.02] border border-blue-500/10 rounded-xl p-5 relative group hover:bg-blue-500/5 transition-colors">
              <span className="text-xs font-bold text-blue-500/50 mb-2 block">PHASE 0{i + 1}</span>
              <p className="text-sm font-medium text-stone-200">{step}</p>
              {i < data.process.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-4 border-t border-dashed border-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-4">
        <a href="#contact" onClick={close} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          Initiate GRC Review
        </a>
      </div>
    </div>
  );
};

export const VAPTModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-stone-200">
      {/* Terminal Theme Header */}
      <div className="mb-10 font-mono">
        <div className="flex items-center gap-2 mb-4 text-orange-500">
          <span className="animate-pulse">▶</span>
          <span className="text-xs tracking-widest uppercase">Initializing Security Scan...</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">VAPT & Testing_</h3>
        <p className="text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl font-sans">{data.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Terminal Window (What We Do) */}
        <div className="bg-black/80 rounded-xl border border-stone-800 p-6 font-mono text-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/50 to-red-500/50" />
          <div className="text-stone-500 mb-4">// Target Scope Identified</div>
          <ul className="space-y-3">
            {data.whatWeDo.map((item: string, i: number) => (
              <li key={i} className="flex gap-3 text-stone-300">
                <span className="text-orange-500">{"$"}</span>
                <span className="opacity-80 hover:opacity-100 transition-opacity">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Red Teaming Impact */}
        <div className="flex flex-col justify-center">
          <h4 className="text-xs uppercase tracking-[0.2em] text-orange-500 mb-6 font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Business Protection
          </h4>
          <div className="space-y-4">
            {data.impact.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-orange-500/5 border border-orange-500/10 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-sm font-light text-stone-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <a href="#contact" onClick={close} className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] font-mono">
          {"[ EXECUTE_ASSESSMENT ]"}
        </a>
      </div>
    </div>
  );
};

export const ArchitectureModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-stone-200">
      {/* Blueprint Theme */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="flex items-start gap-6 mb-12 border-b border-white/10 pb-8 relative z-10">
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <Cpu className="w-10 h-10 text-blue-400" />
        </div>
        <div>
          <h3 className="text-3xl font-bold tracking-tight mb-2 text-blue-400">{data.title}</h3>
          <p className="text-stone-300 font-light">{data.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 relative z-10">
        {/* Layered Stack (What We Do) */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-blue-300/70 mb-6 font-bold">Architectural Layers</h4>
          <div className="space-y-4">
            {data.whatWeDo.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-900/20 to-transparent border-l-2 border-blue-500 rounded-r-lg">
                <Layers className="w-5 h-5 text-blue-500/50 shrink-0" />
                <span className="text-sm font-medium text-stone-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Flow */}
        <div className="bg-stone-900/80 p-6 rounded-2xl border border-white/5">
          <h4 className="text-xs uppercase tracking-[0.3em] text-blue-300/70 mb-6 font-bold">Design Pipeline</h4>
          <div className="relative pl-6 border-l border-white/10 space-y-8">
            {data.process.map((step: string, i: number) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <p className="text-sm font-semibold text-stone-200">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 relative z-10">
        <a href="#contact" onClick={close} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          Design Architecture
        </a>
      </div>
    </div>
  );
};

export const AIRiskModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-stone-200">
      {/* Neural/Futuristic Theme */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-stone-900/0 to-stone-900/0 pointer-events-none" />
      
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex p-4 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
          <Globe className="w-12 h-12 text-orange-400" />
        </div>
        <h3 className="text-3xl md:text-5xl font-light tracking-tight mb-4 text-white">{data.title}</h3>
        <p className="text-stone-400 max-w-2xl mx-auto">{data.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
        <div className="bg-white/[0.02] border border-orange-500/10 p-6 rounded-3xl backdrop-blur-sm">
          <h4 className="text-xs uppercase tracking-widest text-orange-400 mb-6 font-bold">Governance Actions</h4>
          <ul className="space-y-4">
            {data.whatWeDo.map((item: string, i: number) => (
              <li key={i} className="flex gap-3 items-start">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <span className="text-sm text-stone-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col gap-4">
          {data.impact.map((item: string, i: number) => (
            <div key={i} className="p-5 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-orange-400 shrink-0" />
              <span className="text-sm font-medium text-stone-200">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center relative z-10">
        <a href="#contact" onClick={close} className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]">
          Secure AI Adoption
        </a>
      </div>
    </div>
  );
};

export const OSINTModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-stone-200">
      {/* Investigation Board Theme */}
      <div className="mb-12 border-b border-white/5 pb-8">
        <h3 className="text-3xl font-bold mb-4 flex items-center gap-3 text-blue-400">
          <Search className="w-8 h-8" /> {data.title}
        </h3>
        <p className="text-stone-400 font-mono text-sm">STATUS: ACTIVE MONITORING // {data.desc}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-blue-500 mb-4 font-bold font-mono">Dossier Items</h4>
          {data.whatWeDo.map((item: string, i: number) => (
            <div key={i} className="p-4 bg-black/40 border border-blue-500/20 rounded-lg flex items-center gap-4 hover:bg-blue-500/5 transition-colors">
              <span className="text-blue-500 font-mono text-xs">[{String(i + 1).padStart(2, '0')}]</span>
              <span className="text-sm text-stone-300 font-mono">{item}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6">
          <h4 className="text-xs uppercase tracking-widest text-blue-500 mb-6 font-bold font-mono">Impact Radar</h4>
          <div className="space-y-6 relative">
            <div className="absolute left-2.5 top-2 h-full w-px bg-blue-500/20" />
            {data.impact.map((item: string, i: number) => (
              <div key={i} className="relative pl-8">
                <div className="absolute left-1 top-1.5 w-3 h-3 border-2 border-blue-500 rounded-full bg-stone-900" />
                <p className="text-xs text-stone-300 font-mono">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <a href="#contact" onClick={close} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-sm text-xs uppercase tracking-widest font-bold transition-all font-mono shadow-[4px_4px_0px_rgba(59,130,246,0.3)]">
          INITIATE_OSINT
        </a>
      </div>
    </div>
  );
};

export const SocialMediaModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-stone-200">
      {/* Modern Metrics Theme */}
      <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-orange-400" />
            <h3 className="text-3xl font-bold text-white">{data.title}</h3>
          </div>
          <p className="text-stone-400">{data.desc}</p>
        </div>
        <div className="hidden md:flex gap-2">
          {data.standards.map((s: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase text-stone-300">{s}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-orange-400 mb-4">Key Offerings</h4>
          {data.whatWeDo.map((item: string, i: number) => (
            <div key={i} className="p-4 bg-stone-900/50 rounded-xl border border-white/5 flex items-center gap-3 hover:border-orange-500/30 transition-colors">
              <Activity className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-stone-300">{item}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/10 to-stone-900/50 rounded-3xl p-8 border border-orange-500/20">
          <h4 className="text-sm font-semibold text-orange-400 mb-6">Strategic Impact</h4>
          <div className="space-y-6">
            {data.impact.map((item: string, i: number) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xs shrink-0">{i+1}</div>
                <p className="text-sm text-stone-200 pt-1 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <a href="#contact" onClick={close} className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-full text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]">
          Analyze Digital Presence
        </a>
      </div>
    </div>
  );
};

export const TrainingModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-stone-200">
      {/* Educational Pathway Theme */}
      <div className="text-center mb-16">
        <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-6" />
        <h3 className="text-4xl font-bold tracking-tight text-white mb-4">{data.title}</h3>
        <p className="text-stone-400 max-w-2xl mx-auto text-lg">{data.desc}</p>
      </div>

      <div className="relative mb-16">
        {/* Timeline Line */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {data.process.map((step: string, i: number) => (
            <div key={i} className="bg-stone-900 border border-blue-500/20 rounded-2xl p-6 text-center shadow-xl">
              <div className="w-10 h-10 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold mb-4 ring-4 ring-stone-900">
                {i + 1}
              </div>
              <h4 className="text-sm font-semibold text-stone-200">{step}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-900/10 rounded-3xl p-8 border border-blue-500/20 mb-12">
        <h4 className="text-sm font-semibold text-blue-400 mb-6 text-center">Curriculum & Focus Areas</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.whatWeDo.map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-3 bg-black/20 p-4 rounded-xl">
              <Shield className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="text-xs font-medium text-stone-300 leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <a href="#contact" onClick={close} className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          Explore Training Programs
        </a>
      </div>
    </div>
  );
};

export const ProductAdvisoryModal = ({ data, close }: { data: any; close: () => void }) => {
  return (
    <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full h-full text-stone-200">
      {/* Integration/Gears Theme */}
      <div className="flex flex-col lg:flex-row gap-12 mb-12">
        <div className="flex-1">
          <HardDrive className="w-12 h-12 text-orange-400 mb-6" />
          <h3 className="text-3xl font-bold tracking-tight text-white mb-4">{data.title}</h3>
          <p className="text-stone-400 leading-relaxed mb-8">{data.desc}</p>
          
          <div className="space-y-3">
            {data.impact.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-sm text-stone-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-stone-900/80 rounded-3xl p-8 border border-orange-500/10">
          <h4 className="text-xs uppercase tracking-widest text-orange-400 mb-6 font-bold">Lifecycle Services</h4>
          <div className="space-y-4">
            {data.whatWeDo.map((item: string, i: number) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-4 hover:border-orange-500/30 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold shrink-0">{i+1}</div>
                <span className="text-sm text-stone-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <a href="#contact" onClick={close} className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)]">
          Consult on Products
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
    case 5: return <SocialMediaModal data={data} close={close} />;
    case 6: return <TrainingModal data={data} close={close} />;
    case 7: return <ProductAdvisoryModal data={data} close={close} />;
    default: return null;
  }
};
