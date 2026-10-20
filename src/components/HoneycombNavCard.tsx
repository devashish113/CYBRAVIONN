import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

export interface HoneycombNavCardProps {
  title: string;
  tag: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  isActive: boolean;
  onClick: () => void;
  isDarkMode: boolean;
  className?: string;
  colSpan?: 1 | 2;
  actionText?: string;
}

export const HoneycombNavCard: React.FC<HoneycombNavCardProps> = ({
  title,
  tag,
  desc,
  icon: Icon,
  isActive,
  onClick,
  isDarkMode,
  className = '',
  colSpan = 1,
  actionText,
}) => {
  // Chamfered cyber-hexagonal polygon for card body
  const cyberHexClip = 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)';

  // Pointy-topped hexagon polygon for icon chamber
  const hexPolygonClip = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

  // Chamfered mini badge clip
  const badgeClip = 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)';

  return (
    <button
      type="button"
      onClick={() => {
        cyberAudio.playClick();
        onClick();
      }}
      onMouseEnter={() => cyberAudio.playHover()}
      style={{ clipPath: cyberHexClip }}
      className={`relative text-left p-3.5 transition-all duration-200 group cursor-pointer flex items-start gap-3.5 border overflow-hidden ${
        colSpan === 2 ? 'col-span-2' : ''
      } ${
        isActive
          ? isDarkMode
            ? 'bg-[#182236] border-cyan-400/50 shadow-[0_4px_22px_rgba(6,182,212,0.22)]'
            : 'bg-slate-100 border-cyan-600/50 shadow-md'
          : isDarkMode
            ? 'bg-[#121826]/85 hover:bg-[#182236] border-white/[0.08] hover:border-cyan-400/35 shadow-[0_2px_10px_rgba(0,0,0,0.45)] hover:shadow-[0_12px_28px_-6px_rgba(6,182,212,0.18)] hover:-translate-y-0.5'
            : 'bg-slate-50/75 hover:bg-white border-slate-200/70 hover:border-cyan-600/40 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_-6px_rgba(6,182,212,0.12)] hover:-translate-y-0.5'
      } ${className}`}
    >
      {/* Subtle Background Honeycomb Wireframe Motif */}
      <svg
        className="absolute right-0 bottom-0 w-32 h-32 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.14] dark:group-hover:opacity-[0.18] transition-opacity duration-300 pointer-events-none text-cyan-500 dark:text-cyan-400"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <polygon points="60,10 100,32.5 100,77.5 60,100 20,77.5 20,32.5" />
        <polygon points="60,25 90,42 90,75 60,92 30,75 30,42" strokeDasharray="3 3" />
        <circle cx="60" cy="55" r="3.5" fill="currentColor" opacity="0.6" />
      </svg>

      {/* Hexagonal Honeycomb Icon Chamber */}
      <div 
        style={{ clipPath: hexPolygonClip }}
        className={`w-11 h-11 shrink-0 p-[2px] transition-all duration-300 group-hover:scale-105 ${
          isDarkMode
            ? 'bg-gradient-to-b from-cyan-400/50 via-blue-500/25 to-purple-500/35 group-hover:from-cyan-300 group-hover:to-blue-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
            : 'bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 group-hover:from-slate-800 group-hover:to-slate-950'
        }`}
      >
        <div 
          style={{ clipPath: hexPolygonClip }}
          className={`w-full h-full flex items-center justify-center transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-[#0d1322] text-slate-200 group-hover:bg-[#131d33] group-hover:text-cyan-300' 
              : 'bg-white text-slate-800 group-hover:bg-slate-900 group-hover:text-white'
          }`}
        >
          <Icon size={19} aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
        </div>
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0 z-10">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors text-shadow-subtle">
            {title}
          </span>
          <span 
            style={{ clipPath: badgeClip }}
            className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 transition-colors shrink-0 text-shadow-subtle ${
              isDarkMode
                ? 'bg-white/[0.08] text-slate-300 border border-white/10 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 group-hover:border-cyan-500/40'
                : 'bg-slate-200/80 text-slate-700 border border-slate-300 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900'
            }`}
          >
            {tag}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-snug line-clamp-2">
          {desc}
        </p>
      </div>

      {/* Right Indicator */}
      {actionText ? (
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white shrink-0 group-hover:translate-x-1 transition-transform self-center">
          <span className="hidden sm:inline text-cyan-600 dark:text-cyan-400 font-mono text-[11px] uppercase tracking-wider">{actionText}</span>
          <ArrowRight size={14} className="text-cyan-600 dark:text-cyan-400" />
        </div>
      ) : (
        <ChevronRight size={14} className="text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-2 z-10" />
      )}
    </button>
  );
};
