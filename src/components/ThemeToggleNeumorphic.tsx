import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeToggleNeumorphicProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Sun Icon crafted to match the reference neumorphic knob design:
 * Clean circle with 8 radial rays in subtle matte slate.
 */
const SunKnobIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-slate-500' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4.25" />
    <path d="M12 2.5v2.2" />
    <path d="M12 19.3v2.2" />
    <path d="M2.5 12h2.2" />
    <path d="M19.3 12h2.2" />
    <path d="M5.3 5.3l1.6 1.6" />
    <path d="M17.1 17.1l1.6 1.6" />
    <path d="M5.3 18.7l1.6-1.6" />
    <path d="M17.1 6.9l1.6-1.6" />
  </svg>
);

/**
 * Moon Icon with twin micro-stars crafted to match the reference neumorphic knob design:
 * Crescent moon on the left with two 4-point sparkle stars in the upper-right hollow.
 */
const MoonStarKnobIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-slate-500' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Crescent Moon */}
    <path d="M14.2 3.8A8.2 8.2 0 1 0 18.8 15a7.2 7.2 0 0 1-4.6-11.2Z" />
    {/* Primary 4-pointed micro sparkle star */}
    <path
      d="M17 4.2L17.6 5.8L19.2 6.4L17.6 7L17 8.6L16.4 7L14.8 6.4L16.4 5.8Z"
      fill="currentColor"
      stroke="none"
    />
    {/* Secondary micro sparkle star */}
    <path
      d="M19.8 9.5L20.2 10.5L21.2 10.9L20.2 11.3L19.8 12.3L19.4 11.3L18.4 10.9L19.4 10.5Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

export const ThemeToggleNeumorphic: React.FC<ThemeToggleNeumorphicProps> = ({
  isDarkMode,
  toggleDarkMode,
  className = '',
  size = 'md',
}) => {
  // Balanced dimensions matching header controls
  const config = {
    sm: {
      track: 'w-[96px] h-[36px] p-[3px]',
      thumb: 'w-[30px] h-[30px]',
      fontSize: 'text-[9px]',
      travelX: 60,
      iconSize: 'w-4 h-4',
      textWidth: 'w-[52px]',
    },
    md: {
      track: 'w-[106px] h-[42px] xl:h-[44px] p-[3.5px]',
      thumb: 'w-[35px] h-[35px] xl:w-[37px] xl:h-[37px]',
      fontSize: 'text-[9.5px] xl:text-[10px]',
      travelX: 64,
      iconSize: 'w-4.5 h-4.5',
      textWidth: 'w-[56px]',
    },
    lg: {
      track: 'w-[120px] h-[46px] p-[4px]',
      thumb: 'w-[38px] h-[38px]',
      fontSize: 'text-[10.5px]',
      travelX: 74,
      iconSize: 'w-5 h-5',
      textWidth: 'w-[64px]',
    },
  }[size];

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={isDarkMode}
      aria-label={isDarkMode ? 'Dark mode enabled. Click for light mode' : 'Light mode enabled. Click for dark mode'}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      onClick={toggleDarkMode}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`relative inline-flex items-center rounded-full select-none cursor-pointer transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${config.track} ${
        isDarkMode
          ? 'bg-[#18181b] border border-white/[0.08]'
          : 'bg-[#e3e8f0] border border-black/[0.06]'
      } ${className}`}
      style={{
        boxShadow: isDarkMode
          ? 'inset 3px 3.5px 8px rgba(0, 0, 0, 0.75), inset -2px -2px 5px rgba(255, 255, 255, 0.08)'
          : 'inset 3px 3.5px 7px rgba(140, 155, 178, 0.45), inset -3px -3px 7px rgba(255, 255, 255, 0.95)',
      }}
    >
      {/* LIGHT Label on the left (visible when Light Mode is active) */}
      <div
        className={`absolute left-2.5 top-0 bottom-0 ${config.textWidth} flex items-center justify-center font-bold tracking-wider uppercase pointer-events-none transition-opacity duration-200 ${
          config.fontSize
        } ${
          !isDarkMode ? 'opacity-100 text-[#4c586b]' : 'opacity-0 text-transparent'
        }`}
        style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      >
        <span className="leading-none">LIGHT</span>
      </div>

      {/* DARK Label on the right (visible when Dark Mode is active) */}
      <div
        className={`absolute right-2.5 top-0 bottom-0 ${config.textWidth} flex items-center justify-center font-bold tracking-wider uppercase pointer-events-none transition-opacity duration-200 ${
          config.fontSize
        } ${
          isDarkMode ? 'opacity-100 text-[#a1a1aa]' : 'opacity-0 text-transparent'
        }`}
        style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      >
        <span className="leading-none">DARK</span>
      </div>

      {/* Raised Embossed Convex Thumb */}
      <motion.div
        animate={{
          x: isDarkMode ? 0 : config.travelX,
        }}
        transition={{
          type: 'spring',
          stiffness: 480,
          damping: 34,
          mass: 0.75,
        }}
        className={`relative z-10 flex items-center justify-center rounded-full shrink-0 transition-colors duration-200 ${
          config.thumb
        } ${
          isDarkMode ? 'bg-[#27272a] text-white' : 'bg-[#ffffff] text-slate-600'
        }`}
        style={{
          boxShadow: isDarkMode
            ? '2px 2px 7px rgba(0, 0, 0, 0.55), -1px -1px 3px rgba(255, 255, 255, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.95)'
            : '2.5px 3px 6px rgba(140, 155, 175, 0.42), -2px -2px 5px rgba(255, 255, 255, 0.98), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDarkMode ? (
            <motion.div
              key="dark-moon"
              initial={{ rotate: -70, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 70, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <MoonStarKnobIcon className={`${config.iconSize} text-slate-500`} />
            </motion.div>
          ) : (
            <motion.div
              key="light-sun"
              initial={{ rotate: 70, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -70, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <SunKnobIcon className={`${config.iconSize} text-slate-500`} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggleNeumorphic;
