import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Cpu, 
  Cloud, 
  Globe, 
  Lock, 
  Brain, 
  ArrowRight, 
  RefreshCw, 
  FileCheck, 
  CheckCircle2, 
  Zap, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface ThreatVector {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  weight: number;
  recommendedService: string;
}

interface ThreatRadar3DProps {
  onOpenAuditModal?: () => void;
}

export const ThreatRadar3D: React.FC<ThreatRadar3DProps> = ({ onOpenAuditModal }) => {
  const [selectedVectors, setSelectedVectors] = useState<string[]>(['cloud', 'api', 'ai']);
  const [industry, setIndustry] = useState<string>('fintech');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [isSimulatingAttack, setIsSimulatingAttack] = useState(false);
  const [attackNeutralized, setAttackNeutralized] = useState(false);

  const vectors: ThreatVector[] = [
    { id: 'cloud', name: 'Multi-Cloud Infrastructure', category: 'AWS/GCP/Azure', icon: Cloud, weight: 18, recommendedService: 'Cloud Security Architecture' },
    { id: 'api', name: 'Microservices & Public APIs', category: 'Zero Trust & Gateways', icon: Globe, weight: 16, recommendedService: 'VAPT & Penetration Testing' },
    { id: 'ai', name: 'AI Models & LLM Integrations', category: 'Data & Model Safety', icon: Brain, weight: 22, recommendedService: 'AI Risk Governance' },
    { id: 'identity', name: 'Identity & Access (IAM)', category: 'SSO / MFA / Privileged', icon: Lock, weight: 14, recommendedService: 'Cyber Security GRC' },
    { id: 'endpoints', name: 'Remote Endpoints & Devices', category: 'EDR & Zero Trust', icon: Cpu, weight: 15, recommendedService: 'Threat Intelligence & OSINT' },
    { id: 'supply', name: 'Third-Party Vendors & Supply Chain', category: 'Vendor Risk', icon: ShieldCheck, weight: 15, recommendedService: 'ISO 27001 & SOC 2 Compliance' },
  ];

  const industries: Record<string, { multiplier: number; compliance: string[]; priority: string }> = {
    fintech: { multiplier: 1.25, compliance: ['SOC 2 Type II', 'ISO 27001', 'PCI-DSS v4.0'], priority: 'API Security & Zero-Day Resilience' },
    healthcare: { multiplier: 1.3, compliance: ['HIPAA', 'ISO 27001', 'DPDP Act'], priority: 'PHI Protection & Cloud Governance' },
    saas: { multiplier: 1.15, compliance: ['SOC 2 Type II', 'ISO 27001', 'GDPR'], priority: 'Continuous VAPT & Multi-Tenant Isolation' },
    ecommerce: { multiplier: 1.1, compliance: ['PCI-DSS', 'ISO 27001', 'DPDP Act'], priority: 'Payment Gateway Security & DDoS Defense' },
    government: { multiplier: 1.4, compliance: ['NIST CSF', 'ISO 27001', 'FedRAMP'], priority: 'Sovereign Data Governance & Red Teaming' },
  };

  const toggleVector = (id: string) => {
    cyberAudio.playClick();
    setSelectedVectors((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((v) => v !== id) : prev) : [...prev, id]
    );
  };

  const triggerScan = () => {
    cyberAudio.playRadarSweep();
    setIsScanning(true);
    setScanProgress(0);
  };

  const triggerAttackSimulation = () => {
    cyberAudio.playRadarSweep();
    setIsSimulatingAttack(true);
    setAttackNeutralized(false);
    setTimeout(() => {
      setIsSimulatingAttack(false);
      setAttackNeutralized(true);
      cyberAudio.playShieldActivate();
    }, 1800);
  };

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  // Calculate Exposure & Preparedness Score
  const currentIndustry = industries[industry] || industries.fintech;
  const rawExposure = selectedVectors.reduce((acc, vId) => {
    const item = vectors.find((v) => v.id === vId);
    return acc + (item ? item.weight : 0);
  }, 0);

  const exposureScore = Math.min(98, Math.round(rawExposure * currentIndustry.multiplier));
  const readinessGrade = exposureScore > 75 ? 'Critical Focus Required' : exposureScore > 50 ? 'Moderate Hardening' : 'Baseline Managed';

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent border-t border-neutral-200 dark:border-white/[0.08]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-white/[0.03] border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300 text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Interactive Threat Surface Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Simulate Your Enterprise <span className="text-neutral-500 dark:text-neutral-400 font-normal">Risk Surface.</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-2xl mt-4 font-normal leading-relaxed">
            Configure your infrastructure vectors and industry profile to calculate real-time threat exposure and verify sovereign defense posture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Vector Configuration */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0e1017] border border-neutral-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">Active Infrastructure Vectors</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">Select the attack surfaces present in your environment</p>
                </div>

                {/* Industry Selector */}
                <div className="flex items-center gap-2">
                  <label htmlFor="threat-industry-select" className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-medium">Industry:</label>
                  <select
                    id="threat-industry-select"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    aria-label="Target industry vertical for compliance and risk exposure"
                    className="bg-neutral-50 dark:bg-[#131620] border border-neutral-300 dark:border-white/12 text-neutral-900 dark:text-white text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-neutral-400 dark:focus:border-white/30 shadow-sm cursor-pointer"
                  >
                    <option value="fintech">Fintech & Banking</option>
                    <option value="healthcare">Healthcare & MedTech</option>
                    <option value="saas">Cloud SaaS & Enterprise</option>
                    <option value="ecommerce">E-Commerce & Retail</option>
                    <option value="government">Government & Defense</option>
                  </select>
                </div>
              </div>

              {/* Threat Vector Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8" role="group" aria-label="Infrastructure threat vectors">
                {vectors.map((vec) => {
                  const isSelected = selectedVectors.includes(vec.id);
                  const Icon = vec.icon;
                  return (
                    <button
                      key={vec.id}
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={`${vec.name} vector: ${isSelected ? 'monitored' : 'unmonitored'}`}
                      onClick={() => toggleVector(vec.id)}
                      className={`flex items-center gap-3.5 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-100 dark:bg-white/[0.06] border-neutral-400 dark:border-white/30 text-neutral-950 dark:text-white'
                          : 'bg-neutral-50/50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-white/12'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950' : 'bg-neutral-200/80 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400'}`}>
                        <Icon size={16} aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold truncate">{vec.name}</div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{vec.category}</div>
                      </div>
                      <div aria-hidden="true" className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-neutral-950 bg-neutral-950 dark:border-white dark:bg-white' : 'border-neutral-300 dark:border-white/20'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-950" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                {selectedVectors.length} vectors monitored • Real-time baseline
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={triggerAttackSimulation}
                  disabled={isSimulatingAttack}
                  aria-busy={isSimulatingAttack}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-white/12 bg-neutral-100 dark:bg-white/[0.04] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  <Zap size={14} aria-hidden="true" className={isSimulatingAttack ? 'animate-spin' : ''} />
                  <span>{isSimulatingAttack ? 'Simulating Breach...' : 'Simulate Red Team Breach'}</span>
                </button>
                <button
                  type="button"
                  onClick={triggerScan}
                  disabled={isScanning}
                  aria-busy={isScanning}
                  className="px-4 py-2 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  <RefreshCw size={13} aria-hidden="true" className={isScanning ? 'animate-spin' : ''} />
                  <span>{isScanning ? 'Scanning...' : 'Recalibrate'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Aerospace Telemetry Radar & Score */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0e1017] border border-neutral-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden" role="region" aria-label="Risk Exposure Telemetry">
            
            {/* Live region for status telemetry */}
            <div className="sr-only" role="status" aria-live="polite">
              {isScanning 
                ? `Calibrating threat radar: ${scanProgress}%` 
                : isSimulatingAttack 
                  ? 'Simulating breach vector test...' 
                  : attackNeutralized 
                    ? 'Breach neutralized by sovereign defense systems.' 
                    : `Telemetry active. Enterprise exposure index: ${exposureScore} percent. Risk posture: ${readinessGrade}.`}
            </div>

            {/* Scan Progress Bar (Accessible) */}
            {isScanning && (
              <div 
                role="progressbar" 
                aria-valuenow={scanProgress} 
                aria-valuemin={0} 
                aria-valuemax={100} 
                aria-label="Threat radar scan calibration progress"
                className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mb-2"
              >
                <div 
                  className="h-full bg-amber-500 transition-all duration-75"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            )}

            {/* Minimal Aerospace Telemetry Circle */}
            <div className="relative w-full aspect-square max-w-[260px] mx-auto flex items-center justify-center my-2" aria-hidden="true">
              {/* Radar Rings */}
              <div className="absolute inset-0 rounded-full border border-neutral-200 dark:border-white/[0.08]" />
              <div className="absolute inset-8 rounded-full border border-neutral-200 dark:border-white/[0.08]" />
              <div className="absolute inset-16 rounded-full border border-neutral-200 dark:border-white/[0.08]" />
              <div className="absolute inset-24 rounded-full border border-neutral-200 dark:border-white/[0.08]" />

              {/* Crosshair Lines */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-200 dark:border-t dark:border-white/[0.08]" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-neutral-200 dark:border-l dark:border-white/[0.08]" />

              {/* Minimal Clean Radar Sweep */}
              <div 
                className="absolute inset-0 rounded-full origin-center animate-[spin_5s_linear_infinite] pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(255, 255, 255, 0.12) 0deg, rgba(255, 255, 255, 0.02) 45deg, transparent 180deg)',
                }}
              />

              {/* Core Score Display with Calm Status Feedback */}
              <div className="relative z-10 flex flex-col items-center justify-center bg-white dark:bg-[#131620] border border-neutral-300 dark:border-white/20 rounded-full w-28 h-28 transition-all duration-300 shadow-sm">
                {isSimulatingAttack ? (
                  <>
                    <ShieldAlert size={22} className="text-amber-500 dark:text-amber-400 mb-1" />
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-amber-600 dark:text-amber-400">Testing Vector</span>
                  </>
                ) : attackNeutralized ? (
                  <>
                    <ShieldCheck size={24} className="text-emerald-500 mb-1" />
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">Neutralized</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">{exposureScore}%</span>
                    <span className="text-[9px] uppercase tracking-wider font-medium text-neutral-600 dark:text-neutral-400">Exposure Index</span>
                  </>
                )}
              </div>
            </div>

            {/* Results & Actionable Remediation */}
            <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-semibold">Risk Posture</span>
                <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-white/[0.03]">
                  {readinessGrade}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-neutral-600 dark:text-neutral-400 block mb-2 uppercase tracking-wider font-semibold">Required Regulatory Alignments</span>
                <div className="flex flex-wrap gap-2">
                  {currentIndustry.compliance.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5 text-xs bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] px-2.5 py-1 rounded-lg text-neutral-700 dark:text-neutral-300 font-medium">
                      <CheckCircle2 size={12} aria-hidden="true" className="text-neutral-500 dark:text-neutral-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {onOpenAuditModal && (
                  <button
                    type="button"
                    onClick={onOpenAuditModal}
                    className="py-3 px-4 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer active:scale-[0.99]"
                  >
                    <ShieldCheck size={14} aria-hidden="true" />
                    <span>Run Full Audit</span>
                  </button>
                )}
                <a
                  href="#contact"
                  className="py-3 px-4 rounded-xl border border-neutral-300 dark:border-white/12 bg-white dark:bg-white/[0.04] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-white/[0.08] text-xs font-medium flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer text-center active:scale-[0.99]"
                >
                  <span>Remediation Plan</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


