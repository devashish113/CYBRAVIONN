import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Megaphone, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Search, 
  Globe, 
  Target, 
  ChevronDown,
  Layers,
  Award,
  Check,
  Copy,
  BarChart3,
  Sparkles,
  Users,
  Compass,
  LineChart
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../../utils/cyberAudio';
import { PageHeader } from '../../components/PageHeader';

interface DigitalMarketingServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const DigitalMarketingServicePage: React.FC<DigitalMarketingServiceProps> = ({
  setCurrentView,
  isDarkMode = true,
  onOpenConsultation
}) => {
  const [activeArea, setActiveArea] = useState<'seo' | 'content-pr' | 'cro-funnels' | 'b2b-abm'>('seo');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText('support@cybravions.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const marketingAreas = {
    seo: {
      title: 'Technical SEO & High-Intent Search Dominance',
      desc: 'B2B technology and cybersecurity procurement begins with high-intent search queries. We optimize your technical architecture, implement schema ontologies, and drive organic rankings for competitive enterprise keywords.',
      deliverables: [
        'Deep technical audit: Core Web Vitals, crawl budget optimization & headless rendering',
        'High-intent enterprise keyword clustering (commercial & transactional intent)',
        'Rich schema markup (JSON-LD Organization, Service, Product, TechArticle, FAQ)',
        'Competitor gap analysis and search visibility tracking across multi-regional and global enterprise markets',
        'Continuous backlink acquisition from high-DA technology, cyber, and enterprise publications'
      ]
    },
    'content-pr': {
      title: 'Thought Leadership, Threat Research PR & Narrative Engineering',
      desc: 'Security and technology buyers trust authoritative practitioners, not generic marketing copy. We produce technical whitepapers, vulnerability research advisories, and compelling C-level narratives that establish market authority.',
      deliverables: [
        'Ghostwritten executive op-eds and technical blog posts for engineering leadership',
        'Threat research dossiers, breach breakdowns, and industry vulnerability summaries',
        'Syndication and PR outreach across tier-1 technology and cybersecurity news outlets',
        'Interactive compliance checklists and downloadable technical guides',
        'Social amplification playbooks optimized for LinkedIn B2B algorithms'
      ]
    },
    'cro-funnels': {
      title: 'Conversion Rate Optimization (CRO) & Interactive Funnels',
      desc: 'High traffic without high conversion is wasted capital. We redesign B2B landing pages, build interactive ROI calculators, and engineer frictionless demo booking flows that convert visitors into qualified sales conversations.',
      deliverables: [
        'Heatmap tracking, user session recordings & drop-off friction point identification',
        'Interactive security readiness assessments and ROI calculator development',
        'A/B multivariate split testing for headline copy, CTAs, and layout hierarchies',
        'Micro-copy refinement and tactile button micro-interactions that build confidence',
        'CRM & marketing automation integration (HubSpot, Salesforce, Marketo)'
      ]
    },
    'b2b-abm': {
      title: 'Account-Based Marketing (ABM) & Precision Decision-Maker Campaigns',
      desc: 'Reach the exact enterprise stakeholders who approve tech and cybersecurity budgets. We build laser-targeted paid acquisition and ABM campaigns designed to engage CISOs, CTOs, and Heads of IT.',
      deliverables: [
        'Target Account List (TAL) enrichment and account-level intent data tracking',
        'Hyper-targeted LinkedIn Campaign management mapped to company size, industry & role',
        'Retargeting funnels delivering tailored case studies to in-market buyers',
        'Automated lead qualification scoring and real-time SDR Slack notifications',
        'Transparent multi-touch attribution reporting calculating pipeline contribution and CAC'
      ]
    }
  };

  const pillars = [
    {
      title: 'Technical Precision',
      desc: 'Every strategy is grounded in deep technical understanding of enterprise software and security buyers.',
      icon: Target
    },
    {
      title: 'High-Intent Positioning',
      desc: 'Zero generic vanity traffic; we capture procurement queries with high commercial transaction value.',
      icon: Search
    },
    {
      title: 'Interactive Funnels',
      desc: 'Modern web experiences, calculators, and assessments that demonstrate value before asking for a demo.',
      icon: TrendingUp
    },
    {
      title: 'Transparent Attribution',
      desc: 'Clear pipeline visibility from initial organic impression to closed enterprise contract.',
      icon: BarChart3
    }
  ];

  const faqs = [
    {
      q: 'Why choose CYBRAVION for cybersecurity and B2B tech digital marketing?',
      a: 'Generic marketing agencies fail in cybersecurity and deep-tech because they lack domain fluency. CYBRAVION combines genuine cyber engineering practitioners with growth marketing experts to craft technically accurate, deeply compelling campaigns that resonate with CISOs, CTOs, and IT directors.'
    },
    {
      q: 'How long does it typically take to see measurable results from Technical SEO?',
      a: 'Technical fixes (Core Web Vitals, indexation, schema) often yield crawl and ranking improvements within 3 to 6 weeks. High-difficulty commercial keyword rankings and sustainable organic pipeline velocity typically accelerate between months 3 and 6.'
    },
    {
      q: 'Do you create the content and design the landing pages as well?',
      a: 'Yes. We deliver end-to-end execution: writing technical whitepapers, building interactive ROI calculators, engineering custom high-converting web pages, and orchestrating full-funnel paid and organic distribution.'
    },
    {
      q: 'What analytics and attribution reporting do you provide?',
      a: 'We configure complete server-side tracking, Google Analytics 4, and CRM multi-touch attribution dashboards so leadership can track exact pipeline value, cost per qualified lead, and revenue influence.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Marketing & Growth Solutions for Tech & Cyber',
    serviceType: 'B2B Digital Marketing, Technical SEO & Brand Visibility',
    provider: {
      '@type': 'Corporation',
      name: 'CYBRAVION SOLUTIONS PRIVATE LIMITED',
      url: 'https://cybravions.com',
      telephone: '+91-7258880881',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'H. IN.KH.NO.293 S/F Western Marg, Saidulajab',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi',
        postalCode: '110030',
        addressCountry: 'IN'
      }
    },
    areaServed: [
      { '@type': 'Place', 'name': 'Worldwide' }
    ],
    description: 'Digital marketing and visibility solutions by CYBRAVION. Technical SEO, thought leadership PR, CRO funnels, and ABM campaigns for cybersecurity and B2B enterprises.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Solutions Portfolio',
      itemListElement: [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Technical SEO & Search Dominance' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Thought Leadership & Threat Research PR' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Conversion Rate Optimization (CRO)' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Account-Based Marketing (ABM)' } }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>Digital Marketing & B2B Visibility Solutions | CYBRAVION Solutions</title>
        <meta name="description" content="Digital marketing, technical SEO, thought leadership PR, and high-converting funnel solutions for B2B tech and cybersecurity enterprises." />
        <link rel="canonical" href="https://cybravions.com/services/digital-marketing" />
        <meta property="og:title" content="Digital Marketing & B2B Visibility Solutions | CYBRAVION Solutions" />
        <meta property="og:description" content="Digital marketing and visibility solutions to enhance brand presence, reach target audiences, and generate measurable pipeline." />
        <meta property="og:url" content="https://cybravions.com/services/digital-marketing" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Subtle Background Architectural Vignette */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)' }}
      />

      <PageHeader
        kicker="Digital Presence, Visibility & Promotion"
        title="Enterprise Digital Marketing Solutions"
        italicTitle="Engineered for Measurable Pipeline."
        description="Comprehensive digital marketing and visibility solutions tailored for tech and cybersecurity leaders. Enhance brand authority, dominate high-intent organic search, engage executive buyers, and convert traffic into qualified enterprise pipeline."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Services', onClick: () => setCurrentView?.('home') },
          { label: 'Digital Marketing', active: true }
        ]}
        actions={
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onOpenConsultation?.();
              }}
              className="btn-tactile-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Schedule Growth Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#marketing-areas"
              className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25 transition-all text-slate-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
            >
              Explore Growth Services
            </a>
          </div>
        }
      />

      {/* Metrics Ribbon */}
      <section className="relative z-10 py-12 px-6 border-y border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">3.8x</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Average Pipeline Multiplier</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">Top 3</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Search Intent Dominance</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">100%</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Technical Domain Accuracy</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">Full-Funnel</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">End-to-End Attribution</div>
          </div>
        </div>
      </section>

      {/* Strategic Growth Pillars */}
      <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold tracking-tight">Data-Driven Growth Architecture</h2>
          <p className="text-sm text-slate-600 dark:text-stone-400 mt-2 max-w-xl mx-auto">
            Combining engineering rigor with creative execution to capture enterprise attention and convert it into contract value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-neutral-900 dark:text-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Marketing Focus Areas */}
      <section id="marketing-areas" className="relative z-10 py-16 px-6 bg-slate-50/60 dark:bg-white/[0.01] border-y border-slate-200/80 dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 dark:border-blue-400/30 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-blue-600 dark:text-blue-400 font-mono text-[11px] font-bold uppercase tracking-[0.22em]">
              <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
              Growth &amp; Expansion
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Structured{' '}
              <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-orange-500 dark:from-sky-400 dark:via-blue-400 dark:to-orange-400 bg-clip-text text-transparent">
                Growth Disciplines
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 mt-2 max-w-xl mx-auto">
              Select an area below to explore execution methodologies, deliverables, and performance KPIs.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {(
              [
                { id: 'seo', label: 'Technical SEO' },
                { id: 'content-pr', label: 'Thought Leadership & PR' },
                { id: 'cro-funnels', label: 'CRO & Interactive Funnels' },
                { id: 'b2b-abm', label: 'Account-Based Marketing (ABM)' }
              ] as const
            ).map((tab) => {
              const isActive = activeArea === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    cyberAudio.playClick();
                    setActiveArea(tab.id);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/30'
                      : 'bg-white dark:bg-white/[0.04] text-slate-600 dark:text-stone-400 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/60 dark:border-white/[0.06]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#0b1222]/90 border border-slate-200/90 dark:border-blue-500/20 backdrop-blur-xl shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
              {marketingAreas[activeArea].title}
            </h3>
            <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed mb-6">
              {marketingAreas[activeArea].desc}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold mb-3">
                Key Deliverables & Capabilities:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {marketingAreas[activeArea].deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 dark:text-stone-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
              <div className="text-xs text-slate-500 dark:text-stone-400">
                Want a personalized competitor visibility and keyword gap audit?
              </div>
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenConsultation?.();
                }}
                className="btn-tactile-primary px-6 py-2.5 rounded-full text-xs font-semibold text-white cursor-pointer"
              >
                Request Free Growth Audit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 mt-2">
            Answers regarding B2B pipeline growth, technical content production, and analytics attribution.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playClick();
                    setOpenFaq(isOpen ? null : idx);
                  }}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed border-t border-slate-200/50 dark:border-white/5 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative z-10 py-16 px-6 max-w-5xl mx-auto mb-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mb-4">
            Accelerate Growth with Technical Authority.
          </h2>
          <p className="text-neutral-400 dark:text-neutral-600 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Partner with CYBRAVION to dominate high-intent search, produce high-impact thought leadership, and scale qualified B2B pipeline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onOpenConsultation?.();
              }}
              className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-200 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-800 transition-all cursor-pointer shadow-lg"
            >
              Consult a Growth Strategist
            </button>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-6 py-3.5 rounded-full text-xs font-mono font-semibold border border-white/20 dark:border-black/20 hover:border-white/40 dark:hover:border-black/40 transition-all cursor-pointer flex items-center gap-2"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied support@cybravions.com' : 'support@cybravions.com'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
