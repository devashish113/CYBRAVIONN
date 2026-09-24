import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Brain, 
  Globe, 
  Radar, 
  GraduationCap, 
  ArrowRight, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Zap,
  Server,
  Cloud,
  CheckCircle2,
  Clock,
  KeyRound
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface CyberHeroSliderProps {
  isDarkMode: boolean;
  setCurrentView: (view: string) => void;
}

interface SlideData {
  id: string;
  tabLabel: string;
  tag: string;
  icon: React.ElementType;
  titlePart1: string;
  titleGradient: string;
  desc: string;
  pills: string[];
  ctaText: string;
  ctaAction: () => void;
  accentColor: 'blue' | 'orange';
}

export const CyberHeroSlider: React.FC<CyberHeroSliderProps> = ({ isDarkMode, setCurrentView }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (hash: string) => {
    cyberAudio.playClick();
    setCurrentView('home');
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = hash;
      }
    }, 100);
  };

  const slides: SlideData[] = [
    {
      id: 'ai-defense',
      tabLabel: 'Sovereign AI',
      tag: 'SOVEREIGN AI DEFENSE',
      icon: Brain,
      titlePart1: 'Private Enterprise AI,',
      titleGradient: 'Air-Gapped & Sovereign.',
      desc: 'Deploy high-performance agentic AI directly inside your private infrastructure with mathematical data isolation, zero leakage, and enterprise guardrails.',
      pills: ['100% On-Prem & VPC Isolation', 'Zero External Model Telemetry', 'NIST AI RMF & EU AI Act Ready'],
      ctaText: 'Explore Cybravions AI',
      ctaAction: () => {
        cyberAudio.playClick();
        setCurrentView('ai');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      accentColor: 'blue'
    },
    {
      id: 'grc-compliance',
      tabLabel: 'Automated GRC',
      tag: 'AUTOMATED COMPLIANCE & GRC',
      icon: ShieldCheck,
      titlePart1: 'Continuous Governance,',
      titleGradient: 'Audit-Ready From Day 1.',
      desc: 'Automate your ISO 27001, SOC 2 Type II, and NIST compliance roadmaps with real-time evidence collection, policy telemetry, and zero business friction.',
      pills: ['Audit-Ready Evidence Automation', 'ISO 27001, SOC 2 & HIPAA', 'Continuous Policy Drift Detection'],
      ctaText: 'Explore Compliance Center',
      ctaAction: () => {
        cyberAudio.playClick();
        setCurrentView('compliance');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      accentColor: 'blue'
    },
    {
      id: 'vapt-redteam',
      tabLabel: 'Offensive VAPT',
      tag: 'OFFENSIVE SECURITY & RED TEAMING',
      icon: Lock,
      titlePart1: 'Proactive Pentesting,',
      titleGradient: 'Find Flaws Before Hackers.',
      desc: 'Rigorous adversary emulation across web applications, cloud networks, and APIs to uncover and eliminate critical zero-day vulnerabilities.',
      pills: ['Web, Mobile & API Pentesting', 'Zero-Day Exploit PoCs', 'Developer Remediation Roadmaps'],
      ctaText: 'Schedule Security Pentest',
      ctaAction: () => handleNavClick('#contact'),
      accentColor: 'orange'
    },
    {
      id: 'darkweb-intel',
      tabLabel: 'Threat Radar',
      tag: 'THREAT INTELLIGENCE & OSINT',
      icon: Radar,
      titlePart1: 'Threat Intelligence,',
      titleGradient: '24/7 Dark Web Monitoring.',
      desc: 'Round-the-clock surveillance of underground forums and leaked dumps to protect against compromised credentials, executive exposure, and ransomware.',
      pills: ['Continuous Dark Web Surveillance', 'Compromised Token Detection', 'Live 3D Threat Radar Simulation'],
      ctaText: 'Launch 3D Threat Radar',
      ctaAction: () => handleNavClick('#radar'),
      accentColor: 'blue'
    },
    {
      id: 'zero-trust',
      tabLabel: 'Zero Trust Cloud',
      tag: 'CLOUD RESILIENCE & ZERO TRUST',
      icon: Cloud,
      titlePart1: 'Zero Trust Architecture,',
      titleGradient: 'Multi-Cloud Resilience.',
      desc: 'Eliminate implicit trust across AWS, Azure, and Google Cloud with strict least-privilege identity access, micro-segmentation, and automated CI/CD gating.',
      pills: ['Least-Privilege IAM Enforcement', 'Kubernetes & IaC Hardening', 'Multi-Cloud Posture Governance'],
      ctaText: 'Explore Cloud Capabilities',
      ctaAction: () => handleNavClick('#services'),
      accentColor: 'orange'
    },
    {
      id: 'cyber-training',
      tabLabel: 'Cyber Academy',
      tag: 'CYBER ACADEMY & TRAINING',
      icon: GraduationCap,
      titlePart1: 'Workforce Resilience,',
      titleGradient: 'Defend Against Social Attacks.',
      desc: 'Empower leadership, developers, and staff with realistic phishing simulations, crisis tabletop drills, and certified workforce defense labs.',
      pills: ['Simulated Phishing Campaigns', 'Executive Crisis Tabletop Drills', 'Hands-on Red/Blue Team Labs'],
      ctaText: 'Explore Cyber Academy',
      ctaAction: () => {
        cyberAudio.playClick();
        setCurrentView('training');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      accentColor: 'blue'
    }
  ];

  const totalSlides = slides.length;

  const paginate = useCallback((newDirection: number) => {
    cyberAudio.playClick();
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = totalSlides - 1;
      if (nextIndex >= totalSlides) nextIndex = 0;
      return nextIndex;
    });
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    cyberAudio.playClick();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play timer (slides every 7 seconds)
  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, 7000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, paginate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const currentSlide = slides[currentIndex];
  const CurrentIcon = currentSlide.icon;

  // Slide transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[90vh] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden bg-transparent pt-28 md:pt-36 pb-12 select-none"
    >
      {/* Subtle Royal Blue & Cyber Orange Ambient Backdrops */}
      <div 
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: isDarkMode ? '#1d4ed8' : '#bfdbfe' }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-12 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: isDarkMode ? '#ea580c' : '#fed7aa' }}
      />

      {/* Grid line overlay */}
      <div 
        className="absolute inset-0 -z-10 opacity-25 dark:opacity-10 pointer-events-none bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000_60%,transparent_90%)]"
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(rgba(37, 99, 235, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.12) 1px, transparent 1px)'
            : 'linear-gradient(rgba(2, 132, 199, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 132, 199, 0.08) 1px, transparent 1px)'
        }}
      />

      {/* Floating Side Arrow Navigation Buttons */}
      <div className="hidden sm:block absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous Slide"
          className={`p-3 rounded-full transition-all duration-300 backdrop-blur-xl flex items-center justify-center cursor-pointer ${
            isDarkMode 
              ? 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-orange-400 border border-stone-800 hover:border-orange-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]' 
              : 'bg-white/90 hover:bg-white text-slate-700 hover:text-orange-600 border border-slate-200 hover:border-orange-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
          } hover:scale-110 active:scale-95`}
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      <div className="hidden sm:block absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={() => paginate(1)}
          aria-label="Next Slide"
          className={`p-3 rounded-full transition-all duration-300 backdrop-blur-xl flex items-center justify-center cursor-pointer ${
            isDarkMode 
              ? 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-orange-400 border border-stone-800 hover:border-orange-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]' 
              : 'bg-white/90 hover:bg-white text-slate-700 hover:text-orange-600 border border-slate-200 hover:border-orange-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
          } hover:scale-110 active:scale-95`}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* MAIN CENTERED HERO SLIDE CONTENT */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 max-w-5xl mx-auto flex-1 flex flex-col justify-center items-center text-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center max-w-4xl"
          >
            {/* Category Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.25em] font-mono font-bold text-orange-600 dark:text-orange-400 border border-orange-500/20 bg-orange-500/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>{currentSlide.tag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] text-slate-900 dark:text-white mb-6 tracking-tight">
              {currentSlide.titlePart1} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-orange-600 dark:from-blue-400 dark:via-sky-300 dark:to-orange-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(249,115,22,0.25)]">
                {currentSlide.titleGradient}
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-stone-300 mb-8 max-w-2xl font-normal leading-relaxed">
              {currentSlide.desc}
            </p>

            {/* Key Capability Checkmark Pills */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center mb-10 max-w-3xl">
              {currentSlide.pills.map((pill, idx) => (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide border transition-all ${
                    isDarkMode
                      ? 'bg-stone-900/90 border-stone-800 text-stone-200 shadow-sm'
                      : 'bg-white/95 border-slate-200 text-slate-800 shadow-sm'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-500 dark:text-orange-400 flex items-center justify-center font-bold">
                    <Check size={12} className="stroke-[3]" />
                  </span>
                  <span>{pill}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={currentSlide.ctaAction}
                className="w-full sm:w-auto px-9 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-3 group min-h-[50px] cursor-pointer text-white shadow-lg bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500 hover:from-blue-500 hover:via-sky-400 hover:to-orange-400 shadow-blue-500/20 hover:shadow-orange-500/30"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className={`w-full sm:w-auto px-9 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center min-h-[50px] cursor-pointer border ${
                  isDarkMode
                    ? 'bg-stone-950/80 hover:bg-stone-900 text-stone-200 border-stone-800 hover:border-orange-500/50'
                    : 'bg-white/90 hover:bg-white text-slate-800 border-slate-300 shadow-sm'
                }`}
              >
                <span>Consult an Advisor</span>
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM SLIDE PROGRESS INDICATOR & ENTERPRISE TRUST METRICS BAR */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 mt-8">
        
        {/* Carousel Timer Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-200/80 dark:bg-stone-950/80 border border-slate-300/80 dark:border-stone-800 backdrop-blur-xl shadow-md">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'w-10 sm:w-14 h-2 bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]'
                      : 'w-2 h-2 bg-slate-400 dark:bg-stone-700 hover:bg-slate-600 dark:hover:bg-stone-500'
                  }`}
                >
                  {isActive && !isPaused && (
                    <motion.div
                      key={`progress-${currentIndex}`}
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 7, ease: "linear" }}
                      className="absolute inset-0 bg-white/40"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Enterprise Live Trust & SLA Metrics Strip */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 sm:p-4 rounded-2xl border backdrop-blur-xl ${
          isDarkMode
            ? 'bg-stone-950/60 border-stone-800/80 text-stone-300'
            : 'bg-white/70 border-slate-200 text-slate-700 shadow-sm'
        }`}>
          <div className="flex items-center gap-2.5 px-2">
            <ShieldCheck size={16} className="text-blue-500 shrink-0" />
            <div>
              <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-stone-100">
                100% Air-Gapped
              </div>
              <div className="text-[10px] text-slate-500 dark:text-stone-400 font-light">
                Private VPC / On-Prem
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <Clock size={16} className="text-orange-500 shrink-0" />
            <div>
              <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-stone-100">
                &lt;15 Min IR SLA
              </div>
              <div className="text-[10px] text-slate-500 dark:text-stone-400 font-light">
                Rapid Incident Containment
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <Lock size={16} className="text-blue-500 shrink-0" />
            <div>
              <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-stone-100">
                ISO &amp; SOC 2 Ready
              </div>
              <div className="text-[10px] text-slate-500 dark:text-stone-400 font-light">
                Continuous GRC Evidence
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <Zap size={16} className="text-orange-500 shrink-0" />
            <div>
              <div className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-stone-100">
                Zero Data Leakage
              </div>
              <div className="text-[10px] text-slate-500 dark:text-stone-400 font-light">
                Cryptographic Guardrails
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
