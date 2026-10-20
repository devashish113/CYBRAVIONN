import React from 'react';
import { motion } from 'motion/react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface PageHeaderProps {
  kicker: string;
  title: string;
  italicTitle?: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  isDarkMode?: boolean;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  title,
  italicTitle,
  description,
  breadcrumbs,
  actions,
  isDarkMode = true,
  className = '',
}) => {
  return (
    <header className={`relative pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-18 max-w-5xl mx-auto px-6 text-center ${className}`}>
      {/* Precision Hairline Background Grid */}
      <div 
        className="absolute inset-0 -z-10 opacity-25 dark:opacity-15 pointer-events-none bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_50%,transparent_85%)]"
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
            : 'linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)'
        }}
      />

      {/* Optional Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 flex items-center justify-center">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="opacity-40" aria-hidden="true">/</span>}
                {crumb.onClick ? (
                  <button
                    type="button"
                    onClick={crumb.onClick}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className={crumb.active ? 'text-slate-900 dark:text-white font-semibold' : ''}>
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* 1. Hairline Radial Divider with Sovereign Kicker */}
      {/* 1. Cyber Badge Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 dark:border-blue-400/30 mb-6 sm:mb-8 shadow-[0_0_15px_rgba(59,130,246,0.15)] mx-auto"
      >
        <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-blue-600 dark:text-blue-400">
          {kicker}
        </p>
      </motion.div>

      {/* 2. Authoritative Display Headline Aligned with Cybravions Brand */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 dark:text-white mb-5 sm:mb-6 tracking-tight max-w-4xl mx-auto"
      >
        {title}
        {italicTitle && (
          <>
            {' '}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-orange-500 dark:from-sky-400 dark:via-blue-400 dark:to-orange-400 bg-clip-text text-transparent">
              {italicTitle}
            </span>
          </>
        )}
      </motion.h1>

      {/* 3. Refined Overview Lead */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.14 }}
        className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-stone-300 mb-8 sm:mb-10 max-w-2xl mx-auto font-normal leading-relaxed"
      >
        {description}
      </motion.p>

      {/* 4. Tactile Action Buttons */}
      {actions && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-5"
        >
          {actions}
        </motion.div>
      )}
    </header>
  );
};

export default PageHeader;
