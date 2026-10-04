import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Tag, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Scale, 
  ShieldCheck, 
  Cloud, 
  BrainCircuit, 
  ChevronRight,
  ExternalLink,
  Share2,
  Calendar,
  X
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../utils/cyberAudio';

interface ResourcesPageProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'Compliance & DPDP' | 'VAPT & Offensive' | 'Cloud & DevSecOps' | 'AI Security';
  readTime: string;
  publishedDate: string;
  summary: string;
  content: {
    sections: {
      heading: string;
      body: string[];
      list?: string[];
      callout?: { title: string; text: string; type: 'warning' | 'tip' | 'info' };
    }[];
  };
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  setCurrentView,
  onOpenConsultation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'dpdp-act-checklist',
      title: 'DPDP Act 2023: The Definitive Enterprise Compliance & Implementation Checklist',
      slug: 'dpdp-act-2023-enterprise-compliance-checklist',
      category: 'Compliance & DPDP',
      readTime: '12 min read',
      publishedDate: 'January 2026',
      summary: 'An exhaustive regulatory guide for Indian and global enterprises on complying with the Digital Personal Data Protection Act 2023, consent architectures, Data Principal rights, and preventing penalties up to ₹250 Crores.',
      content: {
        sections: [
          {
            heading: '1. Executive Summary & Statutory Reach',
            body: [
              'The Digital Personal Data Protection Act, 2023 (DPDP Act, Act No. 22 of 2023) fundamentally reshapes how organizations collect, store, process, and transfer personal data of Indian citizens. Unlike historical IT Act rules, the DPDP Act introduces severe statutory penalties up to ₹250 Crores per violation and establishes the Data Protection Board of India as an active enforcement body.',
              'The Act applies to digital personal data processed within India (collected in digital form or digitized subsequently) and extends extraterritorially to processing outside India if goods or services are offered to Data Principals in India.'
            ],
            callout: {
              type: 'warning',
              title: 'Statutory Financial Exposure',
              text: 'Under Section 33 and Schedule of the DPDP Act, failure to take reasonable security safeguards to prevent personal data breaches carries penalties of up to ₹250 Crores ($30M USD).'
            }
          },
          {
            heading: '2. The 7 Core Obligations of Data Fiduciaries',
            body: [
              'Under Section 8 of the Act, organizations determining the purpose and means of data processing (Data Fiduciaries) must satisfy non-negotiable statutory mandates:'
            ],
            list: [
              'Itemized & Multi-Lingual Consent Notices: Clear notices specifying purpose and categories of personal data, available in English and all 22 languages in the Eighth Schedule of the Constitution.',
              'Reasonable Security Safeguards: Mandatory implementation of encryption, access controls, network segmentation, and regular vulnerability audits.',
              'Statutory Breach Notification: Immediate notification to both the Data Protection Board of India and affected Data Principals in the event of any personal data leak.',
              'Data Erasure Upon Purpose Fulfillment: Mandatory deletion of personal data once the specified business purpose is completed or consent is withdrawn.',
              'Grievance Redressal Mechanism: Publication of contact details of a Data Protection Officer or grievance officer who responds within prescribed timelines.',
              'Data Processor Oversight: Ensuring that third-party vendors and cloud providers process data strictly under valid contractual terms.',
              'Children’s Data Safeguards: Mandatory verifiable parental consent for users under 18; absolute ban on tracking or behavioral targeted ads.'
            ]
          },
          {
            heading: '3. Data Principal Rights Engineering Matrix',
            body: [
              'Engineering teams must build programmatic capabilities to satisfy Data Principal requests without manual database manipulation:',
              '1. Right to Access: Summary of personal data processed, identities of all third parties with whom data was shared.',
              '2. Right to Correction & Erasure: Updating inaccurate info and purging records across active DBs and cold backups.',
              '3. Right to Grievance Redressal: Transparent ticketing and escalation workflow with statutory resolution SLA.',
              '4. Right to Nominate: Allowing individuals to nominate a legal representative in case of death or incapacity.'
            ]
          },
          {
            heading: '4. Enterprise DPDP Act Compliance Checklist',
            body: [
              'Execute this 6-step roadmap to achieve verified compliance readiness:'
            ],
            list: [
              'Conduct Data Discovery & Classification to catalog all PII stores across production databases, S3 buckets, and CRM tools.',
              'Revise privacy policies and embed multi-lingual, granular consent collection mechanisms into web and mobile signup flows.',
              'Establish Data Subject Request (DSR) automated workflows for data access, export, and deletion.',
              'Appoint an India-based Data Protection Officer (DPO) and register contact points with the Data Protection Board.',
              'Conduct Data Protection Impact Assessments (DPIAs) for high-risk algorithmic processing or ML model training.',
              'Engage certified external auditors (like CYBRAVION) for technical security safeguard attestation.'
            ]
          }
        ]
      }
    },
    {
      id: 'iso-27001-roadmap-india',
      title: 'ISO 27001:2022 Certification in India: Cost, Timeline & Audit Roadmap (2026 Edition)',
      slug: 'iso-27001-2022-certification-india-cost-timeline-roadmap',
      category: 'Compliance & DPDP',
      readTime: '15 min read',
      publishedDate: 'February 2026',
      summary: 'The definitive executive guide to achieving ISO/IEC 27001:2022 certification in India. Realistic timelines, breakdown of consulting and registrar costs, and implementing the 11 new controls.',
      content: {
        sections: [
          {
            heading: '1. Why ISO 27001:2022 Matters for Indian B2B Tech',
            body: [
              'ISO/IEC 27001 is the global gold standard for Information Security Management Systems (ISMS). For Indian tech companies, SaaS startups, and IT export services, ISO 27001 certification is no longer optional—it is the prerequisite for passing enterprise procurement security questionnaires from US, European, and domestic BFSI buyers.',
              'The 2022 revision introduces substantial modernization, restructuring the 114 Annex A controls into 93 streamlined controls grouped into Organizational, People, Physical, and Technological domains.'
            ],
            callout: {
              type: 'info',
              title: 'Transition Deadline Notice',
              text: 'All ISO/IEC 27001:2013 certificates expired globally by October 31, 2025. All new certifications and renewals must strictly adhere to the 2022 standard.'
            }
          },
          {
            heading: '2. The 11 New Security Controls You Must Implement',
            body: [
              'Auditors scrutinize how organizations have adopted the 11 newly introduced controls in Annex A:'
            ],
            list: [
              'A.5.7 Threat Intelligence: Structured gathering and analysis of adversary tactics (MISP, STIX/TAXII).',
              'A.5.23 Information Security for Cloud Services: Clear procurement, operational, and exit strategies for AWS/GCP/Azure.',
              'A.7.4 Physical Security Monitoring: Surveillance cameras and alarm systems in corporate facilities.',
              'A.8.9 Configuration Management: Infrastructure-as-Code baselines and automated drift monitoring.',
              'A.8.10 Information Deletion: Compliant data sanitization aligned with DPDP right to erasure.',
              'A.8.11 Data Masking: PII pseudonymization and masking across non-production staging environments.',
              'A.8.12 Data Leakage Prevention (DLP): Software enforcement against unauthorized data extraction.',
              'A.8.16 Monitoring Activities: Centralized SIEM/SOC anomaly detection and log correlation.',
              'A.8.23 Web Filtering: DNS/proxy URL filtering to block malicious command-and-control websites.',
              'A.8.28 Secure Coding: Enforcing SSDLC, automated SAST/DAST gating in CI/CD pipelines.',
              'A.8.6 ICT Readiness for Business Continuity: Verifying failover RTO/RPO for critical cloud workloads.'
            ]
          },
          {
            heading: '3. Indian Cost Breakdown: Consulting vs Registrar',
            body: [
              'Organizations must budget for two separate expense streams:',
              '1. Readiness & Consulting Fee: Paid to CYBRAVION for gap analysis, policy creation, risk assessments, internal audits, and auditor facilitation. Typically ranges from ₹1,50,000 to ₹4,50,000 depending on scope.',
              '2. Accredited Certification Registrar Fee: Paid directly to an accredited certification body (BSI, DNV, TÜV SÜD, Bureau Veritas). Calculated on statutory auditor mandate days based on employee count (typically ₹1,00,000 to ₹3,00,000 for a 3-year certificate cycle).'
            ]
          },
          {
            heading: '4. Realistic 8 to 12 Week Implementation Roadmap',
            body: [
              'Phase 1 (Weeks 1-2): Scoping & Gap Analysis. Map systems, AWS/cloud accounts, and employee directories.',
              'Phase 2 (Weeks 3-5): Policy Drafting & Risk Treatment. Formulate custom InfoSec policies and Statement of Applicability (SoA).',
              'Phase 3 (Weeks 6-8): Control Enforcement & Internal Audit. Deploy MFA, DLP, backup tests, and conduct formal mock audit.',
              'Phase 4 (Weeks 9-12): Stage 1 Documentation Review & Stage 2 Live Evidence Certification with registrar.'
            ]
          }
        ]
      }
    },
    {
      id: 'vapt-vs-pentesting-guide',
      title: 'VAPT vs Penetration Testing: The Executive Scoping & Deliverables Guide',
      slug: 'vapt-vs-penetration-testing-scoping-deliverables-guide',
      category: 'VAPT & Offensive',
      readTime: '10 min read',
      publishedDate: 'March 2026',
      summary: 'Learn the critical difference between automated vulnerability scanning and manual offensive penetration testing. Avoid low-quality commodity scans and demand actionable proof-of-concept reports.',
      content: {
        sections: [
          {
            heading: '1. The Crucial Difference: Vulnerability Assessment vs Penetration Testing',
            body: [
              'Many procurement teams mistakenly use "Vulnerability Assessment" (VA) and "Penetration Testing" (PT) interchangeably, leading to purchasing low-cost automated scan exports masquerading as comprehensive audits.',
              'Vulnerability Assessment is an automated, signature-based scan that flags known CVEs. It cannot evaluate multi-step business logic flaws, authorization bypasses, or chained privilege escalations, and typically produces a high rate of false positives.',
              'Penetration Testing is an active offensive exercise conducted by skilled ethical hackers who emulate human adversaries. They manually probe application workflows, chain seemingly low-severity misconfigurations into total account takeovers, and verify genuine business impact.'
            ],
            callout: {
              type: 'tip',
              title: 'Buyer Beware Rule',
              text: 'If an audit agency offers to complete a "complete VAPT" in 24 hours with an automated 200-page Nessus PDF export, you received a vulnerability scan—not a penetration test.'
            }
          },
          {
            heading: '2. The 3 Testing Methodologies: Black, Grey, and White Box',
            body: [
              'Selecting the appropriate testing paradigm depends on your threat model and maturity:'
            ],
            list: [
              'Black Box Testing: Zero prior knowledge provided. Simulates an external opportunistic threat actor or cybercriminal gang scanning the public internet.',
              'Grey Box Testing (Recommended): Testers receive standard user credentials for multiple roles (e.g., standard user, tenant admin). Optimal for hunting privilege escalation and IDOR/BOLA flaws.',
              'White Box Testing: Full access to source code repositories, API specs, and architecture diagrams. Most comprehensive; reveals structural architectural bugs.'
            ]
          },
          {
            heading: '3. What a Legitimate VAPT Report Must Include',
            body: [
              'Do not accept raw scanner output. A high-quality report must provide:',
              '1. Executive Summary with risk metrics (CVSS v3.1 scoring) for board members and non-technical stakeholders.',
              '2. Reproduction Steps with sanitized curl commands, HTTP request/response headers, and screenshot/video evidence.',
              '3. Tailored Code-Level Remediation with framework-specific syntax (e.g., Spring Boot, Django, Next.js) rather than generic textbook recommendations.',
              '4. Free Re-Testing Attestation confirming that identified vulnerabilities were mitigated successfully.'
            ]
          }
        ]
      }
    },
    {
      id: 'cert-in-directive-protocol',
      title: 'CERT-In 6-Hour Cyber Incident Reporting Directive: Protocols & SOPs for Indian Businesses',
      slug: 'cert-in-6-hour-incident-reporting-directive-protocols-sops',
      category: 'Cloud & DevSecOps',
      readTime: '11 min read',
      publishedDate: 'January 2026',
      summary: 'Navigating CERT-In Direction No. 20(3)/2022-CERT-In. Mandatory 6-hour incident disclosure windows, 180-day ICT system log retention, NTP server synchronization, and emergency response SOPs.',
      content: {
        sections: [
          {
            heading: '1. The CERT-In 6-Hour Directive: Overview & Legal Backing',
            body: [
              'Under Section 70B(6) of the Information Technology Act, 2000, the Indian Computer Emergency Response Team (CERT-In) issued binding directions requiring all service providers, intermediaries, data centers, and corporate entities in India to report cybersecurity incidents within 6 hours of noticing them.',
              'Failure to comply can attract statutory prosecution and imprisonment for up to one year, or a fine up to ₹1,00,000, under Section 70B(7) of the IT Act.'
            ],
            callout: {
              type: 'warning',
              title: 'Strict 6-Hour Deadline',
              text: 'The 6-hour clock starts ticking the moment your IT, security, or engineering team detects or is alerted to an incident—not after internal investigations conclude.'
            }
          },
          {
            heading: '2. The 20 Mandatory Reportable Incident Categories',
            body: [
              'CERT-In annexures mandate immediate disclosure for 20 types of cyber events, including:'
            ],
            list: [
              'Targeted scanning/probing of critical networks and infrastructure',
              'Compromise of critical systems or unauthorized access to IT systems and databases',
              'Defacement of websites or unauthorized intrusion into corporate portals',
              'Malicious code attacks including Ransomware, Spyware, Trojans, and Cryptominers',
              'Identity theft, spoofing, and phishing attacks affecting enterprise systems',
              'Denial of Service (DoS) and Distributed Denial of Service (DDoS) attacks',
              'Rogue mobile code attacks and fake mobile applications',
              'Data breaches and leaks of sensitive customer, financial, or corporate records',
              'Attacks on critical information infrastructure (CII) and SCADA systems',
              'Attacks on cloud compute, virtualized environments, and container runtimes'
            ]
          },
          {
            heading: '3. Technical Prerequisites: Logs & Clock Sync',
            body: [
              'The directive also contains two crucial infrastructure requirements that are strictly audited during regulatory investigations:',
              '1. Mandatory 180-Day System Log Retention: All logs from firewalls, servers, databases, cloud IAM, and proxies must be retained securely within Indian jurisdiction for a rolling 180-day window.',
              '2. NTP Server Synchronization: All ICT system clocks must synchronize with the National Physical Laboratory (NPL) or National Informatics Centre (NIC) NTP servers to guarantee forensic timestamp accuracy.'
            ]
          },
          {
            heading: '4. CYBRAVION Incident Response Protocol',
            body: [
              'CYBRAVION deploys rapid incident triage teams to assist organizations experiencing active breaches:',
              'Step 1: Rapid Incident Scoping & Containment within 60 minutes.',
              'Step 2: Formal CERT-In Incident Reporting dispatch drafted within 4 hours via official Incident Form.',
              'Step 3: Forensic log preservation and chain-of-custody isolation.',
              'Step 4: Threat eradication, root-cause analysis, and board-level post-mortem report.'
            ]
          }
        ]
      }
    }
  ];

  const categories = ['All', 'Compliance & DPDP', 'VAPT & Offensive', 'Cloud & DevSecOps', 'AI Security'];

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesQuery = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CYBRAVION Regulatory Resource Center & Cybersecurity Guides',
    description: 'Definitive guides and checklists on the DPDP Act 2023, ISO 27001:2022 implementation, VAPT scoping, and CERT-In compliance directives.',
    url: 'https://cybravions.com/resources',
    hasPart: articles.map(art => ({
      '@type': 'Article',
      headline: art.title,
      description: art.summary,
      datePublished: '2026-01-15',
      author: {
        '@type': 'Corporation',
        name: 'CYBRAVION Solutions'
      }
    }))
  };

  return (
    <div className="pt-24 min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>Regulatory Resource Center &amp; Cybersecurity Guides | CYBRAVION</title>
        <meta name="description" content="In-depth cybersecurity compliance guides, checklists, and technical blueprints. Master the DPDP Act 2023, ISO 27001:2022, VAPT scoping, and CERT-In directives." />
        <link rel="canonical" href="https://cybravions.com/resources" />
        <meta property="og:title" content="Cybersecurity Resource Center &amp; Regulatory Guides | CYBRAVION" />
        <meta property="og:description" content="Definitive enterprise guides on DPDP Act 2023, ISO 27001 implementation, offensive VAPT testing, and CERT-In compliance protocols from New Delhi." />
        <meta property="og:url" content="https://cybravions.com/resources" />
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
            <li className="text-orange-600 dark:text-orange-400 font-medium">Resources &amp; Regulatory Guides</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Cybersecurity Knowledge Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Regulatory Guides &amp; <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-blue-500 bg-clip-text text-transparent">Technical Blueprints</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-stone-300 leading-relaxed">
            In-depth analysis, statutory checklists, and actionable security playbooks authored by CYBRAVION’s cybersecurity engineers and regulatory consultants in New Delhi.
          </p>
        </header>

        {/* Search & Category Filter Controls */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  cyberAudio.playHover();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'bg-white dark:bg-stone-900 text-slate-700 dark:text-stone-300 border border-slate-200 dark:border-stone-800 hover:bg-slate-100 dark:hover:bg-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides, laws, standards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              className="p-8 rounded-3xl bg-white dark:bg-stone-900/70 border border-slate-200 dark:border-stone-800 hover:border-orange-500/50 transition-all flex flex-col justify-between shadow-sm group cursor-pointer"
              onClick={() => {
                cyberAudio.playClick();
                setActiveArticle(article);
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {article.title}
                </h2>

                <p className="text-sm text-slate-600 dark:text-stone-300 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-stone-800/60 flex items-center justify-between text-xs font-semibold text-orange-600 dark:text-orange-400">
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.publishedDate}
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Guide
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* In-Depth Article Reader Modal / Drawer */}
        <AnimatePresence>
          {activeArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center p-4 md:p-6 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-12 relative text-slate-900 dark:text-stone-100"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-stone-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-6 flex items-center gap-3 text-xs text-slate-400">
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 font-bold uppercase">
                    {activeArticle.category}
                  </span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                  <span>·</span>
                  <span>Published {activeArticle.publishedDate}</span>
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                  {activeArticle.title}
                </h1>

                <p className="text-base md:text-lg text-slate-600 dark:text-stone-300 italic mb-8 pb-6 border-b border-slate-200 dark:border-stone-800">
                  {activeArticle.summary}
                </p>

                {/* Article Body */}
                <div className="space-y-8">
                  {activeArticle.content.sections.map((sec, sIdx) => (
                    <section key={sIdx} className="space-y-4">
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                        {sec.heading}
                      </h2>
                      {sec.body.map((p, pIdx) => (
                        <p key={pIdx} className="text-sm md:text-base text-slate-600 dark:text-stone-300 leading-relaxed">
                          {p}
                        </p>
                      ))}

                      {sec.callout && (
                        <div className={`p-4 md:p-6 rounded-2xl border text-sm leading-relaxed ${
                          sec.callout.type === 'warning'
                            ? 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300'
                            : sec.callout.type === 'tip'
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300'
                            : 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300'
                        }`}>
                          <div className="font-bold mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>{sec.callout.title}</span>
                          </div>
                          <div>{sec.callout.text}</div>
                        </div>
                      )}

                      {sec.list && (
                        <ul className="space-y-2.5 pt-2">
                          {sec.list.map((item, lIdx) => (
                            <li key={lIdx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-stone-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>

                {/* Article Action Footer */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 dark:text-stone-400">
                    Need customized implementation advice for your infrastructure?
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      cyberAudio.playClick();
                      setActiveArticle(null);
                      onOpenConsultation?.();
                    }}
                    className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Consult with Senior Auditor
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead Magnet CTA Banner */}
        <section className="text-center py-16 px-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-blue-500/10 border border-orange-500/20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Need Expert Assistance with Indian Cyber Regulations?
          </h2>
          <p className="text-slate-600 dark:text-stone-300 max-w-2xl mx-auto mb-8 text-base">
            CYBRAVION delivers turnkey compliance advisory, risk assessments, and technical audits for DPDP Act, ISO 27001, SOC 2, and CERT-In directives.
          </p>
          <button
            type="button"
            onClick={() => {
              cyberAudio.playClick();
              onOpenConsultation?.();
            }}
            className="px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/30 transition-transform transform hover:-translate-y-0.5"
          >
            Request Regulatory Compliance Audit
          </button>
        </section>
      </div>
    </div>
  );
};
