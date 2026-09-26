import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Cpu, 
  Globe, 
  Radar, 
  Layers, 
  Brain, 
  AlertTriangle, 
  Activity, 
  Zap, 
  Check, 
  FileText, 
  X,
  Phone,
  Mail,
  ShieldAlert
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface ModalData {
  title: string;
  tag?: string;
  subtitle?: string;
  desc: string;
  standards?: string[];
  whatWeDo?: string[];
  glow?: 'blue' | 'orange';
}

interface ServiceModalProps {
  data: ModalData;
  close: () => void;
  onOpenConsultation?: () => void;
}

export const UnifiedCapabilityModal: React.FC<ServiceModalProps> = ({ 
  data, 
  close,
  onOpenConsultation 
}) => {
  const isBlue = data.glow === 'blue';

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    cyberAudio.playClick();
    close();
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = '#contact';
      }
    }
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 relative z-10 w-full text-slate-900 dark:text-stone-100">
      
      {/* Top Category Badge & Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-stone-800/80 mb-8">
        <div className="flex items-start sm:items-center gap-4">
          <div className={`p-3.5 rounded-2xl shrink-0 shadow-lg ${
            isBlue 
              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30' 
              : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30'
          }`}>
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                isBlue 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30' 
                  : 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/30'
              }`}>
                {data.tag || 'SECURITY CAPABILITY'}
              </span>
              <span className="text-xs text-slate-400 dark:text-stone-500 font-mono">
                &bull; Enterprise Scope
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {data.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Scope Overview Paragraph */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-stone-900/60 border border-slate-200 dark:border-stone-800 text-sm sm:text-base text-slate-700 dark:text-stone-300 font-normal leading-relaxed">
        {data.desc}
      </div>

      {/* Two-Column Grid: Deliverables & Standards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Left Column: Scope & Core Deliverables */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity size={16} className={isBlue ? 'text-blue-500' : 'text-orange-500'} />
            <span>Execution Scope &amp; Technical Directives</span>
          </h4>

          <div className="space-y-3">
            {data.whatWeDo?.map((item: string, i: number) => (
              <div 
                key={i} 
                className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white dark:bg-stone-900/90 border border-slate-200 dark:border-stone-800 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-colors shadow-xs"
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                  isBlue ? 'bg-blue-500/15 text-blue-500' : 'bg-orange-500/15 text-orange-500'
                }`}>
                  {i + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-stone-200 font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Supported Frameworks & Safeguards */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock size={16} className={isBlue ? 'text-blue-500' : 'text-orange-500'} />
            <span>Target Standards &amp; Compliance</span>
          </h4>

          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/90 border border-slate-200 dark:border-stone-800 shadow-xs space-y-3">
            {data.standards?.map((std: string, idx: number) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-stone-950 border border-slate-200 dark:border-stone-800/80"
              >
                <CheckCircle2 size={16} className={isBlue ? 'text-blue-500 shrink-0' : 'text-orange-500 shrink-0'} />
                <span className="text-xs font-semibold font-mono text-slate-900 dark:text-stone-200">
                  {std}
                </span>
              </div>
            ))}

            <div className="pt-3 border-t border-slate-100 dark:border-stone-800/80 text-[11px] text-slate-500 dark:text-stone-400 font-sans leading-relaxed">
              &bull; Delivered under formal Master Services Agreements (MSAs) with mutual non-disclosure and strict evidentiary data isolation.
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer Bar */}
      <div className="pt-6 border-t border-slate-200 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-stone-400">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>Confidential Scoping &bull; 1-Day Response SLA</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={close}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-stone-700 hover:bg-slate-100 dark:hover:bg-stone-800 text-slate-700 dark:text-stone-300 font-mono text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Dossier
          </button>

          <a
            href="#contact"
            onClick={handleActionClick}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              isBlue
                ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/25'
                : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/25'
            }`}
          >
            <span>Request Scope Briefing</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

    </div>
  );
};

export const ServiceModalRenderer: React.FC<{ 
  activeBrief: number; 
  data: any; 
  close: () => void;
  onOpenConsultation?: () => void;
}> = ({ activeBrief, data, close, onOpenConsultation }) => {
  return (
    <UnifiedCapabilityModal 
      data={data} 
      close={close} 
      onOpenConsultation={onOpenConsultation}
    />
  );
};
