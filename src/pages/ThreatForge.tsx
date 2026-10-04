import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  ExternalLink, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Lock, 
  Radar, 
  GitFork, 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  Sliders, 
  Eye, 
  Terminal, 
  Activity,
  FileCheck,
  AlertTriangle,
  Server,
  Database,
  Globe
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../utils/cyberAudio';
import { TiltCard3D } from '../components/TiltCard3D';

interface ThreatForgeProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const ThreatForgePage: React.FC<ThreatForgeProps> = ({ 
  setCurrentView, 
  isDarkMode = true,
  onOpenConsultation 
}) => {
  // Interactive Threat Modeling Sandbox State
  const [targetAsset, setTargetAsset] = useState<'api' | 'db' | 'iot' | 'cloud'>('api');
  const [methodology, setMethodology] = useState<'stride' | 'pasta' | 'vast'>('stride');
  const [simulatedRisk, setSimulatedRisk] = useState<{
    threat: string;
    category: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    mitigation: string;
    cvss: number;
  }>({
    threat: 'BOLA / Broken Object Level Authorization on GraphQL customer endpoint',
    category: 'Elevation of Privilege & Information Disclosure',
    severity: 'CRITICAL',
    mitigation: 'Enforce tenant-isolated JWT claim verification at API Gateway gateway level.',
    cvss: 9.1
  });

  const assetsInfo = {
    api: {
      name: 'Public Customer Banking API',
      threat: 'BOLA & Broken Object Authorization on Transaction Endpoints',
      category: 'Elevation of Privilege (STRIDE)',
      severity: 'CRITICAL' as const,
      mitigation: 'Implement fine-grained ABAC claims verification and object-level authorization middleware.',
      cvss: 9.1,
      strideCategory: 'Elevation of Privilege'
    },
    db: {
      name: 'PCI-DSS Cardholder PostgreSQL Database',
      threat: 'SQL Injection via Stored Procedures & Unencrypted DB Snapshots',
      category: 'Information Disclosure & Tampering',
      severity: 'CRITICAL' as const,
      mitigation: 'Mandate parameterized ORM queries, enable TDE database encryption, and apply column-level hashing.',
      cvss: 8.8,
      strideCategory: 'Tampering'
    },
    iot: {
      name: 'Connected Edge Telemetry Gateway',
      threat: 'Firmware Modification via Insecure Over-The-Air (OTA) Updates',
      category: 'Spoofing & Repudiation',
      severity: 'HIGH' as const,
      mitigation: 'Sign all firmware packages with hardware HSM keys and enforce secure boot measured boot verification.',
      cvss: 7.9,
      strideCategory: 'Spoofing'
    },
    cloud: {
      name: 'Multi-Tenant Kubernetes Microservices Cluster',
      threat: 'Container Escape via Host PID Namespace Misconfiguration',
      category: 'Elevation of Privilege',
      severity: 'HIGH' as const,
      mitigation: 'Deploy strict Pod Security Standards (PSS), non-root execution policies, and eBPF runtime monitoring.',
      cvss: 8.4,
      strideCategory: 'Elevation of Privilege'
    }
  };

  const handleAssetSelect = (key: 'api' | 'db' | 'iot' | 'cloud') => {
    cyberAudio.playClick();
    setTargetAsset(key);
    const info = assetsInfo[key];
    setSimulatedRisk({
      threat: info.threat,
      category: info.category,
      severity: info.severity,
      mitigation: info.mitigation,
      cvss: info.cvss
    });
  };

  const frameworks = [
    {
      name: 'STRIDE Matrix',
      desc: 'Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege per data-flow element.',
      badge: 'MICROSOFT STANDARD',
      color: 'blue'
    },
    {
      name: 'PASTA Engine',
      desc: 'Process for Attack Simulation and Threat Analysis — seven-stage risk-centric threat modeling aligning business impact with attacker motives.',
      badge: 'RISK-CENTRIC',
      color: 'orange'
    },
    {
      name: 'VAST Framework',
      desc: 'Visual, Agile, and Simple Threat modeling integrating application architecture and operational infrastructure attack surfaces.',
      badge: 'DEVSECOPS READY',
      color: 'amber'
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 selection:bg-blue-500/20 selection:text-blue-900 relative">
      <Helmet>
        <title>ThreatForge - Enterprise STRIDE & PASTA Threat Modeling | CYBRAVIONS</title>
        <meta name="description" content="Automate enterprise threat modeling with STRIDE, PASTA, and VAST frameworks. Real-time attack tree generation, CVSS 3.1 risk scoring, and air-gapped threat intelligence." />
      </Helmet>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-slate-200/80 dark:border-blue-500/20">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-br from-blue-600/20 via-sky-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-12 w-[500px] h-[500px] bg-gradient-to-bl from-orange-600/20 via-amber-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-sky-500/5 to-orange-500/10 border border-blue-500/30 text-blue-800 dark:text-blue-300 text-xs uppercase tracking-[0.25em] font-bold mb-8 backdrop-blur-md shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <ShieldAlert className="w-4 h-4 text-orange-500" />
            <span>ENTERPRISE THREAT MODELING PLATFORM</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.12]"
          >
            Anticipate Adversaries with{' '}
            <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-orange-500 bg-clip-text text-transparent">
              ThreatForge Intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-stone-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed"
          >
            Eliminate blind spots before code ships. Automatically map Data Flow Diagrams (DFDs), 
            evaluate STRIDE / PASTA attack trees, and generate mitigation playbooks with air-gapped model narratives.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            {/* Direct Deployed Redirect Link */}
            <a
              href="http://40.192.90.82:4173"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="w-full sm:w-auto px-9 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-3 text-white shadow-lg bg-gradient-to-r from-orange-500 via-amber-500 to-blue-600 hover:from-orange-600 hover:to-blue-500 shadow-[0_0_30px_rgba(249,115,22,0.4)] cursor-pointer transform hover:scale-[1.02]"
            >
              <ExternalLink size={17} />
              <span>Launch Live ThreatForge Platform</span>
            </a>

            <a
              href="#threat-simulator"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#threat-simulator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full sm:w-auto px-9 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 min-h-[50px] border cursor-pointer ${
                isDarkMode
                  ? 'bg-stone-950/80 hover:bg-stone-900 text-stone-200 border-stone-800 hover:border-blue-500/50'
                  : 'bg-white/90 hover:bg-white text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <Sliders size={16} className="text-blue-500" />
              <span>Explore STRIDE Sandbox</span>
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
              { val: 'STRIDE & PASTA', label: 'Dual Methodology', sub: 'ISO 27005 & NIST CSF' },
              { val: 'Automated DFD', label: 'Data Flow Graphs', sub: 'Interactive Node Diagrams' },
              { val: 'CVSS 3.1 Scoring', label: 'Quantitative Math', sub: 'Exploitability & Impact' },
              { val: '100% Air-Gapped', label: 'Zero Telemetry', sub: 'Local LLM Inference' },
            ].map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-slate-200/80 dark:border-stone-800/80 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-sm"
              >
                <span className="text-xl sm:text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">
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
      {/* 2. INTERACTIVE STRIDE & THREAT DISCOVERY SANDBOX */}
      {/* ========================================================================= */}
      <section id="threat-simulator" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-bold block mb-2">
            Interactive Threat Engine Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Simulate Attack Surface Analysis
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Select an architecture component below to witness how ThreatForge automatically discovers vulnerabilities, assesses CVSS severities, and formulates compensating controls.
          </p>
        </div>

        {/* Interactive Asset Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { id: 'api', name: 'Web / REST API', icon: Globe, desc: 'Public Gateway' },
            { id: 'db', name: 'Relational DB', icon: Database, desc: 'Encrypted Vault' },
            { id: 'cloud', name: 'K8s Cluster', icon: Server, desc: 'Container Nodes' },
            { id: 'iot', name: 'IoT Edge Device', icon: Cpu, desc: 'Firmware & OTA' },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = targetAsset === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleAssetSelect(item.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-2 ${
                  isSelected
                    ? 'bg-blue-500/10 border-blue-500 text-blue-500 shadow-md ring-1 ring-blue-500/50'
                    : 'bg-white/60 dark:bg-stone-900/60 border-slate-200 dark:border-stone-800 hover:border-slate-300 dark:hover:border-stone-700 text-slate-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon size={20} className={isSelected ? 'text-blue-500' : 'text-slate-500 dark:text-stone-400'} />
                  {isSelected && <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">SELECTED</span>}
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm block">{item.name}</span>
                  <span className="text-[11px] text-slate-500 dark:text-stone-400">{item.desc}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Threat Modeling Result Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-blue-400 font-bold block mb-1">
                ANALYSIS COMPONENT: {assetsInfo[targetAsset].name.toUpperCase()}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <AlertTriangle size={20} className="text-orange-400" />
                <span>{simulatedRisk.threat}</span>
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                {simulatedRisk.severity} (CVSS {simulatedRisk.cvss})
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {simulatedRisk.category}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Threat Vector &amp; Root Cause
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  Adversaries attempt to leverage non-sanitized request parameters to escalate privileges or breach authorization checks across multi-tenant data boundaries.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  STRIDE Category Mapping
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Spoofing', 'Tampering', 'Repudiation', 'Information Disclosure', 'Denial of Service', 'Elevation of Privilege'].map((cat) => {
                    const isActive = assetsInfo[targetAsset].strideCategory.includes(cat) || simulatedRisk.category.includes(cat);
                    return (
                      <span
                        key={cat}
                        className={`text-xs px-2.5 py-1 rounded-lg font-mono border ${
                          isActive
                            ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 font-bold'
                            : 'bg-slate-800/60 text-slate-500 border-slate-700/60'
                        }`}
                      >
                        {cat}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-emerald-400">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-mono uppercase font-bold tracking-wider">
                    Recommended Compensating Controls
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {simulatedRisk.mitigation}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  Engine Status: <strong className="text-emerald-400">Verified Deterministic</strong>
                </span>
                <a
                  href="http://40.192.90.82:4173"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
                >
                  <span>Open in ThreatForge Portal</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE ARCHITECTURE & METHODOLOGY PILLARS */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10 border-t border-slate-200/80 dark:border-stone-900">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold block mb-2">
            Enterprise Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Built for High-Stakes Threat Engineering
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {frameworks.map((fw, idx) => (
            <TiltCard3D key={idx} glowColor={fw.color === 'orange' ? 'orange' : 'blue'}>
              <div className="p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 inline-block mb-4">
                    {fw.badge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{fw.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-light">
                    {fw.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-stone-800 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <CheckCircle2 size={14} />
                  <span>Compliant with NIST SP 800-154</span>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-10">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-blue-900/40 via-stone-950 to-orange-950/30 border border-blue-500/30 text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Automated Threat Modeling Today
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base mb-8 font-light">
            Access the live ThreatForge appliance deployed directly on our high-performance infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="http://40.192.90.82:4173"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all cursor-pointer"
            >
              <span>Launch ThreatForge Application</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
