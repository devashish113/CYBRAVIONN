import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Target, 
  BarChart3, 
  Zap, 
  Building2, 
  Heart, 
  Cloud, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Globe2, 
  X,
  Briefcase
} from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';
import { cyberAudio } from '../utils/cyberAudio';

interface WhyCybravionProps {
  isDarkMode?: boolean;
  onOpenAuditModal?: () => void;
}

export const WhyCybravion: React.FC<WhyCybravionProps> = ({ 
  isDarkMode = true, 
  onOpenAuditModal 
}) => {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  // 1. Four Compact Proof Pillars
  const pillars = [
    {
      tag: "SYNERGY",
      title: "OFFENSIVE + DEFENSIVE",
      desc: "Red team intelligence directly informs defensive architecture.",
      icon: Target,
      glow: "orange" as const
    },
    {
      tag: "EXECUTIVE",
      title: "BOARD-LEVEL RISK",
      desc: "Technical vulnerabilities translated into business impact.",
      icon: BarChart3,
      glow: "blue" as const
    },
    {
      tag: "LIFECYCLE",
      title: "CONTINUOUS GOVERNANCE",
      desc: "Security posture doesn't end with a static PDF report.",
      icon: Zap,
      glow: "orange" as const
    },
    {
      tag: "COMPLIANCE",
      title: "AUDIT READINESS",
      desc: "Compliance built into everyday security operations.",
      icon: ShieldCheck,
      glow: "blue" as const
    }
  ];

  // 2. Selected Engagements / Case Studies
  const caseStudies = [
    {
      id: 1,
      industry: "FinTech Payments",
      icon: Building2,
      title: "Securing Multi-Cloud Rails for a Series B FinTech Platform",
      glow: "blue" as const,
      problem: "A fast-scaling global payments provider lacked automated IAM policy validation and failed a preliminary SOC 2 Type II audit.",
      solution: "CYBRAVION engineered a Zero Trust IAM architecture across AWS & Azure, deployed centralized SIEM detection, and achieved SOC 2 Type II readiness in 60 days.",
      results: [
        { metric: "94%", label: "Attack Surface Reduction" },
        { metric: "60 Days", label: "To SOC 2 Type II Ready" },
        { metric: "Zero", label: "Post-Deploy Incidents" }
      ],
      role: "CTO, Global Payments Enterprise"
    },
    {
      id: 2,
      industry: "Healthcare Network",
      icon: Heart,
      title: "HIPAA & ISO 27001 ISMS Alignment for Hospital Chain",
      glow: "orange" as const,
      problem: "A multi-hospital healthcare provider faced regulatory penalties following medical device vulnerabilities and fragmented data privacy.",
      solution: "We conducted a full HIPAA & ISO 27001 gap assessment, rebuilt the ISMS suite, and trained 1,200+ staff on medical phishing defense.",
      results: [
        { metric: "100%", label: "HIPAA & DPDP Alignment" },
        { metric: "78%", label: "Drop in Phishing Clicks" },
        { metric: "3 Weeks", label: "Incident Response Rollout" }
      ],
      role: "CISO, Healthcare Network"
    },
    {
      id: 3,
      industry: "Enterprise SaaS",
      icon: Cloud,
      title: "VAPT Offensive Assessment & DevSecOps for Cloud Platform",
      glow: "blue" as const,
      problem: "An enterprise SaaS platform preparing for enterprise procurement discovered critical API authentication flaws during internal review.",
      solution: "CYBRAVION executed multi-vector VAPT covering GraphQL/REST APIs and built an automated CI/CD security gating pipeline.",
      results: [
        { metric: "23", label: "Critical CVEs Fixed" },
        { metric: "40%", label: "Faster Gated Releases" },
        { metric: "ISO 27001", label: "Certified in 4 Months" }
      ],
      role: "VP of Engineering, Enterprise SaaS"
    }
  ];

  // 3. Key Industries Supported
  const industries = [
    "Financial Services & Banking",
    "Healthcare & MedTech",
    "Government & Critical Infra",
    "Enterprise SaaS & Cloud"
  ];

  return (
    <section id="why-cybravion" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10 bg-slate-50/70 dark:bg-stone-950/60 border-t border-slate-200/80 dark:border-stone-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-2 block font-bold font-mono">
            WHY CYBRAVION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why High-Consequence Organizations Trust CYBRAVION
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl mt-3 font-normal mx-auto">
            Combining proactive offensive intelligence with unyielding regulatory governance to safeguard mission-critical assets.
          </p>
        </div>

        {/* Top Proof Bar / Stat Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 text-center shadow-sm">
            <div className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider mb-1">Registered Entity</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Govt. of India MCA</div>
            <div className="text-[10px] text-slate-500 dark:text-stone-400 font-mono mt-0.5">CIN: U62099DL2026PTC470901</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 text-center shadow-sm">
            <div className="text-xs font-mono font-bold text-blue-500 uppercase tracking-wider mb-1">Certified Frameworks</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">ISO 27001 &bull; SOC 2 &bull; NIST</div>
            <div className="text-[10px] text-slate-500 dark:text-stone-400 mt-0.5">DPDP Act &bull; GDPR &bull; HIPAA</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 text-center shadow-sm">
            <div className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider mb-1">Defense Scale</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">100+ Enterprise Assets</div>
            <div className="text-[10px] text-slate-500 dark:text-stone-400 mt-0.5">Zero-Trust Cloud &amp; Air-Gapped AI</div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 text-center shadow-sm">
            <div className="text-xs font-mono font-bold text-blue-500 uppercase tracking-wider mb-1">Sovereign Footprint</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Multi-Region Reach</div>
            <div className="text-[10px] text-slate-500 dark:text-stone-400 mt-0.5">India, Middle East, EU &amp; US</div>
          </div>
        </div>

        {/* 4 Compact Horizontal Proof Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isBlue = p.glow === 'blue';
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white/90 dark:bg-stone-900/70 border border-slate-200 dark:border-stone-800/90 shadow-sm hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-stone-800 ${
                    isBlue ? 'text-blue-600 dark:text-blue-400' : 'text-orange-500 dark:text-orange-400'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-stone-500">
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white mb-1.5">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-stone-300 font-normal leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Engagements / Case Studies */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-mono font-bold block mb-1">
                Proven Track Record
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Selected Client Engagements
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-stone-400 font-medium mr-1">Industries:</span>
              {industries.map((ind, i) => (
                <span 
                  key={i} 
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-stone-800 text-slate-700 dark:text-stone-300 border border-slate-200 dark:border-stone-700"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs) => {
              const Icon = cs.icon;
              return (
                <TiltCard3D key={cs.id} glowColor={cs.glow} className="!p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          {cs.industry}
                        </span>
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-stone-800 text-slate-700 dark:text-stone-300">
                          <Icon size={16} />
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2.5 leading-snug">
                        {cs.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-stone-300 font-normal leading-relaxed mb-4">
                        {cs.problem}
                      </p>

                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-stone-800/80 mb-4 bg-slate-50/50 dark:bg-stone-900/40 rounded-xl px-2">
                        {cs.results.map((r, i) => (
                          <div key={i} className="text-center">
                            <div className="text-xs font-bold text-orange-500 font-mono">{r.metric}</div>
                            <div className="text-[9px] text-slate-500 dark:text-stone-400 font-sans leading-tight mt-0.5">{r.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 dark:text-stone-400 font-mono">
                      &bull; Outcome Verified &bull; {cs.role}
                    </div>
                  </div>
                </TiltCard3D>
              );
            })}
          </div>
        </div>

        {/* Compact CTA to Contact Desk */}
        <div className="text-center">
          {onOpenAuditModal && (
            <button
              onClick={() => {
                cyberAudio.playClick();
                onOpenAuditModal();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold bg-slate-900 hover:bg-orange-500 text-white dark:bg-stone-900 dark:hover:bg-orange-600 border border-slate-700 dark:border-stone-700 transition-all cursor-pointer shadow-md group"
            >
              <span>Explore Custom Enterprise Scoping</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
