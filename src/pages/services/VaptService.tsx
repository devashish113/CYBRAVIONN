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

interface VaptServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const VaptServicePage: React.FC<VaptServiceProps> = ({
  setCurrentView,
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
    <div className="pt-24 min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>VAPT Services in Delhi NCR & India | CYBRAVION Solutions</title>
        <meta name="description" content="Top-tier VAPT services in New Delhi NCR & India. CERT-In aligned manual penetration testing for web apps, mobile, APIs, networks, and cloud. Zero false positives." />
        <link rel="canonical" href="https://cybravions.com/vapt" />
        <meta property="og:title" content="VAPT Services in Delhi NCR & India | CYBRAVION Solutions" />
        <meta property="og:description" content="Enterprise VAPT services in India. OWASP Top 10 & SANS 25 certified manual penetration testing for Web, API, Mobile, and Cloud environments." />
        <meta property="og:url" content="https://cybravions.com/vapt" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500 dark:text-stone-400">
          <ol className="flex items-center space-x-2">
            <li>
              <button 
                type="button" 
                onClick={() => setCurrentView?.('home')} 
                className="hover:text-orange-500 transition-colors"
              >
                Home
              </button>
            </li>
            <li>/</li>
            <li>Services</li>
            <li>/</li>
            <li className="text-orange-600 dark:text-orange-400 font-medium">VAPT Services</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="mb-20 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Offensive Cybersecurity &amp; Ethical Hacking Authority</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Enterprise <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 bg-clip-text text-transparent">VAPT Services</span> in Delhi NCR &amp; India
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-stone-300 max-w-3xl leading-relaxed mb-8">
            Expose and remediate critical security vulnerabilities before adversaries exploit them. CYBRAVION delivers rigorous, CERT-In aligned Vulnerability Assessment &amp; Penetration Testing across web apps, APIs, cloud environments, and enterprise networks. Zero false positives, deep manual exploit verification, and free re-testing.
          </p>

          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onOpenConsultation?.();
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Schedule Free VAPT Scoping</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#scopes"
              className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-stone-900/80 border border-slate-300 dark:border-stone-800 text-slate-800 dark:text-stone-200 font-semibold hover:bg-slate-200 dark:hover:bg-stone-800 transition-colors"
            >
              Explore Testing Scopes
            </a>
          </div>
        </header>

        {/* Trust Badges */}
        <section className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-stone-900/40 border border-slate-200/80 dark:border-stone-800/80">
            <div className="text-3xl font-extrabold text-orange-500 mb-1">100%</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400">Manual Exploit Verification</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-stone-900/40 border border-slate-200/80 dark:border-stone-800/80">
            <div className="text-3xl font-extrabold text-blue-500 mb-1">CERT-In</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400">Aligned Methodology</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-stone-900/40 border border-slate-200/80 dark:border-stone-800/80">
            <div className="text-3xl font-extrabold text-emerald-500 mb-1">0%</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400">False Positive Guarantee</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-stone-900/40 border border-slate-200/80 dark:border-stone-800/80">
            <div className="text-3xl font-extrabold text-amber-500 mb-1">Free</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400">Remediation Re-Testing</div>
          </div>
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
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
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

              <h4 className="text-sm font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-4">
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
                  className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors"
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
            <span className="text-xs uppercase tracking-[0.3em] text-orange-600 dark:text-orange-400 font-bold block mb-2">
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
                className="p-6 rounded-2xl bg-white dark:bg-stone-900/60 border border-slate-200 dark:border-stone-800 relative hover:border-orange-500/50 transition-colors"
              >
                <div className="text-4xl font-black text-orange-500/20 dark:text-orange-500/20 mb-3">
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
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
              >
                Request Sample Audit Report
              </button>
            </div>

            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 font-mono text-xs text-stone-300 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800 text-stone-500">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-400" />
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              VAPT Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-stone-400">
              Clear answers to common questions about scoping, methodologies, certifications, and timelines.
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
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-orange-500 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-orange-500' : 'text-slate-400'}`} />
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

        {/* CTA Bar */}
        <section className="text-center py-16 px-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 border border-orange-500/20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Ready to Secure Your Digital Attack Surface?
          </h2>
          <p className="text-slate-600 dark:text-stone-300 max-w-2xl mx-auto mb-8 text-base">
            Speak directly with a Senior Cybersecurity Auditor in New Delhi to scope your targets, define Rules of Engagement, and receive a fixed-price proposal within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              cyberAudio.playClick();
              onOpenConsultation?.();
            }}
            className="px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/30 transition-transform transform hover:-translate-y-0.5"
          >
            Schedule Confidential VAPT Consultation
          </button>
        </section>
      </div>
    </div>
  );
};
