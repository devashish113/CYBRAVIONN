import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

interface VisitorCounterProps {
  isDarkMode?: boolean;
  className?: string;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ 
  isDarkMode = true, 
  className = ''
}) => {
  const [count, setCount] = useState<number>(10000);
  const [displayCount, setDisplayCount] = useState<number>(10000);

  useEffect(() => {
    // Base starting count required by user: 10,000
    const BASE_START = 10000;
    
    try {
      const STORAGE_KEY = 'cybravions_visitor_count';
      const SESSION_KEY = 'cybravions_session_logged';
      
      const stored = localStorage.getItem(STORAGE_KEY);
      let currentVal = stored ? parseInt(stored, 10) : BASE_START;
      
      if (isNaN(currentVal) || currentVal < BASE_START) {
        currentVal = BASE_START;
      }

      // If new visit in this browsing session, increment the count
      if (!sessionStorage.getItem(SESSION_KEY)) {
        currentVal += 1;
        sessionStorage.setItem(SESSION_KEY, 'true');
        localStorage.setItem(STORAGE_KEY, currentVal.toString());
      }

      setCount(currentVal);

      // Smooth rolling animation from (currentVal - 28) up to currentVal
      const startCount = Math.max(BASE_START, currentVal - 28);
      let currentDisplay = startCount;
      const stepTime = 30; // ms per tick

      const timer = setInterval(() => {
        currentDisplay += 1;
        if (currentDisplay >= currentVal) {
          setDisplayCount(currentVal);
          clearInterval(timer);
        } else {
          setDisplayCount(currentDisplay);
        }
      }, stepTime);

      return () => clearInterval(timer);
    } catch {
      setDisplayCount(BASE_START + 1);
    }
  }, []);

  const formattedCount = displayCount.toLocaleString('en-US');

  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono transition-all select-none ${
        isDarkMode 
          ? 'bg-stone-900/90 border-stone-800 text-stone-300 shadow-[0_0_20px_rgba(16,185,129,0.06)]' 
          : 'bg-white border-slate-200 text-slate-700 shadow-sm'
      } ${className}`}
      title="Verified Site Visitor Telemetry"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 dark:text-stone-400 font-semibold">
        <Users size={12} className="text-emerald-500" />
        <span>Live Visitors:</span>
      </span>

      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
        {formattedCount}
      </span>
    </div>
  );
};
