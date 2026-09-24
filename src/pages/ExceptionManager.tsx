/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Brain, 
  Database, 
  FileText, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Sliders, 
  Clock, 
  Layers, 
  Cpu, 
  Lock, 
  RefreshCw, 
  Sparkles, 
  Zap, 
  Server, 
  Award, 
  Building2, 
  Check, 
  Terminal, 
  ChevronRight, 
  ChevronDown,
  Info,
  Scale,
  Search,
  FileCheck,
  Shield
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../utils/cyberAudio';

interface ExceptionManagerPageProps {
  setCurrentView: (view: string) => void;
  isDarkMode: boolean;
  onOpenConsultation?: () => void;
}

export const ExceptionManagerPage: React.FC<ExceptionManagerPageProps> = ({
  setCurrentView,
  isDarkMode,
  onOpenConsultation
}) => {
  // --- Interactive Risk Engine Simulator State ---
  const [description, setDescription] = useState(
    'Legacy billing server runs on deprecated TLS 1.0 protocol for older mainframe communication without microsegmentation.'
  );
  const [businessUnit, setBusinessUnit] = useState('Core Fintech Operations');
  const [assetCriticality, setAssetCriticality] = useState<'High' | 'Medium' | 'Low'>('High');
  const [businessImpact, setBusinessImpact] = useState<'High' | 'Medium' | 'Low'>('High');
  const [complianceImpact, setComplianceImpact] = useState<'High' | 'Medium' | 'Low'>('High');
  const [threatExposure, setThreatExposure] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [durationDays, setDurationDays] = useState<number>(60);
  const [isSimulatingAnalysis, setIsSimulatingAnalysis] = useState<boolean>(false);
  const [hasSimulated, setHasSimulated] = useState<boolean>(true);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);

  // Active architecture tab
  const [activeArchTab, setActiveArchTab] = useState<'risk' | 'ml' | 'history' | 'pdf' | 'tenant'>('risk');

  // --- Exact Mathematical Risk Score Algorithm (from risk_engine.py) ---
  const calculatedRisk = useMemo(() => {
    let score = 0;

    // Asset Criticality weights
    if (assetCriticality === 'High') score += 30;
    else if (assetCriticality === 'Medium') score += 20;
    else score += 10;

    // Business Impact weights
    if (businessImpact === 'High') score += 25;
    else if (businessImpact === 'Medium') score += 15;
    else score += 8;

    // Compliance Impact weights
    if (complianceImpact === 'High') score += 20;
    else if (complianceImpact === 'Medium') score += 10;
    else score += 5;

    // Threat Exposure weights
    if (threatExposure === 'High') score += 15;
    else if (threatExposure === 'Medium') score += 8;
    else score += 4;

    // Duration (Days) weights
    if (durationDays > 90) score += 10;
    else if (durationDays >= 46) score += 7;
    else score += 5;

    // Cap score at 100
    score = Math.min(100, score);

    // Risk level classification
    let level: 'Critical' | 'High' | 'Medium' | 'Low' = 'Low';
    let levelColor = 'text-emerald-500';
    let levelBg = 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
    let recommendation = 'Standard Approval (Low Operational Risk)';
    let approverRole = 'Standard IT Manager';

    if (score >= 90) {
      level = 'Critical';
      levelColor = 'text-red-500';
      levelBg = 'bg-red-500/20 border-red-500/40 text-red-400';
      recommendation = 'Reject or Escalate to Board & CISO with Compulsory Compensating Controls';
      approverRole = 'Chief Information Security Officer (CISO)';
    } else if (score >= 70) {
      level = 'High';
      levelColor = 'text-orange-500';
      levelBg = 'bg-orange-500/20 border-orange-500/40 text-orange-400';
      recommendation = 'Approve only with Mandatory WAF & Daily Telemetry Isolation';
      approverRole = 'Head of Cyber Risk & Security Operations';
    } else if (score >= 40) {
      level = 'Medium';
      levelColor = 'text-amber-500';
      levelBg = 'bg-amber-500/20 border-amber-500/40 text-amber-400';
      recommendation = 'Approve with 30-day Remediation Milestone Check';
      approverRole = 'Department Security Lead';
    }

    // Category inference based on keywords
    let predictedCategory = 'Cryptographic & Network Protocol Exemption';
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes('database') || lowerDesc.includes('sql') || lowerDesc.includes('mysql')) {
      predictedCategory = 'Database Access & Storage Waiver';
    } else if (lowerDesc.includes('firewall') || lowerDesc.includes('port') || lowerDesc.includes('ip')) {
      predictedCategory = 'Network Boundary & Firewall Rule Exemption';
    } else if (lowerDesc.includes('password') || lowerDesc.includes('mfa') || lowerDesc.includes('auth')) {
      predictedCategory = 'IAM & Authentication Policy Waiver';
    } else if (lowerDesc.includes('cloud') || lowerDesc.includes('s3') || lowerDesc.includes('aws')) {
      predictedCategory = 'Cloud Storage & Tenant Isolation Waiver';
    }

    // Historical engine simulation
    const matchCount = score > 60 ? 14 : 38;
    const approvalRate = score >= 90 ? '12%' : score >= 70 ? '48%' : '89%';
    const historicalConfidence = score >= 70 ? 'High (84% sample match)' : 'Very High (96% sample match)';

    return {
      score,
      level,
      levelColor,
      levelBg,
      recommendation,
      approverRole,
      predictedCategory,
      matchCount,
      approvalRate,
      historicalConfidence
    };
  }, [assetCriticality, businessImpact, complianceImpact, threatExposure, durationDays, description]);

  const handleSimulate = () => {
    cyberAudio.playClick();
    setIsSimulatingAnalysis(true);
    setTimeout(() => {
      setIsSimulatingAnalysis(false);
      setHasSimulated(true);
      cyberAudio.playSuccess();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 selection:bg-orange-500/20 selection:text-orange-400 relative">
      <Helmet>
        <title>AI Exception Manager | Automated Cyber Risk & Policy Governance | CYBRAVION</title>
        <meta 
          name="description" 
          content="Enterprise AI Security Exception Management Platform. Mathematical risk scoring, 100K+ precedent matching, automated ML online retraining, and audit-grade ReportLab PDF generation." 
        />
        <link rel="canonical" href="https://cybravions.online/exception-manager" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-mono font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(249,115,22,0.15)]"
          >
            <ShieldCheck size={14} className="text-orange-500" />
            <span>ENTERPRISE RISK GOVERNANCE &amp; AI EXCEPTION PLATFORM</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
          >
            Automate Security Policy Exceptions with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-500">
              Deterministic AI &amp; Risk Math
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-stone-300 max-w-3xl leading-relaxed mb-10 font-light"
          >
            Transform chaotic manual waiver emails and unmanaged spreadsheet exceptions into a 
            fully auditable, multi-tenant risk governance engine. Powered by Scikit-Learn NLP classification, 
            100,000+ historical precedent matching, zero-drift online retraining loops, and instant ReportLab compliance PDFs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
          >
            <a
              href="https://exceptionmgr.cybravions.online"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <span>Launch Live Portal</span>
              <ExternalLink size={16} />
            </a>

            <button
              onClick={() => {
                cyberAudio.playClick();
                const el = document.getElementById('risk-simulator');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-stone-900/90 dark:hover:bg-stone-800 border border-slate-300 dark:border-stone-700 text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Sliders size={16} className="text-orange-500" />
              <span>Interactive Risk Calculator</span>
            </button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl"
          >
            {[
              { label: 'Synthetic Training Corpus', val: '100,000+', sub: 'Bootstrapped records' },
              { label: 'Evaluation Turnaround', val: '< 15s', sub: 'Sub-second risk math' },
              { label: 'Self-Retraining Trigger', val: '50 Records', sub: 'Continuous active learning' },
              { label: 'Regulatory Alignment', val: 'ISO / DPDP', sub: 'SOC 2 & NIST CSF ready' },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/70 dark:bg-stone-950/70 border border-slate-200/80 dark:border-stone-800/80 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-sm"
              >
                <span className="text-2xl sm:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500">
                  {metric.val}
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-stone-200 mt-1">
                  {metric.label}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-stone-400 font-light">
                  {metric.sub}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Risk Engine Simulator Section */}
      <section id="risk-simulator" className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-bold block mb-2">
            Deterministic Engine Sandbox
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Live Risk Assessment &amp; Decision Matrix
          </h2>
          <p className="text-slate-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-light">
            Adjust the 5 core deterministic risk vectors below to test real-time risk scoring, 
            NLP categorization, and approver escalation logic from <code className="text-orange-400 font-mono text-xs">risk_engine.py</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-7 space-y-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-orange-500" />
                <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                  Exception Request Details
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                Live Parameter Bindings
              </span>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-2">
                Exception Justification &amp; Technical Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-stone-950/80 border border-slate-300 dark:border-stone-700 text-sm text-slate-900 dark:text-stone-100 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Describe the technical justification, assets involved, and mitigating controls..."
              />
            </div>

            {/* Business Unit Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-2">
                Submitting Business Unit
              </label>
              <select
                value={businessUnit}
                onChange={(e) => setBusinessUnit(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-stone-950/80 border border-slate-300 dark:border-stone-700 text-sm text-slate-900 dark:text-stone-100 focus:border-orange-500 focus:outline-none"
              >
                <option value="Core Fintech Operations">Core Fintech Operations</option>
                <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure &amp; DevOps</option>
                <option value="E-Commerce & Payment Gateway">E-Commerce &amp; Payment Gateway</option>
                <option value="Healthcare Telemetry & EMR">Healthcare Telemetry &amp; EMR</option>
                <option value="Legacy Banking Core">Legacy Banking Core</option>
              </select>
            </div>

            {/* 4 Vector Tiers Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Asset Criticality */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-2 flex items-center justify-between">
                  <span>Asset Criticality</span>
                  <span className="text-[10px] font-mono text-orange-400">
                    {assetCriticality === 'High' ? '+30 pts' : assetCriticality === 'Medium' ? '+20 pts' : '+10 pts'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Low', 'Medium', 'High'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => {
                        cyberAudio.playClick();
                        setAssetCriticality(tier);
                      }}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        assetCriticality === tier
                          ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                          : 'bg-slate-100 dark:bg-stone-800 border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-400 hover:border-slate-400'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Impact */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-2 flex items-center justify-between">
                  <span>Business Impact</span>
                  <span className="text-[10px] font-mono text-orange-400">
                    {businessImpact === 'High' ? '+25 pts' : businessImpact === 'Medium' ? '+15 pts' : '+8 pts'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Low', 'Medium', 'High'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => {
                        cyberAudio.playClick();
                        setBusinessImpact(tier);
                      }}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        businessImpact === tier
                          ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                          : 'bg-slate-100 dark:bg-stone-800 border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-400 hover:border-slate-400'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compliance Impact */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-2 flex items-center justify-between">
                  <span>Compliance Impact</span>
                  <span className="text-[10px] font-mono text-orange-400">
                    {complianceImpact === 'High' ? '+20 pts' : complianceImpact === 'Medium' ? '+10 pts' : '+5 pts'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Low', 'Medium', 'High'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => {
                        cyberAudio.playClick();
                        setComplianceImpact(tier);
                      }}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        complianceImpact === tier
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-100 dark:bg-stone-800 border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-400 hover:border-slate-400'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Threat Exposure */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-stone-300 mb-2 flex items-center justify-between">
                  <span>Threat Exposure</span>
                  <span className="text-[10px] font-mono text-orange-400">
                    {threatExposure === 'High' ? '+15 pts' : threatExposure === 'Medium' ? '+8 pts' : '+4 pts'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Low', 'Medium', 'High'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => {
                        cyberAudio.playClick();
                        setThreatExposure(tier);
                      }}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        threatExposure === tier
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-100 dark:bg-stone-800 border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-400 hover:border-slate-400'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Duration Slider */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-stone-300">
                  Requested Waiver Duration: <span className="text-orange-500 font-mono font-bold">{durationDays} Days</span>
                </label>
                <span className="text-[10px] font-mono text-slate-400 dark:text-stone-400">
                  {durationDays > 90 ? '+10 pts (>90d)' : durationDays >= 46 ? '+7 pts (46-90d)' : '+5 pts (<=45d)'}
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="180"
                step="15"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>15 Days</span>
                <span>45 Days</span>
                <span>90 Days (CISO threshold)</span>
                <span>180 Days</span>
              </div>
            </div>

            {/* Execute Assessment Button */}
            <button
              onClick={handleSimulate}
              disabled={isSimulatingAnalysis}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all cursor-pointer"
            >
              {isSimulatingAnalysis ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Computing Multi-Vector Risk Weights...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Execute Real-Time Assessment</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Dynamic Live Output Matrix */}
          <div className="lg:col-span-5 space-y-4">
            {/* Score & Tier Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-stone-800 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-400">
                  Composite Risk Output
                </span>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${calculatedRisk.levelBg}`}>
                  {calculatedRisk.level.toUpperCase()} RISK
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className={`text-6xl sm:text-7xl font-mono font-bold tracking-tight ${calculatedRisk.levelColor}`}>
                  {calculatedRisk.score}
                </span>
                <span className="text-xl font-mono text-stone-500">/ 100</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full bg-stone-800 overflow-hidden mb-6">
                <div 
                  className={`h-full transition-all duration-500 ${
                    calculatedRisk.score >= 90
                      ? 'bg-red-500'
                      : calculatedRisk.score >= 70
                      ? 'bg-orange-500'
                      : calculatedRisk.score >= 40
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${calculatedRisk.score}%` }}
                />
              </div>

              {/* AI Category Prediction */}
              <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 mb-4">
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                  <Brain size={13} className="text-blue-400" />
                  <span>ML Predicted Category:</span>
                </div>
                <div className="font-mono text-xs text-blue-300 font-semibold">
                  {calculatedRisk.predictedCategory}
                </div>
              </div>

              {/* Approver Role & Recommendation */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2">
                  <Award size={14} className="text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400">Required Approver: </span>
                    <span className="font-semibold text-stone-100">{calculatedRisk.approverRole}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Info size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-400">Engine Verdict: </span>
                    <span className="text-stone-200">{calculatedRisk.recommendation}</span>
                  </div>
                </div>
              </div>

              {/* Generate PDF Modal Button */}
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  setShowPdfModal(true);
                }}
                className="w-full mt-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 hover:text-white border border-stone-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FileText size={14} className="text-orange-400" />
                <span>Preview Audit Compliance PDF Report</span>
              </button>
            </div>

            {/* Historical Intelligence Preview */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/60 border border-slate-200 dark:border-stone-800 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-stone-200 mb-3">
                <Clock size={14} className="text-orange-500" />
                <span>Historical Precedent Intelligence</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-stone-950/60 border border-slate-200 dark:border-stone-800/80">
                  <span className="text-slate-400 dark:text-stone-500 block text-[10px]">Precedent Matches</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-stone-200">{calculatedRisk.matchCount} similar waivers</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-stone-950/60 border border-slate-200 dark:border-stone-800/80">
                  <span className="text-slate-400 dark:text-stone-500 block text-[10px]">Historical Approval Rate</span>
                  <span className="font-mono font-bold text-orange-500">{calculatedRisk.approvalRate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Engines Section (Tabs) */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-stone-900 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-bold block mb-2">
            Technical Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            5 Built-In Governance &amp; ML Engines
          </h2>
          <p className="text-slate-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-light">
            Engineered for zero-drift compliance, full auditability, and air-gapped on-premise security operations.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'risk', label: '1. Risk Scoring Engine', icon: Scale },
            { id: 'ml', label: '2. NLP & Online Retraining', icon: Brain },
            { id: 'history', label: '3. Historical Intelligence', icon: Clock },
            { id: 'pdf', label: '4. ReportLab PDF Compiler', icon: FileCheck },
            { id: 'tenant', label: '5. Schema Multi-Tenancy', icon: Layers },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeArchTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setActiveArchTab(tab.id as any);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                    : 'bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 text-slate-600 dark:text-stone-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <TabIcon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900/90 border border-slate-200 dark:border-stone-800 shadow-xl backdrop-blur-xl">
          {activeArchTab === 'risk' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-mono font-bold mb-4">
                  <span>risk_engine.py</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Deterministic 5-Vector Weighted Scoring
                </h3>
                <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed mb-4 font-light">
                  Unlike opaque black-box AI risk estimators that produce varying results, CYBRAVION Exception Manager 
                  implements transparent, mathematically deterministic risk scoring. Every calculation is reproducible and 
                  auditable by external compliance examiners.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-stone-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-orange-500" />
                    <span><strong>Asset Criticality:</strong> High (30) | Medium (20) | Low (10)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-orange-500" />
                    <span><strong>Business Impact:</strong> High (25) | Medium (15) | Low (8)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-orange-500" />
                    <span><strong>Compliance Impact:</strong> High (20) | Medium (10) | Low (5)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-orange-500" />
                    <span><strong>Threat Exposure:</strong> High (15) | Medium (8) | Low (4)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-orange-500" />
                    <span><strong>Duration (Days):</strong> &gt;90d (10) | 46–90d (7) | &le;45d (5)</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 text-stone-200 font-mono text-xs border border-stone-800 overflow-x-auto shadow-inner">
                <div className="text-stone-500 mb-2"># Deterministic Scoring Implementation</div>
                <div className="text-blue-400">def calculate_risk_score(asset_crit, biz_imp, comp_imp, threat_exp, duration):</div>
                <div className="pl-4 text-stone-300">weights = &#123;</div>
                <div className="pl-8 text-amber-300">'criticality': &#123;'High': 30, 'Medium': 20, 'Low': 10&#125;,</div>
                <div className="pl-8 text-amber-300">'impact': &#123;'High': 25, 'Medium': 15, 'Low': 8&#125;,</div>
                <div className="pl-8 text-amber-300">'compliance': &#123;'High': 20, 'Medium': 10, 'Low': 5&#125;,</div>
                <div className="pl-8 text-amber-300">'threat': &#123;'High': 15, 'Medium': 8, 'Low': 4&#125;</div>
                <div className="pl-4 text-stone-300">&#125;</div>
                <div className="pl-4 text-orange-400">total = sum([weights[k][v] for k, v in ...])</div>
                <div className="pl-4 text-emerald-400">return min(100, total + duration_penalty(duration))</div>
              </div>
            </div>
          )}

          {activeArchTab === 'ml' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-mono font-bold mb-4">
                  <span>classifier.py &amp; app.py</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Online Retraining &amp; Active Feedback Loop
                </h3>
                <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed mb-4 font-light">
                  The NLP classification pipeline automatically categorizes unstructured exception requests using 
                  Scikit-Learn TF-IDF vectorizers and Logistic Regression. As security teams review and approve exceptions, 
                  the system accumulates verified ground-truth records.
                </p>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-stone-950/70 border border-slate-200 dark:border-stone-800">
                    <span className="font-bold text-orange-500">Trigger Threshold (50 Records):</span>
                    <p className="text-slate-600 dark:text-stone-400 mt-0.5">
                      Once 50 new approved exceptions are marked with <code className="text-orange-400">ml_retrained = 0</code>, 
                      the model retraining panel enables zero-downtime hot reloading.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-stone-950/70 border border-slate-200 dark:border-stone-800">
                    <span className="font-bold text-blue-500">Automated Metric Logging:</span>
                    <p className="text-slate-600 dark:text-stone-400 mt-0.5">
                      Validation accuracy, records used, and timestamps are committed to <code className="text-blue-400">ml_retrain_log</code> for complete ML governance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 text-stone-200 font-mono text-xs border border-stone-800 shadow-inner">
                <div className="text-stone-500 mb-2"># Retraining Pipeline Specification</div>
                <div className="text-blue-400">from sklearn.feature_extraction.text import TfidfVectorizer</div>
                <div className="text-blue-400">from sklearn.linear_model import LogisticRegression</div>
                <div className="text-blue-400">from sklearn.pipeline import Pipeline</div>
                <div className="my-2 text-stone-400">pipeline = Pipeline([</div>
                <div className="pl-4 text-amber-300">('tfidf', TfidfVectorizer(ngram_range=(1,2), max_features=10000)),</div>
                <div className="pl-4 text-amber-300">('clf', LogisticRegression(C=1.0, max_iter=300))</div>
                <div className="text-stone-400">])</div>
                <div className="mt-2 text-emerald-400"># Online serialization to models/model.pkl</div>
                <div className="text-stone-300">joblib.dump(pipeline, 'models/model.pkl')</div>
              </div>
            </div>
          )}

          {activeArchTab === 'history' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-mono font-bold mb-4">
                  <span>historical_engine.py &amp; similarity_engine.py</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  100,000+ Precedent Matching &amp; Duplicate Prevention
                </h3>
                <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed mb-4 font-light">
                  Prevent duplicate waiver requests and reduce security approval friction. The historical engine scans 
                  prior decisions to calculate approval likelihood and recommend optimal waiver expiration limits.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-stone-950/70 border border-slate-200 dark:border-stone-800">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">Prefix Matching</span>
                    <span className="text-slate-600 dark:text-stone-400">Fast indexed scans across live SQLite DB and synthetic baseline.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-stone-950/70 border border-slate-200 dark:border-stone-800">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">Cosine Similarity</span>
                    <span className="text-slate-600 dark:text-stone-400">Vector space similarity scoring for nuanced paraphrased waivers.</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 text-stone-200 font-mono text-xs border border-stone-800 shadow-inner">
                <div className="text-stone-500 mb-2"># Historical Precedent Matcher</div>
                <div className="text-blue-400">def get_historical_matches(description_prefix):</div>
                <div className="pl-4 text-stone-300">matches = db.query(exceptions).filter(prefix=description_prefix)</div>
                <div className="pl-4 text-amber-300">approval_rate = approved_count / total_matches</div>
                <div className="pl-4 text-emerald-400">rec_duration = min(30, avg_approved_duration)</div>
                <div className="pl-4 text-stone-300">return &#123;</div>
                <div className="pl-8 text-orange-300">'match_count': len(matches),</div>
                <div className="pl-8 text-orange-300">'approval_rate': f"&#123;approval_rate:.1%&#125;",</div>
                <div className="pl-8 text-orange-300">'recommended_days': rec_duration</div>
                <div className="pl-4 text-stone-300">&#125;</div>
              </div>
            </div>
          )}

          {activeArchTab === 'pdf' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono font-bold mb-4">
                  <span>pdf_generator.py</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  ReportLab Audit-Grade PDF Generation
                </h3>
                <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed mb-4 font-light">
                  Compiles standardized, tamper-evident single-page PDF compliance certificates for internal audit committees, 
                  SOC 2 Type II evaluators, and ISO 27001 lead auditors.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-stone-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>5 Organized Sections: Exception Details, Risk Assessment, Precedents, AI Verdict, Approvals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>Cryptographic Timestamp Anchors &amp; Approver ID Verification Block</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>In-Memory Compilation with Zero Local Storage Leakage</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 text-stone-200 border border-stone-800 shadow-inner flex flex-col items-center justify-center text-center">
                <FileText size={48} className="text-orange-500 mb-3" />
                <span className="font-bold text-sm text-white">ISO 27001 / SOC 2 Compliance Report</span>
                <span className="text-xs text-stone-400 mt-1 font-mono">Format: Vector ReportLab PDF flowable</span>
                <button
                  onClick={() => setShowPdfModal(true)}
                  className="mt-4 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  View Sample Report Output
                </button>
              </div>
            </div>
          )}

          {activeArchTab === 'tenant' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-mono font-bold mb-4">
                  <span>django-tenants &amp; Celery</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  PostgreSQL Schema-Isolated Multi-Tenancy
                </h3>
                <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed mb-4 font-light">
                  Enterprise-grade multi-tenancy ensures strict data partitioning. Each corporate client resides in an isolated 
                  PostgreSQL schema, preventing cross-tenant data leaks and fulfilling rigorous banking regulations.
                </p>
                <div className="space-y-2 text-xs text-slate-700 dark:text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-purple-500" />
                    <span><strong>Redis Caching:</strong> Sub-millisecond prefix lookups and Celery broker</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-purple-500" />
                    <span><strong>Celery Worker Queue:</strong> Async non-blocking PDF building and ML retraining</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-purple-500" />
                    <span><strong>WebSockets (Channels):</strong> Real-time approval broadcasts to dashboard</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 text-stone-200 font-mono text-xs border border-stone-800 shadow-inner">
                <div className="text-stone-500 mb-2"># Tenant Request Interceptor</div>
                <div className="text-blue-400">class TenantMiddleware(MiddlewareMixin):</div>
                <div className="pl-4 text-stone-300">def process_request(self, request):</div>
                <div className="pl-8 text-amber-300">hostname = request.get_host().split(':')[0]</div>
                <div className="pl-8 text-amber-300">tenant = Tenant.objects.get(domain_url=hostname)</div>
                <div className="pl-8 text-emerald-400">connection.set_tenant(tenant) # Isolates search_path</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Role-Based Access Control (RBAC & ABAC) Matrix */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-stone-900 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-bold block mb-2">
            Governance Hierarchy
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Hybrid RBAC &amp; ABAC Permission Matrix
          </h2>
          <p className="text-slate-600 dark:text-stone-300 text-sm max-w-2xl mx-auto mt-2 font-light">
            Enforces strict organizational separation of duties with automated escalation rules based on risk score thresholds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              role: '1. Requester',
              scope: 'Developer / DevOps / IT Staff',
              badge: 'Submitter',
              color: 'border-blue-500/30 bg-blue-500/5',
              badgeColor: 'bg-blue-500/20 text-blue-400',
              perms: [
                'Submit waiver requests',
                'View own submission status',
                'Upload architectural diagrams',
                'Cannot approve any exceptions',
              ],
            },
            {
              role: '2. Reviewer / Manager',
              scope: 'Engineering & Department Leads',
              badge: 'Low-Medium Tier',
              color: 'border-amber-500/30 bg-amber-500/5',
              badgeColor: 'bg-amber-500/20 text-amber-400',
              perms: [
                'Analyze department submissions',
                'Approve Low/Medium risk (<70)',
                'Modify duration recommendations',
                'Reject non-compliant waivers',
              ],
            },
            {
              role: '3. Security Officer / CISO',
              scope: 'Executive Cyber Governance',
              badge: 'High-Critical Tier',
              color: 'border-orange-500/30 bg-orange-500/5',
              badgeColor: 'bg-orange-500/20 text-orange-400',
              perms: [
                'Approve High & Critical exceptions (>=70)',
                'Authorize waivers exceeding 90 days',
                'Trigger online ML model retraining',
                'Override automated recommendations',
              ],
            },
            {
              role: '4. System Admin',
              scope: 'Platform Operations',
              badge: 'Tenant Admin',
              color: 'border-purple-500/30 bg-purple-500/5',
              badgeColor: 'bg-purple-500/20 text-purple-400',
              perms: [
                'Manage tenant schemas & users',
                'Configure SAML/OIDC SSO integrations',
                'Inspect immutable write audit logs',
                'Oversee Celery worker health',
              ],
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border ${item.color} backdrop-blur-md flex flex-col justify-between shadow-sm`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-current ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {item.role}
                </h4>
                <p className="text-xs text-slate-500 dark:text-stone-400 mb-4 font-light">
                  {item.scope}
                </p>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-stone-300">
                  {item.perms.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={13} className="text-orange-500 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Standard Alignment Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-stone-900 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-stone-900/90 to-orange-950/40 border border-blue-500/30 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-orange-400 font-mono font-bold block mb-2">
              Auditor Verification Ready
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Satisfies ISO 27001, SOC 2, NIST CSF &amp; DPDP Act
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed mb-8 font-light">
              Security exceptions are the #1 cause of audit non-conformities during ISO 27001 surveillance and SOC 2 Type II examinations. 
              CYBRAVION Exception Manager generates an unassailable audit trail with timestamps, approver identity verification, and expiration triggers.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: 'ISO 27001:2022', clause: 'Control A.5.8 & A.8.19' },
                { title: 'SOC 2 Type II', clause: 'CC6.1 & CC6.8 Controls' },
                { title: 'NIST CSF 2.0', clause: 'GV.OC-03 & RS.AN-01' },
                { title: 'India DPDP Act', clause: 'Sec 6 & Sec 8 Governance' },
              ].map((std, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-center">
                  <div className="font-bold text-xs text-orange-400">{std.title}</div>
                  <div className="text-[11px] text-stone-400 font-mono mt-0.5">{std.clause}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center relative z-10">
        <div className="p-10 sm:p-14 rounded-3xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 shadow-2xl">
          <ShieldCheck size={48} className="text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Deploy AI Exception Governance In Your Enterprise
          </h2>
          <p className="text-slate-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light">
            Available as a Dedicated On-Premises Appliance, Private Cloud Tenant, or Air-Gapped High-Security Package.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://exceptionmgr.cybravions.online"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all cursor-pointer"
            >
              <span>Access Live Cloud App</span>
              <ExternalLink size={14} />
            </a>

            <button
              onClick={() => {
                cyberAudio.playClick();
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  setCurrentView('home');
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-stone-800 dark:hover:bg-stone-750 border border-slate-300 dark:border-stone-700 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* PDF Sample Preview Modal */}
      <AnimatePresence>
        {showPdfModal && (
          <div
            onClick={() => {
              cyberAudio.playClick();
              setShowPdfModal(false);
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[85vh] rounded-3xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-slate-900 dark:text-white shadow-2xl p-6 sm:p-8 overflow-y-auto cursor-default"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-stone-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-orange-500" />
                  <span className="font-bold text-base sm:text-lg">
                    CYBRAVION Security Exception Compliance Certificate
                  </span>
                </div>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-stone-800 text-xs font-semibold text-slate-600 dark:text-stone-300 hover:text-red-500 transition-colors"
                >
                  Close (ESC)
                </button>
              </div>

              {/* Sample PDF Sheet Representation */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-stone-950 border border-slate-200 dark:border-stone-800 text-xs space-y-4 font-sans">
                {/* Header Row */}
                <div className="flex justify-between items-start border-b border-slate-200 dark:border-stone-800 pb-3">
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">CYBRAVION SOLUTIONS</span>
                    <p className="text-[10px] text-slate-500 font-mono">Enterprise Risk &amp; Governance Division</p>
                  </div>
                  <div className="text-right font-mono text-[10px]">
                    <div className="text-orange-500 font-bold">CERT-EX-2026-00492</div>
                    <div className="text-slate-400">{new Date().toISOString().split('T')[0]}</div>
                  </div>
                </div>

                {/* Section 1: Exception Details */}
                <div>
                  <span className="font-bold text-slate-700 dark:text-stone-300 block mb-1 uppercase tracking-wider text-[10px]">
                    1. Exception Details
                  </span>
                  <div className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-slate-800 dark:text-stone-200">
                    <p className="font-mono text-[11px] leading-relaxed">{description}</p>
                    <div className="flex gap-4 mt-2 text-[10px] text-slate-500">
                      <span><strong>Business Unit:</strong> {businessUnit}</span>
                      <span><strong>Duration:</strong> {durationDays} Days</span>
                    </div>
                  </div>
                </div>

                {/* Section 2: Deterministic Risk Assessment */}
                <div>
                  <span className="font-bold text-slate-700 dark:text-stone-300 block mb-1 uppercase tracking-wider text-[10px]">
                    2. Risk Calculation &amp; Score
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                    <div className="p-2 rounded bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800">
                      <span className="text-slate-400 block">Criticality</span>
                      <span className="font-bold text-slate-800 dark:text-stone-100">{assetCriticality}</span>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800">
                      <span className="text-slate-400 block">Biz Impact</span>
                      <span className="font-bold text-slate-800 dark:text-stone-100">{businessImpact}</span>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800">
                      <span className="text-slate-400 block">Compliance</span>
                      <span className="font-bold text-slate-800 dark:text-stone-100">{complianceImpact}</span>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800">
                      <span className="text-slate-400 block">Threat Exp</span>
                      <span className="font-bold text-slate-800 dark:text-stone-100">{threatExposure}</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Approver Signature Block */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold block text-[11px]">Audit Sign-off Verified</span>
                      <span className="text-[10px] font-mono">Approver: {calculatedRisk.approverRole}</span>
                    </div>
                    <div className="text-right font-mono text-[9px]">
                      <div>STATUS: APPROVED WITH CONTROLS</div>
                      <div className="text-emerald-600 dark:text-emerald-400">HASH: sha256:7f9a2b...4c8e</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Dismiss Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
