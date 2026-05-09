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
  X
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

  const categories = [
    { 
      title: "Cybersecurity Awareness", 
      outcome: "Build a security-first culture and reduce human-centric risks.",
      icon: <ShieldCheck className="w-6 h-6" />,
      topics: ["Phishing simulation", "Social engineering defense", "Password security", "Safe browsing habits"],
      audience: "All employees, non-technical staff, and interns.",
      duration: "1 Day / Weekly Sprints",
      mode: "Online / Hybrid",
      color: "blue"
    },
    { 
      title: "Technical Training", 
      outcome: "Advanced skills for security engineers and IT professionals.",
      icon: <Zap className="w-6 h-6" />,
      topics: ["VAPT methodologies", "Cloud Security (AWS/Azure)", "SOC operations", "Incident Response"],
      audience: "IT teams, security analysts, developers.",
      duration: "3-5 Days Intensive",
      mode: "Hands-on Lab / In-person",
      color: "orange"
    },
    { 
      title: "GRC & Compliance", 
      outcome: "Master the frameworks that govern modern cybersecurity.",
      icon: <BookOpen className="w-6 h-6" />,
      topics: ["ISO 27001 internal auditor", "DPDP Act compliance", "NIST Framework mapping", "Risk assessment skills"],
      audience: "Compliance officers, HR, legal, risk managers.",
      duration: "2-4 Days",
      mode: "Workshop / Hybrid",
      color: "blue"
    },
    { 
      title: "Executive Training", 
      outcome: "Strategic risk management for C-suite and leadership.",
      icon: <Target className="w-6 h-6" />,
      topics: ["Cyber risk reporting", "Crisis management", "Budgeting for security", "Regulatory landscape"],
      audience: "CxOs, Board members, Directors.",
      duration: "Half-day Briefing",
      mode: "Exclusive Executive Session",
      color: "orange"
    }
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
    { q: "Can training be delivered remotely?", a: "Yes, we have a robust virtual lab setup for technical training and interactive platforms for awareness programs." }
  ];

  return (
    <div className="pt-24 min-h-screen bg-transparent text-white relative">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center">
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
            className="text-4xl md:text-6xl font-semibold tracking-tight mb-8"
          >
            Empower your team with <br className="hidden md:block" />
            <span className="text-stone-400 font-light italic">battle-tested</span> security expertise.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-lg max-w-2xl mx-auto mb-12 font-light"
          >
            Consulting-led training programs designed for enterprises and professionals. No generic courses—only actionable, real-world cybersecurity skills.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/20">
              Explore Programs
            </button>
            <button className="px-8 py-4 bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 text-orange-400 font-bold rounded-full transition-all">
              Request Training
            </button>
          </motion.div>
        </section>

        {/* Categories */}
        <section className="py-24 border-t border-white/5">
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
                    scale: 1.04, 
                    y: -12,
                    filter: "brightness(1.2)",
                    transition: { duration: 0.3 }
                  }}
                  className={`p-8 bg-white/[0.02] backdrop-blur-xl border rounded-3xl cursor-pointer group relative overflow-hidden ${
                    cat.color === 'blue' 
                      ? 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-500/80 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]' 
                      : 'border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:border-orange-500/80 hover:shadow-[0_0_50px_rgba(249,115,22,0.5)]'
                  }`}
                  onClick={() => setSelectedProgram(cat)}
                >
                  <div className={`absolute -top-12 -right-12 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full ${
                    cat.color === 'blue' ? 'bg-blue-500/5' : 'bg-orange-500/5'
                  }`} />
                  <div className={`p-3 w-fit rounded-2xl mb-6 transition-colors ${
                    cat.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{cat.title}</h3>
                  <p className="text-stone-400 text-sm font-light mb-6 leading-relaxed">{cat.outcome}</p>
                  <div 
                    className={`flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-colors ${
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

        {/* Process */}
        <section className="py-24 bg-stone-900/30 border-y border-white/5">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-stone-500 font-bold mb-4 block">Our Methodology</span>
              <h2 className="text-3xl md:text-4xl font-semibold">How training works.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {processSteps.map((step, i) => (
                <div key={i} className={`p-8 bg-white/[0.01] border rounded-2xl transition-colors hover:bg-white/[0.03] ${
                  step.color === 'blue' ? 'border-blue-500/10' : 'border-orange-500/10'
                }`}>
                  <div className={`text-3xl font-orbitron font-bold mb-4 transition-colors ${
                    step.color === 'blue' ? 'text-blue-500/20' : 'text-orange-500/20'
                  }`}>{step.num}</div>
                  <div className={`p-2 w-fit rounded-lg mb-4 ${
                    step.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-stone-500 text-sm font-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes & Audience */}
        <section className="py-24">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-10">Measurable outcomes.</h2>
              <div className="space-y-8">
                {[
                  { title: "Improved Security Awareness", desc: "Employees become the strongest link in your defense chain.", color: "blue" },
                  { title: "Reduced Human Risk", desc: "Drastic drop in phishing success and policy violations.", color: "orange" },
                  { title: "Skilled Workforce", desc: "IT teams equipped to handle modern threats independently.", color: "blue" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      item.color === 'blue' ? 'bg-blue-500/20' : 'bg-orange-500/20'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${item.color === 'blue' ? 'bg-blue-500' : 'bg-orange-500'}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-stone-400 text-sm font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-10">Who it's for.</h2>
              <div className="grid grid-cols-2 gap-4">
                {["Enterprises", "Startups", "IT Teams", "Professionals"].map((target, i) => (
                  <div key={i} className={`p-6 bg-white/[0.02] border rounded-2xl flex items-center justify-center text-center transition-all hover:bg-white/[0.04] ${
                    i % 2 === 0 ? 'border-blue-500/10' : 'border-orange-500/10'
                  }`}>
                    <span className="text-stone-300 font-medium">{target}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t border-white/5">
          <div className="px-6 md:px-12 lg:px-20 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">Common Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.01]">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 flex justify-between items-center text-left"
                  >
                    <span className="font-semibold">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-stone-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-stone-400 text-sm font-light leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-3xl" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="px-6 md:px-12 lg:px-20 max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-semibold mb-10 text-white tracking-tight">Elevate your defense posture.</h2>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-blue-500 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/20"
              >
                Request Training Program
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full transition-all backdrop-blur-md"
              >
                Talk to an Expert
              </motion.button>
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
