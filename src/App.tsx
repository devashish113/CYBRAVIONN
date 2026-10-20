/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home,
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
  FileCheck,
  Hexagon,
  LayoutGrid
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
import { ThemeToggleNeumorphic } from './components/ThemeToggleNeumorphic';
import { HoneycombNavCard } from './components/HoneycombNavCard';
import { PolygonHexCard } from './components/PolygonHexCard';

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

interface NavRipple {
  id: number;
  x: number;
  y: number;
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
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // Water Glassmorphism Hover Wave Physics State
  const [navCoords, setNavCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [navRipples, setNavRipples] = useState<NavRipple[]>([]);
  const lastNavRippleTime = useRef<number>(0);

  const spawnNavRipple = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastNavRippleTime.current < 160) return;
    lastNavRippleTime.current = now;

    const newRipple: NavRipple = { id: now, x, y };
    setNavRipples((prev) => [...prev.slice(-2), newRipple]);

    setTimeout(() => {
      setNavRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1350);
  }, []);

  const handleNavMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setNavCoords({ x, y });
    spawnNavRipple(x, y);
  };

  const handleNavMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setIsNavHovered(true);
    cyberAudio.playHover();
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setNavCoords({ x, y });
    spawnNavRipple(x, y);
  };

  const handleNavMouseLeave = () => {
    setIsNavHovered(false);
    setNavCoords({ x: 0, y: 0 });
  };

  const navRef = useRef<HTMLElement>(null);
  const productsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cyberAudio.playClick();
    if (productsTimerRef.current) clearTimeout(productsTimerRef.current);
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setIsServicesOpen(false);
    setIsProductsOpen(prev => !prev);
  };

  const toggleServices = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cyberAudio.playClick();
    if (productsTimerRef.current) clearTimeout(productsTimerRef.current);
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setIsProductsOpen(false);
    setIsServicesOpen(prev => !prev);
  };

  const handleProductsEnter = () => {
    if (productsTimerRef.current) clearTimeout(productsTimerRef.current);
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setIsServicesOpen(false);
    setIsProductsOpen(true);
  };

  const handleProductsLeave = () => {
    if (productsTimerRef.current) clearTimeout(productsTimerRef.current);
    productsTimerRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 250);
  };

  const handleServicesEnter = () => {
    if (productsTimerRef.current) clearTimeout(productsTimerRef.current);
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setIsProductsOpen(false);
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    servicesTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 250);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsProductsOpen(false);
        setIsServicesOpen(false);
      }
    };
    if (isProductsOpen || isServicesOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      if (productsTimerRef.current) clearTimeout(productsTimerRef.current);
      if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    };
  }, [isProductsOpen, isServicesOpen]);

  // Lock body/html scroll and pause Lenis when mobile menu is open
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: any }).__lenis;
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (isProductsOpen) setIsProductsOpen(false);
        if (isServicesOpen) setIsServicesOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, isProductsOpen, isServicesOpen]);

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
    <header className="relative w-full z-50" role="banner">
      {/* Section 1: Top-Left Brand Logo (Independent, 100% Transparent, Fixed to Hero Section) */}
      <div className="absolute top-3 sm:top-5 md:top-6 left-5 sm:left-8 md:left-10 lg:left-12 xl:left-14 z-40 pointer-events-auto">
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
              width="340"
              height="312"
              loading="eager"
              decoding="async"
              className="h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] xl:h-[90px] w-auto object-contain object-left transition-transform duration-200 hover:scale-105 drop-shadow-md" 
            />
          </picture>
        </a>
      </div>

      {/* Section 2: Top-Right Controls (Independent, Fixed to Hero Section) */}
      <div className="absolute top-3 sm:top-4 md:top-5 right-4 sm:right-6 lg:right-8 xl:right-10 z-40 flex items-center gap-2 sm:gap-2.5 pointer-events-auto">
        {/* Circular Tactile Neumorphic Search Button */}
        <motion.button
          onClick={() => {
            cyberAudio.playClick();
            onOpenCommandPalette?.();
          }}
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.05 }}
          className={`w-[42px] h-[42px] xl:w-[44px] xl:h-[44px] rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-[#18181b] border border-white/[0.08] text-neutral-400 hover:text-white' 
              : 'bg-[#e3e8f0] border border-black/[0.06] text-[#4c586b] hover:text-[#0f172a]'
          }`}
          style={{
            boxShadow: isDarkMode
              ? 'inset 2.5px 3px 6px rgba(0, 0, 0, 0.75), inset -1.5px -1.5px 4px rgba(255, 255, 255, 0.08)'
              : 'inset 2.5px 3px 5px rgba(140, 155, 178, 0.45), inset -2.5px -2.5px 5px rgba(255, 255, 255, 0.95)',
          }}
          aria-label="Search (Ctrl+K or ⌘K)"
          title="Search (Ctrl+K or ⌘K)"
        >
          <Search size={16} className={isDarkMode ? 'text-neutral-400' : 'text-[#5a677a]'} />
        </motion.button>

        {/* Tactile Neumorphic Dark / Light Mode Toggle Button */}
        <ThemeToggleNeumorphic isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Contact CTA */}
        <a 
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="px-4.5 sm:px-5.5 h-[42px] xl:h-[44px] rounded-full text-xs xl:text-[13px] font-bold tracking-normal transition-all duration-150 shrink-0 whitespace-nowrap cursor-pointer bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 shadow-sm active:scale-[0.98] border border-neutral-700/50 dark:border-white/20 flex items-center justify-center"
          title="Contact"
        >
          <span>Contact</span>
        </a>
      </div>

      {/* Section 3: Center Floating Navigation Capsule (Independent, Fixed to Screen across Scroll) */}
      <nav 
        ref={navRef}
        className={`fixed top-3 sm:top-4 md:top-5 left-1/2 -translate-x-1/2 z-50 rounded-full transition-all duration-300 pointer-events-auto px-2.5 sm:px-3.5 xl:px-4.5 h-[50px] xl:h-[52px] flex items-center justify-center max-w-[calc(100vw-1.5rem)] select-none ${
          isDarkMode
            ? isScrolled
              ? 'bg-[#141416]/95 border border-white/[0.08] backdrop-blur-2xl'
              : 'bg-[#18181b] border border-white/[0.08] backdrop-blur-xl'
            : isScrolled
              ? 'bg-[#e3e8f0]/95 border border-black/[0.06] backdrop-blur-2xl'
              : 'bg-[#e3e8f0] border border-black/[0.06] backdrop-blur-xl'
        }`}
        style={{
          boxShadow: isDarkMode
            ? 'inset 3px 3.5px 8px rgba(0, 0, 0, 0.8), inset -2px -2px 5px rgba(255, 255, 255, 0.08)'
            : 'inset 3px 3.5px 7px rgba(140, 155, 178, 0.45), inset -3px -3px 7px rgba(255, 255, 255, 0.95)',
        }}
        aria-label="Main navigation"
      >
        {/* Desktop View: Clickable Pages */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 relative z-10">
          {/* Home Link */}
          <button 
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative text-xs xl:text-[12.5px] uppercase tracking-wider font-bold cursor-pointer py-2 xl:py-2.5 px-4.5 xl:px-5 rounded-full whitespace-nowrap transition-colors duration-200 select-none ${
              currentView === 'home' 
                ? isDarkMode ? 'text-white' : 'text-[#1e293b]' 
                : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-[#4c586b] hover:text-[#0f172a]'
            }`}
          >
            {currentView === 'home' && (
              <motion.div
                layoutId="neumorphic-nav-active-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: isDarkMode ? '#27272a' : '#ffffff',
                  boxShadow: isDarkMode
                    ? '2.5px 3px 8px rgba(0, 0, 0, 0.65), -1.5px -1.5px 4px rgba(255, 255, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.18)'
                    : '3px 3.5px 8px rgba(140, 155, 175, 0.42), -2.5px -2.5px 6px rgba(255, 255, 255, 0.98), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 480,
                  damping: 34,
                  mass: 0.75,
                }}
              />
            )}
            <span className="relative z-10 leading-none">Home</span>
          </button>

          {/* Products & Platforms Dropdown */}
          <div 
            onMouseEnter={handleProductsEnter}
            onMouseLeave={handleProductsLeave}
          >
            <button
              type="button"
              onClick={toggleProducts}
              className={`relative text-xs xl:text-[12.5px] uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer py-2 xl:py-2.5 px-4.5 xl:px-5 rounded-full whitespace-nowrap transition-colors duration-200 select-none ${
                ['threatforge', 'threatintel', 'ai', 'cyberverse', 'exception-manager', 'soc-ai', 'threat-collector'].includes(currentView) || isProductsOpen
                  ? isDarkMode ? 'text-white' : 'text-[#1e293b]' 
                  : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-[#4c586b] hover:text-[#0f172a]'
              }`}
              aria-label="Products menu"
              aria-expanded={isProductsOpen}
              aria-haspopup="true"
              aria-controls="products-menu-dropdown"
            >
              {(['threatforge', 'threatintel', 'ai', 'cyberverse', 'exception-manager', 'soc-ai', 'threat-collector'].includes(currentView) || isProductsOpen) && (
                <motion.div
                  layoutId="neumorphic-nav-active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: isDarkMode ? '#27272a' : '#ffffff',
                    boxShadow: isDarkMode
                      ? '2.5px 3px 8px rgba(0, 0, 0, 0.65), -1.5px -1.5px 4px rgba(255, 255, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.18)'
                      : '3px 3.5px 8px rgba(140, 155, 175, 0.42), -2.5px -2.5px 6px rgba(255, 255, 255, 0.98), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 480,
                    damping: 34,
                    mass: 0.75,
                  }}
                />
              )}
              <span className="relative z-10 leading-none">Products</span>
              <ChevronDown size={14} aria-hidden="true" className={`relative z-10 transition-transform duration-200 pointer-events-none ${isProductsOpen ? 'rotate-180' : ''} ${(['threatforge', 'threatintel', 'ai', 'cyberverse', 'exception-manager', 'soc-ai', 'threat-collector'].includes(currentView) || isProductsOpen) ? (isDarkMode ? 'text-white' : 'text-[#1e293b]') : (isDarkMode ? 'text-neutral-400' : 'text-[#64748b]')}`} />
            </button>

            {/* Products Dropdown Mega-Menu */}
            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  id="products-menu-dropdown"
                  role="region"
                  aria-label="Products and platforms menu"
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[720px] xl:w-[760px] max-w-[calc(100vw-2rem)] z-[999] pointer-events-auto"
                >
                  {/* Invisible Safe Hover Bridge */}
                  <div className="absolute -top-3.5 left-0 right-0 h-4 bg-transparent pointer-events-auto" />

                    {/* Dropdown Card */}
                    <div className={`rounded-3xl p-6 overflow-hidden transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#111113]/98 border border-white/[0.10] text-white shadow-[0_28px_70px_-15px_rgba(0,0,0,0.9),0_12px_28px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl' 
                        : 'bg-white/98 border border-black/[0.08] text-slate-900 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.18),0_10px_24px_-8px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.15)] backdrop-blur-2xl'
                    }`}>
                    <div className="relative z-10 space-y-4">
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between px-1 pb-3 border-b border-slate-200/80 dark:border-white/[0.08]">
                        <div className="flex items-center gap-2.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                          </span>
                          <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-slate-700 dark:text-neutral-300">
                            Enterprise Security Platforms &amp; Autonomous Engines
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-neutral-300 border border-slate-200/80 dark:border-white/[0.08] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                          <span>6 Honeycomb Platforms</span>
                        </span>
                      </div>

                      {/* 2x3 Honeycomb Cyber-Cells Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <HoneycombNavCard
                          title="ThreatForge"
                          tag="STRIDE / PASTA"
                          desc="Automated threat modeling, attack path trees & CVSS 3.1 quantitative scoring."
                          icon={ShieldAlert}
                          isActive={currentView === 'threatforge'}
                          onClick={() => {
                            setCurrentView('threatforge');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        <HoneycombNavCard
                          title="SOC AI Triage"
                          tag="SOAR Engine"
                          desc="Autonomous SIEM alert investigation with SHAP explainable verdicts & playbooks."
                          icon={BellRing}
                          isActive={currentView === 'soc-ai'}
                          onClick={() => {
                            setCurrentView('soc-ai');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        <HoneycombNavCard
                          title="Exception Manager"
                          tag="AI Governance"
                          desc="Automated cyber risk waiver assessment, drift tracking & audit PDF workflows."
                          icon={ShieldCheck}
                          isActive={currentView === 'exception-manager'}
                          onClick={() => {
                            setCurrentView('exception-manager');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        <HoneycombNavCard
                          title="CyberRange Arena"
                          tag="CTF & CISM"
                          desc="Gamified CyberQuest labs, hands-on cryptography puzzles & CISM scenarios."
                          icon={Gamepad2}
                          isActive={currentView === 'cyberverse'}
                          onClick={() => {
                            setCurrentView('cyberverse');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        <HoneycombNavCard
                          title="Intel Collector"
                          tag="MISP & OTX"
                          desc="Multi-source IOC ingestion, automated STIX 2.1 normalization & air-gap bundles."
                          icon={Radio}
                          isActive={currentView === 'threat-collector'}
                          onClick={() => {
                            setCurrentView('threat-collector');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        <HoneycombNavCard
                          title="Cybravions AI"
                          tag="Secure Core"
                          desc="Air-gapped offline agentic AI in-a-box for enterprise private environments."
                          icon={Brain}
                          isActive={currentView === 'ai'}
                          onClick={() => {
                            setCurrentView('ai');
                            setIsProductsOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />
                      </div>

                      {/* Bottom Footer Bar */}
                      <div className="pt-3 px-1 pb-0.5 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-neutral-400">
                          <span className="font-bold text-slate-900 dark:text-white">Custom Deployment?</span>
                          <span className="text-[11px]">Air-gapped secure compute &amp; private enclaves.</span>
                        </div>
                        <a
                          href="#contact"
                          onClick={(e) => {
                            handleNavClick(e, '#contact');
                            setIsProductsOpen(false);
                          }}
                          className="px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 shadow-sm flex items-center gap-1.5 shrink-0 group/cta"
                        >
                          <span>Consult Architect</span>
                          <ArrowRight size={12} className="group-hover/cta:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown Mega-Menu */}
            <div 
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                type="button"
                onClick={toggleServices}
                className={`relative text-xs xl:text-[12.5px] uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer py-2 xl:py-2.5 px-4.5 xl:px-5 rounded-full whitespace-nowrap transition-colors duration-200 select-none ${
                  ['vapt', 'iso-27001', 'soc-2', 'cloud-security', 'ai-security', 'dpdp-compliance', 'compliance', 'training'].includes(currentView) || isServicesOpen
                    ? isDarkMode ? 'text-white' : 'text-[#1e293b]' 
                    : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-[#4c586b] hover:text-[#0f172a]'
                }`}
                aria-label="Services menu"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                aria-controls="services-menu-dropdown"
              >
                {(['vapt', 'iso-27001', 'soc-2', 'cloud-security', 'ai-security', 'dpdp-compliance', 'compliance', 'training'].includes(currentView) || isServicesOpen) && (
                  <motion.div
                    layoutId="neumorphic-nav-active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: isDarkMode ? '#27272a' : '#ffffff',
                      boxShadow: isDarkMode
                        ? '2.5px 3px 8px rgba(0, 0, 0, 0.65), -1.5px -1.5px 4px rgba(255, 255, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.18)'
                        : '3px 3.5px 8px rgba(140, 155, 175, 0.42), -2.5px -2.5px 6px rgba(255, 255, 255, 0.98), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 480,
                      damping: 34,
                      mass: 0.75,
                    }}
                  />
                )}
                <span className="relative z-10 leading-none">Services</span>
                <ChevronDown size={14} aria-hidden="true" className={`relative z-10 transition-transform duration-200 pointer-events-none ${isServicesOpen ? 'rotate-180' : ''} ${(['vapt', 'iso-27001', 'soc-2', 'cloud-security', 'ai-security', 'dpdp-compliance', 'compliance', 'training'].includes(currentView) || isServicesOpen) ? (isDarkMode ? 'text-white' : 'text-[#1e293b]') : (isDarkMode ? 'text-neutral-400' : 'text-[#64748b]')}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    id="services-menu-dropdown"
                    role="region"
                    aria-label="Cybersecurity capabilities and services menu"
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[760px] xl:w-[800px] max-w-[calc(100vw-2rem)] z-[999] pointer-events-auto"
                  >
                    {/* Invisible Safe Hover Bridge */}
                    <div className="absolute -top-3.5 left-0 right-0 h-4 bg-transparent pointer-events-auto" />

                    {/* Dropdown Card */}
                    <div className={`rounded-3xl p-6 overflow-hidden transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#111113]/98 border border-white/[0.10] text-white shadow-[0_28px_70px_-15px_rgba(0,0,0,0.9),0_12px_28px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl' 
                        : 'bg-white/98 border border-black/[0.08] text-slate-900 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.18),0_10px_24px_-8px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.15)] backdrop-blur-2xl'
                    }`}>
                    <div className="relative z-10 space-y-4">
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between px-1 pb-3 border-b border-slate-200/80 dark:border-white/[0.08]">
                        <div className="flex items-center gap-2.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                          </span>
                          <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-slate-700 dark:text-neutral-300">
                            Enterprise Cybersecurity Services &amp; Regulatory Advisory
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-neutral-300 border border-slate-200/80 dark:border-white/[0.08] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                          <span>7 Practices + GRC Hub</span>
                        </span>
                      </div>

                      {/* 2x4 Honeycomb Cyber-Cells Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <HoneycombNavCard
                          title="VAPT & Offensive Security"
                          tag="CERT-In Aligned"
                          desc="Web, mobile, API & cloud network penetration testing with manual exploit proofs."
                          icon={ShieldCheck}
                          isActive={currentView === 'vapt'}
                          onClick={() => {
                            setCurrentView('vapt');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        <HoneycombNavCard
                          title="ISO 27001:2022 Certification"
                          tag="8-12 Wks"
                          desc="Turnkey ISMS implementation, Statement of Applicability & Stage 2 audit pass guarantee."
                          icon={Award}
                          isActive={currentView === 'iso-27001'}
                          onClick={() => {
                            setCurrentView('iso-27001');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        <HoneycombNavCard
                          title="SOC 2 Type I & Type II"
                          tag="AICPA Trust"
                          desc="Accelerate enterprise SaaS procurement with continuous audit evidence & CPA partner liaison."
                          icon={FileCheck}
                          isActive={currentView === 'soc-2'}
                          onClick={() => {
                            setCurrentView('soc-2');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        <HoneycombNavCard
                          title="Cloud Security & DevSecOps"
                          tag="Multi-Cloud"
                          desc="AWS, Azure, GCP & Kubernetes CIS benchmark hardening and automated CI/CD gating."
                          icon={Cloud}
                          isActive={currentView === 'cloud-security'}
                          onClick={() => {
                            setCurrentView('cloud-security');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        <HoneycombNavCard
                          title="AI Security & LLM Red Teaming"
                          tag="OWASP LLM"
                          desc="Prompt injection defenses, RAG poisoning audits, and enterprise safety testing."
                          icon={Brain}
                          isActive={currentView === 'ai-security'}
                          onClick={() => {
                            setCurrentView('ai-security');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        <HoneycombNavCard
                          title="DPDP Act 2023 Compliance"
                          tag="Statutory Mandate"
                          desc="Data Fiduciary advisory, consent architectures, and preventing penalties up to ₹250 Crores."
                          icon={Scale}
                          isActive={currentView === 'dpdp-compliance'}
                          onClick={() => {
                            setCurrentView('dpdp-compliance');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        {/* 7: Online IT & Cyber Training */}
                        <HoneycombNavCard
                          title="Online IT & Cyber Training"
                          tag="Live Labs & LMS"
                          desc="Workforce cyber awareness, hands-on offensive/defensive labs, and executive defense bootcamps."
                          icon={GraduationCap}
                          isActive={currentView === 'training'}
                          onClick={() => {
                            setCurrentView('training');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                        />

                        {/* 8: Global Compliance & GRC Automation Hub */}
                        <HoneycombNavCard
                          title="Compliance & Automated GRC Hub"
                          tag="All Frameworks"
                          desc="Continuous compliance automation for ISO 27001, SOC 2, HIPAA, NIST, GDPR & DPDP."
                          icon={ShieldCheck}
                          isActive={currentView === 'compliance'}
                          onClick={() => {
                            setCurrentView('compliance');
                            setIsServicesOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          isDarkMode={isDarkMode}
                          actionText="Launch Hub"
                        />
                      </div>

                      {/* Bottom Footer Bar */}
                      <div className="pt-3 px-1 pb-0.5 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between text-xs">
                        <a
                          href="#services"
                          onClick={(e) => {
                            handleNavClick(e, '#services');
                            setIsServicesOpen(false);
                          }}
                          className="text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors"
                        >
                          View all security capability frameworks →
                        </a>
                        <button
                          onClick={() => {
                            setIsServicesOpen(false);
                            onOpenAuditModal?.();
                          }}
                          className="px-4 py-1.5 rounded-full text-xs font-bold transition-all bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 shadow-sm flex items-center gap-1.5 shrink-0 group/cta"
                        >
                          <span>Request Scoping Call</span>
                          <ArrowRight size={12} className="group-hover/cta:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Us Page Link */}
            <button 
              onClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative text-xs xl:text-[12.5px] uppercase tracking-wider font-bold cursor-pointer py-2 xl:py-2.5 px-4.5 xl:px-5 rounded-full whitespace-nowrap transition-colors duration-200 select-none ${
                currentView === 'about' 
                  ? isDarkMode ? 'text-white' : 'text-[#1e293b]' 
                  : isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-[#4c586b] hover:text-[#0f172a]'
              }`}
            >
              {currentView === 'about' && (
                <motion.div
                  layoutId="neumorphic-nav-active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: isDarkMode ? '#27272a' : '#ffffff',
                    boxShadow: isDarkMode
                      ? '2.5px 3px 8px rgba(0, 0, 0, 0.65), -1.5px -1.5px 4px rgba(255, 255, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.18)'
                      : '3px 3.5px 8px rgba(140, 155, 175, 0.42), -2.5px -2.5px 6px rgba(255, 255, 255, 0.98), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 480,
                    damping: 34,
                    mass: 0.75,
                  }}
                />
              )}
              <span className="relative z-10 leading-none">About Us</span>
            </button>
          </div>

          {/* Smartphone / Mobile View: Floating Micro-Capsule */}
          <div className="flex lg:hidden items-center gap-1.5 relative z-10 px-1 py-0.5">
            {/* Search trigger */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                onOpenCommandPalette?.();
              }}
              className={`flex items-center justify-center w-8.5 h-8.5 rounded-full text-xs transition-colors cursor-pointer ${
                isDarkMode
                  ? 'text-neutral-300 hover:text-white bg-[#27272a]'
                  : 'text-[#4c586b] hover:text-[#1e293b] bg-[#ffffff]'
              }`}
              style={{
                boxShadow: isDarkMode
                  ? '1.5px 2px 5px rgba(0, 0, 0, 0.5), -1px -1px 2.5px rgba(255, 255, 255, 0.08)'
                  : '2px 2.5px 5px rgba(140, 155, 178, 0.4), -1.5px -1.5px 4px rgba(255, 255, 255, 0.95)',
              }}
              aria-label="Search"
              title="Search"
            >
              <Search size={14} className={isDarkMode ? 'text-neutral-300' : 'text-[#5a677a]'} />
            </button>

            <div 
              className={`w-[1px] h-3.5 mx-0.5 rounded-full shrink-0 ${
                isDarkMode 
                  ? 'bg-black/60 shadow-[1px_0_0_rgba(255,255,255,0.08)]' 
                  : 'bg-[#cbd5e1] shadow-[1px_0_0_rgba(255,255,255,0.95)]'
              }`} 
            />

            {/* Menu Drawer Toggle */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                isDarkMode
                  ? 'text-neutral-300 hover:text-white bg-[#27272a]'
                  : 'text-[#4c586b] hover:text-[#1e293b] bg-[#ffffff]'
              }`}
              style={{
                boxShadow: isDarkMode
                  ? '1.5px 2px 5px rgba(0, 0, 0, 0.5), -1px -1px 2.5px rgba(255, 255, 255, 0.08)'
                  : '2px 2.5px 5px rgba(140, 155, 178, 0.4), -1.5px -1.5px 4px rgba(255, 255, 255, 0.95)',
              }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
              <span className="text-[10px] font-bold">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </nav>


      {/* Mobile Full-Screen Navigation Drawer via Portal (immune to backdrop-filter containing block bugs) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              data-lenis-prevent="true"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={`fixed inset-0 z-[999999] lg:hidden flex flex-col ${
                isDarkMode 
                  ? 'bg-[#07090e] text-stone-100' 
                  : 'bg-white text-slate-900 shadow-2xl'
              }`}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            >
              {/* Top Header Bar inside Portal */}
              <div className={`px-4 sm:px-6 py-3.5 border-b flex items-center justify-between shrink-0 ${
                isDarkMode ? 'border-white/10 bg-[#05070d]' : 'border-slate-200 bg-slate-50'
              }`}>
                {/* Brand Logo */}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    cyberAudio.playClick();
                    setCurrentView('home');
                    setIsMobileMenuOpen(false);
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
                      width="160"
                      height="148"
                      loading="eager"
                      decoding="async"
                      className="h-10 sm:h-11 w-auto object-contain drop-shadow-sm" 
                    />
                  </picture>
                </a>

                {/* Right controls: Search + Theme + Close */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenCommandPalette?.();
                    }}
                    className={`p-2 rounded-full border transition-all cursor-pointer ${
                      isDarkMode
                        ? 'bg-neutral-900 border-neutral-700 text-neutral-300'
                        : 'bg-white border-neutral-300 text-neutral-700 shadow-sm'
                    }`}
                    aria-label="Search and command palette"
                  >
                    <Search size={18} />
                  </button>

                  <ThemeToggleNeumorphic 
                    isDarkMode={isDarkMode} 
                    toggleDarkMode={toggleDarkMode} 
                    size="sm" 
                  />

                  <button 
                    className={`p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                      isDarkMode ? 'bg-white/10 hover:bg-white/15 border-white/10 text-white' : 'bg-neutral-200 hover:bg-neutral-300 border-neutral-300 text-neutral-900'
                    }`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    aria-label="Close navigation menu"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-2.5">
                {/* 1. Home */}
                <button
                  onClick={() => {
                    cyberAudio.playClick();
                    setCurrentView('home');
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full p-3.5 rounded-2xl text-left flex items-center justify-between transition-colors border cursor-pointer ${
                    currentView === 'home'
                      ? isDarkMode ? 'bg-white/[0.08] text-white font-bold border-white/20' : 'bg-neutral-100 text-neutral-950 font-bold border-neutral-300'
                      : isDarkMode ? 'bg-[#0e1017] hover:bg-white/[0.04] text-neutral-200 border-white/[0.08]' : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Home size={18} className={currentView === 'home' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'} />
                    <span className="text-xs font-bold uppercase tracking-wider">Home</span>
                  </div>
                  {currentView === 'home' ? (
                    <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
                  ) : (
                    <ChevronRight size={16} className="text-neutral-400 dark:text-neutral-500" />
                  )}
                </button>

                {/* 2. Products (Collapsible Accordion) */}
                <div className={`rounded-2xl border overflow-hidden transition-colors ${
                  isDarkMode ? 'bg-[#0e1017] border-white/[0.08]' : 'bg-white border-neutral-200 shadow-sm'
                }`}>
                  <button
                    onClick={() => {
                      cyberAudio.playClick();
                      setIsMobileProductsOpen(!isMobileProductsOpen);
                    }}
                    className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer"
                    aria-expanded={isMobileProductsOpen}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldAlert size={18} className={isMobileProductsOpen ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'} />
                      <span className="text-xs font-bold uppercase tracking-wider">Products</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-white/[0.08] font-semibold">
                        6
                      </span>
                    </div>
                    <ChevronDown size={18} className={`transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180 text-neutral-900 dark:text-white' : 'text-neutral-400 dark:text-neutral-500'}`} />
                  </button>

                  <AnimatePresence>
                    {isMobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 pb-3 space-y-2 border-t border-neutral-200/80 dark:border-white/[0.06] pt-2.5"
                      >
                        {/* ThreatForge */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('threatforge');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'threatforge'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <ShieldAlert size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">ThreatForge</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">STRIDE &amp; PASTA Threat Modeling</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* SOC AI Triage */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('soc-ai');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'soc-ai'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <BellRing size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">SOC AI Triage</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">Autonomous SOAR Alert Engine</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* Exception Manager */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('exception-manager');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'exception-manager'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <ShieldCheck size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">Exception Manager</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">Cyber Risk Waiver &amp; Governance</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* CyberRange */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('cyberverse');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'cyberverse'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <Gamepad2 size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">CyberRange</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">CTF &amp; CISM Live Quest Arena</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* Threat Intel Collector */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('threat-collector');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'threat-collector'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <Radio size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">Threat Intel Collector</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">MISP &amp; OTX Automated Feed Ingestion</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* Cybravions AI Platform */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('ai');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'ai'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <Brain size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">Cybravions AI Platform</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">On-Prem Enterprise LLM Security Suite</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Services (Collapsible Accordion) */}
                <div className={`rounded-2xl border overflow-hidden transition-colors ${
                  isDarkMode ? 'bg-[#0e1017] border-white/[0.08]' : 'bg-white border-neutral-200 shadow-sm'
                }`}>
                  <button
                    onClick={() => {
                      cyberAudio.playClick();
                      setIsMobileServicesOpen(!isMobileServicesOpen);
                    }}
                    className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer"
                    aria-expanded={isMobileServicesOpen}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className={isMobileServicesOpen ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'} />
                      <span className="text-xs font-bold uppercase tracking-wider">Services</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-white/[0.08] font-semibold">
                        8
                      </span>
                    </div>
                    <ChevronDown size={18} className={`transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180 text-neutral-900 dark:text-white' : 'text-neutral-400 dark:text-neutral-500'}`} />
                  </button>

                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 pb-3 space-y-2 border-t border-neutral-200/80 dark:border-white/[0.06] pt-2.5"
                      >
                        {/* VAPT */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('vapt');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'vapt'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <ShieldCheck size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">VAPT &amp; Offensive Security</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">CERT-In Aligned Pentesting</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* ISO 27001 */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('iso-27001');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'iso-27001'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <Award size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">ISO 27001:2022 Certification</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">Turnkey ISMS Audit Pass Guarantee</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* SOC 2 */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('soc-2');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'soc-2'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <FileCheck size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">SOC 2 Type I &amp; II Readiness</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">AICPA Trust Services Criteria</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* Cloud Security */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('cloud-security');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'cloud-security'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <Cloud size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">Cloud &amp; DevSecOps</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">AWS, Azure &amp; GCP Hardening</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* AI Security */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('ai-security');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'ai-security'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <Brain size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">AI Security &amp; LLM Red Teaming</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">OWASP LLM Top 10 Defense</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* DPDP Compliance */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('dpdp-compliance');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'dpdp-compliance'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <Scale size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">DPDP Act 2023 Compliance</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">Statutory Regulatory Readiness</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* Training */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('training');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'training'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <GraduationCap size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">Online IT &amp; Cyber Training</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">Workforce Defense, Labs &amp; Bootcamps</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>

                        {/* Compliance & GRC Hub */}
                        <button
                          onClick={() => {
                            cyberAudio.playClick();
                            setCurrentView('compliance');
                            setIsMobileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer ${
                            currentView === 'compliance'
                              ? isDarkMode ? 'bg-white/[0.12] text-white border border-white/20' : 'bg-neutral-200/80 text-neutral-950 border border-neutral-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center shrink-0">
                            <ShieldCheck size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">Compliance &amp; GRC Hub</div>
                            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">Global Frameworks &amp; Telemetry</div>
                          </div>
                          <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. About Us */}
                <button
                  onClick={() => {
                    cyberAudio.playClick();
                    setCurrentView('about');
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full p-3.5 rounded-2xl text-left flex items-center justify-between transition-colors border cursor-pointer ${
                    currentView === 'about'
                      ? isDarkMode ? 'bg-white/[0.08] text-white font-bold border-white/20' : 'bg-neutral-100 text-neutral-950 font-bold border-neutral-300'
                      : isDarkMode ? 'bg-[#0e1017] hover:bg-white/[0.04] text-neutral-200 border-white/[0.08]' : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 size={18} className={currentView === 'about' ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'} />
                    <span className="text-xs font-bold uppercase tracking-wider">About Us</span>
                  </div>
                  {currentView === 'about' ? (
                    <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
                  ) : (
                    <ChevronRight size={16} className="text-neutral-400 dark:text-neutral-500" />
                  )}
                </button>

                {/* 6. Search & Quick Actions */}
                <button
                  onClick={() => {
                    cyberAudio.playClick();
                    setIsMobileMenuOpen(false);
                    onOpenCommandPalette?.();
                  }}
                  className={`w-full p-3.5 rounded-2xl text-left flex items-center justify-between transition-colors border cursor-pointer ${
                    isDarkMode
                      ? 'bg-[#0e1017] hover:bg-white/[0.04] text-neutral-300 border-white/[0.08]'
                      : 'bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Search size={18} className="text-neutral-700 dark:text-neutral-300" />
                    <span className="text-xs font-semibold">Search Platforms &amp; Actions</span>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400 dark:text-neutral-500" />
                </button>
              </div>

              {/* Sticky Bottom Action Footer */}
              <div className={`p-4 border-t shrink-0 space-y-2.5 ${
                isDarkMode ? 'border-white/[0.08] bg-[#05070d]' : 'border-neutral-200 bg-white'
              }`}>
                <a
                  href="#contact"
                  onClick={(e) => {
                    handleNavClick(e, '#contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3.5 bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 rounded-xl text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer"
                >
                  <span>Contact</span>
                  <ArrowRight size={15} />
                </a>
                <div className="flex items-center justify-between gap-2 text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                  <span>CYBRAVIONS SOLUTIONS PVT LTD</span>
                  <a
                    href="https://www.linkedin.com/company/cybravion-solutions-pvt-ltd/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    <Linkedin size={12} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
};



// --- Services Matrix ---

interface ServicesProps {
  onOpenConsultation?: () => void;
  setCurrentView?: (view: any) => void;
  isDarkMode?: boolean;
}

const Services: React.FC<ServicesProps> = ({ onOpenConsultation, setCurrentView, isDarkMode = true }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [layoutMode, setLayoutMode] = useState<'honeycomb' | 'grid'>('honeycomb');

  const handleServiceClick = (route: string) => {
    cyberAudio.playClick();
    if (setCurrentView) {
      setCurrentView(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const expertises = [
    {
      title: "Cybersecurity Consultancy",
      route: "cybersecurity-consultancy",
      tag: "CONSULTANCY",
      subtitle: "GRC, TPRM, SCRM, VAPT, WAPT & Threat Modelling",
      desc: "Governance, Risk and Compliance (GRC), Third-Party Risk Management (TPRM), Supply Chain Risk Management (SCRM), Vulnerability Assessment and Penetration Testing (VAPT), Web Application Penetration Testing (WAPT), secure network architecture reviews, and threat modelling.",
      icon: ShieldCheck,
      glow: "blue" as const,
      image: "/images/services/grc.jpg",
      standards: ["ISO 27001 ISMS", "DPDP Act 2023", "TPRM & SCRM", "OWASP WAPT", "STRIDE Threat Modeling"],
      whatWeDo: [
        "Governance, Risk & Compliance (GRC) framework architecture, ISMS development, and regulatory audits",
        "Third-Party Risk Management (TPRM) and Supply Chain Risk Management (SCRM) vendor tiering",
        "Full-scope Vulnerability Assessment and Penetration Testing (VAPT & WAPT) across Web, APIs & networks",
        "Secure network architecture reviews, perimeter defense validation, and adversarial threat modelling"
      ]
    },
    {
      title: "IT & Cyber Solutions",
      route: "it-cyber-solutions",
      tag: "SOLUTIONS",
      subtitle: "AI/ML SOC Alert Triage & GRC Automation",
      desc: "Design and development of IT and cybersecurity solutions like AI/ML-driven tools for SOC alert triage, GRC automation, and customized security software.",
      icon: Brain,
      glow: "purple" as const,
      image: "/images/services/ai-security.jpg",
      standards: ["AI/ML SOC Triage", "GRC Automation", "SOAR Orchestration", "Microservice Security"],
      whatWeDo: [
        "Design and deployment of AI/ML-powered SOC alert triage and false-positive suppression engines",
        "End-to-end GRC workflow automation eliminating manual spreadsheets and policy drift",
        "Custom secure enterprise application engineering and microservices isolation",
        "Automated incident correlation, playbooks orchestration, and real-time posture reporting"
      ]
    },
    {
      title: "Cloud Deployment",
      route: "cloud-hosting",
      tag: "DEPLOYMENT",
      subtitle: "Enterprise Applications & Cloud Architecture",
      desc: "Deployment and orchestration solutions for business applications and websites through suitable infrastructure partnerships, zero-trust cloud isolation, and high-availability architecture.",
      icon: Cloud,
      glow: "blue" as const,
      image: "/images/services/cloud-sec.jpg",
      standards: ["Multi-Cloud Orchestration", "CI/CD & DevOps", "Zero-Trust Mesh", "Automated DR & Scaling"],
      whatWeDo: [
        "Enterprise cloud deployment architectures for mission-critical web applications and corporate websites",
        "Strategic infrastructure partnerships delivering high-availability SLA and geo-redundancy",
        "DDoS protection, automated Web Application Firewall (WAF) gating, and SSL/TLS management",
        "Cloud security posture monitoring, automated backups, and disaster recovery orchestration"
      ]
    },
    {
      title: "Online IT & Cyber Training",
      route: "training",
      tag: "TRAINING",
      subtitle: "Workforce Awareness & Technical Capabilities",
      desc: "Helping individuals and organisations strengthen their IT knowledge, cybersecurity awareness, and technical capabilities through interactive simulated labs.",
      icon: GraduationCap,
      glow: "purple" as const,
      image: "/images/services/training.jpg",
      standards: ["Interactive Cyber Labs", "Phishing Simulation", "Technical Bootcamps", "Executive Crisis Training"],
      whatWeDo: [
        "Comprehensive workforce cybersecurity awareness training and live phishing resilience drills",
        "Hands-on offensive and defensive technical bootcamps for engineering and IT teams",
        "Specialized curricula covering cloud security, secure coding practices, and DevSecOps",
        "Executive leadership and board-level cyber crisis simulation exercises"
      ]
    },
    {
      title: "Digital Marketing",
      route: "digital-marketing",
      tag: "MARKETING",
      subtitle: "Digital Presence, Visibility & Promotion",
      desc: "Helping businesses enhance their digital presence, improve online visibility, and promote their products and services to drive sustainable market growth.",
      icon: Sparkles,
      glow: "blue" as const,
      image: "/images/services/digital-marketing.jpg",
      standards: ["Technical SEO", "B2B Brand Strategy", "Conversion Optimization", "Omnichannel Growth"],
      whatWeDo: [
        "Comprehensive digital presence architecture, brand positioning, and corporate narrative engineering",
        "Technical search engine optimization (SEO) and web performance enhancement",
        "Strategic B2B and B2G product promotion and audience acquisition campaigns",
        "Data-driven marketing analytics, conversion rate optimization (CRO), and measurable ROI tracking"
      ]
    }
  ];

  const filterCategories = [
    { id: 'ALL', label: 'All Services (5)' },
    { id: 'CONSULTANCY', label: 'Consultancy' },
    { id: 'SOLUTIONS', label: 'IT & Solutions' },
    { id: 'DEPLOYMENT', label: 'Cloud Deployment' },
    { id: 'TRAINING', label: 'Online Training' },
    { id: 'MARKETING', label: 'Digital Marketing' }
  ];

  const displayedCards = selectedFilter === 'ALL'
    ? expertises.map((s, idx) => ({ ...s, originalIdx: idx }))
    : expertises
        .map((s, idx) => ({ ...s, originalIdx: idx }))
        .filter((s) => s.tag === selectedFilter);

  return (
    <section id="services" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-neutral-500 dark:text-neutral-400">
              Our Key Service Areas
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-white tracking-tight">
            Research, Innovation &amp; Practical Solutions.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-4 font-normal leading-relaxed max-w-3xl mx-auto">
            Are you looking for a growth-focused research-oriented cybersecurity and technology partner for your B2B or B2G requirements?
            At <strong className="text-neutral-900 dark:text-white">CYBRAVION Solutions Pvt Ltd</strong>, we bring together cybersecurity, IT solutions, online training, and digital marketing to help organizations strengthen &amp; secure digital foundations, build capabilities, and expand their online presence.
          </p>
        </div>

        {/* Interactive Controls: Category Filter & Layout Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] overflow-x-auto max-w-full">
            {filterCategories.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setSelectedFilter(filter.id);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === filter.id
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Layout Mode Pill Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] shrink-0">
            <button
              onClick={() => {
                cyberAudio.playClick();
                setLayoutMode('honeycomb');
              }}
              title="Honeycomb Cluster Layout"
              aria-label="Honeycomb Cluster Layout"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                layoutMode === 'honeycomb'
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Hexagon size={13} aria-hidden={true} />
              <span className="hidden sm:inline">Honeycomb</span>
            </button>
            <button
              onClick={() => {
                cyberAudio.playClick();
                setLayoutMode('grid');
              }}
              title="Matrix Grid Layout"
              aria-label="Matrix Grid Layout"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                layoutMode === 'grid'
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid size={13} aria-hidden={true} />
              <span className="hidden sm:inline">Matrix</span>
            </button>
          </div>
        </div>

        {/* Polygon Cards Presentation */}
        {layoutMode === 'honeycomb' && selectedFilter === 'ALL' ? (
          /* Honeycomb Cluster Matching Image 1 (Row 1: 3 hexagons, Row 2: 2 hexagons nestled) */
          <div className="flex flex-col items-center w-full">
            {/* Top Row: 3 Hexagons */}
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 z-10 w-full max-w-6xl">
              {displayedCards.slice(0, 3).map((service) => (
                <PolygonHexCard
                  key={service.title}
                  title={service.title}
                  tag={service.tag}
                  subtitle={service.subtitle}
                  desc={service.desc}
                  icon={service.icon}
                  image={service.image}
                  actionLabel=">"
                  onAction={() => handleServiceClick(service.route)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>

            {/* Bottom Row: 2 Hexagons nestled into the valleys of Row 1 */}
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:-mt-16 z-20 w-full max-w-4xl">
              {displayedCards.slice(3, 5).map((service) => (
                <PolygonHexCard
                  key={service.title}
                  title={service.title}
                  tag={service.tag}
                  subtitle={service.subtitle}
                  desc={service.desc}
                  icon={service.icon}
                  image={service.image}
                  actionLabel=">"
                  onAction={() => handleServiceClick(service.route)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Responsive Matrix Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
            {displayedCards.map((service) => (
              <PolygonHexCard
                key={service.title}
                title={service.title}
                tag={service.tag}
                subtitle={service.subtitle}
                desc={service.desc}
                icon={service.icon}
                image={service.image}
                actionLabel=">"
                onAction={() => handleServiceClick(service.route)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        )}
      </div>
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
                <Services onOpenConsultation={() => setIsAuditModalOpen(true)} setCurrentView={setCurrentView} isDarkMode={isDarkMode} />

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
