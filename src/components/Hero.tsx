import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface HeroProps {
  isDarkMode: boolean;
  onOpenBriefing: () => void;
  onExploreCapabilities?: () => void;
  setCurrentView: (view: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  isDarkMode, 
  onOpenBriefing, 
  onExploreCapabilities,
  setCurrentView: _setCurrentView 
}) => {
  const handleScrollToServices = () => {
    if (onExploreCapabilities) {
      onExploreCapabilities();
      return;
    }
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#services';
    }
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-center items-center overflow-hidden bg-transparent pt-24 sm:pt-36 md:pt-40 pb-16">
      
      {/* Precision Minimal Grid Lines */}
      <div 
        className="absolute inset-0 -z-10 opacity-20 dark:opacity-10 pointer-events-none bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_50%,transparent_85%)]"
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)'
            : 'linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)'
        }}
      />

      {/* Soft Radial Focus Veil — Ensures zero distraction and effortless text readability */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div 
          className="w-full max-w-4xl h-[520px] rounded-full blur-3xl opacity-85"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(ellipse at center, rgba(3, 4, 7, 0.92) 0%, rgba(3, 4, 7, 0.55) 60%, transparent 100%)'
              : 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.55) 60%, transparent 100%)'
          }}
        />
      </div>

      {/* Main Focused Hero Content Container */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 max-w-5xl mx-auto flex flex-col justify-center items-center text-center">

        {/* 1. Sovereign Emblem Motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-center mb-5"
        >
          <div className="relative flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-amber-500 dark:text-amber-400 drop-shadow-sm">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" opacity="0.9" />
              <circle cx="12" cy="12" r="2.8" fill={isDarkMode ? '#08090d' : '#fbfbfd'} />
            </svg>
          </div>
        </motion.div>

        {/* 2. Hairline Radial Divider with Enterprise Platform Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="flex flex-col items-center gap-2 mb-6 sm:mb-8 w-fit mx-auto"
        >
          <div 
            className="w-44 sm:w-64 h-[1px]" 
            style={{ 
              background: isDarkMode 
                ? 'radial-gradient(circle, rgba(245, 158, 11, 0.75) 0%, transparent 100%)' 
                : 'radial-gradient(circle, rgba(217, 119, 6, 0.65) 0%, transparent 100%)' 
            }} 
          />
          <p className="px-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-700 dark:text-amber-400 text-center text-shadow-glow-amber">
            Redefining Cyber Consciousness
          </p>
          <div 
            className="w-44 sm:w-64 h-[1px]" 
            style={{ 
              background: isDarkMode 
                ? 'radial-gradient(circle, rgba(245, 158, 11, 0.75) 0%, transparent 100%)' 
                : 'radial-gradient(circle, rgba(217, 119, 6, 0.65) 0%, transparent 100%)' 
            }} 
          />
        </motion.div>

        {/* 3. Authoritative Editorial Display Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] text-neutral-900 dark:text-white mb-5 sm:mb-6 tracking-tight max-w-4xl text-shadow-ambient"
        >
          Secure Digital Foundations &amp; <br className="hidden sm:inline" />
          <span className="italic font-light text-neutral-600 dark:text-neutral-400">
            Innovate, Protect &amp; Grow.
          </span>
        </motion.h1>

        {/* 4. Genuine Enterprise Mission Statement */}
        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 sm:mb-10 max-w-3xl font-normal leading-relaxed"
        >
          Growth-focused, research-oriented cybersecurity and technology partner for B2B and B2G requirements.
          At <strong>CYBRAVION Solutions Pvt Ltd</strong>, we integrate cybersecurity consultancy, IT solutions, online training, and digital marketing to help organizations secure digital assets, build technical capabilities, and expand their online presence.
        </motion.p>

        {/* 5. Sarvam-Grade Tactile Pill Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-5 mb-14 sm:mb-16"
        >
          {/* Primary CTA: Tactile Inset Button */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onOpenBriefing();
            }}
            className="group relative inline-flex items-center justify-center cursor-pointer font-medium rounded-full min-h-[48px] px-8 py-3 text-sm text-white active:scale-[0.97] transition-all duration-200 btn-tactile-primary"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <ShieldCheck size={18} aria-hidden="true" className="text-amber-400" />
              <span className="font-semibold tracking-wide">Request Security Briefing</span>
              <ArrowRight size={15} aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>

          {/* Secondary CTA: Tactile Outline Button */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              handleScrollToServices();
            }}
            className="group relative inline-flex items-center justify-center cursor-pointer font-medium rounded-full min-h-[48px] px-8 py-3 text-sm active:scale-[0.97] transition-all duration-200 btn-tactile-outline"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="tracking-wide">Explore Security Capabilities</span>
              <ChevronDown size={15} aria-hidden="true" className="text-neutral-500 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* 6. Institutional Compliance & Regulatory Trust Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="w-full max-w-4xl pt-8 border-t border-neutral-200 dark:border-white/[0.08] flex flex-col items-center gap-4 text-center"
        >
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 font-semibold text-shadow-subtle">
            Secured Across Enterprises &amp; Critical Infrastructure
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              CERT-In Aligned
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              ISO 27001:2022
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              SOC 2 Type II
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              DPDP Act 2023
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              NIST SP 800-53
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              100% Air-Gapped
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 dark:text-neutral-500 font-mono mt-1">
            <span>MCA REG. CIN: U62099DL2026PTC470901</span>
            <span>•</span>
            <span>NEW DELHI</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
