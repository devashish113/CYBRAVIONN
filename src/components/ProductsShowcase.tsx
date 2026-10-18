import React from 'react';
import { 
  Brain, 
  Gamepad2, 
  ArrowRight, 
  ShieldCheck, 
  ShieldAlert,
  BellRing,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { WaterGlassCard } from './WaterGlassCard';

interface ProductsShowcaseProps {
  setCurrentView: (view: string) => void;
  isDarkMode?: boolean;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({ 
  setCurrentView,
  isDarkMode: _isDarkMode = true 
}) => {
  const products = [
    {
      id: 'threatforge',
      num: '01',
      name: 'ThreatForge Platform',
      badge: 'THREAT MODELING',
      tagline: 'Automated STRIDE & PASTA Engine',
      desc: 'Automated threat modeling and attack surface mapping with live attack tree generation, CVSS 3.1 quantitative scoring, and air-gapped threat narratives.',
      icon: ShieldAlert,
      glow: 'amber' as const,
      features: [
        'Automated STRIDE & PASTA Analysis',
        'Interactive Attack Path Trees',
        'CVSS 3.1 Quantitative Scoring'
      ],
      actionLabel: 'Explore ThreatForge',
      targetView: 'threatforge'
    },
    {
      id: 'soc-ai',
      num: '02',
      name: 'SOC AI Triage',
      badge: 'AUTONOMOUS SOAR',
      tagline: 'Explainable AI Incident Investigation',
      desc: 'Sub-second autonomous SIEM alert investigation. Features SHAP explainable ML verdicts, ReAct investigation agents, and automated SOAR playbooks.',
      icon: BellRing,
      glow: 'cyan' as const,
      features: [
        'Sub-Second Alert Investigation',
        'SHAP Mathematical Explainability',
        'Automated Containment Playbooks'
      ],
      actionLabel: 'Explore SOC AI Triage',
      targetView: 'soc-ai'
    },
    {
      id: 'exception-manager',
      num: '03',
      name: 'AI Exception Manager',
      badge: 'COMPLIANCE GOVERNANCE',
      tagline: 'Automated Risk Waiver Platform',
      desc: 'Centralized compliance exception tracking platform with machine learning risk scoring, automated review workflows, and continuous policy drift governance.',
      icon: ShieldCheck,
      glow: 'emerald' as const,
      features: [
        'Automated Risk Scoring & Telemetry',
        'ISO 27001 & SOC 2 Waiver Tracking',
        'Tamper-Proof Audit PDF Reports'
      ],
      actionLabel: 'Open Exception Manager',
      targetView: 'exception-manager'
    },
    {
      id: 'cyberverse',
      num: '04',
      name: 'CyberRange Arena',
      badge: 'DEFENSE SANDBOX',
      tagline: 'Adversary Emulation & Hands-on Labs',
      desc: 'Browser-based hands-on cyber defense sandboxes, active adversary emulation scenarios, and interactive incident response training for technical teams.',
      icon: Gamepad2,
      glow: 'purple' as const,
      features: [
        'Interactive Kali & CTF Sandboxes',
        'Hands-on Cryptography & Web Exploits',
        'Real-World Incident Response Quests'
      ],
      actionLabel: 'Launch CyberRange Labs',
      targetView: 'cyberverse'
    },
    {
      id: 'threat-collector',
      num: '05',
      name: 'Threat Intel Collector',
      badge: 'INGESTION ENGINE',
      tagline: 'Unified MISP & OTX Intelligence Hub',
      desc: 'Ingests, deduplicates, and scores IOCs from MISP, AlienVault OTX, and URLhaus with automated STIX 2.1 air-gap export bundles for isolated enclaves.',
      icon: Radio,
      glow: 'blue' as const,
      features: [
        'Multi-Feed Ingestion (MISP, OTX, URLhaus)',
        'STIX 2.1 Unified Normalization',
        'Cryptographically Signed Air-Gap Bundles'
      ],
      actionLabel: 'Explore Intel Collector',
      targetView: 'threat-collector'
    },
    {
      id: 'ai',
      num: '06',
      name: 'Cybravions AI',
      badge: 'AIR-GAPPED SOVEREIGN AI',
      tagline: 'Private Enterprise Neural Appliance',
      desc: 'Deploy high-performance agentic AI directly inside private infrastructure with mathematical data isolation and zero cloud telemetry.',
      icon: Brain,
      glow: 'cyan' as const,
      features: [
        '100% Offline & Private VPC Isolation',
        'Zero Cloud Model Data Leakage',
        'Prompt Armor & Safety Boundary'
      ],
      actionLabel: 'Explore Cybravions AI',
      targetView: 'ai'
    }
  ];

  const handleProductClick = (view: string) => {
    cyberAudio.playClick();
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="products" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10 bg-transparent border-t border-neutral-200 dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Sarvam Craft */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-neutral-500 dark:text-neutral-400">
              Proprietary Defense Engines
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-white tracking-tight">
            Autonomous Platforms &amp; Sovereign Core
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-4 font-normal leading-relaxed">
            Engineered defense software and private neural appliances built to solve structural security, compliance, and governance challenges across sovereign enclaves.
          </p>
        </div>

        {/* 6 High-Craft Enterprise Product Cards with Glassmorphism & Water Surface Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => {
            const Icon = prod.icon;
            return (
              <WaterGlassCard 
                key={prod.id}
                accentGlow={prod.glow}
                className="p-7 sm:p-8 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-neutral-100 dark:bg-white/[0.05] border border-neutral-200 dark:border-white/10 backdrop-blur-md text-neutral-900 dark:text-white flex items-center justify-center transition-all duration-300 group-hover/water:scale-105 group-hover/water:border-neutral-300 dark:group-hover/water:border-white/30 shadow-xs">
                        <Icon size={20} aria-hidden="true" className="text-amber-500 dark:text-amber-400 transition-colors" />
                      </div>
                      <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500">
                        {prod.num}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-mono font-semibold tracking-wider px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 bg-neutral-100/80 dark:bg-white/[0.04] backdrop-blur-md shadow-xs">
                      {prod.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1.5 transition-colors group-hover/water:text-neutral-950 dark:group-hover/water:text-white">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-3 tracking-normal">
                    {prod.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed mb-6">
                    {prod.desc}
                  </p>

                  <div className="space-y-2.5 mb-7 pt-4 border-t border-neutral-200/80 dark:border-white/[0.08]">
                    {prod.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-800 dark:text-neutral-200">
                        <CheckCircle2 size={14} aria-hidden="true" className="text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleProductClick(prod.targetView)}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-auto bg-neutral-950/90 text-white hover:bg-neutral-900 dark:bg-white/[0.08] dark:text-white dark:border dark:border-white/15 dark:hover:bg-white dark:hover:text-neutral-950 dark:hover:border-white shadow-sm active:scale-[0.98] group/btn backdrop-blur-md"
                >
                  <span>{prod.actionLabel}</span>
                  <ArrowRight size={14} aria-hidden="true" className="group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                </button>
              </WaterGlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
