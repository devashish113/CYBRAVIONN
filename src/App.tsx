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
  ArrowRight
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
        <a href="#" className="flex flex-col group">
          <span className="text-xl md:text-xl font-serif font-bold tracking-tight text-stone-100 group-hover:text-stone-200 transition-colors">
            CYBRAVION
          </span>
          <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-stone-300 font-medium">Solutions</span>
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
            className="px-6 py-2 border border-stone-500 rounded-full text-sm uppercase tracking-widest hover:bg-stone-100 hover:text-stone-950 transition-all duration-300"
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-32 pb-20">
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto flex flex-col items-center text-center relative"
        >
          
          <div className="relative z-10 inline-flex items-center justify-center gap-2 md:gap-3 mb-10 px-5 py-2.5 border border-white/10 rounded-3xl md:rounded-full bg-black/40 backdrop-blur-md max-w-full shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-pulse shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-stone-200 font-medium text-center leading-relaxed">Global Digital Resilience Authority</span>
          </div>
          
          <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-white mb-8 tracking-tight drop-shadow-lg">
            Defense through <br /><span className="italic text-stone-300">Intelligence.</span>
          </h1>
          
          <p className="relative z-10 text-base md:text-lg text-stone-300 mb-12 max-w-2xl font-light leading-relaxed drop-shadow-md">
            Leading cybersecurity consulting specializing in end-to-end governance, risk management, and strategic digital influence for the modern enterprise.
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center w-full">
            <a 
              href="#services"
              className="px-10 py-4 bg-white text-stone-950 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-stone-200 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Our Expertise
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact"
              className="px-10 py-4 border border-white/20 text-white rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all text-center flex items-center justify-center backdrop-blur-md"
            >
              Consult an Advisor
            </a>
          </div>
        </motion.div>
      </div>


    </section>
  );
};

const Services = () => {
  const [activeBrief, setActiveBrief] = useState<number | null>(null);

  const expertises = [
    {
      title: "Cyber Security GRC",
      desc: "Governance, Risk & Compliance frameworks aligned with ISO 27001, NIST, and GDPR standards.",
      icon: <Shield className="w-6 h-6" />,
      brief: "Our GRC services enable organizations to integrate security into business decision-making. We specialize in information security policies, enterprise risk assessments, ISMS documentation, and audit readiness programs. We support alignment with ISO/IEC 27001, NIST CSF, SOC 2, and GDPR."
    },
    {
      title: "VAPT Coordination",
      desc: "Comprehensive vulnerability assessment and penetration testing across all digital assets.",
      icon: <Lock className="w-6 h-6" />,
      brief: "We identify and address security vulnerabilities across applications, networks, and cloud environments. Our services include web/mobile testing, API security, infrastructure validation, and vulnerability lifecycle management to reduce exploitable attack surfaces."
    },
    {
      title: "Security Architecture",
      desc: "Deep integration of security-by-design principles into enterprise technology ecosystems.",
      icon: <Cpu className="w-6 h-6" />,
      brief: "We embed security-by-design principles into technology ecosystems. Offerings include zero trust advisory, identity and access management (IAM), data protection architecture, and security assurance validation for complex digital transformation projects."
    },
    {
      title: "AI Risk Governance",
      desc: "Implementing responsible AI frameworks and digital trust mechanisms for emerging tech.",
      icon: <Globe className="w-6 h-6" />,
      brief: "Help organizations implement responsible AI governance. We support ISO/IEC 42001 readiness, AI risk assessments, ethical risk analysis, and model governance awareness to balance innovation with accountability and stakeholder trust."
    },
    {
      title: "OSINT Intelligence",
      desc: "Threat visibility and situational awareness through structured open-source intelligence.",
      icon: <Search className="w-6 h-6" />,
      brief: "Intelligence-led services to enhance situational awareness. We perform digital footprint analysis, adversary profiling, brand intelligence, and threat trend monitoring to proactively identify risks and strengthen decision-making."
    },
    {
      title: "Digital Influence",
      desc: "Reputation monitoring and strategic content visibility to safeguard brand integrity.",
      icon: <Users className="w-6 h-6" />,
      brief: "Enhance digital presence and brand visibility through strategic online influence. Services include reputation monitoring, social media intelligence, audience analysis, and strategic content visibility planning to improve market perception."
    },
    {
      title: "Capability Development",
      desc: "Professional cybersecurity training programs designed for technical and executive leadership.",
      icon: <BarChart3 className="w-6 h-6" />,
      brief: "Structured professional training for cyber maturity. We offer GRC programs, risk management training, OSINT workshops, and support for globally recognized certifications (CISSP, CISA) designed for technical teams and management."
    },
    {
      title: "Product Advisory",
      desc: "Optimization of security technologies aligned with strategic business objectives.",
      icon: <HardDrive className="w-6 h-6" />,
      brief: "Assisting organizations in evaluating and optimizing cybersecurity technologies. We provide implementation roadmaps, technology assessments, and security tool integration support to maximize security ROI through informed decisions."
    }
  ];

  return (
    <section id="services" className="py-42 bg-transparent border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-base uppercase tracking-[0.4em] text-stone-300 mb-6 block">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-100 leading-tight">
              Sophisticated Protection for <br /><span className="italic">Complex Ecosystems</span>.
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-stone-300 max-w-xs text-base leading-relaxed">
              We bridge the gap between traditional practices and emerging digital risks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertises.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              className="p-10 bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl group transition-all duration-500 cursor-pointer"
              onClick={() => setActiveBrief(i)}
            >
              <div className="text-stone-100 mb-8 p-3 w-fit bg-white/[0.03] border border-white/5 rounded-xl group-hover:bg-stone-100 group-hover:text-stone-950 transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif text-stone-100 mb-4 tracking-tight">{item.title}</h3>
              <p className="text-stone-300 text-base font-light leading-relaxed mb-8">
                {item.desc}
              </p>
              <button 
                className="flex items-center gap-2 text-base uppercase tracking-[0.2em] text-stone-400 group-hover:text-stone-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveBrief(i);
                }}
              >
                Technical Brief <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
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
              className="relative w-full max-w-2xl bg-stone-900 border border-white/10 p-10 md:p-16 rounded-3xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setActiveBrief(null)}
                className="absolute top-8 right-8 text-stone-300 hover:text-stone-100 p-2 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-6 mb-12">
                <div className="p-4 bg-stone-100 text-stone-950 rounded-2xl shadow-lg">
                  {expertises[activeBrief].icon}
                </div>
                <div>
                  <span className="text-base uppercase tracking-[0.4em] text-stone-300 block mb-2 font-bold">Service Vertical</span>
                  <h3 className="text-3xl font-serif text-stone-100 tracking-tight">{expertises[activeBrief].title}</h3>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-base uppercase tracking-[0.3em] text-stone-200 mb-4 font-semibold border-b border-stone-600 pb-2">Analysis Summary</h4>
                  <p className="text-stone-200 text-xl font-light leading-relaxed italic">
                    "{expertises[activeBrief].desc}"
                  </p>
                </div>

                <div>
                  <h4 className="text-base uppercase tracking-[0.3em] text-stone-200 mb-4 font-semibold border-b border-stone-600 pb-2">Technical Scope</h4>
                  <p className="text-stone-300 leading-relaxed font-light">
                    {expertises[activeBrief].brief}
                  </p>
                </div>

                <div className="pt-8">
                  <a 
                    href="#contact"
                    onClick={() => setActiveBrief(null)}
                    className="inline-flex items-center gap-3 text-base uppercase tracking-[0.3em] font-bold text-stone-100 hover:gap-5 transition-all group"
                  >
                    Request Full Documentation <ArrowRight size={14} />
                  </a>
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
    <section id="about" className="py-32 md:py-48 bg-stone-950/20 backdrop-blur-sm border-t border-white/10 relative">
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-5xl mx-auto text-center">
        <span className="text-sm md:text-base uppercase tracking-[0.4em] text-stone-400 mb-8 block font-semibold">
          The Institution
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-stone-100 mb-12 leading-[1.1] tracking-tight">
          An intelligence-driven approach to <br className="hidden md:block" />
          <span className="italic text-stone-300">digital resilience.</span>
        </h2>
        
        <div className="space-y-8 text-stone-300 font-light leading-relaxed text-lg md:text-xl max-w-3xl mx-auto">
          <p>
            In an increasingly interconnected digital environment, CYBRAVION Solutions stands as a premier advisory firm specializing in end-to-end Cyber Security Governance, Risk Management & Compliance.
          </p>
          <p>
            Our multidisciplinary approach combines governance excellence, technical security expertise, and risk intelligence to help organizations proactively manage threats and ensure regulatory alignment.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-stone-800 pt-16 text-left">
          <div className="group bg-white/[0.02] border border-white/5 p-10 rounded-3xl hover:bg-white/[0.04] transition-colors">
            <h4 className="text-stone-100 font-serif text-2xl mb-4 group-hover:text-white transition-colors">
              Our Vision
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed uppercase tracking-[0.15em] font-medium">
              Building a future-ready digital ecosystem where organizations innovate with confidence.
            </p>
          </div>
          <div className="group bg-white/[0.02] border border-white/5 p-10 rounded-3xl hover:bg-white/[0.04] transition-colors">
            <h4 className="text-stone-100 font-serif text-2xl mb-4 group-hover:text-white transition-colors">
              Our Objective
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed uppercase tracking-[0.15em] font-medium">
              Empowering entities with practical frameworks and measurable risk reduction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-42 bg-transparent relative overflow-hidden border-t border-white/10">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-stone-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="py-10">
            <span className="text-base uppercase tracking-[0.4em] text-stone-400 mb-8 block font-semibold">Contact Us</span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-100 mb-12 tracking-tighter leading-tight">
              Get in touch <br /><span className="italic text-stone-300">with us.</span>
            </h2>
            <p className="text-stone-300 font-light mb-16 max-w-sm text-xl leading-relaxed">
              Fill out the form below to discuss how we can help your business.
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-[0.3em] text-stone-400 font-bold ml-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full bg-transparent border-b border-stone-600 py-4 text-stone-100 focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-500 text-base" 
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm uppercase tracking-[0.3em] text-stone-400 font-bold ml-1">Company</label>
                    <input 
                      type="text" 
                      name="organization"
                      className="w-full bg-transparent border-b border-stone-600 py-4 text-stone-100 focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-500 text-base" 
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm uppercase tracking-[0.3em] text-stone-400 font-bold ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-stone-600 py-4 text-stone-100 focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-500 text-base" 
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm uppercase tracking-[0.3em] text-stone-400 font-bold ml-1">Message</label>
                  <textarea 
                    rows={4}
                    name="message"
                    required
                    className="w-full bg-transparent border-b border-stone-600 py-4 text-stone-100 focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-500 resize-none text-base leading-relaxed" 
                    placeholder="How can we help you?"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full py-5 bg-stone-100 text-stone-950 text-base uppercase tracking-[0.4em] font-bold rounded-xl hover:bg-white transition-all shadow-xl shadow-stone-950/50"
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
            <a href="#" className="flex flex-col mb-4">
              <span className="text-lg font-bold tracking-tight text-stone-100">
                CYBRAVION
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium">Solutions</span>
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
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/80 to-stone-950/95 z-10 pointer-events-none" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity scale-105 pointer-events-none"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
