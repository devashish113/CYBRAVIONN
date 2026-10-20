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
import { PageHeader } from '../components/PageHeader';

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
      color: 'purple'
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
      <PageHeader
        kicker="Enterprise Threat Modeling Platform"
        title="Anticipate Adversaries with"
        italicTitle="ThreatForge Intelligence."
        description="Eliminate blind spots before code ships. Automatically map Data Flow Diagrams (DFDs), evaluate STRIDE / PASTA attack trees, and generate mitigation playbooks with air-gapped model narratives."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Products', onClick: () => setCurrentView?.('home') },
          { label: 'ThreatForge', active: true }
        ]}
        actions={
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="https://threatforge.cybravions.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <ExternalLink size={15} />
              <span>Launch Live ThreatForge Platform</span>
            </a>

            <a
              href="#threat-simulator"
              onClick={(e) => {
                e.preventDefault();
                cyberAudio.playClick();
                document.querySelector('#threat-simulator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-tactile-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <Sliders size={15} />
              <span>Explore STRIDE Sandbox</span>
            </a>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-20 -mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: 'STRIDE & PASTA', label: 'Dual Methodology', sub: 'ISO 27005 & NIST CSF', num: '01' },
            { val: 'Automated DFD', label: 'Data Flow Graphs', sub: 'Interactive Node Diagrams', num: '02' },
            { val: 'CVSS 3.1 Scoring', label: 'Quantitative Math', sub: 'Exploitability & Impact', num: '03' },
            { val: '100% Air-Gapped', label: 'Zero Telemetry', sub: 'Local LLM Inference', num: '04' },
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
      {/* 2. INTERACTIVE STRIDE & THREAT DISCOVERY SANDBOX */}
      {/* ========================================================================= */}
      <section id="threat-simulator" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
              Interactive Threat Engine Simulator
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white tracking-tight">
            Simulate Attack Surface <span className="italic font-light text-neutral-500 dark:text-neutral-400">Analysis.</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
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
                <AlertTriangle size={20} className="text-purple-400" />
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
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
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
                  href="https://threatforge.cybravions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
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
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
              Enterprise Architecture
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white tracking-tight">
            Built for High-Stakes <span className="italic font-light text-neutral-500 dark:text-neutral-400">Threat Engineering.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frameworks.map((fw, idx) => (
            <div 
              key={idx}
              className="surface-card surface-card-hover p-7 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-amber-600 dark:text-amber-400">
                    {fw.badge}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">0{idx + 1}</span>
                </div>
                <h3 className="font-editorial font-normal text-2xl text-neutral-900 dark:text-white mb-2">{fw.name}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                  {fw.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/[0.08] flex items-center gap-2 text-xs font-mono font-medium text-amber-600 dark:text-amber-400">
                <CheckCircle2 size={14} />
                <span>Compliant with NIST SP 800-154</span>
              </div>
            </div>
          ))}
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
              Immediate Access
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 text-neutral-900 dark:text-white">
            Start Automated Threat <span className="italic font-light text-neutral-500 dark:text-neutral-400">Modeling Today.</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto text-sm sm:text-base mb-8 font-light leading-relaxed">
            Access the live ThreatForge appliance deployed directly on our high-performance infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://threatforge.cybravions.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Launch ThreatForge Application</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
