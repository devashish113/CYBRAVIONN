import React from 'react';
import { 
  Brain,
  ShieldCheck, 
  Lock, 
  CheckCircle2
} from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

interface SecurityModelProps {
  isDarkMode?: boolean;
}

export const SecurityModel: React.FC<SecurityModelProps> = ({ isDarkMode: _isDarkMode = true }) => {
  const pillars = [
    {
      stage: "PILLAR 01",
      name: "Continuous GRC",
      tagline: "Governance, Risk & Compliance Architecture",
      desc: "Security posture doesn't end with a report. We architect automated compliance frameworks, continuous risk registers, and audit readiness for ISO 27001, SOC 2 Type II, and DPDP Act.",
      icon: ShieldCheck,
      highlights: [
        "ISO 27001 & SOC 2 Type II Readiness",
        "DPDP Act & GDPR Privacy Architecture",
        "Automated Risk Exception Registers"
      ]
    },
    {
      stage: "PILLAR 02",
      name: "Zero-Trust Defensive",
      tagline: "Architecture & Sovereign Hardening",
      desc: "We build resilience directly into your infrastructure. Micro-segmentation, mathematical IAM boundaries, multi-cloud hardening, and automated SIEM/SOAR incident response playbooks.",
      icon: Lock,
      highlights: [
        "Zero-Trust IAM & Network Isolation",
        "Multi-Cloud (AWS/Azure/GCP) Hardening",
        "Automated Incident Response Playbooks"
      ]
    },
    {
      stage: "PILLAR 03",
      name: "Sovereign AI Security",
      tagline: "Model Boundary & Defense Framework",
      desc: "We protect enterprise AI deployments with mathematical model boundaries, prompt armor, offline vector store isolation, and zero-telemetry neural appliance governance.",
      icon: Brain,
      highlights: [
        "Air-Gapped Sovereign AI Containment",
        "Prompt Armor & Safety Boundaries",
        "LLM & Vector Store Privacy Audits"
      ]
    }
  ];

  return (
    <section id="security-model" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10 bg-transparent border-t border-neutral-200 dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-2 block">
            ENGINEERING PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            The CYBRAVION Security Model
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base max-w-xl mt-3 font-normal mx-auto leading-relaxed">
            A cohesive three-pillar methodology uniting continuous GRC governance, zero-trust defensive resilience, and sovereign AI security.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <TiltCard3D key={idx}>
                <div className="flex flex-col h-full justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 tracking-wider">
                        {p.stage}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] text-neutral-900 dark:text-white flex items-center justify-center transition-colors group-hover:border-neutral-300 dark:group-hover:border-white/20">
                        <Icon size={20} aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-3 tracking-normal">
                      {p.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed mb-6">
                      {p.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-neutral-200 dark:border-white/[0.06]">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-800 dark:text-neutral-200">
                        <CheckCircle2 size={13} aria-hidden="true" className="text-neutral-500 dark:text-neutral-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>

      </div>
    </section>
  );
};

