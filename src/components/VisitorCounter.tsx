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
  const [displayCount, setDisplayCount] = useState<number | null>(() => {
    try {
      const cached = localStorage.getItem('cybravions_total_visitors_cache');
      return cached ? parseInt(cached, 10) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let isMounted = true;

    async function recordAndFetchVisitors() {
      const UID_KEY = 'cybravions_visitor_uid';
      const CACHE_KEY = 'cybravions_total_visitors_cache';

      let visitorId = '';
      try {
        visitorId = localStorage.getItem(UID_KEY) || '';
        if (!visitorId) {
          visitorId = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `v_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
          localStorage.setItem(UID_KEY, visitorId);
        }
      } catch {
        visitorId = `v_${Date.now()}`;
      }

      try {
        const response = await fetch('/api/visitors/hit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ visitorId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const targetCount = Number(data.totalVisitors);

        if (isNaN(targetCount) || !isMounted) return;

        try {
          localStorage.setItem(CACHE_KEY, targetCount.toString());
        } catch {}

        // Smooth roll-up animation
        setDisplayCount(prev => {
          const startVal = prev !== null ? prev : Math.max(1, targetCount - 8);
          if (startVal >= targetCount) return targetCount;

          let current = startVal;
          const stepMs = Math.max(20, Math.floor(400 / (targetCount - startVal)));

          const timer = setInterval(() => {
            current += 1;
            if (current >= targetCount) {
              if (isMounted) setDisplayCount(targetCount);
              clearInterval(timer);
            } else {
              if (isMounted) setDisplayCount(current);
            }
          }, stepMs);

          return startVal;
        });
      } catch (err) {
        // Fallback: fetch without increment
        try {
          const res = await fetch('/api/visitors');
          if (res.ok) {
            const data = await res.json();
            const count = Number(data.totalVisitors);
            if (!isNaN(count) && isMounted) {
              setDisplayCount(count);
              localStorage.setItem(CACHE_KEY, count.toString());
            }
          }
        } catch {}
      }
    }

    recordAndFetchVisitors();

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedCount = displayCount !== null 
    ? displayCount.toLocaleString('en-US') 
    : '...';

  return (
    <div 
      role="status"
      aria-label={`Total verified site visitors: ${formattedCount}`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono transition-all ${
        isDarkMode 
          ? 'bg-neutral-900/90 border-neutral-800 text-neutral-300 shadow-sm' 
          : 'bg-neutral-50 border-neutral-200 text-neutral-700 shadow-sm'
      } ${className}`}
      title="Verified Real-Time Site Visitors Telemetry"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 shrink-0" aria-hidden="true" />

      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
        <Users size={12} aria-hidden="true" className="text-neutral-500 dark:text-neutral-400" />
        <span>Total Visitors:</span>
      </span>

      <span className="text-xs font-bold text-neutral-900 dark:text-white tracking-wider">
        {formattedCount}
      </span>
    </div>
  );
};
