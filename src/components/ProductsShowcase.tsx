import React, { useState } from 'react';
import { 
  Brain, 
  Gamepad2, 
  ShieldCheck, 
  ShieldAlert,
  BellRing,
  Radio
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';
import { PolygonHexCard } from './PolygonHexCard';

interface ProductsShowcaseProps {
  setCurrentView: (view: string) => void;
  isDarkMode?: boolean;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({ 
  setCurrentView,
  isDarkMode = true 
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const products = [
    {
      id: 'threatforge',
      name: 'ThreatForge Platform',
      tag: 'THREAT MODELING',
      filterCategory: 'THREAT',
      subtitle: 'Automated STRIDE & PASTA Engine',
      desc: 'Automated threat modeling and attack surface mapping with live attack tree generation, CVSS 3.1 quantitative scoring, and air-gapped threat narratives.',
      icon: ShieldAlert,
      image: '/images/services/offensive-sec.jpg',
      targetView: 'threatforge'
    },
    {
      id: 'soc-ai',
      name: 'SOC AI Triage',
      tag: 'AUTONOMOUS SOAR',
      filterCategory: 'SOAR',
      subtitle: 'Explainable AI Incident Investigation',
      desc: 'Sub-second autonomous SIEM alert investigation. Features SHAP explainable ML verdicts, ReAct investigation agents, and automated SOAR playbooks.',
      icon: BellRing,
      image: '/images/services/soc-triage.jpg',
      targetView: 'soc-ai'
    },
    {
      id: 'exception-manager',
      name: 'AI Exception Manager',
      tag: 'AI GOVERNANCE',
      filterCategory: 'GOVERNANCE',
      subtitle: 'Automated Risk Waiver Platform',
      desc: 'Centralized compliance exception tracking platform with machine learning risk scoring, automated review workflows, and continuous policy drift governance.',
      icon: ShieldCheck,
      image: '/images/services/grc.jpg',
      targetView: 'exception-manager'
    },
    {
      id: 'cyberverse',
      name: 'CyberRange Arena',
      tag: 'DEFENSE SANDBOX',
      filterCategory: 'SANDBOX',
      subtitle: 'Adversary Emulation & Hands-on Labs',
      desc: 'Browser-based hands-on cyber defense sandboxes, active adversary emulation scenarios, and interactive incident response training for technical teams.',
      icon: Gamepad2,
      image: '/images/services/training.jpg',
      targetView: 'cyberverse'
    },
    {
      id: 'threat-collector',
      name: 'Threat Intel Collector',
      tag: 'INGESTION ENGINE',
      filterCategory: 'INTEL',
      subtitle: 'Unified MISP & OTX Intelligence Hub',
      desc: 'Ingests, deduplicates, and scores IOCs from MISP, AlienVault OTX, and URLhaus with automated STIX 2.1 air-gap export bundles for isolated enclaves.',
      icon: Radio,
      image: '/images/services/threat-intel.jpg',
      targetView: 'threat-collector'
    },
    {
      id: 'ai',
      name: 'Cybravions AI',
      tag: 'PRIVATE AI CORE',
      filterCategory: 'AI',
      subtitle: 'Private Enterprise Neural Appliance',
      desc: 'Deploy high-performance agentic AI directly inside private infrastructure with mathematical data isolation and zero cloud telemetry.',
      icon: Brain,
      image: '/images/services/ai-security.jpg',
      targetView: 'ai'
    }
  ];

  const filterCategories = [
    { id: 'ALL', label: 'All (6)' },
    { id: 'THREAT', label: 'Threat Modeling' },
    { id: 'SOAR', label: 'Autonomous SOAR' },
    { id: 'GOVERNANCE', label: 'AI Governance' },
    { id: 'SANDBOX', label: 'Defense Sandbox' },
    { id: 'INTEL', label: 'Threat Intel' },
    { id: 'AI', label: 'Private AI' }
  ];

  const displayedCards = selectedFilter === 'ALL'
    ? products
    : products.filter((p) => p.filterCategory === selectedFilter);

  const handleProductClick = (view: string) => {
    cyberAudio.playClick();
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="products" 
      className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative z-10 bg-transparent border-t border-neutral-200 dark:border-white/[0.08] scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-neutral-500 dark:text-neutral-400 text-shadow-subtle">
              Proprietary Defense Engines
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-white tracking-tight text-shadow-editorial">
            Autonomous Platforms &amp; Secure Core
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-4 font-normal leading-relaxed max-w-3xl mx-auto">
            Engineered defense software and private neural appliances built to solve structural security, compliance, and governance challenges across modern enterprise environments.
          </p>
        </div>

        {/* Category Filter Pills (Centered & Accessible) */}
        <div className="flex items-center justify-center gap-1.5 p-1 rounded-full bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] overflow-x-auto max-w-fit mx-auto mb-12 sm:mb-14">
          {filterCategories.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                cyberAudio.playClick();
                setSelectedFilter(filter.id);
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === filter.id
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Polygon Cards Presentation: 3-3 Layout in Each Row */}
        {selectedFilter === 'ALL' ? (
          <div className="flex flex-col items-center w-full gap-8 sm:gap-10 lg:gap-12">
            {/* Row 1: 3 Hexagons */}
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 sm:gap-8 z-10 w-full max-w-6xl">
              {displayedCards.slice(0, 3).map((prod) => (
                <PolygonHexCard
                  key={prod.id}
                  title={prod.name}
                  tag={prod.tag}
                  subtitle={prod.subtitle}
                  desc={prod.desc}
                  icon={prod.icon}
                  image={prod.image}
                  actionLabel=">"
                  onAction={() => handleProductClick(prod.targetView)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>

            {/* Row 2: 3 Hexagons (4th, 5th, and 6th card right after 5th card) */}
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 sm:gap-8 z-20 w-full max-w-6xl">
              {displayedCards.slice(3, 6).map((prod) => (
                <PolygonHexCard
                  key={prod.id}
                  title={prod.name}
                  tag={prod.tag}
                  subtitle={prod.subtitle}
                  desc={prod.desc}
                  icon={prod.icon}
                  image={prod.image}
                  actionLabel=">"
                  onAction={() => handleProductClick(prod.targetView)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Filtered Matrix Grid */
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 max-w-6xl mx-auto">
            {displayedCards.map((prod) => (
              <PolygonHexCard
                key={prod.id}
                title={prod.name}
                tag={prod.tag}
                subtitle={prod.subtitle}
                desc={prod.desc}
                icon={prod.icon}
                image={prod.image}
                actionLabel=">"
                onAction={() => handleProductClick(prod.targetView)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
