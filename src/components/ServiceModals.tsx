import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Layers, 
  FileText, 
  Code2, 
  Award, 
  Users, 
  Clock, 
  Check, 
  ExternalLink,
  ChevronRight,
  Mail,
  Compass
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface ModalData {
  title: string;
  tag?: string;
  subtitle?: string;
  desc: string;
  standards?: string[];
  whatWeDo?: string[];
  glow?: 'blue' | 'purple';
  route?: string;
  image?: string;
  icon?: React.ComponentType<{ className?: string; size?: number | string }>;
}

interface ServiceModalProps {
  data: ModalData;
  close: () => void;
  onOpenConsultation?: () => void;
  onNavigate?: (route: string) => void;
}

export const UnifiedCapabilityModal: React.FC<ServiceModalProps> = ({ 
  data, 
  close,
  onOpenConsultation,
  onNavigate 
}) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'deliverables' | 'compliance'>('blueprint');
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText('contact@cybravions.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Structured tangible deliverables clients actually receive
  const tangibleDeliverables = [
    {
      title: "Executive Risk Dossier",
      subtitle: "Board & C-Suite Reporting",
      desc: "High-level risk quantification mapping technical vulnerabilities directly to financial and regulatory liability, designed for board audit committees.",
      icon: FileText
    },
    {
      title: "Technical Remediation Matrix",
      subtitle: "Dev-Ready Implementation Backlog",
      desc: "Prioritized CVSS-scored vulnerabilities with reproducible proof-of-concept scripts and code-level remediation snippets for your engineering squad.",
      icon: Code2
    },
    {
      title: "Attestation of Compliance",
      subtitle: "Vendor & Insurance Assurance",
      desc: "Formally signed attestation letter confirming testing scope and zero critical unmitigated CVEs for customer procurement and cyber insurers.",
      icon: Award
    },
    {
      title: "Practice Lead Debrief",
      subtitle: "60-Min Interactive Strategy Session",
      desc: "Direct working session with our principal cybersecurity consultants to walk through findings, answer architecture questions, and advise on roadmap priorities.",
      icon: Users
    }
  ];

  // 4-Stage Engagement Blueprint
  const blueprintStages = [
    {
      num: "01",
      name: "Perimeter & Scope Mapping",
      time: "Day 1 – 3",
      desc: data.whatWeDo?.[0] || "Architecture review, asset discovery, and defining mutual rules of engagement under strict non-disclosure."
    },
    {
      num: "02",
      name: "Adversarial & Technical Assessment",
      time: "Week 1 – 2",
      desc: data.whatWeDo?.[1] || "Deep-dive vulnerability analysis, automated + manual penetration testing, and third-party risk analysis."
    },
    {
      num: "03",
      name: "Remediation Engineering Support",
      time: "Week 2 – 3",
      desc: data.whatWeDo?.[2] || "Root-cause triage, hands-on guidance with your engineering team, and verifying patch stability."
    },
    {
      num: "04",
      name: "Verification & Final Attestation",
      time: "Week 3 – 4",
      desc: data.whatWeDo?.[3] || "Delta re-testing to confirm complete remediation, followed by executive dossier delivery and sign-off."
    }
  ];

  return (
    <div className="relative z-10 w-full text-neutral-900 dark:text-neutral-100 max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col">
      
      {/* Editorial Hero Header with Atmospheric Background Image */}
      <div className="relative p-6 sm:p-8 md:p-10 border-b border-neutral-200 dark:border-white/[0.08] overflow-hidden bg-neutral-950 text-white">
        
        {/* Ambient Backdrop Image with High-End Vignette */}
        {data.image && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src={data.image} 
              alt={data.title}
              className="w-full h-full object-cover object-center opacity-30 filter saturate-0 contrast-125 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
          </div>
        )}

        <div className="relative z-10 max-w-3xl pr-12">
          {/* Practice Breadcrumb */}
          <div className="flex items-center gap-2 mb-3 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
            <span>CYBRAVIONS</span>
            <span className="text-neutral-600">/</span>
            <span>SERVICES</span>
            <span className="text-neutral-600">/</span>
            <span className="text-white font-semibold">{data.tag || 'PRACTICE'}</span>
          </div>

          {/* Service Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            {data.title}
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed mb-6 max-w-2xl">
            {data.subtitle || data.desc}
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md">
              <ShieldCheck size={14} className="text-white" />
              <span>In-House Practitioners</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md">
              <Lock size={13} className="text-white" />
              <span>Zero Customer Data Retention</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md">
              <Clock size={13} className="text-white" />
              <span>Rapid 48-Hour Mobilization</span>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Section Switcher */}
      <div className="px-6 sm:px-8 md:px-10 pt-6 pb-2 border-b border-neutral-200 dark:border-white/[0.06] bg-neutral-50/60 dark:bg-white/[0.01] sticky top-0 z-20 backdrop-blur-md flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              cyberAudio.playClick();
              setActiveTab('blueprint');
            }}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'blueprint'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Engagement Blueprint
          </button>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setActiveTab('deliverables');
            }}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'deliverables'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Tangible Deliverables
          </button>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setActiveTab('compliance');
            }}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'compliance'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            Standards &amp; Frameworks
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Practice</span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-6 sm:p-8 md:p-10 space-y-8 flex-1">
        
        {/* Executive Overview Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-100/70 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06]">
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2 font-semibold">
            Executive Summary
          </div>
          <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
            {data.desc}
          </p>
        </div>

        {/* Tab 1: Engagement Blueprint */}
        {activeTab === 'blueprint' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                <Compass size={15} />
                <span>Execution Methodology &amp; Timeline</span>
              </h3>
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Phase-Gated Delivery
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blueprintStages.map((stage) => (
                <div 
                  key={stage.num}
                  className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] hover:border-neutral-400 dark:hover:border-white/20 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                        STAGE {stage.num}
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-300">
                        {stage.time}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-2">
                      {stage.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Tangible Deliverables */}
        {activeTab === 'deliverables' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                <FileText size={15} />
                <span>Tangible Deliverables Provided to Your Team</span>
              </h3>
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Complete Artifact Dossier
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tangibleDeliverables.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] hover:border-neutral-400 dark:hover:border-white/20 transition-all flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-white/[0.06] flex items-center justify-center shrink-0 text-neutral-900 dark:text-white">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {item.title}
                      </h4>
                      <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mb-1.5">
                        {item.subtitle}
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Standards & Frameworks */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-900 dark:text-white flex items-center gap-2">
                <ShieldCheck size={15} />
                <span>Regulatory Standards &amp; Industry Alignment</span>
              </h3>
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Audit Attestation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {data.standards?.map((std: string, idx: number) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-white/[0.08] flex items-center justify-center text-neutral-950 dark:text-white shrink-0">
                    <Check size={13} strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-semibold font-mono text-neutral-800 dark:text-neutral-200">
                    {std}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed flex items-start gap-3">
              <Lock size={16} className="text-neutral-500 shrink-0 mt-0.5" />
              <span>
                All technical evaluations are conducted strictly under mutual Non-Disclosure Agreements (NDAs) with dedicated testing tenants and zero persistent storage of confidential client telemetry.
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Action Footer Bar (Monochrome Capsule Architecture) */}
      <div className="p-5 sm:p-6 md:px-10 border-t border-neutral-200 dark:border-white/[0.08] bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
        
        {/* Practice Contact Inquiries */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <Mail size={15} className="text-neutral-500" />
          <span>Direct Practice Inquiries:</span>
          <button 
            onClick={handleCopyEmail}
            className="font-semibold text-neutral-900 dark:text-white hover:underline cursor-pointer"
            title="Click to copy email address"
          >
            contact@cybravions.com
          </button>
          {copiedEmail && (
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold ml-1">
              Copied!
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          {data.route && onNavigate && (
            <button
              onClick={() => {
                cyberAudio.playClick();
                close();
                onNavigate(data.route!);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-full border border-neutral-300 dark:border-white/20 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Full Service Page</span>
              <ArrowRight size={13} />
            </button>
          )}

          <button
            onClick={close}
            className="px-4 py-2.5 rounded-full border border-neutral-300 dark:border-white/20 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>

          <a
            href="#contact"
            onClick={handleActionClick}
            className="px-6 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>Schedule Briefing</span>
            <ArrowRight size={13} />
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
  onNavigate?: (route: string) => void;
}> = ({ activeBrief, data, close, onOpenConsultation, onNavigate }) => {
  return (
    <UnifiedCapabilityModal 
      data={data} 
      close={close} 
      onOpenConsultation={onOpenConsultation}
      onNavigate={onNavigate}
    />
  );
};
