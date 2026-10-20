import React, { useRef, useState, useCallback, MouseEvent } from 'react';
import { cyberAudio } from '../utils/cyberAudio';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export type WaterAccentGlow = 'blue' | 'orange' | 'purple' | 'cyan' | 'silver';

export interface WaterGlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  accentGlow?: WaterAccentGlow | string;
}

export const WaterGlassCard: React.FC<WaterGlassCardProps> = ({
  children,
  className = '',
  onClick,
  accentGlow = 'blue',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const lastRippleTime = useRef<number>(0);

  const glowStyles = {
    blue: {
      spotDark: 'rgba(59, 130, 246, 0.20)',
      spotLight: 'rgba(37, 99, 235, 0.08)',
      hoverBorderDark: 'dark:hover:border-blue-500/40 dark:hover:shadow-[0_20px_45px_rgba(37,99,235,0.22)]',
      hoverBorderLight: 'hover:border-blue-400 hover:shadow-[0_16px_36px_rgba(37,99,235,0.12)]',
      meniscusDark: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) 50%, transparent 100%)',
      meniscusLight: 'linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.3) 50%, transparent 100%)',
    },
    orange: {
      spotDark: 'rgba(249, 115, 22, 0.20)',
      spotLight: 'rgba(234, 88, 12, 0.08)',
      hoverBorderDark: 'dark:hover:border-orange-500/40 dark:hover:shadow-[0_20px_45px_rgba(249,115,22,0.22)]',
      hoverBorderLight: 'hover:border-orange-400 hover:shadow-[0_16px_36px_rgba(249,115,22,0.12)]',
      meniscusDark: 'linear-gradient(90deg, transparent 0%, rgba(249, 115, 22, 0.5) 50%, transparent 100%)',
      meniscusLight: 'linear-gradient(90deg, transparent 0%, rgba(234, 88, 12, 0.3) 50%, transparent 100%)',
    },
    purple: {
      spotDark: 'rgba(139, 92, 246, 0.20)',
      spotLight: 'rgba(124, 58, 237, 0.08)',
      hoverBorderDark: 'dark:hover:border-purple-500/40 dark:hover:shadow-[0_20px_45px_rgba(139,92,246,0.22)]',
      hoverBorderLight: 'hover:border-purple-400 hover:shadow-[0_16px_36px_rgba(139,92,246,0.12)]',
      meniscusDark: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 50%, transparent 100%)',
      meniscusLight: 'linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.3) 50%, transparent 100%)',
    },
    cyan: {
      spotDark: 'rgba(6, 182, 212, 0.20)',
      spotLight: 'rgba(8, 145, 178, 0.08)',
      hoverBorderDark: 'dark:hover:border-cyan-500/40 dark:hover:shadow-[0_20px_45px_rgba(6,182,212,0.22)]',
      hoverBorderLight: 'hover:border-cyan-400 hover:shadow-[0_16px_36px_rgba(6,182,212,0.12)]',
      meniscusDark: 'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.5) 50%, transparent 100%)',
      meniscusLight: 'linear-gradient(90deg, transparent 0%, rgba(8, 145, 178, 0.3) 50%, transparent 100%)',
    },
    silver: {
      spotDark: 'rgba(255, 255, 255, 0.08)',
      spotLight: 'rgba(0, 0, 0, 0.03)',
      hoverBorderDark: 'dark:hover:border-white/25 dark:hover:shadow-[0_24px_48px_rgba(0,0,0,0.8)]',
      hoverBorderLight: 'hover:border-slate-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]',
      meniscusDark: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.22) 50%, transparent 100%)',
      meniscusLight: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.08) 50%, transparent 100%)',
    }
  };

  const currentGlow = (glowStyles as Record<string, typeof glowStyles.blue>)[accentGlow] || glowStyles.blue;

  // Smooth, low-intensity water wave ripple on hover/move
  const spawnRipple = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastRippleTime.current < 160) return;
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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: 'none'
      }}
      className={`relative rounded-3xl overflow-hidden cursor-pointer select-none group/water transition-all duration-300
        /* Light mode: Pristine, clear frosted white glass */
        bg-white/80 hover:bg-white/95 border border-slate-200/90 ${currentGlow.hoverBorderLight}
        shadow-[0_8px_24px_-6px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,1)]
        backdrop-blur-xl
        /* Dark mode: Pristine, clear obsidian glass */
        dark:bg-[#0b1222]/80 dark:hover:bg-[#10192e]/90 dark:border-white/[0.08] ${currentGlow.hoverBorderDark}
        dark:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)]
        ${className}`}
    >
      {/* 1. Specular Light Sheen at Mouse Coordinates */}
      {/* Dark Mode Specular Spot */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 hidden dark:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, ${currentGlow.spotDark} 0%, transparent 70%)`
        }}
      />
      {/* Light Mode Specular Spot */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 block dark:hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, ${currentGlow.spotLight} 0%, transparent 70%)`
        }}
      />

      {/* 2. Concentric Water Wave Ripple Rings Formed on Hover */}
      {ripples.map((ripple) => (
        <React.Fragment key={ripple.id}>
          {/* Dark Mode Ripple */}
          <span
            className="water-ripple-ring-dark hidden dark:block"
            style={{
              left: ripple.x,
              top: ripple.y
            }}
          />
          {/* Light Mode Ripple */}
          <span
            className="water-ripple-ring-light block dark:hidden"
            style={{
              left: ripple.x,
              top: ripple.y
            }}
          />
        </React.Fragment>
      ))}

      {/* 3. Subtle Liquid Wave Drift on Hover */}
      <div 
        className="pointer-events-none absolute -inset-full opacity-0 group-hover/water:opacity-100 transition-opacity duration-700 hidden dark:block"
        style={{
          background: 'linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.035) 50%, transparent 60%)',
          transform: isHovered ? 'translateX(35%) translateY(15%) rotate(5deg)' : 'translateX(-40%) translateY(-30%) rotate(0deg)',
          transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease'
        }}
      />
      <div 
        className="pointer-events-none absolute -inset-full opacity-0 group-hover/water:opacity-100 transition-opacity duration-700 block dark:hidden"
        style={{
          background: 'linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%)',
          transform: isHovered ? 'translateX(35%) translateY(15%) rotate(5deg)' : 'translateX(-40%) translateY(-30%) rotate(0deg)',
          transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease'
        }}
      />

      {/* 4. Glass Surface Meniscus / Top Specular Hairline */}
      <div 
        className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300 hidden dark:block"
        style={{
          opacity: isHovered ? 1 : 0.6,
          background: currentGlow.meniscusDark
        }}
      />
      <div 
        className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300 block dark:hidden"
        style={{
          opacity: isHovered ? 1 : 0.6,
          background: currentGlow.meniscusLight
        }}
      />

      {/* 5. Clean, Sharp Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
