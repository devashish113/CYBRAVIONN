import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CyberCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring physics for fluid latency-free movement
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const dotConfig = { damping: 45, stiffness: 800, mass: 0.1 };
  const dotX = useSpring(0, dotConfig);
  const dotY = useSpring(0, dotConfig);

  useEffect(() => {
    // Disable on touch screens
    if (typeof window === 'undefined' || 'ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const checkHoverable = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], .interactive-node');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', checkHoverable, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', checkHoverable);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Outer Tactical Reticle */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.75 : 1,
          rotate: isHovered ? 45 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className={`w-9 h-9 rounded-full border transition-colors duration-200 flex items-center justify-center ${
          isHovered
            ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.4)]'
            : 'border-blue-500/50 bg-transparent'
        }`}
      >
        {isHovered && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-orange-400" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-0.5 bg-orange-400" />
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-orange-400" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-orange-400" />
          </>
        )}
      </motion.div>

      {/* Inner Precision Laser Node */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
        }}
        className={`w-1.5 h-1.5 rounded-full ${
          isHovered ? 'bg-orange-400 shadow-[0_0_8px_#f97316]' : 'bg-blue-400 shadow-[0_0_6px_#3b82f6]'
        }`}
      />
    </div>
  );
};
