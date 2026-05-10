import { motion } from 'motion/react';
import { 
  Building2, Rocket, Heart, Landmark, ShoppingCart, Server,
  ArrowRight, ChevronRight
} from 'lucide-react';

const industries = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Startups",
    problem: "Scaling fast with limited security resources and investor pressure for compliance.",
    solution: "Lightweight security frameworks, SOC 2 readiness, and secure-by-default cloud architecture.",
    color: "blue"
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Enterprises",
    problem: "Complex multi-cloud environments with regulatory obligations across jurisdictions.",
    solution: "Enterprise GRC programs, ISO 27001 certification support, and continuous compliance monitoring.",
    color: "orange"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Healthcare",
    problem: "Sensitive patient data at risk with strict HIPAA and local privacy regulations.",
    solution: "Data privacy frameworks, access control audits, and staff security awareness programs.",
    color: "blue"
  },
  {
    icon: <Landmark className="w-6 h-6" />,
    title: "Finance & Banking",
    problem: "High-value targets for fraud, phishing, and APTs with zero tolerance for downtime.",
    solution: "Threat intelligence, VAPT, fraud detection architecture, and regulatory compliance advisory.",
    color: "orange"
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "E-Commerce",
    problem: "Customer data exposure, payment security, and PCI-DSS compliance requirements.",
    solution: "Application security testing, PCI compliance roadmaps, and secure payment infrastructure review.",
    color: "blue"
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Government & Public Sector",
    problem: "Critical infrastructure protection, citizen data privacy, and regulatory mandate compliance.",
    solution: "CERT-In alignment, security architecture review, and OSINT-based threat monitoring.",
    color: "orange"
  }
];

export const IndustrySolutions = () => {
  return (
    <section id="industries" className="py-24 md:py-32 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Industry Expertise</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            Solutions by <span className="bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent italic font-light">industry.</span>
          </h2>
          <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Every industry has unique threat vectors and compliance requirements. We adapt our approach accordingly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`p-6 md:p-8 bg-white/[0.02] backdrop-blur-xl border rounded-2xl group transition-all duration-400 relative overflow-hidden ${
                ind.color === 'blue' 
                  ? 'border-blue-500/10 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                  : 'border-orange-500/10 hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]'
              }`}
            >
              <div className={`absolute -top-12 -right-12 w-32 h-32 blur-[50px] opacity-0 group-hover:opacity-15 transition-opacity rounded-full pointer-events-none ${
                ind.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
              }`} />

              <div className={`p-3 w-fit rounded-xl mb-5 ${ind.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                {ind.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-4">{ind.title}</h3>
              
              <div className="space-y-3 mb-5">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold block mb-1">Challenge</span>
                  <p className="text-stone-400 text-sm font-light leading-relaxed">{ind.problem}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold block mb-1">How We Help</span>
                  <p className="text-stone-300 text-sm font-light leading-relaxed">{ind.solution}</p>
                </div>
              </div>

              <a href="#contact" className={`inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold transition-colors ${
                ind.color === 'blue' ? 'text-blue-400 hover:text-blue-300' : 'text-orange-400 hover:text-orange-300'
              }`}>
                Talk to an Expert <ChevronRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
