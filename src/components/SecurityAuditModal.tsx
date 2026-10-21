import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Cloud, 
  Server, 
  Lock, 
  Brain, 
  ArrowRight, 
  Download, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

interface SecurityAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const SecurityAuditModal: React.FC<SecurityAuditModalProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cloudStack, setCloudStack] = useState<'aws' | 'azure' | 'gcp' | 'hybrid' | 'airgap'>('aws');
  const [targetFramework, setTargetFramework] = useState<'iso27001' | 'soc2' | 'nist' | 'hipaa' | 'enterpriseAI'>('iso27001');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  // Close modal on Escape key (WCAG 2.1.2)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGenerate = () => {
    cyberAudio.playRadarSweep();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportReady(true);
      cyberAudio.playShieldActivate();
    }, 1200);
  };

  const handleReset = () => {
    cyberAudio.playClick();
    setStep(1);
    setReportReady(false);
  };

  // Dynamic audit calculations
  const stackMultiplier = cloudStack === 'airgap' ? 1.0 : cloudStack === 'hybrid' ? 0.85 : 0.78;
  const rawScore = Math.round(72 * stackMultiplier);
  const postureGrade = rawScore >= 85 ? 'Optimized' : rawScore >= 70 ? 'Moderate Risk' : 'Critical Remediation Needed';

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-2xl bg-black/80"
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="audit-modal-title"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden transition-all ${
            isDarkMode 
              ? 'bg-stone-900/95 border-stone-800 text-stone-100 shadow-[0_25px_70px_rgba(0,0,0,0.85)]' 
              : 'bg-white border-slate-200 text-slate-900 shadow-[0_25px_70px_rgba(0,0,0,0.15)]'
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-stone-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20" aria-hidden="true">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 id="audit-modal-title" className="text-lg sm:text-xl font-bold">Instant Security Posture Assessment</h3>
                <p className="text-xs text-slate-600 dark:text-stone-400 font-mono">CYBRAVION Security Audit Engine v4.2</p>
              </div>
            </div>
            <button
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              aria-label="Close security posture assessment modal"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {!reportReady ? (
            <div className="space-y-6">
              {/* Step 1: Infrastructure */}
              <div>
                <span id="audit-env-heading" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 block mb-3">
                  1. Select Primary Cloud / Compute Environment
                </span>
                <div role="radiogroup" aria-labelledby="audit-env-heading" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'aws', label: 'AWS Cloud', icon: Cloud },
                    { id: 'azure', label: 'Microsoft Azure', icon: Cloud },
                    { id: 'gcp', label: 'Google Cloud', icon: Cloud },
                    { id: 'hybrid', label: 'Hybrid Multi-Cloud', icon: Server },
                    { id: 'airgap', label: 'Air-Gapped On-Prem', icon: Lock },
                  ].map((item) => {
                    const Icon = item.icon;
                    const selected = cloudStack === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => {
                          cyberAudio.playClick();
                          setCloudStack(item.id as any);
                        }}
                        className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                          selected
                            ? 'bg-blue-500/15 border-blue-500 text-blue-600 dark:text-blue-400 shadow-sm'
                            : 'bg-slate-50 dark:bg-stone-800/60 border-slate-200 dark:border-stone-800 hover:border-slate-300 dark:hover:border-stone-700'
                        }`}
                      >
                        <Icon size={16} aria-hidden="true" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Target Framework */}
              <div>
                <span id="audit-framework-heading" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-stone-300 block mb-3">
                  2. Select Target Compliance / Defense Standard
                </span>
                <div role="radiogroup" aria-labelledby="audit-framework-heading" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'iso27001', label: 'ISO/IEC 27001' },
                    { id: 'soc2', label: 'SOC 2 Type II' },
                    { id: 'nist', label: 'NIST SP 800-53' },
                    { id: 'hipaa', label: 'HIPAA / PHI' },
                    { id: 'enterpriseAI', label: 'Enterprise AI Governance' },
                  ].map((item) => {
                    const selected = targetFramework === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => {
                          cyberAudio.playClick();
                          setTargetFramework(item.id as any);
                        }}
                        className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          selected
                            ? 'bg-purple-500/15 border-purple-500 text-purple-600 dark:text-purple-400 shadow-sm'
                            : 'bg-slate-50 dark:bg-stone-800/60 border-slate-200 dark:border-stone-800 hover:border-slate-300 dark:hover:border-stone-700'
                        }`}
                      >
                        <span>{item.label}</span>
                        {selected && <CheckCircle2 size={14} aria-hidden="true" className="text-purple-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-blue-600 via-sky-500 to-purple-500 hover:from-blue-500 hover:to-purple-400 text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all active:scale-95"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      <span>Synthesizing Posture Matrix...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      <span>Generate Audit Matrix</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6">
              
              {/* Score Display */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-stone-950/80 border border-slate-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 dark:text-stone-400">Calculated Readiness Score</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {rawScore}<span className="text-lg font-normal text-slate-400">/100</span>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
                  Posture: {postureGrade}
                </div>
              </div>

              {/* Actionable Remediation Items */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-stone-300">
                  Top Priority Control Recommendations
                </div>
                {[
                  'Implement Air-Gapped Key Enclave for private AI token stores',
                  'Enforce automated continuous evidence ingestion for ISO 27001 Annex A',
                  'Schedule quarterly external VAPT penetration assessment across API gateways',
                ].map((rec, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-100/80 dark:bg-stone-800/50 border border-slate-200 dark:border-stone-800 flex items-start gap-3 text-xs">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-stone-800">
                <button
                  onClick={handleReset}
                  className="text-xs font-mono text-slate-500 hover:text-slate-800 dark:hover:text-stone-200 underline cursor-pointer"
                >
                  ← Reconfigure Parameters
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href="#contact"
                    onClick={() => {
                      cyberAudio.playClick();
                      onClose();
                    }}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-widest bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-500 hover:to-purple-400 text-white shadow-md text-center cursor-pointer"
                  >
                    Schedule CISO Briefing
                  </a>
                </div>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
