import { motion } from 'motion/react';
import { 
  FileText, Download, ExternalLink, BookOpen,
  Shield, Cloud, Lock, Brain, AlertTriangle
} from 'lucide-react';
import { WaterGlassCard } from './WaterGlassCard';

const articles = [
  {
    type: "Article",
    title: "What is VAPT and Why Every Business Needs It",
    summary: "A clear breakdown of Vulnerability Assessment and Penetration Testing — what it covers, how it works, and why it's non-negotiable for modern businesses.",
    icon: <Shield className="w-5 h-5" />,
    readTime: "6 min read",
    color: "blue"
  },
  {
    type: "Article",
    title: "Top 5 Cybersecurity Risks for Startups in 2025",
    summary: "From misconfigured cloud environments to insider threats — the critical vulnerabilities that most startups overlook until it's too late.",
    icon: <AlertTriangle className="w-5 h-5" />,
    readTime: "5 min read",
    color: "purple"
  },
  {
    type: "Guide",
    title: "Cloud Security Best Practices for AWS & Azure",
    summary: "A practical guide to securing cloud infrastructure — covering IAM hardening, network segmentation, encryption, and compliance controls.",
    icon: <Cloud className="w-5 h-5" />,
    readTime: "10 min read",
    color: "blue"
  },
  {
    type: "Guide",
    title: "How to Secure Your Startup Before Series A",
    summary: "A concise roadmap for early-stage startups to establish security foundations that satisfy investors and protect customer data.",
    icon: <Lock className="w-5 h-5" />,
    readTime: "8 min read",
    color: "purple",
    downloadable: true
  },
  {
    type: "Whitepaper",
    title: "AI Risk Governance: A Framework for Responsible Adoption",
    summary: "An executive briefing on managing AI-related risks, aligning with ISO 42001, and building digital trust across the enterprise.",
    icon: <Brain className="w-5 h-5" />,
    readTime: "15 min read",
    color: "blue",
    downloadable: true
  },
  {
    type: "Article",
    title: "ISO 27001 vs SOC 2: Which Compliance Framework Do You Need?",
    summary: "A side-by-side comparison of the two most requested compliance frameworks — helping you choose the right path for your organization.",
    icon: <BookOpen className="w-5 h-5" />,
    readTime: "7 min read",
    color: "purple"
  }
];

export const Insights = () => {
  return (
    <section id="insights" className="py-24 md:py-32 bg-transparent border-t border-slate-200/80 dark:border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4"
        >
          <div className="max-w-2xl">
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 mb-4 block font-bold">Knowledge Hub</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight">
              Insights & <span className="text-slate-900 dark:text-white font-semibold">resources.</span>
            </h2>
          </div>
          <p className="text-slate-600 dark:text-stone-400 text-sm md:text-base max-w-xs leading-relaxed md:text-right font-light">
            Practical knowledge to help you make informed security decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <WaterGlassCard
              key={i}
              className="p-6 md:p-8 flex flex-col justify-between"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white">
                      {article.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-widest font-mono font-bold px-2.5 py-1 rounded-full border bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-stone-300">
                        {article.type}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-stone-300 text-sm font-normal leading-relaxed mb-6 flex-grow">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/80 dark:border-white/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-stone-400 font-medium">{article.readTime}</span>
                  {article.downloadable ? (
                    <a 
                      href="#contact"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
                    >
                      <Download size={14} /> Download
                    </a>
                  ) : (
                    <a 
                      href="#contact"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
                    >
                      Read <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </WaterGlassCard>
          ))}
        </div>

        {/* Lead Capture CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 md:p-12 bg-white/90 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl text-center relative overflow-hidden shadow-lg dark:shadow-none"
        >

          
          <div className="relative z-10">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Get Our Free Startup Security Checklist</h3>
            <p className="text-slate-600 dark:text-stone-400 text-sm font-light mb-8 max-w-md mx-auto leading-relaxed">
              A practical, actionable checklist covering the 25 critical security controls every startup should implement before scaling.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 w-full bg-slate-50 dark:bg-stone-950/60 border border-slate-300 dark:border-white/10 rounded-full px-5 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-stone-500"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs uppercase tracking-widest font-bold transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap w-full sm:w-auto cursor-pointer"
              >
                Download Guide
              </motion.button>
            </div>
            <p className="text-slate-500 dark:text-stone-600 text-[10px] uppercase tracking-widest mt-4 font-medium">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
