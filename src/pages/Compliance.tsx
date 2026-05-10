import { motion } from 'motion/react';
import { Shield, Lock, FileCheck, CheckCircle2, Server, Key } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const CompliancePage = () => {
  return (
    <div className="pt-24 min-h-screen bg-transparent text-white relative">
      <Helmet>
        <title>Trust Center & Compliance | CYBRAVION</title>
        <meta name="description" content="Discover how CYBRAVION secures its operations, protects client data, and aligns with global standards like ISO 27001 and DPDP Act." />
        <meta name="keywords" content="cybersecurity compliance, trust center, ISO 27001, DPDP Act, data privacy, secure infrastructure, GRC alignment" />
        <link rel="canonical" href="https://cybravion.com/#compliance" />
      </Helmet>

      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.4em] text-blue-400 font-bold mb-6 block">
              Trust Center
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-8">
              Security & <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent italic font-light">Compliance.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-stone-300 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              We practice what we preach. Discover how CYBRAVION secures its operations, protects client data, and aligns with global standards.
            </motion.p>
          </motion.div>
        </section>

        <section className="py-24 border-t border-white/5 bg-stone-950/40 relative">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold">Our Security Practices</h2>
              <p className="text-stone-400 mt-4 max-w-2xl mx-auto">Enterprise-grade security is baked into every layer of our infrastructure and daily operations.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Secure by Design", desc: "All internal systems are architected following Zero Trust principles, ensuring verified access at every node.", icon: <Shield className="w-6 h-6" /> },
                { title: "Continuous Monitoring", desc: "We employ 24/7 endpoint detection and response (EDR) alongside automated vulnerability scanning.", icon: <Server className="w-6 h-6" /> },
                { title: "Access Control", desc: "Strict RBAC (Role-Based Access Control) with mandatory MFA and hardware security keys for all staff.", icon: <Key className="w-6 h-6" /> }
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-colors">
                  <div className="p-3 bg-blue-500/10 text-blue-400 w-fit rounded-2xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-stone-400 leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-white/5 bg-stone-900/20 relative">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-orange-400 font-bold mb-4 block">Client Confidentiality</span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">How we handle your data.</h2>
              <p className="text-stone-300 mb-8 leading-relaxed font-light">
                During VAPT or GRC engagements, we often handle highly sensitive network maps, source code, and compliance data. We treat your data with the highest level of confidentiality.
              </p>
              <ul className="space-y-4">
                {[
                  "End-to-end encryption for data in transit (TLS 1.3) and at rest (AES-256).",
                  "Strict data retention policies. Client data is securely wiped post-engagement.",
                  "All assessments are conducted via secure, isolated VPN tunnels.",
                  "Non-Disclosure Agreements (NDAs) are mandatory prior to any scoping."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-300">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full bg-orange-500/5 border border-orange-500/20 flex items-center justify-center relative z-10">
                <Lock className="w-32 h-32 text-orange-400/50" strokeWidth={1} />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
            </div>
          </div>
        </section>

        <section className="py-24 border-t border-white/5 bg-stone-950/40 relative">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
             <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold">Our Compliance Approach</h2>
              <p className="text-stone-400 mt-4 max-w-2xl mx-auto">We align our operations with the strict frameworks we implement for our clients.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/[0.02] border border-blue-500/20 rounded-3xl p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <FileCheck className="w-8 h-8 text-blue-400" />
                  <h3 className="text-2xl font-bold">ISO 27001 Alignment</h3>
                </div>
                <p className="text-stone-400 leading-relaxed font-light">
                  Our internal Information Security Management System (ISMS) is built to mirror the rigorous requirements of ISO 27001, ensuring that risk assessments, access reviews, and incident response plans are documented, tested, and continuously improved.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/[0.02] border border-orange-500/20 rounded-3xl p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <FileCheck className="w-8 h-8 text-orange-400" />
                  <h3 className="text-2xl font-bold">Privacy & DPDP</h3>
                </div>
                <p className="text-stone-400 leading-relaxed font-light">
                  We are fully committed to data privacy. We comply with modern privacy acts including GDPR and India's DPDP Act. We only collect data necessary for engagements and ensure clients have full control over their digital footprint.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
