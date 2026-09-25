import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2, Building2, AlertTriangle, Scale } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

export type LegalTabType = 'privacy' | 'terms' | 'vdp' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTabType;
  isDarkMode?: boolean;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
  isDarkMode = true,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className={`w-full max-w-4xl rounded-3xl border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${
            isDarkMode
              ? 'bg-[#090e1a] border-blue-500/30 text-stone-100 shadow-[0_25px_60px_rgba(0,0,0,0.95)]'
              : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          }`}
        >
          {/* Modal Header */}
          <div className={`p-6 border-b flex items-center justify-between gap-4 ${
            isDarkMode ? 'border-stone-800 bg-[#070b14]' : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-500/15 text-orange-500 border border-orange-500/25">
                <Scale size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-orange-500 font-bold block">
                  Legal &amp; Regulatory Compliance
                </span>
                <h2 className="text-lg sm:text-xl font-bold">
                  CYBRAVION Governance Center
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border-stone-700'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-slate-950 border-slate-300'
              }`}
            >
              <X size={18} />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className={`flex border-b px-6 overflow-x-auto gap-2 py-3 ${
            isDarkMode ? 'border-stone-800 bg-[#060a12]' : 'border-slate-200 bg-slate-100/70'
          }`}>
            {[
              { id: 'privacy' as LegalTabType, label: 'Privacy Policy (DPDP & GDPR)', icon: Lock },
              { id: 'terms' as LegalTabType, label: 'Terms of Service', icon: FileText },
              { id: 'vdp' as LegalTabType, label: 'Vulnerability Disclosure (VDP)', icon: ShieldCheck },
              { id: 'cookies' as LegalTabType, label: 'Security & Cookie Policy', icon: CheckCircle2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    cyberAudio.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-md'
                      : isDarkMode
                      ? 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm leading-relaxed font-light">
            {activeTab === 'privacy' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Privacy Policy &amp; Data Protection Mandate
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-500 font-semibold">
                    DPDP Act 2023 &amp; GDPR Compliant
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-stone-300">
                  <strong>Effective Date:</strong> January 2026 | <strong>Entity:</strong> CYBRAVION SOLUTIONS PRIVATE LIMITED (CIN: U62099DL2026PTC470901)
                </p>

                <p className="text-slate-700 dark:text-stone-300">
                  At <strong>CYBRAVION SOLUTIONS PRIVATE LIMITED</strong>, protecting the privacy, confidentiality, and integrity of your corporate and personal telemetry is fundamental to our security engineering philosophy. This policy governs data collected via <code>cybravions.com</code> and related sovereign security platforms.
                </p>

                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-orange-500 font-mono">1. Information Collection &amp; Zero Telemetry Principle</h4>
                  <p className="text-xs text-slate-600 dark:text-stone-300">
                    We only collect business contact details voluntarily provided during advisory requests (Name, Corporate Email, Phone, Organization Scope). We <strong>never</strong> sell, broker, or monetize user data. All enterprise AI appliances operate air-gapped with zero external model telemetry.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-orange-500 font-mono">2. Legal Grounds &amp; Compliance Alignment</h4>
                  <p className="text-xs text-slate-600 dark:text-stone-300">
                    Processing aligns with the Digital Personal Data Protection (DPDP) Act 2023 (India), General Data Protection Regulation (EU GDPR), and NIST Privacy Framework.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-orange-500 font-mono">3. Data Retention &amp; Rights</h4>
                  <p className="text-xs text-slate-600 dark:text-stone-300">
                    You hold complete rights to access, rectify, or demand cryptographic erasure of your personal records at any time by contacting our Data Protection Officer at <a href="mailto:support@cybravions.com" className="text-blue-500 font-semibold">support@cybravions.com</a>.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Terms of Engagement &amp; Service
                  </h3>
                  <span className="text-[11px] font-mono text-orange-500 font-semibold">
                    Governed by Indian Law &amp; MCA Jurisdiction
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-orange-500 font-mono">1. Scope of Cybersecurity Advisory</h4>
                  <p className="text-xs text-slate-600 dark:text-stone-300">
                    All technical security assessments, penetration testing (VAPT), and red teaming services are conducted strictly under mutually executed Non-Disclosure Agreements (NDA) and formal Rules of Engagement (RoE).
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-orange-500 font-mono">2. Intellectual Property &amp; Sovereign Blueprints</h4>
                  <p className="text-xs text-slate-600 dark:text-stone-300">
                    All proprietary neural weights, simulation sandbox algorithms, and trademarked logos belonging to CYBRAVION SOLUTIONS PRIVATE LIMITED remain exclusive corporate property.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-orange-500 font-mono">3. Limitation of Liability</h4>
                  <p className="text-xs text-slate-600 dark:text-stone-300">
                    While our offensive methodologies uncover deep architectural vulnerabilities, cybersecurity is an evolving discipline. CYBRAVION operates under industry-standard liability caps as defined in formal client Master Services Agreements (MSAs).
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'vdp' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Vulnerability Disclosure Program (VDP / RFC 9116)
                  </h3>
                  <span className="text-[11px] font-mono text-blue-500 font-semibold">
                    Responsible Disclosure
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-stone-300">
                  CYBRAVION welcomes responsible security research. If you believe you have identified a vulnerability across our public infrastructure, please review our guidelines:
                </p>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2 font-mono text-xs">
                  <div><strong>Security Contact:</strong> mailto:support@cybravions.com</div>
                  <div><strong>RFC 9116 Endpoint:</strong> https://cybravions.com/.well-known/security.txt</div>
                  <div><strong>Safe Harbor:</strong> Guaranteed protection from legal action for ethical researchers operating within RoE.</div>
                </div>

                <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-stone-300">
                  <li>Do not compromise personal data or destroy live production infrastructure.</li>
                  <li>Provide sufficient reproduction details and verified proof-of-concept (PoC).</li>
                  <li>Allow 90 days for remediation before public coordinated disclosure.</li>
                </ul>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Security &amp; Cookie Telemetry Policy
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-500 font-semibold">
                    Zero Third-Party Trackers
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-stone-300">
                  <code>cybravions.com</code> uses only essential technical cookies necessary for session state, theme preferences (Dark/Light mode), and CSRF token security.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-stone-800 bg-slate-50 dark:bg-stone-900/40">
                    <div className="font-mono font-bold text-xs text-orange-500">Essential Security Cookies</div>
                    <div className="text-[11px] text-slate-500 dark:text-stone-400 mt-1">Required for CSRF defense and load balancing.</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-stone-800 bg-slate-50 dark:bg-stone-900/40">
                    <div className="font-mono font-bold text-xs text-blue-500">Zero Advertising Trackers</div>
                    <div className="text-[11px] text-slate-500 dark:text-stone-400 mt-1">No cross-site tracking pixels or behavioral data brokers.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className={`p-4 sm:p-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDarkMode ? 'border-stone-800 bg-[#070b14]' : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-stone-400">
              <Building2 size={14} className="text-orange-500" />
              <span>CIN: U62099DL2026PTC470901 · Registered in New Delhi, India</span>
            </div>

            <button
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Close Policy
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
