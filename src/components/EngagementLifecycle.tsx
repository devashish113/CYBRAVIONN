import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileCheck, 
  ShieldAlert, 
  Code2, 
  BarChart4, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Lock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface PhaseData {
  number: string;
  title: string;
  timeline: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  deliverables: string[];
  slaGuarantee: string;
  themeColor: 'blue' | 'orange';
}

const phases: PhaseData[] = [
  {
    number: "01",
    title: "Confidential Scoping & Mutual NDA",
    timeline: "Day 1 – 3",
    subtitle: "Zero-Friction Onboarding & Target Boundary Mapping",
    description: "Every engagement commences with strict two-way non-disclosure (NDA) execution, threat perimeter scoping, and credential/API boundary isolation without business downtime.",
    icon: Lock,
    deliverables: [
      "Executed Mutual Non-Disclosure Agreement (NDA)",
      "Target attack surface & API perimeter inventory",
      "Rules of Engagement (RoE) & emergency contact protocol",
      "Executive kickoff briefing with technical stakeholders"
    ],
    slaGuarantee: "Same-Day Legal & Scoping Execution",
    themeColor: "blue"
  },
  {
    number: "02",
    title: "Offensive Emulation & GRC Architecture",
    timeline: "Weeks 1 – 2",
    subtitle: "Deep-Vector Penetration Testing & ISMS Gap Analysis",
    description: "Our certified red team emulates active adversaries across applications, cloud environments, and AI endpoints while our GRC specialists map your controls against ISO 27001, SOC 2, and NIST CSF 2.0.",
    icon: ShieldAlert,
    deliverables: [
      "Full VAPT exploit log with verified proof-of-concept (PoC)",
      "CVSS v3.1 / v4.0 severity scoring & exploitability matrices",
      "Target compliance gap analysis (ISO 27001 / SOC 2 / HIPAA)",
      "Threat telemetry mapping against MITRE ATT&CK framework"
    ],
    slaGuarantee: "Zero Disruption to Live Production Workloads",
    themeColor: "orange"
  },
  {
    number: "03",
    title: "Engineering Remediation & CI/CD Gating",
    timeline: "Weeks 3 – 4",
    subtitle: "Direct Developer Advisory & Automated Security Guardrails",
    description: "We don't simply hand over a PDF report and leave. Our defensive engineers pair directly with your developers and DevOps teams to write patches, harden IaC scripts, and embed automated security gates.",
    icon: Code2,
    deliverables: [
      "Line-by-line remediation blueprints for engineering leads",
      "Automated CI/CD security linting & IaC guardrail rules",
      "Re-testing validation & official vulnerability clearance certificate",
      "Formal ISMS policies, risk registers & vendor tiering suite"
    ],
    slaGuarantee: "100% Retest Verification Included",
    themeColor: "blue"
  },
  {
    number: "04",
    title: "Executive Board Debrief & Ongoing Governance",
    timeline: "Ongoing 24/7",
    subtitle: "C-Suite Risk Translation & Continuous Audit Assurance",
    description: "We translate complex vulnerability data into financial risk metrics for CEOs, boards of directors, and audit committees, backed by ongoing advisory and rapid zero-day incident response SLAs.",
    icon: BarChart4,
    deliverables: [
      "Board-ready Executive Cybersecurity & Risk Summary",
      "Official Third-Party Compliance & Attestation Dossier",
      "Quarterly posture health scorecards & threat updates",
      "24/7 Dedicated Incident Response & Triage SLA"
    ],
    slaGuarantee: "< 15 Min Zero-Day Threat Triage SLA",
    themeColor: "orange"
  }
];

interface EngagementLifecycleProps {
  isDarkMode?: boolean;
  onConsultClick?: () => void;
}

export const EngagementLifecycle: React.FC<EngagementLifecycleProps> = ({ isDarkMode, onConsultClick }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = phases[activePhaseIndex];
  const Icon = activePhase.icon;
  const isBlue = activePhase.themeColor === 'blue';

  const handleSelectPhase = (index: number) => {
    cyberAudio.playClick();
    setActivePhaseIndex(index);
  };

  return (
    <section id="lifecycle" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-slate-50/70 dark:bg-stone-950/60 border-t border-slate-200/80 dark:border-stone-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-3 block font-bold">
            The Client Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight">
            How High-Consequence Enterprises Partner With Us
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-base md:text-lg max-w-2xl mt-4 font-light mx-auto">
            From day-one non-disclosure to board-ready certification, our structured 4-phase lifecycle guarantees total operational transparency and measurable risk reduction.
          </p>
        </div>

        {/* Phase Step Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {phases.map((phase, idx) => {
            const isSelected = activePhaseIndex === idx;
            const StepIcon = phase.icon;
            return (
              <button
                key={phase.number}
                onClick={() => handleSelectPhase(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-stone-900 border-blue-500/60 dark:border-blue-500/80 shadow-[0_10px_30px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/30'
                    : 'bg-white/60 dark:bg-stone-900/40 border-slate-200 dark:border-stone-800/80 hover:border-slate-300 dark:hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold tracking-widest ${
                    isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-stone-500'
                  }`}>
                    PHASE {phase.number}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-stone-800 text-slate-600 dark:text-stone-400">
                    {phase.timeline}
                  </span>
                </div>
                <div className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {phase.title}
                </div>
                {isSelected && (
                  <motion.div 
                    layoutId="phaseActiveIndicator" 
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full" 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        <div className="bg-white dark:bg-stone-900/80 rounded-3xl border border-slate-200/90 dark:border-stone-800 p-6 md:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[90px] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Left Column: Scope & Overview */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className={`p-3.5 rounded-2xl bg-slate-100 dark:bg-stone-800 border shrink-0 ${
                    isBlue ? 'text-blue-600 dark:text-blue-400 border-blue-500/30' : 'text-orange-500 dark:text-orange-400 border-orange-500/30'
                  }`}>
                    <Icon size={26} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400">
                        Phase {activePhase.number} • {activePhase.timeline}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {activePhase.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-stone-400 font-mono">
                  {activePhase.subtitle}
                </p>

                <p className="text-slate-700 dark:text-stone-300 font-light text-base leading-relaxed">
                  {activePhase.description}
                </p>

                {/* SLA Quality Guarantee Callout */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-stone-950/70 border border-slate-200 dark:border-stone-800/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={18} className="text-orange-500 dark:text-orange-400 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-stone-400 font-semibold">Service Level Guarantee</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">{activePhase.slaGuarantee}</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold border border-blue-500/20 uppercase tracking-wider">
                    VERIFIED SLA
                  </span>
                </div>
              </div>

              {/* Right Column: Tangible Deliverables Box */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-stone-950/90 rounded-2xl border border-slate-200 dark:border-stone-800 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-stone-800">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-800 dark:text-stone-200 flex items-center gap-2 font-mono">
                    <Layers size={14} className="text-blue-500" /> Key Phase Deliverables
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">4 Items</span>
                </div>

                <div className="space-y-3">
                  {activePhase.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-stone-900/60 border border-slate-200/80 dark:border-stone-800 text-xs text-slate-800 dark:text-stone-300">
                      <CheckCircle2 size={16} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold font-mono uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
                >
                  <span>Initiate Phase 01 Scoping</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
