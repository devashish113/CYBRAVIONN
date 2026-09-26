import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  Gamepad2, 
  Fingerprint, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';
import { cyberAudio } from '../utils/cyberAudio';

interface ProductsShowcaseProps {
  setCurrentView: (view: string) => void;
  isDarkMode?: boolean;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({ 
  setCurrentView,
  isDarkMode = true 
}) => {
  const products = [
    {
      id: 'ai',
      name: 'Cybravions AI',
      badge: 'AIR-GAPPED SOVEREIGN AI',
      tagline: 'Private Enterprise Neural Appliance',
      desc: 'Deploy high-performance agentic AI directly inside private infrastructure with mathematical data isolation, zero cloud telemetry, and NIST AI RMF compliance.',
      icon: Brain,
      glow: 'blue' as const,
      features: [
        '100% Offline & Private VPC Isolation',
        'Zero Cloud Model Data Leakage',
        'Prompt Armor & Model Safety Boundary'
      ],
      actionLabel: 'Explore Cybravions AI',
      targetView: 'ai'
    },
    {
      id: 'cyberverse',
      name: 'CyberVerse Simulation Labs',
      badge: 'DEFENSE SANDBOX',
      tagline: 'Interactive Cyber Warfare Training',
      desc: 'Browser-based hands-on cyber defense sandboxes, active adversary emulation scenarios, and interactive incident response training for technical teams.',
      icon: Gamepad2,
      glow: 'orange' as const,
      features: [
        'Browser-Based Hands-On Sandboxes',
        'Red Team Exploit & Blue Team Defense',
        'Executive Crisis Tabletop Drills'
      ],
      actionLabel: 'Launch CyberVerse Labs',
      targetView: 'cyberverse'
    },
    {
      id: 'exception-manager',
      name: 'AI Exception Manager',
      badge: 'COMPLIANCE GOVERNANCE',
      tagline: 'Automated Risk Waiver Platform',
      desc: 'Centralized compliance exception tracking platform with machine learning risk scoring, automated review workflows, and continuous policy drift governance.',
      icon: Fingerprint,
      glow: 'blue' as const,
      features: [
        'Automated Risk Scoring & Telemetry',
        'ISO 27001 & SOC 2 Waiver Tracking',
        'Zero Unmonitored Policy Drift'
      ],
      actionLabel: 'Open Exception Manager',
      targetView: 'exception-manager'
    }
  ];

  const handleProductClick = (view: string) => {
    cyberAudio.playClick();
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="products" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10 bg-slate-50/50 dark:bg-stone-950/40 border-t border-slate-200/80 dark:border-stone-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-mono font-bold block mb-2">
            PROPRIETARY PLATFORMS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What We Build
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base max-w-xl mt-3 font-normal mx-auto">
            Engineered software and sovereign appliances designed to solve structural security and governance challenges.
          </p>
        </div>

        {/* 3 Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((prod) => {
            const Icon = prod.icon;
            const isBlue = prod.glow === 'blue';
            return (
              <TiltCard3D key={prod.id} glowColor={prod.glow}>
                <div className="flex flex-col h-full justify-between group p-2">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm group-hover:scale-110 transition-all duration-300 ${
                        isBlue 
                          ? 'text-blue-600 dark:text-blue-400 group-hover:border-blue-500/50 group-hover:bg-blue-500/10' 
                          : 'text-orange-500 dark:text-orange-400 group-hover:border-orange-500/50 group-hover:bg-orange-500/10'
                      }`}>
                        <Icon size={24} />
                      </div>
                      <span className={`text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${
                        isBlue
                          ? 'text-blue-500 border-blue-500/30 bg-blue-500/10'
                          : 'text-orange-500 border-orange-500/30 bg-orange-500/10'
                      }`}>
                        {prod.badge}
                      </span>
                    </div>

                    <h3 className={`text-xl font-bold text-slate-900 dark:text-white mb-1 transition-colors ${
                      isBlue ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400' : 'group-hover:text-orange-500 dark:group-hover:text-orange-400'
                    }`}>
                      {prod.name}
                    </h3>
                    <p className={`text-xs uppercase font-semibold mb-3 tracking-wider ${
                      isBlue ? 'text-blue-500' : 'text-orange-500'
                    }`}>
                      {prod.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 font-normal leading-relaxed mb-6">
                      {prod.desc}
                    </p>

                    <div className="space-y-2 mb-6 pt-2 border-t border-slate-100 dark:border-stone-800/80">
                      {prod.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-stone-300">
                          <span className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-blue-500' : 'bg-orange-500'}`} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleProductClick(prod.targetView)}
                    className={`w-full py-3.5 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-sm group/btn ${
                      isBlue
                        ? 'bg-slate-900 hover:bg-blue-600 text-white dark:bg-stone-900 dark:hover:bg-blue-600/30 border-slate-800 dark:border-stone-700/80 dark:hover:border-blue-500/60 dark:text-blue-300 dark:hover:text-white'
                        : 'bg-slate-900 hover:bg-orange-600 text-white dark:bg-stone-900 dark:hover:bg-orange-600/30 border-slate-800 dark:border-stone-700/80 dark:hover:border-orange-500/60 dark:text-orange-300 dark:hover:text-white'
                    }`}
                  >
                    <span>{prod.actionLabel}</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </TiltCard3D>
            );
          })}
        </div>

      </div>
    </section>
  );
};
