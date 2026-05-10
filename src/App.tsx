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
  Briefcase,
  Building2,
  Heart,
  Landmark,
  FileText,
  Download,
  ExternalLink,
} from 'lucide-react';
import { Download, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ServiceModalRenderer } from './components/ServiceModals';
import { TrainingPage } from './pages/Training';
import { CompliancePage } from './pages/Compliance';
import { CaseStudies } from './components/CaseStudies';
import { IndustrySolutions } from './components/IndustrySolutions';
import { TrustCredibility } from './components/TrustCredibility';
import { Insights } from './components/Insights';

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
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
    { name: 'Compliance', href: '#compliance' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-stone-950/95 backdrop-blur-md py-3 border-b border-stone-700 shadow-[0_0_20px_rgba(59,130,246,0.05)]' 
          : 'bg-transparent py-6'
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
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest text-stone-300 hover:text-white transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#training"
            className="text-sm uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors font-bold"
          >
            Training
          </a>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300"
          >
            Consult an Advisor
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-stone-100 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
            className="absolute top-full left-0 w-full bg-stone-900/98 backdrop-blur-xl border-b border-stone-700 p-8 md:hidden flex flex-col gap-5"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-base uppercase tracking-widest text-stone-200 py-2 min-h-[44px] flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm uppercase tracking-widest font-bold text-center min-h-[44px] flex items-center justify-center shadow-lg shadow-orange-500/20"
            >
              Consult an Advisor
            </a>
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-20 md:pt-32 pb-16 md:pb-20">
      <FloatingParticles />
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative">
          {/* Subtle Background Noise Overlay */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-[100]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 w-full max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
              
              <div className="relative group">
                {/* Spectral Glow Layer */}
                <motion.div 
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-10 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"
                />
                
                <motion.h1 
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 80,
                    damping: 12,
                    duration: 0.8
                  }}
                  className="relative z-10 mt-8 lg:mt-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] text-white mb-8 tracking-tight drop-shadow-2xl"
                >
                  Secure your <br />
                  <motion.span 
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="font-light bg-gradient-to-r from-blue-400 via-stone-100 to-orange-400 bg-clip-text text-transparent"
                  >
                    digital infrastructure.
                  </motion.span>
                </motion.h1>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.25, 
                  ease: [0.21, 0.45, 0.32, 0.9] 
                }}
                className="text-lg md:text-xl text-stone-300 mb-12 max-w-xl font-light leading-relaxed drop-shadow-md"
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
                  className="px-6 py-3.5 md:px-10 md:py-4 bg-white text-stone-950 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)] min-h-[48px] w-full sm:w-auto"
                >
                  Explore Expertise
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.02, brightness: 1.1 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 md:px-10 md:py-4 bg-orange-500 text-white rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all text-center flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] min-h-[48px] w-full sm:w-auto"
                >
                  Consult an Advisor
                </motion.a>
              </motion.div>
            </div>

            {/* Right Column - 3D Rotating Logo (Increased Size & Speed) */}
            <div className="hidden lg:flex relative w-full max-w-xl items-center justify-center" style={{ perspective: '1200px' }}>
              <motion.div 
                initial={{ opacity: 0, rotateY: -30, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  rotateY: [0, 360],
                  scale: [0.98, 1.02, 0.98]
                }}
                transition={{ 
                  opacity: { duration: 1.5, delay: 0.6 },
                  rotateY: { duration: 12, repeat: Infinity, ease: "linear" },
                  scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative z-10 w-full aspect-square flex items-center justify-center"
              >
                {/* Orbital Glow Layers */}
                <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute inset-10 bg-orange-500/5 rounded-full blur-[100px] animate-pulse delay-700" />
                
                <motion.img 
                  src="/logo.png" 
                  alt="Cybravion Logo" 
                  className="w-full h-auto object-contain drop-shadow-[0_0_80px_rgba(59,130,246,0.4)] filter brightness-110"
                />
              </motion.div>
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
    <section className="py-24 md:py-32 bg-transparent border-t border-white/10 relative overflow-hidden">
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
              className={`bg-white/[0.02] backdrop-blur-xl border rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-500 cursor-default relative overflow-hidden group ${
                idx % 2 === 0 
                  ? 'border-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)] hover:bg-white/[0.04]' 
                  : 'border-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.05)] hover:border-orange-500/40 hover:shadow-[0_0_35px_rgba(249,115,22,0.2)] hover:bg-white/[0.04]'
              }`}
            >
              <div className={`absolute -top-10 -right-10 w-24 h-24 blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity rounded-full pointer-events-none ${
                idx % 2 === 0 ? 'bg-blue-500' : 'bg-orange-500'
              }`} />
              
              <h3 className={`text-5xl md:text-6xl font-bold mb-3 tracking-tight font-sans ${
                idx % 2 === 0 ? 'text-blue-400' : 'text-orange-400'
              }`}>
                <CountUp value={metric.value} />
              </h3>
              <p className="text-stone-300 text-xs md:text-sm uppercase tracking-[0.15em] font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{metric.label}</p>
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
    <section id="services" className="py-24 md:py-32 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-4 md:gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-4 block font-semibold">Core Capabilities</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Identify vulnerabilities <br />
              <span className="bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent font-light">before attackers do.</span>
            </h2>
          </div>
          <div className="md:text-right max-w-xs">
            <p className="text-stone-400 text-sm leading-relaxed">
              Proactive threat management and resilience for the modern enterprise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
          {expertises.map((item, idx) => {
            const isFeatured = idx === 0 || idx === 1; // GRC and VAPT featured
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ 
                  opacity: 1, 
                  y: [0, -8, 0],
                  boxShadow: item.color === 'blue' 
                    ? ["0_0_20px_rgba(59,130,246,0.1)", "0_0_50px_rgba(59,130,246,0.4)", "0_0_20px_rgba(59,130,246,0.1)"]
                    : ["0_0_20px_rgba(249,115,22,0.1)", "0_0_50px_rgba(249,115,22,0.4)", "0_0_20px_rgba(249,115,22,0.1)"],
                  filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                  transition: {
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.2
                    },
                    boxShadow: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.2
                    },
                    filter: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.2
                    },
                    opacity: { duration: 0.8, delay: idx * 0.1 }
                  }
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  scale: 1.04, 
                  y: -12,
                  filter: "brightness(1.1)",
                  transition: { duration: 0.3 }
                }}
                className={`p-5 md:p-6 bg-white/[0.02] backdrop-blur-xl border rounded-2xl group transition-all duration-400 cursor-pointer relative overflow-hidden ${
                  item.color === 'blue'
                    ? 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-500/80 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]'
                    : 'border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:border-orange-500/80 hover:shadow-[0_0_50px_rgba(249,115,22,0.5)]'
                } ${isFeatured ? 'ring-2 ring-white/20' : ''} hover:bg-white/[0.05]`}
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
                  
                  <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-tight">
                    {item.title}
                    {isFeatured && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/80 font-bold tracking-tighter align-middle uppercase">Key</span>}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed mb-4 font-light">
                    {item.desc}
                  </p>
                  
                  <button 
                    className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${item.color === 'blue' ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500' : 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveBrief(idx);
                    }}
                  >
                    <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mid-section CTA */}
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
            className="inline-flex items-center gap-3 px-10 py-4 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-stone-200 rounded-full text-sm uppercase tracking-[0.2em] font-bold transition-all min-h-[48px]"
          >
            Request Security Assessment <ArrowRight size={16} />
          </motion.a>
        </motion.div>
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
              className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-stone-900/95 backdrop-blur-2xl border rounded-3xl shadow-2xl overflow-hidden ${
                expertises[activeBrief].color === 'blue' 
                  ? 'border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)]' 
                  : 'border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.15)]'
              }`}
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

              <ServiceModalRenderer 
                activeBrief={activeBrief} 
                data={expertises[activeBrief]} 
                close={() => setActiveBrief(null)} 
              />

              {/* Decorative glow */}
              <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[100px] pointer-events-none ${expertises[activeBrief].color === 'blue' ? 'bg-blue-500/5' : 'bg-orange-500/5'}`} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
        className="text-[11px] uppercase tracking-[0.3em] text-white font-bold ml-1 transition-all"
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
          focusedField === name 
            ? 'border-orange-500/40 bg-stone-950/80 shadow-[0_0_20px_rgba(249,115,22,0.15)] brightness-110' 
            : 'border-white/10'
        }`}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <section id="contact" className="py-24 md:py-32 bg-transparent relative overflow-hidden border-t border-white/10">
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
              Ready to secure <br />
              <span className="bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent font-light">your infrastructure?</span>
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
              className="bg-stone-900/40 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border border-orange-500/10 shadow-[0_0_40px_rgba(249,115,22,0.05)] relative z-10 overflow-hidden"
            >
              {/* Subtle background glow for form */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6 relative z-10">
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Full Name" name="name" required placeholder="John Doe" />
                  <InputField label="Company" name="organization" placeholder="Company Name" />
                </div>

                <InputField label="Work Email" name="email" type="email" required placeholder="john@company.com" />

                <div className="space-y-2 group relative">
                  <motion.label 
                    initial={false}
                    animate={{ 
                      y: focusedField === "requirement" ? -2 : 0,
                      opacity: focusedField === "requirement" ? 1 : 0.6
                    }}
                    className="text-[9px] uppercase tracking-[0.3em] text-white font-bold ml-1 transition-all"
                  >
                    Requirement
                  </motion.label>
                  <select 
                    name="requirement"
                    onFocus={() => setFocusedField("requirement")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-stone-950/60 border rounded-lg px-4 py-3 text-white focus:outline-none transition-all text-sm appearance-none cursor-pointer ${
                      focusedField === "requirement" 
                        ? 'border-orange-500/40 bg-stone-950/80 shadow-[0_0_20px_rgba(249,115,22,0.15)]' 
                        : 'border-white/10'
                    }`}
                  >
                    <option value="" className="bg-stone-900">Select a service...</option>
                    <option value="security-assessment" className="bg-stone-900">Security Assessment (VAPT)</option>
                    <option value="grc" className="bg-stone-900">GRC & Compliance</option>
                    <option value="cloud-security" className="bg-stone-900">Cloud Security</option>
                    <option value="training" className="bg-stone-900">Training & Capability Development</option>
                    <option value="ai-governance" className="bg-stone-900">AI Risk Governance</option>
                    <option value="osint" className="bg-stone-900">OSINT & Threat Intelligence</option>
                    <option value="other" className="bg-stone-900">Other / General Inquiry</option>
                  </select>
                </div>

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
                      focusedField === "message" 
                        ? 'border-orange-500/40 bg-stone-950/80 shadow-[0_0_20px_rgba(249,115,22,0.15)] brightness-110' 
                        : 'border-white/10'
                    }`}
                    placeholder="Briefly describe your security needs..."
                  />
                </div>

                <div className="flex flex-col items-center gap-3 pt-2">
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249,115,22,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="w-fit px-12 py-3.5 bg-orange-500 text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:bg-orange-600 transition-all shadow-xl shadow-orange-950/20 min-h-[48px] w-full sm:w-auto"
                  >
                    Request Security Assessment
                  </motion.button>
                  <p className="text-stone-600 text-[10px] uppercase tracking-widest font-medium">We respect your privacy. No spam, ever.</p>
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
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            What <span className="bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent italic">sets us apart.</span>
          </h2>
          <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">We don't just identify risks — we help you build a resilient, compliant, and future-ready organization.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 15, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4, filter: "brightness(1.1)" }}
              className={`p-6 md:p-8 bg-white/[0.02] backdrop-blur-xl border rounded-2xl group transition-all duration-400 relative overflow-hidden ${
                item.color === 'blue' 
                  ? 'border-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)]' 
                  : 'border-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.05)] hover:border-orange-500/30 hover:shadow-[0_0_35px_rgba(249,115,22,0.2)]'
              }`}
            >
              <div className={`absolute -top-12 -right-12 w-32 h-32 blur-[50px] opacity-0 group-hover:opacity-15 transition-opacity rounded-full pointer-events-none ${
                item.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
              }`} />
              <div className={`p-3 w-fit rounded-xl mb-5 ${item.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-stone-300 text-base font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ComplianceStrip = () => (
  <section className="py-10 md:py-14 border-t border-white/5 relative">
    <div className="w-full px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-6">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-stone-500 font-semibold">Aligned with global frameworks</span>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {["ISO/IEC 27001", "NIST CSF", "SOC 2", "DPDP Act", "CERT-In"].map((fw, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            viewport={{ once: true }}
            className={`text-[10px] md:text-xs uppercase tracking-wider border rounded-full px-4 py-2 font-bold ${
              i % 2 === 0 ? 'bg-blue-500/5 border-blue-500/15 text-blue-400' : 'bg-orange-500/5 border-orange-500/15 text-orange-400'
            }`}
          >
            {fw}
          </motion.span>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const faqs = [
    { q: "What is VAPT and why is it important?", a: "VAPT identifies and exploits security weaknesses across applications, networks, and cloud infrastructure — helping you fix vulnerabilities before attackers find them. It ensures compliance with ISO 27001, SOC 2, and similar standards." },
    { q: "Do you work with startups and enterprises?", a: "Yes. We serve organizations of all sizes — from lightweight assessments for startups to enterprise-wide GRC programs. Services are scaled to your maturity and budget." },
    { q: "Do you provide implementation or only consulting?", a: "Both. We deliver end-to-end services — from advisory and strategy through hands-on implementation and post-deployment optimization. Measurable risk reduction, not just reports." },
    { q: "How long does a security assessment take?", a: "A focused VAPT typically takes 1–3 weeks. Comprehensive GRC or architecture reviews may take 4–8 weeks. We provide clear timelines during scoping." },
    { q: "How do you ensure compliance with ISO and NIST?", a: "We conduct gap assessments, develop remediation roadmaps, build required documentation, and support you through audit. Compliance is embedded into operations — not a one-time project." },
    { q: "What industries do you serve?", a: "Technology, financial services, healthcare, e-commerce, government, and critical infrastructure. Our framework-agnostic approach adapts to your industry's regulatory landscape." },
    { q: "How does threat intelligence help?", a: "It provides proactive visibility into emerging threats and your digital exposure — enabling early detection and strategic risk mitigation instead of reactive incident response." }
  ];

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <section id="faq" className="py-16 md:py-24 bg-stone-950/30 border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-sm md:text-base uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Common Questions</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight">Frequently asked questions.</h2>
        </motion.div>
        <div className="space-y-3">
          {visibleFaqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === i 
                  ? 'border-blue-500/30 bg-white/[0.04] shadow-[0_0_30px_rgba(59,130,246,0.1)] brightness-110' 
                  : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left min-h-[64px]"
              >
                <h3 className="text-base md:text-lg font-bold text-white pr-4">{faq.q}</h3>
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
        {!showAll && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8">
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] text-stone-300 rounded-full text-xs uppercase tracking-[0.15em] font-bold transition-all min-h-[44px]"
            >
              View More FAQs <ChevronDown size={14} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};


const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { num: "01", title: "Assess", desc: "We evaluate your current security posture, identify compliance gaps, and map your organization's risk landscape against industry frameworks.", icon: <Search className="w-5 h-5" /> },
    { num: "02", title: "Identify Risks", desc: "Through structured assessments and threat intelligence, we prioritize vulnerabilities and risks based on business impact and exploitability.", icon: <Eye className="w-5 h-5" /> },
    { num: "03", title: "Implement Controls", desc: "We deploy governance frameworks, security architecture, and technical controls — tailored to your environment and regulatory requirements.", icon: <Shield className="w-5 h-5" /> },
    { num: "04", title: "Monitor & Improve", desc: "Continuous monitoring, threat intelligence feeds, and periodic reassessment ensure your security posture evolves with emerging threats.", icon: <Radar className="w-5 h-5" /> }
  ];

  return (
    <section className="py-24 md:py-32 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500 mb-4 block font-semibold">Our Process</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight mb-6">How we work.</h2>
          <p className="text-stone-400 text-base md:text-lg max-w-xl mx-auto font-light">A structured, repeatable methodology that delivers measurable security outcomes.</p>
        </motion.div>

        {/* Progress bar */}
        <div className="hidden md:flex items-center justify-center gap-0 mb-14 max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <button
                onClick={() => setActiveStep(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0 ${
                  i === activeStep ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-110' : i < activeStep ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-stone-500'
                }`}
              >
                {step.num}
              </button>
              {i < steps.length - 1 && (
                <div className={`h-[2px] flex-1 transition-all duration-500 ${
                  i < activeStep 
                    ? 'bg-gradient-to-r from-blue-500 to-orange-500' 
                    : 'bg-white/5'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              onClick={() => setActiveStep(i)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-400 relative overflow-hidden group ${
                i === activeStep
                  ? 'bg-blue-500/5 border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.15)] brightness-110'
                  : 'bg-white/[0.01] border-white/5 hover:border-white/20 hover:bg-white/[0.02] hover:shadow-[0_0_15px_rgba(255,255,255,0.02)]'
              }`}
            >
              <div className={`p-2 w-fit rounded-lg mb-4 transition-colors ${i === activeStep ? 'bg-blue-500/15 text-blue-400' : 'bg-white/5 text-stone-500 group-hover:text-stone-300'}`}>
                {step.icon}
              </div>
              <h3 className={`text-base font-semibold mb-2 transition-colors ${i === activeStep ? 'text-blue-400' : 'text-stone-200'}`}>{step.title}</h3>
              <AnimatePresence mode="wait">
                {i === activeStep && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-stone-400 text-sm font-light leading-relaxed"
                  >
                    {step.desc}
                  </motion.p>
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
            <p className="text-stone-400 text-sm leading-relaxed tracking-wider font-light">
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
                <li><a href="#compliance" className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors">Security & Compliance</a></li>
                <li><a href="#insights" className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors">Insights</a></li>
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
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#training') {
        setCurrentView('training');
        window.scrollTo(0, 0);
      } else if (hash === '#compliance') {
        setCurrentView('compliance');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 scroll-smooth relative">
      <Helmet>
        <title>CYBRAVION Solutions | Cybersecurity Consulting & Risk Management</title>
        <meta name="description" content="Enterprise cybersecurity consulting — GRC, VAPT, cloud security, AI governance & threat intelligence. Trusted by 30+ organizations globally." />
        <meta name="keywords" content="cybersecurity consulting, VAPT services, risk management, ISO 27001, NIST compliance, SOC 2, cloud security, threat intelligence" />
        <link rel="canonical" href="https://cybravion.com/" />
      </Helmet>

      {/* Fixed Background Video */}
      <div className="fixed inset-0 z-0 bg-stone-950">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-35"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/20 to-stone-950/70 pointer-events-none" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          {currentView === 'training' ? (
            <TrainingPage />
          ) : currentView === 'compliance' ? (
            <CompliancePage />
          ) : (
            <>
              <Hero />
              <Services />
              <TrustCredibility />
              <TrackRecord />
              <CaseStudies />
              <IndustrySolutions />
              <WhyChooseUs />
              <HowWeWork />
              <Insights />
              <Contact />
              <FAQ />
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
