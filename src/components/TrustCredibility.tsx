import { motion } from 'motion/react';
import { ShieldCheck, Award, CheckCircle2, Quote } from 'lucide-react';

const certifications = [
  { name: "ISO/IEC 27001", desc: "Information Security Management" },
  { name: "SOC 2 Type II", desc: "Trust Service Criteria" },
  { name: "NIST CSF", desc: "Cybersecurity Framework" },
  { name: "ISO/IEC 42001", desc: "AI Management System" },
  { name: "DPDP Act", desc: "Digital Personal Data Protection" },
  { name: "CERT-In", desc: "Indian Cybersecurity Directives" }
];

const partnerTech = ["AWS", "Microsoft Azure", "Google Cloud", "CrowdStrike", "Splunk", "Tenable"];

const testimonials = [
  {
    quote: "CYBRAVION's GRC team helped us achieve ISO 27001 certification in under 5 months. Their structured approach and deep expertise made the entire process seamless.",
    name: "Head of IT",
    company: "FinTech Enterprise",
    color: "blue"
  },
  {
    quote: "After their VAPT engagement, we remediated 23 critical vulnerabilities we didn't know existed. Their reporting was clear, actionable, and board-ready.",
    name: "VP Engineering",
    company: "SaaS Platform",
    color: "orange"
  },
  {
    quote: "The security awareness training transformed our team's mindset. Phishing click rates dropped by 78% within the first quarter.",
    name: "CISO",
    company: "Healthcare Network",
    color: "blue"
  }
];

export const TrustCredibility = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Trust & Credibility</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            Built on <span className="bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent italic font-light">trust and expertise.</span>
          </h2>
        </motion.div>

        {/* Certifications & Standards */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold">Frameworks & Standards We Implement</span>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -2, scale: 1.03 }}
                className={`p-4 bg-white/[0.02] border rounded-2xl text-center transition-all group cursor-default ${
                  i % 2 === 0 
                    ? 'border-blue-500/10 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                    : 'border-orange-500/10 hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]'
                }`}
              >
                <div className={`text-sm font-bold mb-1 ${i % 2 === 0 ? 'text-blue-400' : 'text-orange-400'}`}>{cert.name}</div>
                <div className="text-[9px] uppercase tracking-wider text-stone-500 font-medium">{cert.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner Technologies */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-orange-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold">Technology Partners</span>
            </div>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {partnerTech.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                className="text-[10px] md:text-xs uppercase tracking-widest border rounded-full px-5 py-2.5 font-bold bg-white/[0.02] border-white/10 text-stone-300 hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Client Testimonials */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Quote className="w-5 h-5 text-blue-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold">What Clients Say</span>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 md:p-8 bg-white/[0.02] border rounded-2xl relative overflow-hidden ${
                  t.color === 'blue' ? 'border-blue-500/10' : 'border-orange-500/10'
                }`}
              >
                <div className={`absolute -top-8 -right-8 w-16 h-16 blur-[30px] opacity-20 rounded-full pointer-events-none ${
                  t.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
                }`} />
                <Quote className={`w-6 h-6 mb-4 ${t.color === 'blue' ? 'text-blue-500/30' : 'text-orange-500/30'}`} />
                <p className="text-stone-300 text-sm italic leading-relaxed mb-6 font-light">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    t.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-stone-500 text-[10px] uppercase tracking-wider">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
