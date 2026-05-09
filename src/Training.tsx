import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  Target, 
  Zap, 
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  GraduationCap, 
  Search, 
  Eye, 
  Shield, 
  Radar, 
  CheckCircle2,
  X,
  Mail,
  Phone,
  ArrowRight,
  Play
} from 'lucide-react';

const ProgramModal = ({ program, isOpen, onClose }: { program: any, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-stone-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5 text-stone-400" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
            {program.icon}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">{program.title}</h2>
            <p className="text-stone-400 text-sm">{program.outcome}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-3">What you'll learn</h3>
            <ul className="space-y-2">
              {program.topics.map((topic: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-2">Target Audience</h3>
              <p className="text-sm text-stone-300">{program.audience}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-1">Duration</h3>
                <p className="text-sm text-stone-300">{program.duration}</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-stone-500 font-bold mb-1">Mode</h3>
                <p className="text-sm text-stone-300">{program.mode}</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
        >
          Request Program Details
        </button>
      </motion.div>
    </div>
  );
};

export const TrainingPage = () => {
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const categories = [
    { 
      title: "Cybersecurity Awareness", 
      boldOutcome: "Build a Human Firewall.",
      outcome: "Build a security-first culture and reduce human-centric risks through engaging awareness programs.",
      icon: <ShieldCheck className="w-6 h-6" />,
      topics: ["Phishing simulation", "Social engineering defense", "Password security", "Safe browsing habits"],
      audience: "All employees, non-technical staff, and interns.",
      duration: "1 Day / Weekly Sprints",
      mode: "Online / Hybrid",
      color: "blue"
    },
    { 
      title: "Technical Training", 
      boldOutcome: "Upskill Your Defenders.",
      outcome: "Advanced skills for security engineers and IT professionals focusing on modern threat vectors.",
      icon: <Zap className="w-6 h-6" />,
      topics: ["VAPT methodologies", "Cloud Security (AWS/Azure)", "SOC operations", "Incident Response"],
      audience: "IT teams, security analysts, developers.",
      duration: "3-5 Days Intensive",
      mode: "Hands-on Lab / In-person",
      color: "orange"
    },
    { 
      title: "GRC & Compliance", 
      boldOutcome: "Master Modern Governance.",
      outcome: "Master the frameworks that govern modern cybersecurity including ISO, NIST, and local regulations.",
      icon: <BookOpen className="w-6 h-6" />,
      topics: ["ISO 27001 internal auditor", "DPDP Act compliance", "NIST Framework mapping", "Risk assessment skills"],
      audience: "Compliance officers, HR, legal, risk managers.",
      duration: "2-4 Days",
      mode: "Workshop / Hybrid",
      color: "blue"
    },
    { 
      title: "Executive Training", 
      boldOutcome: "Strategic Risk Leadership.",
      outcome: "Strategic risk management for C-suite and leadership to bridge the gap between board and security.",
      icon: <Target className="w-6 h-6" />,
      topics: ["Cyber risk reporting", "Crisis management", "Budgeting for security", "Regulatory landscape"],
      audience: "CxOs, Board members, Directors.",
      duration: "Half-day Briefing",
      mode: "Exclusive Executive Session",
      color: "orange"
    }
  ];

  const videos = [
    { id: "WO7wP3QaJ_g", title: "Cybersecurity Full Course", desc: "A comprehensive 7-hour masterclass covering the core pillars of digital defense and network security." },
    { id: "fNzpcB7ODxQ", title: "Ethical Hacking Masterclass", desc: "A deep-dive 12-hour course on penetration testing, VAPT methodologies, and Linux for hackers." },
    { id: "JswwHeEqBIc", title: "GRC Analyst Training", desc: "A professional-grade 2.5-hour workshop focused on Governance, Risk, and Compliance frameworks." }
  ];

  const processSteps = [
    { num: "01", title: "Assess", desc: "We evaluate current skill levels and identify knowledge gaps.", icon: <Search className="w-5 h-5" />, color: "blue" },
    { num: "02", title: "Customize", desc: "Programs are tailored to your industry and specific tech stack.", icon: <Eye className="w-5 h-5" />, color: "orange" },
    { num: "03", title: "Deliver", desc: "Practical, high-impact training delivered by field experts.", icon: <GraduationCap className="w-5 h-5" />, color: "blue" },
    { num: "04", title: "Evaluate", desc: "Post-training assessment to measure skill improvement.", icon: <Radar className="w-5 h-5" />, color: "orange" }
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
    <div className="pt-24 min-h-screen bg-transparent text-white relative">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.4em] text-blue-400 font-bold mb-6 block"
            >
              Capability Development
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-8"
            >
              Empower your team with <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent italic font-light">battle-tested</span> security expertise.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-stone-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              Customized cybersecurity training programs for enterprises and growing teams. 
              <span className="block mt-2 text-stone-500 font-medium italic">No generic courses—only actionable, real-world skills.</span>
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <motion.button 
                whileHover={{ scale: 1.05, brightness: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-orange-500 text-white font-bold rounded-full transition-all shadow-xl shadow-orange-500/20"
              >
                Request Training
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full transition-all backdrop-blur-md"
              >
                Explore Programs
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Categories */}
        <section className="py-24 border-t border-white/5 bg-stone-950/40 relative">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: [0, -8, 0],
                    boxShadow: cat.color === 'blue' 
                      ? ["0 0 20px rgba(59,130,246,0.1)", "0 0 50px rgba(59,130,246,0.4)", "0 0 20px rgba(59,130,246,0.1)"]
                      : ["0 0 20px rgba(249,115,22,0.1)", "0 0 50px rgba(249,115,22,0.4)", "0 0 20px rgba(249,115,22,0.1)"],
                    filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"],
                    transition: {
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                      boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                      filter: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                      opacity: { duration: 0.8, delay: i * 0.1 }
                    }
                  }}
                  viewport={{ once: false }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -12,
                    filter: "brightness(1.2)",
                    transition: { duration: 0.3 }
                  }}
                  className={`p-8 bg-white/[0.02] backdrop-blur-xl border rounded-3xl cursor-pointer group relative overflow-hidden flex flex-col h-full ${
                    cat.color === 'blue' 
                      ? 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-500/80 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]' 
                      : 'border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:border-orange-500/80 hover:shadow-[0_0_50px_rgba(249,115,22,0.5)]'
                  }`}
                  onClick={() => setSelectedProgram(cat)}
                >
                  <div className={`absolute -top-12 -right-12 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full ${
                    cat.color === 'blue' ? 'bg-blue-500/5' : 'bg-orange-500/5'
                  }`} />
                  
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`p-3 w-fit rounded-2xl mb-6 transition-colors ${
                      cat.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                    }`}
                  >
                    {cat.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                  <p className={`text-sm font-bold mb-3 ${cat.color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`}>
                    {cat.boldOutcome}
                  </p>
                  <p className="text-stone-400 text-sm font-light mb-8 leading-relaxed flex-grow">
                    {cat.outcome}
                  </p>
                  
                  <div 
                    className={`mt-auto flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-colors ${
                      cat.color === 'blue' ? 'text-blue-400 group-hover:text-blue-300' : 'text-orange-400 group-hover:text-orange-300'
                    }`}
                  >
                    View Details <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-24 bg-stone-900/20 border-y border-white/5 relative">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-orange-500 font-bold mb-4 block underline underline-offset-8 decoration-blue-500/50">Educational Series</span>
              <h2 className="text-3xl md:text-5xl font-semibold">Learn Cybersecurity in Action.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videos.map((vid, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl group"
                >
                  <div className="aspect-video relative bg-stone-950">
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.id}?modestbranding=1&rel=0`}
                      title={vid.title}
                      loading="lazy"
                      className="w-full h-full border-0 grayscale-[40%] group-hover:grayscale-0 transition-all duration-500"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Play className="w-4 h-4 text-orange-500 fill-orange-500/20" />
                      {vid.title}
                    </h4>
                    <p className="text-stone-500 text-sm font-light italic">{vid.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 bg-stone-950/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm pointer-events-none" />
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-stone-500 font-bold mb-4 block font-orbitron">Our Methodology</span>
              <h2 className="text-3xl md:text-4xl font-semibold">How training works.</h2>
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
                  className={`p-8 bg-white/[0.01] border rounded-2xl transition-all cursor-pointer hover:bg-white/[0.03] ${
                    activeStep === i 
                      ? (step.color === 'blue' ? 'border-blue-500/60 bg-blue-500/5' : 'border-orange-500/60 bg-orange-500/5')
                      : (step.color === 'blue' ? 'border-blue-500/10' : 'border-orange-500/10')
                  }`}
                >
                  <div className={`text-3xl font-orbitron font-bold mb-4 transition-colors ${
                    activeStep === i 
                      ? (step.color === 'blue' ? 'text-blue-500/60' : 'text-orange-500/60')
                      : (step.color === 'blue' ? 'text-blue-500/20' : 'text-orange-500/20')
                  }`}>{step.num}</div>
                  <div className={`p-2 w-fit rounded-lg mb-4 ${
                    step.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={activeStep === i ? 'expanded' : 'collapsed'}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className={`text-sm font-light leading-relaxed transition-all ${
                        activeStep === i ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {step.desc}
                    </motion.p>
                  </AnimatePresence>
                  {activeStep === i && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-white/10 text-xs text-stone-400 italic"
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
        <section className="py-24 bg-stone-900/40 relative">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-10 tracking-tight">Measurable outcomes.</h2>
              <div className="space-y-8">
                {[
                  { title: "Improved Security Awareness", desc: "Employees become the strongest link in your defense chain.", color: "blue" },
                  { title: "Reduced Human Risk", desc: "Drastic drop in phishing success and policy violations.", color: "orange" },
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
                      item.color === 'blue' ? 'bg-blue-500/20' : 'bg-orange-500/20'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${item.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-stone-400 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-10 tracking-tight">Who it's for.</h2>
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
                    className={`p-6 bg-white/[0.02] border rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:bg-white/[0.04] ${
                      i % 2 === 0 ? 'border-blue-500/10' : 'border-orange-500/10'
                    }`}
                  >
                    <span className="text-stone-100 font-semibold mb-1">{item.label}</span>
                    <span className="text-stone-500 text-[10px] uppercase tracking-widest">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t border-white/5 bg-stone-950/20">
          <div className="px-6 md:px-12 lg:px-20 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold mb-10 text-center tracking-tight">Common Questions</h2>
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {visibleFaqs.map((faq, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-all"
                  >
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full p-6 flex justify-between items-center text-left group"
                    >
                      <span className="font-semibold group-hover:text-blue-400 transition-colors">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-stone-500 transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-blue-500' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-stone-400 text-sm font-light leading-relaxed border-t border-white/5 pt-4 mx-6">{faq.a}</p>
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
                className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all"
              >
                {showAllFaqs ? "View Less FAQs" : "View More FAQs"}
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 bg-stone-950/80 relative overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-2xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-white mb-6 block font-semibold opacity-70">Capability Development</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight leading-[1.1]">
                  Ready to empower <br /><span className="bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent font-light">your workforce?</span>
                </h2>
                <p className="text-white font-light mb-12 max-w-md text-base md:text-lg leading-relaxed opacity-80">
                  Request Training Today. Get a customized cybersecurity training program tailored to your team.
                </p>

                <div className="flex flex-col gap-8">
                  {[
                    { icon: <Mail size={20} strokeWidth={1.5} />, label: "Inquiry Email", value: "cybravions@gmail.com", color: "blue" },
                    { icon: <Phone size={20} strokeWidth={1.5} />, label: "Direct Support", value: "+91-9358683634", color: "orange" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-6 group cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] border flex items-center justify-center group-hover:bg-white/[0.08] transition-all duration-500 shadow-lg ${
                        item.color === 'blue' ? 'text-blue-400 border-blue-500/20 group-hover:border-blue-500/40 shadow-blue-500/5' : 'text-orange-400 border-orange-500/20 group-hover:border-orange-500/40 shadow-orange-500/5'
                      }`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white mb-1.5 font-bold opacity-50">{item.label}</p>
                        <p className="text-white text-lg md:text-xl font-light tracking-wide group-hover:text-stone-100 transition-colors">{item.value}</p>
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
                <motion.div 
                  className="bg-stone-900/40 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border border-orange-500/10 shadow-[0_0_40px_rgba(249,115,22,0.05)] relative z-10 overflow-hidden"
                >
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

                  <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6 relative z-10">
                    <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                    <input type="hidden" name="subject" value="New Training Inquiry - Cybravion" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group relative">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-white font-bold ml-1 opacity-60">Full Name</label>
                        <input type="text" name="name" required placeholder="John Doe" className="w-full bg-stone-950/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 focus:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all text-sm placeholder:text-stone-500" />
                      </div>
                      <div className="space-y-2 group relative">
                        <label className="text-[9px] uppercase tracking-[0.3em] text-white font-bold ml-1 opacity-60">Company</label>
                        <input type="text" name="organization" placeholder="Company Name" className="w-full bg-stone-950/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 focus:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all text-sm placeholder:text-stone-500" />
                      </div>
                    </div>

                    <div className="space-y-2 group relative">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-white font-bold ml-1 opacity-60">Email Address</label>
                      <input type="email" name="email" required placeholder="john@example.com" className="w-full bg-stone-950/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 focus:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all text-sm placeholder:text-stone-500" />
                    </div>

                    <div className="space-y-2 group relative">
                      <label className="text-[9px] uppercase tracking-[0.3em] text-white font-bold ml-1 opacity-60">Message</label>
                      <textarea rows={3} name="message" required placeholder="How can we help with your training needs?" className="w-full bg-stone-950/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/40 focus:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all text-sm placeholder:text-stone-500 resize-none" />
                    </div>

                    <div className="flex justify-center pt-2">
                      <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249,115,22,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        type="submit" 
                        className="w-full sm:w-auto px-12 py-3.5 bg-orange-500 text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:bg-orange-600 transition-all shadow-xl shadow-orange-950/20"
                      >
                        Request Training Today
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
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
