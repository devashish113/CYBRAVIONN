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
import { TiltCard3D } from '../components/TiltCard3D';

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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-slate-200/80 dark:border-blue-500/20">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-12 w-[500px] h-[500px] bg-gradient-to-bl from-orange-600/20 via-amber-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-sky-500/5 to-orange-500/10 border border-blue-500/30 text-blue-800 dark:text-blue-300 text-xs uppercase tracking-[0.25em] font-bold mb-8 backdrop-blur-md shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <BellRing className="w-4 h-4 text-orange-500" />
            <span>AUTONOMOUS SOC ALERT TRIAGE &amp; SOAR</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.12]"
          >
            Autonomous Alert Triage with{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-400 to-orange-500 bg-clip-text text-transparent">
              Explainable AI (XAI)
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-stone-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed"
          >
            Shatter alert fatigue. Triage 10,000+ daily SIEM events in milliseconds, 
            understand the exact mathematical reasoning behind every verdict with SHAP feature attribution, 
            and execute automated containment playbooks.
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
              href="http://40.192.90.82:3004"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="w-full sm:w-auto px-9 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-3 text-white shadow-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 shadow-[0_0_30px_rgba(59,130,246,0.4)] cursor-pointer transform hover:scale-[1.02]"
            >
              <ExternalLink size={17} />
              <span>Launch Live SOC AI Portal</span>
            </a>

            <a
              href="#triage-simulator"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#triage-simulator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full sm:w-auto px-9 py-4 rounded-full text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 min-h-[50px] border cursor-pointer ${
                isDarkMode
                  ? 'bg-stone-950/80 hover:bg-stone-900 text-stone-200 border-stone-800 hover:border-blue-500/50'
                  : 'bg-white/90 hover:bg-white text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <Sliders size={16} className="text-orange-500" />
              <span>Live Alert Investigation Simulator</span>
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
              { val: '< 50ms', label: 'Triage Latency', sub: 'Instant Heuristic & ML Scoring' },
              { val: 'SHAP XAI', label: 'Explainable AI', sub: 'Zero Black-Box Guesswork' },
              { val: 'Automated SOAR', label: 'Playbook Execution', sub: 'Containment & Evidence Gen' },
              { val: 'Air-Gapped Ready', label: 'Sovereign Privacy', sub: 'Zero External Egress' },
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
      {/* 2. INTERACTIVE ALERT TRIAGE SIMULATOR */}
      {/* ========================================================================= */}
      <section id="triage-simulator" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-bold block mb-2">
            Real-Time Investigation Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Watch the AI Triage Engine Reason
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl mx-auto mt-3">
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
                  href="http://40.192.90.82:3004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
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
          <span className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold block mb-2">
            Pillars of Next-Gen SOC
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Beyond Traditional SIEM &amp; Rule Heuristics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TiltCard3D glowColor="blue">
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 inline-block mb-4">
                  TIER 1 AUTOMATION
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sub-Second Machine Scoring</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-light">
                  Lightweight decision trees and TF-IDF classifiers evaluate standard false positives instantly without hogging expensive GPU cycles.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-stone-800 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Zero Latency Bottlenecks</span>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D glowColor="orange">
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20 inline-block mb-4">
                  AGENTIC REASONING
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">ReAct Multi-Step Investigation</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-light">
                  High-risk anomalies engage an autonomous investigation agent that queries network telemetry, correlates user identity, and drafts incident reports.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-stone-800 text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Full Audit Trail Logging</span>
              </div>
            </div>
          </TiltCard3D>

          <TiltCard3D glowColor="blue">
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 inline-block mb-4">
                  SOVEREIGN PRIVACY
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Zero Data Egress Policy</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-light">
                  Enforces complete network isolation. All model inference and RAG document embeddings execute on local hardware with zero external third-party API exposure.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-stone-800 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Strict Air-Gap Compliant</span>
              </div>
            </div>
          </TiltCard3D>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-10">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-stone-950 to-orange-950/40 border border-indigo-500/30 text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Experience Autonomous Alert Triage Live
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base mb-8 font-light">
            Access the live SOC AI appliance directly on our cloud server and test real alert playbooks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="http://40.192.90.82:3004"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all cursor-pointer"
            >
              <span>Launch Live SOC AI Portal</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
