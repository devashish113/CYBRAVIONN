import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollState {
  progress: number;
  scrollY: number;
  velocity: number;
  direction: number;
  activeSection: string;
}

export function useScrollAnimation() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    scrollY: 0,
    velocity: 0,
    direction: 1,
    activeSection: 'hero',
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const now = Date.now();
      const dt = Math.max((now - lastTime.current) / 1000, 0.016);
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(currentScrollY / maxScroll, 0), 1) : 0;
      const deltaY = currentScrollY - lastScrollY.current;
      const velocity = deltaY / dt;
      const direction = deltaY >= 0 ? 1 : -1;

      // Determine active section based on scroll position
      const sections = ['hero', 'track-record', 'services', 'radar', 'trust', 'case-studies', 'solutions', 'why-us', 'insights', 'contact', 'faq'];
      let active = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            active = id;
          }
        }
      }

      lastScrollY.current = currentScrollY;
      lastTime.current = now;

      setScrollState({
        progress,
        scrollY: currentScrollY,
        velocity: Math.min(Math.max(velocity, -2000), 2000),
        direction,
        activeSection: active,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return scrollState;
}
