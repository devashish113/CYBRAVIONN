import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Brain, 
  Server, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  Activity, 
  FileCheck, 
  Network, 
  Radar, 
  ShieldAlert, 
  Sliders, 
  Building, 
  HardDrive
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface CybravionsAIProps {
  onOpenConsultation?: (serviceId?: string) => void;
}

export const CybravionsAIPage: React.FC<CybravionsAIProps> = ({ onOpenConsultation }) => {
  const [activeSector, setActiveSector] = useState<'defense' | 'police' | 'infra'>('defense');
  const [selectedAgentModel, setSelectedAgentModel] = useState<string>('Llama-3-70B-AirGap');
  const [isSimulatingAnalysis, setIsSimulatingAnalysis] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(3);

  const handleDemoClick = () => {
    if (onOpenConsultation) {
      onOpenConsultation('ai-exception-manager');
    } else {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = '#contact';
      }
    }
  };

  const handleSimulate = () => {
    setIsSimulatingAnalysis(true);
    setSimulationStep(1);
    setTimeout(() => setSimulationStep(2), 700);
    setTimeout(() => setSimulationStep(3), 1400);
    setTimeout(() => setIsSimulatingAnalysis(false), 2000);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 selection:bg-blue-500/20 selection:text-blue-900 relative">
      <Helmet>
        <title>Cybravions AI | Air-Gapped Sovereign Agentic AI In-a-Box</title>
        <meta 
          name="description" 
          content="Enterprise & Defense grade sovereign AI appliance. 100% offline, zero cloud telemetry, autonomous multi-agent intelligence in an air-gapped box." 
        />
        <meta name="keywords" content="sovereign AI, air-gapped AI, defense AI, autonomous agents, on-premise LLM, national security AI, Cybravions AI" />
        <link rel="canonical" href="https://cybravions.com/#ai" />
      </Helmet>

      {/* --- Section 1: Sovereign Hero Banner --- */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-transparent text-slate-900 dark:text-white overflow-hidden border-b border-slate-200/80 dark:border-blue-500/20">
        {/* Ambient Glowing Gradient Aura Backdrops */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-br from-blue-600/20 via-blue-900/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-orange-600/15 via-amber-500/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
          {/* Brand Sovereign Pill */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-400/50 text-blue-800 dark:text-blue-300 text-xs uppercase tracking-[0.25em] font-bold mb-8 backdrop-blur-md shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-ping" />
            <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>CYBRAVIONS AI</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.12]"
          >
            Air-Gapped Sovereign{' '}
            <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-orange-600 dark:from-blue-400 dark:via-sky-300 dark:to-orange-400 bg-clip-text text-transparent">
              Agentic AI In-a-Box
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-700 dark:text-stone-300 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-normal leading-relaxed mb-10"
          >
            Deploy autonomous, self-contained multi-agent intelligence directly on-premises. 
            Engineered with zero external cloud dependencies, hardware-level air-gapping, and complete sovereign data ownership.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              onClick={handleDemoClick}
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(249, 115, 22, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 via-sky-500 to-orange-500 hover:from-blue-500 hover:via-sky-400 hover:to-orange-400 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>REQUEST A DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <a
              href="#see-in-action"
              className="px-8 py-4 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-800 dark:text-stone-200 border border-slate-300 dark:border-white/10 hover:border-orange-500 dark:hover:border-orange-400/40 font-semibold text-sm uppercase tracking-widest rounded-xl backdrop-blur-sm transition-all flex items-center gap-2 shadow-sm"
            >
              <span>EXPLORE CAPABILITIES</span>
              <ChevronRight className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- Section 2: Sovereign Mission & Overview --- */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-600 dark:text-orange-400 mb-3 block">
            SOVEREIGN INTELLIGENCE PARADIGM
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            Air-Gapped Sovereign Agentic AI In-a-Box
          </h2>
          <p className="text-slate-600 dark:text-stone-300 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
            Traditional AI relies on public hyperscalers, introducing unacceptable risk of classified intelligence leakage, regulatory violations, and external disruption. <strong className="text-slate-900 dark:text-white font-semibold">Cybravions AI</strong> delivers a fully integrated sovereign appliance: pre-loaded with state-of-the-art quantized neural weights, autonomous agent orchestration runtimes, and strict local guardrails that function completely decoupled from the internet.
          </p>
        </motion.div>
      </section>

      {/* --- Section 3: "See It In Action" Interactive Showcases --- */}
      <section id="see-in-action" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-white/10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-2 block">
            INTERACTIVE SYSTEM PREVIEW
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See it in Action
          </h2>
          <p className="text-slate-600 dark:text-stone-300 text-base md:text-lg mt-3 max-w-2xl mx-auto">
            Experience the sovereign multi-agent workflow operating inside an isolated, air-gapped secure envelope.
          </p>
        </div>

        {/* Feature 1: Deploying Sovereign Multi-Agent Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Network className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Module 01
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Deploying Sovereign Multi-Agent Workspace
            </h3>
            <p className="text-slate-600 dark:text-stone-300 leading-relaxed">
              Instantiate role-specialized autonomous agents with isolated memory contexts and rigorous capability boundaries. Configure supervisor nodes, tactical analysts, and cryptographic certifiers in minutes on your private bare-metal servers.
            </p>
            <ul className="space-y-3 text-slate-700 dark:text-stone-300 text-sm">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <span>Zero telemetry — 0 bytes broadcast externally</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <span>Hot-swappable local LLMs (Llama-3, DeepSeek-R1, Defense-Tuned)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <span>Hardware-enforced memory isolation & encrypted vector storage</span>
              </li>
            </ul>
          </motion.div>

          {/* Interactive Mockup 1: Multi-Agent Workspace Browser */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-stone-900 rounded-2xl border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(15,23,42,0.12)] overflow-hidden"
          >
            {/* Window Title Bar */}
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-slate-400 ml-2">cybravions-ai://workspace/agent-config</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AIR-GAP: SECURE
                </span>
              </div>
            </div>

            {/* Window Body */}
            <div className="p-6 bg-slate-50 dark:bg-stone-950/60 space-y-5">
              <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-slate-200 dark:border-stone-800 shadow-sm">
                <label className="text-xs font-bold text-slate-500 dark:text-stone-400 uppercase tracking-wider block mb-2">
                  Select Air-Gapped Foundation Model
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Llama-3-70B-AirGap', 'DeepSeek-R1-Sovereign', 'Defense-LoRA-Custom'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedAgentModel(m)}
                      className={`px-3 py-2 text-xs font-mono rounded-lg border text-left transition-all cursor-pointer ${
                        selectedAgentModel === m
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-300 font-bold shadow-sm'
                          : 'bg-slate-50 dark:bg-stone-800 border-slate-200 dark:border-stone-700 text-slate-600 dark:text-stone-300 hover:bg-slate-100 dark:hover:bg-stone-700/80'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Agent Swarm Roster */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 dark:text-stone-400 uppercase tracking-wider">Active Swarm Persona Nodes</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-blue-200 dark:border-blue-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-md">
                        <Radar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Recon Intel Agent</div>
                        <div className="text-[10px] text-slate-500 dark:text-stone-400">Autonomous signal decoding</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">READY</span>
                  </div>

                  <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-slate-200 dark:border-stone-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 rounded-md">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Threat Correlator</div>
                        <div className="text-[10px] text-slate-500 dark:text-stone-400">Cross-database matching</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">READY</span>
                  </div>
                </div>
              </div>

              {/* Status footer bar */}
              <div className="pt-2 border-t border-slate-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-stone-400">
                <span>Hardware Acceleration: Dual H100 Sovereign NVLink</span>
                <span className="text-blue-700 dark:text-blue-400 font-semibold">Memory Isolation: Enforced</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature 2: Executing Deep Confidential Analysis on Offline Air-Gapped Network */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Interactive Mockup 2: Pipeline DAG */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 bg-white dark:bg-stone-900 rounded-2xl border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(15,23,42,0.12)] overflow-hidden"
          >
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-slate-400 ml-2">cybravions-ai://pipeline/execution-dag</span>
              </div>
              <button
                onClick={handleSimulate}
                disabled={isSimulatingAnalysis}
                className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white font-mono text-[10px] font-bold rounded flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Zap className="w-3 h-3" />
                {isSimulatingAnalysis ? 'RUNNING...' : 'EXECUTE PIPELINE'}
              </button>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-stone-950/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-stone-300 uppercase">Multi-Agent Execution Pipeline</span>
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">Network: Isolated Local LAN</span>
              </div>

              {/* Execution Flow Diagram */}
              <div className="grid grid-cols-3 gap-3">
                <div className={`p-3 rounded-xl border transition-all ${
                  simulationStep >= 1 ? 'bg-white dark:bg-stone-900 border-blue-500 shadow-md ring-2 ring-blue-400/20' : 'bg-slate-100 dark:bg-stone-800 border-slate-200 dark:border-stone-700 text-slate-400'
                }`}>
                  <div className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 mb-1">STAGE 01</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-stone-200">Data Ingestion</div>
                  <div className="text-[10px] text-slate-500 dark:text-stone-400 mt-1">Encrypted logs</div>
                </div>

                <div className={`p-3 rounded-xl border transition-all ${
                  simulationStep >= 2 ? 'bg-white dark:bg-stone-900 border-orange-500 shadow-md ring-2 ring-orange-400/20' : 'bg-slate-100 dark:bg-stone-800 border-slate-200 dark:border-stone-700 text-slate-400'
                }`}>
                  <div className="text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400 mb-1">STAGE 02</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-stone-200">Agent Reasoning</div>
                  <div className="text-[10px] text-slate-500 dark:text-stone-400 mt-1">Cross-entity correlation</div>
                </div>

                <div className={`p-3 rounded-xl border transition-all ${
                  simulationStep >= 3 ? 'bg-white dark:bg-stone-900 border-emerald-500 shadow-md ring-2 ring-emerald-400/20' : 'bg-slate-100 dark:bg-stone-800 border-slate-200 dark:border-stone-700 text-slate-400'
                }`}>
                  <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">STAGE 03</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-stone-200">Redacted Intel</div>
                  <div className="text-[10px] text-slate-500 dark:text-stone-400 mt-1">Sovereign summary export</div>
                </div>
              </div>

              {/* Live console readout */}
              <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] space-y-1">
                <div className="text-emerald-400">[0.00s] &gt; Air-gap verification passed. External sockets: 0</div>
                <div className="text-blue-300">[0.14s] &gt; Model {selectedAgentModel} initialized on local GPU cluster</div>
                <div className="text-slate-300">[0.42s] &gt; 12,480 classified vectors indexed in RAM</div>
                <div className="text-emerald-300 font-bold">[0.88s] &gt; Analysis complete. Decision confidence: 99.4%</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-bold uppercase tracking-wider">
              <Brain className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              Module 02
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Executing Deep Confidential Analysis on Offline Air-Gapped Network
            </h3>
            <p className="text-slate-600 dark:text-stone-300 leading-relaxed">
              Synthesize Petabytes of classified signals intelligence, forensic video feeds, and encrypted telemetry without sending a single byte across the internet. Our parallel reasoning kernel maximizes on-premise compute efficiency.
            </p>
            <ul className="space-y-3 text-slate-700 dark:text-stone-300 text-sm">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Deterministic offline retrieval-augmented generation (RAG)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Zero hallucinations with strict source-attribution tracing</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Multi-modal processing (CCTV feeds, audio transcripts, sensor graphs)</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Feature 3: Real-time Autonomous Policy & Threat Guardrails */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Module 03
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Real-time Autonomous Policy & Threat Guardrails
            </h3>
            <p className="text-slate-600 dark:text-stone-300 leading-relaxed">
              Enforce cryptographic security guardrails on every agent decision. Every intermediate reasoning step, prompt expansion, and action output is audited against defense rulesets in real time, preventing unauthorized data access or rogue agent execution.
            </p>
            <ul className="space-y-3 text-slate-700 dark:text-stone-300 text-sm">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <span>Hardware-anchored TPM cryptographic signing of all decision logs</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <span>Real-time red-line containment and policy veto gates</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
                <span>Tamper-proof compliance reporting compliant with military standards</span>
              </li>
            </ul>
          </motion.div>

          {/* Interactive Mockup 3: Guardrail Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-stone-900 rounded-2xl border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(15,23,42,0.12)] overflow-hidden"
          >
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-slate-400 ml-2">cybravions-ai://guardrails/audit-stream</span>
              </div>
              <span className="text-[10px] font-mono text-blue-300">POLICY ENFORCEMENT: 100% ACTIVE</span>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-stone-950/60 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-slate-200 dark:border-stone-800">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-stone-400 uppercase">Zero-Data Leak Guard</div>
                  <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">0 Violations</div>
                  <div className="text-[10px] text-slate-400">148,290 requests checked</div>
                </div>
                <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-slate-200 dark:border-stone-800">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-stone-400 uppercase">Audit Hash Integrity</div>
                  <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">SHA-256 Valid</div>
                  <div className="text-[10px] text-slate-400">TPM Key Hardware Verified</div>
                </div>
              </div>

              {/* Policy List */}
              <div className="space-y-2">
                {[
                  { name: 'External Network Socket Prevention', status: 'LOCKED', color: 'emerald' },
                  { name: 'Classified Document Clearance Filter', status: 'VERIFIED', color: 'emerald' },
                  { name: 'Adversarial Prompt Injection Shield', status: 'ACTIVE', color: 'blue' },
                ].map((p, i) => (
                  <div key={i} className="p-2.5 bg-white dark:bg-stone-900 rounded-lg border border-slate-200 dark:border-stone-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-slate-800 dark:text-stone-200">{p.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Section 4: Core Capabilities of Cybravions AI --- */}
      <section className="py-24 px-6 md:px-12 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[150px]" />
          <div 
            className="w-full h-full opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(37, 99, 235, 0.5) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400 mb-2 block">
              DEFENSE-GRADE ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Core Capabilities of <span className="text-orange-400">Cybravions AI</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg mt-3 max-w-2xl mx-auto">
              Engineered from the ground up for zero trust, zero leakage, and autonomous agent resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left 2 Pillars */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-blue-500/20 hover:border-blue-400/50 transition-all backdrop-blur-md"
              >
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">100% Offline Air-Gapped Security</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Total physical and network isolation. Operates seamlessly without internet or external DNS, safeguarding classified national intelligence and corporate secrets.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-orange-500/20 hover:border-orange-400/50 transition-all backdrop-blur-md"
              >
                <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl w-fit mb-4">
                  <Network className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Autonomous Multi-Agent Swarms</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Hierarchical coordination of specialized agents that decompose complex reconnaissance, triage, and threat containment tasks with high precision.
                </p>
              </motion.div>
            </div>

            {/* Center Visual Graphic: Hologram Cyber Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center p-8"
            >
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-blue-500/40 relative flex items-center justify-center shadow-[0_0_80px_rgba(37,99,235,0.25)] bg-gradient-to-br from-blue-950/40 to-slate-950/80 backdrop-blur-xl">
                {/* Rotating ring 1 */}
                <div className="absolute inset-2 rounded-full border border-dashed border-blue-400/30 animate-spin" style={{ animationDuration: '30s' }} />
                
                {/* Rotating ring 2 */}
                <div className="absolute inset-8 rounded-full border border-dotted border-orange-400/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />

                {/* Central AI Node Icon */}
                <div className="text-center relative z-10 space-y-2">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.6)]">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-sm font-bold tracking-widest text-orange-300 font-mono">SOVEREIGN CORE</div>
                  <div className="text-[11px] text-slate-400">Zero-Trust Kernel</div>
                </div>

                {/* Node connection pulses */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-blue-900/90 border border-blue-400/60 text-[10px] font-mono text-blue-300">
                  TPM SEALED
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-orange-900/90 border border-orange-400/60 text-[10px] font-mono text-orange-300">
                  ISOLATED LAN
                </div>
              </div>
            </motion.div>

            {/* Right 2 Pillars */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-blue-500/20 hover:border-blue-400/50 transition-all backdrop-blur-md"
              >
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Defense & Enterprise Grade Privacy</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Full ownership of model weights, vector representations, and embeddings. No third-party API keys or external license callbacks required.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-emerald-500/20 hover:border-emerald-400/50 transition-all backdrop-blur-md"
              >
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit mb-4">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Compliance & Audit Trails</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Cryptographically immutable event ledgers for every prompt and response. Generates instant audit packs aligned with ISO 27001 and defense standards.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 5: Key Product Features Grid --- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-orange-600 dark:text-orange-400 mb-2 block">
            ENGINEERING EXCELLENCE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Key Product Features
          </h2>
          <p className="text-slate-600 dark:text-stone-300 text-base md:text-lg mt-3 max-w-2xl mx-auto">
            Comprehensive sovereign AI capabilities packaged for rapid on-premise installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
              title: "Sovereign Architecture",
              desc: "Turnkey deployable on rack-mounted servers, ruggedized tactical laptops, or isolated private cloud clusters."
            },
            {
              icon: <Sliders className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
              title: "Custom Model Fine-Tuning",
              desc: "Support for on-premise LoRA and full-parameter fine-tuning on confidential domain-specific intelligence."
            },
            {
              icon: <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
              title: "Explainable AI Engine",
              desc: "Complete visibility into the reasoning steps and verified source citations behind every generated insight."
            },
            {
              icon: <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
              title: "Multi-Agent Orchestration",
              desc: "Autonomous workflow pipelines capable of planning, executing, verifying, and reporting without human bottlenecks."
            },
            {
              icon: <ShieldAlert className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
              title: "Zero Data Leakage Guarantee",
              desc: "Hardware-enforced network boundaries guaranteeing that zero classified information leaves your perimeter."
            },
            {
              icon: <HardDrive className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
              title: "Modular Deployment",
              desc: "Scales elastically from tactical edge devices in the field to enterprise-wide sovereign data center grids."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-orange-400 dark:hover:border-orange-400/50 hover:shadow-xl transition-all group"
            >
              <div className="p-3 bg-slate-50 dark:bg-white/[0.04] group-hover:bg-orange-50 dark:group-hover:bg-orange-950/40 rounded-xl w-fit mb-5 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Section 6: Real-World Use Cases --- */}
      <section className="py-24 px-6 md:px-12 bg-slate-100/70 dark:bg-stone-900/30 border-t border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-2 block">
              OPERATIONAL IMPACT
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Real-World Use Cases
            </h2>
            <p className="text-slate-600 dark:text-stone-300 text-base md:text-lg mt-3 max-w-2xl mx-auto">
              Trusted for high-stakes missions where cloud connectivity is either forbidden or physically impossible.
            </p>

            {/* Sector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: 'defense', label: 'Defense & Intelligence Agencies', icon: <Radar className="w-4 h-4" /> },
                { id: 'police', label: 'Police & Law Enforcement', icon: <Shield className="w-4 h-4" /> },
                { id: 'infra', label: 'Federal & Critical Infrastructure', icon: <Building className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSector(tab.id as any)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                    activeSector === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg'
                      : 'bg-white dark:bg-stone-800 text-slate-700 dark:text-stone-200 hover:bg-slate-200 dark:hover:bg-stone-700 border border-slate-200 dark:border-stone-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sector Content Display */}
          <AnimatePresence mode="wait">
            {activeSector === 'defense' && (
              <motion.div
                key="defense"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Featured Defense Hero Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">DEFENSE FLAGSHIP APPLICATION</span>
                    <h3 className="text-2xl md:text-4xl font-extrabold">Predictive Battlefield Logistics & Intel Discovery</h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      Correlate tactical telemetry, reconnaissance drone feeds, radar signals, and field dispatches in real time inside tactical mobile command posts with zero cloud latency.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                      <span className="px-3 py-1 bg-blue-950/80 border border-blue-400/40 text-blue-300 rounded-full">Tactical Edge Compute</span>
                      <span className="px-3 py-1 bg-orange-950/80 border border-orange-400/40 text-orange-300 rounded-full">Zero RF Emissions Mode</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-6 rounded-2xl border border-blue-500/30 text-xs font-mono text-blue-300 space-y-2">
                    <div className="text-slate-400">// TACTICAL MISSION SUMMARY</div>
                    <div className="text-emerald-400">&gt; Ingesting 48 drone telemetry feeds (Air-Gapped)</div>
                    <div>&gt; Supply route optimization computed: 18.4% efficiency increase</div>
                    <div>&gt; Signal interference detected: Threat probability 89.2%</div>
                    <div className="p-2.5 bg-blue-950/50 rounded border border-blue-500/40 text-white font-bold">
                      Recommendation: Divert logistics convoy to Alpha-7 Grid corridor.
                    </div>
                  </div>
                </div>

                {/* Sub-cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Tactical Reconnaissance Analysis", desc: "Automated synthesis of multi-spectral aerial imagery and sensor arrays for immediate tactical decision support." },
                    { title: "Predictive Threat Modeling", desc: "Agent swarms continuously simulate enemy electronic warfare vectors and recommend countermeasures." },
                    { title: "Autonomous Signal Defense", desc: "Real-time RF and electronic signature analysis with automated jamming detection and frequency hopping." }
                  ].map((card, i) => (
                    <div key={i} className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{card.title}</h4>
                      <p className="text-slate-600 dark:text-stone-300 text-xs leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSector === 'police' && (
              <motion.div
                key="police"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Featured Police Hero Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">LAW ENFORCEMENT & FORENSICS</span>
                    <h3 className="text-2xl md:text-4xl font-extrabold">Forensic Analysis & Crime Pattern Detection</h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      Cross-reference terabytes of seized digital evidence, encrypted chat dumps, and forensic disk images without violating chain of custody or privacy laws.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                      <span className="px-3 py-1 bg-blue-950/80 border border-blue-400/40 text-blue-300 rounded-full">Chain-of-Custody Verified</span>
                      <span className="px-3 py-1 bg-orange-950/80 border border-orange-400/40 text-orange-300 rounded-full">Forensic Hardening</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-6 rounded-2xl border border-blue-500/30 text-xs font-mono text-blue-300 space-y-2">
                    <div className="text-slate-400">// FORENSIC INTELLIGENCE EXTRACTION</div>
                    <div className="text-emerald-400">&gt; 12 disk images ingested (MD5 verified)</div>
                    <div>&gt; Entity correlation across 45,000 communications</div>
                    <div>&gt; Cross-case pattern match found: Case #9102 &amp; #9108</div>
                    <div className="p-2.5 bg-blue-950/50 rounded border border-blue-500/40 text-white font-bold">
                      Evidentiary Report generated &amp; cryptographically signed.
                    </div>
                  </div>
                </div>

                {/* Sub-cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Predictive Hotspot Patrols", desc: "Spatial-temporal crime forecasting that suggests patrol routes while maintaining strict zero-bias guardrails." },
                    { title: "Surveillance Video Intelligence", desc: "Local offline object, license plate, and trajectory tracking across municipal CCTV feeds without cloud streaming." },
                    { title: "Real-Time Digital Forensics", desc: "Automated triage of malware binaries, phishing campaigns, and illicit crypto transactions." }
                  ].map((card, i) => (
                    <div key={i} className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{card.title}</h4>
                      <p className="text-slate-600 dark:text-stone-300 text-xs leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSector === 'infra' && (
              <motion.div
                key="infra"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Featured Infra Hero Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">CRITICAL INFRASTRUCTURE</span>
                    <h3 className="text-2xl md:text-4xl font-extrabold">Surveillance & Threat Detection for Sensitive Facilities</h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      Defend nuclear installations, power grids, and aerospace fabrication plants from Advanced Persistent Threats (APTs) and insider risks with air-gapped autonomous agents.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                      <span className="px-3 py-1 bg-blue-950/80 border border-blue-400/40 text-blue-300 rounded-full">SCADA / OT Protocol Support</span>
                      <span className="px-3 py-1 bg-orange-950/80 border border-orange-400/40 text-orange-300 rounded-full">IEC 62443 Aligned</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-6 rounded-2xl border border-blue-500/30 text-xs font-mono text-blue-300 space-y-2">
                    <div className="text-slate-400">// INDUSTRIAL CONTROL DEFENSE FEED</div>
                    <div className="text-emerald-400">&gt; Modbus / DNP3 telemetry monitoring active</div>
                    <div>&gt; PLC firmware integrity: 100% verified against baseline</div>
                    <div>&gt; Micro-voltage fluctuation detected at Substation 4</div>
                    <div className="p-2.5 bg-blue-950/50 rounded border border-blue-500/40 text-white font-bold">
                      Status: Autonomous isolation protocol armed. Zero unauthorized packets.
                    </div>
                  </div>
                </div>

                {/* Sub-cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "SCADA & Industrial Defense", desc: "Autonomous anomaly detection for proprietary operational technology (OT) networks." },
                    { title: "Critical Supply Chain AI", desc: "Identify counterfeit components and software supply chain vulnerabilities prior to deployment." },
                    { title: "Breach Isolation & Zero Trust", desc: "Automated network segmentation triggers upon anomalous insider credential usage." }
                  ].map((card, i) => (
                    <div key={i} className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{card.title}</h4>
                      <p className="text-slate-600 dark:text-stone-300 text-xs leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- Section 7: Conversion Banner & CTA --- */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-stone-950 border-t border-slate-200/80 dark:border-white/10">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-900 to-[#08152c] text-white rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl border border-blue-500/30">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Ready to Put <span className="text-orange-400">Cybravions AI</span> to Work Within Your Secure Organization?
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Schedule a confidential technical briefing or test an on-premises air-gapped evaluation appliance with our sovereign AI engineering team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <motion.button
                onClick={handleDemoClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all cursor-pointer"
              >
                REQUEST A DEMO
              </motion.button>

              <motion.button
                onClick={handleDemoClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm uppercase tracking-widest rounded-xl transition-all cursor-pointer"
              >
                TALK TO AN AI EXPERT
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
