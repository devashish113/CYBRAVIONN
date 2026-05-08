/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Cpu, 
  Search, 
  Globe, 
  Users, 
  HardDrive, 
  BarChart3, 
  ChevronRight,
  Menu,
  X,
  Mail,
  Phone,
  ArrowRight,
  TrendingUp,
  Star,
  Headphones
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-stone-950/95 backdrop-blur-sm py-4 border-b border-stone-700' : 'bg-transparent py-8'
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 flex justify-between items-center">
        <a href="#" className="flex flex-col items-center justify-center group">
          <img src="/logo.png" alt="Cybravion Logo" className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-500 mb-1" />
          <div className="flex flex-col items-center text-center">
            <span className="text-lg md:text-xl font-bold tracking-[0.25em] uppercase leading-none">
              <span className="text-stone-100">CYBR</span><span className="text-blue-500">AVION</span>
            </span>
            <span className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold mt-1.5 text-stone-300">
              SECURE. <span className="text-blue-500">GOVERN.</span> EMPOWER.
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest text-stone-200 hover:text-stone-100 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-sm uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-stone-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-stone-900 border-b border-stone-600 p-8 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-base uppercase tracking-widest text-stone-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-24 md:pt-32 pb-20">
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto flex flex-col items-center text-center relative"
        >
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
              
              <h1 className="mt-8 lg:mt-16 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-white mb-8 tracking-tight drop-shadow-lg">
                Secure your <br /><span className="italic text-stone-300">digital infrastructure.</span>
              </h1>
              
              <p className="text-base md:text-lg text-stone-300 mb-12 max-w-xl font-light leading-relaxed drop-shadow-md">
                Leading cybersecurity consulting specializing in end-to-end governance, risk management, and strategic digital influence for the modern enterprise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start w-full sm:w-auto">
                <a 
                  href="#services"
                  className="px-6 py-3 md:px-10 md:py-4 bg-white text-stone-950 rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold hover:bg-stone-200 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  Our Expertise
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#contact"
                  className="px-6 py-3 md:px-10 md:py-4 bg-orange-500 text-white rounded-full text-xs md:text-sm uppercase tracking-[0.2em] font-bold hover:bg-orange-600 transition-all text-center flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                >
                  Consult an Advisor
                </a>
              </div>
            </div>

            {/* Right Column - Floating UI Inspiration */}
            <div className="hidden lg:flex relative w-full max-w-lg h-[500px] items-center justify-center">
              {/* Decorative abstract elements replacing the lock */}
              <div className="absolute inset-0 bg-stone-900/30 border border-white/5 rounded-full blur-2xl pointer-events-none mix-blend-screen" />
              
              {/* Floating Element 1 */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
                className="absolute top-10 right-10 z-20 bg-stone-900/60 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-stone-100 text-sm font-bold uppercase tracking-wider">Application Security</p>
                  <p className="text-stone-400 text-xs mt-1">Zero-day vulnerability prevention</p>
                </div>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div 
                animate={{ y: [0, 15, 0] }} 
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} 
                className="absolute bottom-20 left-0 z-20 bg-stone-900/60 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center gap-4 shadow-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-stone-100 text-sm font-bold uppercase tracking-wider">Infrastructure Security</p>
                  <p className="text-stone-400 text-xs mt-1">Cloud architecture protection</p>
                </div>
              </motion.div>

              {/* Floating Element 3 */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} 
                className="w-48 h-48 rounded-full border border-orange-500/30 flex items-center justify-center bg-stone-950/40 backdrop-blur-xl shadow-[0_0_50px_rgba(249,115,22,0.1)]"
              >
                <Lock className="w-16 h-16 text-stone-300" strokeWidth={1} />
              </motion.div>

              {/* Stars */}
              <Star className="absolute top-1/4 left-10 text-orange-500/50 fill-orange-500/30 w-6 h-6 animate-pulse" />
              <Star className="absolute bottom-1/4 right-0 text-blue-500/50 fill-blue-500/30 w-8 h-8 animate-pulse delay-100" />
            </div>
          </div>
        </motion.div>
      </div>


    </section>
  );
};

const TrackRecord = () => {
  const metrics = [
    {
      id: 1,
      icon: <TrendingUp className="text-white" size={24} strokeWidth={2.5} />,
      value: "50+",
      label: "Projects Delivered"
    },
    {
      id: 2,
      icon: <Users className="text-white" size={24} strokeWidth={2.5} />,
      value: "30+",
      label: "Happy Clients"
    },
    {
      id: 3,
      icon: <Star className="text-white" size={24} strokeWidth={2.5} />,
      value: "95%",
      label: "Client Satisfaction"
    },
    {
      id: 4,
      icon: <Headphones className="text-white" size={24} strokeWidth={2.5} />,
      value: "24/7",
      label: "Expert Support"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-10 tracking-tight">Our Track Record</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <motion.div 
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: metric.id * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 cursor-default"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-stone-300">
                {metric.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-serif text-stone-100 mb-3 tracking-tight">{metric.value}</h3>
              <p className="text-stone-400 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [activeBrief, setActiveBrief] = useState<number | null>(null);

  const expertises = [
    {
      title: "Governance & Compliance",
      desc: "Align your business with global compliance standards and mitigate enterprise risk.",
      icon: <Shield className="w-6 h-6" />,
      color: "blue",
      brief: "We establish strong governance structures that integrate security into your business decisions. From policy development to enterprise risk assessments and compliance readiness (ISO 27001, SOC 2, GDPR), we ensure you meet regulatory requirements without slowing down operations."
    },
    {
      title: "Security Testing",
      desc: "Find security gaps and fix them before they become breaches.",
      icon: <Lock className="w-6 h-6" />,
      color: "orange",
      brief: "We identify and address vulnerabilities across your applications, networks, and cloud environments. Our targeted penetration testing and vulnerability lifecycle management reduces your exploitable attack surface so you can operate with confidence."
    },
    {
      title: "Cloud Architecture",
      desc: "Build resilient infrastructure designed to withstand modern threats.",
      icon: <Cpu className="w-6 h-6" />,
      color: "blue",
      brief: "We embed security-by-design principles directly into your technology stack. Whether it's zero trust advisory, identity management, or cloud security validation, we ensure your digital transformation is built on a rock-solid foundation."
    },
    {
      title: "AI Risk Governance",
      desc: "Deploy AI safely with frameworks that balance innovation and accountability.",
      icon: <Globe className="w-6 h-6" />,
      color: "orange",
      brief: "As your organization adopts AI technologies, we help you manage the associated risks. We implement responsible AI governance frameworks, ensuring compliance with emerging standards (like ISO/IEC 42001) while building stakeholder trust."
    },
    {
      title: "Threat Intelligence",
      desc: "Monitor your digital footprint and identify external threats early.",
      icon: <Search className="w-6 h-6" />,
      color: "blue",
      brief: "We provide actionable intelligence to enhance your situational awareness. By analyzing your digital footprint, profiling adversaries, and monitoring brand exposure, we help you proactively address risks before they impact your business."
    },
    {
      title: "Digital Influence",
      desc: "Protect your brand reputation and manage strategic online visibility.",
      icon: <Users className="w-6 h-6" />,
      color: "orange",
      brief: "Your digital presence is a critical asset. We monitor your brand's reputation, analyze social media intelligence, and provide strategic content visibility planning to safeguard market perception and maintain audience trust."
    },
    {
      title: "Capability Development",
      desc: "Equip your teams with the knowledge to defend against modern risks.",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "blue",
      brief: "We offer professional training programs to elevate your organizational cyber maturity. From executive awareness sessions to technical risk management workshops, we build skilled teams capable of managing evolving threats."
    },
    {
      title: "Product Advisory",
      desc: "Invest in the right security technologies to maximize your ROI.",
      icon: <HardDrive className="w-6 h-6" />,
      color: "orange",
      brief: "We help you evaluate, select, and optimize cybersecurity solutions that align with your business objectives. Our deployment coordination and integration support ensures your technology investments actually reduce risk."
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6 md:gap-8">
          <div className="max-w-3xl">
            <span className="text-sm md:text-base uppercase tracking-[0.4em] text-stone-400 mb-6 block font-semibold">Core Capabilities</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-100 leading-tight">
              Identify vulnerabilities <br /><span className="italic text-stone-300">before attackers do.</span>
            </h2>
          </div>
          <div className="md:text-right max-w-sm">
            <p className="text-stone-300 text-base md:text-lg leading-relaxed font-light">
              Proactive threat management and resilience for the modern enterprise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertises.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
              className="p-8 md:p-10 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl group transition-all duration-500 cursor-pointer hover:bg-white/[0.04] hover:border-white/10 relative overflow-hidden"
              onClick={() => setActiveBrief(i)}
            >
              {/* Subtle hover gradient background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${item.color === 'blue' ? 'from-blue-500 to-transparent' : 'from-orange-500 to-transparent'}`} />
              
              <div className={`relative z-10 mb-8 p-3 w-fit rounded-2xl transition-all duration-500 border border-white/5 ${
                item.color === 'blue'
                  ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20'
                  : 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20'
              }`}>
                {item.icon}
              </div>
              <h3 className="text-lg md:text-xl font-serif text-stone-100 mb-4 tracking-tight">{item.title}</h3>
              <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed mb-6 md:mb-8">
                {item.desc}
              </p>
              <button 
                className="flex items-center gap-2 text-xs md:text-base uppercase tracking-[0.15em] md:tracking-[0.2em] text-stone-400 group-hover:text-stone-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBrief(i);
                }}
              >
                Details <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technical Brief Modal */}
      <AnimatePresence>
        {activeBrief !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBrief(null)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-stone-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Sticky Header with Close Button */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
                <button 
                  onClick={() => setActiveBrief(null)}
                  className="text-stone-300 hover:text-stone-100 p-2 bg-stone-900/80 rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 md:p-16 overflow-y-auto relative z-10 w-full">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 md:mb-12 mt-4 md:mt-0">
                  <div className="p-4 bg-stone-100 text-stone-950 rounded-2xl shadow-lg w-fit">
                    {expertises[activeBrief].icon}
                  </div>
                  <div>
                    <span className="text-sm md:text-base uppercase tracking-[0.4em] text-stone-300 block mb-2 font-bold">Service Vertical</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-stone-100 tracking-tight">{expertises[activeBrief].title}</h3>
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h4 className="text-sm md:text-base uppercase tracking-[0.3em] text-stone-200 mb-4 font-semibold border-b border-stone-600 pb-2">Analysis Summary</h4>
                    <p className="text-stone-200 text-lg md:text-xl font-light leading-relaxed italic">
                      "{expertises[activeBrief].desc}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm md:text-base uppercase tracking-[0.3em] text-stone-200 mb-4 font-semibold border-b border-stone-600 pb-2">Technical Scope</h4>
                    <p className="text-stone-300 leading-relaxed font-light text-sm md:text-base">
                      {expertises[activeBrief].brief}
                    </p>
                  </div>

                  <div className="pt-4 md:pt-8">
                    <a 
                      href="#contact"
                      onClick={() => setActiveBrief(null)}
                      className="inline-flex items-center gap-3 text-xs md:text-base uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-stone-100 hover:gap-5 transition-all group"
                    >
                      Request Documentation <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Aesthetic glass highlight */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-stone-100/5 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-stone-950/20 backdrop-blur-sm border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-5xl mx-auto text-center">
        <span className="text-sm md:text-base uppercase tracking-[0.4em] text-stone-400 mb-8 block font-semibold">
          About Cybravion
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-100 mb-12 leading-[1.1] tracking-tight">
          Secure your cloud. <br className="hidden md:block" />
          <span className="italic text-stone-300">Reduce risk. Stay compliant.</span>
        </h2>
        
        <div className="space-y-8 text-stone-300 font-light leading-relaxed text-lg md:text-xl max-w-3xl mx-auto">
          <p>
            We don't just sell technology—we solve business problems. CYBRAVION acts as your trusted partner, securing your operations so you can focus on growth without fearing the next breach.
          </p>
          <p>
            Whether you need to align with global compliance standards, test your applications for vulnerabilities, or build a resilient cloud architecture, we deliver practical, outcome-driven results.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border-t border-stone-800 pt-16 text-left">
          <div className="group bg-white/[0.02] border border-white/5 p-10 rounded-3xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
            <h4 className="text-stone-100 font-serif text-2xl md:text-3xl mb-6 group-hover:text-white transition-colors">
              Our Vision
            </h4>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">
              Enable continuous business innovation through resilient, uncompromising security frameworks.
            </p>
          </div>
          <div className="group bg-white/[0.02] border border-white/5 p-10 rounded-3xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500">
            <h4 className="text-stone-100 font-serif text-2xl md:text-3xl mb-6 group-hover:text-white transition-colors">
              Our Objective
            </h4>
            <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">
              Find gaps, fix them fast, and keep you compliant with zero friction to your operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-transparent relative overflow-hidden border-t border-white/10">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-stone-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="py-10">
            <span className="text-sm md:text-base uppercase tracking-[0.4em] text-stone-400 mb-8 block font-semibold">Partner With Cybravion</span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-100 mb-10 tracking-tighter leading-tight">
              Ready to secure <br /><span className="italic text-stone-300">your infrastructure?</span>
            </h2>
            <p className="text-stone-300 font-light mb-16 max-w-md text-lg leading-relaxed">
              Let's discuss how we can align your security posture with your business objectives. Reach out to our advisory team today.
            </p>

            <div className="space-y-10">
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-stone-300 group-hover:text-stone-100 group-hover:border-white/20 group-hover:bg-white/[0.05] transition-all duration-500">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-400 mb-1 font-bold">Email</p>
                  <p className="text-stone-300 text-xl font-light tracking-wide">cybravions@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-stone-300 group-hover:text-stone-100 group-hover:border-white/20 group-hover:bg-white/[0.05] transition-all duration-500">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-400 mb-1 font-bold">Phone</p>
                  <p className="text-stone-300 text-xl font-light tracking-wide">+91-9358683634</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] backdrop-blur-2xl p-8 md:p-14 rounded-3xl border border-white/5 shadow-2xl relative z-10"
            >
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-10">
                {/* Replace YOUR_ACCESS_KEY_HERE with your Web3Forms access key */}
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="space-y-3 group">
                    <label className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold ml-2 group-focus-within:text-stone-200 transition-colors">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-stone-100 focus:outline-none focus:bg-white/[0.05] focus:border-white/30 transition-all placeholder:text-stone-600 text-base" 
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold ml-2 group-focus-within:text-stone-200 transition-colors">Company</label>
                    <input 
                      type="text" 
                      name="organization"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-stone-100 focus:outline-none focus:bg-white/[0.05] focus:border-white/30 transition-all placeholder:text-stone-600 text-base" 
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold ml-2 group-focus-within:text-stone-200 transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-stone-100 focus:outline-none focus:bg-white/[0.05] focus:border-white/30 transition-all placeholder:text-stone-600 text-base" 
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-3 group">
                  <label className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold ml-2 group-focus-within:text-stone-200 transition-colors">Message</label>
                  <textarea 
                    rows={3}
                    name="message"
                    required
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-stone-100 focus:outline-none focus:bg-white/[0.05] focus:border-white/30 transition-all placeholder:text-stone-600 resize-none text-base leading-relaxed" 
                    placeholder="How can we help secure your business?"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full py-3 md:py-5 bg-stone-100 text-stone-950 text-xs md:text-base uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold rounded-xl hover:bg-white transition-all shadow-xl shadow-stone-950/50"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-stone-700 rounded-3xl -z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-stone-950/60 backdrop-blur-md border-t border-white/10 py-10 overflow-hidden relative font-mono">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xs">
            <a href="#" className="flex flex-col items-center mb-6 w-fit opacity-80 hover:opacity-100 transition-opacity">
              <img src="/logo.png" alt="Cybravion Logo" className="h-10 w-auto object-contain mb-1" />
              <div className="flex flex-col items-center text-center">
                <span className="text-lg font-bold tracking-[0.25em] uppercase leading-none">
                  <span className="text-stone-100">CYBR</span><span className="text-blue-500">AVION</span>
                </span>
                <span className="text-[7px] uppercase tracking-[0.4em] font-bold mt-1.5 text-stone-300">
                  SECURE. <span className="text-blue-500">GOVERN.</span> EMPOWER.
                </span>
              </div>
            </a>
            <p className="text-stone-400 text-xs leading-relaxed uppercase tracking-widest font-light">
              Integrated cybersecurity, digital intelligence, and resilience services through a business-aligned approach.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs uppercase tracking-[0.4em] text-stone-300 mb-4 font-bold">Expertise</h4>
              <ul className="space-y-2">
                {['Cyber GRC', 'VAPT Testing', 'AI Governance', 'OSINT Services'].map(item => (
                  <li key={item}><a href="#" className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.4em] text-stone-300 mb-4 font-bold">Inquiry</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors">Contact</a></li>
                <li><a href="#" className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-stone-800 flex justify-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 text-center">
            © {new Date().getFullYear()} CYBRAVION Solutions. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 scroll-smooth relative">
      {/* Fixed Background Video */}
      <div className="fixed inset-0 z-0 bg-stone-950">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-40"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-transparent to-stone-950/80 pointer-events-none" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <TrackRecord />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
