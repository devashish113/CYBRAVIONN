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
  CheckCircle2
} from 'lucide-react';

interface ThreatVector {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  weight: number;
  recommendedService: string;
}

export const ThreatRadar3D: React.FC = () => {
  const [selectedVectors, setSelectedVectors] = useState<string[]>(['cloud', 'api', 'ai']);
  const [industry, setIndustry] = useState<string>('fintech');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

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
    setSelectedVectors((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((v) => v !== id) : prev) : [...prev, id]
    );
  };

  const triggerScan = () => {
    setIsScanning(true);
    setScanProgress(0);
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
    <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent">
      {/* Subtle depth lighting accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs uppercase tracking-widest font-semibold mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-ping" />
            Interactive 3D Threat Engine
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Simulate Your Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-orange-600 dark:from-blue-400 dark:via-stone-100 dark:to-orange-400">Risk Surface</span>
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-base md:text-lg max-w-2xl mt-4 font-light">
            Configure your infrastructure vectors and industry profile to calculate real-time threat exposure and custom remediation roadmaps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Vector Configuration */}
          <div className="lg:col-span-7 bg-white/90 dark:bg-stone-900/60 backdrop-blur-xl border border-slate-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Select Threat Vectors</h3>
                  <p className="text-xs text-slate-500 dark:text-stone-400 font-light">Toggle the surface areas active in your organization</p>
                </div>

                {/* Industry Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 dark:text-stone-400 uppercase tracking-wider font-medium">Industry:</span>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="bg-white dark:bg-stone-950 border border-slate-300 dark:border-stone-700 text-blue-700 dark:text-blue-400 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {vectors.map((vec) => {
                  const isSelected = selectedVectors.includes(vec.id);
                  const Icon = vec.icon;
                  return (
                    <button
                      key={vec.id}
                      onClick={() => toggleVector(vec.id)}
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                          : 'bg-slate-50/80 dark:bg-stone-950/60 border-slate-200 dark:border-stone-800/80 hover:border-slate-300 dark:hover:border-stone-700 opacity-70 dark:opacity-60'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-slate-200 dark:bg-stone-800 text-slate-600 dark:text-stone-400'}`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">{vec.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-stone-400 truncate font-medium">{vec.category}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-stone-700'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-stone-950" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-stone-400 font-medium">
                {selectedVectors.length} vectors active • Dynamic risk telemetry
              </span>
              <button
                onClick={triggerScan}
                disabled={isScanning}
                className="px-5 py-2.5 rounded-xl bg-blue-500/15 dark:bg-blue-500/20 border border-blue-400 dark:border-blue-500/40 text-blue-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <RefreshCw size={14} className={isScanning ? 'animate-spin' : ''} />
                {isScanning ? 'Recalibrating...' : 'Recalibrate Scan'}
              </button>
            </div>
          </div>

          {/* Right Column: 3D Telemetry Radar & Score */}
          <div className="lg:col-span-5 bg-white/90 dark:bg-stone-900/60 backdrop-blur-xl border border-slate-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* 3D Radar Scanning Overlay */}
            <div className="relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center my-2">
              {/* Radar Circles */}
              <div className="absolute inset-0 rounded-full border border-blue-500/20" />
              <div className="absolute inset-8 rounded-full border border-blue-500/25" />
              <div className="absolute inset-16 rounded-full border border-blue-500/30" />
              <div className="absolute inset-24 rounded-full border border-blue-500/40" />

              {/* Crosshair Lines */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-blue-500/20" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-blue-500/20" />

              {/* 3D Rotating Radar Sweep */}
              <div 
                className="absolute inset-0 rounded-full origin-center animate-[spin_4s_linear_infinite] pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.4) 0deg, rgba(59, 130, 246, 0) 60deg, transparent 360deg)',
                }}
              />

              {/* Core Score Display */}
              <div className="relative z-10 flex flex-col items-center justify-center bg-white/95 dark:bg-stone-950/90 border-2 border-blue-500 rounded-full w-28 h-28 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{exposureScore}%</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">Threat Index</span>
              </div>
            </div>

            {/* Results & Actionable Remediation */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-stone-400 uppercase tracking-wider font-bold">Risk Level</span>
                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${
                  exposureScore > 75 
                    ? 'text-orange-600 dark:text-orange-400 border-orange-400 dark:border-orange-500/40 bg-orange-50 dark:bg-orange-500/10' 
                    : 'text-blue-600 dark:text-blue-400 border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/10'
                }`}>
                  {readinessGrade}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-600 dark:text-stone-400 block mb-1.5 uppercase tracking-wider font-bold">Required Framework Alignments</span>
                <div className="flex flex-wrap gap-2">
                  {currentIndustry.compliance.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5 text-xs bg-slate-100 dark:bg-stone-950 border border-slate-200 dark:border-stone-700 px-2.5 py-1 rounded-lg text-slate-800 dark:text-stone-200 font-medium">
                      <CheckCircle2 size={12} className="text-blue-600 dark:text-blue-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:shadow-[0_0_35px_rgba(249,115,22,0.5)] transition-all mt-4 cursor-pointer"
              >
                <span>Request Custom Remediation Scope</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
