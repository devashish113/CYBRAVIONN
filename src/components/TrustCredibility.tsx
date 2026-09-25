import React from 'react';
import { ShieldCheck, Award, Quote } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

const certifications = [
  { name: "ISO/IEC 27001", desc: "Information Security Management", glow: "blue" as const },
  { name: "SOC 2 Type II", desc: "Trust Service Criteria", glow: "blue" as const },
  { name: "NIST CSF 2.0", desc: "Cybersecurity Framework", glow: "orange" as const },
  { name: "ISO/IEC 42001", desc: "AI Management System", glow: "blue" as const },
  { name: "DPDP & GDPR", desc: "Digital Personal Data Protection", glow: "orange" as const },
  { name: "CERT-In Directives", desc: "National Cyber Security Mandate", glow: "blue" as const }
];

const partnerTech = [
  { name: "AWS", category: "Cloud Security" },
  { name: "Microsoft Azure", category: "Cloud Architecture" },
  { name: "Google Cloud", category: "Cloud Infrastructure" },
  { name: "CrowdStrike", category: "Endpoint & EDR" },
  { name: "Splunk", category: "SIEM & SOC Logging" },
  { name: "Tenable", category: "Vulnerability Management" }
];

const testimonials = [
  {
    quote: "CYBRAVION's GRC team helped us achieve ISO 27001 and SOC 2 Type II certification in under 4 months with zero audit non-conformities. Their technical rigor is unmatched.",
    name: "Head of Information Security",
    company: "Global FinTech Enterprise",
    glow: "blue" as const
  },
  {
    quote: "During their offensive red-team engagement, they uncovered and helped us patch 23 deep architectural vulnerabilities before our Series C audit. The executive reporting was flawless.",
    name: "VP of Engineering",
    company: "High-Growth Cloud Platform",
    glow: "orange" as const
  },
  {
    quote: "Their sovereign security architecture and threat intelligence integration reduced our mean time to detect (MTTD) by over 80%. They are a true force multiplier for our security team.",
    name: "Chief Information Security Officer",
    company: "Healthcare & MedTech Network",
    glow: "blue" as const
  }
];

export const TrustCredibility: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-3 block font-bold">
            Trust &amp; Validation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Industry Standards &amp; Certified Frameworks
          </h2>
        </div>

        {/* 3D Framework Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {certifications.map((cert, i) => (
            <TiltCard3D key={i} glowColor={cert.glow} className="!p-5 text-center">
              <div className="flex flex-col items-center justify-center h-full">
                <ShieldCheck size={24} className="text-blue-500 dark:text-blue-400 mb-3" />
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{cert.name}</div>
                <div className="text-[10px] text-slate-500 dark:text-stone-400 font-sans leading-tight">{cert.desc}</div>
              </div>
            </TiltCard3D>
          ))}
        </div>

        {/* Technology Ecosystem */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-xs uppercase text-slate-600 dark:text-stone-400 tracking-widest font-bold flex items-center justify-center gap-2">
              <Award size={16} className="text-orange-500 dark:text-orange-400" />
              Technology Ecosystem &amp; Integration Partners
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partnerTech.map((tech, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white/90 dark:bg-stone-900/60 border border-slate-200 dark:border-stone-800 text-center hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-colors shadow-sm"
              >
                <div className="font-semibold text-sm text-slate-800 dark:text-stone-200">{tech.name}</div>
                <div className="text-[10px] text-slate-500 dark:text-stone-400 mt-0.5">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Testimonial Cards */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Enterprise Client Testimonials</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <TiltCard3D key={idx} glowColor={t.glow}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <Quote size={28} className="text-blue-500/40 mb-4" />
                    <p className="text-sm text-slate-700 dark:text-stone-300 font-light leading-relaxed mb-6 italic">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 dark:border-stone-800/80">
                    <div className="font-semibold text-xs text-slate-900 dark:text-white">{t.name}</div>
                    <div className="text-[11px] text-blue-600 dark:text-blue-400 font-sans font-medium">{t.company}</div>
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
