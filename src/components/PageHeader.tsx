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
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-center gap-2 mb-6 sm:mb-8 w-fit mx-auto"
      >
        <div 
          className="w-36 sm:w-56 h-[1px]" 
          style={{ 
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.75) 0%, transparent 100%)' 
              : 'radial-gradient(circle, rgba(217, 119, 6, 0.65) 0%, transparent 100%)' 
          }} 
        />
        <p className="px-4 font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-700 dark:text-amber-400">
          {kicker}
        </p>
        <div 
          className="w-36 sm:w-56 h-[1px]" 
          style={{ 
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.75) 0%, transparent 100%)' 
              : 'radial-gradient(circle, rgba(217, 119, 6, 0.65) 0%, transparent 100%)' 
          }} 
        />
      </motion.div>

      {/* 2. Authoritative Editorial Display Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] text-neutral-900 dark:text-white mb-5 sm:mb-6 tracking-tight max-w-4xl mx-auto"
      >
        {title}
        {italicTitle && (
          <>
            {' '}
            <br className="hidden sm:inline" />
            <span className="italic font-light text-neutral-500 dark:text-neutral-400">
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
        className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 sm:mb-10 max-w-2xl mx-auto font-normal leading-relaxed"
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
