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
import { TiltCard3D } from '../components/TiltCard3D';

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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-slate-200/80 dark:border-blue-500/20">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-br from-cyan-600/20 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-12 w-[500px] h-[500px] bg-gradient-to-bl from-orange-600/20 via-amber-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-orange-500/10 border border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs uppercase tracking-[0.25em] font-bold mb-8 backdrop-blur-md shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <Radio className="w-4 h-4 text-cyan-500" />
            <span>CONNECTED-SIDE THREAT INTEL INGESTION</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.12]"
          >
            Normalize, Curate &amp; Export{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-orange-500 bg-clip-text text-transparent">
              High-Fidelity Threat Intel
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-stone-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed"
          >
            Bridge the gap between public cyber threat feeds and isolated air-gapped enclaves. 
            Automate ingestion from MISP, AlienVault OTX, and URLhaus, eliminate noise with strict confidence scoring, 
            and produce tamper-evident cryptographic export packages.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            {/* Live Link to Deployed App */}
            <a
              href="http://40.192.90.82:3002"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="w-full sm:w-auto px-9 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-3 text-white shadow-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-orange-500 hover:from-cyan-600 hover:to-orange-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer transform hover:scale-[1.02]"
            >
              <ExternalLink size={17} />
              <span>Launch Live Intel Collector</span>
            </a>

            <a
              href="#feed-inspector"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#feed-inspector')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full sm:w-auto px-9 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 min-h-[50px] border cursor-pointer ${
                isDarkMode
                  ? 'bg-stone-950/80 hover:bg-stone-900 text-stone-200 border-stone-800 hover:border-cyan-500/50'
                  : 'bg-white/90 hover:bg-white text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <Sliders size={16} className="text-cyan-400" />
              <span>Explore Feed Normalization Sandbox</span>
            </a>
          </motion.div>

          {/* Metrics Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { val: '3+ Threat Feeds', label: 'Continuous Ingestion', sub: 'MISP, OTX, URLhaus' },
              { val: 'STIX 2.1 Standard', label: 'Unified Taxonomy', sub: 'Global Cyber Interoperability' },
              { val: 'BFF Architecture', label: 'Network Isolation', sub: 'Zero Direct DB Exposure' },
              { val: 'Air-Gap Bundler', label: 'Diode Transfer Ready', sub: 'Cryptographic Integrity' },
            ].map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-slate-200/80 dark:border-stone-800/80 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-sm"
              >
                <span className="text-xl sm:text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-500">
                  {m.val}
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-stone-200 mt-1">
                  {m.label}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-stone-400 font-light">
                  {m.sub}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE FEED NORMALIZATION SANDBOX */}
      {/* ========================================================================= */}
      <section id="feed-inspector" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold block mb-2">
            Real-Time Ingestion Sandbox
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Inspect Feed Normalization &amp; Curated Bundles
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
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
                  href="http://40.192.90.82:3002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
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
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold block mb-2">
            Secure Ingestion Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineered for Air-Gapped Trust Boundaries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TiltCard3D glowColor="blue">
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-block mb-4">
                  MULTI-FEED NORMALIZER
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Heterogeneous Ingestion</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-light">
                  Converts disparate XML, JSON, and CSV feeds from open-source and commercial threat intelligence partners into an immutable STIX 2.1 format.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-stone-800 text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Automated Deduplication</span>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D glowColor="orange">
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 inline-block mb-4">
                  HUMAN REVIEW QUEUE
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analyst Curation Controls</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-light">
                  Senior analysts can flag suspicious domains, modify severity ratings, and reject false positives before packages cross the security boundary.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-stone-800 text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Zero False Positive Leakage</span>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D glowColor="blue">
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-block mb-4">
                  CRYPTOGRAPHIC BUNDLING
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Signed Air-Gap Bundles</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-light">
                  Exports authenticated, SHA256-verified packages designed for transfer via physical optical data diodes or encrypted air-gap media.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-stone-800 text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Tamper-Evident Signatures</span>
              </div>
            </div>
          </TiltCard3D>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-10">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-cyan-950/60 via-stone-950 to-orange-950/40 border border-cyan-500/30 text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Curate Live Cyber Threat Intelligence
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base mb-8 font-light">
            Access the live Threat Intel Collector deployed on our cloud server.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="http://40.192.90.82:3002"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="px-8 py-4 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
            >
              <span>Launch Live Intel Collector</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
