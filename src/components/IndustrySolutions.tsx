import React from 'react';
import { 
  Building2, Rocket, Heart, Landmark, ShoppingCart, Server,
  ArrowRight
} from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

const industries = [
  {
    icon: Rocket,
    title: "High-Growth Startups",
    problem: "Scaling fast with lean security headcount while under investor and enterprise customer audit pressure.",
    solution: "Rapid SOC 2 & ISO 27001 readiness roadmaps, developer-friendly VAPT, and secure-by-default cloud blueprints.",
    glow: "cyan" as const
  },
  {
    icon: Building2,
    title: "Global Enterprises",
    problem: "Complex multi-cloud hybrid infrastructure with fragmented risk visibility across multinational business units.",
    solution: "Comprehensive GRC governance, automated continuous compliance telemetry, and executive board reporting.",
    glow: "blue" as const
  },
  {
    icon: Heart,
    title: "Healthcare & MedTech",
    problem: "Critical electronic health record (EHR) exposure, medical device vulnerabilities, and stringent HIPAA compliance.",
    solution: "HIPAA & DPDP Act gap remediation, data masking governance, and medical API penetration testing.",
    glow: "purple" as const
  },
  {
    icon: Landmark,
    title: "Fintech & Banking",
    problem: "High-value attack surface targeting payment rails, transaction APIs, and strict zero-downtime mandates.",
    solution: "Threat actor intelligence, red teaming, PCI-DSS v4.0 advisory, and transaction microservice isolation.",
    glow: "orange" as const
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce & Retail",
    problem: "Mass customer credential stuffing, checkout session hijacking, and high-volume payment data exposure.",
    solution: "API perimeter hardening, bot mitigation governance, and continuous web application penetration testing.",
    glow: "cyan" as const
  },
  {
    icon: Server,
    title: "Government & Critical Infra",
    problem: "Advanced persistent threats (APTs), sovereign data privacy mandates, and critical utility protection.",
    solution: "NIST CSF alignment, CERT-In compliance protocols, and sovereign cloud security engineering.",
    glow: "blue" as const
  }
];

export const IndustrySolutions: React.FC = () => {
  return (
    <section id="industries" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-3 block font-bold">
            Tailored Cyber Blueprints
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Security Engineered by Industry
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-base md:text-lg max-w-2xl mt-4 font-light mx-auto">
            Every sector operates under distinct regulatory mandates and threat landscapes. Our frameworks adapt precisely to your operational reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <TiltCard3D key={i} glowColor={ind.glow}>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-blue-600 dark:text-blue-400 w-fit mb-5">
                      <Icon size={24} />
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{ind.title}</h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-stone-500 font-bold block mb-1">
                          Operational Challenge
                        </span>
                        <p className="text-xs text-slate-600 dark:text-stone-400 font-light leading-relaxed">
                          {ind.problem}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold block mb-1">
                          Cybravion Architecture
                        </span>
                        <p className="text-xs text-slate-700 dark:text-stone-300 font-light leading-relaxed">
                          {ind.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold pt-4 border-t border-slate-200 dark:border-stone-800/80 transition-colors"
                  >
                    <span>Request Sector Roadmap</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
