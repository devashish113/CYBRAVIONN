import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Lock, 
  Server, 
  Globe, 
  Search,
  ExternalLink,
  ChevronDown,
  Layers,
  Award,
  Users,
  Compass,
  FileCheck,
  Check,
  Copy,
  Clock,
  Sparkles
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../../utils/cyberAudio';
import { PageHeader } from '../../components/PageHeader';
import { WaterGlassCard } from '../../components/WaterGlassCard';

interface CybersecurityConsultancyServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const CybersecurityConsultancyServicePage: React.FC<CybersecurityConsultancyServiceProps> = ({
  setCurrentView,
  isDarkMode = true,
  onOpenConsultation
}) => {
  const [activeScope, setActiveScope] = useState<'grc' | 'tprm' | 'scrm' | 'vapt' | 'threat-modeling'>('grc');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText('support@cybravions.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scopeDetails = {
    grc: {
      title: 'Governance, Risk & Compliance (GRC) & ISMS Architecture',
      desc: 'Architecting end-to-end information security management systems (ISMS) tailored to your operational reality. We eliminate compliance theatre, translate abstract regulatory frameworks into concrete engineering policies, and prepare your organization for flawless third-party certification.',
      checklist: [
        'Turnkey ISMS architecture aligned with ISO/IEC 27001:2022 standards',
        'Enterprise Risk Assessment methodology & Risk Treatment Plans (RTP)',
        'Policy framework drafting: Access Control, Incident Response, Cryptography, BCP/DR',
        'Statement of Applicability (SoA) gap analysis and control mapping',
        'Internal audit execution, mock audits, and Stage 1 / Stage 2 readiness verification'
      ]
    },
    tprm: {
      title: 'Third-Party Risk Management (TPRM) & Vendor Tiering',
      desc: 'Securing your extended digital ecosystem. Modern enterprises rely on hundreds of third-party SaaS vendors, cloud service providers, and outsourced partners. We design continuous TPRM lifecycles to detect upstream vulnerabilities before they impact your core data.',
      checklist: [
        'Custom vendor risk assessment questionnaires (SIG, CAIQ, VSA) customized by data tier',
        'Inherent vs. residual risk scoring matrices with automated risk tiering',
        'Continuous third-party security posture monitoring & dark web exposure checks',
        'Vendor contract security clauses review (DPA, SLA, breach notification windows)',
        'Offboarding audits & digital asset deprovisioning governance'
      ]
    },
    scrm: {
      title: 'Supply Chain Risk Management (SCRM) & Software Integrity',
      desc: 'Protecting your proprietary software development lifecycle from compromised dependencies, rogue packages, and supply chain poisoning. We establish end-to-end provenance verification from developer commit to production release.',
      checklist: [
        'Automated Software Bill of Materials (SBOM) generation & dependency vulnerability auditing',
        'Open-source license compliance & supply chain tampering detection',
        'CI/CD pipeline hardening against malicious code injection and credential leakage',
        'Cryptographic artifact signing (Sigstore, Cosign) and container integrity validation',
        'Supplier security audits for hardware, firmware, and specialized tech vendors'
      ]
    },
    vapt: {
      title: 'Full-Scope Penetration Testing (VAPT & WAPT)',
      desc: 'Adversary emulation conducted by certified offensive practitioners. We identify and chain vulnerabilities across web applications, REST/GraphQL APIs, mobile clients, cloud infrastructure, and internal networks before attackers do.',
      checklist: [
        'Deep manual exploitation covering OWASP Top 10 (2021/2025) and SANS Top 25',
        'Business logic flaw exploitation, privilege escalation, and stateful session bypasses',
        'REST, GraphQL & gRPC API security testing with authentication token manipulation',
        'Zero false-positive reporting with reproducible proof-of-concept (PoC) code',
        'Complimentary 60-day re-test to formally certify remediated findings'
      ]
    },
    'threat-modeling': {
      title: 'Threat Modeling & Secure Architecture Reviews',
      desc: 'Proactive security engineering embedded directly in the design phase. Using structured frameworks like STRIDE, PASTA, and attack trees, we uncover architectural weaknesses before code is written or infrastructure deployed.',
      checklist: [
        'Structured STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation) analysis',
        'Data Flow Diagramming (DFD) and trust boundary identification',
        'Risk-ranked threat matrices with tailored compensating control recommendations',
        'Zero-trust cloud architecture validation across AWS, Azure, and GCP enclaves',
        'Architectural design reviews for critical fintech, healthtech, and enterprise SaaS platforms'
      ]
    }
  };

  const frameworks = [
    { name: 'ISO/IEC 27001:2022', category: 'Global Standard', desc: 'Comprehensive Information Security Management System implementation & audit readiness.' },
    { name: 'DPDP Act 2023', category: 'Data Privacy Mandate', desc: 'Data Fiduciary compliance, consent architecture, and Data Protection Board alignment.' },
    { name: 'SOC 2 Type I & II', category: 'AICPA Trust Criteria', desc: 'Security, Availability, and Confidentiality controls validation for enterprise SaaS procurement.' },
    { name: 'CERT-In Directives', category: 'Statutory Cyber Agency', desc: '6-hour mandatory cyber incident reporting protocols, NTP synchronization, and log retention.' },
    { name: 'OWASP ASVS & WAPT', category: 'Application Security', desc: 'Standardized application verification levels and deep adversary emulation standards.' },
    { name: 'NIST CSF 2.0', category: 'Enterprise Governance', desc: 'Govern, Identify, Protect, Detect, Respond, and Recover risk governance lifecycle.' }
  ];

  const deliverables = [
    {
      title: 'Executive Risk Dossier',
      desc: 'C-level synthesis presenting organizational cyber risk in business impact terms, financial exposure quantification, and board-ready status summaries.'
    },
    {
      title: 'Technical Remediation Matrix',
      desc: 'Itemized engineering ledger with CVSS v3.1 severities, reproduction steps, working PoCs, and framework-specific code remediation recipes.'
    },
    {
      title: 'Attestation of Compliance',
      desc: 'Formal signed attestation document detailing testing boundaries, methodologies, and clearance status for institutional investors and enterprise clients.'
    },
    {
      title: 'Practice Lead Debrief',
      desc: 'Direct consultation session with our senior cybersecurity practice leads to walk engineering teams through prioritization and mitigation strategies.'
    }
  ];

  const faqs = [
    {
      q: 'What is the core focus of CYBRAVION’s Cybersecurity Consultancy practice?',
      a: 'We provide strategic, research-driven cybersecurity advisory spanning Governance, Risk & Compliance (GRC), Third-Party Risk Management (TPRM), Supply Chain Risk Management (SCRM), full-scope Vulnerability Assessment and Penetration Testing (VAPT), and STRIDE threat modeling. We work as an integrated advisory partner to help B2B and B2G organizations protect critical assets and satisfy demanding enterprise procurement audits.'
    },
    {
      q: 'How does CYBRAVION help organizations comply with the DPDP Act 2023 and CERT-In mandates?',
      a: 'We evaluate your data processing architecture against the Digital Personal Data Protection Act 2023, establish Data Fiduciary workflows, audit cross-border data transfer policies, and implement 6-hour CERT-In incident reporting readiness with compliant 180-day log retention infrastructure.'
    },
    {
      q: 'Do your consultants work under Non-Disclosure Agreements (NDA)?',
      a: 'Yes. Before any scoping data or architectural details are shared, we execute a comprehensive Mutual Non-Disclosure Agreement (NDA). All client data and audit findings are handled in air-gapped enclaves with strict zero data retention policies.'
    },
    {
      q: 'Can CYBRAVION help us prepare for ISO 27001 or SOC 2 audits?',
      a: 'Absolutely. We offer complete turnkey readiness programs for both ISO/IEC 27001:2022 and SOC 2 Type I/II, covering initial gap assessments, policy development, technical control implementation, internal audits, and direct liaison with accredited certification bodies.'
    },
    {
      q: 'How quickly can we initiate an advisory or penetration testing engagement?',
      a: 'We can scope requirements and deploy our senior cybersecurity practitioners within 24 to 48 hours following NDA execution and scoping agreement.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cybersecurity Consultancy & GRC Advisory Services',
    serviceType: 'Cybersecurity Consulting, VAPT, TPRM & Regulatory Advisory',
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
      { '@type': 'Place', 'name': 'Worldwide' }
    ],
    description: 'Enterprise Cybersecurity Consultancy. GRC, TPRM, SCRM, VAPT, WAPT, Threat Modelling, ISO 27001, and statutory compliance advisory.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cybersecurity Consultancy Portfolio',
      itemListElement: [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Governance, Risk & Compliance (GRC) Advisory' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Third-Party Risk Management (TPRM)' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Supply Chain Risk Management (SCRM)' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'VAPT & WAPT Penetration Testing' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'STRIDE Threat Modeling & Architecture Review' } }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>Cybersecurity Consultancy & GRC Services | CYBRAVION Solutions</title>
        <meta name="description" content="Enterprise cybersecurity consultancy. GRC, TPRM, SCRM, VAPT, WAPT, Threat Modeling, ISO 27001, and statutory compliance advisory." />
        <link rel="canonical" href="https://cybravions.com/services/cybersecurity-consultancy" />
        <meta property="og:title" content="Cybersecurity Consultancy & GRC Services | CYBRAVION Solutions" />
        <meta property="og:description" content="Strategic cybersecurity consulting: GRC, Third-Party Risk Management (TPRM), Supply Chain Security (SCRM), VAPT, and Threat Modeling." />
        <meta property="og:url" content="https://cybravions.com/services/cybersecurity-consultancy" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Background Architectural Vignette */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)' }}
      />

      <PageHeader
        kicker="Strategic Advisory & Offensive Security Authority"
        title="Enterprise Cybersecurity Consultancy &"
        italicTitle="GRC Advisory."
        description="Comprehensive cybersecurity consultancy engineered for enterprise resilience. We synthesize Governance, Risk & Compliance (GRC), Third-Party Risk Management (TPRM), Supply Chain Risk Management (SCRM), full-scope VAPT, and threat modeling into an authoritative defensive posture."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Services', onClick: () => setCurrentView?.('home') },
          { label: 'Cybersecurity Consultancy', active: true }
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
              <span>Consult an Advisor & Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#scopes"
              className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25 transition-all text-slate-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
            >
              Explore Practice Areas
            </a>
          </div>
        }
      />

      {/* Trust & Authority Metrics Ribbon */}
      <section className="relative z-10 py-12 px-6 border-y border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">100%</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">In-House Practitioners</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">0%</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Customer Data Retention</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">48 Hr</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Rapid Mobilization Window</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">Strict NDA</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Institutional Guarantee</div>
          </div>
        </div>
      </section>

      {/* Practice Areas / Scope Breakdown */}
      <section id="scopes" className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-white/10 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
            Core Advisory Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Structured Consultancy Scopes</h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-stone-400 max-w-2xl mx-auto mt-3">
            Select an advisory scope to review technical execution blueprints, auditing methodologies, and verified deliverables.
          </p>
        </div>

        {/* Scope Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(
            [
              { id: 'grc', label: 'GRC & ISMS', icon: ShieldCheck },
              { id: 'tprm', label: 'TPRM Vendor Risk', icon: Users },
              { id: 'scrm', label: 'SCRM Supply Chain', icon: Layers },
              { id: 'vapt', label: 'VAPT & Pentesting', icon: Search },
              { id: 'threat-modeling', label: 'Threat Modeling', icon: Compass }
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeScope === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setActiveScope(tab.id);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-stone-400 hover:text-black dark:hover:text-white border border-slate-200/60 dark:border-white/[0.06]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scope Detail Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/70 dark:bg-[#0c0d12]/80 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-xl">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-neutral-900 dark:text-white">
              {scopeDetails[activeScope].title}
            </h3>
            <p className="text-slate-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
              {scopeDetails[activeScope].desc}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-200/70 dark:border-white/10">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold mb-3">
                Key Technical Inclusions & Deliverables:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {scopeDetails[activeScope].checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/[0.05]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-stone-300 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/70 dark:border-white/10">
              <div className="text-xs text-slate-500 dark:text-stone-400">
                Ready to scope requirements under a bilateral mutual NDA?
              </div>
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenConsultation?.();
                }}
                className="btn-tactile-primary px-6 py-2.5 rounded-full text-xs font-semibold text-white cursor-pointer"
              >
                Request Scoping Briefing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Regulatory Frameworks */}
      <section className="relative z-10 py-16 px-6 bg-slate-50/60 dark:bg-white/[0.01] border-y border-slate-200/80 dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Regulatory Frameworks & Standards</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 mt-2 max-w-xl mx-auto">
              Our consultancy methodologies are architected to align with global and enterprise statutory benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((fw, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#0c0d12] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-stone-400">
                    {fw.category}
                  </span>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-3 mb-2">{fw.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">{fw.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold tracking-tight">Tangible Enterprise Deliverables</h2>
          <p className="text-sm text-slate-600 dark:text-stone-400 mt-2 max-w-xl mx-auto">
            Actionable artifacts delivered to support both executive board governance and hands-on engineering remediation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverables.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono font-bold flex items-center justify-center mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialized Practice Sub-Links */}
      <section className="relative z-10 py-16 px-6 bg-slate-50/60 dark:bg-white/[0.01] border-y border-slate-200/80 dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Explore Specialized Practice Pages</h2>
              <p className="text-xs text-slate-500 dark:text-stone-400">Direct access to individual practice dossiers and compliance execution playbooks.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'VAPT & Ethical Hacking', desc: 'Web, API, Mobile & Network Pentesting', view: 'vapt' },
              { title: 'ISO 27001 Certification', desc: 'Turnkey ISMS Audit Readiness in 8-12 Wks', view: 'iso-27001' },
              { title: 'SOC 2 Type I & II', desc: 'AICPA Trust Criteria for Enterprise SaaS', view: 'soc-2' },
              { title: 'DPDP Act 2023 Compliance', desc: 'Data Fiduciary & DPO Advisory', view: 'dpdp-compliance' }
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  cyberAudio.playClick();
                  setCurrentView?.(p.view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left p-5 rounded-2xl bg-white dark:bg-[#0c0d12] border border-slate-200 dark:border-white/10 hover:border-neutral-950 dark:hover:border-white transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:underline">{p.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-black dark:group-hover:text-white transition-transform" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-stone-400">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 mt-2">
            Answers regarding engagement models, NDA guarantees, and advisory lifecycles.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playClick();
                    setOpenFaq(isOpen ? null : idx);
                  }}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed border-t border-slate-200/50 dark:border-white/5 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative z-10 py-16 px-6 max-w-5xl mx-auto mb-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
            Protect Critical Assets & Validate Posture.
          </h2>
          <p className="text-neutral-400 dark:text-neutral-600 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Connect directly with CYBRAVION's senior cybersecurity practice leads to review threat exposure, establish compliance roadmaps, and scope requirements under mutual NDA.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onOpenConsultation?.();
              }}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-200 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-800 transition-all cursor-pointer shadow-lg"
            >
              Consult an Advisor & Scope Requirements
            </button>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-6 py-3.5 rounded-full text-xs font-mono font-semibold border border-white/20 dark:border-black/20 hover:border-white/40 dark:hover:border-black/40 transition-all cursor-pointer flex items-center gap-2"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied support@cybravions.com' : 'support@cybravions.com'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
