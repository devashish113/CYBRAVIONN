import React, { useRef, useState, useCallback, MouseEvent } from 'react';
import { ChevronRight } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export type PolygonGlowColor = 'blue' | 'orange' | 'purple' | 'cyan';

export interface PolygonHexCardProps {
  title: string;
  tag: string;
  subtitle?: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  image: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  isDarkMode?: boolean;
  glowColor?: PolygonGlowColor;
}

export const PolygonHexCard: React.FC<PolygonHexCardProps> = ({
  title,
  tag,
  subtitle,
  desc,
  icon: Icon,
  image,
  actionLabel = '>',
  onAction,
  className = '',
  isDarkMode = true,
  glowColor = 'blue',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const lastRippleTime = useRef<number>(0);

  // Thematic brand color palettes strictly harmonized with Cybravions design system
  const themePalette = {
    blue: {
      borderDarkBase: 'rgba(59, 130, 246, 0.28)',
      borderDarkHover: 'rgba(59, 130, 246, 0.95)',
      borderLightBase: 'rgba(37, 99, 235, 0.22)',
      borderLightHover: 'rgba(37, 99, 235, 0.90)',
      dropShadowDark: 'drop-shadow(0 14px 28px rgba(37, 99, 235, 0.35))',
      dropShadowLight: 'drop-shadow(0 12px 22px rgba(37, 99, 235, 0.16))',
      ambientGlowDark: 'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.20) 0%, transparent 72%)',
      ambientGlowLight: 'radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 72%)',
      chamberDark: 'bg-blue-500/15 border-blue-500/40 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]',
      chamberLight: 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm',
      tagDark: 'border-blue-500/40 bg-blue-500/15 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
      tagLight: 'border-blue-300 bg-blue-50 text-blue-700',
      titleHoverDark: 'group-hover:text-blue-400',
      titleHoverLight: 'group-hover:text-blue-600',
      btnDark: 'bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-white border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_18px_rgba(59,130,246,0.5)]',
      btnLight: 'bg-slate-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-slate-800 hover:text-white border-slate-300 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/30',
      rippleDark: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)',
      rippleLight: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.05) 45%, transparent 70%)',
      cursorGlareDark: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)',
      cursorGlareLight: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 65%)',
    },
    orange: {
      borderDarkBase: 'rgba(249, 115, 22, 0.28)',
      borderDarkHover: 'rgba(249, 115, 22, 0.95)',
      borderLightBase: 'rgba(234, 88, 12, 0.22)',
      borderLightHover: 'rgba(234, 88, 12, 0.90)',
      dropShadowDark: 'drop-shadow(0 14px 28px rgba(249, 115, 22, 0.35))',
      dropShadowLight: 'drop-shadow(0 12px 22px rgba(249, 115, 22, 0.16))',
      ambientGlowDark: 'radial-gradient(circle at 50% 20%, rgba(249, 115, 22, 0.20) 0%, transparent 72%)',
      ambientGlowLight: 'radial-gradient(circle at 50% 20%, rgba(249, 115, 22, 0.08) 0%, transparent 72%)',
      chamberDark: 'bg-orange-500/15 border-orange-500/40 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]',
      chamberLight: 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm',
      tagDark: 'border-orange-500/40 bg-orange-500/15 text-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.2)]',
      tagLight: 'border-orange-300 bg-orange-50 text-orange-700',
      titleHoverDark: 'group-hover:text-orange-400',
      titleHoverLight: 'group-hover:text-orange-600',
      btnDark: 'bg-white/10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-600 text-white border-white/20 hover:border-orange-400/50 hover:shadow-[0_0_18px_rgba(249,115,22,0.5)]',
      btnLight: 'bg-slate-100 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-600 text-slate-800 hover:text-white border-slate-300 hover:border-orange-500 hover:shadow-md hover:shadow-orange-500/30',
      rippleDark: 'radial-gradient(circle, rgba(249,115,22,0.35) 0%, rgba(249,115,22,0.08) 45%, transparent 70%)',
      rippleLight: 'radial-gradient(circle, rgba(234,88,12,0.22) 0%, rgba(234,88,12,0.05) 45%, transparent 70%)',
      cursorGlareDark: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 65%)',
      cursorGlareLight: 'radial-gradient(circle, rgba(234,88,12,0.09) 0%, transparent 65%)',
    },
    purple: {
      borderDarkBase: 'rgba(139, 92, 246, 0.28)',
      borderDarkHover: 'rgba(139, 92, 246, 0.95)',
      borderLightBase: 'rgba(124, 58, 237, 0.22)',
      borderLightHover: 'rgba(124, 58, 237, 0.90)',
      dropShadowDark: 'drop-shadow(0 14px 28px rgba(139, 92, 246, 0.35))',
      dropShadowLight: 'drop-shadow(0 12px 22px rgba(139, 92, 246, 0.16))',
      ambientGlowDark: 'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.20) 0%, transparent 72%)',
      ambientGlowLight: 'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 72%)',
      chamberDark: 'bg-purple-500/15 border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]',
      chamberLight: 'bg-purple-50 border-purple-200 text-purple-600 shadow-sm',
      tagDark: 'border-purple-500/40 bg-purple-500/15 text-purple-300 shadow-[0_0_10px_rgba(139,92,246,0.2)]',
      tagLight: 'border-purple-300 bg-purple-50 text-purple-700',
      titleHoverDark: 'group-hover:text-purple-400',
      titleHoverLight: 'group-hover:text-purple-600',
      btnDark: 'bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-white border-white/20 hover:border-purple-400/50 hover:shadow-[0_0_18px_rgba(139,92,246,0.5)]',
      btnLight: 'bg-slate-100 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-slate-800 hover:text-white border-slate-300 hover:border-purple-500 hover:shadow-md hover:shadow-purple-500/30',
      rippleDark: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)',
      rippleLight: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0.05) 45%, transparent 70%)',
      cursorGlareDark: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)',
      cursorGlareLight: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 65%)',
    },
    cyan: {
      borderDarkBase: 'rgba(6, 182, 212, 0.28)',
      borderDarkHover: 'rgba(6, 182, 212, 0.95)',
      borderLightBase: 'rgba(8, 145, 178, 0.22)',
      borderLightHover: 'rgba(8, 145, 178, 0.90)',
      dropShadowDark: 'drop-shadow(0 14px 28px rgba(6, 182, 212, 0.35))',
      dropShadowLight: 'drop-shadow(0 12px 22px rgba(6, 182, 212, 0.16))',
      ambientGlowDark: 'radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.20) 0%, transparent 72%)',
      ambientGlowLight: 'radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 72%)',
      chamberDark: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]',
      chamberLight: 'bg-cyan-50 border-cyan-200 text-cyan-600 shadow-sm',
      tagDark: 'border-cyan-500/40 bg-cyan-500/15 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]',
      tagLight: 'border-cyan-300 bg-cyan-50 text-cyan-700',
      titleHoverDark: 'group-hover:text-cyan-400',
      titleHoverLight: 'group-hover:text-cyan-600',
      btnDark: 'bg-white/10 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 text-white border-white/20 hover:border-cyan-400/50 hover:shadow-[0_0_18px_rgba(6,182,212,0.5)]',
      btnLight: 'bg-slate-100 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 text-slate-800 hover:text-white border-slate-300 hover:border-cyan-500 hover:shadow-md hover:shadow-cyan-500/30',
      rippleDark: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)',
      rippleLight: 'radial-gradient(circle, rgba(8,145,178,0.22) 0%, rgba(8,145,178,0.05) 45%, transparent 70%)',
      cursorGlareDark: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 65%)',
      cursorGlareLight: 'radial-gradient(circle, rgba(8,145,178,0.09) 0%, transparent 65%)',
    },
  };

  const theme = themePalette[glowColor] || themePalette.blue;

  // Smooth, subtle water wave ripple on hover/pointer movement
  const spawnRipple = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastRippleTime.current < 180) return;
    lastRippleTime.current = now;

    const newRipple: Ripple = { id: now, x, y };
    setRipples((prev) => [...prev.slice(-2), newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1350);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
    spawnRipple(x, y);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    cyberAudio.playHover();
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    spawnRipple(x, y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    cyberAudio.playClick();
    if (onAction) onAction();
  };

  // Hexagon geometry: Pointy-topped regular polygon
  const hexPolygon = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${title} - ${actionLabel}`}
      className={`group relative select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300 ${className}`}
      style={{
        width: '100%',
        maxWidth: '340px',
        aspectRatio: '1 / 1.155',
        transform: 'none',
        filter: isHovered
          ? (isDarkMode ? theme.dropShadowDark : theme.dropShadowLight)
          : (isDarkMode ? 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45))' : 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.08))'),
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Outer Clipped Border Layer */}
      <div
        className="absolute inset-0 transition-colors duration-300 pointer-events-none"
        style={{
          clipPath: hexPolygon,
          backgroundColor: isHovered 
            ? (isDarkMode ? theme.borderDarkHover : theme.borderLightHover)
            : (isDarkMode ? theme.borderDarkBase : theme.borderLightBase),
        }}
      />

      {/* Inner Clipped Content Container */}
      <div
        className={`absolute inset-[2px] overflow-hidden ${
          isDarkMode ? 'bg-[#0b1222] text-white' : 'bg-white text-slate-900'
        } flex flex-col items-center justify-between p-5 sm:p-6 text-center`}
        style={{ 
          clipPath: hexPolygon,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        }}
      >
        {/* Ambient Solid Foundation */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#0b1222]' : 'bg-white'}`} />

        {/* Ambient Background Image with Attenuation */}
        <img
          src={image}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transform transition-opacity duration-500 ease-out ${
            isDarkMode
              ? 'opacity-15 group-hover:opacity-20 filter brightness-[0.25] contrast-[1.1] saturate-[0.4]'
              : 'opacity-10 group-hover:opacity-15 filter brightness-[1.1] contrast-[1.0] grayscale'
          }`}
          loading="lazy"
          decoding="async"
        />

        {/* Thematic Ambient Radial Mesh */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: isDarkMode ? theme.ambientGlowDark : theme.ambientGlowLight,
            opacity: isHovered ? 1 : 0.65,
          }}
        />

        {/* High-Legibility Dark/Light Vignette Scrim */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(180deg, rgba(11, 18, 34, 0.88) 0%, rgba(11, 18, 34, 0.82) 30%, rgba(11, 18, 34, 0.90) 70%, rgba(11, 18, 34, 0.98) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.85) 30%, rgba(255, 255, 255, 0.92) 70%, rgba(255, 255, 255, 0.98) 100%)',
          }}
        />

        {/* Center Text Protection Scrim */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'radial-gradient(ellipse 85% 65% at 50% 50%, rgba(11, 18, 34, 0.95) 0%, rgba(11, 18, 34, 0.80) 65%, transparent 100%)'
              : 'radial-gradient(ellipse 85% 65% at 50% 50%, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.82) 65%, transparent 100%)',
          }}
        />

        {/* Dynamic Water Surface Waves on Hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full animate-water-wave pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 10,
                height: 10,
                transform: 'translate(-50%, -50%)',
                background: isDarkMode ? theme.rippleDark : theme.rippleLight,
                boxShadow: isDarkMode ? '0 0 14px rgba(59,130,246,0.25)' : '0 0 14px rgba(37,99,235,0.15)',
              }}
            />
          ))}

          {/* Interactive cursor light reflection */}
          {isHovered && (
            <div
              className="absolute pointer-events-none transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${coords.x}px`,
                top: `${coords.y}px`,
                width: '190px',
                height: '190px',
                background: isDarkMode ? theme.cursorGlareDark : theme.cursorGlareLight,
              }}
            />
          )}
        </div>

        {/* Content Section - Safe within Hexagon Vertical Center */}
        {/* Top: Domain Tag & Icon Chamber */}
        <div className="relative z-10 flex flex-col items-center pt-2 sm:pt-3">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center mb-1.5 backdrop-blur-md transition-all duration-300 group-hover:scale-105 ${
            isDarkMode ? theme.chamberDark : theme.chamberLight
          }`}>
            <Icon size={18} aria-hidden={true} />
          </div>
          <span className={`text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.2em] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-sm transition-colors ${
            isDarkMode ? theme.tagDark : theme.tagLight
          }`}>
            {tag}
          </span>
        </div>

        {/* Middle: Title & Description */}
        <div 
          className="relative z-10 px-2 sm:px-3 my-auto max-w-[94%]"
          style={{
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            transform: 'translateZ(0)',
          }}
        >
          <h3 className={`text-sm sm:text-base font-extrabold uppercase tracking-wider leading-snug transition-colors duration-200 ${
            isDarkMode ? `text-white ${theme.titleHoverDark}` : `text-slate-900 ${theme.titleHoverLight}`
          }`}>
            {title}
          </h3>
          {subtitle && (
            <div className={`text-[10.5px] sm:text-[11px] font-semibold mt-1 line-clamp-1 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {subtitle}
            </div>
          )}
          <p className={`text-[10.5px] sm:text-xs leading-relaxed font-normal mt-1.5 line-clamp-2 sm:line-clamp-3 ${
            isDarkMode ? 'text-slate-300/85' : 'text-slate-600'
          }`}>
            {desc}
          </p>
        </div>

        {/* Bottom: Themed Action Chevron Button */}
        <div className="relative z-10 pb-2.5 sm:pb-3 w-full flex justify-center">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer select-none border active:scale-95 ${
              isDarkMode ? theme.btnDark : theme.btnLight
            }`}
            aria-label={`View ${title}`}
            title={`View ${title}`}
          >
            <ChevronRight size={15} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
