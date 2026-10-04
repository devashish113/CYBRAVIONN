import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  Building2, 
  UserCheck, 
  ChevronDown,
  Sparkles,
  Lock,
  Clock,
  Landmark
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../../utils/cyberAudio';

interface DpdpComplianceServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const DpdpComplianceServicePage: React.FC<DpdpComplianceServiceProps> = ({
  setCurrentView,
  onOpenConsultation
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const statutoryPillars = [
    {
      title: 'Consent & Multi-Lingual Notices (Section 5 & 6)',
      desc: 'Formulating clear, itemized consent notices available in English and all 22 languages specified in the Eighth Schedule to the Constitution of India. Setting up granular consent tracking and verifiable consent withdrawal.',
      icon: FileText
    },
    {
      title: 'Data Principal Rights Automation (Section 11 – 14)',
      desc: 'Building automated engineering workflows for Right to Access information, Right to Correction and Erasure of personal data, Right of Grievance Redressal, and Right to Nominate in the event of death or incapacity.',
      icon: UserCheck
    },
    {
      title: 'Significant Data Fiduciary (SDF) Governance (Section 10)',
      desc: 'Guidance on Data Protection Officer (DPO) appointment (based in India), independent statutory Data Auditors, Data Protection Impact Assessments (DPIAs), and periodic compliance audits.',
      icon: Landmark
    },
    {
      title: 'Children’s Data & Age Verification (Section 9)',
      desc: 'Ensuring verifiable parental consent before processing any personal data of individuals under 18 years. Enforcing absolute statutory prohibitions against behavioral tracking and targeted advertising aimed at children.',
      icon: Lock
    },
    {
      title: 'CERT-In 6-Hour Incident Reporting Alignment',
      desc: 'Integrating incident triage SOPs with the statutory mandatory 6-hour cybersecurity incident reporting window prescribed under CERT-In Directions No. 20(3)/2022-CERT-In alongside DPDP Data Protection Board alerts.',
      icon: Clock
    },
    {
      title: 'Cross-Border Data Transfer Scoping (Section 16)',
      desc: 'Auditing international data flows against the Central Government’s negative list of restricted jurisdictions to ensure lawful cross-border storage and cloud compute compliance.',
      icon: Scale
    }
  ];

  const penaltySchedule = [
    { violation: 'Failure to take reasonable security safeguards to prevent personal data breach', penalty: 'Up to ₹250 Crores', severity: 'Critical' },
    { violation: 'Failure to notify Data Protection Board of India & affected Data Principals of a breach', penalty: 'Up to ₹200 Crores', severity: 'Critical' },
    { violation: 'Breach of additional obligations in relation to children’s data (Section 9)', penalty: 'Up to ₹200 Crores', severity: 'High' },
    { violation: 'Breach of additional obligations of Significant Data Fiduciaries (Section 10)', penalty: 'Up to ₹150 Crores', severity: 'High' },
    { violation: 'Breach of general terms and duties under the Act', penalty: 'Up to ₹50 Crores', severity: 'Moderate' }
  ];

  const faqs = [
    {
      q: 'Who is required to comply with the DPDP Act 2023 in India?',
      a: 'The Act applies to any organization that processes digital personal data within the territory of India (where data is collected in digital form or digitized subsequently). It also has extraterritorial scope, applying to businesses outside India that offer goods or services to Data Principals within India.'
    },
    {
      q: 'What is a "Significant Data Fiduciary" (SDF) and how do I know if my company qualifies?',
      a: 'The Central Government designates certain Data Fiduciaries as "Significant Data Fiduciaries" based on factors such as the volume and sensitivity of personal data processed, risk of harm to Data Principals, impact on sovereignty and integrity of India, risk to electoral democracy, and state security. SDFs face higher compliance mandates, including mandatory DPO appointments and annual DPIAs.'
    },
    {
      q: 'How does the DPDP Act interact with CERT-In 6-hour reporting guidelines?',
      a: 'Under CERT-In directives, cybersecurity incidents (such as unauthorized access, data leaks, ransomware, and identity theft) must be reported to CERT-In within 6 hours of discovery. In parallel, Section 8(6) of the DPDP Act mandates informing the Data Protection Board of India and each affected individual about any personal data breach. CYBRAVION unifies these incident response playbooks to prevent contradictory disclosures.'
    },
    {
      q: 'How does CYBRAVION help Indian enterprises prepare for DPDP Act enforcement?',
      a: 'We provide an end-to-end statutory readiness program: Data Discovery & Mapping, Consent Manager Architecture Review, DPIA execution, Data Protection Officer (DPO) as a Service, Employee Data Privacy Training, and technical security hardening (encryption, masking, access control).'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Personal Data Protection (DPDP) Act 2023 Compliance Advisory',
    serviceType: 'Regulatory Compliance & Privacy Advisory',
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
    areaServed: [
      { '@type': 'Country', 'name': 'India' },
      { '@type': 'Place', 'name': 'Worldwide' }
    ],
    description: 'Turnkey DPDP Act 2023 compliance, Data Protection Officer (DPO) advisory, consent manager workflows, and CERT-In 6-hour reporting alignment in New Delhi, India. Prevent penalties up to ₹250 Crores.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'DPDP Act Compliance Offerings',
      itemListElement: [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'DPDP Act Data Discovery & Gap Analysis' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Consent Notice & Multi-lingual Workflow Architecture' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Data Protection Officer (DPO) Advisory Services' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'CERT-In 6-Hour Incident Response Playbook Setup' } }
      ]
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>DPDP Act 2023 Compliance &amp; Indian Regulatory Advisory | CYBRAVION Solutions</title>
        <meta name="description" content="Turnkey DPDP Act 2023 compliance consulting in Delhi NCR &amp; India. Data Fiduciary readiness, consent architecture, DPO advisory, CERT-In alignment, and penalty prevention." />
        <link rel="canonical" href="https://cybravions.com/dpdp-compliance" />
        <meta property="og:title" content="DPDP Act 2023 Compliance &amp; Indian Regulatory Advisory | CYBRAVION" />
        <meta property="og:description" content="Safeguard your Indian business against DPDP Act 2023 penalties up to ₹250 Crores. Consent management, DPO advisory, and CERT-In compliance from New Delhi." />
        <meta property="og:url" content="https://cybravions.com/dpdp-compliance" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500 dark:text-stone-400">
          <ol className="flex items-center space-x-2">
            <li>
              <button 
                type="button" 
                onClick={() => setCurrentView?.('home')} 
                className="hover:text-emerald-500 transition-colors"
              >
                Home
              </button>
            </li>
            <li>/</li>
            <li>Services</li>
            <li>/</li>
            <li className="text-emerald-600 dark:text-emerald-400 font-medium">DPDP Act 2023 Compliance</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-20 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <Scale className="w-4 h-4" />
            <span>Digital Personal Data Protection Act (Act No. 22 of 2023)</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-orange-500 bg-clip-text text-transparent">DPDP Act 2023</span> Compliance &amp; Regulatory Governance
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-stone-300 max-w-3xl leading-relaxed mb-8">
            Ensure total statutory compliance with India&apos;s Digital Personal Data Protection Act 2023. CYBRAVION guides Data Fiduciaries, fintechs, healthcare providers, and global enterprises to implement consent architectures, automate Data Principal rights, and prevent statutory penalties of up to ₹250 Crores.
          </p>

          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onOpenConsultation?.();
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Schedule Free DPDP Readiness Review</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#penalty-matrix"
              className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-stone-900/80 border border-slate-300 dark:border-stone-800 text-slate-800 dark:text-stone-200 font-semibold hover:bg-slate-200 dark:hover:bg-stone-800 transition-colors"
            >
              View Statutory Penalties
            </a>
          </div>
        </header>

        {/* Statutory Penalty Risk Callout */}
        <section id="penalty-matrix" className="mb-24">
          <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-stone-900/80 border-2 border-red-500/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  DPDP Act 2023 Schedule of Monetary Penalties
                </h2>
                <p className="text-xs text-slate-500 dark:text-stone-400">
                  Adjudicated by the Data Protection Board of India under Section 33 of the Act.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-stone-800 text-slate-500 dark:text-stone-400">
                    <th className="py-3 pr-4 font-semibold">Violation Type</th>
                    <th className="py-3 px-4 font-semibold text-right">Statutory Maximum Penalty</th>
                    <th className="py-3 pl-4 font-semibold text-center">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-stone-800/60">
                  {penaltySchedule.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-stone-800/30 transition-colors">
                      <td className="py-3.5 pr-4 text-slate-800 dark:text-stone-200 font-medium">{row.violation}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-red-600 dark:text-red-400">{row.penalty}</td>
                      <td className="py-3.5 pl-4 text-center">
                        <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                          row.severity === 'Critical' 
                            ? 'bg-red-500/10 text-red-600 dark:text-red-400' 
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>
                          {row.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6 Key Pillars of DPDP Compliance */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 font-bold block mb-2">
              Statutory Implementation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              The 6 Pillars of Enterprise DPDP Act Compliance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statutoryPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-stone-900/60 border border-slate-200 dark:border-stone-800 hover:border-emerald-500/40 transition-colors shadow-sm"
                >
                  <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit rounded-xl mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cross-Regulatory Alignment */}
        <section className="mb-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 text-white border border-stone-800">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-3">
              Unified Regulatory Matrix
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Integrated Indian Cyber Governance
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto text-sm leading-relaxed">
              We harmonize your compliance obligations across multiple regulatory bodies to ensure a unified defensive posture without conflicting departmental processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800">
              <h3 className="font-bold text-lg text-emerald-400 mb-2">DPDP Act (2023)</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Applies to all Data Fiduciaries. Focuses on data principal rights, consent notices, children&apos;s privacy, and preventing breaches of digital personal records.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800">
              <h3 className="font-bold text-lg text-amber-400 mb-2">CERT-In Directives (2022)</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Mandates 6-hour incident reporting for 20 specified cyber event types, 180-day ICT system log retention within Indian jurisdiction, and NTP synchronization.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800">
              <h3 className="font-bold text-lg text-blue-400 mb-2">RBI &amp; SEBI Cyber Frameworks</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Stringent mandates for banks, NBFCs, stock brokers, and fintechs covering continuous vulnerability management, SOC telemetry, and board oversight.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions (DPDP Act India)
            </h2>
            <p className="text-slate-600 dark:text-stone-400">
              Essential facts regarding DPO requirements, consent managers, penalties, and audit deadlines.
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
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-emerald-500 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-emerald-500' : 'text-slate-400'}`} />
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
        <section className="text-center py-16 px-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-orange-500/10 border border-emerald-500/20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Protect Your Organization from DPDP Act Liabilities
          </h2>
          <p className="text-slate-600 dark:text-stone-300 max-w-2xl mx-auto mb-8 text-base">
            Consult with CYBRAVION’s regulatory cybersecurity counsel in New Delhi to audit your data flows, draft compliant consent notices, and establish verified Data Fiduciary governance today.
          </p>
          <button
            type="button"
            onClick={() => {
              cyberAudio.playClick();
              onOpenConsultation?.();
            }}
            className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/30 transition-transform transform hover:-translate-y-0.5"
          >
            Schedule DPDP Compliance Consultation
          </button>
        </section>
      </div>
    </div>
  );
};
