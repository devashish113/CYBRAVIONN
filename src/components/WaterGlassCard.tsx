import React, { useRef, useState, useCallback, MouseEvent } from 'react';
import { cyberAudio } from '../utils/cyberAudio';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export interface WaterGlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  /** Retained for prop compatibility, but rendered strictly in monochrome B&W / silver */
  accentGlow?: string;
}

export const WaterGlassCard: React.FC<WaterGlassCardProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number; rotateX: number; rotateY: number }>({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0
  });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const lastRippleTime = useRef<number>(0);

  // Smooth, low-intensity water wave ripple on hover/move
  const spawnRipple = useCallback((x: number, y: number) => {
    const now = Date.now();
    // Controlled throttling for smooth 60fps wave propagation
    if (now - lastRippleTime.current < 160) return;
    lastRippleTime.current = now;

    const newRipple: Ripple = { id: now, x, y };
    // Keep up to 3 subtle active ripple waves
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

    // Gentle fluid surface tension buoyant tilt (capped at 2.5deg for subtle luxury)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;

    setCoords({ x, y, rotateX, rotateY });
    spawnRipple(x, y);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    cyberAudio.playHover();
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y, rotateX: 0, rotateY: 0 });
    spawnRipple(x, y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.3, 1)'
      }}
      className={`relative rounded-3xl overflow-hidden cursor-pointer select-none group/water transition-all duration-300
        /* Light mode: Pristine, clear frosted white glass */
        bg-white/80 hover:bg-white/95 border border-slate-200/90 hover:border-slate-300
        shadow-[0_8px_24px_-6px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,1)]
        hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,1)]
        backdrop-blur-xl
        /* Dark mode: Pristine, clear obsidian glass */
        dark:bg-[#0c0e14]/65 dark:hover:bg-[#11141e]/80 dark:border-white/[0.08] dark:hover:border-white/[0.20]
        dark:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)]
        dark:hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.22)]
        ${className}`}
    >
      {/* 1. Low-Intensity Specular Light Sheen at Mouse Coordinates (B&W Only) */}
      {/* Dark Mode Specular Spot */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 hidden dark:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.06) 0%, transparent 70%)`
        }}
      />
      {/* Light Mode Specular Spot */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 block dark:hidden"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, rgba(0, 0, 0, 0.025) 0%, transparent 70%)`
        }}
      />

      {/* 2. Concentric B&W Water Wave Ripple Rings Formed on Hover */}
      {ripples.map((ripple) => (
        <React.Fragment key={ripple.id}>
          {/* Dark Mode Monochrome Ripple */}
          <span
            className="water-ripple-ring-dark hidden dark:block"
            style={{
              left: ripple.x,
              top: ripple.y
            }}
          />
          {/* Light Mode Monochrome Ripple */}
          <span
            className="water-ripple-ring-light block dark:hidden"
            style={{
              left: ripple.x,
              top: ripple.y
            }}
          />
        </React.Fragment>
      ))}

      {/* 3. Subtle Liquid Wave Drift on Hover (Low Intensity, Pure B&W / Silver) */}
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

      {/* 4. Glass Surface Meniscus / Top Specular Hairline (Clear Refraction) */}
      <div 
        className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300 hidden dark:block"
        style={{
          opacity: isHovered ? 1 : 0.6,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.22) 50%, transparent 100%)'
        }}
      />
      <div 
        className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300 block dark:hidden"
        style={{
          opacity: isHovered ? 1 : 0.6,
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.08) 50%, transparent 100%)'
        }}
      />

      {/* 5. Clean, Sharp Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
