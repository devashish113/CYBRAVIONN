/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  Check,
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
  Linkedin,
  ShieldAlert,
  Radio,
  BellRing,
  Scale,
  Cloud,
  FileCheck
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import { ServiceModalRenderer } from './components/ServiceModals';

import { lazyWithRetry } from './utils/lazyWithRetry';
import { pathForView, resolveAppView, type AppView } from './utils/routing';
import { AppRoutes } from './app/AppRoutes';
import { notFoundSeo, seoPages } from './utils/seoPages.js';

// Route-level dynamic code splitting for sub-pages with auto-retry and chunk reload recovery

import type { LegalTabType } from './components/LegalModal';
import { Hero } from './components/Hero';
import { ProductsShowcase } from './components/ProductsShowcase';
import { SecurityModel } from './components/SecurityModel';
import { TiltCard3D } from './components/TiltCard3D';
import { cyberAudio } from './utils/cyberAudio';
import { VisitorCounter } from './components/VisitorCounter';
import { DeferredMount } from './components/DeferredMount';

// Dynamic lazy-loaded 3D scenes & interactive modals (drops initial bundle size drastically)
const CyberUniverse3D = lazyWithRetry(() => import('./components/CyberUniverse3D').then(m => ({ default: m.CyberUniverse3D })));
const ThreatRadar3D = lazyWithRetry(() => import('./components/ThreatRadar3D').then(m => ({ default: m.ThreatRadar3D })));
const CommandPalette = lazyWithRetry(() => import('./components/CommandPalette').then(m => ({ default: m.CommandPalette })));
const SecurityAuditModal = lazyWithRetry(() => import('./components/SecurityAuditModal').then(m => ({ default: m.SecurityAuditModal })));
const LegalModal = lazyWithRetry(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));

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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    const scrollToTarget = () => {
      const el = document.querySelector(hash);
      if (el) {
        const lenis = (window as unknown as { __lenis?: any }).__lenis;
        if (lenis) {
          lenis.scrollTo(el, { offset: -80, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.hash = hash;
      }
    };

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(scrollToTarget, 150);
    } else {
      scrollToTarget();
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
        <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Brand Logo & Desktop Navigation Container */}
          <div className="flex items-center gap-3 lg:gap-5 xl:gap-6 2xl:gap-8 min-w-0">
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
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img 
                  src="/logo.png" 
                  alt="CYBRAVIONS" 
                  width="180"
                  height="56"
                  loading="eager"
                  decoding="async"
                  className="h-9 sm:h-10 xl:h-11 2xl:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-all duration-300" 
                />
              </picture>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1.5 lg:gap-2.5 xl:gap-3 2xl:gap-5">
              {/* Products & Platforms Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
              <button
                className={`text-[11px] xl:text-xs 2xl:text-sm uppercase tracking-wider xl:tracking-widest transition-colors font-medium flex items-center gap-1 cursor-pointer py-2 whitespace-nowrap ${
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

              {/* Products Dropdown Mega-Menu */}
              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-[760px] rounded-3xl p-5 z-[999] overflow-hidden transition-colors ${
                      isDarkMode 
                        ? 'bg-stone-950/95 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_30px_rgba(59,130,246,0.1)] text-white backdrop-blur-2xl' 
                        : 'bg-white/98 border border-slate-200/90 shadow-[0_25px_60px_rgba(15,23,42,0.12),0_1px_3px_rgba(0,0,0,0.05)] text-slate-900 backdrop-blur-2xl'
                    }`}
                  >
                    {/* Ambient subtle backdrop glows */}
                    <div className="absolute -top-16 -left-16 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 space-y-4">
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between px-1 pb-2.5 border-b border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          <span className="text-[11px] uppercase tracking-[0.2em] font-mono font-bold text-slate-500 dark:text-stone-400">
                            Enterprise Security Platforms &amp; Autonomous Engines
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          6 Platforms
                        </span>
                      </div>

                      {/* 2x3 Seamless Interactive Grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Product 1: ThreatForge */}
                        <button
                          onClick={() => {
                            setCurrentView('threatforge');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'threatforge'
                              ? isDarkMode
                                ? 'bg-white/[0.06] border-orange-500/40 shadow-sm'
                                : 'bg-slate-50 border-orange-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-orange-500/20 transition-all duration-200">
                            <ShieldAlert size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                                ThreatForge
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shrink-0">
                                STRIDE / PASTA
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Automated threat modeling, attack path trees &amp; CVSS 3.1 quantitative scoring.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>

                        {/* Product 2: SOC AI Triage */}
                        <button
                          onClick={() => {
                            setCurrentView('soc-ai');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'soc-ai'
                              ? isDarkMode
                                ? 'bg-white/[0.06] border-blue-500/40 shadow-sm'
                                : 'bg-slate-50 border-blue-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-500/20 transition-all duration-200">
                            <BellRing size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                SOC AI Triage
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                                SOAR Engine
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Autonomous SIEM alert investigation with SHAP explainable verdicts &amp; playbooks.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>

                        {/* Product 3: AI Exception Manager */}
                        <button
                          onClick={() => {
                            setCurrentView('exception-manager');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'exception-manager'
                              ? isDarkMode
                                ? 'bg-white/[0.06] border-amber-500/40 shadow-sm'
                                : 'bg-slate-50 border-amber-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-200">
                            <ShieldCheck size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                                Exception Manager
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                                AI Governance
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Automated cyber risk waiver assessment, drift tracking &amp; audit PDF workflows.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>

                        {/* Product 4: CyberRange (CyberQuest) */}
                        <button
                          onClick={() => {
                            setCurrentView('cyberverse');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'cyberverse'
                              ? isDarkMode
                                ? 'bg-white/[0.06] border-orange-500/40 shadow-sm'
                                : 'bg-slate-50 border-orange-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-orange-500/20 transition-all duration-200">
                            <Gamepad2 size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                                CyberRange Arena
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shrink-0">
                                CTF &amp; CISM
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Gamified CyberQuest labs, hands-on cryptography puzzles &amp; CISM scenarios.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>

                        {/* Product 5: Threat Intel Collector */}
                        <button
                          onClick={() => {
                            setCurrentView('threat-collector');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'threat-collector'
                              ? isDarkMode
                                ? 'bg-white/[0.06] border-cyan-500/40 shadow-sm'
                                : 'bg-slate-50 border-cyan-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-cyan-500/20 transition-all duration-200">
                            <Radio size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                                Intel Collector
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shrink-0">
                                MISP &amp; OTX
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Multi-source IOC ingestion, automated STIX 2.1 normalization &amp; air-gap bundles.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>

                        {/* Product 6: Cybravions AI */}
                        <button
                          onClick={() => {
                            setCurrentView('ai');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'ai'
                              ? isDarkMode
                                ? 'bg-white/[0.06] border-indigo-500/40 shadow-sm'
                                : 'bg-slate-50 border-indigo-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all duration-200">
                            <Brain size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                                Cybravions AI
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                                Sovereign Core
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Air-gapped offline agentic AI in-a-box for defense &amp; critical infrastructure.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>
                      </div>

                      {/* Bottom Footer Bar */}
                      <div className="pt-3 px-3 pb-1 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-stone-400 text-[11px]">
                          Looking for custom air-gapped sovereign deployments?
                        </span>
                        <a
                          href="#contact"
                          onClick={(e) => {
                            handleNavClick(e, '#contact');
                            setIsProductsOpen(false);
                          }}
                          className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-500 flex items-center gap-1 transition-colors text-[11px]"
                        >
                          <span>Consult Architect</span>
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown Mega-Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className={`text-[11px] xl:text-xs 2xl:text-sm uppercase tracking-wider xl:tracking-widest transition-colors font-medium flex items-center gap-1 cursor-pointer py-2 whitespace-nowrap ${
                  ['vapt', 'iso-27001', 'soc-2', 'cloud-security', 'ai-security', 'dpdp-compliance'].includes(currentView)
                    ? 'text-orange-500 font-bold border-b-2 border-orange-500 pb-0.5' 
                    : isDarkMode ? 'text-stone-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
                }`}
                aria-label="Services menu"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-orange-400' : ''}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-[760px] rounded-3xl p-5 z-[999] overflow-hidden transition-colors ${
                      isDarkMode 
                        ? 'bg-stone-950/95 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_30px_rgba(249,115,22,0.1)] text-white backdrop-blur-2xl' 
                        : 'bg-white/98 border border-slate-200/90 shadow-[0_25px_60px_rgba(15,23,42,0.12),0_1px_3px_rgba(0,0,0,0.05)] text-slate-900 backdrop-blur-2xl'
                    }`}
                  >
                    <div className="relative z-10 space-y-4">
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between px-1 pb-2.5 border-b border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                          <span className="text-[11px] uppercase tracking-[0.2em] font-mono font-bold text-slate-500 dark:text-stone-400">
                            Enterprise Cybersecurity Services &amp; Regulatory Advisory
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                          6 Practices
                        </span>
                      </div>

                      {/* 2x3 Grid of Services */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {/* 1: VAPT */}
                        <button
                          onClick={() => {
                            setCurrentView('vapt');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'vapt'
                              ? isDarkMode ? 'bg-white/[0.06] border-orange-500/40 shadow-sm' : 'bg-slate-50 border-orange-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-orange-500/20 transition-all duration-200">
                            <ShieldCheck size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                                VAPT &amp; Offensive Security
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shrink-0">
                                CERT-In Aligned
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Web, mobile, API &amp; cloud network penetration testing with manual exploit proofs.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>

                        {/* 2: ISO 27001 */}
                        <button
                          onClick={() => {
                            setCurrentView('iso-27001');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'iso-27001'
                              ? isDarkMode ? 'bg-white/[0.06] border-blue-500/40 shadow-sm' : 'bg-slate-50 border-blue-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-blue-500/20 transition-all duration-200">
                            <Award size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                                ISO 27001:2022 Certification
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                                8-12 Wks
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Turnkey ISMS implementation, Statement of Applicability &amp; Stage 2 audit pass guarantee.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>

                        {/* 3: SOC 2 */}
                        <button
                          onClick={() => {
                            setCurrentView('soc-2');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'soc-2'
                              ? isDarkMode ? 'bg-white/[0.06] border-indigo-500/40 shadow-sm' : 'bg-slate-50 border-indigo-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all duration-200">
                            <FileCheck size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                                SOC 2 Type I &amp; Type II
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                                AICPA Trust
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Accelerate enterprise SaaS procurement with continuous audit evidence &amp; CPA partner liaison.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>

                        {/* 4: Cloud Security */}
                        <button
                          onClick={() => {
                            setCurrentView('cloud-security');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'cloud-security'
                              ? isDarkMode ? 'bg-white/[0.06] border-cyan-500/40 shadow-sm' : 'bg-slate-50 border-cyan-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-cyan-500/20 transition-all duration-200">
                            <Cloud size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                                Cloud Security &amp; DevSecOps
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shrink-0">
                                Multi-Cloud
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              AWS, Azure, GCP &amp; Kubernetes CIS benchmark hardening and automated CI/CD gating.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>

                        {/* 5: AI Security */}
                        <button
                          onClick={() => {
                            setCurrentView('ai-security');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'ai-security'
                              ? isDarkMode ? 'bg-white/[0.06] border-purple-500/40 shadow-sm' : 'bg-slate-50 border-purple-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-purple-500/20 transition-all duration-200">
                            <Brain size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                                AI Security &amp; LLM Red Teaming
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shrink-0">
                                OWASP LLM
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Prompt injection defenses, RAG poisoning audits, and sovereign air-gapped safety.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>

                        {/* 6: DPDP Compliance */}
                        <button
                          onClick={() => {
                            setCurrentView('dpdp-compliance');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-left p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border ${
                            currentView === 'dpdp-compliance'
                              ? isDarkMode ? 'bg-white/[0.06] border-emerald-500/40 shadow-sm' : 'bg-slate-50 border-emerald-400/50 shadow-sm'
                              : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.04] border-transparent hover:border-slate-200/60 dark:hover:border-white/5'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all duration-200">
                            <Scale size={19} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                                DPDP Act 2023 Compliance
                              </span>
                              <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                                India Mandate
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-stone-400 font-light leading-snug line-clamp-2">
                              Data Fiduciary advisory, consent architectures, and preventing penalties up to ₹250 Crores.
                            </p>
                          </div>
                          <ChevronRight size={14} className="text-slate-400 dark:text-stone-500 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2.5" />
                        </button>
                      </div>

                      {/* Bottom Footer Bar */}
                      <div className="pt-3 px-3 pb-1 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                        <a
                          href="#services"
                          onClick={(e) => {
                            handleNavClick(e, '#services');
                            setIsServicesOpen(false);
                          }}
                          className="text-slate-500 dark:text-stone-400 hover:text-orange-500 text-[11px]"
                        >
                          View all security capability frameworks →
                        </a>
                        <button
                          onClick={() => {
                            setIsServicesOpen(false);
                            onOpenAuditModal?.();
                          }}
                          className="font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-500 flex items-center gap-1 transition-colors text-[11px]"
                        >
                          <span>Request Scoping Call</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources Link */}
            <button 
              onClick={() => {
                setCurrentView('resources');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[11px] xl:text-xs 2xl:text-sm uppercase tracking-wider xl:tracking-widest transition-colors font-medium cursor-pointer whitespace-nowrap ${
                currentView === 'resources' 
                  ? 'text-orange-500 font-bold border-b-2 border-orange-500 pb-0.5' 
                  : isDarkMode ? 'text-stone-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              Resources
            </button>

            {/* About Us Page Link */}
            <button 
              onClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[11px] xl:text-xs 2xl:text-sm uppercase tracking-wider xl:tracking-widest transition-colors font-medium cursor-pointer whitespace-nowrap ${
                currentView === 'about' 
                  ? 'text-orange-500 font-bold border-b-2 border-orange-500 pb-0.5' 
                  : isDarkMode ? 'text-stone-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              About Us
            </button>

            {/* Compliance Link */}
            <button 
              onClick={() => {
                setCurrentView('compliance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-[11px] xl:text-xs 2xl:text-sm uppercase tracking-wider xl:tracking-widest transition-colors font-medium cursor-pointer whitespace-nowrap ${
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
              className={`text-[11px] xl:text-xs 2xl:text-sm uppercase tracking-wider xl:tracking-widest transition-colors font-medium cursor-pointer whitespace-nowrap ${
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
                className={`text-[11px] xl:text-xs 2xl:text-sm uppercase tracking-wider xl:tracking-widest transition-colors font-medium flex items-center gap-1 cursor-pointer py-2 whitespace-nowrap ${
                  currentView === 'about'
                    ? 'text-orange-500 font-bold'
                    : isDarkMode ? 'text-stone-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'
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
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-xl p-2 z-[999] ${
                      isDarkMode 
                        ? 'bg-[#070a12] border border-stone-800 shadow-[0_20px_50px_rgba(0,0,0,0.9)]' 
                        : 'bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
                    }`}
                  >
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
            </div>
          </div>

          {/* Right Desktop Actions (Search, Theme Toggle, Consult CTA) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-3.5 shrink-0 ml-3 xl:ml-5 2xl:ml-6 pl-3 xl:pl-5 2xl:pl-6 border-l border-slate-200/80 dark:border-stone-800">
            {/* Command Palette Trigger Button (⌘K) */}
            <motion.button
              onClick={() => {
                cyberAudio.playClick();
                onOpenCommandPalette?.();
              }}
              whileTap={{ scale: 0.95 }}
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 cursor-pointer ${
                isDarkMode 
                  ? 'bg-stone-900/90 hover:bg-stone-850 border-stone-700/80 text-stone-300 hover:text-white hover:border-blue-500/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]' 
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900 shadow-sm'
              }`}
              aria-label="Search and command palette (Ctrl+K)"
              title="Search and quick actions (Ctrl+K or ⌘K)"
            >
              <Search size={13} className="text-blue-500 shrink-0" />
              <span className="hidden 2xl:inline text-[11px] font-sans font-medium">Search</span>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20">
                ⌘K
              </kbd>
            </motion.button>

            {/* Dark / Light Mode Toggle Button */}
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.92 }}
              className={`p-2 xl:p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer group shrink-0 ${
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
                    <Sun size={15} className="text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
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
                    <Moon size={15} className="text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
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
              className="px-3.5 xl:px-4 2xl:px-5 py-2 xl:py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-[11px] xl:text-xs uppercase tracking-wider xl:tracking-widest font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 shrink-0 whitespace-nowrap"
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

              {/* Services Mobile Submenu */}
              <div className="flex flex-col">
                <button 
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center justify-between w-full font-bold ${
                    ['vapt', 'iso-27001', 'soc-2', 'cloud-security', 'ai-security', 'dpdp-compliance'].includes(currentView)
                      ? 'text-orange-500'
                      : isDarkMode ? 'text-stone-200' : 'text-slate-800'
                  }`}
                  aria-label="Services submenu"
                  aria-expanded={isMobileServicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown size={18} className={`transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180 text-orange-500' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col gap-2.5 mt-1 overflow-hidden"
                    >
                      <button 
                        className="flex items-center gap-2 py-2 text-sm text-orange-500 hover:underline text-left cursor-pointer font-bold"
                        onClick={() => {
                          setCurrentView('vapt');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <ShieldCheck size={16} className="text-orange-500" />
                        <span>VAPT &amp; Offensive Security</span>
                      </button>
                      <button 
                        className="flex items-center gap-2 py-2 text-sm text-blue-500 hover:underline text-left cursor-pointer font-bold"
                        onClick={() => {
                          setCurrentView('iso-27001');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Award size={16} className="text-blue-500" />
                        <span>ISO 27001:2022 Certification</span>
                      </button>
                      <button 
                        className="flex items-center gap-2 py-2 text-sm text-indigo-500 hover:underline text-left cursor-pointer font-bold"
                        onClick={() => {
                          setCurrentView('soc-2');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <FileCheck size={16} className="text-indigo-500" />
                        <span>SOC 2 Type I &amp; Type II Readiness</span>
                      </button>
                      <button 
                        className="flex items-center gap-2 py-2 text-sm text-cyan-500 hover:underline text-left cursor-pointer font-bold"
                        onClick={() => {
                          setCurrentView('cloud-security');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Cloud size={16} className="text-cyan-500" />
                        <span>Cloud Security &amp; DevSecOps</span>
                      </button>
                      <button 
                        className="flex items-center gap-2 py-2 text-sm text-purple-500 hover:underline text-left cursor-pointer font-bold"
                        onClick={() => {
                          setCurrentView('ai-security');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Brain size={16} className="text-purple-500" />
                        <span>AI Security &amp; LLM Red Teaming</span>
                      </button>
                      <button 
                        className="flex items-center gap-2 py-2 text-sm text-emerald-500 hover:underline text-left cursor-pointer font-bold"
                        onClick={() => {
                          setCurrentView('dpdp-compliance');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Scale size={16} className="text-emerald-500" />
                        <span>DPDP Act 2023 Compliance</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Mobile Link */}
              <button 
                onClick={() => {
                  setCurrentView('resources');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center gap-2 text-left cursor-pointer font-bold ${
                  currentView === 'resources' ? 'text-orange-500' : isDarkMode ? 'text-stone-200' : 'text-slate-800'
                }`}
              >
                <BookOpen size={16} className="text-orange-500" />
                <span>Resources &amp; Guides</span>
              </button>

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
                      {/* Mobile Product 1: ThreatForge */}
                      <button 
                        className="flex items-center gap-2.5 py-2 text-sm text-orange-500 hover:underline text-left cursor-pointer font-bold"
                        onClick={() => {
                          setCurrentView('threatforge');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <ShieldAlert size={16} className="text-orange-500" />
                        <span>ThreatForge (STRIDE &amp; PASTA Modeling)</span>
                      </button>

                      {/* Mobile Product 2: SOC AI Triage */}
                      <button 
                        className="flex items-center gap-2.5 py-2 text-sm text-blue-500 hover:underline text-left cursor-pointer font-bold"
                        onClick={() => {
                          setCurrentView('soc-ai');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <BellRing size={16} className="text-blue-500" />
                        <span>SOC AI Triage (Autonomous SOAR)</span>
                      </button>

                      {/* Mobile Product 3: AI Exception Manager */}
                      <button 
                        className="flex items-center gap-2.5 py-2 text-sm text-amber-500 hover:underline text-left cursor-pointer font-bold"
                        onClick={() => {
                          setCurrentView('exception-manager');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <ShieldCheck size={16} className="text-amber-500" />
                        <span>AI Exception Manager (Risk Governance)</span>
                      </button>

                      {/* Mobile Product 4: CyberRange (CyberQuest) */}
                      <button 
                        className="flex items-center gap-2.5 py-2 text-sm text-orange-400 hover:underline text-left cursor-pointer"
                        onClick={() => {
                          setCurrentView('cyberverse');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Gamepad2 size={16} className="text-orange-400" />
                        <span>CyberRange (CTF &amp; CISM Quest Arena)</span>
                      </button>

                      {/* Mobile Product 5: Threat Intel Collector */}
                      <button 
                        className="flex items-center gap-2.5 py-2 text-sm text-cyan-400 hover:underline text-left cursor-pointer"
                        onClick={() => {
                          setCurrentView('threat-collector');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Radio size={16} className="text-cyan-400" />
                        <span>Threat Intel Collector (MISP &amp; OTX Ingestion)</span>
                      </button>

                      {/* Mobile Product 6: Cybravions AI */}
                      <button 
                        className="flex items-center gap-2.5 py-2 text-sm text-indigo-400 hover:underline text-left cursor-pointer"
                        onClick={() => {
                          setCurrentView('ai');
                          setIsMobileMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <Brain size={16} className="text-indigo-400" />
                        <span>Cybravions AI (Sovereign In-a-Box)</span>
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
              <button 
                className={`text-base uppercase tracking-widest py-2 min-h-[44px] flex items-center text-left cursor-pointer ${
                  currentView === 'about' ? 'text-orange-500 font-bold' : isDarkMode ? 'text-stone-200' : 'text-slate-800'
                }`}
                onClick={() => {
                  setCurrentView('about');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                About Us
              </button>
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

interface ServicesProps {
  onOpenConsultation?: () => void;
  setCurrentView?: (view: any) => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenConsultation, setCurrentView }) => {
  const [activeBrief, setActiveBrief] = useState<number | null>(null);

  useEffect(() => {
    if (activeBrief !== null) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Halt Lenis inertial smooth scrolling so wheel events don't scroll the background page!
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActiveBrief(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.removeEventListener('keydown', handleKeyDown);
        if (lenis && typeof lenis.start === 'function') {
          lenis.start();
        }
      };
    }
  }, [activeBrief]);

  const expertises = [
    {
      title: "GRC",
      route: "iso-27001",
      tag: "GOVERN",
      subtitle: "Governance, Risk & Compliance Architecture",
      desc: "ISO 27001 and DPDP Act compliance, audit-ready governance frameworks, SOC 2 Type II, and continuous risk management.",
      icon: ShieldCheck,
      glow: "blue" as const,
      standards: ["ISO 27001", "DPDP Act", "SOC 2 Type II", "NIST CSF 2.0"],
      whatWeDo: [
        "ISO 27001 ISMS architecture, security policies, and standard operating procedures",
        "DPDP Act compliance readiness, data principal rights, and privacy impact assessments",
        "Enterprise risk register development and third-party vendor tiering assessments",
        "Comprehensive regulatory audit readiness, mock drills, and board reporting"
      ]
    },
    {
      title: "AI Security",
      route: "ai-security",
      tag: "PROTECT",
      subtitle: "Model Security & Sovereign Safety",
      desc: "Sovereign model protection, prompt injection defense, and air-gapped neural safety.",
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
      title: "Offensive Security",
      route: "vapt",
      tag: "TEST",
      subtitle: "VAPT & Zero-Day Threat Emulation",
      desc: "Rigorous VAPT, zero-day threat discovery, and multi-vector adversary simulation.",
      icon: Lock,
      glow: "blue" as const,
      standards: ["OWASP Top 10", "Network Penetration", "API & LLM Security", "Adversary Simulation"],
      whatWeDo: [
        "Web, mobile app, and GraphQL/REST API penetration testing",
        "Internal/external network breach simulation and privilege escalation",
        "Cloud configuration audit and microservice boundary validation",
        "Board-ready remediation governance and technical remediation guidance"
      ]
    },
    {
      title: "Cloud & DevSecOps",
      route: "cloud-security",
      tag: "PROTECT",
      subtitle: "AWS, Azure & GCP Hardening",
      desc: "Hardened multi-cloud architecture (AWS/Azure/GCP), CI/CD gating, and Kubernetes isolation.",
      icon: Globe,
      glow: "orange" as const,
      standards: ["CIS Benchmarks", "Terraform / IaC", "Kubernetes Hardening", "IAM Least Privilege"],
      whatWeDo: [
        "Cloud Security Posture Management (CSPM) and drift detection",
        "Infrastructure as Code (IaC) automated gating in CI/CD pipelines",
        "Kubernetes container security and secrets isolation",
        "IAM privilege reduction and zero-trust identity enforcement"
      ]
    },
    {
      title: "Threat Intelligence",
      route: "threat-collector",
      tag: "TEST",
      subtitle: "Dark Web & Digital Asset Defense",
      desc: "24/7 dark web reconnaissance, VIP credential surveillance, and proactive C2 threat hunting.",
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
      title: "SOC Triage Services",
      route: "soc-ai",
      tag: "GOVERN",
      subtitle: "24/7 Threat Triage & Incident Resilience",
      desc: "24/7 security alert triage, threat correlation, incident containment, and automated SOAR playbooks.",
      icon: Layers,
      glow: "orange" as const,
      standards: ["24/7 SOC Triage", "SIEM / SOAR Playbooks", "Incident Response", "Zero Trust Architecture"],
      whatWeDo: [
        "24/7 security alert triage, threat correlation, and false-positive suppression",
        "Rapid incident containment, forensics, and executive crisis response playbooks",
        "Zero-trust network access (ZTNA) and micro-segmentation enforcement",
        "SIEM/SOAR automated playbooks and logging fidelity engineering"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10 bg-gradient-to-b from-transparent via-slate-100/40 dark:via-[#020510]/60 to-transparent">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-2 block font-bold font-mono">
            SECURITY CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Protect. Test. Govern.
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base max-w-xl mt-3 font-normal mx-auto">
            Mathematically verified defense architecture engineered for high-consequence enterprise workloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertises.map((service, idx) => {
            const Icon = service.icon;
            const isBlue = service.glow === 'blue';
            return (
              <TiltCard3D key={idx} glowColor={service.glow}>
                <div 
                  onClick={() => {
                    cyberAudio.playClick();
                    setActiveBrief(idx);
                  }}
                  className="flex flex-col h-full justify-between group cursor-pointer p-2"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm group-hover:scale-110 transition-all duration-300 ${
                        isBlue 
                          ? 'text-blue-600 dark:text-blue-400 group-hover:border-blue-500/50 group-hover:bg-blue-500/10' 
                          : 'text-orange-500 dark:text-orange-400 group-hover:border-orange-500/50 group-hover:bg-orange-500/10'
                      }`}>
                        <Icon size={22} />
                      </div>
                      <span className={`text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${
                        isBlue
                          ? 'text-blue-500 border-blue-500/30 bg-blue-500/10'
                          : 'text-orange-500 border-orange-500/30 bg-orange-500/10'
                      }`}>
                        {service.tag}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors ${
                      isBlue ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400' : 'group-hover:text-orange-500 dark:group-hover:text-orange-400'
                    }`}>
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 font-normal leading-relaxed mb-4">
                      {service.desc}
                    </p>
                  </div>

                  <div className={`pt-3 border-t border-slate-100 dark:border-stone-800/80 flex items-center justify-between text-xs font-semibold ${
                    isBlue ? 'text-blue-600 dark:text-blue-400' : 'text-orange-500 dark:text-orange-400'
                  }`}>
                    <span>View Architecture Dossier</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>

        {/* View all capabilities footer CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              cyberAudio.playClick();
              if (onOpenConsultation) {
                onOpenConsultation();
              } else {
                setActiveBrief(0);
              }
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-slate-700 dark:text-stone-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer group"
          >
            <span>Request Full Scope &amp; Architecture Briefing</span>
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeBrief !== null && (
            <div 
              id="capability-modal-backdrop"
              data-lenis-prevent="true"
              onClick={() => setActiveBrief(null)}
              className="fixed inset-0 z-[999999] overflow-y-auto bg-slate-950/90 backdrop-blur-2xl overscroll-contain"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <div className="min-h-full flex items-center justify-center p-3 sm:p-5 md:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-blue-500/30 rounded-3xl shadow-2xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(59,130,246,0.2)] text-slate-900 dark:text-stone-100 my-auto"
                >
                  <button
                    onClick={() => setActiveBrief(null)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 text-slate-500 dark:text-stone-400 hover:text-slate-900 dark:hover:text-white rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-stone-900 dark:hover:bg-stone-800 border border-slate-200 dark:border-stone-800 cursor-pointer z-30 transition-all shadow-sm"
                    aria-label="Close capability dossier"
                  >
                    <X size={18} />
                  </button>
                  <ServiceModalRenderer
                    activeBrief={activeBrief}
                    data={expertises[activeBrief]}
                    close={() => setActiveBrief(null)}
                    onOpenConsultation={onOpenConsultation}
                    onNavigate={setCurrentView}
                  />
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
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
  const [selectedService, setSelectedService] = useState("Cybersecurity GRC & ISO 27001 / SOC 2");
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(e.target as Node)) {
        setIsServiceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviceOptions = [
    "Cybersecurity GRC & ISO 27001 / SOC 2",
    "Offensive Security & VAPT Assessment",
    "Cloud Architecture & DevSecOps Hardening",
    "AI Risk Governance & LLM Red Teaming",
    "Dark Web & Threat Intelligence Monitoring",
    "Zero Trust Architecture & SOC Advisory",
    "Other"
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs uppercase tracking-widest font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400" />
              Direct Confidential Engagement
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Ready to Assess Your Security Posture?
            </h2>
            <p className="text-slate-600 dark:text-stone-300 font-normal text-base leading-relaxed mb-8">
              Speak directly with our senior cybersecurity advisors and offensive architects to scope your VAPT assessment, design an ISO 27001 / SOC 2 compliance roadmap, or evaluate sovereign AI governance under mutual NDA.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3.5 text-slate-700 dark:text-stone-300">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-500 dark:text-stone-500 tracking-wider font-semibold">Official Communications</div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <a href="mailto:support@cybravions.com" className="text-sm text-slate-900 dark:text-stone-200 hover:text-blue-600 dark:hover:text-white transition-colors font-medium">
                      support@cybravions.com
                    </a>
                    <span className="hidden sm:inline text-slate-400">&bull;</span>
                    <a href="mailto:cybravions@gmail.com" className="text-sm text-slate-600 dark:text-stone-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                      cybravions@gmail.com
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
                    <span className="hidden sm:inline text-slate-400">&bull;</span>
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
                  <div className="text-xs sm:text-sm text-slate-900 dark:text-stone-200 font-medium">
                    H. IN.KH.NO.293 S/F Western Marg, Saidulajab, Near Kher Singh Estate, New Delhi, Delhi 110030
                  </div>
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

                  <div className="relative" ref={serviceDropdownRef}>
                    <label className="block text-xs uppercase tracking-wider text-slate-600 dark:text-stone-400 mb-1.5 font-semibold">
                      Primary Area of Interest
                    </label>
                    <input type="hidden" name="service" value={selectedService} />

                    {/* Custom Select Trigger Button (Fixes browser native select white popup glitch) */}
                    <button
                      type="button"
                      onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-stone-900 border border-slate-300 dark:border-stone-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 shadow-sm flex items-center justify-between text-left cursor-pointer transition-colors"
                      aria-haspopup="listbox"
                      aria-expanded={isServiceDropdownOpen}
                    >
                      <span className="truncate">{selectedService}</span>
                      <ChevronDown
                        size={16}
                        className={`text-slate-400 dark:text-stone-500 transition-transform duration-200 shrink-0 ml-2 ${
                          isServiceDropdownOpen ? 'rotate-180 text-blue-500' : ''
                        }`}
                      />
                    </button>

                    {/* Custom Dropdown Listbox */}
                    <AnimatePresence>
                      {isServiceDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl p-1.5 bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 shadow-2xl dark:shadow-[0_15px_40px_rgba(0,0,0,0.85)] max-h-64 overflow-y-auto"
                          role="listbox"
                        >
                          {serviceOptions.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setSelectedService(opt);
                                setIsServiceDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                                selectedService === opt
                                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                                  : 'text-slate-700 dark:text-stone-300 hover:bg-slate-100 dark:hover:bg-stone-800/80'
                              }`}
                              role="option"
                              aria-selected={selectedService === opt}
                            >
                              <span>{opt}</span>
                              {selectedService === opt && (
                                <Check size={14} className="text-blue-500 shrink-0" />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* If "Other" is selected, provide custom specification input */}
                    {selectedService === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2.5"
                      >
                        <input
                          type="text"
                          name="custom_service_detail"
                          maxLength={120}
                          placeholder="Please specify your advisory or technology requirement..."
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-stone-900 border border-blue-500/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-stone-600 focus:outline-none focus:border-blue-500 text-xs shadow-sm"
                        />
                      </motion.div>
                    )}
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
      a: "Vulnerability Assessment and Penetration Testing (VAPT) identifies and validates security weaknesses in applications, APIs, networks, and cloud environments. The findings can help organizations prioritize remediation and support security and compliance programs."
    },
    {
      q: "How does Cybravion support startups vs global enterprises?",
      a: "Engagement scope can be tailored to an organization's size, systems, and goals, from focused assessments to broader governance, cloud security, and AI security work. Contact the team to discuss the appropriate scope."
    },
    {
      q: "What is your typical engagement timeline?",
      a: "Timing depends on the number of systems, access arrangements, and assessment scope. CYBRAVION can confirm a schedule after an initial scoping discussion."
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

interface FooterProps {
  setCurrentView: (view: string) => void;
  isDarkMode: boolean;
  onOpenLegal: (tab: LegalTabType) => void;
}

const Footer = ({ setCurrentView, isDarkMode, onOpenLegal }: FooterProps) => {
  return (
    <footer className={`py-16 px-6 md:px-12 lg:px-20 border-t relative z-10 transition-colors ${
      isDarkMode 
        ? 'bg-stone-950 border-stone-900 text-stone-300' 
        : 'bg-white border-slate-200 text-slate-700 shadow-inner'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Main Footer Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-4">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img 
                src="/logo.png" 
                alt="CYBRAVION" 
                width="200"
                height="65"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(37,99,235,0.35)]" 
              />
            </picture>
            <p className="text-xs text-slate-500 dark:text-stone-400 leading-relaxed font-light">
              CYBRAVION SOLUTIONS PRIVATE LIMITED is a Government of India registered cybersecurity engineering and GRC advisory firm headquartered in New Delhi, India.
            </p>
            <div className="text-[11px] font-mono text-slate-400 dark:text-stone-500">
              CIN: U62099DL2026PTC470901<br />RoC-Delhi · Companies Act, 2013
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 mb-4">
              Security Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setCurrentView('vapt'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-500 transition-colors cursor-pointer text-left">
                  VAPT &amp; Offensive Security
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('iso-27001'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-500 transition-colors cursor-pointer text-left">
                  ISO 27001:2022 Certification
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('soc-2'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-500 transition-colors cursor-pointer text-left">
                  SOC 2 Type I &amp; Type II Readiness
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('cloud-security'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-500 transition-colors cursor-pointer text-left">
                  Cloud Security &amp; DevSecOps
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('ai-security'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-500 transition-colors cursor-pointer text-left">
                  AI Security &amp; LLM Red Teaming
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('dpdp-compliance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-orange-500 transition-colors cursor-pointer text-left">
                  DPDP Act 2023 Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Enterprise Platforms */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
              Defense Platforms
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setCurrentView('threatforge'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-500 transition-colors cursor-pointer text-left">
                  ThreatForge (STRIDE / PASTA)
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('soc-ai'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-500 transition-colors cursor-pointer text-left">
                  SOC AI Triage (Autonomous SOAR)
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('exception-manager'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-500 transition-colors cursor-pointer text-left">
                  AI Exception Manager (GRC)
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('threat-collector'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-500 transition-colors cursor-pointer text-left">
                  Threat Intel Collector (MISP/STIX)
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('ai'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-500 transition-colors cursor-pointer text-left">
                  Cybravions AI (Sovereign Box)
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('cyberverse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-500 transition-colors cursor-pointer text-left">
                  CyberRange (CTF Simulation)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Knowledge */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-4">
              Knowledge &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setCurrentView('resources'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-500 transition-colors cursor-pointer text-left font-semibold text-orange-500">
                  Regulatory Guides &amp; Blueprints
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-500 transition-colors cursor-pointer text-left">
                  About CYBRAVION
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('compliance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-500 transition-colors cursor-pointer text-left">
                  Security &amp; Trust Center
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('training'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-500 transition-colors cursor-pointer text-left">
                  Training &amp; Capability Programs
                </button>
              </li>
              <li>
                <a href="#radar" onClick={() => setCurrentView('home')} className="hover:text-amber-500 transition-colors">
                  3D Threat Radar
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setCurrentView('home')} className="hover:text-amber-500 transition-colors font-semibold text-orange-500">
                  Request Advisory Briefing →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Transparency & Statutory Verification Block */}
        <div className={`p-6 rounded-2xl border text-xs leading-relaxed flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
          isDarkMode ? 'bg-[#090e1a] border-stone-800 text-stone-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 font-mono font-bold text-slate-900 dark:text-white">
              <Building2 size={16} className="text-orange-500 shrink-0" />
              <span>CYBRAVION SOLUTIONS PRIVATE LIMITED</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px]">
                CIN: U62099DL2026PTC470901
              </span>
            </div>
            <p className="text-[11px] font-sans">
              <strong>Registered Office:</strong> H. IN.KH.NO.293 S/F Western Marg, Saidulajab, Near Kher Singh Estate, New Delhi, Delhi, India, 110030
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-500 dark:text-stone-400">
              <span>Email: <a href="mailto:support@cybravions.com" className="text-blue-500 hover:underline">support@cybravions.com</a></span>
              <span>•</span>
              <span>Hotline: <a href="tel:+917258880881" className="text-blue-500 hover:underline">+91-7258880881</a></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <VisitorCounter isDarkMode={isDarkMode} />
            <a
              href="https://www.mca.gov.in/mcafoportal/companyLLPMasterData.do"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <ShieldCheck size={13} />
              <span>Verify on MCA.gov.in</span>
            </a>
            <a
              href="https://www.linkedin.com/company/cybravions"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3.5 py-2 rounded-xl border font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors ${
                isDarkMode ? 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-700' : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              <Linkedin size={13} className="text-blue-500" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Legal, Privacy & Corporate Verification Trust Bar */}
        <div className={`pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
          isDarkMode ? 'border-stone-900 text-stone-400' : 'border-slate-100 text-slate-500'
        }`}>
          {/* Policy & Trust Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono font-medium">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Privacy Policy (DPDP &amp; GDPR)
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('refund')}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Refund &amp; Cancellation
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('antifraud')}
              className="hover:text-red-500 transition-colors cursor-pointer font-bold text-red-500/90"
            >
              Anti-Fraud Alert
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('vdp')}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Vulnerability Disclosure (VDP)
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-orange-500 transition-colors cursor-pointer"
            >
              Security &amp; Cookie Policy
            </button>
            <span>•</span>
            <a
              href="/.well-known/security.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors font-semibold text-blue-500 dark:text-blue-400"
            >
              security.txt (RFC 9116)
            </a>
          </div>

          <div className="text-center md:text-right font-mono text-[11px] space-y-0.5">
            <div className="font-semibold text-slate-800 dark:text-stone-300">
              CYBRAVION SOLUTIONS PRIVATE LIMITED · CIN: U62099DL2026PTC470901
            </div>
            <div>
              © {new Date().getFullYear()} CYBRAVION Solutions. Regd. in New Delhi, India. All rights reserved.
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- Main Application ---

export default function App() {
  const [currentView, setCurrentViewState] = useState<AppView>(() =>
    resolveAppView(window.location.pathname, window.location.hash),
  );
  const setCurrentView = (view: string) => {
    const path = pathForView(view);
    if (!path) return;
    if (window.location.pathname !== path || window.location.hash) {
      window.history.pushState({}, '', path);
    }
    setCurrentViewState(view as AppView);
  };
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCyberUniverseReady, setIsCyberUniverseReady] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTabType>('privacy');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cybravions_theme');
      if (saved) return saved === 'dark';
    }
    return true;
  });
  const seo = currentView === 'not-found'
    ? notFoundSeo
    : seoPages[pathForView(currentView) ?? '/'];

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

  // Automatically strip temporary cache-busting query params (like ?v=...) from the address bar
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      if (params.has('v')) {
        params.delete('v');
        const cleanQuery = params.toString() ? `?${params.toString()}` : '';
        const cleanPath = `${window.location.pathname}${cleanQuery}${window.location.hash}`;
        window.history.replaceState({}, document.title, cleanPath);
      }
    }
  }, []);

  // Keep route state in sync with direct navigation and browser history.
  useEffect(() => {
    const syncRoute = () => {
      setCurrentViewState(resolveAppView(window.location.pathname, window.location.hash));
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  // Keep WebGL initialization outside the initial render and Lighthouse TTI window.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsCyberUniverseReady(true), 4500);
    return () => window.clearTimeout(timer);
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

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
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

  const scrollToServices = () => {
    const el = document.getElementById('services');
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
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content={currentView === 'not-found' ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
        {currentView !== 'not-found' && <link rel="canonical" href={`https://cybravions.com${pathForView(currentView) ?? '/'}`} />}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://cybravions.com${pathForView(currentView) ?? '/404'}`} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content="https://cybravions.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://cybravions.com/og-image.png" />
      </Helmet>

      {/* Persistent Full-Viewport 3D Cybersecurity Universe */}
      {isCyberUniverseReady && (
        <React.Suspense fallback={null}>
          <CyberUniverse3D currentView={currentView} isDarkMode={isDarkMode} />
        </React.Suspense>
      )}



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
            <AppRoutes
              currentView={currentView}
              setCurrentView={setCurrentView}
              isDarkMode={isDarkMode}
              onOpenAuditModal={() => setIsAuditModalOpen(true)}
            >
              {currentView === 'home' && (
              <>
                {/* 01. Focused Hero */}
                <Hero 
                  isDarkMode={isDarkMode} 
                  onOpenBriefing={() => setIsAuditModalOpen(true)}
                  onExploreCapabilities={scrollToServices}
                  setCurrentView={setCurrentView} 
                />

                {/* 02. Security Core (6 Real Capabilities) */}
                <Services onOpenConsultation={() => setIsAuditModalOpen(true)} setCurrentView={setCurrentView} />

                {/* 03. Interactive Threat Radar Demo */}
                <DeferredMount id="radar" className="min-h-[500px]">
                  <React.Suspense fallback={
                    <div className="w-full py-24 flex items-center justify-center text-slate-500 font-mono text-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-orange-500 border-t-transparent animate-spin mr-3" />
                      Initializing Threat Radar Environment...
                    </div>
                  }>
                    <ThreatRadar3D onOpenAuditModal={() => setIsAuditModalOpen(true)} />
                  </React.Suspense>
                </DeferredMount>

                {/* 04. What We Build (Cybravions AI, CyberRange, Exception Manager) */}
                <ProductsShowcase 
                  setCurrentView={setCurrentView} 
                  isDarkMode={isDarkMode} 
                />

                {/* 05. Security Model (Offensive, Defensive, Governance) */}
                <SecurityModel isDarkMode={isDarkMode} />

                <FAQ />

                {/* 06. Direct Scoping & Contact Briefing */}
                <Contact />
              </>
              )}
            </AppRoutes>
          </React.Suspense>
        </main>

        <Footer 
          setCurrentView={setCurrentView} 
          isDarkMode={isDarkMode} 
          onOpenLegal={(tab) => {
            cyberAudio.playClick();
            setLegalTab(tab);
            setIsLegalModalOpen(true);
          }}
        />

        {/* Global Keyboard Command Palette & Quick Search (⌘K / Ctrl+K) */}
        {isCommandPaletteOpen && (
          <React.Suspense fallback={null}>
            <CommandPalette
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              setCurrentView={setCurrentView}
              onOpenAuditModal={() => setIsAuditModalOpen(true)}
            />
          </React.Suspense>
        )}

        {/* Interactive Instant Security Posture & Compliance Audit Modal */}
        {isAuditModalOpen && (
          <React.Suspense fallback={null}>
            <SecurityAuditModal
              isOpen={isAuditModalOpen}
              onClose={() => setIsAuditModalOpen(false)}
              isDarkMode={isDarkMode}
            />
          </React.Suspense>
        )}

        {/* Legal, Privacy & Compliance Governance Modal */}
        {isLegalModalOpen && (
          <React.Suspense fallback={null}>
            <LegalModal
              isOpen={isLegalModalOpen}
              onClose={() => setIsLegalModalOpen(false)}
              initialTab={legalTab}
              isDarkMode={isDarkMode}
            />
          </React.Suspense>
        )}
      </div>
    </div>
  );
}
