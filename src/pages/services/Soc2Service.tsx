import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  FileCheck2, 
  Server, 
  Eye, 
  Clock, 
  ChevronDown,
  Sparkles,
  HelpCircle,
  Building2,
  Database
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../../utils/cyberAudio';
import { PageHeader } from '../../components/PageHeader';

interface Soc2ServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const Soc2ServicePage: React.FC<Soc2ServiceProps> = ({
  setCurrentView,
  isDarkMode = true,
  onOpenConsultation
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const trustCriteria = [
    {
      name: 'Security (Common Criteria)',
      mandatory: true,
      desc: 'Protection of information and systems against unauthorized access, unauthorized disclosure of information, and damage to systems that could compromise availability, integrity, or confidentiality.'
    },
    {
      name: 'Availability',
      mandatory: false,
      desc: 'Accessibility of systems, products, or services as stipulated by a contract or Service Level Agreement (SLA). Focuses on network performance, failover, disaster recovery, and uptime monitoring.'
    },
    {
      name: 'Confidentiality',
      mandatory: false,
      desc: 'Protection of information designated as confidential from unauthorized disclosure during collection, processing, transmission, and disposal (e.g., enterprise intellectual property, financial data).'
    },
    {
      name: 'Processing Integrity',
      mandatory: false,
      desc: 'System processing is complete, valid, accurate, timely, and authorized to meet organization objectives. Critical for fintech, payment processors, and data transformation engines.'
    },
    {
      name: 'Privacy',
      mandatory: false,
      desc: 'Personal information is collected, used, retained, disclosed, and disposed of in conformity with the commitments in the entity’s privacy notice and AICPA Generally Accepted Privacy Principles (GAPP).'
    }
  ];

  const faqs = [
    {
      q: 'What is the main difference between SOC 2 Type I and SOC 2 Type II?',
      a: 'A SOC 2 Type I report evaluates whether your security controls are suitably designed at a single specific point in time. A SOC 2 Type II report evaluates whether those controls operated effectively over a minimum testing period (typically 3, 6, or 12 months). Most enterprise and US/European clients require a SOC 2 Type II report before signing procurement contracts.'
    },
    {
      q: 'How long does it take to obtain a SOC 2 Type II report?',
      a: 'Preparation and technical remediation typically take 4 to 8 weeks. Once controls are operational, the monitoring observation window begins (usually 3 to 6 months for first-time audits). The CPA audit and report drafting take another 3 to 4 weeks. With CYBRAVION’s accelerated readiness process, total time to final report is streamlined significantly.'
    },
    {
      q: 'Can external cybersecurity advisory firms issue a SOC 2 report?',
      a: 'SOC 2 reports can only be issued by an independent licensed Certified Public Accountant (CPA) accredited by the American Institute of CPAs (AICPA). CYBRAVION acts as your end-to-end readiness advisory partner, preparing your systems, automating evidence collection, and partnering with vetted AICPA CPA firms to deliver your final audit report without markup.'
    },
    {
      q: 'Does CYBRAVION integrate with automated compliance tools (like Vanta, Drata, Sprinto)?',
      a: 'Yes. We are tool-agnostic. Whether you use Vanta, Drata, Sprinto, or manual cloud evidence repositories, our security engineers configure your integrations, remediate failing automated tests, draft compliant policies, and oversee evidence validation.'
    },
    {
      q: 'How does SOC 2 compare to ISO 27001?',
      a: 'ISO 27001 is an internationally recognized standard focused on establishing and maintaining an Information Security Management System (ISMS). SOC 2 is an American standard (AICPA) specifically tailored for technology and cloud service providers storing customer data in the cloud. Many enterprise SaaS vendors pursue both simultaneously to cover global markets.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SOC 2 Type I & Type II Readiness Advisory Services',
    serviceType: 'SOC 2 Compliance & Cloud Security Assurance',
    provider: {
      '@type': 'Corporation',
      name: 'CYBRAVION SOLUTIONS PRIVATE LIMITED',
      url: 'https://cybravions.com',
      telephone: '+91-7258880881',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'H. IN.KH.NO.293 S/F Western Marg, Saidulajab',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi',
        postalCode: '110030',
        addressCountry: 'IN'
      }
    },
    areaServed: 'Worldwide',
    description: 'Fast-track SOC 2 Type I & Type II compliance advisory. Gap assessments, automated evidence gathering, AICPA Trust Services Criteria scoping, and licensed CPA audit facilitation.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SOC 2 Advisory Offerings',
      itemListElement: [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'SOC 2 Scoping & Readiness Assessment' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'SOC 2 Type I Audit Preparation' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'SOC 2 Type II Continuous Observation Advisory' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'AICPA CPA Audit Liaison' } }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>SOC 2 Type II Compliance &amp; Readiness Advisory | CYBRAVION Solutions</title>
        <meta name="description" content="Fast-track your SOC 2 Type I &amp; Type II compliance. AICPA Trust Services Criteria scoping, gap assessment, automated evidence, and CPA audit readiness." />
        <link rel="canonical" href="https://cybravions.com/soc-2" />
        <meta property="og:title" content="SOC 2 Type II Compliance &amp; Readiness Advisory | CYBRAVION" />
        <meta property="og:description" content="Win enterprise US &amp; EU clients with SOC 2 compliance. End-to-end readiness, policy generation, and CPA auditor facilitation from CYBRAVION." />
        <meta property="og:url" content="https://cybravions.com/soc-2" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Subtle Architectural Vignette */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)' }}
      />

      <PageHeader
        kicker="Enterprise SaaS Trust & Assurance"
        title="SOC 2 Type I & Type II"
        italicTitle="Readiness & Advisory."
        description="Close enterprise deals with US and European clients. CYBRAVION prepares SaaS providers, fintechs, and cloud startups for frictionless SOC 2 audits under AICPA Trust Services Criteria with automated evidence workflows and seasoned CPA auditor representation."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Services', onClick: () => setCurrentView?.('home') },
          { label: 'SOC 2 Compliance', active: true }
        ]}
        actions={
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onOpenConsultation?.();
              }}
              className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Schedule Free SOC 2 Readiness Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#comparison"
              className="btn-tactile-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Type I vs Type II</span>
            </a>
          </div>
        }
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16">
        {/* Value Highlights */}
        <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { val: '4 – 6 Wks', label: 'Fast-Track Type I', sub: 'Rapid Market Entry', num: '01' },
            { val: '100%', label: 'Audit Pass Rate', sub: 'CPA Attestation Success', num: '02' },
            { val: '5 TSC', label: 'AICPA Framework', sub: 'Complete Trust Scope', num: '03' },
            { val: 'Automated', label: 'Continuous Evidence', sub: 'Tooling & Integration', num: '04' },
          ].map((item, idx) => (
            <div key={idx} className="surface-card p-6 flex flex-col justify-between text-left relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-semibold tracking-widest">{item.num}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500/60" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white mb-1">{item.val}</div>
                <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{item.label}</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              SOC 2 Type I vs. SOC 2 Type II
            </h2>
            <p className="text-slate-600 dark:text-stone-400 max-w-2xl mx-auto">
              Understand the two levels of SOC 2 attestation and choose the right milestone for your enterprise sales pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Type I Card */}
            <div className="surface-card p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Fast Baseline
                  </span>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">4 – 6 Weeks</span>
                </div>
                <h3 className="text-2xl font-editorial font-normal text-neutral-900 dark:text-white mb-3">
                  SOC 2 Type I
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">
                  Assesses whether your security controls are properly designed at a specific point in time. Ideal for seed and Series A startups needing immediate security proof to unlock their first enterprise pilots.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Evaluates design suitability of security controls',
                    'Single date audit verification (no observation period)',
                    'Fastest path to an official CPA attestation report',
                    'Fulfills early-stage enterprise vendor security questionnaires'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenConsultation?.();
                }}
                className="btn-tactile-outline w-full py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer"
              >
                Scope Type I Readiness
              </button>
            </div>

            {/* Type II Card */}
            <div className="surface-card p-8 rounded-3xl flex flex-col justify-between relative ring-1 ring-amber-500/30">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-widest bg-amber-500 text-black shadow-sm">
                Enterprise Gold Standard
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Comprehensive
                  </span>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">3 – 6 Months Window</span>
                </div>
                <h3 className="text-2xl font-editorial font-normal text-neutral-900 dark:text-white mb-3">
                  SOC 2 Type II
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">
                  Assesses whether controls were operating effectively throughout a multi-month period. Required by Fortune 500 enterprises, banks, and major procurement teams worldwide.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Evaluates operational effectiveness over 3, 6, or 12 months',
                    'Tests continuous log retention, patch cadence & employee onboarding',
                    'Gold standard proof demanded by US & EU procurement',
                    'Significantly reduces vendor security questionnaire friction'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenConsultation?.();
                }}
                className="btn-tactile-primary w-full py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer text-white"
              >
                Scope Type II Roadmap
              </button>
            </div>
          </div>
        </section>

        {/* Trust Services Criteria */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 font-bold block mb-2">
              AICPA Trust Framework
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              The 5 Trust Services Criteria (TSC)
            </h2>
            <p className="text-slate-600 dark:text-stone-400 max-w-2xl mx-auto">
              We help you determine precisely which Trust Services Criteria apply to your business model to avoid unnecessary audit overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustCriteria.map((tsc, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900/60 border border-slate-200 dark:border-stone-800 hover:border-indigo-500/40 transition-colors shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {tsc.name}
                  </h3>
                  {tsc.mandatory ? (
                    <span className="text-[10px] uppercase font-extrabold tracking-wider bg-red-500/10 text-red-500 px-2.5 py-0.5 rounded-full border border-red-500/20">
                      Mandatory
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-extrabold tracking-wider bg-slate-100 dark:bg-stone-800 text-slate-500 px-2.5 py-0.5 rounded-full">
                      Optional
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">
                  {tsc.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5-Step Methodology */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Our 5-Step SOC 2 Delivery Methodology
            </h2>
            <p className="text-slate-600 dark:text-stone-400 max-w-2xl mx-auto">
              From day one to final audit clearance, we guide your engineering, HR, and legal teams through every required evidence step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Scoping & Gap Assessment', desc: 'Identify system boundaries, vendor dependencies, and existing control maturity.' },
              { step: '02', title: 'Policy & GRC Integration', desc: 'Draft customized InfoSec policies and configure automated compliance tooling.' },
              { step: '03', title: 'Technical Remediation', desc: 'Deploy required controls: MFA, encrypted backups, code gating, and vulnerability scans.' },
              { step: '04', title: 'Observation Monitoring', desc: 'Continuous evidence capture across the 3 to 6-month observation window.' },
              { step: '05', title: 'CPA Audit & Attestation', desc: 'Represent your team during CPA interviews and evidence audits to report delivery.' }
            ].map((m, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900/50 border border-slate-200 dark:border-stone-800 relative hover:border-indigo-500/50 transition-colors"
              >
                <div className="text-3xl font-black text-indigo-500/20 mb-2">{m.step}</div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">{m.title}</h3>
                <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions (SOC 2 Advisory)
            </h2>
            <p className="text-slate-600 dark:text-stone-400">
              Clear guidance on AICPA requirements, CPA partnerships, observation periods, and compliance costs.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 overflow-hidden"
                >
                  <button
                    type="button"
                    id={`soc2-faq-trigger-${idx}`}
                    aria-expanded={isOpen}
                    aria-controls={`soc2-faq-answer-${idx}`}
                    onClick={() => {
                      cyberAudio.playHover();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-indigo-500 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown aria-hidden="true" className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div 
                      id={`soc2-faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`soc2-faq-trigger-${idx}`}
                      className="px-6 pb-6 text-slate-700 dark:text-stone-300 text-sm leading-relaxed border-t border-slate-100 dark:border-stone-800/60 pt-4"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="surface-card text-center py-16 px-8 rounded-3xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AICPA TSC Audit Partner</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-neutral-900 dark:text-white mb-4 tracking-tight">
              Unlock Enterprise Deals with a <span className="italic font-normal">SOC 2 Report</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              Discuss your system architecture with CYBRAVION’s compliance advisors to map your Trust Services Criteria and initiate fast-track readiness today.
            </p>
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onOpenConsultation?.();
              }}
              className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Schedule Free SOC 2 Scoping Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
