import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShieldCheck, 
  Radar, 
  Lock, 
  Globe, 
  Brain, 
  FileText, 
  Sun, 
  Moon, 
  ArrowRight, 
  CornerDownLeft, 
  ExternalLink,
  Zap,
  Sparkles,
  Command,
  X,
  Phone,
  HelpCircle,
  Award,
  Gamepad2,
  MapPin,
  Building2
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
  category: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
  setCurrentView,
  onOpenAuditModal
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items: CommandItem[] = [
    // Capabilities & Services
    {
      id: 'audit-tool',
      category: 'Interactive Tools',
      title: 'Launch Instant Security Posture Audit',
      subtitle: 'Calculate cloud readiness score and remediation roadmap in 30 seconds',
      icon: Sparkles,
      badge: 'Interactive',
      action: () => {
        onClose();
        onOpenAuditModal();
      }
    },
    {
      id: 'radar-sim',
      category: 'Interactive Tools',
      title: '3D Threat Radar Simulation',
      subtitle: 'Simulate red-team breach and inspect live packet defense telemetry',
      icon: Radar,
      badge: '3D Simulation',
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('radar');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'services',
      category: 'Core Capabilities',
      title: 'Cybersecurity GRC & Compliance Architecture',
      subtitle: 'ISO 27001, SOC 2 Type II, NIST CSF 2.0 & DPDP Act readiness',
      icon: ShieldCheck,
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('services');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'vapt',
      category: 'Core Capabilities',
      title: 'VAPT & Offensive Red Teaming',
      subtitle: 'Penetration testing across web, mobile, APIs, and cloud networks',
      icon: Lock,
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('services');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'cyberverse',
      category: 'Sovereign Products',
      title: 'Cybravions CyberVerse (Gamified CyberSec & AI Platform)',
      subtitle: '10 CyberSec Guilds, CTF Boss Fights, Adversarial AI labs & Inter-College Leagues',
      icon: Gamepad2,
      badge: 'Gamified RPG',
      action: () => {
        onClose();
        setCurrentView('cyberverse');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'sovereign-ai',
      category: 'Sovereign Products',
      title: 'Cybravions AI (Sovereign In-a-Box)',
      subtitle: '100% offline air-gapped agentic AI appliance for defense & critical infra',
      icon: Brain,
      badge: 'Appliance',
      action: () => {
        onClose();
        setCurrentView('ai');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'exception-mgr',
      category: 'Sovereign Products',
      title: 'AI Exception Manager & Risk Governance',
      subtitle: 'Deterministic risk engine, 100K+ precedent matching, and online ML retraining',
      icon: ShieldCheck,
      badge: 'Risk Engine',
      action: () => {
        onClose();
        setCurrentView('exception-manager');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'exception-mgr-live',
      category: 'Live Cloud Portals',
      title: 'Launch Live Exception Manager Portal (exceptionmgr.cybravions.online)',
      subtitle: 'Open active production dashboard in new tab',
      icon: ExternalLink,
      badge: 'Live Portal',
      action: () => {
        window.open('https://exceptionmgr.cybravions.online', '_blank', 'noopener,noreferrer');
        onClose();
      }
    },
    {
      id: 'lifecycle',
      category: 'Company Journey',
      title: 'How We Partner With Enterprises (Engagement Lifecycle)',
      subtitle: 'Step-by-step 4-phase onboarding, SLA guarantees, and board debriefs',
      icon: Zap,
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('lifecycle');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'trust-standards',
      category: 'Trust & Validation',
      title: 'Certifications & Industry Standards',
      subtitle: 'ISO 27001, SOC 2, NIST CSF 2.0, HIPAA, and partner integrations',
      icon: Award,
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('about');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'compliance-page',
      category: 'Specialized Centers',
      title: 'Trust & Compliance Center',
      subtitle: 'Internal security controls, NDA assurances, and data privacy policies',
      icon: ShieldCheck,
      action: () => {
        onClose();
        setCurrentView('compliance');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'training-page',
      category: 'Specialized Centers',
      title: 'Cybersecurity Training & Capability Development',
      subtitle: 'Bespoke workforce workshops, red-team labs, and executive cyber literacy',
      icon: Brain,
      action: () => {
        onClose();
        setCurrentView('training');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'about-page',
      category: 'Company Profile',
      title: 'About Us & Corporate Profile (CYBRAVION SOLUTIONS PVT LTD)',
      subtitle: 'Official MCA Entity, CIN: U62099DL2026PTC470901, sovereign mission & leadership pillars',
      icon: Building2,
      badge: 'About Us Page',
      action: () => {
        onClose();
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'contact',
      category: 'Direct Engagement',
      title: 'Initiate Confidential CISO Briefing',
      subtitle: 'Direct engagement with lead security advisors under mutual NDA',
      icon: Phone,
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('contact');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'office-map',
      category: 'Direct Engagement',
      title: 'Registered Headquarters & Interactive Map',
      subtitle: 'Saidulajab, Western Marg, New Delhi 110030 (GPS: 28.5194° N, 77.2011° E)',
      icon: MapPin,
      badge: 'New Delhi HQ',
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('office-location');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'faq',
      category: 'Company & Advisory',
      title: 'Frequently Asked Questions (FAQ)',
      subtitle: 'Timelines, VAPT methodology, remediation support, and startup pricing',
      icon: HelpCircle,
      action: () => {
        onClose();
        setCurrentView('home');
        const el = document.getElementById('faq');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'toggle-theme',
      category: 'Preferences',
      title: isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: 'Toggle theme display aesthetics',
      icon: isDarkMode ? Sun : Moon,
      action: () => {
        toggleDarkMode();
        onClose();
      }
    },
    {
      id: 'llms-doc',
      category: 'Documentation & AI Standards',
      title: 'View Official LLM Context (llms.txt)',
      subtitle: 'Standardized Markdown documentation for AI agents & crawlers',
      icon: FileText,
      badge: 'RFC/Standard',
      action: () => {
        window.open('/llms.txt', '_blank');
        onClose();
      }
    }
  ];

  // Filter items by query
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Handle keyboard navigation
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
        onClick={() => {
          cyberAudio.playClick();
          onClose();
        }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-2xl cursor-pointer"
        aria-label="Click background to close"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden relative flex flex-col max-h-[75vh] cursor-default ${
            isDarkMode
              ? 'bg-[#090d18]/95 border-stone-800 text-stone-100 shadow-[0_30px_90px_rgba(0,0,0,0.9)]'
              : 'bg-white border-slate-200 text-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.2)]'
          }`}
          onKeyDown={handleKeyDown}
        >
          {/* Top Search Input Bar with Clear Go Back / Close Button */}
          <div className="p-4 sm:p-5 flex items-center gap-3 border-b border-slate-200 dark:border-stone-800/90 relative">
            <Search size={20} className="text-blue-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search capabilities, diagnostic tools, products, or standards..."
              className="w-full bg-transparent text-sm sm:text-base outline-none placeholder:text-slate-400 dark:placeholder:text-stone-500"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-stone-200"
                aria-label="Clear search input"
              >
                <X size={16} />
              </button>
            )}

            {/* Clear Go Back / Close Button */}
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-stone-800/90 dark:hover:bg-stone-750 text-slate-700 dark:text-stone-200 hover:text-red-600 dark:hover:text-orange-400 border border-slate-300 dark:border-stone-700 text-xs font-semibold tracking-wider transition-all cursor-pointer shrink-0 shadow-sm"
              aria-label="Close and go back"
              title="Close modal (Esc)"
            >
              <X size={16} className="text-red-500 dark:text-orange-400" />
              <span>Go Back</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-stone-900 text-slate-600 dark:text-stone-400 border border-slate-300 dark:border-stone-700 ml-1">
                ESC
              </kbd>
            </button>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto p-2 sm:p-3 space-y-1 flex-1">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      cyberAudio.playClick();
                      item.action();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full p-3 rounded-2xl text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/10 dark:bg-blue-500/15 border border-blue-500/40 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-slate-100 dark:hover:bg-white/[0.03] border border-transparent text-slate-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        isSelected 
                          ? 'bg-blue-500 text-white shadow-sm' 
                          : 'bg-slate-100 dark:bg-stone-800 text-slate-600 dark:text-stone-400'
                      }`}>
                        <ItemIcon size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase font-mono tracking-widest text-slate-400 dark:text-stone-500 text-[10px]">
                            {item.category}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-stone-400 truncate font-light">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                      {isSelected && (
                        <span className="text-[10px] font-mono text-blue-500 flex items-center gap-1">
                          <span>Select</span>
                          <CornerDownLeft size={12} />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-400 dark:text-stone-500">
                <Search size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm font-semibold">No capabilities found for "{query}"</p>
                <p className="text-xs mt-1 font-light">Try searching for "GRC", "VAPT", "Sovereign AI", or "Audit".</p>
              </div>
            )}
          </div>

          {/* Footer Shortcuts & Dismiss Button */}
          <div className="p-3 px-5 border-t border-slate-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-stone-500 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-stone-800 border border-slate-200 dark:border-stone-700">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-stone-800 border border-slate-200 dark:border-stone-700">↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-stone-800 border border-slate-200 dark:border-stone-700">↵</kbd>
                Execute
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onClose();
                }}
                className="hover:text-red-500 dark:hover:text-orange-400 font-sans font-medium underline underline-offset-2 cursor-pointer transition-colors"
              >
                Cancel / Close
              </button>
              <span className="hidden sm:inline-block">CYBRAVION Command Engine</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
