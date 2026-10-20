import React, { useRef, useState, MouseEvent } from 'react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'orange' | 'purple' | 'cyan';
  onClick?: () => void;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlarePos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const glowStyles = {
    cyan: {
      spot: 'rgba(59, 130, 246, 0.28)',
      border: 'hover:border-blue-400 hover:shadow-[0_15px_45px_rgba(59,130,246,0.18)]',
      gradient: 'from-blue-500/10 via-transparent to-indigo-500/5',
      accent: 'border-t-blue-500/50',
    },
    blue: {
      spot: 'rgba(59, 130, 246, 0.28)',
      border: 'hover:border-blue-400 hover:shadow-[0_15px_45px_rgba(59,130,246,0.18)]',
      gradient: 'from-blue-500/10 via-transparent to-indigo-500/5',
      accent: 'border-t-blue-500/50',
    },
    orange: {
      spot: 'rgba(249, 115, 22, 0.28)',
      border: 'hover:border-orange-400 hover:shadow-[0_15px_45px_rgba(249,115,22,0.18)]',
      gradient: 'from-orange-500/10 via-transparent to-amber-500/5',
      accent: 'border-t-orange-500/50',
    },
    purple: {
      spot: 'rgba(139, 92, 246, 0.28)',
      border: 'hover:border-purple-400 hover:shadow-[0_15px_45px_rgba(139,92,246,0.18)]',
      gradient: 'from-purple-500/10 via-transparent to-pink-500/5',
      accent: 'border-t-purple-500/50',
    },
  };

  const currentTheme = glowStyles[glowColor];

  return (
    <div
      className="w-full h-full"
      onClick={onClick}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative rounded-3xl bg-white dark:bg-stone-950/90 border border-slate-200/90 dark:border-stone-800/80 p-8 transition-colors duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-slate-900 dark:text-white overflow-hidden group ${currentTheme.border} ${className}`}
      >
        {/* Dynamic Gradient Backdrop on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

        {/* Specular Radial Glare on Cursor */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(420px circle at ${glarePos.x}px ${glarePos.y}px, ${currentTheme.spot}, transparent 70%)`,
          }}
        />

        {/* Inner Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
};
