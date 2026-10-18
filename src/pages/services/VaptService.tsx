import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Terminal, 
  Zap, 
  AlertTriangle, 
  Lock, 
  Server, 
  Globe, 
  Smartphone, 
  Cpu, 
  Search,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../../utils/cyberAudio';
import { PageHeader } from '../../components/PageHeader';

interface VaptServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const VaptServicePage: React.FC<VaptServiceProps> = ({
  setCurrentView,
  isDarkMode = true,
  onOpenConsultation
}) => {
  const [activeScope, setActiveScope] = useState<'web' | 'api' | 'mobile' | 'cloud' | 'network'>('web');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scopeDetails = {
    web: {
      title: 'Web Application Penetration Testing',
      desc: 'Comprehensive manual and automated exploitation targeting OWASP Top 10 (SQLi, XSS, SSRF, IDOR, Broken Authentication) and complex business logic flaws across SaaS platforms, customer portals, and internal enterprise web apps.',
      checklist: [
        'Deep testing for Business Logic Flaws & Privilege Escalations',
        'Stateful authentication, JWT manipulation & Session Fixation checks',
        'Input sanitization, RCE, Remote File Inclusion & SSRF probes',
        'OWASP Top 10 (2021/2025) and SANS Top 25 full alignment',
        'Zero false-positive verification with actionable proof-of-concepts (PoC)'
      ]
    },
    api: {
      title: 'REST, GraphQL & gRPC API Security Testing',
      desc: 'Specialized testing for API endpoints powering web and mobile frontends. Aligned with OWASP API Security Top 10 to identify Broken Object Level Authorization (BOLA), mass assignment, and excessive data exposure.',
      checklist: [
        'OWASP API Security Top 10 complete audit coverage',
        'Broken Object Level Authorization (BOLA/IDOR) deep hunting',
        'Rate limiting bypass, API scraping & DoS simulation',
        'GraphQL introspection, batch querying & nested depth attacks',
        'Token replay, OAuth2 flow exploitation & improper asset management'
      ]
    },
    mobile: {
      title: 'Android & iOS Mobile Application VAPT',
      desc: 'Static and dynamic mobile security assessment (SAST/DAST) targeting reverse engineering vulnerabilities, insecure local storage, hardcoded secrets, weak cryptographic implementations, and root/jailbreak bypass.',
      checklist: [
        'OWASP Mobile Top 10 & MASVS (Mobile App Security Verification Standard)',
        'Binary de-obfuscation, reverse engineering & tampering resilience',
        'Runtime manipulation using Frida & dynamic instrumentation',
        'Insecure data storage, IPC mechanisms & SQLite database inspection',
        'SSL Pinning bypass, deep link vulnerabilities & clipboard leaks'
      ]
    },
    cloud: {
      title: 'Cloud Infrastructure & IAM Red Teaming',
      desc: 'Penetration testing across AWS, Microsoft Azure, and GCP environments. Identifying misconfigurations, privilege escalation paths, overly permissive IAM roles, exposed storage buckets, and insecure metadata services.',
      checklist: [
        'AWS, Azure, and GCP cloud architecture penetration testing',
        'IAM role assumption & lateral movement simulation',
        'Exposed S3 buckets, Azure Blobs & GCP Cloud Storage enumeration',
        'Container breakouts, Docker daemon escapes & Kubernetes misconfigurations',
        'Serverless function security (Lambda, Cloud Functions) & secret leaks'
      ]
    },
    network: {
      title: 'External & Internal Network Penetration Testing',
      desc: 'Simulating sophisticated external perimeter breaches and internal insider threat scenarios. We discover rogue services, legacy protocols, weak Active Directory domain configurations, and unpatched perimeter assets.',
      checklist: [
        'External digital attack surface reconnaissance & port exploitation',
        'Active Directory Kerberoasting, AS-REP roasting & domain privilege escalation',
        'Legacy protocol auditing (SMBv1, SNMP, Telnet) & perimeter hardening',
        'Egress filtering validation & firewall rule bypass tests',
        'Wireless security auditing & rogue access point detection'
      ]
    }
  };

  const faqs = [
    {
      q: 'What is the difference between Vulnerability Assessment (VA) and Penetration Testing (PT)?',
      a: 'Vulnerability Assessment (VA) is an automated, high-level scanning process designed to identify known security weaknesses across systems. Penetration Testing (PT) goes much further: our certified ethical hackers manually exploit those vulnerabilities to verify impact, chain multiple low-risk flaws into critical exploits, and test your team’s defensive detection capabilities.'
    },
    {
      q: 'Is CYBRAVION’s VAPT audit certified for Indian regulatory compliance like CERT-In and RBI?',
      a: 'Yes. Our VAPT audit methodologies strictly comply with CERT-In directives, RBI Cybersecurity Framework guidelines for banks and NBFCs, SEBI cyber circulars, and the DPDP Act 2023 requirements. Our reports include executive summaries and technical annexures structured for immediate regulatory submission.'
    },
    {
      q: 'Will penetration testing cause downtime or disruption to our production systems?',
      a: 'No. We operate with strict Rules of Engagement (RoE). Our team uses non-destructive exploit payloads, schedules heavy network or fuzzing scans during off-peak maintenance windows, and maintains real-time communication with your technical leads to guarantee uninterrupted business operations.'
    },
    {
      q: 'Do you provide re-testing after our developers fix the reported vulnerabilities?',
      a: 'Yes! Every CYBRAVION VAPT engagement includes one complimentary round of comprehensive re-testing within 30 to 60 days of the initial report. Once our team verifies all remediations, we issue a formal Security Clearance Certificate.'
    },
    {
      q: 'How quickly can we initiate a VAPT engagement in Delhi NCR or remotely?',
      a: 'We can scope and initiate engagements within 24 to 48 hours. After signing the Mutual Non-Disclosure Agreement (NDA) and Rules of Engagement (RoE), our security engineering team begins active reconnaissance immediately.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vulnerability Assessment & Penetration Testing (VAPT) Services',
    serviceType: 'Offensive Cybersecurity & Penetration Testing',
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
      { '@type': 'City', 'name': 'New Delhi' },
      { '@type': 'AdministrativeArea', 'name': 'Delhi NCR' },
      { '@type': 'Country', 'name': 'India' },
      { '@type': 'Place', 'name': 'Worldwide' }
    ],
    description: 'Enterprise VAPT services in New Delhi NCR and India. OWASP Top 10, CERT-In aligned manual penetration testing for Web, Mobile, API, and Cloud Networks.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'VAPT Services Portfolio',
      itemListElement: [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Web Application Penetration Testing' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'API Security Audit' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Mobile App Security VAPT' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Network Penetration Testing' } }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>VAPT Services in Delhi NCR & India | CYBRAVION Solutions</title>
        <meta name="description" content="Top-tier VAPT services in New Delhi NCR & India. CERT-In aligned manual penetration testing for web apps, mobile, APIs, networks, and cloud. Zero false positives." />
        <link rel="canonical" href="https://cybravions.com/vapt" />
        <meta property="og:title" content="VAPT Services in Delhi NCR & India | CYBRAVION Solutions" />
        <meta property="og:description" content="Enterprise VAPT services in India. OWASP Top 10 & SANS 25 certified manual penetration testing for Web, API, Mobile, and Cloud environments." />
        <meta property="og:url" content="https://cybravions.com/vapt" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Subtle Architectural Vignette */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)' }}
      />

      <PageHeader
        kicker="Offensive Cybersecurity & Ethical Hacking Authority"
        title="Enterprise VAPT Services in"
        italicTitle="Delhi NCR & India."
        description="Expose and remediate critical security vulnerabilities before adversaries exploit them. CYBRAVION delivers rigorous, CERT-In aligned Vulnerability Assessment & Penetration Testing across web apps, APIs, cloud environments, and enterprise networks. Zero false positives, deep manual exploit verification, and free re-testing."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Services', onClick: () => setCurrentView?.('home') },
          { label: 'VAPT Services', active: true }
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
              <span>Schedule Free VAPT Scoping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#scopes"
              className="btn-tactile-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Testing Scopes</span>
            </a>
          </div>
        }
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16">
        {/* Trust Badges */}
        <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { val: '100%', label: 'Manual Exploit Verification', sub: 'Zero Script Automation Bluff', num: '01' },
            { val: 'CERT-In', label: 'Aligned Methodology', sub: 'Empaneled Standard Protocols', num: '02' },
            { val: '0%', label: 'False Positive Guarantee', sub: 'Verified Proof-of-Concepts', num: '03' },
            { val: 'Free', label: 'Remediation Re-Testing', sub: 'Post-Patch Validation Sign-Off', num: '04' },
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

        {/* Interactive Scope Section */}
        <section id="scopes" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Comprehensive VAPT Testing Scopes
            </h2>
            <p className="text-slate-600 dark:text-stone-400 max-w-2xl mx-auto">
              Select your target environment to view our targeted penetration testing methodology, threat vectors, and compliance checklists.
            </p>
          </div>

          {/* Scope Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'web', label: 'Web Applications', icon: Globe },
              { id: 'api', label: 'APIs (REST/GraphQL)', icon: Zap },
              { id: 'mobile', label: 'Mobile Apps (iOS/Android)', icon: Smartphone },
              { id: 'cloud', label: 'Cloud Infrastructure', icon: Cpu },
              { id: 'network', label: 'Internal/External Networks', icon: Server }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeScope === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    cyberAudio.playHover();
                    setActiveScope(tab.id as any);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                      : 'bg-white/80 dark:bg-stone-900/60 text-slate-700 dark:text-stone-300 border border-slate-200 dark:border-stone-800 hover:bg-slate-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scope Detail Card */}
          <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 shadow-xl">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {scopeDetails[activeScope].title}
              </h3>
              <p className="text-slate-600 dark:text-stone-300 text-base md:text-lg leading-relaxed mb-8">
                {scopeDetails[activeScope].desc}
              </p>

              <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
                Audit Checklist &amp; Attack Vectors Tested:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {scopeDetails[activeScope].checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-stone-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500 dark:text-stone-400">
                  Deliverables: Executive Summary, Proof-of-Concept Exploit Videos, Step-by-Step Code Patches, and Attestation Certificate.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playClick();
                    onOpenConsultation?.();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold text-sm transition-colors"
                >
                  Request Scope Estimate
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Stage Engagement Methodology */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400 font-bold block mb-2">
              Execution Excellence
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Our 4-Stage Offensive Security Lifecycle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Reconnaissance & Threat Scoping',
                desc: 'OSINT reconnaissance, asset enumeration, architecture mapping, and agreement on non-destructive Rules of Engagement (RoE).'
              },
              {
                step: '02',
                title: 'Automated & Manual Discovery',
                desc: 'Deep multi-tool scanning blended with custom exploit payloads to detect configuration, protocol, and code-level weaknesses.'
              },
              {
                step: '03',
                title: 'Exploit Chaining & Validation',
                desc: 'Manual exploitation of identified vulnerabilities to prove business impact and bypass defensive controls without service interruption.'
              },
              {
                step: '04',
                title: 'Remediation & Free Re-Testing',
                desc: 'Delivery of prioritized technical and executive reports, developer consultation calls, and complimentary re-testing to certify patches.'
              }
            ].map((phase, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900/60 border border-slate-200 dark:border-stone-800 relative hover:border-purple-500/50 transition-colors"
              >
                <div className="text-4xl font-black text-purple-500/20 dark:text-purple-500/20 mb-3">
                  {phase.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables Showcase */}
        <section className="mb-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 text-white border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-3">
                Actionable Intelligence
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What You Receive: Audit Deliverables
              </h2>
              <p className="text-stone-300 leading-relaxed mb-6">
                Unlike automated scanner printouts that overwhelm developers with false alarms, CYBRAVION’s reports provide clear, step-by-step remediation guidance tailored for both engineering teams and board members.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Board-Ready Executive Summary with risk score calculation (CVSS v3.1)',
                  'Developer-Ready Technical Annexure with sanitized reproduction steps',
                  'Remediation Code Snippets and Framework-Specific Hardening Instructions',
                  'Official Security Audit Certificate for clients, investors, and insurance',
                  'One-on-One Engineering Debrief Call with lead penetration testers'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-stone-200 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenConsultation?.();
                }}
                className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-sm transition-colors"
              >
                Request Sample Audit Report
              </button>
            </div>

            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 font-mono text-xs text-stone-300 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800 text-stone-500">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  CYB-VAPT-REPORT-2026.pdf
                </span>
                <span className="text-emerald-400 font-semibold">VERIFIED EXPLOIT</span>
              </div>
              <div className="space-y-2 text-stone-400">
                <p className="text-red-400 font-semibold">[CRITICAL] CVE-2026-X: Broken Object Level Auth (BOLA)</p>
                <p>Target: https://api.client.internal/v2/tenant/billing/invoice</p>
                <p>CVSS Score: 9.3 (CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:N)</p>
                <p className="text-amber-300">Exploit Impact: Unauthenticated cross-tenant PII extraction.</p>
                <p className="text-emerald-300">Remediation: Implement attribute-based access control (ABAC) decorator in auth middleware.</p>
                <p className="text-stone-500 pt-2">// Re-test Status: PASSED &amp; MITIGATED (Signed by Lead Auditor)</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
                Auditor Guidance
              </span>
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="font-editorial font-normal text-3xl sm:text-4xl md:text-5xl text-neutral-900 dark:text-white mb-4 tracking-tight">
              VAPT Frequently Asked <span className="italic font-light text-neutral-500 dark:text-neutral-400">Questions.</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
              Clear answers to common questions about scoping, methodologies, certifications, and timelines.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="surface-card rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    id={`vapt-faq-trigger-${idx}`}
                    aria-expanded={isOpen}
                    aria-controls={`vapt-faq-answer-${idx}`}
                    onClick={() => {
                      cyberAudio.playHover();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-amber-500 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown aria-hidden="true" className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-500' : 'text-neutral-400'}`} />
                  </button>
                  {isOpen && (
                    <div 
                      id={`vapt-faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`vapt-faq-trigger-${idx}`}
                      className="px-6 pb-6 text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed border-t border-neutral-200 dark:border-white/[0.08] pt-4 font-light"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Bar */}
        <section className="text-center py-16 px-8 rounded-3xl surface-card text-neutral-900 dark:text-white">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-amber-600 dark:text-amber-400">
              Immediate Engagement
            </span>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h2 className="font-editorial font-normal text-3xl md:text-5xl mb-4 tracking-tight">
            Ready to Secure Your <span className="italic font-light text-neutral-500 dark:text-neutral-400">Digital Attack Surface?</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8 text-sm sm:text-base font-light leading-relaxed">
            Speak directly with a Senior Cybersecurity Auditor in New Delhi to scope your targets, define Rules of Engagement, and receive a fixed-price proposal within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              cyberAudio.playClick();
              onOpenConsultation?.();
            }}
            className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
          >
            Schedule Confidential VAPT Consultation
          </button>
        </section>
      </div>
    </div>
  );
};
