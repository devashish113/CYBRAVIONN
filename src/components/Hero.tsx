import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  ChevronDown 
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface HeroProps {
  isDarkMode: boolean;
  onOpenBriefing: () => void;
  onExploreCapabilities?: () => void;
  setCurrentView?: (view: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  isDarkMode, 
  onOpenBriefing,
  onExploreCapabilities
}) => {
  const handleScrollToServices = () => {
    cyberAudio.playClick();
    if (onExploreCapabilities) {
      onExploreCapabilities();
      return;
    }
    const el = document.querySelector('#services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#services';
    }
  };

  return (
    <section className="relative min-h-[86vh] lg:min-h-[88vh] flex flex-col justify-center items-center overflow-hidden bg-transparent pt-28 md:pt-36 pb-16 select-none">
      {/* Subtle Ambient Radial Nebulae */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[480px] rounded-full blur-[170px] opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: isDarkMode ? '#1d4ed8' : '#38bdf8' }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-[400px] h-[350px] rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{ backgroundColor: isDarkMode ? '#f97316' : '#fdba74' }}
      />

      {/* Cyber Grid Background lines */}
      <div 
        className="absolute inset-0 -z-10 opacity-20 dark:opacity-10 pointer-events-none bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000_60%,transparent_90%)]"
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(rgba(37, 99, 235, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.12) 1px, transparent 1px)'
            : 'linear-gradient(rgba(2, 132, 199, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 132, 199, 0.08) 1px, transparent 1px)'
        }}
      />

      {/* Main Focused Hero Content Container */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 max-w-5xl mx-auto flex flex-col justify-center items-center text-center">
        
        {/* Verification & Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono font-semibold border border-blue-500/30 dark:border-blue-500/40 bg-gradient-to-r from-blue-500/10 via-sky-500/5 to-orange-500/10 mb-8 shadow-[0_0_25px_rgba(37,99,235,0.15)] backdrop-blur-md"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </span>
          <span className="text-slate-800 dark:text-stone-200">
            Enterprise Zero-Trust &amp; Sovereign AI Security
          </span>
          <span className="text-stone-400 dark:text-stone-600">|</span>
          <span className="text-orange-600 dark:text-orange-400 font-bold">CIN: U62099DL2026PTC470901</span>
        </motion.div>

        {/* Strong Focused Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 dark:text-white mb-6 tracking-tight max-w-4xl"
        >
          Sovereign Cybersecurity &amp; AI Defense for <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-orange-500 dark:from-sky-400 dark:via-blue-400 dark:to-orange-500 bg-clip-text text-transparent drop-shadow-sm">Global Enterprises</span>
        </motion.h1>

        {/* 1 Short Supporting Sentence */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-stone-300 mb-10 max-w-2xl font-normal leading-relaxed"
        >
          CYBRAVION delivers air-gapped sovereign AI defense, offensive red-teaming, and continuous zero-trust governance for mission-critical institutions.
        </motion.p>

        {/* Action CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
        >
          {/* Primary CTA: Request Security Briefing */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              cyberAudio.playClick();
              onOpenBriefing();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.18em] font-bold transition-all flex items-center justify-center gap-3 cursor-pointer text-white shadow-xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 hover:from-blue-500 hover:to-orange-400 shadow-blue-500/20 hover:shadow-orange-500/30"
          >
            <ShieldCheck size={18} />
            <span>Request Security Briefing</span>
            <ArrowRight size={16} />
          </motion.button>

          {/* Secondary CTA: Explore Security Capabilities */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleScrollToServices}
            className={`w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border shadow-sm ${
              isDarkMode 
                ? 'bg-stone-900/80 hover:bg-stone-800 text-stone-200 border-stone-800 hover:border-blue-500/40' 
                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-blue-500/40'
            }`}
          >
            <span>Explore Security Capabilities</span>
            <ChevronDown size={16} className="text-blue-500 animate-bounce" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
