import React from 'react';
import { WaterGlassCard } from './WaterGlassCard';

export interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'cyan' | 'emerald';
  onClick?: () => void;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  onClick,
}) => {
  return (
    <WaterGlassCard
      className={`p-6 sm:p-7 ${className}`}
      accentGlow={glowColor}
      onClick={onClick}
    >
      {children}
    </WaterGlassCard>
  );
};
