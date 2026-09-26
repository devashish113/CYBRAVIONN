import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  Compass,
  Zap,
  Lock,
  Cpu,
  Globe2,
  FileCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  MapPin,
  ArrowRight,
  Sparkles,
  Server,
  Fingerprint,
  Mail,
  Phone,
  Navigation,
  AlertTriangle,
  Linkedin
} from 'lucide-react';
import { OfficeLocationMap } from '../components/OfficeLocationMap';

interface AboutUsProps {
  setCurrentView?: (view: string) => void;
  onOpenAuditModal?: () => void;
  isDarkMode?: boolean;
}

export const AboutUsPage: React.FC<AboutUsProps> = ({ 
  setCurrentView, 
  onOpenAuditModal,
  isDarkMode = true 
}) => {
  const [copied, setCopied] = useState(false);

  const fullAddress = "167-G, Ground Floor, Left Side, Katwaria Sarai, Hauz Khas, South West Delhi, New Delhi, Delhi, India, 110016";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const corporateMetrics = [
    { value: "99.99%", label: "Sustained Defense Uptime", desc: "For Sovereign Infrastructure & Air-Gapped AI Systems" },
    { value: "100+", label: "Enterprise Assets Protected", desc: "Zero-Trust Architectures & Multi-Cloud Footprints" },
    { value: "< 15m", label: "Incident Escalation SLA", desc: "Automated Red-Teaming & 24/7 Rapid Response" },
    { value: "100%", label: "Sovereign AI Deployment", desc: "Offline, Zero Cloud Leakage Neural Appliances" }
  ];

  const corePillars = [
    {
      icon: Lock,
      title: "Zero Trust Architecture",
      desc: "Micro-segmented network perimeters, mathematical IAM boundaries, and continuous cryptographic verification for enterprise workloads."
    },
    {
      icon: Cpu,
      title: "Sovereign Neural AI Defense",
      desc: "Fully air-gapped on-premises neural networks engineered for defense, government, and critical banking sectors with zero telemetry leaks."
    },
    {
      icon: Zap,
      title: "Offensive Red Teaming",
      desc: "Adversarial simulations and multi-vector penetration testing that uncover critical vulnerabilities before threat actors exploit them."
    },
    {
      icon: ShieldCheck,
      title: "GRC & Sovereign Compliance",
      desc: "Automated audit readiness for ISO 27001, SOC 2 Type II, NIST CSF 2.0, DPDP Act 2023, HIPAA, and national defense directives."
    },
    {
      icon: Fingerprint,
      title: "AI Exception Management",
      desc: "Automated machine learning risk scoring and mathematical waiver governance platform ensuring zero policy drift."
    },
    {
      icon: Server,
      title: "CyberVerse Simulation Labs",
      desc: "Next-generation gamified scenario training and browser-based hands-on cyber warfare sandboxes for enterprise teams."
    }
  ];

  const engagementRoadmap = [
    {
      step: "01",
      title: "Perimeter & Threat Surface Discovery",
      desc: "Deep-surface OSINT reconnaissance, cloud asset indexing, and dark web exposure discovery to identify perimeter entry points."
    },
    {
      step: "02",
      title: "Adversarial Simulation & VAPT",
      desc: "Multi-layered offensive testing across web, APIs, mobile, active directory, cloud infra, and physical hardware interfaces."
    },
    {
      step: "03",
      title: "Zero Trust Hardening & Governance",
      desc: "Architecting hardened IAM boundaries, micro-segmentation, SIEM playbooks, and automated GRC exception workflows."
    },
    {
      step: "04",
      title: "Continuous Verification & Compliance",
      desc: "Ongoing 24/7 threat monitoring, recurring automated red team audits, and executive compliance dashboards."
    }
  ];

  const leadershipTeam = [
    {
      name: "Devanshu Sharma",
      role: "Founder & Chief Executive Officer (CEO)",
      creds: "Sovereign AI Security · Systems Defense Architect",
      bio: "Pioneering air-gapped sovereign AI defense appliances, Zero Trust cryptographic architectures, and proactive offensive security operations for enterprises and critical infrastructure.",
      focus: "Strategic Architecture & Sovereign Defense",
      badge: "Executive Leadership",
      linkedin: "https://www.linkedin.com/company/cybravions"
    },
    {
      name: "Principal Red Team & Exploit Research",
      role: "Head of Offensive Security & VAPT",
      creds: "OSCP · OSCE · CEH Practical · CISSP Certified",
      bio: "Directs deep-surface multi-cloud penetration testing, zero-day exploit discovery, active adversary emulation, and automated vulnerability validation workflows.",
      focus: "Red Teaming, VAPT & Threat Emulation",
      badge: "Offensive Operations",
      linkedin: "https://www.linkedin.com/company/cybravions"
    },
    {
      name: "Principal ISMS & GRC Regulatory Lead",
      role: "Head of Governance, Risk & Compliance",
      creds: "ISO 27001 Lead Auditor · CISA · CRISC",
      bio: "Spearheads enterprise audit readiness and certification design across ISO/IEC 27001:2022, SOC 2 Type II, NIST CSF 2.0, DPDP Act 2023, and CERT-In mandates.",
      focus: "GRC, ISMS & DPDP Compliance",
      badge: "Regulatory Governance",
      linkedin: "https://www.linkedin.com/company/cybravions"
    }
  ];

  return (
    <div className="pt-24 min-h-screen relative bg-transparent text-slate-900 dark:text-stone-100 selection:bg-orange-500/20 selection:text-orange-900">
      <Helmet>
        <title>About Us &amp; Corporate Profile | CYBRAVION SOLUTIONS PRIVATE LIMITED</title>
        <meta 
          name="description" 
          content="Learn about CYBRAVION SOLUTIONS PRIVATE LIMITED (CIN: U62099DL2026PTC470901) - India's sovereign cybersecurity engineering, zero trust defense, and AI security firm headquartered in New Delhi." 
        />
        <meta 
          name="keywords" 
          content="CYBRAVION SOLUTIONS PRIVATE LIMITED, About Cybravions, CIN U62099DL2026PTC470901, cybersecurity company New Delhi, sovereign cybersecurity India, zero trust architecture, enterprise security firm" 
        />
        <link rel="canonical" href="https://cybravions.com/about" />
      </Helmet>

      {/* Atmospheric Cybernetic Background Glows & Dynamic Depth */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Neon Orange & Cyan Core Radial Nebulae */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[160px] animate-pulse" />
        <div className="absolute top-1/3 right-0 w-[650px] h-[650px] bg-gradient-to-tl from-orange-500/15 via-amber-500/10 to-transparent rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-transparent rounded-full blur-[150px]" />
        {/* Subtle Cyber Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.4) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <div className="relative z-10">
        
        {/* ============================================================
           1. HERO SECTION
        ============================================================ */}
        <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            {/* Government of India MCA Incorporation Verification Badge */}
            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md text-xs font-mono mb-8 shadow-sm ${
              isDarkMode 
                ? 'bg-stone-900/90 border-stone-700 text-stone-200' 
                : 'bg-white/95 border-slate-300 text-slate-800 shadow-md'
            }`}>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold">Govt. of India MCA Registered Entity</span>
              <span className={isDarkMode ? 'text-stone-600' : 'text-slate-300'}>|</span>
              <span className="text-orange-500 font-bold">CIN: U62099DL2026PTC470901</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.15] ${
              isDarkMode ? 'text-white' : 'text-slate-950'
            }`}>
              Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500">Cybersecurity Defense</span> for the Autonomous Era
            </h1>

            <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal ${
              isDarkMode ? 'text-stone-200' : 'text-slate-700'
            }`}>
              <strong className={isDarkMode ? 'text-white font-semibold' : 'text-slate-950 font-semibold'}>CYBRAVION SOLUTIONS PRIVATE LIMITED</strong> builds sovereign AI security appliances, air-gapped threat defense, offensive red-teaming, and continuous risk governance for global enterprises.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#corporate-profile"
                className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Corporate Profile</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#office-location"
                className={`px-6 py-3.5 rounded-xl border font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                  isDarkMode 
                    ? 'bg-stone-900/90 hover:bg-stone-800 text-stone-100 border-stone-700' 
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                }`}
              >
                <MapPin size={15} className="text-orange-500" />
                <span>Headquarters &amp; Map</span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* ============================================================
           2. METRICS STRIP
        ============================================================ */}
        <section className={`py-12 border-y transition-colors duration-300 ${
          isDarkMode 
            ? 'border-stone-800 bg-[#080d1a]/80' 
            : 'border-slate-200 bg-white/90 shadow-sm'
        }`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {corporateMetrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500 font-mono">
                  {metric.value}
                </div>
                <div className={`text-sm font-bold mt-1.5 uppercase tracking-wider ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {metric.label}
                </div>
                <p className={`text-xs mt-1 font-medium ${
                  isDarkMode ? 'text-stone-300' : 'text-slate-600'
                }`}>
                  {metric.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
           3. WHO WE ARE & MISSION
        ============================================================ */}
        <section id="corporate-profile" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-mono font-bold block">
                Company Overview
              </span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight ${
                isDarkMode ? 'text-white' : 'text-slate-950'
              }`}>
                Architecting Uncompromised <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">Cyber Sovereignty</span>
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed font-normal ${
                isDarkMode ? 'text-stone-200' : 'text-slate-700'
              }`}>
                In an era dominated by autonomous weaponized exploits and nation-state cyber warfare, conventional perimeter defense is obsolete. <strong className={isDarkMode ? 'text-white font-semibold' : 'text-slate-950 font-semibold'}>CYBRAVION SOLUTIONS PRIVATE LIMITED</strong> was founded with a singular objective: delivering mathematically verifiable, sovereign cyber defense and zero-trust engineering to the world's most critical institutions.
              </p>
              <p className={`text-base leading-relaxed font-normal ${
                isDarkMode ? 'text-stone-300' : 'text-slate-600'
              }`}>
                From offline air-gapped neural network appliances to automated continuous threat-modeling and offensive red teaming, our multidisciplinary teams of security architects, exploit researchers, and GRC engineers protect mission-critical operations across banking, critical national infrastructure, defense systems, and hyper-growth enterprises.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <div className={`p-5 rounded-2xl border shadow-md flex items-start gap-3 flex-1 ${
                  isDarkMode 
                    ? 'bg-[#0b101e] border-stone-800' 
                    : 'bg-white border-slate-200 shadow-slate-200/50'
                }`}>
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Our Mission</h4>
                    <p className={`text-xs mt-1 font-normal ${isDarkMode ? 'text-stone-300' : 'text-slate-600'}`}>
                      To neutralize advanced cyber threats through cryptographic precision, air-gapped AI, and proactive offensive auditing.
                    </p>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border shadow-md flex items-start gap-3 flex-1 ${
                  isDarkMode 
                    ? 'bg-[#0b101e] border-stone-800' 
                    : 'bg-white border-slate-200 shadow-slate-200/50'
                }`}>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                    <Compass size={22} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>Our Vision</h4>
                    <p className={`text-xs mt-1 font-normal ${isDarkMode ? 'text-stone-300' : 'text-slate-600'}`}>
                      To become the global benchmark in sovereign cybersecurity appliances, resilient zero-trust frameworks, and gamified defense training.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Corporate Details Card (MCA Certified) */}
            <div className="lg:col-span-6">
              <div className={`p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-[#0b1222] border-blue-500/20 text-stone-100' 
                  : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/60'
              }`}>
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className={`flex items-center justify-between pb-6 border-b ${
                  isDarkMode ? 'border-stone-800' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 text-white dark:bg-stone-800 shrink-0">
                      <Building2 size={22} className="text-orange-500" />
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase tracking-widest font-mono block ${
                        isDarkMode ? 'text-stone-400' : 'text-slate-500'
                      }`}>
                        Official Entity
                      </span>
                      <h3 className={`font-bold text-base leading-tight ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        CYBRAVION SOLUTIONS PVT LTD
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/20">
                    Active &amp; Verified
                  </span>
                </div>

                <div className="py-6 space-y-4 font-mono text-xs">
                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b ${
                    isDarkMode ? 'border-stone-800/80' : 'border-slate-100'
                  }`}>
                    <span className={isDarkMode ? 'text-stone-400' : 'text-slate-500'}>Corporate Identification (CIN):</span>
                    <span className="font-bold text-orange-500">U62099DL2026PTC470901</span>
                  </div>

                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b ${
                    isDarkMode ? 'border-stone-800/80' : 'border-slate-100'
                  }`}>
                    <span className={isDarkMode ? 'text-stone-400' : 'text-slate-500'}>Company Category:</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-stone-200' : 'text-slate-800'}`}>Company limited by Shares / Non-govt</span>
                  </div>

                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b ${
                    isDarkMode ? 'border-stone-800/80' : 'border-slate-100'
                  }`}>
                    <span className={isDarkMode ? 'text-stone-400' : 'text-slate-500'}>Registrar of Companies:</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-stone-200' : 'text-slate-800'}`}>RoC Delhi (Govt. of India)</span>
                  </div>

                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b ${
                    isDarkMode ? 'border-stone-800/80' : 'border-slate-100'
                  }`}>
                    <span className={isDarkMode ? 'text-stone-400' : 'text-slate-500'}>Primary Official Contact:</span>
                    <a href="tel:+917258880881" className="text-blue-500 font-bold hover:underline">
                      +91-7258880881
                    </a>
                  </div>

                  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b ${
                    isDarkMode ? 'border-stone-800/80' : 'border-slate-100'
                  }`}>
                    <span className={isDarkMode ? 'text-stone-400' : 'text-slate-500'}>Official Communications:</span>
                    <a href="mailto:support@cybravions.com" className="text-blue-500 font-bold hover:underline">
                      support@cybravions.com
                    </a>
                  </div>

                  <div className={`p-3.5 rounded-2xl border ${
                    isDarkMode 
                      ? 'bg-blue-950/20 border-blue-500/20 text-stone-300' 
                      : 'bg-blue-50/70 border-blue-200 text-slate-800'
                  }`}>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-bold text-[11px] text-blue-500 flex items-center gap-1.5">
                        <ShieldCheck size={14} />
                        Official MCA Master Data Verification
                      </span>
                      <a
                        href="https://www.mca.gov.in/mcafoportal/companyLLPMasterData.do"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-orange-500 hover:text-orange-400 flex items-center gap-1 hover:underline"
                      >
                        <span>MCA Portal</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                    <p className="text-[11px] leading-relaxed font-sans">
                      Verify directly on the Govt. of India Ministry of Corporate Affairs portal by entering CIN <strong className="font-mono text-orange-500">U62099DL2026PTC470901</strong> under Company/LLP Master Data.
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className={`block mb-1.5 ${isDarkMode ? 'text-stone-400' : 'text-slate-500'}`}>Registered Office Address:</span>
                    <div className={`p-3.5 rounded-xl border text-[11px] leading-relaxed font-sans ${
                      isDarkMode 
                        ? 'bg-[#060a14] border-stone-800 text-stone-200' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 font-medium'
                    }`}>
                      {fullAddress}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={handleCopy}
                    className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border ${
                      isDarkMode 
                        ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>{copied ? "Address Copied!" : "Copy Full Address"}</span>
                  </button>

                  <a
                    href="https://www.mca.gov.in/mcafoportal/companyLLPMasterData.do"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <ShieldCheck size={14} />
                    <span>Verify on MCA</span>
                  </a>

                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=28.519429,77.201125"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Navigation size={14} />
                    <span>Map</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================
           3.5. PUBLIC ANTI-FRAUD & SCAM IMPERSONATION ADVISORY
        ============================================================ */}
        <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto pb-12">
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden ${
            isDarkMode 
              ? 'bg-[#0f172a]/80 border-red-500/30 text-stone-200' 
              : 'bg-red-50/70 border-red-200 text-slate-800'
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-red-500/20">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-500/15 text-red-500 border border-red-500/30 shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-red-500 block">
                    Public Consumer Protection &amp; Anti-Fraud Notice
                  </span>
                  <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
                    Official Alert: Awareness Regarding Unsolicited Telegram &amp; WhatsApp Recruitment Scams
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-mono font-bold border border-red-500/20 shrink-0">
                I4C &amp; Cybercrime Awareness
              </span>
            </div>

            <div className="pt-4 grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs leading-relaxed font-sans">
              <div className="space-y-2">
                <div className="font-bold text-sm text-red-500 font-mono flex items-center gap-1.5">
                  <span>1. B2B Enterprise Mandate Only</span>
                </div>
                <p className={isDarkMode ? 'text-stone-300' : 'text-slate-600'}>
                  <strong>CYBRAVION SOLUTIONS PRIVATE LIMITED</strong> operates strictly as a B2B Enterprise Cybersecurity, VAPT auditing, and Sovereign AI firm for corporate entities, financial institutions, and government infrastructure.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-sm text-red-500 font-mono flex items-center gap-1.5">
                  <span>2. Zero "Work From Home" / Task Hiring</span>
                </div>
                <p className={isDarkMode ? 'text-stone-300' : 'text-slate-600'}>
                  We <strong>NEVER</strong> offer part-time jobs, captcha-filling, data-entry, or task assignments over Telegram, WhatsApp, or SMS. We <strong>NEVER</strong> solicit registration fees, training charges, security deposits, or crypto payments.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-sm text-red-500 font-mono flex items-center gap-1.5">
                  <span>3. Report Imposters Immediately</span>
                </div>
                <p className={isDarkMode ? 'text-stone-300' : 'text-slate-600'}>
                  If contacted by scammers claiming to represent Cybravions, immediately report them to the National Cybercrime Portal at <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold underline">cybercrime.gov.in</a> or dial Helpline <strong className="text-orange-500">1930</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           4. CORE ENGINEERING & DEFENSE PILLARS
        ============================================================ */}
        <section className={`py-20 md:py-28 px-6 md:px-12 lg:px-20 border-t transition-colors duration-300 ${
          isDarkMode 
            ? 'border-stone-800/80 bg-[#060a14]/60' 
            : 'border-slate-200 bg-slate-100/60'
        }`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-blue-500 font-mono font-bold block mb-2">
                Capabilities &amp; Specialization
              </span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-950'
              }`}>
                Core Architectural Pillars
              </h2>
              <p className={`text-sm sm:text-base max-w-2xl mx-auto mt-3 font-normal ${
                isDarkMode ? 'text-stone-300' : 'text-slate-600'
              }`}>
                Our sovereign defense fabric bridges offensive intelligence, neural algorithms, and continuous regulatory compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corePillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-8 rounded-3xl border shadow-lg hover:border-orange-500/40 hover:shadow-2xl transition-all duration-300 group ${
                    isDarkMode 
                      ? 'bg-[#0b101e] border-stone-800/90 text-stone-100' 
                      : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
                  }`}
                >
                  <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-500 dark:text-orange-400 w-fit mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <pillar.icon size={24} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2.5 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {pillar.title}
                  </h3>
                  <p className={`text-sm leading-relaxed font-normal ${
                    isDarkMode ? 'text-stone-300' : 'text-slate-600'
                  }`}>
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           5. ENGAGEMENT LIFECYCLE / ROADMAP
        ============================================================ */}
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-mono font-bold block mb-2">
              Lifecycle Methodology
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-950'
            }`}>
              How We Protect Your Enterprise
            </h2>
            <p className={`text-sm sm:text-base max-w-2xl mx-auto mt-3 font-normal ${
              isDarkMode ? 'text-stone-300' : 'text-slate-600'
            }`}>
              A systematic, mathematically verified lifecycle engineered to eliminate blind spots and enforce zero trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementRoadmap.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border shadow-md relative flex flex-col justify-between ${
                  isDarkMode 
                    ? 'bg-[#0b101e] border-stone-800 text-stone-100' 
                    : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
                }`}
              >
                <div>
                  <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 block mb-3">
                    {stage.step}
                  </span>
                  <h3 className={`text-base font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {stage.title}
                  </h3>
                  <p className={`text-xs leading-relaxed font-normal ${
                    isDarkMode ? 'text-stone-300' : 'text-slate-600'
                  }`}>
                    {stage.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================
           5.5. EXECUTIVE LEADERSHIP & SECURITY RESEARCH TEAM
        ============================================================ */}
        <section className={`py-20 md:py-28 px-6 md:px-12 lg:px-20 border-t transition-colors duration-300 ${
          isDarkMode 
            ? 'border-stone-800/80 bg-[#060a14]/60' 
            : 'border-slate-200 bg-slate-50/70'
        }`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-blue-500 font-mono font-bold block mb-2">
                Executive Governance &amp; Research
              </span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-950'
              }`}>
                Leadership &amp; Security Engineering Council
              </h2>
              <p className={`text-sm sm:text-base max-w-2xl mx-auto mt-3 font-normal ${
                isDarkMode ? 'text-stone-300' : 'text-slate-600'
              }`}>
                Guided by seasoned security architects, certified exploit researchers, and regulatory compliance leaders under Indian corporate governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipTeam.map((leader, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-3xl border shadow-xl flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300 group ${
                    isDarkMode 
                      ? 'bg-[#0b101e] border-stone-800 text-stone-100' 
                      : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-mono font-bold border border-orange-500/20">
                        {leader.badge}
                      </span>
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-blue-500/10 hover:text-blue-500 dark:bg-stone-900 dark:hover:bg-blue-500/20 text-slate-600 dark:text-stone-400 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin size={16} />
                      </a>
                    </div>

                    <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {leader.name}
                    </h3>
                    <div className="text-xs font-mono font-semibold text-orange-500 mb-2">
                      {leader.role}
                    </div>
                    <div className={`text-[11px] font-mono font-medium pb-4 mb-4 border-b ${
                      isDarkMode ? 'text-stone-400 border-stone-800' : 'text-slate-500 border-slate-100'
                    }`}>
                      {leader.creds}
                    </div>

                    <p className={`text-xs leading-relaxed font-normal mb-6 ${
                      isDarkMode ? 'text-stone-300' : 'text-slate-600'
                    }`}>
                      {leader.bio}
                    </p>
                  </div>

                  <div className={`pt-4 border-t flex items-center justify-between text-[11px] font-mono ${
                    isDarkMode ? 'border-stone-800/80 text-blue-400' : 'border-slate-100 text-blue-600'
                  }`}>
                    <span>Focus: {leader.focus}</span>
                    <ShieldCheck size={14} className="text-emerald-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           6. INTERACTIVE HEADQUARTERS MAP
        ============================================================ */}
        <OfficeLocationMap isDarkMode={isDarkMode} />

        {/* ============================================================
           7. CALL TO ACTION / BOTTOM MANIFESTO
        ============================================================ */}
        <section className="py-20 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#060a14] via-[#0b1222] to-black text-white relative overflow-hidden border border-blue-500/20 shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

            <span className="text-xs uppercase tracking-[0.3em] text-orange-400 font-mono font-bold block mb-4">
              Sovereign Partnership
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
              Ready to Upgrade Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400">Defensive Posture?</span>
            </h2>
            <p className="text-stone-200 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Engage directly with our senior security researchers and principal zero-trust architects for a confidential posture evaluation or sovereign AI briefing.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {onOpenAuditModal && (
                <button
                  onClick={onOpenAuditModal}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/30 cursor-pointer"
                >
                  Request Security Audit
                </button>
              )}
              <a
                href="mailto:support@cybravions.com"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <Mail size={15} />
                <span>Contact Security Desk</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
