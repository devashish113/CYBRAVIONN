import React, { useEffect, useRef, useState } from 'react';

interface DeferredMountProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  rootMargin?: string;
}

export const DeferredMount: React.FC<DeferredMountProps> = ({
  children,
  className,
  id,
  rootMargin = '300px 0px',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin });

    observer.observe(container);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} id={id} className={className}>
      {isNearViewport ? children : null}
    </div>
  );
};
