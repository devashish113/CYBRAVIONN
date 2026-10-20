import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Zap, 
  Lock, 
  Server, 
  Cpu, 
  ChevronDown,
  Layers,
  Award,
  Check,
  Copy,
  Code2,
  Workflow,
  Radio,
  FileCheck,
  Sparkles,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../../utils/cyberAudio';
import { PageHeader } from '../../components/PageHeader';

interface ItCyberSolutionsServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const ItCyberSolutionsServicePage: React.FC<ItCyberSolutionsServiceProps> = ({
  setCurrentView,
  isDarkMode = true,
  onOpenConsultation
}) => {
  const [activeSolution, setActiveSolution] = useState<'soc-triage' | 'grc-automation' | 'custom-software' | 'soar-playbooks'>('soc-triage');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText('support@cybravions.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const solutions = {
    'soc-triage': {
      title: 'AI/ML-Driven SOC Alert Triage & Noise Reduction',
      desc: 'Security operations centers drown under thousands of daily alerts, leading to alert fatigue and missed intrusions. Our explainable ML triage models ingest raw telemetry, evaluate behavioral context, suppress false positives by up to 92%, and prioritize high-risk incidents with mathematical transparency.',
      checklist: [
        'Autonomous Tier-1 SIEM alert investigation and contextual severity reassessment',
        'SHAP (SHapley Additive exPlanations) explainability for every algorithmic verdict',
        'Automated MITRE ATT&CK enterprise tactic and technique tagging',
        'Noise suppression algorithms for recurring scheduled jobs and false-positive baseline churn',
        'Seamless bidirectional connector for Splunk, Microsoft Sentinel, Elastic, and QRadar'
      ],
      productLink: { label: 'Explore SOC AI Triage Tool', view: 'soc-ai' }
    },
    'grc-automation': {
      title: 'Automated GRC & Policy Drift Governance Systems',
      desc: 'Ditch manual spreadsheets and static audit folders. We engineer automated GRC workflow platforms that continuously poll cloud APIs, Kubernetes clusters, and identity providers to extract cryptographically verifiable audit evidence in real time.',
      checklist: [
        'Continuous compliance evidence collection across AWS, Azure, GCP, and GitHub',
        'Automated policy exception management with automated expiration & drift alerts',
        'Real-time ISO 27001:2022 and SOC 2 Type II audit readiness dashboarding',
        'Automated risk register calculation utilizing quantitative Monte Carlo simulations',
        'Audit-ready PDF generation and certified auditor portal integration'
      ],
      productLink: { label: 'Explore AI Exception Manager', view: 'exception-manager' }
    },
    'custom-software': {
      title: 'Custom Enterprise Security Software & Microservice Hardening',
      desc: 'Off-the-shelf software rarely fits specialized enterprise security constraints. CYBRAVION develops bespoke security tools, air-gapped forensic appliances, custom telemetry pipelines, and cryptographically isolated microservice gateways.',
      checklist: [
        'Secure-by-design microservice architectures with mutual TLS (mTLS) and zero-trust gating',
        'Custom air-gapped on-premises appliances with zero external telemetry dependencies',
        'Proprietary cryptographic modules, HSM integration, and enterprise key management',
        'Custom internal developer portals (IDP) with embedded automated security guardrails',
        'High-performance packet processing, DPI engines, and custom network probes'
      ],
      productLink: { label: 'Explore Cybravions AI Core', view: 'ai' }
    },
    'soar-playbooks': {
      title: 'SOAR Orchestration & Threat Intelligence Automation',
      desc: 'Bridge intelligence and immediate defensive reaction. We design and deploy Security Orchestration, Automation, and Response (SOAR) playbooks that synthesize multi-feed threat intelligence (MISP, AlienVault, OTX) into automated containment actions.',
      checklist: [
        'Unified threat intelligence ingestion with STIX 2.1 normalization and deduplication',
        'Automated IP, domain, and hash enrichment against multi-source threat intelligence feeds',
        'Autonomous containment playbooks (host isolation, credential invalidation, firewall block rules)',
        'Human-in-the-loop approval workflows via Slack, Microsoft Teams, and secure webhooks',
        'Post-incident forensic snapshot archiving and automated timeline reconstruction'
      ],
      productLink: { label: 'Explore Threat Intel Collector', view: 'threat-collector' }
    }
  };

  const techStack = [
    { name: 'Python & PyTorch', role: 'Machine Learning & Explainable AI (SHAP / LIME)' },
    { name: 'FastAPI & Golang', role: 'Ultra-low latency microservices & secure APIs' },
    { name: 'Docker & Kubernetes', role: 'Air-gapped deployment & immutable orchestration' },
    { name: 'STIX 2.1 & TAXII', role: 'Standardized cyber threat intelligence exchange' },
    { name: 'PostgreSQL & ClickHouse', role: 'High-throughput security log & telemetry analytics' },
    { name: 'Kafka & Redis', role: 'Real-time event streaming & distributed message queuing' }
  ];

  const faqs = [
    {
      q: 'Can CYBRAVION’s IT and cyber solutions be deployed in air-gapped or on-premises environments?',
      a: 'Yes. All our custom software architectures, including our SOC AI triage models and threat intelligence processors, are engineered for complete air-gapped deployment with zero external internet telemetry or phone-home dependencies.'
    },
    {
      q: 'How does your AI/ML triage engine differ from generic LLM solutions?',
      a: 'Generic LLMs suffer from hallucinations, non-deterministic outputs, and data privacy leaks. CYBRAVION utilizes deterministic tree-based ensembles, calibrated machine learning classifiers, and SHAP explainability matrices specifically trained on high-fidelity security telemetry without sending internal alerts to external third-party cloud APIs.'
    },
    {
      q: 'Does CYBRAVION build customized software from scratch for client-specific requirements?',
      a: 'Yes. We specialize in bespoke engineering for B2B enterprises and government institutions—ranging from internal security telemetry pipelines to custom compliance portals, secure APIs, and automated threat modeling appliances.'
    },
    {
      q: 'How do your solutions integrate with our existing SIEM and ticketing tools?',
      a: 'We provide modular, containerized connectors for major enterprise SIEMs (Splunk, Microsoft Sentinel, Elastic SIEM, QRadar) and IT ticketing platforms (ServiceNow, Jira, Linear) using standard REST APIs and webhook listeners.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'IT & Cyber Solutions Engineering',
    serviceType: 'AI/ML SOC Automation, GRC Software & Custom Security Development',
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
    description: 'Enterprise IT & Cyber Solutions by CYBRAVION. AI/ML SOC alert triage, GRC workflow automation, custom security software engineering, and SOAR orchestration.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'IT & Cyber Solutions Portfolio',
      itemListElement: [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'AI/ML SOC Alert Triage Engine' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'GRC Workflow Automation Platform' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Custom Enterprise Security Software Engineering' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'SOAR Orchestration & Threat Intel Automation' } }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>IT & Cyber Solutions | AI/ML SOC Triage & Automation | CYBRAVION</title>
        <meta name="description" content="Custom IT & cybersecurity solutions: AI/ML SOC alert triage engines, GRC workflow automation, bespoke security software, and air-gapped sovereign tools." />
        <link rel="canonical" href="https://cybravions.com/services/it-cyber-solutions" />
        <meta property="og:title" content="IT & Cyber Solutions | AI/ML SOC Triage & Automation | CYBRAVION" />
        <meta property="og:description" content="Design and development of IT and cybersecurity solutions: AI/ML SOC triage, GRC automation, and customized security software." />
        <meta property="og:url" content="https://cybravions.com/services/it-cyber-solutions" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Subtle Architectural Vignette */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)' }}
      />

      <PageHeader
        kicker="Intelligent Automation & Software Engineering"
        title="Enterprise IT & Cyber Solutions"
        italicTitle="Powered by Applied Machine Learning."
        description="Transform security operations with purpose-built software. We design and develop AI/ML engines for SOC alert triage, automated GRC compliance platforms, bespoke cybersecurity software, and automated threat intelligence pipelines built for rigorous enterprise sovereignty."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Services', onClick: () => setCurrentView?.('home') },
          { label: 'IT & Cyber Solutions', active: true }
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
              <span>Scope Custom Solution</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#solutions"
              className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25 transition-all text-slate-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
            >
              Explore Solutions
            </a>
          </div>
        }
      />

      {/* Performance Metrics Ribbon */}
      <section className="relative z-10 py-12 px-6 border-y border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">92%</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">False Positive Reduction</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">&lt;800ms</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Average Triage Latency</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">SHAP</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Explainable ML Decisions</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">Air-Gap</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Zero Cloud Dependency</div>
          </div>
        </div>
      </section>

      {/* Solutions Matrix */}
      <section id="solutions" className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 dark:bg-purple-500/15 border border-purple-500/30 dark:border-purple-400/30 mb-4 shadow-[0_0_15px_rgba(139,92,246,0.15)] text-purple-600 dark:text-purple-400 font-mono text-[11px] font-bold uppercase tracking-[0.22em]">
            <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse" />
            Engineering Practices
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Enterprise IT &amp;{' '}
            <span className="bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500 dark:from-purple-400 dark:via-indigo-300 dark:to-blue-400 bg-clip-text text-transparent">
              Cyber Engineering
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-stone-300 max-w-2xl mx-auto mt-3">
            Select a core engineering discipline below to examine architecture specifications, telemetry processing, and live integrations.
          </p>
        </div>

        {/* Solution Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(
            [
              { id: 'soc-triage', label: 'AI/ML SOC Triage', icon: Brain },
              { id: 'grc-automation', label: 'GRC Automation', icon: FileCheck },
              { id: 'custom-software', label: 'Custom Security Software', icon: Code2 },
              { id: 'soar-playbooks', label: 'SOAR & Intel Automation', icon: Workflow }
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSolution === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setActiveSolution(tab.id);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 border border-purple-400/30'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-stone-400 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200/60 dark:border-white/[0.06]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#0b1222]/90 border border-slate-200/90 dark:border-purple-500/20 backdrop-blur-xl shadow-xl">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              {solutions[activeSolution].title}
            </h3>
            <p className="text-slate-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
              {solutions[activeSolution].desc}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-200/70 dark:border-white/10">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold mb-3">
                Core Capabilities & Architecture Features:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {solutions[activeSolution].checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/[0.05]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-stone-300 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/70 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  setCurrentView?.(solutions[activeSolution].productLink.view);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white hover:underline cursor-pointer"
              >
                <span>{solutions[activeSolution].productLink.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenConsultation?.();
                }}
                className="btn-tactile-primary px-6 py-2.5 rounded-full text-xs font-semibold text-white cursor-pointer"
              >
                Discuss Technical Architecture
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="relative z-10 py-16 px-6 bg-slate-50/60 dark:bg-white/[0.01] border-y border-slate-200/80 dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Enterprise Production Tech Stack</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 mt-2 max-w-xl mx-auto">
              Engineered with proven open-source and sovereign frameworks ensuring auditability, deterministic performance, and zero vendor lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#0c0d12] border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="text-sm font-bold font-mono text-neutral-900 dark:text-white mb-2">{tech.name}</div>
                <div className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">{tech.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 mt-2">
            Inquiries regarding custom software development, ML explainability, and enterprise SIEM integration.
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
            Build Intelligent, Automated Cyber Infrastructure.
          </h2>
          <p className="text-neutral-400 dark:text-neutral-600 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Partner with CYBRAVION to build custom security software, AI alert triage pipelines, and continuous GRC automation.
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
              Consult an Architect & Scope Solutions
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
