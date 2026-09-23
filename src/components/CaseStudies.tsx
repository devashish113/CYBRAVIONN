import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, X, 
  Building2, Heart, Cloud
} from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

const caseStudies = [
  {
    id: 1,
    industry: "FinTech Payments",
    icon: Building2,
    title: "Securing Multi-Cloud Rails for a Series B FinTech Platform",
    glow: "blue" as const,
    problem: "A fast-scaling global payments provider lacked automated IAM policy validation, centralized SIEM observability, and failed a preliminary SOC 2 Type II audit.",
    solution: "CYBRAVION engineered a Zero Trust IAM architecture across AWS & Azure, deployed centralized SIEM detection rules, and guided the team to successful SOC 2 Type II certification in 60 days.",
    results: [
      { metric: "94%", label: "Reduction in attack surface" },
      { metric: "60 Days", label: "To SOC 2 Type II audit readiness" },
      { metric: "Zero", label: "Security incidents post-engagement" }
    ],
    testimonial: "CYBRAVION didn't just fix our security gaps — they engineered a resilient architecture that scales with our transaction volume.",
    role: "CTO, Global Payments Startup"
  },
  {
    id: 2,
    industry: "Healthcare Network",
    icon: Heart,
    title: "HIPAA & ISO 27001 ISMS Alignment for Hospital Chain",
    glow: "orange" as const,
    problem: "A multi-hospital healthcare network faced regulatory penalties following legacy medical device vulnerabilities and fragmented patient data privacy governance.",
    solution: "We conducted a full HIPAA & ISO 27001 gap assessment, rebuilt the complete ISMS documentation suite, trained 1,200+ staff on medical phishing defense, and established a 24/7 incident response protocol.",
    results: [
      { metric: "100%", label: "HIPAA & DPDP Act compliance alignment" },
      { metric: "78%", label: "Drop in phishing click rates" },
      { metric: "3 Weeks", label: "Rapid incident response rollout" }
    ],
    testimonial: "They transformed our hospital security culture from top to bottom. Our clinical staff and board now have total peace of mind.",
    role: "CISO, Healthcare Network"
  },
  {
    id: 3,
    industry: "Enterprise SaaS",
    icon: Cloud,
    title: "VAPT Offensive Assessment & DevSecOps for Cloud Platform",
    glow: "blue" as const,
    problem: "An enterprise SaaS platform preparing for enterprise procurement discovered critical API authentication flaws and unencrypted data transit during an internal review.",
    solution: "CYBRAVION executed multi-vector VAPT covering GraphQL/REST APIs, AWS VPC microservices, and designed an automated CI/CD security gating pipeline with automated SAST/DAST checks.",
    results: [
      { metric: "23", label: "Critical CVEs discovered & remediated" },
      { metric: "40%", label: "Faster release cycles with automated security" },
      { metric: "ISO 27001", label: "Audit achieved in 4 months" }
    ],
    testimonial: "The depth of their offensive testing was world-class. CYBRAVION helped us close enterprise deals with Fortune 500 security teams.",
    role: "VP of Engineering, Enterprise SaaS"
  }
];

export const CaseStudies: React.FC = () => {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  return (
    <section id="case-studies" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-slate-50/70 dark:bg-stone-950/60 border-t border-slate-200/80 dark:border-stone-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-3 block font-bold">
            Proven Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Enterprise Case Studies
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-base md:text-lg max-w-2xl mt-4 font-light mx-auto">
            Explore how we partnered with global technology companies to solve mission-critical security challenges and achieve rapid compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((cs) => {
            const Icon = cs.icon;
            return (
              <TiltCard3D key={cs.id} glowColor={cs.glow}>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {cs.industry}
                      </span>
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-slate-700 dark:text-stone-300">
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 leading-snug">
                      {cs.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-stone-300 font-light leading-relaxed mb-6">
                      {cs.problem}
                    </p>

                    {/* Metric Highlights */}
                    <div className="space-y-3 py-4 border-y border-slate-200 dark:border-stone-800/80 mb-6">
                      {cs.results.map((r, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 dark:text-stone-400 font-light">{r.label}</span>
                          <span className="font-bold text-sm text-blue-600 dark:text-blue-400">{r.metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedCase(cs.id)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-stone-900 dark:hover:bg-blue-500/20 border border-slate-300 dark:border-stone-800 hover:border-blue-400/40 text-xs text-slate-800 dark:text-stone-300 hover:text-blue-700 dark:hover:text-white font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>View Full Case Breakdown</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {expandedCase !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl">
            {caseStudies
              .filter((c) => c.id === expandedCase)
              .map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-white dark:bg-stone-950 border border-slate-200 dark:border-blue-500/30 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_30px_rgba(59,130,246,0.15)] relative max-h-[90vh] overflow-y-auto text-slate-900 dark:text-white"
                >
                  <button
                    onClick={() => setExpandedCase(null)}
                    className="absolute top-6 right-6 p-2 text-slate-500 dark:text-stone-400 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 cursor-pointer"
                  >
                    <X size={18} />
                  </button>

                  <span className="text-xs uppercase text-blue-600 dark:text-blue-400 tracking-wider block mb-2 font-semibold">
                    {c.industry} Case Study
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pr-8">
                    {c.title}
                  </h3>

                  <div className="space-y-6 text-sm">
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-stone-200 text-xs uppercase tracking-wider mb-2">
                        The Challenge
                      </h4>
                      <p className="text-slate-600 dark:text-stone-400 font-light leading-relaxed">
                        {c.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider mb-2">
                        The Cybravion Solution
                      </h4>
                      <p className="text-slate-700 dark:text-stone-300 font-light leading-relaxed">
                        {c.solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-600 dark:text-orange-400 text-xs uppercase tracking-wider mb-3">
                        Measurable Impact
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {c.results.map((r, i) => (
                          <div key={i} className="p-3.5 bg-slate-50 dark:bg-stone-900/80 rounded-2xl border border-slate-200 dark:border-stone-800 text-center">
                            <div className="font-bold text-lg text-blue-600 dark:text-blue-400 mb-1">{r.metric}</div>
                            <div className="text-[10px] text-slate-500 dark:text-stone-400">{r.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/20 italic text-slate-700 dark:text-stone-300 text-xs leading-relaxed">
                      "{c.testimonial}"
                      <span className="block not-italic text-[10px] text-blue-600 dark:text-blue-400 mt-2 font-semibold">— {c.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
