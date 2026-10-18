import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Layers, 
  ShieldCheck, 
  Shield,
  Clock, 
  DollarSign, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../../utils/cyberAudio';
import { PageHeader } from '../../components/PageHeader';

interface Iso27001ServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const Iso27001ServicePage: React.FC<Iso27001ServiceProps> = ({
  setCurrentView,
  isDarkMode = true,
  onOpenConsultation
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<'startup' | 'growth' | 'enterprise'>('startup');

  const tiers = {
    startup: {
      name: 'Startup & Tech Scale-Up',
      headcount: '1 – 50 Employees',
      timeline: '8 – 12 Weeks',
      scope: 'Single cloud environment (AWS/GCP), SaaS product architecture, core engineering & DevOps policies.',
      features: [
        'Complete Gap Assessment against ISO/IEC 27001:2022',
        'Customized ISMS Policy Manual & Statement of Applicability (SoA)',
        'Cloud security control mapping & automated evidence setup',
        'Internal Audit execution & mock Stage 1 audit readiness',
        'Direct auditor liaison during certification audit'
      ]
    },
    growth: {
      name: 'Growth Stage & Mid-Market',
      headcount: '51 – 250 Employees',
      timeline: '12 – 16 Weeks',
      scope: 'Multi-office or hybrid workforce, multi-cloud infrastructure, third-party vendor risk management.',
      features: [
        'All Startup tier deliverables plus multi-site scoping',
        'Full Risk Assessment Matrix across physical, people, and digital assets',
        'Formal Employee Security Awareness & Internal Auditor training',
        'Vendor Risk Management & Business Continuity Plan (BCP) simulation',
        'Stage 1 & Stage 2 audit representation with accredited registrar'
      ]
    },
    enterprise: {
      name: 'Enterprise & BFSI',
      headcount: '250+ Employees',
      timeline: '16 – 24 Weeks',
      scope: 'Complex on-prem / hybrid data centers, regulatory cross-mapping (RBI, SEBI, DPDP, SOC 2).',
      features: [
        'Enterprise-wide ISMS program design & governance council setup',
        'Integrated Management System (ISO 27001 + ISO 27701 + ISO 22301)',
        'Comprehensive supply chain threat modeling & dark web vendor monitoring',
        'Executive committee presentations & board reporting dashboards',
        '100% Guaranteed audit pass warranty with dedicated lead consultant'
      ]
    }
  };

  const newControls2022 = [
    { name: 'Threat Intelligence (A.5.7)', desc: 'Collection and analysis of cyber threat intel to mitigate proactive threats.' },
    { name: 'Information Security for Cloud Services (A.5.23)', desc: 'Processes for acquisition, use, management and exit from cloud platforms.' },
    { name: 'ICT Readiness for Business Continuity (A.8.6)', desc: 'Ensuring digital assets recover within RTO and RPO objectives.' },
    { name: 'Physical Security Monitoring (A.7.4)', desc: 'Continuous surveillance and detection in sensitive enterprise facilities.' },
    { name: 'Configuration Management (A.8.9)', desc: 'Baseline configurations and automated drift enforcement across systems.' },
    { name: 'Information Deletion (A.8.10)', desc: 'Compliance with DPDP Act & GDPR right to erasure and secure media sanitization.' },
    { name: 'Data Masking (A.8.11)', desc: 'Pseudonymization and masking techniques to protect PII in non-production.' },
    { name: 'Data Leakage Prevention (A.8.12)', desc: 'DLP measures across endpoints, email, cloud storage, and networks.' },
    { name: 'Monitoring Activities (A.8.16)', desc: 'Network, system, and application behavioral anomaly detection.' },
    { name: 'Web Filtering (A.8.23)', desc: 'Restricting access to unauthorized external websites to prevent malware.' },
    { name: 'Secure Coding (A.8.28)', desc: 'Secure software development lifecycle (SSDLC) principles and gating.' }
  ];

  const faqs = [
    {
      q: 'How much does ISO 27001 certification cost in India?',
      a: 'The total cost of ISO 27001 certification consists of two parts: CYBRAVION’s consulting/readiness fee (which covers gap analysis, policy creation, risk assessments, and internal audits) and the external certification registrar body fee (BSI, DNV, TÜV, Bureau Veritas). For startups, consulting typically starts from ₹1.5L to ₹3.5L, while registrar audit fees vary based on organization employee headcount and audit days.'
    },
    {
      q: 'What is the realistic timeline to get ISO 27001 certified?',
      a: 'For startups and mid-market SaaS companies with focused cloud infrastructure, an expedited timeline of 8 to 12 weeks is achievable with our automated templates and dedicated guidance. Larger enterprises with physical offices and multi-tiered IT architectures typically require 16 to 24 weeks.'
    },
    {
      q: 'What is the difference between ISO 27001:2013 and ISO 27001:2022?',
      a: 'ISO 27001:2022 reorganized the Annex A security controls from 114 controls across 14 clauses down to 93 controls organized into 4 categories: Organizational, People, Physical, and Technological. It also introduced 11 completely new modern security controls, including Threat Intelligence, Cloud Security, and Data Leakage Prevention.'
    },
    {
      q: 'Does ISO 27001 satisfy the requirements of India’s DPDP Act 2023?',
      a: 'ISO 27001 establishes the foundational Information Security Management System (ISMS) required to protect digital personal data under the DPDP Act 2023. When combined with ISO 27701 (Privacy Information Management), it provides complete compliance coverage for Data Fiduciaries in India.'
    },
    {
      q: 'Does CYBRAVION issue the ISO 27001 certificate directly?',
      a: 'Under ISO/IEC accreditation rules, consulting firms cannot issue accredited ISO certificates to avoid conflict of interest. CYBRAVION acts as your end-to-end consulting and implementation partner, guaranteeing audit readiness and sitting alongside you during Stage 1 and Stage 2 audits conducted by accredited registrars like BSI, DNV, TÜV SÜD, or Bureau Veritas.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'ISO/IEC 27001:2022 Certification & Consulting Services',
    serviceType: 'Information Security Management System (ISMS) Consulting',
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
    description: 'Turnkey ISO 27001:2022 certification advisory in India. Gap analysis, Statement of Applicability (SoA), risk treatment, internal audit, and guaranteed registrar audit clearance.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ISO 27001 Implementation Packages',
      itemListElement: [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'ISO 27001 Gap Analysis' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'ISO 27001:2022 Transition Consulting' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Internal ISMS Auditor Training' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Stage 1 & Stage 2 Audit Representation' } }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>ISO 27001 Certification & Consulting in India | CYBRAVION Solutions</title>
        <meta name="description" content="Guaranteed ISO 27001:2022 certification consulting in Delhi NCR & India. Fast-track 8-week ISMS implementation roadmap, cost breakdown, gap analysis, and Stage 2 audit readiness." />
        <link rel="canonical" href="https://cybravions.com/iso-27001" />
        <meta property="og:title" content="ISO 27001 Certification & Consulting in India | CYBRAVION" />
        <meta property="og:description" content="Turnkey ISO 27001:2022 implementation in India. Gap assessment, custom policies, risk registers, internal audit, and 100% audit pass guarantee." />
        <meta property="og:url" content="https://cybravions.com/iso-27001" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Subtle Architectural Vignette */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)' }}
      />

      <PageHeader
        kicker="Turnkey ISMS Implementation & Audit Assurance"
        title="ISO 27001:2022 Certification &"
        italicTitle="Consulting in India."
        description="Win high-value enterprise contracts and prove world-class data protection. CYBRAVION guides Indian and global businesses from initial gap assessment to full ISO/IEC 27001:2022 certification in as little as 8 to 12 weeks with zero business disruption."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Services', onClick: () => setCurrentView?.('home') },
          { label: 'ISO 27001 Consulting', active: true }
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
              <span>Book Free ISO 27001 Gap Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#roadmap"
              className="btn-tactile-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>View 4-Phase Roadmap</span>
            </a>
          </div>
        }
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16">
        {/* Value Highlights */}
        <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { val: '8 – 12 Wks', label: 'Fast-Track Delivery', sub: 'Zero Workflow Interruption', num: '01' },
            { val: '100%', label: 'First-Time Pass Rate', sub: 'Guaranteed Audit Readiness', num: '02' },
            { val: '93', label: '2022 Annex A Controls', sub: 'Full Modern Standard Scope', num: '03' },
            { val: 'Zero', label: 'Policy Template Fluff', sub: 'Tailored Native ISMS Policies', num: '04' },
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

        {/* 4-Phase Roadmap */}
        <section id="roadmap" className="mb-24">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-bold block mb-2">
              Structured Milestones
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              The 4-Phase ISO 27001:2022 Implementation Roadmap
            </h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              {
                phase: 'Phase 1',
                title: 'Gap Analysis & ISMS Scoping',
                timeline: 'Weeks 1 – 2',
                desc: 'Comprehensive evaluation of existing security controls, IT workflows, and cloud environments against ISO/IEC 27001:2022 requirements. Defining the ISMS boundary, context of the organization, and leadership commitment documentation.'
              },
              {
                phase: 'Phase 2',
                title: 'Risk Assessment & Statement of Applicability (SoA)',
                timeline: 'Weeks 3 – 5',
                desc: 'Asset-based cybersecurity risk assessment mapping threats and vulnerabilities. Drafting customized InfoSec policies, procedures, and the comprehensive Statement of Applicability (SoA) covering all 93 Annex A controls.'
              },
              {
                phase: 'Phase 3',
                title: 'Control Implementation & Internal Audit',
                timeline: 'Weeks 6 – 8',
                desc: 'Deploying operational controls (MFA, DLP, access control lists, BCP testing). Conducting mandatory employee security training and executing an independent formal Internal ISMS Audit with full Management Review Meetings (MRM).'
              },
              {
                phase: 'Phase 4',
                title: 'Stage 1 & Stage 2 Certification Audit',
                timeline: 'Weeks 9 – 12',
                desc: 'Liaison with external certification registrars (BSI, DNV, TÜV). Our senior consultants represent your security posture during documentation reviews (Stage 1) and evidence interviews (Stage 2) until the certificate is officially issued.'
              }
            ].map((step, idx) => (
              <div 
                key={idx}
                className="p-6 md:p-8 rounded-2xl bg-white dark:bg-stone-900/70 border border-slate-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500/50 transition-colors shadow-sm"
              >
                <div className="md:w-1/4">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                    {step.phase}
                  </span>
                  <div className="text-sm font-semibold text-slate-500 dark:text-stone-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>{step.timeline}</span>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11 New Controls of 2022 Edition */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400 font-bold block mb-2">
              Modern Threat Alignment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Mastering the 11 New ISO 27001:2022 Controls
            </h2>
            <p className="text-slate-600 dark:text-stone-400 max-w-2xl mx-auto">
              The 2022 update addresses modern cloud, threat intelligence, and data privacy threats. We implement automated frameworks for all 11 newly mandatory controls:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newControls2022.map((ctrl, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900/50 border border-slate-200 dark:border-stone-800 hover:border-blue-500/40 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-base mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
                  <span>{ctrl.name}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">
                  {ctrl.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Tiers & Timeline Estimator */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Transparent Implementation Packages
            </h2>
            <p className="text-slate-600 dark:text-stone-400">
              Select your organization profile to view tailored scope, timeline, and deliverables.
            </p>
          </div>

          {/* Tier Selector */}
          <div className="flex justify-center gap-3 mb-8">
            {(['startup', 'growth', 'enterprise'] as const).map(tier => (
              <button
                key={tier}
                type="button"
                onClick={() => {
                  cyberAudio.playHover();
                  setSelectedTier(tier);
                }}
                className={`px-6 py-3 rounded-xl font-bold text-sm capitalize transition-all ${
                  selectedTier === tier
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white dark:bg-stone-900 text-slate-700 dark:text-stone-300 border border-slate-200 dark:border-stone-800 hover:bg-slate-100 dark:hover:bg-stone-800'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Tier Content */}
          <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 shadow-xl max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-stone-800 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{tiers[selectedTier].name}</h3>
                <span className="text-sm text-slate-500 dark:text-stone-400">{tiers[selectedTier].headcount}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-xl text-sm font-semibold">
                <Calendar className="w-4 h-4" />
                <span>Typical Timeline: {tiers[selectedTier].timeline}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-stone-300 mb-6 text-base">
              <strong>Environment Scope:</strong> {tiers[selectedTier].scope}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
              Included Deliverables &amp; Consulting Support:
            </h4>
            <ul className="space-y-3 mb-8">
              {tiers[selectedTier].features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-stone-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-stone-800">
              <span className="text-xs text-slate-500 dark:text-stone-400">
                Registrar audit fees are paid directly to the accredited certification body with no markup.
              </span>
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenConsultation?.();
                }}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors"
              >
                Request Custom Proposal
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions (ISO 27001 India)
            </h2>
            <p className="text-slate-600 dark:text-stone-400">
              Everything you need to know about costs, audit stages, registrars, and ongoing maintenance.
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
                    id={`iso-faq-trigger-${idx}`}
                    aria-expanded={isOpen}
                    aria-controls={`iso-faq-answer-${idx}`}
                    onClick={() => {
                      cyberAudio.playHover();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-blue-500 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown aria-hidden="true" className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div 
                      id={`iso-faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`iso-faq-trigger-${idx}`}
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
              <Shield className="w-3.5 h-3.5" />
              <span>Accredited Certification Advisory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-neutral-900 dark:text-white mb-4 tracking-tight">
              Achieve ISO 27001:2022 Certification with <span className="italic font-normal">Complete Confidence</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              Speak with a Lead ISO 27001 Auditor at CYBRAVION in New Delhi to review your current posture and receive a roadmap and fixed-price quote today.
            </p>
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onOpenConsultation?.();
              }}
              className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Schedule Free ISO 27001 Readiness Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
