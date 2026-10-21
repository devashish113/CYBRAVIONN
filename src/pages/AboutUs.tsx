import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import { PageHeader } from '../components/PageHeader';
import { WaterGlassCard } from '../components/WaterGlassCard';
import { XTwitterIcon } from '../components/XTwitterIcon';

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

  const fullAddress = "H. IN.KH.NO.293 S/F Western Marg, Saidulajab, Near Kher Singh Estate, New Delhi, Delhi 110030";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const corporateMetrics = [
    { value: "Zero Trust", label: "Defensive Architecture", desc: "Micro-segmented perimeters & cryptographic verification" },
    { value: "Air-Gapped", label: "Private AI Security", desc: "100% on-premises neural models with zero cloud telemetry" },
    { value: "ISO & SOC 2", label: "Audit-Ready Engineering", desc: "Structured frameworks across NIST CSF 2.0 & DPDP Act" },
    { value: "Full-Stack", label: "Offensive VAPT", desc: "Proactive adversary emulation across Web, APIs & Cloud" }
  ];

  const corePillars = [
    {
      icon: ShieldCheck,
      title: "Cybersecurity Consultancy",
      desc: "Governance, Risk & Compliance (GRC), Third-Party Risk Management (TPRM), Supply Chain Risk Management (SCRM), VAPT, WAPT, secure network architecture reviews, and threat modelling."
    },
    {
      icon: Cpu,
      title: "IT & Cybersecurity Solutions",
      desc: "Design and development of advanced IT and cybersecurity solutions, including AI/ML-driven tools for SOC alert triage, GRC automation, and custom security software."
    },
    {
      icon: Server,
      title: "Cloud Deployment",
      desc: "Robust cloud deployment and orchestration solutions for business applications and websites through suitable enterprise infrastructure partnerships, hardened security, and high uptime."
    },
    {
      icon: Award,
      title: "Online IT & Cybersecurity Training",
      desc: "Helping individuals and organisations strengthen their IT knowledge, cybersecurity awareness, workforce phishing defenses, and hands-on technical capabilities."
    },
    {
      icon: Sparkles,
      title: "Digital Marketing",
      desc: "Helping businesses enhance their digital presence, improve online visibility, and strategically promote their products and services to achieve sustainable growth."
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

  return (
    <div className="pt-24 min-h-screen relative bg-transparent text-slate-900 dark:text-stone-100 selection:bg-purple-500/20 selection:text-purple-900">
      {/* Atmospheric Cybernetic Background Glows & Dynamic Depth */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Architectural Vignette */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)' }}
        />
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
           1. HERO SECTION (Unified Sarvam Editorial Craft)
        ============================================================ */}
        <PageHeader
          kicker="MCA Incorporated Corporate Entity · CIN: U62099DL2026PTC470901"
          title="Growth-Focused B2B &amp; B2G Partner"
          italicTitle="Innovate, Secure &amp; Grow."
          description="Are you looking for a growth-focused research-oriented cybersecurity and technology partner for your B2B or B2G requirements? At CYBRAVION Solutions Pvt Ltd, we bring together cybersecurity, IT solutions, online training, and digital marketing to help organizations strengthen & secure their digital foundations, build capabilities, and expand their online presence."
          isDarkMode={isDarkMode}
          actions={
            <>
              <a
                href="#corporate-profile"
                className="group inline-flex items-center justify-center cursor-pointer font-medium rounded-full min-h-[46px] px-8 py-3 text-xs text-white active:scale-[0.97] transition-all duration-200 btn-tactile-primary"
              >
                <span className="flex items-center gap-2">
                  <span className="font-semibold tracking-wide">Explore Corporate Profile</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
              <a
                href="#office-location"
                className="inline-flex items-center justify-center cursor-pointer font-medium rounded-full min-h-[46px] px-8 py-3 text-xs active:scale-[0.97] transition-all duration-200 btn-tactile-outline"
              >
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-amber-500" />
                  <span className="font-semibold tracking-wide">Headquarters &amp; Map</span>
                </span>
              </a>
            </>
          }
        />

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
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-black font-mono ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
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
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-stone-400 font-mono font-semibold block">
                Company Overview
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight leading-tight text-neutral-900 dark:text-white">
                Strengthening Foundations, <br className="hidden sm:inline" />
                <span className="italic font-light text-neutral-500 dark:text-neutral-400">
                  Building Capabilities &amp; Growth.
                </span>
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed font-normal ${
                isDarkMode ? 'text-stone-200' : 'text-slate-700'
              }`}>
                Are you planning to innovate, manage risks, strengthen security, and grow your business simultaneously? At <strong className={isDarkMode ? 'text-white font-semibold' : 'text-slate-950 font-semibold'}>CYBRAVION SOLUTIONS PRIVATE LIMITED</strong>, we bring together cybersecurity, IT solutions, online training, and digital marketing to help businesses and organisations strengthen &amp; secure their digital foundations, build capabilities, and expand their online presence.
              </p>
              <p className={`text-base leading-relaxed font-normal ${
                isDarkMode ? 'text-stone-300' : 'text-slate-600'
              }`}>
                At CYBRAVIONS, we aim to combine research, innovation, and practical solutions to address evolving business and technology needs. Whether providing deep technical penetration testing (VAPT), architecting AI/ML-driven automation for SOC alert triage, delivering reliable cloud deployment, or empowering workforces through technical cyber training, our focus is enabling sustainable, resilient growth.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <WaterGlassCard className="p-5 flex items-start gap-3 flex-1">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400 shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Our Mission</h4>
                    <p className="text-xs mt-1 font-normal text-slate-600 dark:text-stone-300">
                      To combine research, innovation, and practical solutions to address evolving business and technology needs. Let's build, secure, and grow together.
                    </p>
                  </div>
                </WaterGlassCard>

                <WaterGlassCard className="p-5 flex items-start gap-3 flex-1">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 shrink-0">
                    <Compass size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Our Approach</h4>
                    <p className="text-xs mt-1 font-normal text-slate-600 dark:text-stone-300">
                      Unifying cybersecurity consultancy, IT &amp; AI solutions, secure cloud deployment, online training, and digital marketing into a cohesive growth engine.
                    </p>
                  </div>
                </WaterGlassCard>
              </div>
            </div>

            {/* Statutory Corporate Details Card (MCA Certified) */}
            <div className="lg:col-span-6">
              <div className={`p-8 rounded-3xl border shadow-2xl relative overflow-hidden ${
                isDarkMode 
                  ? 'bg-[#0b1222] border-blue-500/20 text-stone-100' 
                  : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/60'
              }`}>
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className={`flex items-center justify-between pb-6 border-b ${
                  isDarkMode ? 'border-stone-800' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 text-white dark:bg-stone-800 shrink-0">
                      <Building2 size={22} className="text-purple-500" />
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
                    <span className="font-bold text-purple-500">U62099DL2026PTC470901</span>
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
                    <span className={`font-semibold ${isDarkMode ? 'text-stone-200' : 'text-slate-800'}`}>Registrar of Companies (RoC Delhi)</span>
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
                        className="text-[10px] font-bold text-purple-500 hover:text-purple-400 flex items-center gap-1 hover:underline"
                      >
                        <span>MCA Portal</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                    <p className="text-[11px] leading-relaxed font-sans">
                      Verify directly on the official Ministry of Corporate Affairs (MCA) portal by entering CIN <strong className="font-mono text-purple-500">U62099DL2026PTC470901</strong> under Company/LLP Master Data.
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
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
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
                  <strong>CYBRAVION SOLUTIONS PRIVATE LIMITED</strong> operates strictly as a B2B Enterprise Cybersecurity, VAPT auditing, and Secure AI consulting firm for corporate entities, technology startups, and digital enterprises.
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
                  If contacted by scammers claiming to represent Cybravions, immediately report them to the official Cybercrime Reporting Portal at <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold underline">cybercrime.gov.in</a> or dial Helpline <strong className="text-purple-500">1930</strong>.
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
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono font-medium">
                  Capabilities &amp; Specialization
                </span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900 dark:text-white">
                Core Architectural <span className="italic font-light text-neutral-500 dark:text-neutral-400">Pillars.</span>
              </h2>
              <p className={`text-sm sm:text-base max-w-2xl mx-auto mt-3 font-normal ${
                isDarkMode ? 'text-stone-300' : 'text-slate-600'
              }`}>
                Our unified defense fabric bridges offensive intelligence, neural algorithms, and continuous regulatory compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corePillars.map((pillar, i) => (
                <WaterGlassCard
                  key={i}
                  className="p-8 flex flex-col justify-between"
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white w-fit mb-6">
                        <pillar.icon size={24} />
                      </div>
                      <h3 className="text-lg font-bold mb-2.5 text-slate-900 dark:text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-relaxed font-normal text-slate-600 dark:text-stone-300">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </WaterGlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           5. ENGAGEMENT LIFECYCLE / ROADMAP
        ============================================================ */}
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono font-medium">
                Lifecycle Methodology
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900 dark:text-white">
              How We Protect <span className="italic font-light text-neutral-500 dark:text-neutral-400">Your Enterprise.</span>
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
                  <span className={`text-2xl font-black font-mono block mb-3 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
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
           6. INTERACTIVE HEADQUARTERS MAP
        ============================================================ */}
        <OfficeLocationMap isDarkMode={isDarkMode} />

        {/* ============================================================
           7. CALL TO ACTION / BOTTOM MANIFESTO
        ============================================================ */}
        <section className="py-20 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-slate-900 dark:bg-[#0e1017] text-white relative overflow-hidden border border-slate-800 dark:border-white/10">
            <span className="text-xs uppercase tracking-[0.3em] text-stone-400 font-mono font-semibold block mb-4">
              Strategic Partnership
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
              Ready to Upgrade Your <span className="text-white font-semibold">Defensive Posture?</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Engage directly with our senior security researchers and principal zero-trust architects for a confidential posture evaluation or technical security briefing.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {onOpenAuditModal && (
                <button
                  onClick={onOpenAuditModal}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-black font-semibold text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99]"
                >
                  Request Security Audit
                </button>
              )}
              <a
                href="mailto:support@cybravions.com"
                className="px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Mail size={15} />
                <span>Contact Security Desk</span>
              </a>
              <a
                href="https://www.x.com/cybravions"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
                title="Follow CYBRAVIONS on X (@cybravions)"
              >
                <XTwitterIcon size={15} />
                <span>X (@cybravions)</span>
              </a>
              <a
                href="https://www.linkedin.com/company/cybravion-solutions-pvt-ltd/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
