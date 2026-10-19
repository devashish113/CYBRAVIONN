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

interface Soc2ServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const Soc2ServicePage: React.FC<Soc2ServiceProps> = ({
  setCurrentView,
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
      q: 'Can an Indian cybersecurity firm issue a SOC 2 report?',
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
    description: 'Fast-track SOC 2 Type I & Type II compliance advisory in India. Gap assessments, automated evidence gathering, AICPA Trust Services Criteria scoping, and licensed CPA audit facilitation.',
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
    <div className="pt-24 min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>SOC 2 Type II Compliance &amp; Readiness Advisory | CYBRAVION Solutions</title>
        <meta name="description" content="Fast-track your SOC 2 Type I &amp; Type II compliance in India. AICPA Trust Services Criteria scoping, gap assessment, automated evidence, and CPA audit readiness." />
        <link rel="canonical" href="https://cybravions.com/soc-2" />
        <meta property="og:title" content="SOC 2 Type II Compliance &amp; Readiness Advisory | CYBRAVION" />
        <meta property="og:description" content="Win enterprise US &amp; EU clients with SOC 2 compliance. End-to-end readiness, policy generation, and CPA auditor facilitation from CYBRAVION New Delhi." />
        <meta property="og:url" content="https://cybravions.com/soc-2" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500 dark:text-stone-400">
          <ol className="flex items-center space-x-2">
            <li>
              <button 
                type="button" 
                onClick={() => setCurrentView?.('home')} 
                className="hover:text-indigo-500 transition-colors"
              >
                Home
              </button>
            </li>
            <li>/</li>
            <li>Services</li>
            <li>/</li>
            <li className="text-indigo-600 dark:text-indigo-400 font-medium">SOC 2 Compliance</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-20 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <FileCheck2 className="w-4 h-4" />
            <span>Enterprise SaaS Trust &amp; Assurance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">SOC 2 Type I &amp; Type II</span> Readiness Advisory
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-stone-300 max-w-3xl leading-relaxed mb-8">
            Close enterprise deals with US and European clients. CYBRAVION prepares SaaS providers, fintechs, and cloud startups for frictionless SOC 2 audits under AICPA Trust Services Criteria with automated evidence workflows and seasoned CPA auditor representation.
          </p>

          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onOpenConsultation?.();
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Schedule Free SOC 2 Readiness Call</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#comparison"
              className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-stone-900/80 border border-slate-300 dark:border-stone-800 text-slate-800 dark:text-stone-200 font-semibold hover:bg-slate-200 dark:hover:bg-stone-800 transition-colors"
            >
              Type I vs Type II
            </a>
          </div>
        </header>

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
            <div className="p-8 rounded-3xl bg-white dark:bg-stone-900/70 border border-slate-200 dark:border-stone-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-stone-800 text-slate-600 dark:text-stone-400">
                    Fast Baseline
                  </span>
                  <span className="text-xs text-slate-500 dark:text-stone-400">4 – 6 Weeks</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  SOC 2 Type I
                </h3>
                <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed mb-6">
                  Assesses whether your security controls are properly designed at a specific point in time. Ideal for seed and Series A startups needing immediate security proof to unlock their first enterprise pilots.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Evaluates design suitability of security controls',
                    'Single date audit verification (no observation period)',
                    'Fastest path to an official CPA attestation report',
                    'Fulfills early-stage enterprise vendor security questionnaires'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-stone-300 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
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
                className="w-full py-3 rounded-xl bg-slate-100 dark:bg-stone-800 hover:bg-slate-200 dark:hover:bg-stone-700 text-slate-900 dark:text-white font-semibold text-sm transition-colors"
              >
                Scope Type I Readiness
              </button>
            </div>

            {/* Type II Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-500/5 to-purple-500/5 dark:bg-stone-900/90 border-2 border-indigo-500/50 shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-md">
                Enterprise Gold Standard
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    Comprehensive
                  </span>
                  <span className="text-xs text-slate-500 dark:text-stone-400">3 – 6 Months Window</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  SOC 2 Type II
                </h3>
                <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed mb-6">
                  Assesses whether controls were operating effectively throughout a multi-month period. Required by Fortune 500 enterprises, banks, and major procurement teams worldwide.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Evaluates operational effectiveness over 3, 6, or 12 months',
                    'Tests continuous log retention, patch cadence & employee onboarding',
                    'Gold standard proof demanded by US & EU procurement',
                    'Significantly reduces vendor security questionnaire friction'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-stone-300 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
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
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/30 transition-colors"
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
                    onClick={() => {
                      cyberAudio.playHover();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-indigo-500 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 dark:text-stone-300 text-sm leading-relaxed border-t border-slate-100 dark:border-stone-800/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="text-center py-16 px-8 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-orange-500/10 border border-indigo-500/20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Unlock Enterprise Enterprise Deals with a SOC 2 Report
          </h2>
          <p className="text-slate-600 dark:text-stone-300 max-w-2xl mx-auto mb-8 text-base">
            Discuss your system architecture with CYBRAVION’s compliance advisors to map your Trust Services Criteria and initiate fast-track readiness today.
          </p>
          <button
            type="button"
            onClick={() => {
              cyberAudio.playClick();
              onOpenConsultation?.();
            }}
            className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-transform transform hover:-translate-y-0.5"
          >
            Schedule Free SOC 2 Scoping Call
          </button>
        </section>
      </div>
    </div>
  );
};
