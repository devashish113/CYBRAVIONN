import { motion } from 'motion/react';
import { 
  FileText, Download, ExternalLink, ArrowRight, BookOpen,
  Shield, Cloud, Lock, Brain, AlertTriangle
} from 'lucide-react';

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
    color: "orange"
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
    color: "orange",
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
    color: "orange"
  }
];

export const Insights = () => {
  return (
    <section id="insights" className="py-24 md:py-32 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4"
        >
          <div className="max-w-2xl">
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Knowledge Hub</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Insights & <span className="bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent italic font-light">resources.</span>
            </h2>
          </div>
          <p className="text-stone-400 text-sm md:text-base max-w-xs leading-relaxed md:text-right font-light">
            Practical knowledge to help you make informed security decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <motion.a
              href="#contact"
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`p-6 md:p-8 bg-white/[0.02] backdrop-blur-xl border rounded-2xl group cursor-pointer transition-all duration-400 flex flex-col ${
                article.color === 'blue' 
                  ? 'border-blue-500/10 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]' 
                  : 'border-orange-500/10 hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.12)]'
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`p-2.5 rounded-xl ${article.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                  {article.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${
                    article.type === 'Whitepaper' 
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                      : article.type === 'Guide' 
                        ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' 
                        : 'bg-white/5 border-white/10 text-stone-400'
                  }`}>
                    {article.type}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-stone-100 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-stone-400 text-sm font-light leading-relaxed mb-6 flex-grow">
                {article.summary}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium">{article.readTime}</span>
                {article.downloadable ? (
                  <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    article.color === 'blue' ? 'text-blue-400 group-hover:text-blue-300' : 'text-orange-400 group-hover:text-orange-300'
                  }`}>
                    <Download size={14} /> Download
                  </div>
                ) : (
                  <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    article.color === 'blue' ? 'text-blue-400 group-hover:text-blue-300' : 'text-orange-400 group-hover:text-orange-300'
                  }`}>
                    Read <ExternalLink size={12} />
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Lead Capture CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 md:p-12 bg-white/[0.02] border border-white/10 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <FileText className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Get Our Free Startup Security Checklist</h3>
            <p className="text-stone-400 text-sm font-light mb-8 max-w-md mx-auto leading-relaxed">
              A practical, actionable checklist covering the 25 critical security controls every startup should implement before scaling.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 w-full bg-stone-950/60 border border-white/10 rounded-full px-5 py-3 text-white focus:outline-none focus:border-blue-500/40 transition-all text-sm placeholder:text-stone-500"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs uppercase tracking-widest font-bold transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap w-full sm:w-auto"
              >
                Download Guide
              </motion.button>
            </div>
            <p className="text-stone-600 text-[10px] uppercase tracking-widest mt-4 font-medium">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
