import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Cpu, 
  Globe, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Terminal, 
  Brain, 
  Users, 
  Clock, 
  Phone, 
  Mail, 
  Navigation,
  Compass,
  Layers,
  MapPin,
  ExternalLink,
  Copy,
  ChevronRight,
  TrendingUp,
  Landmark,
  Key
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { OfficeLocationMap } from '../components/OfficeLocationMap';

interface AboutUsPageProps {
  setCurrentView?: (view: string) => void;
  onOpenAuditModal?: () => void;
  isDarkMode?: boolean;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ 
  setCurrentView, 
  onOpenAuditModal,
  isDarkMode = true 
}) => {
  const [copied, setCopied] = React.useState(false);

  const fullAddress = "H. IN.KH.NO.293 S/F WESTERN MARG SAIDULAJAB NEW DELHI NEAR KHER SINGH ESTATE DELHI-110030";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const corporateMetrics = [
    { value: "99.99%", label: "Defensive SLA", desc: "Guaranteed uptime across protected customer perimeters." },
    { value: "100+", label: "Enterprise Audits", desc: "Critical security assessments, VAPT, & architecture reviews." },
    { value: "< 15m", label: "Incident Triage", desc: "Rapid SOC sentinel response and containment lifecycle." },
    { value: "100%", label: "Sovereign AI", desc: "Air-gapped on-premise neural defense deployments." }
  ];

  const corePillars = [
    {
      icon: Shield,
      title: "Zero Trust Architecture",
      desc: "Granular microsegmentation, continuous identity verification, and least-privilege telemetry across multi-cloud and on-premise enclaves."
    },
    {
      icon: Brain,
      title: "Sovereign Neural AI Defense",
      desc: "Locally hosted, air-gapped machine learning models designed to detect 0-day exploits and abnormal behavioral signatures without data leakage."
    },
    {
      icon: Terminal,
      title: "Offensive Red Teaming",
      desc: "Adversarial emulation and black-box penetration testing simulating nation-state attack vectors to uncover latent business logic flaws."
    },
    {
      icon: Landmark,
      title: "GRC & Sovereign Compliance",
      desc: "Automated alignment with CERT-In directives, DPDP Act 2023, ISO/IEC 27001, SOC 2 Type II, HIPAA, and PCI-DSS compliance frameworks."
    },
    {
      icon: ShieldCheck,
      title: "AI Exception Management",
      desc: "Intelligent cyber risk triage and governance workflows ensuring security policy deviations are risk-scored, audited, and remediated."
    },
    {
      icon: Layers,
      title: "CyberVerse Simulation Labs",
      desc: "Next-gen immersive cybersecurity simulation environments, CTF battlegrounds, and workforce cyber defense drills."
    }
  ];

  const engagementRoadmap = [
    {
      step: "01",
      title: "Perimeter & Threat Surface Discovery",
      desc: "Passive OSINT, external attack surface mapping, shadow IT scanning, and structural architecture analysis."
    },
    {
      step: "02",
      title: "Adversarial Emulation & VAPT",
      desc: "Deep-dive offensive testing across APIs, cloud endpoints, microservices, and internal active directory vectors."
    },
    {
      step: "03",
      title: "Zero-Trust Hardening & Enforcement",
      desc: "Remediation blueprint deployment, cryptographic key lifecycle upgrades, and CI/CD security gating."
    },
    {
      step: "04",
      title: "Continuous SOC Sentinel & Compliance",
      desc: "Real-time threat monitoring, compliance drift alerting, automated exceptions tracking, and executive governance."
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
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
        <link rel="canonical" href="https://cybravions.online/#about" />
      </Helmet>

      {/* Atmospheric Background Glows */}
      <div className="fixed inset-0 z-0 opacity-25 pointer-events-none">
        <div className="absolute top-10 -left-28 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-28 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px]" />
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
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-stone-900/80 border border-slate-300/80 dark:border-stone-700/80 backdrop-blur-md text-xs font-mono mb-8 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-800 dark:text-stone-300">Govt. of India MCA Registered Entity</span>
              <span className="text-slate-400 dark:text-stone-500">|</span>
              <span className="text-orange-600 dark:text-orange-400 font-bold">CIN: U62099DL2026PTC470901</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.1]">
              Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-blue-500">Cybersecurity Defense</span> for the Autonomous Era
            </h1>

            <p className="text-slate-600 dark:text-stone-300 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              <strong>CYBRAVION SOLUTIONS PRIVATE LIMITED</strong> builds sovereign AI security appliances, air-gapped threat defense, offensive red-teaming, and continuous risk governance for global enterprises.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#corporate-profile"
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Corporate Profile</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#office-location"
                className="px-6 py-3 rounded-xl bg-slate-200/80 dark:bg-stone-900 hover:bg-slate-300 dark:hover:bg-stone-800 text-slate-800 dark:text-stone-200 border border-slate-300 dark:border-stone-700 font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
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
        <section className="py-12 border-y border-slate-200/80 dark:border-stone-800/80 bg-slate-50/60 dark:bg-stone-950/40">
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
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500 font-mono">
                  {metric.value}
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-stone-200 mt-1 uppercase tracking-wider">
                  {metric.label}
                </div>
                <p className="text-xs text-slate-500 dark:text-stone-400 mt-1 font-light">
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
              <span className="text-xs uppercase tracking-[0.3em] text-orange-500 dark:text-orange-400 font-mono font-bold block">
                Company Overview
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Architecting Uncompromised <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">Cyber Sovereignty</span>
              </h2>
              <p className="text-slate-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed font-light">
                In an era dominated by autonomous weaponized exploits and nation-state cyber warfare, conventional perimeter defense is obsolete. <strong>CYBRAVION SOLUTIONS PRIVATE LIMITED</strong> was founded with a singular objective: delivering mathematically verifiable, sovereign cyber defense and zero-trust engineering to the world's most critical institutions.
              </p>
              <p className="text-slate-600 dark:text-stone-300 text-base leading-relaxed font-light">
                From offline air-gapped neural network appliances to automated continuous threat-modeling and offensive red teaming, our multidisciplinary teams of security architects, exploit researchers, and GRC engineers protect mission-critical operations across banking, critical national infrastructure, defense systems, and hyper-growth enterprises.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 shadow-sm flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Our Mission</h4>
                    <p className="text-xs text-slate-600 dark:text-stone-400 mt-1 font-light">
                      To neutralize advanced cyber threats through cryptographic precision, air-gapped AI, and proactive offensive auditing.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 shadow-sm flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                    <Compass size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Our Vision</h4>
                    <p className="text-xs text-slate-600 dark:text-stone-400 mt-1 font-light">
                      To become the global benchmark in sovereign cybersecurity appliances, resilient zero-trust frameworks, and gamified defense training.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Corporate Details Card (MCA Certified) */}
            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl bg-white dark:bg-stone-900/90 border border-slate-200 dark:border-stone-800 shadow-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-stone-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 text-white dark:bg-stone-800 shrink-0">
                      <Building2 size={22} className="text-orange-500" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-stone-400 font-mono block">
                        Official Entity
                      </span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                        CYBRAVION SOLUTIONS PVT LTD
                      </h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/20">
                    Active &amp; Verified
                  </span>
                </div>

                <div className="py-6 space-y-4 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100 dark:border-stone-800/60">
                    <span className="text-slate-500 dark:text-stone-400">Corporate Identification (CIN):</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">U62099DL2026PTC470901</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100 dark:border-stone-800/60">
                    <span className="text-slate-500 dark:text-stone-400">Company Category:</span>
                    <span className="text-slate-800 dark:text-stone-200">Company limited by Shares / Non-govt</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100 dark:border-stone-800/60">
                    <span className="text-slate-500 dark:text-stone-400">Registrar of Companies:</span>
                    <span className="text-slate-800 dark:text-stone-200">RoC Delhi (Govt. of India)</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100 dark:border-stone-800/60">
                    <span className="text-slate-500 dark:text-stone-400">Primary Official Contact:</span>
                    <a href="tel:+917258880881" className="text-blue-600 dark:text-blue-400 hover:underline">
                      +91-7258880881
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100 dark:border-stone-800/60">
                    <span className="text-slate-500 dark:text-stone-400">Official Communications:</span>
                    <a href="mailto:support@cybravions.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      support@cybravions.com
                    </a>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-500 dark:text-stone-400 block mb-1.5">Registered Office Address:</span>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-stone-950 border border-slate-200 dark:border-stone-800 text-slate-800 dark:text-stone-300 text-[11px] leading-relaxed">
                      {fullAddress}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-stone-800 hover:bg-slate-200 dark:hover:bg-stone-700 text-slate-800 dark:text-stone-200 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>{copied ? "Address Copied!" : "Copy Full Address"}</span>
                  </button>

                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=28.519429,77.201125"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Navigation size={14} />
                    <span>Navigate</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================
           4. CORE ENGINEERING & DEFENSE PILLARS
        ============================================================ */}
        <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 border-t border-slate-200/80 dark:border-stone-800/80 bg-slate-50/50 dark:bg-stone-950/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-mono font-bold block mb-2">
                Capabilities &amp; Specialization
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Core Architectural Pillars
              </h2>
              <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-light">
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
                  className="p-8 rounded-3xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 hover:border-orange-500/40 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-500 dark:text-orange-400 w-fit mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <pillar.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed font-light">
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
            <span className="text-xs uppercase tracking-[0.3em] text-orange-500 dark:text-orange-400 font-mono font-bold block mb-2">
              Lifecycle Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              How We Protect Your Enterprise
            </h2>
            <p className="text-slate-600 dark:text-stone-400 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-light">
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
                className="p-6 rounded-2xl bg-white dark:bg-stone-900/60 border border-slate-200 dark:border-stone-800 relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 block mb-3">
                    {stage.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed font-light">
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
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-stone-900 to-black text-white relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

            <span className="text-xs uppercase tracking-[0.3em] text-orange-400 font-mono font-bold block mb-4">
              Sovereign Partnership
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Upgrade Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400">Defensive Posture?</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light leading-relaxed">
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
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
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
