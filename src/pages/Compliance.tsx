import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, FileCheck, CheckCircle2, Server, Key } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../components/PageHeader';
import { WaterGlassCard } from '../components/WaterGlassCard';

interface CompliancePageProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
}

export const CompliancePage: React.FC<CompliancePageProps> = ({
  setCurrentView,
  isDarkMode = true
}) => {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>Trust Center &amp; Compliance Standards | CYBRAVION</title>
        <meta name="description" content="Discover how CYBRAVION secures operations, protects client confidentiality, and aligns with ISO 27001, DPDP Act, and global cybersecurity frameworks." />
      </Helmet>

      {/* Sovereign Editorial Header */}
      <PageHeader
        kicker="Trust Center & Assurance Protocols"
        title="Security &"
        italicTitle="Compliance Standards."
        description="We practice what we preach. Discover how CYBRAVION secures its operations, protects client confidentiality, and adheres to statutory and international security frameworks."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Security & Compliance', active: true }
        ]}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-24">
        {/* Section 1: Security Practices */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
                Foundational Controls
              </span>
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white tracking-tight">
              Our Security <span className="italic font-light text-neutral-500 dark:text-neutral-400">Practices.</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Enterprise-grade security is baked into every layer of our infrastructure and daily operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Secure by Design", desc: "All internal systems are architected following Zero Trust principles, ensuring verified access at every node.", icon: Shield, num: "01" },
              { title: "Continuous Monitoring", desc: "We employ 24/7 endpoint detection and response (EDR) alongside automated vulnerability scanning.", icon: Server, num: "02" },
              { title: "Access Control", desc: "Strict RBAC (Role-Based Access Control) with mandatory MFA and hardware security keys for all staff.", icon: Key, num: "03" }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <WaterGlassCard 
                  key={i}
                  className="p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white w-fit rounded-xl">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-neutral-400">{item.num}</span>
                    </div>
                    <h3 className="font-editorial font-normal text-2xl text-neutral-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-light text-sm">{item.desc}</p>
                  </div>
                </WaterGlassCard>
              );
            })}
          </div>
        </section>

        {/* Section 2: Client Confidentiality */}
        <section className="mb-24 surface-card p-10 sm:p-14 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
                  Client Confidentiality
                </span>
                <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
              <h2 className="font-editorial font-normal text-3xl sm:text-4xl text-neutral-900 dark:text-white mb-6 tracking-tight">
                How We Safeguard Your <span className="italic font-light text-neutral-500 dark:text-neutral-400">Engagement Data.</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed font-light text-sm sm:text-base">
                During VAPT or GRC engagements, we often handle highly sensitive network maps, source code, and compliance data. We treat your data with the highest level of cryptographic confidentiality.
              </p>
              <ul className="space-y-4">
                {[
                  "End-to-end encryption for data in transit (TLS 1.3) and at rest (AES-256).",
                  "Strict data retention policies. Client data is securely wiped post-engagement.",
                  "All assessments are conducted via secure, isolated VPN tunnels.",
                  "Non-Disclosure Agreements (NDAs) are mandatory prior to any scoping."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-100/50 dark:bg-white/[0.02] flex items-center justify-center relative">
                <div className="absolute inset-4 rounded-full border border-amber-500/20" />
                <Lock className="w-20 h-20 text-neutral-400 dark:text-neutral-500" strokeWidth={1} />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Compliance Frameworks */}
        <section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
                Statutory Alignment
              </span>
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white tracking-tight">
              Our Compliance <span className="italic font-light text-neutral-500 dark:text-neutral-400">Approach.</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              We align our operations with the strict frameworks we implement for our enterprise clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="surface-card surface-card-hover rounded-2xl p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    <span className="font-mono text-xs tracking-wider uppercase font-semibold text-amber-600 dark:text-amber-400">FRAMEWORK 01</span>
                  </div>
                  <span className="font-mono text-xs text-neutral-400">ISMS</span>
                </div>
                <h3 className="font-editorial font-normal text-2xl sm:text-3xl text-neutral-900 dark:text-white mb-3">ISO 27001 Alignment</h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-light text-sm">
                  Our internal Information Security Management System (ISMS) mirrors the rigorous requirements of ISO 27001, ensuring that risk assessments, access reviews, and incident response plans are documented, tested, and continuously improved.
                </p>
              </div>
            </div>

            <div className="surface-card surface-card-hover rounded-2xl p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    <span className="font-mono text-xs tracking-wider uppercase font-semibold text-amber-600 dark:text-amber-400">FRAMEWORK 02</span>
                  </div>
                  <span className="font-mono text-xs text-neutral-400">PRIVACY</span>
                </div>
                <h3 className="font-editorial font-normal text-2xl sm:text-3xl text-neutral-900 dark:text-white mb-3">Privacy &amp; DPDP Compliance</h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-light text-sm">
                  We are fully committed to data sovereignty and privacy. We comply with modern privacy frameworks including GDPR and India's DPDP Act 2023, collecting solely data necessary for engagements and guaranteeing client control.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
