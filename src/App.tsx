/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Terminal,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ServiceModalRenderer } from './components/ServiceModals';
import { TrainingPage } from './pages/Training';
import { CompliancePage } from './pages/Compliance';
import { CaseStudies } from './components/CaseStudies';
import { IndustrySolutions } from './components/IndustrySolutions';
import { TrustCredibility } from './components/TrustCredibility';
import { Insights } from './components/Insights';
import { Scene3D } from './components/Scene3D';
import { CyberGlobe3D } from './components/CyberGlobe3D';
import { TiltCard3D } from './components/TiltCard3D';
import { ThreatRadar3D } from './components/ThreatRadar3D';

// --- Navigation ---

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    if (currentView !== 'home') {
      e.preventDefault();
      setCurrentView('home');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = hash;
        }
      }, 100);
    }
  };

  return (
    <header className="relative z-50">
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#05070d]/98 backdrop-blur-xl py-3 border-b border-stone-800 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
            : 'bg-transparent py-6'
        }`}
        aria-label="Main navigation"
      >
        <div className="w-full px-6 md:px-12 lg:px-20 flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
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
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a 
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className="text-sm uppercase tracking-widest text-stone-300 hover:text-white transition-colors font-medium"
            >
              Services
            </a>

            {/* Products Dropdown Wrapper */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                className="text-sm uppercase tracking-widest text-stone-300 hover:text-white transition-colors font-medium flex items-center gap-1 cursor-pointer min-h-[44px]"
                aria-label="Products menu"
                aria-expanded={isProductsOpen}
                aria-haspopup="true"
              >
                Products
                <ChevronDown size={14} className={`transition-transform duration-300 ${isProductsOpen ? 'rotate-180 text-blue-400' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.18 }}
                    style={{ backgroundColor: '#070a12' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-[#070a12] border border-cyan-500/30 rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,1),0_0_30px_rgba(0,240,255,0.1)] z-[999] overflow-hidden"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10 space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold px-3 mb-2" aria-hidden="true">Featured Platform</p>
                      
                      <a
                        href="https://exceptionmgr.cybravions.online"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-cyan-500/40 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-cyan-500/25 group-hover:text-cyan-300 transition-colors">
                            <ShieldCheck size={16} />
                          </div>
                          <span className="text-sm font-bold text-stone-100 group-hover:text-cyan-300 transition-colors">
                            AI Exception Manager
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 font-light leading-relaxed mb-3">
                          Automated cyber risk assessment, threat intelligence scoring, and exception lifecycle workflows.
                        </p>
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors self-start">
                          Launch Dashboard
                          <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a 
              href="#radar"
              onClick={(e) => handleNavClick(e, '#radar')}
              className="text-sm uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-1"
            >
              3D Radar
            </a>
            <a 
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="text-sm uppercase tracking-widest text-stone-300 hover:text-white transition-colors font-medium"
            >
              About
            </a>
            <a 
              href="#faq"
              onClick={(e) => handleNavClick(e, '#faq')}
              className="text-sm uppercase tracking-widest text-stone-300 hover:text-white transition-colors font-medium"
            >
              FAQ
            </a>
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-sm uppercase tracking-widest text-stone-300 hover:text-white transition-colors font-medium"
            >
              Contact
            </a>
            <button 
              onClick={() => {
                setCurrentView('compliance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-sm uppercase tracking-widest transition-colors font-medium cursor-pointer ${
                currentView === 'compliance' ? 'text-blue-400 font-bold border-b-2 border-blue-400 pb-1' : 'text-stone-300 hover:text-white'
              }`}
            >
              Compliance
            </button>
            <button 
              onClick={() => {
                setCurrentView('training');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-sm uppercase tracking-widest transition-colors font-bold cursor-pointer ${
                currentView === 'training' ? 'text-blue-400 underline underline-offset-4' : 'text-blue-400 hover:text-blue-300'
              }`}
            >
              Training
            </button>
            <motion.a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300"
            >
              Consult an Advisor
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-stone-100 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
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
              className="absolute top-full left-0 w-full bg-stone-900/98 backdrop-blur-xl border-b border-stone-700 p-8 lg:hidden flex flex-col gap-5 max-h-[85vh] overflow-y-auto"
            >
              <a 
                href="#services"
                className="text-base uppercase tracking-widest text-stone-200 py-2 min-h-[44px] flex items-center"
                onClick={(e) => {
                  handleNavClick(e, '#services');
                  setIsMobileMenuOpen(false);
                }}
              >
                Services
              </a>

              {/* Products Mobile Submenu */}
              <div className="flex flex-col">
                <button 
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className="text-base uppercase tracking-widest text-stone-200 py-2 min-h-[44px] flex items-center justify-between w-full"
                  aria-label="Products submenu"
                  aria-expanded={isMobileProductsOpen}
                >
                  Products
                  <ChevronDown size={18} className={`transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isMobileProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col gap-3 mt-1 overflow-hidden"
                    >
                      <a 
                        href="https://exceptionmgr.cybravions.online"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 py-2 text-sm text-stone-300 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ShieldCheck size={14} className="text-blue-400" />
                        AI Exception Manager
                        <ExternalLink size={12} className="text-stone-500" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a 
                href="#radar"
                className="text-base uppercase tracking-widest text-cyan-400 py-2 min-h-[44px] flex items-center"
                onClick={(e) => {
                  handleNavClick(e, '#radar');
                  setIsMobileMenuOpen(false);
                }}
              >
                3D Radar
              </a>
              <a 
                href="#about"
                className="text-base uppercase tracking-widest text-stone-200 py-2 min-h-[44px] flex items-center"
                onClick={(e) => {
                  handleNavClick(e, '#about');
                  setIsMobileMenuOpen(false);
                }}
              >
                About
              </a>
              <a 
                href="#faq"
                className="text-base uppercase tracking-widest text-stone-200 py-2 min-h-[44px] flex items-center"
                onClick={(e) => {
                  handleNavClick(e, '#faq');
                  setIsMobileMenuOpen(false);
                }}
              >
                FAQ
              </a>
              <a 
                href="#contact"
                className="text-base uppercase tracking-widest text-stone-200 py-2 min-h-[44px] flex items-center"
                onClick={(e) => {
                  handleNavClick(e, '#contact');
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact
              </a>
              <button 
                onClick={() => {
                  setCurrentView('compliance');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center text-left cursor-pointer ${
                  currentView === 'compliance' ? 'text-blue-400 font-bold' : 'text-stone-200'
                }`}
              >
                Compliance
              </button>
              <button 
                onClick={() => {
                  setCurrentView('training');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center font-bold text-left cursor-pointer ${
                  currentView === 'training' ? 'text-blue-400 underline underline-offset-4' : 'text-blue-400'
                }`}
              >
                Training
              </button>
              <a 
                href="#contact"
                onClick={(e) => {
                  handleNavClick(e, '#contact');
                  setIsMobileMenuOpen(false);
                }}
                className="mt-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm uppercase tracking-widest font-bold text-center min-h-[44px] flex items-center justify-center shadow-lg shadow-orange-500/20"
              >
                Consult an Advisor
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

// --- Hero Section ---

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-28 md:pt-36 pb-16 md:pb-20">
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative group">
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 80,
                  damping: 12,
                  duration: 0.8
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] text-white mb-8 tracking-tight drop-shadow-2xl"
              >
                Secure your <br />
                <motion.span 
                  animate={{ opacity: [0.85, 1, 0.85] }}
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
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg md:text-xl text-stone-300 mb-10 max-w-xl font-light leading-relaxed drop-shadow-md"
            >
              Leading cybersecurity consulting specializing in end-to-end governance, risk management, and strategic digital influence for the modern enterprise.
            </motion.p>

            {/* Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start w-full sm:w-auto"
            >
              <motion.a 
                href="#services"
                whileHover={{ scale: 1.02, brightness: 1.1 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 md:px-10 md:py-4 bg-white text-stone-950 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)] min-h-[48px] w-full sm:w-auto"
              >
                <span>Explore Services</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.02, brightness: 1.1 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 md:px-10 md:py-4 bg-orange-500 text-white rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all text-center flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] min-h-[48px] w-full sm:w-auto"
              >
                <span>Consult an Advisor</span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-3 gap-6 sm:gap-10 w-full"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">30+</div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider font-light mt-0.5">Global Clients</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider font-light mt-0.5">Defended Vectors</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">100%</div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider font-light mt-0.5">Audit Success</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Transparent Globe */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full">
            <CyberGlobe3D />
          </div>

        </div>
      </div>
    </section>
  );
};

// --- CountUp Component ---

const CountUp = ({ value, duration = 2000 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const isSpecial = value.includes('/');
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isSpecial) return;
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

// --- Track Record Metrics ---

const TrackRecord = () => {
  const metrics = [
    { id: 1, icon: <TrendingUp size={24} className="text-blue-400" />, value: "50+", label: "Enterprise Projects Delivered", glow: "blue" as const },
    { id: 2, icon: <Users size={24} className="text-blue-400" />, value: "30+", label: "Organizations Secured Globally", glow: "blue" as const },
    { id: 3, icon: <Star size={24} className="text-purple-400" />, value: "95%", label: "Client Retention Rate", glow: "purple" as const },
    { id: 4, icon: <Headphones size={24} className="text-orange-400" />, value: "24/7", label: "Advisory & Response Readiness", glow: "orange" as const }
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-3 block font-semibold">
            Telemetry & Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Measurable Cyber Resilience
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <TiltCard3D key={m.id} glowColor={m.glow}>
              <div className="flex flex-col items-center text-center">
                <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 mb-4 shadow-inner">
                  {m.icon}
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                  <CountUp value={m.value} />
                </div>
                <p className="text-xs uppercase tracking-wider text-stone-400 font-sans leading-relaxed">
                  {m.label}
                </p>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Services Matrix ---

const Services = () => {
  const [activeBrief, setActiveBrief] = useState<number | null>(null);

  const expertises = [
    {
      title: "Cyber Security GRC",
      subtitle: "Governance, Risk & Compliance",
      desc: "Establish enterprise-wide risk visibility, regulatory compliance maturity, and audit readiness for global cybersecurity frameworks.",
      icon: Shield,
      glow: "blue" as const,
      standards: ["ISO 27001", "NIST CSF", "SOC 2 Type II", "DPDP Act"],
      whatWeDo: [
        "Information security policies, standards, and ISMS architecture",
        "Enterprise risk register development and vendor risk assessments",
        "Business Continuity (BCP) & Disaster Recovery (DRP) planning",
        "Comprehensive regulatory audit readiness and mock audits"
      ]
    },
    {
      title: "VAPT & Offensive Security",
      subtitle: "Penetration Testing & Red Teaming",
      desc: "Identify, exploit, and remediate deep vulnerabilities across web applications, mobile platforms, APIs, and cloud networks before attackers do.",
      icon: Lock,
      glow: "orange" as const,
      standards: ["OWASP Top 10", "Network Penetration", "API Security", "Red Teaming"],
      whatWeDo: [
        "Web, mobile app, and GraphQL/REST API penetration testing",
        "Network infrastructure assessment and internal/external testing",
        "Cloud configuration audit and microservice boundary validation",
        "Remediation governance and executive assurance reporting"
      ]
    },
    {
      title: "Cloud & DevSecOps Security",
      subtitle: "AWS, Azure & GCP Hardening",
      desc: "Architect resilient multi-cloud environments, automated CI/CD security pipelines, and zero-trust perimeter configurations.",
      icon: Globe,
      glow: "blue" as const,
      standards: ["CIS Benchmarks", "Terraform / IaC", "Kubernetes", "IAM Zero Trust"],
      whatWeDo: [
        "Cloud Security Posture Management (CSPM) implementation",
        "Infrastructure as Code (IaC) security linting and automated gating",
        "Kubernetes container security and secrets management",
        "IAM privilege reduction and least-privilege enforcement"
      ]
    },
    {
      title: "AI Governance & LLM Safety",
      subtitle: "Model Security & Ethical Compliance",
      desc: "Mitigate model poisoning, prompt injection exploits, data privacy leakages, and non-compliance in enterprise generative AI systems.",
      icon: Brain,
      glow: "purple" as const,
      standards: ["NIST AI RMF", "EU AI Act", "OWASP for LLM", "Prompt Hardening"],
      whatWeDo: [
        "LLM red teaming and adversarial prompt injection testing",
        "Training data privacy and RAG vector store isolation checks",
        "AI model bias, safety alignment, and ethical auditing",
        "Enterprise AI usage policies and executive compliance oversight"
      ]
    },
    {
      title: "Threat Intelligence & OSINT",
      subtitle: "Dark Web & Brand Protection",
      desc: "Proactive surveillance of dark web credential dumps, executive identity exposure, leaked infrastructure tokens, and emerging threat actors.",
      icon: Radar,
      glow: "blue" as const,
      standards: ["MITRE ATT&CK", "OSINT Threat Hunting", "Brand Exposure", "C2 Detection"],
      whatWeDo: [
        "Continuous dark web credential leak and paste-site monitoring",
        "Executive digital footprint protection and VIP threat defense",
        "Phishing domain detection and automated takedown facilitation",
        "Tailored threat feeds mapping your industry's attacker vectors"
      ]
    },
    {
      title: "Security Architecture & SOC",
      subtitle: "Zero Trust & Defensive Engineering",
      desc: "Design zero-trust enterprise security architectures, SIEM/SOAR incident response protocols, and proactive SOC workflows.",
      icon: Layers,
      glow: "blue" as const,
      standards: ["Zero Trust Architecture", "SIEM/SOC Integration", "IR Playbooks", "SOC 2"],
      whatWeDo: [
        "Zero-trust network architecture (ZTNA) implementation",
        "Security Operations Center (SOC) logging and alert tuning",
        "Incident response playbooks and crisis tabletop simulations",
        "Security-by-design reviews for new products and integrations"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-gradient-to-b from-transparent via-[#020510]/55 to-[#010309]/80 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-3 block font-semibold">
            Enterprise Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Full-Spectrum Cybersecurity Solutions
          </h2>
          <p className="text-stone-400 text-base md:text-lg max-w-2xl mt-4 font-light mx-auto">
            Engineered to defend modern infrastructure, satisfy rigorous regulatory audits, and reduce enterprise risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertises.map((service, idx) => {
            const Icon = service.icon;
            return (
              <TiltCard3D key={idx} glowColor={service.glow}>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-blue-400 shadow-md">
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-blue-400 uppercase tracking-wider mb-4 font-medium">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-stone-300 font-light leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.standards.map((st) => (
                        <span key={st} className="text-[10px] font-mono bg-stone-900/90 border border-stone-800 px-2.5 py-1 rounded-md text-stone-300">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveBrief(idx)}
                    className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-blue-500/20 border border-stone-800 hover:border-blue-500/40 text-xs text-stone-300 hover:text-white font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Inspect Capability Dossier</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeBrief !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-stone-950 border border-blue-500/30 rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(59,130,246,0.15)] relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveBrief(null)}
                className="absolute top-6 right-6 p-2 text-stone-400 hover:text-white rounded-full bg-stone-900 border border-stone-800 cursor-pointer z-20"
                aria-label="Close capability dossier"
              >
                <X size={20} />
              </button>
              <ServiceModalRenderer
                activeBrief={activeBrief}
                data={expertises[activeBrief]}
                close={() => setActiveBrief(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Why Choose Us ---

const WhyChooseUs = () => {
  const pillars = [
    { title: "Framework-Agnostic Mastery", desc: "Seamless compliance translation across ISO 27001, SOC 2, NIST CSF, HIPAA, and DPDP Act without redundant audit friction.", icon: ShieldCheck },
    { title: "Offensive-Defensive Synergy", desc: "Our red-team penetration testing directly informs your defensive architecture and ISMS policies for hardened real-world protection.", icon: Target },
    { title: "Executive & Board Advisory", desc: "We translate complex CVE telemetry and cyber risks into actionable business metrics for CEOs, boards, and audit committees.", icon: BarChart3 },
    { title: "Continuous Risk Governance", desc: "Security is not a point-in-time report. We provide ongoing advisory, remediation tracking, and 24/7 incident response readiness.", icon: Zap }
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-stone-950/60 border-t border-stone-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-3 block font-semibold">
            The Cybravion Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Why Industry Leaders Rely on Cybravion
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <TiltCard3D key={idx} glowColor={idx % 2 === 0 ? "blue" : "purple"}>
                <div className="flex items-start gap-5">
                  <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-blue-400 shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-stone-300 font-light leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Contact Section ---

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs uppercase tracking-widest font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Direct Engagement
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
              Initiate a Confidential Security Briefing
            </h2>
            <p className="text-stone-300 font-light text-base leading-relaxed mb-8">
              Speak with our senior cybersecurity advisors to scope your VAPT assessment, design an ISO 27001 / SOC 2 compliance roadmap, or evaluate AI governance controls.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3.5 text-stone-300">
                <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-blue-400">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-stone-500 tracking-wider">Official Email</div>
                  <a href="mailto:cybravions@gmail.com" className="text-sm hover:text-white transition-colors font-medium">
                    cybravions@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-stone-300">
                <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-blue-400">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-stone-500 tracking-wider">Direct Contact</div>
                  <a href="tel:+919358683634" className="text-sm hover:text-white transition-colors font-medium">
                    +91-9358683634
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-stone-300">
                <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-blue-400">
                  <Globe size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-stone-500 tracking-wider">Coverage</div>
                  <span className="text-sm font-medium">Global Enterprise Advisory (Worldwide)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <TiltCard3D glowColor="orange">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/40">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Transmission Received</h3>
                  <p className="text-sm text-stone-400 font-light max-w-md mx-auto">
                    Our lead security consultant will review your specifications and contact you within 1 business day under NDA.
                  </p>
                </div>
              ) : (
                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  onSubmit={() => setFormSubmitted(true)}
                  className="space-y-4"
                >
                  <input type="hidden" name="access_key" value="8f121d5a-8bc2-4c28-bbbe-5c628e46dc96" />
                  <input type="hidden" name="subject" value="New Advisory Request via Cybravion" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-medium">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Dr. Alex Vance"
                        className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder:text-stone-600 focus:outline-none focus:border-blue-400 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-medium">Corporate Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="alex@enterprise.com"
                        className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder:text-stone-600 focus:outline-none focus:border-blue-400 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-medium">Primary Area of Interest</label>
                    <select
                      name="service"
                      className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-blue-400"
                    >
                      <option value="GRC & ISO 27001">Cybersecurity GRC & ISO 27001 / SOC 2</option>
                      <option value="VAPT Testing">Offensive Security & VAPT Assessment</option>
                      <option value="Cloud Security">Cloud Architecture & DevSecOps Hardening</option>
                      <option value="AI Governance">AI Risk Governance & LLM Red Teaming</option>
                      <option value="Threat Intelligence">Dark Web & Threat Intelligence Monitoring</option>
                      <option value="Security Architecture">Zero Trust Architecture & SOC Advisory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-medium">Scope & Requirements</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe your organization's target compliance frameworks, infrastructure scale, or security objectives..."
                      className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white placeholder:text-stone-600 focus:outline-none focus:border-blue-400 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold uppercase tracking-widest text-xs shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Request Confidential Briefing</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </TiltCard3D>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- FAQ Component ---

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is VAPT and why is it critical for enterprise compliance?",
      a: "Vulnerability Assessment and Penetration Testing (VAPT) is a rigorous offensive methodology that proactively discovers and exploits vulnerabilities across applications, APIs, and cloud perimeters before adversaries can. It satisfies mandatory controls for ISO 27001, SOC 2, HIPAA, and PCI-DSS."
    },
    {
      q: "How does Cybravion support startups vs global enterprises?",
      a: "Our engagements are modular. For fast-growing startups, we deliver rapid SOC 2 / ISO 27001 readiness roadmaps and lightweight VAPT. For large enterprises, we deliver full-scale Zero Trust architecture, AI model red teaming, and ongoing multi-cloud GRC governance."
    },
    {
      q: "What is your typical engagement timeline?",
      a: "A focused VAPT assessment typically concludes within 1–3 weeks with remediation re-validation. Comprehensive enterprise GRC or ISO 27001 ISMS certification roadmaps range between 4–8 weeks with zero business disruption."
    },
    {
      q: "Do you provide hands-on remediation support or only reports?",
      a: "We provide end-to-end advisory: actionable developer guidance, code-level remediation roadmaps, cloud IAM reconfigurations, and post-audit validation."
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-stone-950/60 border-t border-stone-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-3 block font-semibold">
            Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-stone-900/60 border border-stone-800 overflow-hidden transition-colors hover:border-stone-700"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-semibold text-base sm:text-lg text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-blue-400 shrink-0 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-6 pb-6 text-sm text-stone-300 font-light leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Footer ---

const Footer = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
  return (
    <footer className="py-16 px-6 md:px-12 lg:px-20 bg-stone-950 border-t border-stone-900 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Cybravion Logo" className="h-8 w-auto object-contain" />
          <div className="flex flex-col">
            <span className="font-orbitron text-base font-bold tracking-[0.2em] uppercase text-white">
              CYBR<span className="text-blue-500">AVION</span>
            </span>
            <span className="text-[7px] tracking-[0.25em] text-stone-500 font-semibold uppercase">
              SECURE. GOVERN. EMPOWER.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase text-stone-400 tracking-wider">
          <a href="#services" onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Services</a>
          <a href="#radar" onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">3D Radar</a>
          <button onClick={() => { setCurrentView('compliance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Compliance</button>
          <button onClick={() => { setCurrentView('training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Training</button>
          <a href="https://exceptionmgr.cybravions.online" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Exception Manager</a>
          <a href="#contact" onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="text-xs text-stone-500 font-sans">
          © {new Date().getFullYear()} CYBRAVION Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Main Application ---

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen bg-[#010206] text-stone-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden font-sans">
      <Helmet>
        <title>CYBRAVION Solutions | Next-Gen 3D Cybersecurity & Risk Governance</title>
        <meta name="description" content="Elite cybersecurity consulting — 3D threat intelligence, GRC, VAPT, cloud security & AI governance for modern enterprises." />
        <link rel="canonical" href="https://cybravions.online/" />
      </Helmet>

      {/* Persistent Full-Viewport 3D Background */}
      <Scene3D />

      <div className="relative z-10">
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />

        <main id="main-content">
          {currentView === 'training' ? (
            <TrainingPage />
          ) : currentView === 'compliance' ? (
            <CompliancePage />
          ) : (
            <>
              <Hero />
              <TrackRecord />
              <Services />
              <div id="radar">
                <ThreatRadar3D />
              </div>
              <TrustCredibility />
              <CaseStudies />
              <IndustrySolutions />
              <WhyChooseUs />
              <Insights />
              <Contact />
              <FAQ />
            </>
          )}
        </main>

        <Footer setCurrentView={setCurrentView} />
      </div>
    </div>
  );
}
