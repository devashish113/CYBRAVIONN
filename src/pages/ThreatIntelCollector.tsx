import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Radio, 
  ExternalLink, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Lock, 
  Radar, 
  CheckCircle2, 
  Sliders, 
  Activity, 
  Terminal, 
  Zap, 
  AlertTriangle, 
  FileText, 
  Server, 
  Shield, 
  Search,
  Filter,
  Download,
  Share2,
  PackageCheck
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../utils/cyberAudio';
import { PageHeader } from '../components/PageHeader';

interface ThreatIntelCollectorProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const ThreatIntelCollectorPage: React.FC<ThreatIntelCollectorProps> = ({ 
  setCurrentView, 
  isDarkMode = true,
  onOpenConsultation 
}) => {
  // Interactive Feed Normalization State
  const [selectedFeed, setSelectedFeed] = useState<'misp' | 'otx' | 'urlhaus'>('misp');

  const feedsData = {
    misp: {
      name: 'MISP Threat Sharing Community',
      type: 'Structured Events & Attributes',
      iocsDetected: '4,820 Indicators',
      sampleIoc: 'SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      tags: ['APT29', 'CozyBear', 'Trojan.CobaltStrike', 'C2 Infrastructure'],
      confidence: '98%',
      normalizedStix: 'indicator--8e2e2d2b-17d4-4cbf-938f-98ee46b3cd3f',
      airGapReady: 'Encrypted & Signed'
    },
    otx: {
      name: 'AlienVault Open Threat Exchange (OTX)',
      type: 'Crowdsourced Threat Pulses',
      iocsDetected: '12,450 Indicators',
      sampleIoc: 'IP: 185.220.101.5 (Tor Exit Relay / Bulletproof Hosting)',
      tags: ['Ransomware.LockBit', 'Initial Access', 'Port 443 Scanner'],
      confidence: '91%',
      normalizedStix: 'indicator--4a19b882-628d-4f11-9214-41d33190cbef',
      airGapReady: 'Deduplicated & Filtered'
    },
    urlhaus: {
      name: 'abuse.ch URLhaus Real-time Feed',
      type: 'Active Malware Distribution Sites',
      iocsDetected: '8,190 URLs',
      sampleIoc: 'URL: https://malicious-update-cloud[.]cc/payload.exe',
      tags: ['Malware Download', 'Emotet Dropper', 'Active Status'],
      confidence: '99%',
      normalizedStix: 'indicator--9918fb52-0863-455b-80df-552781498a44',
      airGapReady: 'Verified Live Host'
    }
  };

  const current = feedsData[selectedFeed];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 selection:bg-blue-500/20 selection:text-blue-900 relative">
      <Helmet>
        <title>Threat Intel Collector - Ingestion & Air-Gap Intel Packaging | CYBRAVIONS</title>
        <meta name="description" content="Connected-side threat intelligence collector. Ingest, deduplicate, and score IOCs from MISP, AlienVault OTX, and URLhaus with automated STIX 2.1 air-gap export bundles." />
      </Helmet>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <PageHeader
        kicker="Connected-Side Threat Intel Ingestion"
        title="Normalize, Curate & Export"
        italicTitle="High-Fidelity Threat Intel."
        description="Bridge the gap between public cyber threat feeds and isolated air-gapped enclaves. Automate ingestion from MISP, AlienVault OTX, and URLhaus, eliminate noise with strict confidence scoring, and produce tamper-evident cryptographic export packages."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Products', onClick: () => setCurrentView?.('home') },
          { label: 'Threat Intel Collector', active: true }
        ]}
        actions={
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="https://intel.cybravions.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <ExternalLink size={15} />
              <span>Launch Live Intel Collector</span>
            </a>

            <a
              href="#feed-inspector"
              onClick={(e) => {
                e.preventDefault();
                cyberAudio.playClick();
                document.querySelector('#feed-inspector')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-tactile-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <Sliders size={15} />
              <span>Explore Feed Normalization Sandbox</span>
            </a>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-20 -mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '3+ Threat Feeds', label: 'Continuous Ingestion', sub: 'MISP, OTX, URLhaus', num: '01' },
            { val: 'STIX 2.1 Standard', label: 'Unified Taxonomy', sub: 'Global Interoperability', num: '02' },
            { val: 'BFF Architecture', label: 'Network Isolation', sub: 'Zero Direct DB Exposure', num: '03' },
            { val: 'Air-Gap Bundler', label: 'Diode Transfer Ready', sub: 'Cryptographic Integrity', num: '04' },
          ].map((m, idx) => (
            <div
              key={idx}
              className="surface-card p-5 flex flex-col justify-between text-left relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-semibold tracking-widest">{m.num}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500/60" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold font-mono text-neutral-900 dark:text-white block">
                  {m.val}
                </span>
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mt-1 block">
                  {m.label}
                </span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5 block">
                  {m.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE FEED NORMALIZATION SANDBOX */}
      {/* ========================================================================= */}
      <section id="feed-inspector" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
              Real-Time Ingestion Sandbox
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white tracking-tight">
            Inspect Feed Normalization &amp; <span className="italic font-light text-neutral-500 dark:text-neutral-400">Curated Bundles.</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Select a raw intelligence feed below to observe how the collector automatically extracts indicators, applies deduplication heuristics, and packages standardized STIX objects.
          </p>
        </div>

        {/* Feed Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {[
            { id: 'misp', name: 'MISP Threat Community', tag: 'STRUCTURED TAXONOMY' },
            { id: 'otx', name: 'AlienVault OTX Pulses', tag: 'GLOBAL CROWDSOURCED' },
            { id: 'urlhaus', name: 'abuse.ch URLhaus Feed', tag: 'ACTIVE MALWARE HOSTS' },
          ].map((item) => {
            const isSelected = selectedFeed === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setSelectedFeed(item.id as any);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-md ring-1 ring-cyan-500/50'
                    : 'bg-white/60 dark:bg-stone-900/60 border-slate-200 dark:border-stone-800 hover:border-slate-300 dark:hover:border-stone-700 text-slate-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-stone-800 text-slate-600 dark:text-stone-400">{item.tag}</span>
                  {isSelected && <span className="text-[10px] font-mono font-bold text-cyan-400">INGESTING</span>}
                </div>
                <span className="font-bold text-sm mt-1">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Live Feed Normalization Console */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold block mb-1">
                FEED SOURCE: {current.name.toUpperCase()}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Radio size={22} className="text-cyan-400" />
                <span>{current.type}</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono mt-1 block">
                Active IOC Volume: <strong>{current.iocsDetected}</strong> | Confidence: <strong>{current.confidence}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Air-Gap Bundle: {current.airGapReady}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Sample Raw Indicator Extracted
                </span>
                <p className="text-xs sm:text-sm font-mono text-cyan-300/90 leading-relaxed bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  {current.sampleIoc}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Associated Threat Actor / Malware Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-cyan-400">
                  <PackageCheck size={16} />
                  <span className="text-xs font-mono uppercase font-bold tracking-wider">
                    Standardized STIX 2.1 Normalized Output
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {current.normalizedStix}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-400">
                  <CheckCircle2 size={13} />
                  <span>Deduplication &amp; Whitelist Filtering Complete</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  BFF Status: <strong className="text-emerald-400">Direct Network Isolation</strong>
                </span>
                <a
                  href="https://intel.cybravions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                >
                  <span>Open Live Collector</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ARCHITECTURE PILLARS */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10 border-t border-slate-200/80 dark:border-stone-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
              Secure Ingestion Architecture
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white tracking-tight">
            Engineered for Air-Gapped <span className="italic font-light text-neutral-500 dark:text-neutral-400">Trust Boundaries.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="surface-card surface-card-hover p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-amber-600 dark:text-amber-400">
                  MULTI-FEED NORMALIZER
                </span>
                <span className="font-mono text-xs text-neutral-400">01</span>
              </div>
              <h3 className="font-editorial font-normal text-2xl text-neutral-900 dark:text-white mb-2">Heterogeneous Ingestion</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                Converts disparate XML, JSON, and CSV feeds from open-source and commercial threat intelligence partners into an immutable STIX 2.1 format.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/[0.08] text-xs font-mono font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Automated Deduplication</span>
            </div>
          </div>

          <div className="surface-card surface-card-hover p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-amber-600 dark:text-amber-400">
                  HUMAN REVIEW QUEUE
                </span>
                <span className="font-mono text-xs text-neutral-400">02</span>
              </div>
              <h3 className="font-editorial font-normal text-2xl text-neutral-900 dark:text-white mb-2">Analyst Curation Controls</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                Senior analysts can flag suspicious domains, modify severity ratings, and reject false positives before packages cross the security boundary.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/[0.08] text-xs font-mono font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Zero False Positive Leakage</span>
            </div>
          </div>

          <div className="surface-card surface-card-hover p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-amber-600 dark:text-amber-400">
                  CRYPTOGRAPHIC BUNDLING
                </span>
                <span className="font-mono text-xs text-neutral-400">03</span>
              </div>
              <h3 className="font-editorial font-normal text-2xl text-neutral-900 dark:text-white mb-2">Signed Air-Gap Bundles</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                Exports authenticated, SHA256-verified packages designed for transfer via physical optical data diodes or encrypted air-gap media.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/[0.08] text-xs font-mono font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Tamper-Evident Signatures</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-10">
        <div className="p-10 sm:p-14 rounded-3xl surface-card text-neutral-900 dark:text-white relative overflow-hidden text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
              Live Appliance
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 text-neutral-900 dark:text-white">
            Curate Live Cyber Threat <span className="italic font-light text-neutral-500 dark:text-neutral-400">Intelligence.</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto text-sm sm:text-base mb-8 font-light leading-relaxed">
            Access the live Threat Intel Collector deployed on our cloud server.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://intel.cybravions.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Launch Live Intel Collector</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
