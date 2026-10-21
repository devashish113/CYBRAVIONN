import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Play
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { SovereignMotif } from './SovereignMotif';

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
    cyberAudio.playClick();
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
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-center items-center overflow-hidden bg-transparent pt-28 sm:pt-36 lg:pt-36 pb-14">
      
      {/* Precision Minimal Grid Lines */}
      <div 
        className="absolute inset-0 -z-10 opacity-20 dark:opacity-10 pointer-events-none bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_50%,transparent_85%)]"
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)'
            : 'linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)'
        }}
      />

      {/* Clean Subtle Neutral Backlight */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div 
          className="w-full max-w-5xl h-[500px] rounded-full blur-3xl opacity-30 dark:opacity-10"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.02) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.015) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Main Asymmetric 2-Column Hero Row */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Authority Editorial Typography & Side-by-Side CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
            
            {/* 1. Sovereign Flourish & Hairline Kicker (Modeled directly after reference ss2) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-start gap-2.5 mb-5 sm:mb-6 w-fit"
            >
              {/* Symmetrical Ornamental Flourish Motif */}
              <div className="w-full flex justify-center text-amber-600 dark:text-amber-400">
                <SovereignMotif className="w-auto h-5 sm:h-6 object-contain" />
              </div>

              {/* Hairline Radial Divider with Kicker Quote */}
              <div className="w-full flex flex-col items-center gap-1.5 sm:gap-2">
                <div 
                  className="w-full h-px" 
                  style={{ 
                    background: isDarkMode 
                      ? 'radial-gradient(circle, rgba(245, 158, 11, 0.75) 0%, transparent 100%)' 
                      : 'radial-gradient(circle, rgba(217, 119, 6, 0.65) 0%, transparent 100%)' 
                  }} 
                  aria-hidden="true" 
                />
                <p className="px-6 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-700 dark:text-amber-400 text-center text-shadow-glow-amber whitespace-nowrap">
                  Redefining Cyber Consciousness
                </p>
                <div 
                  className="w-full h-px" 
                  style={{ 
                    background: isDarkMode 
                      ? 'radial-gradient(circle, rgba(245, 158, 11, 0.75) 0%, transparent 100%)' 
                      : 'radial-gradient(circle, rgba(217, 119, 6, 0.65) 0%, transparent 100%)' 
                  }} 
                  aria-hidden="true" 
                />
              </div>
            </motion.div>

            {/* 2. Authoritative Editorial Display Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="font-editorial text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-normal leading-[1.08] text-neutral-900 dark:text-white mb-4 tracking-tight text-shadow-ambient"
            >
              Secure Digital Foundations &amp; <br />
              <span className="italic font-light text-neutral-600 dark:text-neutral-400">
                Innovate, Protect &amp; Grow.
              </span>
            </motion.h1>

            {/* 3. Genuine Enterprise Mission Statement */}
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-6 sm:mb-8 max-w-2xl font-normal leading-relaxed"
            >
              Growth-focused, research-oriented cybersecurity and technology partner for B2B and B2G requirements.
              At <strong className="text-neutral-900 dark:text-white font-semibold">CYBRAVION Solutions Pvt Ltd</strong>, we integrate offensive cybersecurity consultancy, sovereign cloud architectures, zero-downtime deployment, and online capabilities to protect mission-critical operations.
            </motion.p>

            {/* 4. Action Buttons (Side by Side, Matching the Reference Hero Aesthetic) */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {/* Primary CTA: Solid Tactile Pill Button */}
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenBriefing();
                }}
                className="group relative inline-flex items-center justify-center cursor-pointer font-medium rounded-full min-h-[50px] px-8 py-3.5 text-sm text-white active:scale-[0.97] transition-all duration-200 btn-tactile-primary shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  <ShieldCheck size={18} aria-hidden="true" className="text-amber-400" />
                  <span className="font-semibold tracking-wide">Request Security Briefing</span>
                  <ArrowRight size={15} aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>

              {/* Secondary CTA: Round Play/Demo Button Style */}
              <button
                type="button"
                onClick={handleScrollToServices}
                className="group inline-flex items-center gap-3 cursor-pointer text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors py-2"
              >
                <span className="w-11 h-11 rounded-full border border-neutral-300 dark:border-white/20 bg-white dark:bg-white/[0.05] flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:border-amber-500/50 group-active:scale-95 transition-all text-neutral-900 dark:text-white">
                  <Play size={13} className="fill-current ml-0.5 text-neutral-900 dark:text-white" />
                </span>
                <span className="tracking-wide">Explore Capabilities</span>
              </button>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Clean Static 3D Data Center Network Graphic (Fixed, 70% Grayscale, No Glow, No Extra Colors) */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[480px] flex items-center justify-center p-2">
              <picture>
                <source srcSet="/images/futuristic-cloud-network.webp" type="image/webp" />
                <img
                  src="/images/futuristic-cloud-network.webp"
                  alt="CYBRAVION Sovereign Cloud Architecture and Data Center Network"
                  style={{
                    filter: 'grayscale(0.70)'
                  }}
                  className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)] dark:drop-shadow-none"
                  loading="eager"
                  fetchPriority="high"
                  width={700}
                  height={600}
                />
              </picture>
            </div>
          </div>

        </div>
      </div>

      {/* Institutional Compliance & Regulatory Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-20 w-full max-w-4xl mx-auto px-6 pt-10 sm:pt-14 flex flex-col items-center gap-3 text-center"
      >
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 font-semibold text-shadow-subtle">
          Secured Across Enterprises &amp; Critical Infrastructure
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            CERT-In Aligned
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            ISO 27001:2022
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            SOC 2 Type II
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            DPDP Act 2023
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            NIST SP 800-53
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/60 dark:bg-white/[0.03] text-neutral-800 dark:text-neutral-300 text-xs font-mono text-shadow-subtle">
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

    </section>
  );
};

export default Hero;
