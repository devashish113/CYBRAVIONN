import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Target, 
  Zap, 
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  GraduationCap, 
  Search, 
  Eye, 
  Radar, 
  CheckCircle2,
  X,
  Mail,
  Phone,
  Play,
  Hexagon,
  LayoutGrid,
  Cloud,
  Terminal,
  ShieldAlert,
  FileCheck,
  Brain,
  Award
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PolygonHexCard } from '../components/PolygonHexCard';
import { cyberAudio } from '../utils/cyberAudio';

const ProgramModal = ({ program, isOpen, onClose }: { program: any, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
        aria-hidden="true"
      />
      <motion.div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="training-program-modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 text-slate-900 dark:text-white"
      >
        <button 
          onClick={onClose}
          aria-label="Close program details modal"
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-slate-500 dark:text-stone-400" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400" aria-hidden="true">
            {program.icon && (() => {
              const IconComp = program.icon;
              return typeof IconComp === 'function' || (typeof IconComp === 'object' && IconComp !== null)
                ? <IconComp className="w-6 h-6" />
                : IconComp;
            })()}
          </div>
          <div>
            <h2 id="training-program-modal-title" className="text-2xl font-semibold text-slate-900 dark:text-white">{program.title}</h2>
            <p className="text-slate-600 dark:text-stone-400 text-sm">{program.outcome}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-slate-500 dark:text-stone-500 font-bold mb-3">What you'll learn</h3>
            <ul className="space-y-2">
              {program.topics.map((topic: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-slate-500 dark:text-stone-500 font-bold mb-2">Target Audience</h3>
              <p className="text-sm text-slate-700 dark:text-stone-300">{program.audience}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-500 dark:text-stone-500 font-bold mb-1">Duration</h3>
                <p className="text-sm text-slate-700 dark:text-stone-300">{program.duration}</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-500 dark:text-stone-500 font-bold mb-1">Mode</h3>
                <p className="text-sm text-slate-700 dark:text-stone-300">{program.mode}</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20 cursor-pointer"
        >
          Request Program Details
        </button>
      </motion.div>
    </div>
  );
};

interface TrainingPageProps {
  isDarkMode?: boolean;
  setCurrentView?: (view: any) => void;
  onOpenConsultation?: () => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({
  isDarkMode: isDarkModeProp,
  setCurrentView,
  onOpenConsultation,
}) => {
  const isDarkMode = isDarkModeProp ?? (typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>('ALL');
  const [trackLayoutMode, setTrackLayoutMode] = useState<'honeycomb' | 'grid'>('honeycomb');

  const handleTrainingInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    const formData = new FormData(form);
    formData.set('access_key', accessKey);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Form submission failed');
      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  };

  const categories = [
    { 
      tag: "AWARENESS",
      title: "Cybersecurity Awareness", 
      boldOutcome: "Human Firewall Defense",
      outcome: "Build a security-first culture and reduce human-centric risks through engaging awareness programs and live phishing drills.",
      icon: ShieldCheck,
      glow: "blue" as const,
      image: "/images/services/training.jpg",
      topics: ["Phishing simulation & lure detection", "Social engineering & pretexting defense", "Zero-trust credential & password security", "Operational hygiene for remote workforces"],
      audience: "All corporate employees, executive staff, operations, and interns.",
      duration: "1 Day / Weekly Sprints",
      mode: "Online / Enterprise Hybrid",
    },
    { 
      tag: "TECHNICAL",
      title: "Technical Training", 
      boldOutcome: "Upskill Your Defenders",
      outcome: "Hands-on mastery for security engineers and IT operations focusing on advanced exploit vectors and containment playbooks.",
      icon: Zap,
      glow: "orange" as const,
      image: "/images/services/offensive-sec.jpg",
      topics: ["VAPT & API pentesting methodologies", "Multi-Cloud Security hardening (AWS & Azure)", "Active Directory & EDR evasion defense", "Container breakout & Kubernetes privilege escalation"],
      audience: "IT teams, security analysts, DevOps, and developers.",
      duration: "3-5 Days Intensive",
      mode: "Hands-on Virtual Lab / On-Premise",
    },
    { 
      tag: "GOVERNANCE",
      title: "GRC & Compliance", 
      boldOutcome: "Master Modern Frameworks",
      outcome: "Master the statutory standards that govern modern cybersecurity including ISO 27001:2022, DPDP Act 2023, and SOC 2 Type II.",
      icon: BookOpen,
      glow: "purple" as const,
      image: "/images/services/grc.jpg",
      topics: ["ISO 27001:2022 ISMS internal auditor training", "DPDP Act 2023 Data Fiduciary compliance controls", "NIST CSF 2.0 governance & risk register mapping", "Third-Party Risk Management (TPRM) vendor auditing"],
      audience: "Compliance officers, DPOs, legal counsel, and risk managers.",
      duration: "2-4 Days Executive",
      mode: "Interactive Framework Workshop / Hybrid",
    },
    { 
      tag: "EXECUTIVE",
      title: "Executive Training", 
      boldOutcome: "Strategic Risk Leadership",
      outcome: "Strategic cyber risk governance for C-suite and board members to translate technical vulnerabilities into fiduciary resilience.",
      icon: Target,
      glow: "cyan" as const,
      image: "/images/services/ai-security.jpg",
      topics: ["Board-level cyber risk quantification & reporting", "High-stakes ransomware crisis decision making", "Regulatory disclosures with CERT-In & legal counsel", "Cyber insurance policy alignment & liability mitigation"],
      audience: "CEOs, CISOs, CIOs, Board members, and Managing Directors.",
      duration: "Half-day Briefing",
      mode: "Exclusive Executive Enclave / In-Person",
    }
  ];

  const curriculumTracks = [
    { 
      tag: "TRACK 01", 
      title: "Zero Trust & Cloud Security Architecture", 
      desc: "Deep-dive into multi-cloud security architecture, IAM least-privilege, micro-segmentation, and continuous verification protocols.",
      duration: "40 Hours Intensive",
      badge: "Architecture",
      category: "CLOUD",
      icon: Cloud,
      glow: "cyan" as const,
      image: "/images/services/cloud-sec.jpg",
      topics: [
        "AWS, Azure & GCP zero-trust architectural blueprints",
        "IAM least-privilege matrix and automated permission boundaries",
        "Kubernetes CIS benchmarks and micro-segmentation enforcement",
        "Continuous posture validation and automated CI/CD gating"
      ],
      audience: "Cloud architects, DevSecOps engineers, infrastructure leads.",
      mode: "Hands-on Virtual Cloud Labs / Hybrid"
    },
    { 
      tag: "TRACK 02", 
      title: "Practical VAPT & Offensive Simulation", 
      desc: "Hands-on penetration testing methodologies, API security auditing, container escapes, and red team adversary emulation labs.",
      duration: "45 Hours Hands-on",
      badge: "Offensive Ops",
      category: "OFFENSIVE",
      icon: Terminal,
      glow: "orange" as const,
      image: "/images/services/offensive-sec.jpg",
      topics: [
        "OWASP Top 10 web and API offensive exploitation chaining",
        "Active Directory domain compromise and Kerberoasting attacks",
        "Docker container breakout and Kubernetes node compromise",
        "Bypassing modern EDR and offensive payload evasion"
      ],
      audience: "Penetration testers, ethical hackers, red team operators.",
      mode: "Dedicated Private CyberRange Labs"
    },
    { 
      tag: "TRACK 03", 
      title: "SOC Triage, SIEM & Incident Response", 
      desc: "Real-time threat hunting, log telemetry correlation, playbook automation, and containment strategies for modern SOC teams.",
      duration: "35 Hours Live Labs",
      badge: "Blue Team",
      category: "DEFENSIVE",
      icon: ShieldAlert,
      glow: "blue" as const,
      image: "/images/services/soc-triage.jpg",
      topics: [
        "SIEM rule engineering, threshold tuning and noise suppression",
        "MITRE ATT&CK framework event mapping and C2 hunting",
        "Ransomware live containment and automated SOAR orchestration",
        "Post-incident memory forensics and timeline reconstruction"
      ],
      audience: "SOC analysts (L1-L3), incident response handlers, threat hunters.",
      mode: "Simulated SOC Telemetry & Live Attack Feed"
    },
    { 
      tag: "TRACK 04", 
      title: "ISO 27001:2022 & DPDP Act Compliance", 
      desc: "End-to-end audit readiness, ISMS implementation, data principal workflow controls, and board-level risk reporting.",
      duration: "25 Hours Executive",
      badge: "GRC",
      category: "GOVERNANCE",
      icon: FileCheck,
      glow: "purple" as const,
      image: "/images/services/grc.jpg",
      topics: [
        "ISO 27001:2022 Annex A controls implementation & SoA authoring",
        "DPDP Act 2023 Data Fiduciary compliance & consent flows",
        "Third-Party Risk Management (TPRM) and vendor security audits",
        "CERT-In 6-hour incident disclosure and statutory log retention"
      ],
      audience: "GRC managers, DPOs, internal auditors, compliance leads.",
      mode: "Executive Workshop & Framework Toolkit"
    },
    { 
      tag: "TRACK 05", 
      title: "Enterprise AI & LLM Security Defense", 
      desc: "Securing enterprise AI pipelines against prompt injection, model poisoning, data exfiltration, and air-gapped model inference.",
      duration: "30 Hours Advanced",
      badge: "AI Defense",
      category: "AI",
      icon: Brain,
      glow: "cyan" as const,
      image: "/images/services/ai-security.jpg",
      topics: [
        "OWASP Top 10 for Large Language Models deep dive",
        "Indirect prompt injection and jailbreak mitigation filters",
        "RAG pipeline security, vector database access control & poisoning defense",
        "Air-gapped model serving, weights integrity and audit telemetry"
      ],
      audience: "AI/ML engineers, data science leads, security architects.",
      mode: "Interactive LLM Red Teaming Labs"
    },
    { 
      tag: "TRACK 06", 
      title: "Crisis Tabletop & Executive Cyber Resilience", 
      desc: "Scenario-based cyber crisis simulations for C-level leadership, legal counsel, and technical incident commanders.",
      duration: "16 Hours Immersion",
      badge: "Leadership",
      category: "LEADERSHIP",
      icon: Award,
      glow: "orange" as const,
      image: "/images/services/training.jpg",
      topics: [
        "High-stakes ransomware negotiation and decision-making drills",
        "Board of Directors crisis communication and stakeholder briefing",
        "Regulatory reporting coordination with CERT-In and law enforcement",
        "Post-breach operational continuity and cyber insurance execution"
      ],
      audience: "CISOs, CIOs, General Counsels, VP Engineering, Board members.",
      mode: "Facilitated Executive Simulation Enclave"
    }
  ];

  const trackFilterCategories = [
    { id: 'ALL', label: 'All Tracks (6)' },
    { id: 'CLOUD', label: 'Cloud & Zero Trust' },
    { id: 'OFFENSIVE', label: 'Offensive VAPT' },
    { id: 'DEFENSIVE', label: 'SOC & Blue Team' },
    { id: 'GOVERNANCE', label: 'GRC & ISO 27001' },
    { id: 'AI', label: 'AI & LLM Defense' },
    { id: 'LEADERSHIP', label: 'Crisis Leadership' },
  ];

  const displayedTracks = selectedTrackFilter === 'ALL'
    ? curriculumTracks
    : curriculumTracks.filter((t) => t.category === selectedTrackFilter);

  const handleTrackClick = (track: (typeof curriculumTracks)[0]) => {
    cyberAudio.playClick();
    setSelectedProgram({
      title: track.title,
      boldOutcome: `${track.tag} • ${track.badge}`,
      outcome: track.desc,
      duration: track.duration,
      mode: track.mode,
      audience: track.audience,
      topics: track.topics,
      icon: track.icon
    });
  };

  const handleCategoryClick = (cat: (typeof categories)[0]) => {
    cyberAudio.playClick();
    setSelectedProgram({
      title: cat.title,
      boldOutcome: cat.boldOutcome,
      outcome: cat.outcome,
      duration: cat.duration,
      mode: cat.mode,
      audience: cat.audience,
      topics: cat.topics,
      icon: cat.icon
    });
  };

  const processSteps = [
    { num: "01", title: "Assess", desc: "We evaluate current skill levels and identify knowledge gaps.", icon: <Search className="w-5 h-5" />, color: "blue" },
    { num: "02", title: "Customize", desc: "Programs are tailored to your industry and specific tech stack.", icon: <Eye className="w-5 h-5" />, color: "purple" },
    { num: "03", title: "Deliver", desc: "Practical, high-impact training delivered by field experts.", icon: <GraduationCap className="w-5 h-5" />, color: "blue" },
    { num: "04", title: "Evaluate", desc: "Post-training assessment to measure skill improvement.", icon: <Radar className="w-5 h-5" />, color: "purple" }
  ];

  const faqs = [
    { q: "Is the training certified?", a: "Yes, we provide certificates of completion. For GRC programs, we align with international standards like ISO and NIST." },
    { q: "Do you offer custom curricula?", a: "Absolutely. We specialize in tailoring programs based on your organization's specific tools, policies, and threat landscape." },
    { q: "Can training be delivered remotely?", a: "Yes, we have a robust virtual lab setup for technical training and interactive platforms for awareness programs." },
    { q: "What is the maximum batch size?", a: "To ensure quality, we recommend 15-20 participants for technical workshops and up to 50 for awareness sessions." },
    { q: "Do you provide post-training support?", a: "Yes, we offer 30 days of email support for participants to clarify concepts learned during the program." }
  ];

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 3);

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      {/* Subtle Architectural Vignette */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)' }}
      />

      <div className="relative z-10">
        {/* Hero */}
        {/* Unified Editorial Hero */}
        <PageHeader
          kicker="Enterprise Cyber Academy & Defense Readiness"
          title="Empower Your Workforce with"
          italicTitle="Battle-Tested Security Expertise."
          description="Customized cybersecurity engineering & defense training programs for enterprises. No generic courses—only actionable, mathematically verified operational skills."
          actions={
            <>
              <a 
                href="#contact"
                className="inline-flex items-center justify-center cursor-pointer font-medium rounded-full min-h-[46px] px-8 py-3 text-xs text-white active:scale-[0.97] transition-all duration-200 btn-tactile-primary"
              >
                <span className="font-semibold tracking-wide">Request Training Program</span>
              </a>
              <a 
                href="#programs"
                className="inline-flex items-center justify-center cursor-pointer font-medium rounded-full min-h-[46px] px-8 py-3 text-xs active:scale-[0.97] transition-all duration-200 btn-tactile-outline"
              >
                <span className="font-semibold tracking-wide">Explore Programs</span>
              </a>
            </>
          }
        />

        {/* Categories / Institutional Domains */}
        <section id="programs" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-white/5 bg-slate-100/60 dark:bg-stone-950/40 relative z-10">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 dark:border-blue-400/30 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] font-bold text-blue-600 dark:text-blue-400">
                  Institutional Defense
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Flagship Training{' '}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-orange-500 dark:from-sky-400 dark:via-blue-400 dark:to-orange-400 bg-clip-text text-transparent">
                  Domains
                </span>.
              </h2>
              <p className="mt-4 text-slate-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Four institutional defense tiers engineered to transform organizational culture from passive exposure to proactive cyber resilience.
              </p>
            </div>

            {/* Honeycomb Cards Grid for Flagship Domains */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center max-w-7xl mx-auto">
              {categories.map((cat) => (
                <PolygonHexCard
                  key={cat.title}
                  title={cat.title}
                  tag={cat.tag}
                  subtitle={cat.boldOutcome}
                  desc={cat.outcome}
                  icon={cat.icon}
                  image={cat.image}
                  actionLabel=">"
                  onAction={() => handleCategoryClick(cat)}
                  isDarkMode={isDarkMode}
                  glowColor={cat.glow}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Tracks Section */}
        <section id="tracks" className="py-20 md:py-28 bg-slate-50 dark:bg-stone-900/20 border-y border-slate-200/80 dark:border-white/5 relative z-10">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 dark:border-blue-400/30 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] font-bold text-blue-600 dark:text-blue-400">
                  Modular Syllabus
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Enterprise Curriculum{' '}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-orange-500 dark:from-sky-400 dark:via-blue-400 dark:to-orange-400 bg-clip-text text-transparent">
                  Tracks
                </span>.
              </h2>
              <p className="mt-4 text-slate-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Hands-on simulation environments and role-tailored technical pathways designed for enterprise teams and defense engineers.
              </p>
            </div>

            {/* Interactive Controls: Category Filter & Layout Switcher */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] overflow-x-auto max-w-full">
                {trackFilterCategories.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      cyberAudio.playClick();
                      setSelectedTrackFilter(filter.id);
                    }}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      selectedTrackFilter === filter.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.35)] border border-blue-400/30'
                        : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Layout Mode Pill Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shrink-0">
                <button
                  onClick={() => {
                    cyberAudio.playClick();
                    setTrackLayoutMode('honeycomb');
                  }}
                  title="Honeycomb Cluster Layout"
                  aria-label="Honeycomb Cluster Layout"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    trackLayoutMode === 'honeycomb'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.35)] border border-blue-400/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <Hexagon size={13} aria-hidden={true} />
                  <span className="hidden sm:inline">Honeycomb</span>
                </button>
                <button
                  onClick={() => {
                    cyberAudio.playClick();
                    setTrackLayoutMode('grid');
                  }}
                  title="Matrix Grid Layout"
                  aria-label="Matrix Grid Layout"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    trackLayoutMode === 'grid'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.35)] border border-blue-400/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <LayoutGrid size={13} aria-hidden={true} />
                  <span className="hidden sm:inline">Matrix</span>
                </button>
              </div>
            </div>

            {/* Polygon Cards Presentation */}
            {trackLayoutMode === 'honeycomb' && selectedTrackFilter === 'ALL' ? (
              /* Honeycomb Cluster for 6 Tracks (Row 1: 3, Row 2: 2 nestled, Row 3: 1 nestled) */
              <div className="flex flex-col items-center w-full">
                {/* Top Row: 3 Hexagons */}
                <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 z-10 w-full max-w-6xl">
                  {displayedTracks.slice(0, 3).map((track) => (
                    <PolygonHexCard
                      key={track.title}
                      title={track.title}
                      tag={track.tag}
                      subtitle={`${track.badge} • ${track.duration}`}
                      desc={track.desc}
                      icon={track.icon}
                      image={track.image}
                      actionLabel=">"
                      onAction={() => handleTrackClick(track)}
                      isDarkMode={isDarkMode}
                      glowColor={track.glow}
                    />
                  ))}
                </div>

                {/* Middle Row: 2 Hexagons nestled in the valleys of Row 1 */}
                <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:-mt-16 z-20 w-full max-w-4xl">
                  {displayedTracks.slice(3, 5).map((track) => (
                    <PolygonHexCard
                      key={track.title}
                      title={track.title}
                      tag={track.tag}
                      subtitle={`${track.badge} • ${track.duration}`}
                      desc={track.desc}
                      icon={track.icon}
                      image={track.image}
                      actionLabel=">"
                      onAction={() => handleTrackClick(track)}
                      isDarkMode={isDarkMode}
                      glowColor={track.glow}
                    />
                  ))}
                </div>

                {/* Bottom Row: 1 Hexagon nestled center in the valley of Row 2 */}
                <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:-mt-16 z-30 w-full max-w-xl">
                  {displayedTracks.slice(5, 6).map((track) => (
                    <PolygonHexCard
                      key={track.title}
                      title={track.title}
                      tag={track.tag}
                      subtitle={`${track.badge} • ${track.duration}`}
                      desc={track.desc}
                      icon={track.icon}
                      image={track.image}
                      actionLabel=">"
                      onAction={() => handleTrackClick(track)}
                      isDarkMode={isDarkMode}
                      glowColor={track.glow}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Responsive Matrix Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
                {displayedTracks.map((track) => (
                  <PolygonHexCard
                    key={track.title}
                    title={track.title}
                    tag={track.tag}
                    subtitle={`${track.badge} • ${track.duration}`}
                    desc={track.desc}
                    icon={track.icon}
                    image={track.image}
                    actionLabel=">"
                    onAction={() => handleTrackClick(track)}
                    isDarkMode={isDarkMode}
                    glowColor={track.glow}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Process */}
        <section className="py-24 bg-white/70 dark:bg-stone-950/60 relative overflow-hidden border-b border-slate-200/80 dark:border-white/5">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-stone-500 font-bold mb-4 block">Our Methodology</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white">How training works.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {processSteps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                  className={`p-8 bg-slate-50/80 dark:bg-white/[0.01] border rounded-2xl transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-white/[0.03] ${
                    activeStep === i 
                      ? (step.color === 'blue' ? 'border-blue-500/60 bg-blue-500/5' : 'border-purple-500/60 bg-purple-500/5')
                      : 'border-slate-200 dark:border-white/10'
                  }`}
                >
                  <div className={`text-3xl font-bold mb-4 transition-colors ${
                    activeStep === i 
                      ? (step.color === 'blue' ? 'text-blue-500' : 'text-purple-500')
                      : 'text-slate-400 dark:text-white/20'
                  }`}>{step.num}</div>
                  <div className={`p-2 w-fit rounded-lg mb-4 ${
                    step.color === 'blue' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                  }`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{step.title}</h3>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={activeStep === i ? 'expanded' : 'collapsed'}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className={`text-base font-light leading-relaxed transition-all ${
                        activeStep === i ? 'text-slate-900 dark:text-stone-100 font-normal' : 'text-slate-600 dark:text-stone-400'
                      }`}
                    >
                      {step.desc}
                    </motion.p>
                  </AnimatePresence>
                  {activeStep === i && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-stone-400 italic"
                    >
                      Click to collapse details.
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes & Audience */}
        <section className="py-24 bg-slate-50/50 dark:bg-stone-900/40 relative">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-10 tracking-tight text-slate-900 dark:text-white">Measurable outcomes.</h2>
              <div className="space-y-8">
                {[
                  { title: "Improved Security Awareness", desc: "Employees become the strongest link in your defense chain.", color: "blue" },
                  { title: "Reduced Human Risk", desc: "Drastic drop in phishing success and policy violations.", color: "purple" },
                  { title: "Skilled Workforce", desc: "IT teams equipped to handle modern threats independently.", color: "blue" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-5"
                  >
                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      item.color === 'blue' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${item.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-slate-600 dark:text-stone-300 text-base font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-10 tracking-tight text-slate-900 dark:text-white">Who it's for.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Enterprises", desc: "Train large teams at scale" },
                  { label: "Startups", desc: "Build security from day one" },
                  { label: "IT Teams", desc: "Upskill technical defenders" },
                  { label: "Professionals", desc: "Advance cybersecurity careers" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:shadow-md ${
                      i % 2 === 0 ? 'hover:border-blue-500/40' : 'hover:border-purple-500/40'
                    }`}
                  >
                    <span className="text-slate-900 dark:text-stone-100 font-semibold mb-1">{item.label}</span>
                    <span className="text-slate-500 dark:text-stone-500 text-[10px] uppercase tracking-widest">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t border-slate-200/80 dark:border-white/5 bg-slate-100/50 dark:bg-stone-950/20">
          <div className="px-6 md:px-12 lg:px-20 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold mb-10 text-center tracking-tight text-slate-900 dark:text-white">Common Questions</h2>
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {visibleFaqs.map((faq, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden bg-white dark:bg-white/[0.01] shadow-sm hover:shadow-md transition-all"
                  >
                    <button 
                      type="button"
                      id={`training-faq-trigger-${i}`}
                      aria-expanded={openFaq === i}
                      aria-controls={`training-faq-answer-${i}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full p-6 flex justify-between items-center text-left group cursor-pointer"
                    >
                      <span className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">{faq.q}</span>
                      <ChevronDown aria-hidden="true" className={`w-5 h-5 text-slate-500 dark:text-stone-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-amber-500' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div 
                          id={`training-faq-answer-${i}`}
                          role="region"
                          aria-labelledby={`training-faq-trigger-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-slate-700 dark:text-stone-200 text-base font-light leading-relaxed border-t border-slate-200 dark:border-white/5 pt-4 mx-6">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-12 text-center">
              <button 
                onClick={() => setShowAllFaqs(!showAllFaqs)}
                className="px-8 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all cursor-pointer shadow-sm"
              >
                {showAllFaqs ? "View Less FAQs" : "View More FAQs"}
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 bg-slate-900 dark:bg-stone-950/80 text-white relative overflow-hidden border-t border-slate-800 dark:border-white/10">
          <div className="absolute inset-0 bg-slate-950/90 dark:bg-stone-950/90 backdrop-blur-2xl pointer-events-none" />
          
          <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-blue-400 mb-6 block font-semibold">Capability Development</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight leading-[1.1]">
                  Ready to empower <br /><span className="text-white font-semibold">your workforce?</span>
                </h2>
                <p className="text-stone-300 font-light mb-12 max-w-md text-base md:text-lg leading-relaxed">
                  Request Training Today. Get a customized cybersecurity training program tailored to your team.
                </p>

                <div className="flex flex-col gap-8">
                  {[
                    { icon: <Mail size={20} strokeWidth={1.5} />, label: "Inquiry Email", value: "cybravions@gmail.com", color: "blue" },
                    { icon: <Phone size={20} strokeWidth={1.5} />, label: "Direct Support", value: "+91-9358683634", color: "purple" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-6 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.12] transition-all duration-300 text-stone-200">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-400 mb-1.5 font-bold">{item.label}</p>
                        <p className="text-white text-lg md:text-xl font-light tracking-wide group-hover:text-stone-300 transition-colors">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative"
              >
                <div 
                  className="bg-[#0e1017] p-6 md:p-10 rounded-3xl border border-white/10 relative z-10 overflow-hidden"
                >
                  <form onSubmit={handleTrainingInquiry} className="space-y-6 relative z-10">
                    <input type="hidden" name="subject" value="New Training Inquiry - Cybravion" />
                    <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group relative">
                        <label htmlFor="training-name" className="text-[9px] uppercase tracking-[0.3em] text-stone-300 font-bold ml-1">Full Name</label>
                        <input id="training-name" type="text" name="name" required autoComplete="name" placeholder="John Doe" className="w-full bg-[#151823] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all text-sm placeholder:text-stone-500" />
                      </div>
                      <div className="space-y-2 group relative">
                        <label htmlFor="training-organization" className="text-[9px] uppercase tracking-[0.3em] text-stone-300 font-bold ml-1">Company</label>
                        <input id="training-organization" type="text" name="organization" autoComplete="organization" placeholder="Company Name" className="w-full bg-[#151823] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all text-sm placeholder:text-stone-500" />
                      </div>
                    </div>

                    <div className="space-y-2 group relative">
                      <label htmlFor="training-email" className="text-[9px] uppercase tracking-[0.3em] text-stone-300 font-bold ml-1">Email Address</label>
                      <input id="training-email" type="email" name="email" required autoComplete="email" placeholder="john@example.com" className="w-full bg-[#151823] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all text-sm placeholder:text-stone-500" />
                    </div>

                    <div className="space-y-2 group relative">
                      <label htmlFor="training-message" className="text-[9px] uppercase tracking-[0.3em] text-stone-300 font-bold ml-1">Message</label>
                      <textarea id="training-message" rows={3} name="message" required placeholder="How can we help with your training needs?" className="w-full bg-[#151823] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all text-sm placeholder:text-stone-500 resize-none" />
                    </div>

                    <div className="flex justify-center pt-2">
                      <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className="w-full sm:w-auto px-10 py-3.5 bg-white text-black text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-slate-100 transition-all cursor-pointer active:scale-[0.99] shadow-sm"
                      >
                        {formStatus === 'submitting' ? 'Sending...' : 'Request Training Today'}
                      </button>
                    </div>
                    <p role="status" aria-live="polite" className="text-center text-sm text-stone-300">
                      {formStatus === 'success' && 'Thanks. Your training inquiry has been sent.'}
                      {formStatus === 'error' && (
                        <>We could not send your inquiry. Please email <a className="underline" href="mailto:support@cybravions.com">support@cybravions.com</a>.</>
                      )}
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedProgram && (
          <ProgramModal 
            program={selectedProgram} 
            isOpen={!!selectedProgram} 
            onClose={() => setSelectedProgram(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
