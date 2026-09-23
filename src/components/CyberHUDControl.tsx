import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Shield, ArrowUp, Activity } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface CyberHUDControlProps {
  isDarkMode: boolean;
  onOpenAuditModal?: () => void;
}

export const CyberHUDControl: React.FC<CyberHUDControlProps> = ({ isDarkMode, onOpenAuditModal }) => {
  const [isMuted, setIsMuted] = useState(cyberAudio.getMuted());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const next = cyberAudio.toggleMute();
    setIsMuted(next);
  };

  const scrollToTop = () => {
    cyberAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Cyber Defense HUD & Controls" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto select-none">
      
      {/* HUD Floating Speed Control Bar */}
      <div className={`p-1.5 rounded-2xl backdrop-blur-2xl border transition-all duration-300 shadow-2xl flex items-center gap-2 ${
        isDarkMode
          ? 'bg-black/85 border-stone-800/90 shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
          : 'bg-white/90 border-slate-200 shadow-[0_10px_35px_rgba(0,0,0,0.12)]'
      }`}>
        
        {/* Live Defense Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono font-medium text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <Activity size={13} className="text-blue-400" />
          <span>99.999% SOVEREIGN</span>
        </div>

        {/* Audio Toggle Button */}
        <button
          onClick={handleToggleAudio}
          aria-label={isMuted ? "Enable Cyber Sound Effects" : "Mute Cyber Sound Effects"}
          className={`p-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer text-xs font-mono font-semibold ${
            !isMuted 
              ? 'bg-gradient-to-r from-blue-600/20 to-orange-500/20 text-orange-400 border border-orange-500/30' 
              : 'text-stone-400 hover:text-stone-200 hover:bg-white/5 border border-transparent'
          }`}
          title={isMuted ? "Unmute Cyber SFX" : "Mute Cyber SFX"}
        >
          {!isMuted ? (
            <>
              <Volume2 size={16} className="text-orange-400" />
              <div className="hidden md:flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-orange-400 animate-pulse" />
                <span className="w-0.5 h-2 bg-orange-400 animate-pulse" style={{ animationDelay: '100ms' }} />
                <span className="w-0.5 h-3.5 bg-orange-400 animate-pulse" style={{ animationDelay: '200ms' }} />
              </div>
            </>
          ) : (
            <VolumeX size={16} />
          )}
        </button>

        {/* Instant Audit Scan Launcher */}
        {onOpenAuditModal && (
          <button
            onClick={() => {
              cyberAudio.playShieldActivate();
              onOpenAuditModal();
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Shield size={14} />
            <span className="hidden sm:inline">Instant Audit</span>
          </button>
        )}

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-stone-900/90 text-stone-300 hover:text-white border-stone-800 hover:border-orange-500/50'
                  : 'bg-white text-slate-700 hover:text-slate-950 border-slate-200 hover:border-orange-500/50'
              }`}
            >
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </aside>
  );
};
