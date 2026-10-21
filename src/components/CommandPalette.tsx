import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShieldCheck, 
  Radar, 
  Lock, 
  Brain, 
  FileText, 
  Sun, 
  Moon, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  X,
  Phone,
  HelpCircle,
  Award,
  Gamepad2,
  MapPin,
  Building2,
  ShieldAlert,
  BellRing,
  Radio,
  Cloud,
  Scale
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setCurrentView: (view: string) => void;
  onOpenAuditModal: () => void;
}

interface CommandItem {
  id: string;
  category: 'Platforms' | 'Services' | 'Tools' | 'Company';
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag?: string;
  action: () => void;
}

const CATEGORIES = ['All', 'Platforms', 'Services', 'Tools', 'Company'] as const;
type CategoryFilter = typeof CATEGORIES[number];

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
  setCurrentView,
  onOpenAuditModal
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input and lock background scroll when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveCategory('All');
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 60);

      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        if (lenis && typeof lenis.start === 'function') {
          lenis.start();
        }
      };
    }
  }, [isOpen]);

  const items: CommandItem[] = useMemo(() => [
    // --- Platforms ---
    {
      id: 'threatforge',
      category: 'Platforms',
      title: 'ThreatForge Platform',
      subtitle: 'Automated threat modeling, attack path trees & CVSS quantitative scoring',
      icon: ShieldAlert,
      tag: 'STRIDE / PASTA',
      action: () => {
        onClose();
        setCurrentView('threatforge');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'soc-ai',
      category: 'Platforms',
      title: 'SOC AI Triage Engine',
      subtitle: 'Autonomous SIEM alert investigation with explainable SHAP verdicts & playbooks',
      icon: BellRing,
      tag: 'SOAR Engine',
      action: () => {
        onClose();
        setCurrentView('soc-ai');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'exception-mgr',
      category: 'Platforms',
      title: 'AI Exception Manager',
      subtitle: 'Automated cyber risk waiver assessment, drift tracking & audit PDF workflows',
      icon: ShieldCheck,
      tag: 'AI Governance',
      action: () => {
        onClose();
        setCurrentView('exception-manager');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'cyberverse',
      category: 'Platforms',
      title: 'CyberRange Arena',
      subtitle: 'Gamified CyberQuest labs, cryptography puzzles & CISM scenarios',
      icon: Gamepad2,
      tag: 'CTF & CISM',
      action: () => {
        onClose();
        setCurrentView('cyberverse');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'threat-collector',
      category: 'Platforms',
      title: 'Threat Intel Collector',
      subtitle: 'Multi-source IOC ingestion, automated STIX 2.1 normalization & air-gap bundles',
      icon: Radio,
      tag: 'MISP & OTX',
      action: () => {
        onClose();
        setCurrentView('threat-collector');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'sovereign-ai',
      category: 'Platforms',
      title: 'Cybravions AI',
      subtitle: 'Air-gapped offline agentic AI in-a-box for enterprise private environments',
      icon: Brain,
      tag: 'Secure Core',
      action: () => {
        onClose();
        setCurrentView('ai');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    // --- Services ---
    {
      id: 'vapt',
      category: 'Services',
      title: 'VAPT & Offensive Security',
      subtitle: 'Web, mobile, API & cloud network penetration testing with manual exploit proofs',
      icon: Lock,
      tag: 'CERT-In Aligned',
      action: () => {
        onClose();
        setCurrentView('vapt');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'iso-27001',
      category: 'Services',
      title: 'ISO 27001:2022 Implementation',
      subtitle: 'Turnkey ISMS implementation, Statement of Applicability & Stage 2 audit guarantee',
      icon: Award,
      tag: 'ISMS 2022',
      action: () => {
        onClose();
        setCurrentView('iso-27001');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'soc-2',
      category: 'Services',
      title: 'SOC 2 Type I & Type II Compliance',
      subtitle: 'Accelerate enterprise SaaS procurement with continuous audit evidence liaison',
      icon: FileText,
      tag: 'AICPA Trust',
      action: () => {
        onClose();
        setCurrentView('soc-2');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'cloud-security',
      category: 'Services',
      title: 'Cloud Security & DevSecOps',
      subtitle: 'AWS, Azure, GCP & Kubernetes CIS benchmark hardening and CI/CD gating',
      icon: Cloud,
      tag: 'Multi-Cloud',
      action: () => {
        onClose();
        setCurrentView('cloud-security');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'ai-security',
      category: 'Services',
      title: 'AI Security & LLM Red Teaming',
      subtitle: 'Prompt injection defenses, RAG poisoning audits, and enterprise safety testing',
      icon: Brain,
      tag: 'OWASP LLM',
      action: () => {
        onClose();
        setCurrentView('ai-security');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'dpdp-compliance',
      category: 'Services',
      title: 'DPDP Act 2023 Compliance',
      subtitle: 'Data Fiduciary advisory, consent architectures, and regulatory defense',
      icon: Scale,
      tag: 'Statutory Mandate',
      action: () => {
        onClose();
        setCurrentView('dpdp-compliance');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    // --- Interactive Tools & Demos ---
    {
      id: 'audit-tool',
      category: 'Tools',
      title: 'Security Posture Audit Calculator',
      subtitle: 'Interactive assessment of cloud readiness and vulnerability exposure score',
      icon: Sparkles,
      tag: 'Diagnostic Tool',
      action: () => {
        onClose();
        onOpenAuditModal();
      }
    },
    {
      id: 'radar-sim',
      category: 'Tools',
      title: '3D Threat Radar Simulation',
      subtitle: 'Simulate perimeter breach attempts and inspect live packet defense telemetry',
      icon: Radar,
      tag: 'Live Telemetry',
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('radar');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'exception-mgr-live',
      category: 'Tools',
      title: 'Production Portal (exceptionmgr.cybravions.com)',
      subtitle: 'Access the hosted enterprise exception management console',
      icon: ExternalLink,
      tag: 'Cloud Portal',
      action: () => {
        window.open('https://exceptionmgr.cybravions.com', '_blank', 'noopener,noreferrer');
        onClose();
      }
    },

    // --- Company & Information ---
    {
      id: 'about-page',
      category: 'Company',
      title: 'About Cybravions Solutions Pvt Ltd',
      subtitle: 'CIN: U62099DL2026PTC470901, leadership team, advisory board & enterprise mission',
      icon: Building2,
      tag: 'Corporate Profile',
      action: () => {
        onClose();
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'training-page',
      category: 'Company',
      title: 'Cybersecurity Training & Workforce Academy',
      subtitle: 'Customized engineering defense programs with actionable verified skills',
      icon: Brain,
      tag: 'Training Hub',
      action: () => {
        onClose();
        setCurrentView('training');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'compliance-hub',
      category: 'Company',
      title: 'Global Compliance & GRC Automation Hub',
      subtitle: 'Unified frameworks overview for ISO 27001, SOC 2, HIPAA, NIST & DPDP',
      icon: ShieldCheck,
      tag: 'Frameworks',
      action: () => {
        onClose();
        setCurrentView('compliance');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'contact',
      category: 'Company',
      title: 'Consult Lead Security Advisor',
      subtitle: 'Direct confidential consultation under mutual non-disclosure agreement',
      icon: Phone,
      tag: 'Engagement',
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'office-map',
      category: 'Company',
      title: 'Registered Headquarters & Location',
      subtitle: 'Saidulajab, Western Marg, New Delhi 110030 (GPS: 28.5194° N, 77.2011° E)',
      icon: MapPin,
      tag: 'New Delhi HQ',
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('office-location');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'faq',
      category: 'Company',
      title: 'Frequently Asked Questions (FAQ)',
      subtitle: 'Engagement models, audit timelines, testing methodologies & pricing structure',
      icon: HelpCircle,
      tag: 'Advisory',
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('faq');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'toggle-theme',
      category: 'Company',
      title: isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      subtitle: 'Toggle monochrome contrast aesthetics',
      icon: isDarkMode ? Sun : Moon,
      tag: 'Theme Mode',
      action: () => {
        toggleDarkMode();
        onClose();
      }
    }
  ], [isDarkMode, onClose, onOpenAuditModal, setCurrentView, toggleDarkMode]);

  // Filter items based on active category and query
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q))
      );
    });
  }, [items, activeCategory, query]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems.length, activeCategory]);

  // Ensure selected item stays scrolled into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      cyberAudio.playClick();
      filteredItems[selectedIndex].action();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        data-lenis-prevent="true"
        onClick={() => {
          cyberAudio.playClick();
          onClose();
        }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/65 backdrop-blur-md cursor-pointer transition-opacity"
        aria-label="Click background to close"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Spotlight Search"
          initial={{ opacity: 0, scale: 0.97, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -8 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden relative flex flex-col max-h-[80vh] cursor-default ${
            isDarkMode
              ? 'bg-[#0b0e14]/98 border-white/[0.12] text-slate-100 shadow-[0_28px_80px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-2xl'
              : 'bg-white/98 border-black/[0.08] text-slate-900 shadow-[0_28px_80px_rgba(0,0,0,0.18),0_10px_25px_rgba(0,0,0,0.08)] backdrop-blur-2xl'
          }`}
          onKeyDown={handleKeyDown}
        >
          {/* Spotlight Search Header */}
          <div className="p-4 sm:p-5 flex items-center gap-3.5 border-b border-slate-200/80 dark:border-white/[0.08] relative">
            <Search size={20} aria-hidden="true" className="text-slate-400 dark:text-slate-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls="spotlight-search-results"
              aria-autocomplete="list"
              aria-label="Search platforms, capabilities, and tools"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search platforms, services, frameworks, or tools..."
              className="w-full bg-transparent text-base sm:text-[17px] font-medium tracking-tight outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer transition-colors"
                aria-label="Clear input"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}

            {/* Understated ESC Chip */}
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.04]"
              title="Close (Esc)"
            >
              <span>ESC</span>
            </button>
          </div>

          {/* Quick Filter Pill Tabs */}
          <div className="px-4 sm:px-5 py-2.5 border-b border-slate-200/60 dark:border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    cyberAudio.playClick();
                    setActiveCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? isDarkMode
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'bg-slate-950 text-white shadow-sm'
                      : isDarkMode
                        ? 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Results List */}
          <div 
            ref={listRef}
            id="spotlight-search-results"
            role="listbox"
            aria-label="Search results"
            className="overflow-y-auto p-2 sm:p-3 space-y-1 flex-1 min-h-[260px] max-h-[440px]"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    data-index={idx}
                    id={`spotlight-option-${item.id}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      cyberAudio.playClick();
                      item.action();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full p-3 rounded-2xl text-left flex items-center justify-between gap-3.5 transition-all cursor-pointer border ${
                      isSelected
                        ? isDarkMode
                          ? 'bg-[#181e2b] border-white/20 shadow-sm'
                          : 'bg-slate-100/90 border-slate-300/80 shadow-sm'
                        : 'bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.03] border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isSelected 
                          ? isDarkMode
                            ? 'bg-white text-slate-950 shadow-sm'
                            : 'bg-slate-950 text-white shadow-sm'
                          : isDarkMode
                            ? 'bg-white/[0.06] text-slate-300 border border-white/[0.08]'
                            : 'bg-white text-slate-700 border border-slate-200/80 shadow-sm'
                      }`}>
                        <ItemIcon size={19} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[13.5px] font-bold text-slate-900 dark:text-white truncate">
                            {item.title}
                          </span>
                          {item.tag && (
                            <span className="text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300 shrink-0">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate font-normal leading-relaxed">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 shrink-0">
                      {isSelected ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium flex items-center gap-1 bg-slate-200 dark:bg-white/[0.12] text-slate-800 dark:text-slate-200">
                          <span>Open</span>
                          <span>↵</span>
                        </span>
                      ) : (
                        <ArrowRight size={14} className="text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-14 px-4 text-slate-400 dark:text-slate-500">
                <Search size={32} className="mx-auto mb-3 opacity-30 text-slate-400" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  No matching results for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs mt-1 text-slate-400 dark:text-slate-500">
                  Try searching for a platform, service, or diagnostic tool.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {['ThreatForge', 'SOC AI', 'VAPT', 'ISO 27001', 'Audit Tool'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.12] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Minimalist Human-Crafted Footer */}
          <div className="p-3 px-5 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08]">↓</kbd>
                <span className="ml-0.5">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08]">↵</kbd>
                <span className="ml-0.5">Open</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08]">ESC</kbd>
                <span className="ml-0.5">Close</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>{filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
