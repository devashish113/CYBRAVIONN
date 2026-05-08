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
  ChevronDown,
  Menu,
  X,
  Mail,
  Phone,
  ArrowRight,
  TrendingUp,
  Star,
  Headphones,
  CheckCircle2,
  Zap,
  Target,
  Eye,
  BookOpen,
  Award,
  Layers,
  Brain,
  Radar,
  GraduationCap,
  ShieldCheck,
  FileCheck
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

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: ["0%", "100%"],
            opacity: [0, 0.4, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: Math.random() * 10 + 20, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * -10}%`,
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-24 md:pt-32 pb-20">
      <FloatingParticles />
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative">
          {/* Subtle Background Noise Overlay */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-[100]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 w-full max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
              
              <motion.h1 
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 80,
                  damping: 12,
                  duration: 0.8
                }}
                className="mt-8 lg:mt-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] text-white mb-8 tracking-tight drop-shadow-lg"
              >
                Secure your <br /><span className="font-light text-stone-300">digital infrastructure.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.25, 
                  ease: [0.21, 0.45, 0.32, 0.9] 
                }}
                className="text-base md:text-lg text-stone-400 mb-12 max-w-xl font-light leading-relaxed drop-shadow-md"
              >
                Leading cybersecurity consulting specializing in end-to-end governance, risk management, and strategic digital influence for the modern enterprise.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.45 
                }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start w-full sm:w-auto"
              >
                <motion.a 
                  href="#services"
                  whileHover={{ scale: 1.02, brightness: 1.1 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 md:px-10 md:py-4 bg-white text-stone-950 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Explore Expertise
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.02, brightness: 1.1 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 md:px-10 md:py-4 bg-orange-500 text-white rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all text-center flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                >
                  Consult an Advisor
                </motion.a>
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                      delay: 0.6 + i * 0.08 
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                    className="bg-white/[0.04] backdrop-blur-md border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-300 group"
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
        </div>
      </div>
    </section>
  );
};

const CountUp = ({ value, duration = 2000 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const isSpecial = value.includes('/');
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isSpecial) return; // Don't animate complex strings like 24/7
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
  }, [numericValue, duration, isSpecial]);

  if (isSpecial) return <span>{value}</span>;
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
          {metrics.map((metric, idx) => (
            <motion.div 
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: metric.id * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`bg-white/[0.02] backdrop-blur-xl border rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-all duration-500 cursor-default relative overflow-hidden group ${
                idx % 2 === 0 ? 'border-blue-500/10 hover:border-blue-500/30' : 'border-orange-500/10 hover:border-orange-500/30'
              }`}
            >
              <div className={`absolute -top-10 -right-10 w-24 h-24 blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity rounded-full pointer-events-none ${
                idx % 2 === 0 ? 'bg-blue-500' : 'bg-orange-500'
              }`} />
              
              <h3 className={`text-4xl md:text-5xl font-bold mb-3 tracking-tight font-sans ${
                idx % 2 === 0 ? 'text-blue-400' : 'text-orange-400'
              }`}>
                <CountUp value={metric.value} />
              </h3>
              <p className="text-stone-400 text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{metric.label}</p>
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
      title: "Cybersecurity Governance, Risk & Compliance (GRC)",
      desc: "Establish strong governance structures, enterprise-wide risk visibility, and compliance maturity.",
      outcome: "Ensure resilience, accountability, and audit readiness for global standards.",
      icon: <Shield className="w-6 h-6" />,
      color: "blue",
      standards: ["ISO/IEC 27001", "NIST CSF", "SOC 2", "DPDP Act", "CERT-In"],
      whatWeDo: [
        "Develop information security policies, standards, and procedures",
        "Enterprise risk assessments and risk register management",
        "ISMS documentation and vendor/third-party risk management",
        "Business continuity (BCP) and disaster recovery (DRP) planning",
        "Compliance gap assessments and audit readiness programs"
      ],
      process: ["Assess Compliance Gaps", "Map Framework Controls", "Implement Governance", "Continuous Monitoring"],
      impact: [
        "Reduced regulatory penalties and audit failures",
        "Integrated security into business decision-making",
        "Strengthened security posture and audit readiness"
      ]
    },
    {
      title: "VAPT Coordination & Security Testing",
      desc: "Identify, prioritize, and address vulnerabilities across applications, networks, and cloud environments.",
      outcome: "Reduce exploitable attack surfaces and improve security hygiene.",
      icon: <Lock className="w-6 h-6" />,
      color: "orange",
      standards: ["OWASP Top 10", "Vulnerability Lifecycle", "Remediation Governance"],
      whatWeDo: [
        "Web and mobile application security testing (VAPT)",
        "API security testing and network security assessments",
        "Cloud security reviews and infrastructure validation",
        "Remediation tracking and security issue prioritization",
        "Re-testing validation and vulnerability lifecycle management"
      ],
      process: ["Scope & Reconnaissance", "Vulnerability Assessment", "Exploitation & Penetration", "Remediation Governance"],
      impact: [
        "Proactive identification of exploitable gaps",
        "Prioritized remediation based on business risk",
        "Evidence-based security assurance for stakeholders"
      ]
    },
    {
      title: "Security Architecture & Assurance",
      desc: "Embed security-by-design principles into enterprise technology and technology ecosystems.",
      outcome: "Build resilient infrastructure and secure application foundations.",
      icon: <Cpu className="w-6 h-6" />,
      color: "blue",
      standards: ["Zero Trust", "CIS Benchmarks", "Security-by-Design"],
      whatWeDo: [
        "Enterprise security architecture and network design review",
        "Cloud security architecture assessment and Zero Trust advisory",
        "Identity and Access Management (IAM) strategy and reviews",
        "Data protection architecture and segmentation strategies",
        "Security assurance validation for digital transformation"
      ],
      process: ["Evaluate Ecosystem", "Review Security Design", "Develop Secure Baselines", "Validation Assurance"],
      impact: [
        "Controls integrated proactively rather than reactively",
        "Secure cloud migration and digital transformation",
        "Fewer architecture-level vulnerabilities and design flaws"
      ]
    },
    {
      title: "AI Risk Governance & Digital Trust",
      desc: "Implement responsible AI governance frameworks and digital trust mechanisms.",
      outcome: "Balance innovation with accountability and stakeholder trust.",
      icon: <Globe className="w-6 h-6" />,
      color: "orange",
      standards: ["ISO/IEC 42001", "NIST AI RMF", "Ethical AI"],
      whatWeDo: [
        "Alignment support for ISO/IEC 42001 (AI Management System)",
        "AI governance framework advisory and risk assessment",
        "Responsible AI policy development and ethical risk analysis",
        "AI security review and model governance awareness",
        "Digital trust advisory and AI vendor risk considerations"
      ],
      process: ["AI Risk Assessment", "Policy Development", "Governance Implementation", "Digital Trust Review"],
      impact: [
        "Safe and compliant AI adoption across the enterprise",
        "Reduced liability from AI-related decisions",
        "Enhanced customer and stakeholder confidence in AI"
      ]
    },
    {
      title: "OSINT & Threat Intelligence Services",
      desc: "Enhance situational awareness and strategic decision-making through intelligence-led methodologies.",
      outcome: "Proactively identify threats and monitor organizational exposure.",
      icon: <Search className="w-6 h-6" />,
      color: "blue",
      standards: ["OSINT Framework", "Adversary Profiling", "Brand Intelligence"],
      whatWeDo: [
        "Digital footprint analysis and structured OSINT investigations",
        "Executive exposure analysis and threat monitoring",
        "Adversary profiling and brand intelligence gathering",
        "Due diligence support and information correlation",
        "Strategic intelligence reporting and trend monitoring"
      ],
      process: ["Footprint Mapping", "Intelligence Gathering", "Adversary Profiling", "Strategic Reporting"],
      impact: [
        "Early warning of emerging threats and brand risks",
        "Intelligence-led risk management and decision support",
        "Improved situational awareness of organizational exposure"
      ]
    },
    {
      title: "Social Media Intelligence & Digital Influence",
      desc: "Enhance digital presence, brand visibility, and strategic online influence.",
      outcome: "Strengthen market perception and informed digital engagement.",
      icon: <Users className="w-6 h-6" />,
      color: "orange",
      standards: ["Reputation Monitoring", "Competitive Intelligence", "Digital Strategy"],
      whatWeDo: [
        "Digital brand strategy and reputation monitoring",
        "Social media intelligence and competitive analysis",
        "Campaign strategy support and audience analysis",
        "Trend identification and digital reputation risk assessment",
        "Strategic content visibility and influence planning"
      ],
      process: ["Audience Analysis", "Reputation Audit", "Strategy Development", "Campaign Support"],
      impact: [
        "Strengthened market perception and brand trust",
        "Improved reach and audience engagement effectiveness",
        "Proactive management of digital reputation risks"
      ]
    },
    {
      title: "Cybersecurity Training & Capability Development",
      desc: "Strengthen organizational cyber maturity and workforce capability for technical and executive teams.",
      outcome: "Build skilled teams capable of managing evolving digital risks.",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "blue",
      standards: ["Certification Pathways", "Cyber Awareness", "Workforce Capability"],
      whatWeDo: [
        "Executive and technical cybersecurity awareness programs",
        "GRC and risk management workshops and training",
        "Security architecture and OSINT training workshops",
        "Secure coding awareness and SOC fundamentals training",
        "Support on training pathways for global certifications"
      ],
      process: ["Skill Gap Assessment", "Custom Program Design", "Technical Workshops", "Workforce Validation"],
      impact: [
        "Reduced human risk and security incidents",
        "Enhanced organizational security culture and maturity",
        "Future-ready workforce with specialized capabilities"
      ]
    },
    {
      title: "Cybersecurity Product Advisory & Deployment",
      desc: "Evaluate, select, and optimize security technologies aligned with business objectives.",
      outcome: "Maximize security ROI through informed technology decisions.",
      icon: <HardDrive className="w-6 h-6" />,
      color: "orange",
      standards: ["ROI Optimization", "Technology Assessment", "Deployment Governance"],
       whatWeDo: [
        "Security product advisory and solution evaluation",
        "Technology stack assessment and custom solution advisory",
        "Deployment coordination and security tool integration",
        "Implementation roadmap development and optimization",
        "Post-deployment guidance and ROI measurement"
      ],
      process: ["Requirement Mapping", "Vendor Evaluation", "Deployment Coordination", "Post-Deployment ROI"],
      impact: [
        "Efficient allocation of security technology budget",
        "Seamless integration of new tools into ecosystems",
        "Optimized technology performance and risk reduction"
      ]
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  delay: idx * 0.1 
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  scale: 1.04, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
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
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className={`p-2.5 w-fit rounded-xl mb-4 transition-all duration-400 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] ${
                    item.color === 'blue'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {item.icon}
                  </motion.div>
                  
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
              transition={{ duration: 0.3 }}
              onClick={() => setActiveBrief(null)}
              className="absolute inset-0 bg-stone-950/85 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 18
              }}
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
                <div className="flex items-start gap-6 mb-10 pr-8">
                  <div className={`p-5 rounded-2xl shrink-0 shadow-lg ${expertises[activeBrief].color === 'blue' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                    {expertises[activeBrief].icon}
                  </div>
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-semibold tracking-tight mb-2 ${expertises[activeBrief].color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`}>{expertises[activeBrief].title}</h3>
                    <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed">{expertises[activeBrief].desc}</p>
                  </div>
                </div>

                {/* Standards */}
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {expertises[activeBrief].standards.map((s: string, si: number) => (
                    <span key={si} className={`text-[10px] uppercase tracking-wider border rounded-full px-4 py-2 font-bold ${
                      expertises[activeBrief].color === 'blue' ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' : 'bg-orange-500/10 border-orange-500/20 text-orange-300'
                    }`}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* What We Do */}
                <div className="mb-12">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-bold flex items-center gap-3">
                    <span className={`w-8 h-px ${expertises[activeBrief].color === 'blue' ? 'bg-blue-500/50' : 'bg-orange-500/50'}`} /> What We Do
                  </h4>
                  <ul className="space-y-4">
                    {expertises[activeBrief].whatWeDo.map((item: string, wi: number) => (
                      <li key={wi} className="flex items-start gap-4 text-stone-200 text-sm md:text-base font-light leading-relaxed">
                        <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.3)] ${expertises[activeBrief].color === 'blue' ? 'bg-blue-400 shadow-blue-400/50' : 'bg-orange-400 shadow-orange-400/50'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How It Works - Process Flow */}
                <div className="mb-12">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-bold flex items-center gap-3">
                    <span className={`w-8 h-px ${expertises[activeBrief].color === 'blue' ? 'bg-blue-500/50' : 'bg-orange-500/50'}`} /> Strategic Process
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {expertises[activeBrief].process.map((step: string, pi: number) => (
                      <div key={pi} className={`bg-white/[0.02] border rounded-2xl p-5 text-center relative group transition-all duration-300 hover:bg-white/[0.05] ${
                        expertises[activeBrief].color === 'blue' ? 'border-blue-500/10 hover:border-blue-500/30' : 'border-orange-500/10 hover:border-orange-500/30'
                      }`}>
                        <span className={`text-3xl font-bold block mb-3 transition-colors ${expertises[activeBrief].color === 'blue' ? 'text-blue-500/30 group-hover:text-blue-500/60' : 'text-orange-500/30 group-hover:text-orange-500/60'}`}>
                          {String(pi + 1).padStart(2, '0')}
                        </span>
                        <p className="text-stone-300 text-xs font-semibold leading-relaxed uppercase tracking-wider">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Impact */}
                <div className="mb-12">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-bold flex items-center gap-3">
                    <span className={`w-8 h-px ${expertises[activeBrief].color === 'blue' ? 'bg-blue-500/50' : 'bg-orange-500/50'}`} /> Business Impact
                  </h4>
                  <div className={`bg-stone-950/40 backdrop-blur-md border rounded-2xl p-6 md:p-8 ${
                    expertises[activeBrief].color === 'blue' ? 'border-blue-500/10 shadow-[inset_0_0_30px_rgba(59,130,246,0.02)]' : 'border-orange-500/10 shadow-[inset_0_0_30px_rgba(249,115,22,0.02)]'
                  }`}>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {expertises[activeBrief].impact.map((item: string, ii: number) => (
                        <li key={ii} className="flex items-start gap-3 text-stone-300 text-sm font-medium">
                          <span className={`mt-0.5 shrink-0 ${expertises[activeBrief].color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href="#contact"
                    onClick={() => setActiveBrief(null)}
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Request Consultation <ArrowRight size={14} />
                  </a>
                  <button 
                    onClick={() => setActiveBrief(null)}
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] text-stone-300 rounded-full text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-white"
                  >
                    Close Brief
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
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm md:text-base uppercase tracking-[0.4em] text-stone-400 mb-8 block font-semibold"
          >
            About Cybravion
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-stone-100 mb-10 leading-[1.1] tracking-tight"
          >
            We secure businesses. <br className="hidden md:block" />
            <span className="font-light text-stone-300">Not just networks.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3 + i * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.04)" }}
              className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-500"
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const InputField = ({ label, name, type = "text", required = false, placeholder = "" }: any) => (
    <div className="space-y-2 group relative">
      <motion.label 
        initial={false}
        animate={{ 
          y: focusedField === name || placeholder ? -2 : 0,
          opacity: focusedField === name ? 1 : 0.6,
          scale: focusedField === name ? 1.05 : 1
        }}
        className="text-[9px] uppercase tracking-[0.3em] text-white font-bold ml-1 transition-all"
      >
        {label}
      </motion.label>
      <input 
        type={type} 
        name={name}
        required={required}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        className={`w-full bg-stone-950/60 border rounded-lg px-4 py-3 text-white focus:outline-none transition-all placeholder:text-stone-500 text-sm ${
          focusedField === name ? 'border-white/30 bg-stone-950/80 shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'border-white/10'
        }`}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <section id="contact" className="py-16 md:py-20 bg-transparent relative overflow-hidden border-t border-white/10">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-white mb-6 block font-semibold opacity-70">Partner With Cybravion</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight leading-[1.1]">
              Ready to secure <br /><span className="font-light text-stone-300">your infrastructure?</span>
            </h2>
            <p className="text-white font-light mb-12 max-w-md text-base md:text-lg leading-relaxed opacity-80">
              Align your security posture with your business objectives. Reach out to our advisory team today.
            </p>

            <div className="flex flex-col gap-8">
              {[
                { icon: <Mail size={20} strokeWidth={1.5} />, label: "Email", value: "cybravions@gmail.com", color: "blue" },
                { icon: <Phone size={20} strokeWidth={1.5} />, label: "Phone", value: "+91-9358683634", color: "orange" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] border flex items-center justify-center group-hover:bg-white/[0.08] transition-all duration-500 shadow-lg ${
                    item.color === 'blue' ? 'text-blue-400 border-blue-500/20 group-hover:border-blue-500/40 shadow-blue-500/5' : 'text-orange-400 border-orange-500/20 group-hover:border-orange-500/40 shadow-orange-500/5'
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white mb-1.5 font-bold opacity-50">{item.label}</p>
                    <p className="text-white text-lg md:text-xl font-light tracking-wide group-hover:text-stone-100 transition-colors">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div 
              className="bg-stone-900/40 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative z-10 overflow-hidden"
            >
              {/* Subtle background glow for form */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6 relative z-10">
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Full Name" name="name" required placeholder="John Doe" />
                  <InputField label="Company" name="organization" placeholder="Company Name" />
                </div>

                <InputField label="Email Address" name="email" type="email" required placeholder="john@example.com" />

                <div className="space-y-2 group relative">
                  <motion.label 
                    initial={false}
                    animate={{ 
                      y: focusedField === "message" ? -2 : 0,
                      opacity: focusedField === "message" ? 1 : 0.6
                    }}
                    className="text-[9px] uppercase tracking-[0.3em] text-white font-bold ml-1 transition-all"
                  >
                    Message
                  </motion.label>
                  <textarea 
                    rows={2}
                    name="message"
                    required
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-stone-950/60 border rounded-lg px-4 py-3 text-white focus:outline-none transition-all placeholder:text-stone-500 resize-none text-sm leading-relaxed ${
                      focusedField === "message" ? 'border-orange-500/30 bg-stone-950/80 shadow-[0_0_15px_rgba(249,115,22,0.05)]' : 'border-white/10'
                    }`}
                    placeholder="How can we help?"
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249,115,22,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="w-fit px-12 py-3 bg-orange-500 text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:bg-orange-600 transition-all shadow-xl shadow-orange-950/20"
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </motion.div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-stone-800 rounded-3xl -z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const differentiators = [
    { icon: <Target className="w-6 h-6" />, title: "Business-First Security", desc: "We align cybersecurity strategy with your business objectives — not just technical checklists.", color: "blue" },
    { icon: <Layers className="w-6 h-6" />, title: "End-to-End Services", desc: "From advisory and gap assessment through implementation, deployment, and post-deployment optimization.", color: "orange" },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Outcome-Driven Strategies", desc: "Measurable risk reduction, compliance readiness, and strengthened security posture — not just reports.", color: "blue" },
    { icon: <Brain className="w-6 h-6" />, title: "Cloud & AI Security Expertise", desc: "Specialized capabilities in cloud architecture, Zero Trust advisory, and AI risk governance frameworks.", color: "orange" },
    { icon: <Radar className="w-6 h-6" />, title: "Intelligence-Led Decisions", desc: "OSINT, threat intelligence, and adversary profiling fused into actionable strategic risk insights.", color: "blue" }
  ];

  return (
    <section className="py-20 md:py-28 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Why Cybravion</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight mb-6">What sets us apart.</h2>
          <p className="text-stone-400 text-base md:text-lg max-w-2xl mx-auto font-light">We don't just identify risks — we help you build a resilient, compliant, and future-ready organization.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 15, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`p-6 md:p-8 bg-white/[0.02] backdrop-blur-xl border rounded-2xl group transition-all duration-400 relative overflow-hidden ${
                item.color === 'blue' ? 'border-blue-500/10 hover:border-blue-500/25' : 'border-orange-500/10 hover:border-orange-500/25'
              }`}
            >
              <div className={`absolute -top-12 -right-12 w-32 h-32 blur-[50px] opacity-0 group-hover:opacity-15 transition-opacity rounded-full pointer-events-none ${
                item.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
              }`} />
              <div className={`p-3 w-fit rounded-xl mb-5 ${item.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-stone-100 mb-2">{item.title}</h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ComplianceStandards = () => {
  const frameworks = [
    { name: "ISO/IEC 27001", short: "Information security management system standard for enterprise-wide risk governance.", icon: <ShieldCheck className="w-6 h-6" />, color: "blue" },
    { name: "NIST CSF", short: "Cybersecurity framework for identifying, protecting, detecting, responding, and recovering.", icon: <Layers className="w-6 h-6" />, color: "orange" },
    { name: "SOC 2", short: "Trust service criteria for managing customer data — security, availability, confidentiality.", icon: <FileCheck className="w-6 h-6" />, color: "blue" },
    { name: "DPDP Act", short: "India's Digital Personal Data Protection Act for lawful processing of personal data.", icon: <Lock className="w-6 h-6" />, color: "orange" },
    { name: "CERT-In", short: "Indian Computer Emergency Response Team advisory compliance for incident reporting.", icon: <Shield className="w-6 h-6" />, color: "blue" }
  ];

  return (
    <section className="py-20 md:py-28 bg-stone-950/30 border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Global Frameworks</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight mb-6">Stay compliant. <span className="font-light text-stone-300">Reduce regulatory risk.</span></h2>
          <p className="text-stone-400 text-base md:text-lg max-w-2xl mx-auto font-light">We align your security posture with globally recognized compliance standards and regulatory requirements.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {frameworks.map((fw, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-6 bg-white/[0.02] border rounded-2xl group cursor-default transition-all duration-400 relative overflow-hidden text-center ${
                fw.color === 'blue' ? 'border-blue-500/10 hover:border-blue-500/30' : 'border-orange-500/10 hover:border-orange-500/30'
              }`}
            >
              <div className={`mx-auto p-3 w-fit rounded-xl mb-4 ${fw.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                {fw.icon}
              </div>
              <h3 className={`text-base font-bold mb-2 ${fw.color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`}>{fw.name}</h3>
              <p className="text-stone-400 text-xs font-light leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{fw.short}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ThreatIntelHighlight = () => (
  <section className="py-20 md:py-28 bg-transparent border-t border-white/10 relative overflow-hidden">
    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
    <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-blue-400 mb-6 block font-semibold">Threat Intelligence</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight mb-6 leading-[1.1]">
            Know what attackers know <br className="hidden md:block" />
            <span className="font-light text-stone-300">before they use it.</span>
          </h2>
          <p className="text-stone-400 text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg">
            Our intelligence-led approach combines OSINT, adversary profiling, and strategic monitoring to give you actionable threat visibility — not just data.
          </p>
          <ul className="space-y-5">
            {[
              { icon: <Eye className="w-5 h-5" />, text: "Real-time threat awareness and exposure monitoring" },
              { icon: <Radar className="w-5 h-5" />, text: "Proactive risk detection and adversary profiling" },
              { icon: <Users className="w-5 h-5" />, text: "Executive and brand threat intelligence" },
              { icon: <Search className="w-5 h-5" />, text: "Structured OSINT investigations and due diligence" }
            ].map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} viewport={{ once: true }} className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">{item.icon}</div>
                <span className="text-stone-200 text-sm font-medium">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="hidden lg:flex items-center justify-center relative">
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 border border-blue-500/10 rounded-full" />
            <div className="absolute inset-6 border border-blue-500/15 rounded-full" />
            <div className="absolute inset-12 border border-blue-500/20 rounded-full" />
            <div className="absolute inset-20 border border-blue-500/25 rounded-full bg-blue-500/5 flex items-center justify-center">
              <Radar className="w-12 h-12 text-blue-400/60" />
            </div>
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full bg-blue-400"
                style={{ top: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`, left: `${50 + 45 * Math.cos((deg * Math.PI) / 180)}%` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const TrainingAwareness = () => {
  const programs = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Security Awareness",
      desc: "Organization-wide programs that build a security-first culture — from boardroom to breakroom.",
      points: ["Executive cyber awareness sessions", "Phishing simulation and social engineering defense", "Security policy communication and adoption"],
      color: "orange"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Technical Team Training",
      desc: "Hands-on workshops designed for engineering, DevOps, and security operations teams.",
      points: ["Secure coding practices and code review", "SOC fundamentals and incident response", "Cloud security and architecture workshops"],
      color: "blue"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Certification Guidance",
      desc: "Structured pathways to globally recognized cybersecurity certifications.",
      points: ["CISSP, CISA, and CompTIA Security+ preparation", "GRC and risk management specializations", "Custom enterprise certification programs"],
      color: "orange"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Capability Development</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight mb-6">Build a security-aware workforce <br className="hidden md:block" /><span className="font-light text-stone-300">that can defend against modern threats.</span></h2>
          <p className="text-stone-400 text-base md:text-lg max-w-2xl mx-auto font-light">Your team is your first line of defense. Our training programs transform employees into security assets.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {programs.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-7 bg-white/[0.02] border rounded-2xl relative overflow-hidden group transition-all duration-400 ${
                prog.color === 'blue' ? 'border-blue-500/10 hover:border-blue-500/25' : 'border-orange-500/10 hover:border-orange-500/25'
              }`}
            >
              <div className={`p-3 w-fit rounded-xl mb-5 ${prog.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                {prog.icon}
              </div>
              <h3 className="text-xl font-semibold text-stone-100 mb-3">{prog.title}</h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed mb-5">{prog.desc}</p>
              <ul className="space-y-2.5">
                {prog.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-3 text-stone-300 text-sm font-light">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${prog.color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`} />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <motion.a
            href="#services"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-stone-200 rounded-full text-sm uppercase tracking-[0.2em] font-bold transition-all"
          >
            Explore Training Programs <ArrowRight size={16} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "What is VAPT and why is it important?", a: "VAPT (Vulnerability Assessment and Penetration Testing) is a structured approach to identifying and exploiting security weaknesses in your applications, networks, and cloud infrastructure. It helps organizations proactively discover vulnerabilities before attackers do, reducing the risk of data breaches and ensuring compliance with standards like ISO 27001 and SOC 2." },
    { q: "Do you work with startups and small businesses?", a: "Yes. CYBRAVION works with enterprises, SMEs, startups, and government institutions. Our services are scaled to fit the size and maturity of your organization — from lightweight compliance assessments for early-stage startups to full enterprise GRC programs." },
    { q: "How long does a security assessment take?", a: "Timelines depend on scope and complexity. A focused VAPT engagement typically takes 1–3 weeks. Comprehensive GRC assessments or security architecture reviews may take 4–8 weeks. We provide a clear timeline during the scoping phase so there are no surprises." },
    { q: "Do you provide implementation or only consulting?", a: "We provide both. CYBRAVION delivers end-to-end services — from advisory and strategy through to hands-on implementation, deployment coordination, and post-deployment optimization. Our goal is measurable risk reduction, not just reports." },
    { q: "How do you ensure compliance with ISO and NIST standards?", a: "We conduct gap assessments against your target framework (ISO 27001, NIST CSF, SOC 2, DPDP Act), develop remediation roadmaps, build required documentation (policies, procedures, ISMS), and support you through the audit process. Our approach ensures compliance is embedded into operations, not treated as a one-time project." },
    { q: "What industries do you serve?", a: "We serve clients across technology, financial services, healthcare, e-commerce, government, education, and critical infrastructure sectors. Our framework-agnostic approach means we adapt to the regulatory and threat landscape specific to your industry." },
    { q: "How does threat intelligence help my organization?", a: "Threat intelligence provides proactive visibility into emerging threats, adversary tactics, and your organization's digital exposure. Instead of reacting to incidents after they happen, intelligence-led security enables early detection, informed decision-making, and strategic risk mitigation — helping you stay ahead of attackers." }
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-stone-950/30 border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Common Questions</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight mb-6">Frequently asked questions.</h2>
          <p className="text-stone-400 text-base md:text-lg max-w-xl mx-auto font-light">Clear answers to the questions we hear most from security leaders and decision-makers.</p>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'border-blue-500/20 bg-white/[0.03]' : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.02]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <h3 className="text-sm md:text-base font-semibold text-stone-100 pr-4">{faq.q}</h3>
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-colors ${openIndex === i ? 'text-blue-400' : 'text-stone-500'}`} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-6 text-stone-400 text-sm font-light leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
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
          <WhyChooseUs />
          <ComplianceStandards />
          <About />
          <ThreatIntelHighlight />
          <TrainingAwareness />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
