import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Lock, 
  Radar, 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  Sliders, 
  Activity, 
  Terminal, 
  Zap, 
  AlertTriangle, 
  FileText, 
  Server, 
  Shield, 
  Eye, 
  Search,
  BellRing
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../utils/cyberAudio';
import { PageHeader } from '../components/PageHeader';

interface SocAiTriageProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const SocAiTriagePage: React.FC<SocAiTriageProps> = ({ 
  setCurrentView, 
  isDarkMode = true,
  onOpenConsultation 
}) => {
  // Interactive Alert Triage Simulator State
  const [selectedAlert, setSelectedAlert] = useState<'brute_force' | 'impossible_travel' | 'priv_esc'>('brute_force');

  const alertsData = {
    brute_force: {
      title: 'Multiple Failed Logins / Credential Stuffing',
      mitre: 'T1110.001 - Password Spraying',
      asset: 'Active Directory Identity Service (DC01)',
      confidence: '96%',
      classification: 'MALICIOUS_ATTACK',
      topShap: 'Failed Attempt Rate (>40/min), Source IP Reputation (Tor Node), Out-of-hours Time',
      playbook: 'PB-AUTH-09: Automated Account Suspension & IP Shunning',
      agentTrace: 'Agent queried ThreatIntel DB -> Correlated with 12 other tenants -> Triggered Okta MFA Reset API.'
    },
    impossible_travel: {
      title: 'Impossible Travel / Geo-Anomalous Authentication',
      mitre: 'T1078.004 - Valid Cloud Accounts',
      asset: 'AWS Production IAM Console',
      confidence: '92%',
      classification: 'HIGH_RISK_SUSPICIOUS',
      topShap: 'Velocity Delta (5,400 km in 18 mins), Unusual Device Fingerprint, High Privilege Role',
      playbook: 'PB-GEO-03: Revoke AWS Session Tokens & Mandatory Re-Auth',
      agentTrace: 'Agent inspected CloudTrail logs -> Confirmed lack of physical transit -> Revoked temporary STS tokens.'
    },
    priv_esc: {
      title: 'Local Privilege Escalation via SUID Binary Exploit',
      mitre: 'T1068 - Exploitation for Privilege Escalation',
      asset: 'Linux Payment Processing Node (PROD-SRV-04)',
      confidence: '99%',
      classification: 'CRITICAL_INCIDENT',
      topShap: 'Parent-Child Process Anomaly (/bin/bash spawned by root daemon), SUID flag execution',
      playbook: 'PB-CONTAIN-01: Micro-isolate Host Network Interface & Dump RAM',
      agentTrace: 'Agent initiated eBPF containment -> Snapshot RAM for Volatility forensics -> Notified Incident Commander.'
    }
  };

  const current = alertsData[selectedAlert];

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 selection:bg-blue-500/20 selection:text-blue-900 relative">
      <Helmet>
        <title>SOC AI Triage - Autonomous Alert Investigation & SOAR | CYBRAVIONS</title>
        <meta name="description" content="AI-driven Security Operations Center alert triage. Automated incident investigation, SHAP explainable ML verdicts, and autonomous SOAR playbooks with zero cloud data egress." />
      </Helmet>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <PageHeader
        kicker="Autonomous SOC Alert Triage & SOAR"
        title="Autonomous Alert Triage with"
        italicTitle="Explainable AI."
        description="Shatter alert fatigue. Triage 10,000+ daily SIEM events in milliseconds, understand the exact mathematical reasoning behind every verdict with SHAP feature attribution, and execute automated containment playbooks."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Products', onClick: () => setCurrentView?.('home') },
          { label: 'SOC AI Triage', active: true }
        ]}
        actions={
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="https://soc.cybravions.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <ExternalLink size={15} />
              <span>Launch Live SOC AI Portal</span>
            </a>

            <a
              href="#triage-simulator"
              onClick={(e) => {
                e.preventDefault();
                cyberAudio.playClick();
                document.querySelector('#triage-simulator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-tactile-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <Sliders size={15} />
              <span>Live Alert Investigation Simulator</span>
            </a>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-20 -mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '< 50ms', label: 'Triage Latency', sub: 'Instant Heuristic & ML Scoring', num: '01' },
            { val: 'SHAP XAI', label: 'Explainable AI', sub: 'Zero Black-Box Guesswork', num: '02' },
            { val: 'Automated SOAR', label: 'Playbook Execution', sub: 'Containment & Evidence Gen', num: '03' },
            { val: 'Air-Gapped Ready', label: 'Complete Privacy', sub: 'Zero External Egress', num: '04' },
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
      {/* 2. INTERACTIVE ALERT TRIAGE SIMULATOR */}
      {/* ========================================================================= */}
      <section id="triage-simulator" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
              Real-Time Investigation Simulator
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white tracking-tight">
            Watch the AI Triage <span className="italic font-light text-neutral-500 dark:text-neutral-400">Engine Reason.</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Select a synthetic security alert below to inspect how the autonomous agent classifies threats, isolates top SHAP features, and triggers response playbooks.
          </p>
        </div>

        {/* Alert Category Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {[
            { id: 'brute_force', name: 'Brute Force / Credential Spray', tag: 'IDENTITY ATTACK' },
            { id: 'impossible_travel', name: 'Impossible Travel Anomaly', tag: 'CLOUD TELEMETRY' },
            { id: 'priv_esc', name: 'SUID Privilege Escalation', tag: 'ENDPOINT HOST' },
          ].map((item) => {
            const isSelected = selectedAlert === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setSelectedAlert(item.id as any);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-blue-500/10 border-blue-500 text-blue-500 shadow-md ring-1 ring-blue-500/50'
                    : 'bg-white/60 dark:bg-stone-900/60 border-slate-200 dark:border-stone-800 hover:border-slate-300 dark:hover:border-stone-700 text-slate-700 dark:text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-stone-800 text-slate-600 dark:text-stone-400">{item.tag}</span>
                  {isSelected && <span className="text-[10px] font-mono font-bold text-blue-500">ACTIVE TRIAGE</span>}
                </div>
                <span className="font-bold text-sm mt-1">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Live Triage Console */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold block mb-1">
                AUTOMATED VERDICT: {current.classification}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <ShieldCheck size={22} className="text-emerald-400" />
                <span>{current.title}</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono mt-1 block">
                Target Asset: <strong>{current.asset}</strong> | MITRE: <strong>{current.mitre}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Confidence: {current.confidence}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Explainable AI (SHAP) Top Drivers
                </span>
                <p className="text-xs sm:text-sm font-mono text-amber-300/90 leading-relaxed bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  {current.topShap}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Investigation Agent ReAct Trace
                </span>
                <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  {current.agentTrace}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-blue-400">
                  <Zap size={16} />
                  <span className="text-xs font-mono uppercase font-bold tracking-wider">
                    Automated SOAR Action Triggered
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {current.playbook}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-400">
                  <CheckCircle2 size={13} />
                  <span>Execution Complete — Audited in Tamper-Proof Event Log</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  Engine: <strong className="text-emerald-400">SOC AI Active</strong>
                </span>
                <a
                  href="https://soc.cybravions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                >
                  <span>Open Live SOC AI Platform</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ENTERPRISE PILLARS */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10 border-t border-slate-200/80 dark:border-stone-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
              Pillars of Next-Gen SOC
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white tracking-tight">
            Beyond Traditional SIEM &amp; <span className="italic font-light text-neutral-500 dark:text-neutral-400">Rule Heuristics.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="surface-card surface-card-hover p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-amber-600 dark:text-amber-400">
                  TIER 1 AUTOMATION
                </span>
                <span className="font-mono text-xs text-neutral-400">01</span>
              </div>
              <h3 className="font-editorial font-normal text-2xl text-neutral-900 dark:text-white mb-2">Sub-Second Machine Scoring</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                Lightweight decision trees and TF-IDF classifiers evaluate standard false positives instantly without hogging expensive GPU cycles.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/[0.08] text-xs font-mono font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Zero Latency Bottlenecks</span>
            </div>
          </div>

          <div className="surface-card surface-card-hover p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-amber-600 dark:text-amber-400">
                  AGENTIC REASONING
                </span>
                <span className="font-mono text-xs text-neutral-400">02</span>
              </div>
              <h3 className="font-editorial font-normal text-2xl text-neutral-900 dark:text-white mb-2">ReAct Multi-Step Investigation</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                High-risk anomalies engage an autonomous investigation agent that queries network telemetry, correlates user identity, and drafts incident reports.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/[0.08] text-xs font-mono font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Full Audit Trail Logging</span>
            </div>
          </div>

          <div className="surface-card surface-card-hover p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-amber-600 dark:text-amber-400">
                  COMPLETE PRIVACY
                </span>
                <span className="font-mono text-xs text-neutral-400">03</span>
              </div>
              <h3 className="font-editorial font-normal text-2xl text-neutral-900 dark:text-white mb-2">Zero Data Egress Policy</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                Enforces complete network isolation. All model inference and RAG document embeddings execute on local hardware with zero external third-party API exposure.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-white/[0.08] text-xs font-mono font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>Strict Air-Gap Compliant</span>
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
              Live Investigation
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 text-neutral-900 dark:text-white">
            Experience Autonomous Alert <span className="italic font-light text-neutral-500 dark:text-neutral-400">Triage Live.</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto text-sm sm:text-base mb-8 font-light leading-relaxed">
            Access the live SOC AI appliance directly on our cloud server and test real alert playbooks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://soc.cybravions.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Launch Live SOC AI Portal</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
