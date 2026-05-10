import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingDown, ShieldCheck, Clock, ArrowRight, X, 
  Building2, Heart, Cloud, ChevronRight 
} from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    industry: "FinTech",
    icon: <Building2 className="w-5 h-5" />,
    title: "Securing Cloud Infrastructure for a FinTech Startup",
    color: "blue",
    problem: "A fast-growing payments startup had scaled rapidly without a dedicated security team. Their AWS infrastructure lacked proper IAM policies, had no centralized logging, and failed a preliminary SOC 2 readiness check — putting their Series B funding at risk.",
    solution: "CYBRAVION conducted a full cloud security architecture review, implemented Zero Trust IAM policies, deployed centralized SIEM logging, and built a compliance roadmap for SOC 2 Type II certification within 90 days.",
    results: [
      { metric: "94%", label: "Reduction in critical vulnerabilities" },
      { metric: "60 days", label: "To SOC 2 audit readiness" },
      { metric: "Zero", label: "Security incidents post-engagement" }
    ],
    testimonial: "CYBRAVION didn't just fix our security gaps — they built a system that scales with us. Our investors were impressed.",
    role: "CTO, Payments Startup"
  },
  {
    id: 2,
    industry: "Healthcare",
    icon: <Heart className="w-5 h-5" />,
    title: "HIPAA-Aligned GRC Framework for Healthcare Provider",
    color: "orange",
    problem: "A multi-location healthcare network faced compliance pressure from regulators after a near-miss data exposure incident. Their existing policies were outdated, staff had no security awareness training, and incident response procedures were undocumented.",
    solution: "We performed a comprehensive gap assessment against HIPAA and ISO 27001, rebuilt the entire ISMS documentation suite, conducted organization-wide phishing simulation and awareness training, and established a formal incident response plan.",
    results: [
      { metric: "100%", label: "HIPAA compliance alignment" },
      { metric: "78%", label: "Drop in phishing click rates" },
      { metric: "3 weeks", label: "Incident response plan deployment" }
    ],
    testimonial: "They transformed our security culture from the ground up. Our staff now understands why security matters.",
    role: "CISO, Healthcare Network"
  },
  {
    id: 3,
    industry: "SaaS",
    icon: <Cloud className="w-5 h-5" />,
    title: "Enterprise VAPT & Security Architecture for SaaS Platform",
    color: "blue",
    problem: "An enterprise SaaS company preparing for ISO 27001 certification discovered multiple critical vulnerabilities during an internal audit. Their APIs had no rate limiting, session management was flawed, and there was no security testing pipeline.",
    solution: "CYBRAVION executed a full-scope VAPT across web applications, APIs, and cloud infrastructure. We then designed a secure SDLC pipeline with automated security testing gates and deployed a vulnerability management program.",
    results: [
      { metric: "23", label: "Critical vulnerabilities remediated" },
      { metric: "40%", label: "Faster release cycles with security gates" },
      { metric: "ISO 27001", label: "Certification achieved in 4 months" }
    ],
    testimonial: "The VAPT findings were eye-opening. CYBRAVION helped us ship faster AND more securely.",
    role: "VP Engineering, SaaS Platform"
  }
];

export const CaseStudies = () => {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  return (
    <section id="case-studies" className="py-24 md:py-32 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Proven Impact</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            Real-world <span className="bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent italic font-light">security outcomes.</span>
          </h2>
          <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            How we've helped organizations strengthen their security posture, achieve compliance, and reduce risk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`bg-white/[0.02] backdrop-blur-xl border rounded-2xl overflow-hidden group cursor-pointer transition-all duration-400 flex flex-col ${
                cs.color === 'blue' 
                  ? 'border-blue-500/15 hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]' 
                  : 'border-orange-500/15 hover:border-orange-500/40 hover:shadow-[0_0_35px_rgba(249,115,22,0.15)]'
              }`}
              onClick={() => setExpandedCase(cs.id)}
            >
              {/* Header */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 rounded-lg ${cs.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                    {cs.icon}
                  </div>
                  <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${cs.color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`}>
                    {cs.industry}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-4 leading-snug">{cs.title}</h3>
                
                <p className="text-stone-400 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                  {cs.problem}
                </p>

                {/* Results Preview */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {cs.results.map((r, j) => (
                    <div key={j} className="text-center">
                      <div className={`text-lg md:text-xl font-bold ${cs.color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`}>
                        {r.metric}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-stone-500 font-medium mt-1 leading-tight">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Footer */}
              <div className={`mt-auto px-6 md:px-8 py-4 border-t flex items-center justify-between ${
                cs.color === 'blue' ? 'border-blue-500/10' : 'border-orange-500/10'
              }`}>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">View Full Case</span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all group-hover:scale-110 ${
                  cs.color === 'blue' ? 'border-blue-500/30 text-blue-400' : 'border-orange-500/30 text-orange-400'
                }`}>
                  <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-xl shadow-orange-500/15 min-h-[48px]"
          >
            Discuss a Similar Use Case <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>

      {/* Expanded Case Study Modal */}
      <AnimatePresence>
        {expandedCase !== null && (() => {
          const cs = caseStudies.find(c => c.id === expandedCase)!;
          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpandedCase(null)}
                className="absolute inset-0 bg-stone-950/85 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-stone-900/95 backdrop-blur-2xl border rounded-3xl shadow-2xl p-8 md:p-10 ${
                  cs.color === 'blue' ? 'border-blue-500/20' : 'border-orange-500/20'
                }`}
              >
                <button 
                  onClick={() => setExpandedCase(null)}
                  className="absolute top-4 right-4 p-2 bg-stone-800/80 hover:bg-stone-700 rounded-full transition-colors"
                >
                  <X size={18} className="text-stone-400" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl ${cs.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                    {cs.icon}
                  </div>
                  <span className={`text-xs uppercase tracking-[0.3em] font-bold ${cs.color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`}>
                    {cs.industry}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-8">{cs.title}</h3>

                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-stone-500 font-bold mb-2">The Challenge</h4>
                    <p className="text-stone-300 text-sm leading-relaxed font-light">{cs.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.3em] text-stone-500 font-bold mb-2">Our Approach</h4>
                    <p className="text-stone-300 text-sm leading-relaxed font-light">{cs.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                  {cs.results.map((r, j) => (
                    <div key={j} className="text-center">
                      <div className={`text-2xl font-bold ${cs.color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`}>{r.metric}</div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-500 font-medium mt-1">{r.label}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className={`p-6 rounded-2xl border ${cs.color === 'blue' ? 'bg-blue-500/5 border-blue-500/10' : 'bg-orange-500/5 border-orange-500/10'}`}>
                  <p className="text-stone-200 text-sm italic leading-relaxed mb-3">"{cs.testimonial}"</p>
                  <p className="text-stone-500 text-xs font-bold uppercase tracking-wider">— {cs.role}</p>
                </div>

                <motion.a
                  href="#contact"
                  onClick={() => setExpandedCase(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  Discuss a Similar Use Case <ArrowRight size={16} />
                </motion.a>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};
