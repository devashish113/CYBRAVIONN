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
  MapPin,
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
  Sun,
  Moon,
  Gamepad2,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import { ServiceModalRenderer } from './components/ServiceModals';

// Route-level dynamic code splitting for sub-pages
const TrainingPage = React.lazy(() => import('./pages/Training').then(m => ({ default: m.TrainingPage })));
const CompliancePage = React.lazy(() => import('./pages/Compliance').then(m => ({ default: m.CompliancePage })));
const CybravionsAIPage = React.lazy(() => import('./pages/CybravionsAI').then(m => ({ default: m.CybravionsAIPage })));
const CyberVersePage = React.lazy(() => import('./pages/CyberVerse').then(m => ({ default: m.CyberVersePage })));
const ExceptionManagerPage = React.lazy(() => import('./pages/ExceptionManager').then(m => ({ default: m.ExceptionManagerPage })));

import { CaseStudies } from './components/CaseStudies';
import { IndustrySolutions } from './components/IndustrySolutions';
import { TrustCredibility } from './components/TrustCredibility';
import { Insights } from './components/Insights';
import { CyberUniverse3D } from './components/CyberUniverse3D';
import { TiltCard3D } from './components/TiltCard3D';
import { ThreatRadar3D } from './components/ThreatRadar3D';
import { CyberHeroSlider } from './components/CyberHeroSlider';
import { SecurityAuditModal } from './components/SecurityAuditModal';
import { EngagementLifecycle } from './components/EngagementLifecycle';
import { GlobalPresence } from './components/GlobalPresence';
import { OfficeLocationMap } from './components/OfficeLocationMap';
import { CommandPalette } from './components/CommandPalette';
import { cyberAudio } from './utils/cyberAudio';

// --- Navigation ---

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenAuditModal?: () => void;
  onOpenCommandPalette?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  setCurrentView, 
  isDarkMode, 
  toggleDarkMode, 
  onOpenAuditModal,
  onOpenCommandPalette 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
            ? isDarkMode
              ? 'bg-[#05070d]/98 backdrop-blur-xl py-3 border-b border-stone-800 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
              : 'bg-white/95 backdrop-blur-xl py-3 border-b border-slate-200 shadow-[0_4px_25px_rgba(0,0,0,0.06)]'
            : isDarkMode
              ? 'bg-gradient-to-b from-[#05070d]/90 to-transparent py-5'
              : 'bg-gradient-to-b from-white/90 to-transparent py-5'
        }`}
        aria-label="Main navigation"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Brand Logo Image Only */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group shrink-0"
            aria-label="CYBRAVIONS Home"
          >
            <img 
              src="/logo.png" 
              alt="CYBRAVIONS" 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-all duration-300" 
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6">
            {/* Products & Platforms Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                className={`text-xs xl:text-sm uppercase tracking-widest transition-colors font-medium flex items-center gap-1 cursor-pointer py-2 whitespace-nowrap ${
                  currentView === 'ai' 
                    ? isDarkMode ? 'text-blue-400 font-bold' : 'text-blue-600 font-bold' 
                    : isDarkMode ? 'text-stone-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
                aria-label="Products menu"
                aria-expanded={isProductsOpen}
                aria-haspopup="true"
              >
                <span>Products</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isProductsOpen ? 'rotate-180 text-blue-400' : ''}`} />
              </button>

              {/* Products Dropdown Mega-Menu (Horizontal 2-Column Grid) */}
              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ backgroundColor: isDarkMode ? '#070a14' : '#ffffff' }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[620px] rounded-2xl p-4 z-[999] overflow-hidden ${
                      isDarkMode 
                        ? 'bg-[#070a14]/98 border border-blue-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(37,99,235,0.15)] text-white backdrop-blur-2xl' 
                        : 'bg-white border border-blue-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.15),0_0_30px_rgba(37,99,235,0.08)] text-slate-900'
                    }`}
                  >
                    {/* Atmospheric glow */}
                    <div className="absolute -top-12 -left-12 w-44 h-44 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 space-y-3">
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between px-1 pb-1 border-b border-slate-200/80 dark:border-stone-800/80">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5">
                          <Sparkles size={11} className="text-orange-500" />
                          Sovereign Platforms &amp; Security Engines
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          4 Products
                        </span>
                      </div>

                      {/* 2x2 Grid Layout */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Product 1: Cybravions CyberVerse */}
                        <button
                          onClick={() => {
                            setCurrentView('cyberverse');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3 rounded-xl border transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                            currentView === 'cyberverse'
                              ? isDarkMode
                                ? 'bg-orange-950/40 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.15)]'
                                : 'bg-orange-50 border-orange-300 shadow-sm'
                              : isDarkMode
                              ? 'bg-white/[0.02] hover:bg-orange-950/25 border-stone-800/90 hover:border-orange-500/40'
                              : 'bg-slate-50/80 hover:bg-orange-50/70 border-slate-200/80 hover:border-orange-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/25 group-hover:scale-105 transition-transform">
                                  <Gamepad2 size={15} />
                                </div>
                                <span className={`text-xs font-bold transition-colors ${
                                  isDarkMode ? 'text-stone-100 group-hover:text-orange-300' : 'text-slate-900 group-hover:text-orange-600'
                                }`}>
                                  CyberVerse
                                </span>
                              </div>
                              <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 shrink-0">
                                GAMIFIED RPG
                              </span>
                            </div>
                            <p className={`text-[11px] font-light leading-snug line-clamp-2 ${
                              isDarkMode ? 'text-stone-400' : 'text-slate-600'
                            }`}>
                              Story-driven CyberSec &amp; AI arena with Kali labs, 10 Guilds &amp; CTF leagues.
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-orange-500 font-semibold group-hover:text-orange-400 transition-colors mt-2.5">
                            <span>Enter RPG Battleground</span>
                            <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>

                        {/* Product 2: Cybravions AI */}
                        <button
                          onClick={() => {
                            setCurrentView('ai');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3 rounded-xl border transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                            currentView === 'ai'
                              ? isDarkMode
                                ? 'bg-blue-950/40 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                                : 'bg-blue-50 border-blue-300 shadow-sm'
                              : isDarkMode
                              ? 'bg-white/[0.02] hover:bg-blue-950/25 border-stone-800/90 hover:border-blue-500/40'
                              : 'bg-slate-50/80 hover:bg-blue-50/70 border-slate-200/80 hover:border-blue-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/25 group-hover:scale-105 transition-transform">
                                  <Brain size={15} />
                                </div>
                                <span className={`text-xs font-bold transition-colors ${
                                  isDarkMode ? 'text-stone-100 group-hover:text-blue-300' : 'text-slate-900 group-hover:text-blue-600'
                                }`}>
                                  Cybravions AI
                                </span>
                              </div>
                              <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                                SOVEREIGN
                              </span>
                            </div>
                            <p className={`text-[11px] font-light leading-snug line-clamp-2 ${
                              isDarkMode ? 'text-stone-400' : 'text-slate-600'
                            }`}>
                              Air-gapped offline agentic AI in-a-box for defense &amp; critical infrastructure.
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-blue-500 font-semibold group-hover:text-blue-400 transition-colors mt-2.5">
                            <span>Explore Sovereign Appliance</span>
                            <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>

                        {/* Product 3: AI Exception Manager */}
                        <button
                          onClick={() => {
                            setCurrentView('exception-manager');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3 rounded-xl border transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                            currentView === 'exception-manager'
                              ? isDarkMode
                                ? 'bg-amber-950/40 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                                : 'bg-amber-50 border-amber-300 shadow-sm'
                              : isDarkMode
                              ? 'bg-white/[0.02] hover:bg-amber-950/25 border-stone-800/90 hover:border-amber-500/40'
                              : 'bg-slate-50/80 hover:bg-amber-50/70 border-slate-200/80 hover:border-amber-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25 group-hover:scale-105 transition-transform">
                                  <ShieldCheck size={15} />
                                </div>
                                <span className={`text-xs font-bold transition-colors ${
                                  isDarkMode ? 'text-stone-100 group-hover:text-amber-300' : 'text-slate-900 group-hover:text-amber-600'
                                }`}>
                                  Exception Manager
                                </span>
                              </div>
                              <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                                AI GOVERNANCE
                              </span>
                            </div>
                            <p className={`text-[11px] font-light leading-snug line-clamp-2 ${
                              isDarkMode ? 'text-stone-400' : 'text-slate-600'
                            }`}>
                              Automated cyber risk assessment, threat scoring &amp; governance workflows.
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-amber-500 font-semibold group-hover:text-amber-400 transition-colors mt-2.5">
                            <span>Explore Risk Engine</span>
                            <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </button>

                        {/* Product 4: 3D Threat Radar */}
                        <a
                          href="#radar"
                          onClick={(e) => {
                            handleNavClick(e, '#radar');
                            setIsProductsOpen(false);
                          }}
                          className={`p-3 rounded-xl border transition-all duration-300 group flex flex-col justify-between ${
                            isDarkMode
                              ? 'bg-white/[0.02] hover:bg-white/[0.06] border-stone-800/90 hover:border-cyan-500/40'
                              : 'bg-slate-50/80 hover:bg-cyan-50/60 border-slate-200/80 hover:border-cyan-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 group-hover:scale-105 transition-transform">
                                  <Radar size={15} />
                                </div>
                                <span className={`text-xs font-bold transition-colors ${
                                  isDarkMode ? 'text-stone-100 group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-600'
                                }`}>
                                  3D Threat Radar
                                </span>
                              </div>
                              <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                                3D LIVE
                              </span>
                            </div>
                            <p className={`text-[11px] font-light leading-snug line-clamp-2 ${
                              isDarkMode ? 'text-stone-400' : 'text-slate-600'
                            }`}>
                              Simulate red-team attacks and inspect real-time packet telemetry.
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-cyan-500 font-semibold group-hover:text-cyan-400 transition-colors mt-2.5">
                            <span>Open 3D Simulator</span>
                            <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </a>
                      </div>

                      {/* Bottom Quick-Action Bar */}
                      <div className="pt-2 px-1 border-t border-slate-200/70 dark:border-stone-800/70 flex items-center justify-between text-[11px]">
                        <span className={`font-light ${isDarkMode ? 'text-stone-400' : 'text-slate-500'}`}>
                          Looking for custom air-gapped deployments?
                        </span>
                        <a
                          href="#contact"
                          onClick={(e) => {
                            handleNavClick(e, '#contact');
                            setIsProductsOpen(false);
                          }}
                          className="font-semibold text-orange-500 hover:text-orange-400 flex items-center gap-1 transition-colors"
                        >
                          <span>Consult Architect</span>
                          <ArrowRight size={11} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Link */}
            <a 
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
              className={`text-xs xl:text-sm uppercase tracking-widest transition-colors font-medium whitespace-nowrap ${
                isDarkMode ? 'text-stone-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Services
            </a>

            {/* Compliance Link */}
            <button 
              onClick={() => {
                setCurrentView('compliance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-xs xl:text-sm uppercase tracking-widest transition-colors font-medium cursor-pointer whitespace-nowrap ${
                currentView === 'compliance' 
                  ? 'text-blue-500 font-bold border-b-2 border-blue-500 pb-0.5' 
                  : isDarkMode ? 'text-stone-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Compliance
            </button>

            {/* Training Link */}
            <button 
              onClick={() => {
                setCurrentView('training');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-xs xl:text-sm uppercase tracking-widest transition-colors font-medium cursor-pointer whitespace-nowrap ${
                currentView === 'training' 
                  ? 'text-blue-500 font-bold border-b-2 border-blue-500 pb-0.5' 
                  : isDarkMode ? 'text-stone-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Training
            </button>

            {/* Company Dropdown (About, FAQ, Contact) */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button
                className={`text-xs xl:text-sm uppercase tracking-widest transition-colors font-medium flex items-center gap-1 cursor-pointer py-2 whitespace-nowrap ${
                  isDarkMode ? 'text-stone-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
                aria-label="Company menu"
                aria-expanded={isCompanyOpen}
                aria-haspopup="true"
              >
                <span>Company</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isCompanyOpen ? 'rotate-180 text-blue-400' : ''}`} />
              </button>

              <AnimatePresence>
                {isCompanyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18 }}
                    style={{ backgroundColor: isDarkMode ? '#070a12' : '#ffffff' }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl p-2 z-[999] ${
                      isDarkMode 
                        ? 'bg-[#070a12] border border-stone-800 shadow-[0_20px_50px_rgba(0,0,0,0.9)]' 
                        : 'bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    <a
                      href="#about"
                      onClick={(e) => {
                        handleNavClick(e, '#about');
                        setIsCompanyOpen(false);
                      }}
                      className={`block px-3 py-2 text-xs uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                        isDarkMode ? 'text-stone-300 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      About Us
                    </a>
                    <a
                      href="#faq"
                      onClick={(e) => {
                        handleNavClick(e, '#faq');
                        setIsCompanyOpen(false);
                      }}
                      className={`block px-3 py-2 text-xs uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                        isDarkMode ? 'text-stone-300 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      FAQ
                    </a>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        handleNavClick(e, '#contact');
                        setIsCompanyOpen(false);
                      }}
                      className={`block px-3 py-2 text-xs uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap ${
                        isDarkMode ? 'text-stone-300 hover:text-white hover:bg-white/5' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      Contact
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Command Palette Trigger Button (⌘K) */}
            <motion.button
              onClick={() => {
                cyberAudio.playClick();
                onOpenCommandPalette?.();
              }}
              whileTap={{ scale: 0.95 }}
              className={`hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? 'bg-stone-900/90 hover:bg-stone-850 border-stone-700/80 text-stone-300 hover:text-white hover:border-blue-500/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]' 
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900 shadow-sm'
              }`}
              aria-label="Search and command palette (Ctrl+K)"
              title="Search and quick actions (Ctrl+K or ⌘K)"
            >
              <Search size={13} className="text-blue-500" />
              <span className="text-[11px] font-sans font-medium">Search</span>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20">
                ⌘K
              </kbd>
            </motion.button>

            {/* Dark / Light Mode Toggle Button */}
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.92 }}
              className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer group shrink-0 ${
                isDarkMode
                  ? 'bg-stone-900/80 hover:bg-stone-800 border-stone-700/80 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:border-amber-400/40'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-sm hover:border-slate-400'
              }`}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDarkMode ? (
                  <motion.div
                    key="dark-sun"
                    initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <Sun size={16} className="text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="light-moon"
                    initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <Moon size={16} className="text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA Button */}
            <motion.a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 shrink-0 whitespace-nowrap"
            >
              Consult an Advisor
            </motion.a>
          </div>

          {/* Mobile Right Bar: Search + Theme Toggle + Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                cyberAudio.playClick();
                onOpenCommandPalette?.();
              }}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-stone-900 border-stone-700 text-blue-400'
                  : 'bg-slate-100 border-slate-300 text-blue-600'
              }`}
              aria-label="Search and command palette"
            >
              <Search size={18} />
            </button>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-stone-900 border-stone-700 text-amber-400'
                  : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              className={`p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg ${
                isDarkMode ? 'text-stone-100' : 'text-slate-800'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-full left-0 w-full backdrop-blur-xl border-b p-6 lg:hidden flex flex-col gap-4 max-h-[85vh] overflow-y-auto ${
                isDarkMode 
                  ? 'bg-stone-900/98 border-stone-700 text-stone-100' 
                  : 'bg-white/98 border-slate-200 text-slate-900 shadow-2xl'
              }`}
            >
              {/* Mobile Theme Toggle Row */}
              <div className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                isDarkMode ? 'bg-stone-950/70 border-stone-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                  {isDarkMode ? <Moon size={15} className="text-blue-400" /> : <Sun size={15} className="text-amber-500" />}
                  <span>Theme: {isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 hover:bg-amber-400/30'
                      : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700'
                  }`}
                >
                  {isDarkMode ? <Sun size={12} /> : <Moon size={12} />}
                  {isDarkMode ? 'Switch Light' : 'Switch Dark'}
                </button>
              </div>

              {/* Cybravions AI Mobile Link */}
              <button 
                onClick={() => {
                  setCurrentView('ai');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center gap-2 text-left cursor-pointer font-bold ${
                  currentView === 'ai' ? 'text-blue-400' : isDarkMode ? 'text-blue-300' : 'text-blue-600'
                }`}
              >
                <Sparkles size={16} className="text-blue-400" />
                Cybravions AI
                <span className="text-[10px] px-2 py-0.5 rounded bg-orange-400/20 text-orange-400 border border-orange-400/30 font-mono">SOVEREIGN</span>
              </button>

              <a 
                href="#services"
                className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center ${
                  isDarkMode ? 'text-stone-200' : 'text-slate-800'
                }`}
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
                  className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center justify-between w-full ${
                    isDarkMode ? 'text-stone-200' : 'text-slate-800'
                  }`}
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
                      <button 
                        className="flex items-center gap-2 py-2 text-sm text-orange-500 hover:underline text-left cursor-pointer font-bold"
                        onClick={() => {
                          setCurrentView('cyberverse');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Gamepad2 size={16} className="text-orange-500" />
                        <span>Cybravions CyberVerse (Gamified RPG)</span>
                      </button>

                      <button 
                        className="flex items-center gap-2 py-2 text-sm text-blue-500 hover:underline text-left cursor-pointer"
                        onClick={() => {
                          setCurrentView('ai');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Brain size={16} className="text-blue-500" />
                        <span>Cybravions AI (Sovereign In-a-Box)</span>
                      </button>

                      <button 
                        className="flex items-center gap-2 py-2 text-sm text-amber-500 hover:underline text-left cursor-pointer"
                        onClick={() => {
                          setCurrentView('exception-manager');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <ShieldCheck size={16} className="text-amber-500" />
                        <span>AI Exception Manager (Risk Governance)</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a 
                href="#radar"
                className="text-base uppercase tracking-widest text-blue-500 py-2 min-h-[44px] flex items-center"
                onClick={(e) => {
                  handleNavClick(e, '#radar');
                  setIsMobileMenuOpen(false);
                }}
              >
                3D Radar
              </a>
              <a 
                href="#about"
                className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center ${
                  isDarkMode ? 'text-stone-200' : 'text-slate-800'
                }`}
                onClick={(e) => {
                  handleNavClick(e, '#about');
                  setIsMobileMenuOpen(false);
                }}
              >
                About
              </a>
              <a 
                href="#faq"
                className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center ${
                  isDarkMode ? 'text-stone-200' : 'text-slate-800'
                }`}
                onClick={(e) => {
                  handleNavClick(e, '#faq');
                  setIsMobileMenuOpen(false);
                }}
              >
                FAQ
              </a>
              <a 
                href="#contact"
                className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center ${
                  isDarkMode ? 'text-stone-200' : 'text-slate-800'
                }`}
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
                  currentView === 'compliance' ? 'text-blue-500 font-bold' : isDarkMode ? 'text-stone-200' : 'text-slate-800'
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
                  currentView === 'training' ? 'text-blue-500 underline underline-offset-4' : 'text-blue-500'
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



// --- Services Matrix ---

const Services = () => {
  const [activeBrief, setActiveBrief] = useState<number | null>(null);

  const expertises = [
    {
      title: "Cyber Security GRC",
      subtitle: "Governance, Risk & Compliance Architecture",
      desc: "Establish enterprise-wide risk visibility, regulatory compliance maturity, and audit readiness for global cybersecurity frameworks.",
      icon: Shield,
      glow: "blue" as const,
      standards: ["ISO 27001", "NIST CSF 2.0", "SOC 2 Type II", "DPDP & GDPR"],
      whatWeDo: [
        "Information security policies, standards, and ISMS architecture",
        "Enterprise risk register development and vendor tiering assessments",
        "Business Continuity (BCP) & Disaster Recovery (DRP) validation",
        "Comprehensive regulatory audit readiness and mock audits"
      ]
    },
    {
      title: "Offensive Security & Red Teaming",
      subtitle: "VAPT & Zero-Day Threat Emulation",
      desc: "Identify, exploit, and remediate deep vulnerabilities across web applications, mobile platforms, APIs, and cloud networks before adversaries do.",
      icon: Lock,
      glow: "orange" as const,
      standards: ["OWASP Top 10", "Network Penetration", "API & LLM Security", "Adversary Simulation"],
      whatWeDo: [
        "Web, mobile app, and GraphQL/REST API penetration testing",
        "Internal/external network breach simulation and privilege escalation",
        "Cloud configuration audit and microservice boundary validation",
        "Board-ready remediation governance and technical remediation guidance"
      ]
    },
    {
      title: "Cloud & DevSecOps Engineering",
      subtitle: "AWS, Azure & GCP Hardening",
      desc: "Architect resilient multi-cloud environments, automated CI/CD security pipelines, and zero-trust perimeter configurations.",
      icon: Globe,
      glow: "blue" as const,
      standards: ["CIS Benchmarks", "Terraform / IaC", "Kubernetes Hardening", "IAM Least Privilege"],
      whatWeDo: [
        "Cloud Security Posture Management (CSPM) and drift detection",
        "Infrastructure as Code (IaC) automated gating in CI/CD pipelines",
        "Kubernetes container security and secrets isolation",
        "IAM privilege reduction and zero-trust identity enforcement"
      ]
    },
    {
      title: "AI Governance & LLM Defense",
      subtitle: "Model Security & Sovereign Safety",
      desc: "Mitigate model poisoning, prompt injection exploits, training data exfiltration, and compliance breaches across enterprise AI systems.",
      icon: Brain,
      glow: "orange" as const,
      standards: ["NIST AI RMF", "EU AI Act", "OWASP for LLM", "Prompt Armor"],
      whatWeDo: [
        "LLM red teaming and adversarial prompt injection testing",
        "Training data privacy and RAG vector store isolation audits",
        "Model alignment verification and hallucination boundary controls",
        "Enterprise AI governance framework and executive oversight"
      ]
    },
    {
      title: "Threat Intelligence & OSINT",
      subtitle: "Dark Web & Digital Asset Defense",
      desc: "Proactive surveillance of dark web credential dumps, executive identity exposure, leaked infrastructure tokens, and active threat actor campaigns.",
      icon: Radar,
      glow: "blue" as const,
      standards: ["MITRE ATT&CK", "Dark Web Recon", "VIP Protection", "C2 Infrastructure Hunting"],
      whatWeDo: [
        "Continuous dark web credential leak and paste-site monitoring",
        "Executive digital footprint protection and VIP threat defense",
        "Malicious infrastructure identification and takedown coordination",
        "Tailored threat intelligence feeds mapping your attack surface"
      ]
    },
    {
      title: "Zero Trust Architecture & SOC",
      subtitle: "Defensive Engineering & Resilience",
      desc: "Design zero-trust enterprise security perimeters, SIEM/SOAR automated response workflows, and 24/7 SOC operational readiness.",
      icon: Layers,
      glow: "orange" as const,
      standards: ["Zero Trust Architecture", "SIEM / SOAR Playbooks", "Tabletop Simulations", "SOC 2 Type II"],
      whatWeDo: [
        "Zero-trust network access (ZTNA) and micro-segmentation",
        "Security Operations Center (SOC) logging and alert fidelity tuning",
        "Incident response playbooks and executive tabletop crisis drills",
        "Security-by-design reviews for enterprise digital transformation"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-gradient-to-b from-transparent via-slate-100/40 dark:via-[#020510]/60 to-transparent">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-3 block font-bold">
            Core Security Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Enterprise-Grade Cyber Defense & Governance
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-base md:text-lg max-w-2xl mt-4 font-light mx-auto">
            Architected to protect sovereign data, ensure 100% audit readiness, and preempt advanced threat vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertises.map((service, idx) => {
            const Icon = service.icon;
            const isBlue = service.glow === 'blue';
            return (
              <TiltCard3D key={idx} glowColor={service.glow}>
                <div className="flex flex-col h-full justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3.5 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm group-hover:scale-110 transition-all duration-300 ${
                        isBlue 
                          ? 'text-blue-600 dark:text-blue-400 group-hover:border-blue-500/50 group-hover:bg-blue-500/10' 
                          : 'text-orange-500 dark:text-orange-400 group-hover:border-orange-500/50 group-hover:bg-orange-500/10'
                      }`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-stone-500 uppercase tracking-widest font-semibold font-mono">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className={`text-xl font-semibold text-slate-900 dark:text-white mb-1 transition-colors ${
                      isBlue ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400' : 'group-hover:text-orange-500 dark:group-hover:text-orange-400'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`text-xs uppercase tracking-wider mb-4 font-semibold ${
                      isBlue ? 'text-blue-600 dark:text-blue-400' : 'text-orange-500 dark:text-orange-400'
                    }`}>
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-stone-300 font-light leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.standards.map((st) => (
                        <span key={st} className="text-[10px] font-mono bg-slate-100 dark:bg-white/[0.03] hover:bg-blue-50 dark:hover:bg-blue-500/10 border border-slate-200 dark:border-white/10 hover:border-blue-500/30 px-2.5 py-1 rounded-md text-slate-700 dark:text-stone-300 transition-colors">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveBrief(idx)}
                    className={`w-full py-3.5 px-4 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 group/btn shadow-md ${
                      isBlue
                        ? 'bg-slate-900 hover:bg-blue-600 text-white dark:bg-stone-900 dark:hover:bg-blue-600/30 border-slate-800 dark:border-stone-700/80 dark:hover:border-blue-500/60 dark:text-blue-300 dark:hover:text-white'
                        : 'bg-slate-900 hover:bg-orange-600 text-white dark:bg-stone-900 dark:hover:bg-orange-600/30 border-slate-800 dark:border-stone-700/80 dark:hover:border-orange-500/60 dark:text-orange-300 dark:hover:text-white'
                    }`}
                  >
                    <span>View Architecture & Deliverables</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeBrief !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/85 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-stone-950 border border-slate-200 dark:border-blue-500/30 rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(59,130,246,0.15)] relative max-h-[90vh] overflow-y-auto text-slate-900 dark:text-stone-200"
            >
              <button
                onClick={() => setActiveBrief(null)}
                className="absolute top-6 right-6 p-2 text-slate-500 dark:text-stone-400 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 cursor-pointer z-20 transition-colors"
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
    { 
      title: "100% First-Time Audit Certification", 
      desc: "Proven track record delivering zero-non-conformity compliance across ISO 27001, SOC 2 Type II, NIST CSF, and HIPAA without operational friction.", 
      icon: ShieldCheck,
      glow: "blue" as const
    },
    { 
      title: "Offensive-Defensive Synergy", 
      desc: "Our elite red-team penetration testing directly informs your defensive architecture and ISMS policies for mathematically hardened protection.", 
      icon: Target,
      glow: "orange" as const
    },
    { 
      title: "Board-Grade Risk Translation", 
      desc: "We bridge technical CVE telemetry into strategic business and financial risk models tailored for CEOs, audit committees, and boards of directors.", 
      icon: BarChart3,
      glow: "blue" as const
    },
    { 
      title: "Continuous Sovereign Governance", 
      desc: "Security is not a point-in-time PDF report. We provide ongoing advisory, live risk posture tracking, and rapid zero-day incident response SLAs.", 
      icon: Zap,
      glow: "orange" as const
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-slate-50/70 dark:bg-stone-950/60 border-t border-slate-200/80 dark:border-stone-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-3 block font-bold">
            The Cybravion Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Why High-Consequence Organizations Choose Cybravion
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-base md:text-lg max-w-2xl mt-4 font-light mx-auto">
            Combining offensive intelligence with unyielding regulatory governance to safeguard mission-critical assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isBlue = p.glow === 'blue';
            return (
              <TiltCard3D key={idx} glowColor={p.glow}>
                <div className="flex items-start gap-5">
                  <div className={`p-3.5 rounded-2xl bg-slate-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 shrink-0 ${
                    isBlue ? 'text-blue-600 dark:text-blue-400' : 'text-orange-500 dark:text-orange-400'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-stone-300 font-light leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>

        {/* Corporate Entity Verification Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/90 border border-slate-200 dark:border-stone-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                GOVERNMENT OF INDIA MCA REGISTERED
              </span>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                CIN: U62099DL2026PTC470901
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              CYBRAVION SOLUTIONS PRIVATE LIMITED
            </h3>
            <p className="text-xs text-slate-500 dark:text-stone-400 max-w-2xl font-light">
              Registered Office: H. IN.KH.NO.293 S/F Western Marg, Saidulajab, Near Kher Singh Estate, New Delhi, Delhi 110030
            </p>
          </div>

          <a
            href="#office-location"
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shrink-0 shadow-sm cursor-pointer"
          >
            <span>View Headquarters Map</span>
            <ArrowRight size={13} />
          </a>
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs uppercase tracking-widest font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400" />
              Direct Engagement
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
              Initiate a Confidential Security Briefing
            </h2>
            <p className="text-slate-600 dark:text-stone-300 font-light text-base leading-relaxed mb-8">
              Speak with our senior cybersecurity advisors to scope your VAPT assessment, design an ISO 27001 / SOC 2 compliance roadmap, or evaluate AI governance controls under mutual NDA.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3.5 text-slate-700 dark:text-stone-300">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-500 dark:text-stone-500 tracking-wider font-semibold">Official Communications</div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <a href="mailto:cybravions@gmail.com" className="text-sm text-slate-900 dark:text-stone-200 hover:text-blue-600 dark:hover:text-white transition-colors font-medium">
                      cybravions@gmail.com
                    </a>
                    <span className="hidden sm:inline text-slate-400">·</span>
                    <a href="mailto:support@cybravions.com" className="text-sm text-slate-600 dark:text-stone-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                      support@cybravions.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-slate-700 dark:text-stone-300">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-500 dark:text-stone-500 tracking-wider font-semibold">Direct Phone / Hotline</div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <a href="tel:+917258880881" className="text-sm text-slate-900 dark:text-stone-200 hover:text-emerald-600 dark:hover:text-white transition-colors font-bold font-mono">
                      +91-7258880881
                    </a>
                    <span className="hidden sm:inline text-slate-400">·</span>
                    <a href="tel:+919358683634" className="text-sm text-slate-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-white transition-colors font-mono">
                      +91-9358683634
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-slate-700 dark:text-stone-300">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-orange-600 dark:text-orange-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-500 dark:text-stone-500 tracking-wider font-semibold">Registered Headquarters</div>
                  <a href="#office-location" className="text-xs sm:text-sm text-slate-900 dark:text-stone-200 hover:text-orange-500 transition-colors font-medium">
                    H. IN.KH.NO.293 S/F Western Marg, Saidulajab, New Delhi 110030 (Near Kher Singh Estate)
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <TiltCard3D glowColor="orange">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/40">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Transmission Received</h3>
                  <p className="text-sm text-slate-600 dark:text-stone-400 font-light max-w-md mx-auto">
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
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-600 dark:text-stone-400 mb-1.5 font-semibold">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        maxLength={100}
                        placeholder="Dr. Alex Vance"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-stone-900 border border-slate-300 dark:border-stone-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-blue-500 text-sm shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-600 dark:text-stone-400 mb-1.5 font-semibold">Corporate Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        maxLength={120}
                        placeholder="alex@enterprise.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-stone-900 border border-slate-300 dark:border-stone-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-blue-500 text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-600 dark:text-stone-400 mb-1.5 font-semibold">Primary Area of Interest</label>
                    <select
                      name="service"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-stone-900 border border-slate-300 dark:border-stone-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 shadow-sm"
                    >
                      <option value="GRC & ISO 27001">Cybersecurity GRC &amp; ISO 27001 / SOC 2</option>
                      <option value="VAPT Testing">Offensive Security &amp; VAPT Assessment</option>
                      <option value="Cloud Security">Cloud Architecture &amp; DevSecOps Hardening</option>
                      <option value="AI Governance">AI Risk Governance &amp; LLM Red Teaming</option>
                      <option value="Threat Intelligence">Dark Web &amp; Threat Intelligence Monitoring</option>
                      <option value="Security Architecture">Zero Trust Architecture &amp; SOC Advisory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-600 dark:text-stone-400 mb-1.5 font-semibold">Scope &amp; Requirements</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      maxLength={4000}
                      placeholder="Describe your organization's target compliance frameworks, infrastructure scale, or security objectives..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-stone-900 border border-slate-300 dark:border-stone-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-blue-500 text-sm shadow-sm"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-stone-400 font-mono">
                    <ShieldCheck size={14} className="text-blue-500 shrink-0" />
                    <span>Protected under strict mutual non-disclosure (NDA). Encrypted in transit.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-bold uppercase tracking-widest text-xs shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
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
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10 bg-slate-50/70 dark:bg-stone-950/60 border-t border-slate-200/80 dark:border-stone-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-3 block font-bold">
            Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-stone-900/60 border border-slate-200/90 dark:border-stone-800 overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-stone-700 shadow-sm"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-semibold text-base sm:text-lg text-slate-900 dark:text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-blue-600 dark:text-blue-400 shrink-0 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-6 pb-6 text-sm text-slate-600 dark:text-stone-300 font-light leading-relaxed"
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

const Footer = ({ setCurrentView, isDarkMode }: { setCurrentView: (view: string) => void; isDarkMode: boolean }) => {
  return (
    <footer className={`py-16 px-6 md:px-12 lg:px-20 border-t relative z-10 transition-colors ${
      isDarkMode 
        ? 'bg-stone-950 border-stone-900 text-stone-300' 
        : 'bg-white border-slate-200 text-slate-700 shadow-inner'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="CYBRAVIONS" 
            className="h-14 md:h-18 w-auto object-contain drop-shadow-[0_0_20px_rgba(37,99,235,0.35)]" 
          />
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-wider ${
          isDarkMode ? 'text-stone-400' : 'text-slate-600'
        }`}>
          <button onClick={() => { setCurrentView('cyberverse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-orange-500 hover:text-orange-400 font-bold transition-colors cursor-pointer flex items-center gap-1">
            <Gamepad2 size={13} />
            CyberVerse (RPG)
          </button>
          <button onClick={() => { setCurrentView('ai'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-blue-500 hover:text-blue-400 font-bold transition-colors cursor-pointer flex items-center gap-1">
            <Sparkles size={12} />
            Cybravions AI
          </button>
          <a href="#services" onClick={() => setCurrentView('home')} className={isDarkMode ? 'hover:text-white transition-colors' : 'hover:text-slate-950 transition-colors'}>Services</a>
          <a href="#radar" onClick={() => setCurrentView('home')} className={isDarkMode ? 'hover:text-white transition-colors' : 'hover:text-slate-950 transition-colors'}>3D Radar</a>
          <button onClick={() => { setCurrentView('compliance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-950'}`}>Compliance</button>
          <button onClick={() => { setCurrentView('training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-950'}`}>Training</button>
          <button onClick={() => { setCurrentView('exception-manager'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`cursor-pointer transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-950'}`}>
            Exception Manager
          </button>
          <a href="#contact" onClick={() => setCurrentView('home')} className={isDarkMode ? 'hover:text-white transition-colors' : 'hover:text-slate-950 transition-colors'}>Contact</a>
        </div>

        <div className={`text-xs font-sans text-center md:text-right ${isDarkMode ? 'text-stone-500' : 'text-slate-400'} space-y-1`}>
          <div className="font-semibold text-slate-800 dark:text-stone-300">
            CYBRAVION SOLUTIONS PRIVATE LIMITED
          </div>
          <div className="text-[11px] font-mono">
            CIN: U62099DL2026PTC470901 · Regd. Office: New Delhi 110030, India
          </div>
          <div className="text-[10px]">
            © {new Date().getFullYear()} CYBRAVION Solutions. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main Application ---

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cybravions_theme');
      if (saved) return saved === 'dark';
    }
    return true;
  });

  const toggleDarkMode = () => {
    cyberAudio.playClick();
    setIsDarkMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cybravions_theme', next ? 'dark' : 'light');
      }
      return next;
    });
  };

  // Global Keyboard Shortcuts (⌘K or Ctrl+K for Command Palette)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        cyberAudio.playClick();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lenis Luxury Inertial Smooth Scrolling Engine
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-500 ${isDarkMode ? 'dark' : 'light'} ${
      currentView === 'exception-manager'
        ? isDarkMode ? 'bg-[#030612] text-stone-100 theme-exception' : 'bg-[#f8fafc] text-slate-900 theme-exception'
        : currentView === 'cyberverse'
        ? isDarkMode ? 'bg-[#030612] text-stone-100 theme-cyberverse' : 'bg-[#f8fafc] text-slate-900 theme-cyberverse'
        : currentView === 'ai' 
        ? isDarkMode ? 'bg-[#030712] text-slate-100 theme-ai' : 'bg-[#f8fafc] text-slate-900 theme-ai' 
        : currentView === 'compliance'
        ? isDarkMode ? 'bg-[#060913] text-stone-100 theme-compliance' : 'bg-[#f8fafc] text-slate-900 theme-compliance'
        : currentView === 'training'
        ? isDarkMode ? 'bg-[#070a14] text-stone-100 theme-training' : 'bg-[#f8fafc] text-slate-900 theme-training'
        : isDarkMode ? 'bg-[#010206] text-stone-100 theme-home' : 'bg-[#f8fafc] text-slate-900 theme-home'
    }`}>
      <Helmet>
        <title>CYBRAVION Solutions | Next-Gen 3D Cybersecurity & Risk Governance</title>
        <meta name="description" content="Elite cybersecurity consulting — 3D threat intelligence, GRC, VAPT, cloud security & AI governance for modern enterprises." />
        <link rel="canonical" href="https://cybravions.online/" />
      </Helmet>

      {/* Persistent Full-Viewport 3D Cybersecurity Universe */}
      <CyberUniverse3D currentView={currentView} isDarkMode={isDarkMode} />



      <div className="relative z-10">
        <Navbar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        <main id="main-content">
          <React.Suspense fallback={
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-stone-500">
                Loading Sovereign Matrix...
              </span>
            </div>
          }>
            {currentView === 'exception-manager' ? (
              <ExceptionManagerPage 
                setCurrentView={setCurrentView} 
                isDarkMode={isDarkMode} 
                onOpenConsultation={() => setIsAuditModalOpen(true)} 
              />
            ) : currentView === 'cyberverse' ? (
              <CyberVersePage 
                setCurrentView={setCurrentView} 
                isDarkMode={isDarkMode} 
                onOpenConsultation={() => setIsAuditModalOpen(true)} 
              />
            ) : currentView === 'ai' ? (
              <CybravionsAIPage />
            ) : currentView === 'training' ? (
              <TrainingPage />
            ) : currentView === 'compliance' ? (
              <CompliancePage />
            ) : (
              <>
                <CyberHeroSlider isDarkMode={isDarkMode} setCurrentView={setCurrentView} />
                <Services />
                <div id="radar">
                  <ThreatRadar3D onOpenAuditModal={() => setIsAuditModalOpen(true)} />
                </div>
                <EngagementLifecycle isDarkMode={isDarkMode} onConsultClick={scrollToContact} />
                <TrustCredibility />
                <CaseStudies />
                <IndustrySolutions />
                <GlobalPresence isDarkMode={isDarkMode} />
                <WhyChooseUs />
                <Insights />
                <OfficeLocationMap isDarkMode={isDarkMode} />
                <Contact />
                <FAQ />
              </>
            )}
          </React.Suspense>
        </main>

        <Footer setCurrentView={setCurrentView} isDarkMode={isDarkMode} />

        {/* Global Keyboard Command Palette & Quick Search (⌘K / Ctrl+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          setCurrentView={setCurrentView}
          onOpenAuditModal={() => setIsAuditModalOpen(true)}
        />

        {/* Interactive Instant Security Posture & Compliance Audit Modal */}
        <SecurityAuditModal
          isOpen={isAuditModalOpen}
          onClose={() => setIsAuditModalOpen(false)}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}
