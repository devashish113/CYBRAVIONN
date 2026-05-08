/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Cpu, 
  Search, 
  Globe, 
  Users, 
  HardDrive, 
  BarChart3, 
  ChevronRight,
  Menu,
  X,
  Mail,
  Phone,
  ArrowRight,
  TrendingUp,
  Star,
  Headphones
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-stone-950/95 backdrop-blur-sm py-3 border-b border-stone-700' : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Cybravion Logo" className="h-8 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
          <div className="flex flex-col">
            <span className="font-orbitron text-base md:text-lg font-bold tracking-[0.2em] uppercase leading-none">
              <span className="text-stone-100">CYBR</span><span className="text-blue-500">AVION</span>
            </span>
            <span className="text-[6px] md:text-[8px] uppercase tracking-[0.3em] font-semibold mt-1 text-stone-400">
              SECURE. <span className="text-blue-500">GOVERN.</span> EMPOWER.
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest text-stone-200 hover:text-stone-100 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-stone-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-stone-900 border-b border-stone-600 p-8 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-base uppercase tracking-widest text-stone-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-24 md:pt-32 pb-20">
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto flex flex-col items-center text-center relative"
        >
          {/* Subtle Background Noise Overlay */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-[100]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 w-full max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-8 lg:mt-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] text-white mb-8 tracking-tight drop-shadow-lg"
              >
                Secure your <br /><span className="font-light text-stone-300">digital infrastructure.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-base md:text-lg text-stone-400 mb-12 max-w-xl font-light leading-relaxed drop-shadow-md"
              >
                Leading cybersecurity consulting specializing in end-to-end governance, risk management, and strategic digital influence for the modern enterprise.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start w-full sm:w-auto"
              >
                <a 
                  href="#services"
                  className="px-6 py-3 md:px-10 md:py-4 bg-white text-stone-950 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold hover:bg-stone-200 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Explore Expertise
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#contact"
                  className="px-6 py-3 md:px-10 md:py-4 bg-orange-500 text-white rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold hover:bg-orange-600 transition-all text-center flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                >
                  Consult an Advisor
                </a>
              </motion.div>
            </div>

            {/* Right Column - All 8 Services */}
            <div className="hidden lg:flex relative w-full max-w-md">
              <div className="w-full grid grid-cols-2 gap-3">
                {[
                  { icon: <Shield size={16} />, name: "Governance & Compliance", color: "blue" },
                  { icon: <Lock size={16} />, name: "Security Testing", color: "orange" },
                  { icon: <Cpu size={16} />, name: "Cloud Architecture", color: "blue" },
                  { icon: <Globe size={16} />, name: "AI Risk Governance", color: "orange" },
                  { icon: <Search size={16} />, name: "Threat Intelligence", color: "blue" },
                  { icon: <Users size={16} />, name: "Digital Influence", color: "orange" },
                  { icon: <BarChart3 size={16} />, name: "Capability Development", color: "blue" },
                  { icon: <HardDrive size={16} />, name: "Product Advisory", color: "orange" }
                ].map((svc, i) => (
                  <motion.a
                    key={i}
                    href="#services"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                    className="bg-white/[0.04] backdrop-blur-md border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-white/[0.08] hover:border-white/15 transition-all duration-300 group"
                  >
                    <div className={`shrink-0 ${svc.color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`}>
                      {svc.icon}
                    </div>
                    <span className="text-stone-300 text-xs font-medium leading-tight group-hover:text-stone-100 transition-colors">{svc.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>


    </section>
  );
};

const CountUp = ({ value, duration = 2000 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * numericValue));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [numericValue, duration]);

  return <span>{count}{suffix}</span>;
};

const TrackRecord = () => {
  const metrics = [
    {
      id: 1,
      icon: <TrendingUp className="text-white" size={24} strokeWidth={2.5} />,
      value: "50+",
      label: "Enterprise & SME Projects Delivered"
    },
    {
      id: 2,
      icon: <Users className="text-white" size={24} strokeWidth={2.5} />,
      value: "30+",
      label: "Organizations Secured Globally"
    },
    {
      id: 3,
      icon: <Star className="text-white" size={24} strokeWidth={2.5} />,
      value: "95%",
      label: "Client Retention & Satisfaction"
    },
    {
      id: 4,
      icon: <Headphones className="text-white" size={24} strokeWidth={2.5} />,
      value: "24/7",
      label: "Advisory & Incident Support"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Cyber Grid Sub-layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Proven Results</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-stone-100 tracking-tight">Numbers that speak for themselves.</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric) => (
            <motion.div 
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: metric.id * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 cursor-default"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-stone-100 mb-3 tracking-tight font-sans">
                <CountUp value={metric.value} />
              </h3>
              <p className="text-stone-500 text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium leading-relaxed">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [activeBrief, setActiveBrief] = useState<number | null>(null);

  const serviceCategories = [
    { label: "Governance & Compliance", indices: [0, 1] },
    { label: "Security & Architecture", indices: [2, 3] },
    { label: "Intelligence & Influence", indices: [4, 5] },
    { label: "Growth & Advisory", indices: [6, 7] }
  ];

  const expertises = [
    {
      title: "Governance & Compliance",
      desc: "Align your business with global standards. Pass audits. Reduce regulatory risk.",
      outcome: "90% of clients achieve compliance readiness within 6 months",
      icon: <Shield className="w-6 h-6" />,
      color: "blue",
      standards: ["ISO 27001", "NIST CSF", "SOC 2", "GDPR"],
      whatWeDo: ["Build security policies that actually get followed", "Run enterprise-wide risk assessments", "Prepare you for audits before auditors arrive", "Assess vendor and third-party risk exposure"],
      process: ["Assess current compliance gaps", "Map controls to required standards", "Implement governance frameworks", "Continuous monitoring & audit support"],
      impact: ["Reduced regulatory penalties and audit failures", "Clear visibility into enterprise risk posture", "Faster onboarding of compliance-sensitive clients"]
    },
    {
      title: "Security Testing",
      desc: "We find security gaps and help you fix them before attackers do.",
      outcome: "Prevent breaches before they happen",
      icon: <Lock className="w-6 h-6" />,
      color: "orange",
      standards: ["OWASP Top 10", "PTES", "NIST SP 800-115"],
      whatWeDo: ["Penetration testing across web, mobile, and APIs", "Network and infrastructure vulnerability scanning", "Cloud environment security validation", "Actionable remediation roadmaps, not just reports"],
      process: ["Scope & reconnaissance", "Identify exploitable vulnerabilities", "Simulate real-world attack scenarios", "Deliver prioritized fix recommendations"],
      impact: ["Reduced attack surface across all digital assets", "Confidence before product launches and releases", "Evidence-based security posture for stakeholders"]
    },
    {
      title: "Cloud & Security Architecture",
      desc: "Build infrastructure that's secure by design, not secured after the fact.",
      outcome: "Resilient systems from day one",
      icon: <Cpu className="w-6 h-6" />,
      color: "blue",
      standards: ["Zero Trust", "CIS Benchmarks", "AWS/Azure Best Practices"],
      whatWeDo: ["Security architecture review and advisory", "Zero trust implementation guidance", "Identity and access management strategy", "Cloud security posture assessment"],
      process: ["Evaluate current architecture", "Identify design-level weaknesses", "Recommend security controls", "Validate implementation effectiveness"],
      impact: ["Fewer architecture-level vulnerabilities", "Secure cloud migration and digital transformation", "Reduced cost of retroactive security fixes"]
    },
    {
      title: "AI Risk Governance",
      desc: "Deploy AI responsibly. Manage risk without slowing innovation.",
      outcome: "Safe AI adoption with stakeholder trust",
      icon: <Globe className="w-6 h-6" />,
      color: "orange",
      standards: ["ISO/IEC 42001", "NIST AI RMF", "EU AI Act"],
      whatWeDo: ["AI governance framework development", "Ethical risk and bias analysis", "AI security review and model governance", "Responsible AI policy creation"],
      process: ["Assess AI usage and risk exposure", "Define governance policies", "Implement controls and safeguards", "Monitor and report on AI risk"],
      impact: ["Compliant AI deployments across the organization", "Reduced liability from AI-related decisions", "Increased stakeholder and customer trust"]
    },
    {
      title: "Threat Intelligence",
      desc: "Know what attackers know about you — before they use it.",
      outcome: "Early threat detection, fewer surprises",
      icon: <Search className="w-6 h-6" />,
      color: "blue",
      standards: ["MITRE ATT&CK", "OSINT Frameworks", "STIX/TAXII"],
      whatWeDo: ["Digital footprint and exposure analysis", "Adversary profiling and tracking", "Executive and brand threat monitoring", "Strategic intelligence reporting"],
      process: ["Map your digital exposure", "Monitor threat landscape", "Correlate intelligence data", "Deliver actionable threat briefs"],
      impact: ["Proactive threat response instead of reactive", "Protected executive and brand reputation", "Intelligence-led security decision making"]
    },
    {
      title: "Digital Influence",
      desc: "Protect your brand online. Monitor reputation. Control the narrative.",
      outcome: "Stronger brand trust and market perception",
      icon: <Users className="w-6 h-6" />,
      color: "orange",
      standards: ["Brand Intelligence", "SOCMINT", "Competitive Analysis"],
      whatWeDo: ["Digital brand strategy and monitoring", "Social media intelligence gathering", "Competitive and audience analysis", "Reputation risk assessment"],
      process: ["Audit current digital presence", "Identify reputation risks", "Deploy monitoring systems", "Strategic visibility planning"],
      impact: ["Faster response to brand threats", "Improved market positioning", "Data-driven engagement decisions"]
    },
    {
      title: "Capability Development",
      desc: "Your team is your first line of defense. Make them ready.",
      outcome: "Skilled teams that reduce human risk",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "blue",
      standards: ["CISSP", "CISA", "CompTIA Security+", "Custom Programs"],
      whatWeDo: ["Executive cyber awareness programs", "Technical security workshops", "GRC and risk management training", "Certification pathway support"],
      process: ["Assess team skill gaps", "Design targeted programs", "Deliver hands-on training", "Measure improvement and readiness"],
      impact: ["Fewer security incidents caused by human error", "Stronger internal security culture", "Faster incident response times"]
    },
    {
      title: "Product Advisory",
      desc: "Stop wasting budget on the wrong tools. Invest where it matters.",
      outcome: "Maximum security ROI from every dollar",
      icon: <HardDrive className="w-6 h-6" />,
      color: "orange",
      standards: ["Vendor Neutral", "ROI-Driven", "Business-Aligned"],
      whatWeDo: ["Security product evaluation and selection", "Technology stack assessment", "Deployment coordination and integration", "Post-deployment optimization"],
      process: ["Understand business requirements", "Evaluate vendor options", "Plan and coordinate deployment", "Optimize and measure ROI"],
      impact: ["Reduced spend on redundant security tools", "Faster time-to-value on new technology", "Aligned security stack with business goals"]
    }
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-4 md:gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-4 block font-semibold">Core Capabilities</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-stone-100 leading-tight">
              Identify vulnerabilities <br /><span className="font-light text-stone-300">before attackers do.</span>
            </h2>
          </div>
          <div className="md:text-right max-w-xs">
            <p className="text-stone-400 text-sm leading-relaxed">
              Proactive threat management and resilience for the modern enterprise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {expertises.map((item, idx) => {
            const isFeatured = idx === 0 || idx === 1; // GRC and VAPT featured
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                viewport={{ once: true, margin: "-30px" }}
                whileHover={{ scale: 1.03, y: -3 }}
                className={`p-5 md:p-6 bg-white/[0.02] backdrop-blur-xl border rounded-2xl group transition-all duration-400 cursor-pointer relative overflow-hidden ${
                  isFeatured ? 'border-white/20 ring-1 ring-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)]' : 'border-white/5 hover:border-white/10'
                } hover:bg-white/[0.04]`}
                onClick={() => setActiveBrief(idx)}
              >
                {/* Glow for featured items */}
                {isFeatured && (
                  <div className={`absolute -top-10 -right-10 w-24 h-24 blur-[40px] opacity-20 pointer-events-none rounded-full ${item.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'}`} />
                )}
                
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-400 bg-gradient-to-br ${item.color === 'blue' ? 'from-blue-500 to-transparent' : 'from-orange-500 to-transparent'}`} />
                
                <div className="relative z-10">
                  <div className={`p-2.5 w-fit rounded-xl mb-4 transition-all duration-400 group-hover:scale-110 ${
                    item.color === 'blue'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-sm font-semibold text-stone-100 mb-1.5 leading-snug">
                    {item.title}
                    {isFeatured && <span className="ml-2 text-[8px] px-1.5 py-0.5 rounded-md bg-white/10 text-white/60 font-bold tracking-tighter align-middle uppercase">Key</span>}
                  </h3>
                  <p className="text-stone-400 text-xs leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  
                  <button 
                    className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-bold transition-all duration-300 ${item.color === 'blue' ? 'text-blue-400/60 group-hover:text-blue-300' : 'text-orange-400/60 group-hover:text-orange-300'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveBrief(idx);
                    }}
                  >
                    Explore <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Technical Brief Modal */}
      <AnimatePresence>
        {activeBrief !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveBrief(null)}
              className="absolute inset-0 bg-stone-950/85 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-stone-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
                <button 
                  onClick={() => setActiveBrief(null)}
                  className="text-stone-400 hover:text-stone-100 p-2 bg-stone-800/80 hover:bg-stone-700/80 rounded-full backdrop-blur-md transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-12 overflow-y-auto relative z-10 w-full">
                {/* Header */}
                <div className="flex items-start gap-5 mb-10 pr-8">
                  <div className={`p-4 rounded-2xl shrink-0 ${expertises[activeBrief].color === 'blue' ? 'bg-blue-500/15 text-blue-400' : 'bg-orange-500/15 text-orange-400'}`}>
                    {expertises[activeBrief].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-stone-100 tracking-tight mb-2">{expertises[activeBrief].title}</h3>
                    <p className="text-stone-400 text-sm md:text-base font-light">{expertises[activeBrief].desc}</p>
                  </div>
                </div>

                {/* Standards */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {expertises[activeBrief].standards.map((s: string, si: number) => (
                    <span key={si} className="text-[10px] uppercase tracking-wider text-stone-400 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5 font-semibold">
                      {s}
                    </span>
                  ))}
                </div>

                {/* What We Do */}
                <div className="mb-10">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-stone-300 mb-5 font-bold flex items-center gap-3">
                    <span className="w-5 h-px bg-stone-600" /> What We Do
                  </h4>
                  <ul className="space-y-3">
                    {expertises[activeBrief].whatWeDo.map((item: string, wi: number) => (
                      <li key={wi} className="flex items-start gap-3 text-stone-300 text-sm md:text-base font-light">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${expertises[activeBrief].color === 'blue' ? 'bg-blue-400' : 'bg-orange-400'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How It Works - Process Flow */}
                <div className="mb-10">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-stone-300 mb-5 font-bold flex items-center gap-3">
                    <span className="w-5 h-px bg-stone-600" /> How It Works
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {expertises[activeBrief].process.map((step: string, pi: number) => (
                      <div key={pi} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-center relative">
                        <span className={`text-2xl font-bold block mb-2 ${expertises[activeBrief].color === 'blue' ? 'text-blue-400/40' : 'text-orange-400/40'}`}>
                          {String(pi + 1).padStart(2, '0')}
                        </span>
                        <p className="text-stone-300 text-xs font-medium leading-snug">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Impact */}
                <div className="mb-10">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-stone-300 mb-5 font-bold flex items-center gap-3">
                    <span className="w-5 h-px bg-stone-600" /> Business Impact
                  </h4>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                    <ul className="space-y-3">
                      {expertises[activeBrief].impact.map((item: string, ii: number) => (
                        <li key={ii} className="flex items-start gap-3 text-stone-300 text-sm font-light">
                          <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#contact"
                    onClick={() => setActiveBrief(null)}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-lg shadow-orange-500/10"
                  >
                    Request Consultation <ArrowRight size={14} />
                  </a>
                  <button 
                    onClick={() => setActiveBrief(null)}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] text-stone-300 rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Decorative glow */}
              <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[100px] pointer-events-none ${expertises[activeBrief].color === 'blue' ? 'bg-blue-500/5' : 'bg-orange-500/5'}`} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const About = () => {
  const capabilities = [
    { label: "Risk-driven security strategy", color: "blue" },
    { label: "Compliance-ready frameworks", color: "orange" },
    { label: "Cloud-first architecture", color: "blue" },
    { label: "Intelligence-led threat visibility", color: "orange" }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-stone-950/20 backdrop-blur-sm border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm md:text-base uppercase tracking-[0.4em] text-stone-400 mb-8 block font-semibold"
          >
            About Cybravion
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-stone-100 mb-10 leading-[1.1] tracking-tight"
          >
            We secure businesses. <br className="hidden md:block" />
            <span className="font-light text-stone-300">Not just networks.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-stone-400 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            CYBRAVION combines governance, testing, architecture, and intelligence under one strategic framework — so your security posture grows with your business.
          </motion.p>
        </div>

        {/* Capability Bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${cap.color === 'blue' ? 'bg-blue-400' : 'bg-orange-400'}`} />
              <span className="text-stone-300 text-sm font-medium">{cap.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-transparent relative overflow-hidden border-t border-white/10">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-stone-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="py-10">
            <span className="text-sm md:text-base uppercase tracking-[0.4em] text-stone-400 mb-8 block font-semibold">Partner With Cybravion</span>
            <h2 className="text-4xl md:text-6xl font-semibold text-stone-100 mb-10 tracking-tighter leading-tight">
              Ready to secure <br /><span className="font-light text-stone-300">your infrastructure?</span>
            </h2>
            <p className="text-stone-300 font-light mb-16 max-w-md text-lg leading-relaxed">
              Let's discuss how we can align your security posture with your business objectives. Reach out to our advisory team today.
            </p>

            <div className="space-y-10">
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-stone-300 group-hover:text-stone-100 group-hover:border-white/20 group-hover:bg-white/[0.05] transition-all duration-500">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-400 mb-1 font-bold">Email</p>
                  <p className="text-stone-300 text-xl font-light tracking-wide">cybravions@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-stone-300 group-hover:text-stone-100 group-hover:border-white/20 group-hover:bg-white/[0.05] transition-all duration-500">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-400 mb-1 font-bold">Phone</p>
                  <p className="text-stone-300 text-xl font-light tracking-wide">+91-9358683634</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] backdrop-blur-2xl p-8 md:p-14 rounded-3xl border border-white/5 shadow-2xl relative z-10"
            >
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-10">
                {/* Replace YOUR_ACCESS_KEY_HERE with your Web3Forms access key */}
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="space-y-3 group">
                    <label className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold ml-2 group-focus-within:text-stone-200 transition-colors">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-stone-100 focus:outline-none focus:bg-white/[0.05] focus:border-white/30 transition-all placeholder:text-stone-600 text-base" 
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold ml-2 group-focus-within:text-stone-200 transition-colors">Company</label>
                    <input 
                      type="text" 
                      name="organization"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-stone-100 focus:outline-none focus:bg-white/[0.05] focus:border-white/30 transition-all placeholder:text-stone-600 text-base" 
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold ml-2 group-focus-within:text-stone-200 transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-stone-100 focus:outline-none focus:bg-white/[0.05] focus:border-white/30 transition-all placeholder:text-stone-600 text-base" 
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-3 group">
                  <label className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold ml-2 group-focus-within:text-stone-200 transition-colors">Message</label>
                  <textarea 
                    rows={3}
                    name="message"
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-stone-100 focus:outline-none focus:bg-white/[0.05] focus:border-white/30 transition-all placeholder:text-stone-600 resize-none text-base leading-relaxed" 
                    placeholder="How can we help secure your business?"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full py-3 md:py-5 bg-stone-100 text-stone-950 text-xs md:text-base uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold rounded-xl hover:bg-white transition-all shadow-xl shadow-stone-950/50"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-stone-700 rounded-3xl -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-stone-950/60 backdrop-blur-md border-t border-white/10 py-10 overflow-hidden relative">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-3 mb-6 w-fit opacity-80 hover:opacity-100 transition-opacity">
              <img src="/logo.png" alt="Cybravion Logo" className="h-8 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-orbitron text-sm font-bold tracking-[0.2em] uppercase leading-none">
                  <span className="text-stone-100">CYBR</span><span className="text-blue-500">AVION</span>
                </span>
                <span className="text-[6px] uppercase tracking-[0.3em] font-semibold mt-1 text-stone-400">
                  SECURE. <span className="text-blue-500">GOVERN.</span> EMPOWER.
                </span>
              </div>
            </a>
            <p className="text-stone-400 text-xs leading-relaxed uppercase tracking-widest font-light">
              Integrated cybersecurity, digital intelligence, and resilience services through a business-aligned approach.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs uppercase tracking-[0.4em] text-stone-300 mb-4 font-bold">Expertise</h4>
              <ul className="space-y-2">
                {['Cyber GRC', 'VAPT Testing', 'AI Governance', 'OSINT Services'].map(item => (
                  <li key={item}><a href="#" className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.4em] text-stone-300 mb-4 font-bold">Inquiry</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors">Contact</a></li>
                <li><a href="#" className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-stone-800 flex justify-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 text-center">
            © {new Date().getFullYear()} CYBRAVION Solutions. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 scroll-smooth relative">
      {/* Fixed Background Video */}
      <div className="fixed inset-0 z-0 bg-stone-950">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-40"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-transparent to-stone-950/80 pointer-events-none" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <TrackRecord />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
