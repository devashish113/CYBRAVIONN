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
  Cpu, 
  Activity, 
  Terminal,
  RefreshCw,
  Server,
  Database,
  Cloud,
  UserCheck
} from 'lucide-react';

interface CyberHeroSliderProps {
  isDarkMode: boolean;
  setCurrentView: (view: string) => void;
}

interface SlideData {
  id: string;
  tag: string;
  titlePart1: string;
  titleGradient: string;
  desc: string;
  pills: string[];
  ctaText: string;
  ctaAction: () => void;
  ctaColor: 'cyan' | 'orange' | 'purple' | 'blue' | 'emerald';
  themeColor: string;
  diagram: {
    topTitle: string;
    topSubtitle: string;
    topIcon: React.ElementType;
    midTitle: string;
    midSubtitle: string;
    botTitle: string;
    botSubtitle: string;
    botIcon: React.ElementType;
  };
}

export const CyberHeroSlider: React.FC<CyberHeroSliderProps> = ({ isDarkMode, setCurrentView }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (hash: string) => {
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
      tag: 'SOVEREIGN AI DEFENSE',
      titlePart1: 'Private Enterprise AI,',
      titleGradient: 'Air-Gapped & Secure.',
      desc: 'Deploy high-performance AI models directly inside your private infrastructure with zero data leakage and enterprise guardrails.',
      pills: ['100% Private Cloud', 'Zero Data Leakage', 'Enterprise Guardrails'],
      ctaText: 'Explore AI Solutions',
      ctaAction: () => {
        setCurrentView('ai');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      ctaColor: 'cyan',
      themeColor: '#06b6d4',
      diagram: {
        topTitle: 'Corporate Data Boundary',
        topSubtitle: 'Proprietary data & IP workflows',
        topIcon: Database,
        midTitle: 'Sovereign AI Engine',
        midSubtitle: 'Air-Gapped Guardrails',
        botTitle: 'Private LLM Enclave',
        botSubtitle: 'Isolated on-premise compute cluster',
        botIcon: Brain
      }
    },
    {
      id: 'grc-compliance',
      tag: 'AUTOMATED COMPLIANCE & GRC',
      titlePart1: 'Continuous Compliance,',
      titleGradient: 'Audit-Ready From Day 1.',
      desc: 'Automate your ISO 27001, SOC 2, and NIST compliance roadmaps with real-time evidence collection and vendor risk management.',
      pills: ['Audit-Ready Evidence', 'ISO 27001 & SOC 2', 'Continuous Monitoring'],
      ctaText: 'Explore Compliance',
      ctaAction: () => {
        setCurrentView('compliance');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      ctaColor: 'blue',
      themeColor: '#3b82f6',
      diagram: {
        topTitle: 'Security & Access Policies',
        topSubtitle: 'Live cloud policies & IAM controls',
        topIcon: Shield,
        midTitle: 'Automated GRC Engine',
        midSubtitle: 'Real-Time Evidence Sync',
        botTitle: 'Auditor-Verified Reports',
        botSubtitle: 'Zero-friction compliance certification',
        botIcon: ShieldCheck
      }
    },
    {
      id: 'vapt-redteam',
      tag: 'OFFENSIVE SECURITY & VAPT',
      titlePart1: 'Proactive Pentesting,',
      titleGradient: 'Find Flaws Before Hackers.',
      desc: 'Rigorous penetration testing across web applications, cloud networks, and APIs to uncover and patch critical zero-day vulnerabilities.',
      pills: ['Web & Cloud Pentesting', 'Zero-Day Detection', 'Actionable Fix Plans'],
      ctaText: 'Schedule Pentest',
      ctaAction: () => handleNavClick('#contact'),
      ctaColor: 'orange',
      themeColor: '#f97316',
      diagram: {
        topTitle: 'External Attack Surface',
        topSubtitle: 'Public endpoints, APIs & web assets',
        topIcon: Globe,
        midTitle: 'Red Team Exploitation',
        midSubtitle: 'Deep Vulnerability Analysis',
        botTitle: 'Hardened Infrastructure',
        botSubtitle: 'Verified patches & zero-day defense',
        botIcon: Lock
      }
    },
    {
      id: 'darkweb-intel',
      tag: 'THREAT INTELLIGENCE & RADAR',
      titlePart1: 'Threat Intelligence,',
      titleGradient: '24/7 Dark Web Monitoring.',
      desc: 'Round-the-clock surveillance of underground forums and leaked dumps to protect against stolen credentials and targeted ransomware.',
      pills: ['Dark Web Surveillance', 'Compromised Creds Alert', '24/7 Threat Radar'],
      ctaText: 'View Threat Radar',
      ctaAction: () => handleNavClick('#radar'),
      ctaColor: 'emerald',
      themeColor: '#10b981',
      diagram: {
        topTitle: 'Global Threat Feeds',
        topSubtitle: 'Underground forums & paste dumps',
        topIcon: Radar,
        midTitle: 'Intelligence Engine',
        midSubtitle: 'Real-Time Threat Matching',
        botTitle: 'Incident Response Alert',
        botSubtitle: 'Rapid mitigation & threat containment',
        botIcon: Activity
      }
    },
    {
      id: 'zero-trust',
      tag: 'CLOUD DEFENSE & ZERO TRUST',
      titlePart1: 'Zero Trust Security,',
      titleGradient: 'Complete Cloud Resilience.',
      desc: 'Eliminate implicit trust across AWS, Azure, and Google Cloud with strict least-privilege identity access and micro-segmentation.',
      pills: ['Least-Privilege Access', 'Multi-Cloud Security', 'Micro-Segmentation'],
      ctaText: 'Explore Cloud Defense',
      ctaAction: () => handleNavClick('#services'),
      ctaColor: 'purple',
      themeColor: '#a855f7',
      diagram: {
        topTitle: 'Multi-Cloud Workloads',
        topSubtitle: 'AWS, Azure, GCP & hybrid servers',
        topIcon: Cloud,
        midTitle: 'Zero Trust Verification',
        midSubtitle: 'Dynamic Context Enforcement',
        botTitle: 'Isolated Workload Enclave',
        botSubtitle: 'Cryptographically protected perimeters',
        botIcon: Layers
      }
    },
    {
      id: 'cyber-training',
      tag: 'CYBER ACADEMY & TRAINING',
      titlePart1: 'Human Defense,',
      titleGradient: 'Build a Resilient Culture.',
      desc: 'Empower leadership, developers, and employees with realistic phishing simulations and hands-on crisis incident response drills.',
      pills: ['Phishing Simulations', 'Executive Tabletop Drills', 'Certified Workshops'],
      ctaText: 'Explore Cyber Academy',
      ctaAction: () => {
        setCurrentView('training');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      ctaColor: 'blue',
      themeColor: '#3b82f6',
      diagram: {
        topTitle: 'Enterprise Workforce',
        topSubtitle: 'Employees, developers & leadership',
        topIcon: UserCheck,
        midTitle: 'Cyber Range Simulations',
        midSubtitle: 'Realistic Attack Drills',
        botTitle: 'Certified Cyber Readiness',
        botSubtitle: 'Zero-failure human defense posture',
        botIcon: GraduationCap
      }
    }
  ];

  const totalSlides = slides.length;

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = totalSlides - 1;
      if (nextIndex >= totalSlides) nextIndex = 0;
      return nextIndex;
    });
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play timer (slides every 6 seconds)
  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, 6000);

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
  const TopIcon = currentSlide.diagram.topIcon;
  const BotIcon = currentSlide.diagram.botIcon;

  // Slide transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1]
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.35,
        ease: [0.25, 1, 0.5, 1]
      }
    })
  };

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[92vh] lg:min-h-[94vh] flex flex-col justify-center overflow-hidden bg-transparent pt-24 md:pt-32 pb-16 select-none"
    >
      {/* Dynamic Ambient Aura Backdrop matching slide theme color */}
      <div 
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: currentSlide.themeColor }}
      />
      <div 
        className="absolute top-1/2 right-10 w-[450px] h-[450px] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: isDarkMode ? '#1e1b4b' : '#bae6fd' }}
      />

      {/* Grid line overlay */}
      <div 
        className="absolute inset-0 -z-10 opacity-30 dark:opacity-15 pointer-events-none bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000_50%,transparent_85%)]"
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(rgba(0, 240, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.12) 1px, transparent 1px)'
            : 'linear-gradient(rgba(2, 132, 199, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 132, 199, 0.1) 1px, transparent 1px)'
        }}
      />

      {/* Floating Side Arrow Navigation Buttons */}
      <div className="absolute left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous Slide"
          className={`p-3 rounded-full transition-all duration-300 backdrop-blur-xl flex items-center justify-center cursor-pointer ${
            isDarkMode 
              ? 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-cyan-400 border border-stone-800 hover:border-cyan-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]' 
              : 'bg-white/90 hover:bg-white text-slate-700 hover:text-cyan-600 border border-slate-200 hover:border-cyan-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
          } hover:scale-110 active:scale-95`}
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      <div className="absolute right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={() => paginate(1)}
          aria-label="Next Slide"
          className={`p-3 rounded-full transition-all duration-300 backdrop-blur-xl flex items-center justify-center cursor-pointer ${
            isDarkMode 
              ? 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-cyan-400 border border-stone-800 hover:border-cyan-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]' 
              : 'bg-white/90 hover:bg-white text-slate-700 hover:text-cyan-600 border border-slate-200 hover:border-cyan-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
          } hover:scale-110 active:scale-95`}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Main Slide Carousel Container */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24 max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >


            {/* LEFT COLUMN: HERO HEADLINE, PILLS & CTA */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono font-bold text-orange-600 dark:text-orange-400 mb-5">
                <span className="h-0.5 w-6 bg-orange-500 rounded-full" />
                <span>{currentSlide.tag}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] text-slate-900 dark:text-white mb-6 tracking-tight">
                {currentSlide.titlePart1} <br />
                <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-orange-600 dark:from-blue-400 dark:via-sky-300 dark:to-orange-400 bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(249,115,22,0.25)]">
                  {currentSlide.titleGradient}
                </span>
              </h1>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg text-slate-700 dark:text-stone-300 mb-8 max-w-xl font-normal leading-relaxed">
                {currentSlide.desc}
              </p>

              {/* Checkmark Badge Pills */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start mb-8">
                {currentSlide.pills.map((pill, idx) => (
                  <div
                    key={idx}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                      isDarkMode
                        ? 'bg-black/80 border-stone-800 text-stone-200 shadow-sm'
                        : 'bg-white/95 border-slate-200 text-slate-800 shadow-sm'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-500 dark:text-orange-400 flex items-center justify-center font-bold">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span>{pill}</span>
                  </div>
                ))}
              </div>

              {/* Action CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={currentSlide.ctaAction}
                  className="px-8 py-4 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-3 group min-h-[48px] cursor-pointer text-white shadow-lg bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500 hover:from-blue-500 hover:via-sky-400 hover:to-orange-400 shadow-blue-500/20 hover:shadow-orange-500/30"
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
                  className={`px-8 py-4 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center min-h-[48px] cursor-pointer border ${
                    isDarkMode
                      ? 'bg-black/80 hover:bg-stone-900 text-stone-200 border-stone-800 hover:border-orange-500/50'
                      : 'bg-white/80 hover:bg-white text-slate-800 border-slate-300'
                  }`}
                >
                  <span>Consult an Advisor</span>
                </motion.a>
              </div>

            </div>

            {/* RIGHT COLUMN: ANIMATED ARCHITECTURAL DIAGRAM */}
            <div className="lg:col-span-6 flex items-center justify-center w-full">
              <div className="relative w-full max-w-[480px] flex flex-col items-center">
                
                {/* Outer Glass Card Container */}
                <div className={`w-full rounded-3xl p-6 sm:p-8 backdrop-blur-2xl border transition-all duration-500 shadow-2xl relative overflow-hidden ${
                  isDarkMode
                    ? 'bg-stone-900/80 border-stone-800 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                    : 'bg-white/95 border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
                }`}>
                  
                  {/* Decorative Corner Glow */}
                  <div 
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
                    style={{ backgroundColor: currentSlide.themeColor }}
                  />

                  {/* Top Architecture Node */}
                  <div className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                    isDarkMode 
                      ? 'bg-black/70 border-blue-500/30' 
                      : 'bg-slate-50 border-blue-500/30'
                  }`}>
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20">
                      <TopIcon size={20} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {currentSlide.diagram.topTitle}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-stone-400 font-mono">
                        {currentSlide.diagram.topSubtitle}
                      </div>
                    </div>
                  </div>

                  {/* Vertical Connector 1 with Pulse Engine */}
                  <div className="flex flex-col items-center my-3 relative">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 via-sky-400 to-orange-500 opacity-60" />
                    <div className="flex items-center gap-1.5 py-1 text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                      <span>{currentSlide.diagram.midSubtitle}</span>
                    </div>
                    <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 via-sky-400 to-orange-500 opacity-60" />
                  </div>

                  {/* Middle Central Core Engine Node */}
                  <div className="flex justify-center my-1">
                    <div className="relative p-1 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-orange-500 p-[2px] shadow-[0_0_30px_rgba(249,115,22,0.35)]">
                      <div className="px-6 py-3 rounded-full bg-black text-white flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                          className="text-orange-400"
                        >
                          <RefreshCw size={15} />
                        </motion.div>
                        <span className="text-xs sm:text-sm font-extrabold tracking-wider font-mono text-orange-300 uppercase">
                          {currentSlide.diagram.midTitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Connector 2 */}
                  <div className="flex flex-col items-center my-3 relative">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-orange-500 via-amber-400 to-blue-500 opacity-60" />
                    <div className="flex items-center gap-1.5 py-1 text-[10px] font-mono font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      <span>Synchronize &amp; Enforce</span>
                    </div>
                    <div className="w-0.5 h-6 bg-gradient-to-b from-orange-500 via-sky-500 to-blue-500 opacity-60" />
                  </div>

                  {/* Bottom Architecture Node */}
                  <div className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                    isDarkMode 
                      ? 'bg-black/70 border-orange-500/30' 
                      : 'bg-slate-50 border-orange-500/30'
                  }`}>
                    <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 dark:text-orange-400 border border-orange-500/20">
                      <BotIcon size={20} />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {currentSlide.diagram.botTitle}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-stone-400 font-mono">
                        {currentSlide.diagram.botSubtitle}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Telemetry Footer */}
                  <div className="mt-5 pt-3 border-t border-slate-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-stone-400 font-mono font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      <span>Telemetry Status: ACTIVE</span>
                    </div>
                    <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider">
                      Slide {currentIndex + 1} of {totalSlides}
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM PAGINATION CONTROLS (Pills & Dots) */}
      <div className="relative z-20 flex items-center justify-center gap-2 mt-8 md:mt-10">
        <div className="flex items-center gap-2 p-2 rounded-full bg-slate-200/80 dark:bg-black/80 border border-slate-300/80 dark:border-stone-800 backdrop-blur-xl shadow-md">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'w-9 sm:w-12 h-2.5 bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]'
                    : 'w-2.5 h-2.5 bg-slate-400 dark:bg-stone-700 hover:bg-slate-600 dark:hover:bg-stone-500'
                }`}
              >
                {isActive && !isPaused && (
                  <motion.div
                    key={`progress-${currentIndex}`}
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute inset-0 bg-white/40"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
};
