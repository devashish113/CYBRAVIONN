import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  ShieldCheck, 
  BarChart3, 
  Lock, 
  Cpu, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

interface SecurityModelProps {
  isDarkMode?: boolean;
}

export const SecurityModel: React.FC<SecurityModelProps> = ({ isDarkMode = true }) => {
  const pillars = [
    {
      stage: "01",
      name: "OFFENSIVE",
      tagline: "Adversary Simulation & VAPT",
      desc: "We test your systems through real-world attack techniques. Multi-layered penetration testing across web apps, APIs, cloud networks, and AI endpoints to discover vulnerabilities before malicious actors do.",
      icon: Target,
      glow: "orange" as const,
      highlights: [
        "Web, API & Mobile VAPT",
        "Cloud & Network Breach Emulation",
        "LLM & Prompt Injection Audits"
      ]
    },
    {
      stage: "02",
      name: "DEFENSIVE",
      tagline: "Zero-Trust & Sovereign Hardening",
      desc: "We build resilience directly into your architecture. Micro-segmentation, mathematical IAM boundaries, air-gapped sovereign AI containment, and automated SIEM/SOAR incident response playbooks.",
      icon: Lock,
      glow: "blue" as const,
      highlights: [
        "Zero-Trust IAM & Network Isolation",
        "Multi-Cloud (AWS/Azure/GCP) Hardening",
        "Air-Gapped Sovereign AI Appliances"
      ]
    },
    {
      stage: "03",
      name: "GOVERNANCE",
      tagline: "Continuous Compliance & ISMS",
      desc: "Security posture doesn't end with a report. We architect automated compliance frameworks, continuous risk registers, and audit readiness for ISO 27001, SOC 2 Type II, NIST CSF, and DPDP Act.",
      icon: ShieldCheck,
      glow: "orange" as const,
      highlights: [
        "ISO 27001 & SOC 2 Type II Readiness",
        "DPDP Act & GDPR Privacy Design",
        "Automated Risk Exception Tracking"
      ]
    }
  ];

  return (
    <section id="security-model" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-mono font-bold block mb-2">
            ENGINEERING PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The CYBRAVION Security Model
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base max-w-xl mt-3 font-normal mx-auto">
            A cohesive three-pillar methodology uniting offensive intelligence, defensive resilience, and continuous compliance.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isBlue = p.glow === 'blue';
            return (
              <TiltCard3D key={idx} glowColor={p.glow} className="!p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-2xl font-black font-mono text-slate-300 dark:text-stone-700">
                        {p.stage}
                      </span>
                      <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-stone-800/90 ${
                        isBlue ? 'text-blue-500' : 'text-orange-500'
                      }`}>
                        <Icon size={22} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold font-mono uppercase tracking-wide text-slate-900 dark:text-white mb-1">
                      {p.name}
                    </h3>
                    <p className={`text-xs uppercase font-semibold tracking-wider mb-4 ${
                      isBlue ? 'text-blue-500' : 'text-orange-500'
                    }`}>
                      {p.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 font-normal leading-relaxed mb-6">
                      {p.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-stone-800/80">
                    {p.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-stone-300 font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-blue-500' : 'bg-orange-500'}`} />
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
