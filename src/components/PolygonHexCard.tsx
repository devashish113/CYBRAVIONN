import React, { useRef, useState, useCallback, MouseEvent } from 'react';
import { ChevronRight } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

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
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const lastRippleTime = useRef<number>(0);

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
      className={`group relative select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white transition-colors duration-300 ${className}`}
      style={{
        width: '100%',
        maxWidth: '340px',
        aspectRatio: '1 / 1.155',
        transform: 'none',
        filter: isHovered
          ? (isDarkMode ? 'drop-shadow(0 14px 22px rgba(0, 0, 0, 0.45))' : 'drop-shadow(0 12px 18px rgba(0, 0, 0, 0.10))')
          : (isDarkMode ? 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.35))' : 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.06))'),
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
            ? (isDarkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 11, 16, 0.90)')
            : (isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'),
        }}
      />

      {/* Inner Clipped Content Container */}
      <div
        className={`absolute inset-[2px] overflow-hidden ${
          isDarkMode ? 'bg-[#07080c] text-white' : 'bg-[#fafafa] text-neutral-950'
        } flex flex-col items-center justify-between p-5 sm:p-6 text-center`}
        style={{ 
          clipPath: hexPolygon,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        }}
      >
        {/* Ambient Solid Foundation */}
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#07080c]' : 'bg-[#fafafa]'}`} />

        {/* Ambient Background Image with Deep Attenuation (Zero Distraction, Zero Center Glare) */}
        <img
          src={image}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transform transition-opacity duration-500 ease-out ${
            isDarkMode
              ? 'opacity-15 group-hover:opacity-20 filter brightness-[0.25] contrast-[1.1] saturate-[0.35]'
              : 'opacity-10 group-hover:opacity-15 filter brightness-[1.1] contrast-[1.0] grayscale'
          }`}
          loading="lazy"
          decoding="async"
        />

        {/* High-Legibility Dark/Light Vignette Scrim */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(180deg, rgba(7, 8, 12, 0.88) 0%, rgba(7, 8, 12, 0.82) 30%, rgba(7, 8, 12, 0.90) 70%, rgba(7, 8, 12, 0.98) 100%)'
              : 'linear-gradient(180deg, rgba(250, 250, 250, 0.94) 0%, rgba(250, 250, 250, 0.88) 30%, rgba(250, 250, 250, 0.94) 70%, rgba(250, 250, 250, 0.98) 100%)',
          }}
        />

        {/* Center Text Protection Shield (Heavy radial scrim right behind title & description) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'radial-gradient(ellipse 85% 65% at 50% 50%, rgba(7, 8, 12, 0.96) 0%, rgba(7, 8, 12, 0.82) 65%, transparent 100%)'
              : 'radial-gradient(ellipse 85% 65% at 50% 50%, rgba(250, 250, 250, 0.97) 0%, rgba(250, 250, 250, 0.85) 65%, transparent 100%)',
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
                background: isDarkMode
                  ? 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 45%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.02) 45%, transparent 70%)',
                boxShadow: isDarkMode ? '0 0 14px rgba(255,255,255,0.12)' : '0 0 14px rgba(0,0,0,0.06)',
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
                width: '180px',
                height: '180px',
                background: isDarkMode
                  ? 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)'
                  : 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 65%)',
              }}
            />
          )}
        </div>

        {/* Content Section - Safe within Hexagon Vertical Center */}
        {/* Top: Domain Tag & Icon */}
        <div className="relative z-10 flex flex-col items-center pt-2 sm:pt-3">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${
            isDarkMode 
              ? 'bg-white/10 border-white/20 text-white' 
              : 'bg-neutral-900/5 border-neutral-900/15 text-neutral-900'
          } backdrop-blur-md border flex items-center justify-center mb-1.5 shadow-sm transition-transform duration-200 group-hover:scale-105`}>
            <Icon size={17} aria-hidden={true} />
          </div>
          <span className={`text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.2em] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-sm ${
            isDarkMode 
              ? 'border-white/20 bg-white/10 text-white' 
              : 'border-neutral-900/20 bg-neutral-900/5 text-neutral-900'
          }`}>
            {tag}
          </span>
        </div>

        {/* Middle: Title & Description - Razor Sharp Pure Vector Typography, Zero Drop Shadow Blur */}
        <div 
          className="relative z-10 px-2 sm:px-3 my-auto max-w-[94%]"
          style={{
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            transform: 'translateZ(0)',
          }}
        >
          <h3 className={`text-sm sm:text-base font-black uppercase tracking-wider leading-snug transition-colors ${
            isDarkMode ? 'text-white' : 'text-neutral-950'
          }`}>
            {title}
          </h3>
          {subtitle && (
            <div className={`text-[10.5px] sm:text-[11px] font-semibold mt-1 line-clamp-1 ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {subtitle}
            </div>
          )}
          <p className={`text-[10.5px] sm:text-xs leading-relaxed font-normal mt-1.5 line-clamp-2 sm:line-clamp-3 ${
            isDarkMode ? 'text-neutral-300/90' : 'text-neutral-600'
          }`}>
            {desc}
          </p>
        </div>

        {/* Bottom: Minimalist ">" Action Button matching Navbar */}
        <div className="relative z-10 pb-2.5 sm:pb-3 w-full flex justify-center">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer select-none ${
              isDarkMode
                ? 'bg-white text-neutral-950 hover:bg-neutral-200 border border-white/20 active:scale-95'
                : 'bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800/30 active:scale-95'
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
