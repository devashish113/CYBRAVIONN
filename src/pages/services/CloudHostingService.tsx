import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  ArrowRight, 
  CheckCircle2, 
  Server, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Globe, 
  ChevronDown,
  Layers,
  Award,
  Check,
  Copy,
  Cpu,
  RefreshCw,
  HardDrive,
  Database,
  GitBranch,
  TrendingDown,
  Activity,
  Boxes,
  FileCode,
  DollarSign,
  BarChart3,
  Terminal,
  Settings,
  Scale
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../../utils/cyberAudio';
import { PageHeader } from '../../components/PageHeader';

interface CloudHostingServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const CloudHostingServicePage: React.FC<CloudHostingServiceProps> = ({
  setCurrentView,
  isDarkMode = true,
  onOpenConsultation
}) => {
  const [activeTier, setActiveTier] = useState<'saas-cluster' | 'web-portal' | 'regulated-enclave'>('saas-cluster');
  const [activeCloudProvider, setActiveCloudProvider] = useState<'aws' | 'azure' | 'multicloud'>('aws');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText('support@cybravions.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const cloudEcosystems = {
    aws: {
      provider: 'Amazon Web Services (AWS)',
      badge: 'AWS Advanced Architecture',
      tagline: 'Enterprise-grade AWS infrastructure engineered with Infrastructure-as-Code and Well-Architected Framework principles.',
      services: [
        { name: 'Amazon EKS & ECS', desc: 'Managed Kubernetes and high-density container clusters with Karpenter auto-scaling.' },
        { name: 'AWS Lambda & Fargate', desc: 'Serverless event-driven compute with sub-millisecond cold starts and VPC peering.' },
        { name: 'Amazon RDS Multi-AZ & Aurora', desc: 'Global database clusters with automated read-replicas, failover, and point-in-time recovery.' },
        { name: 'AWS CloudFront & Route 53', desc: 'Low-latency global edge delivery with DNS geo-routing and automated health-checking.' },
        { name: 'AWS WAF & Shield Advanced', desc: 'Layer 7 application shielding, rate-limiting, and multi-terabit volumetric DDoS mitigation.' },
        { name: 'AWS KMS & Secrets Manager', desc: 'FIPS 140-2 Level 3 hardware security encryption with automated secret rotation.' }
      ],
      finopsAdvantage: 'Right-sizing EC2/RDS instances with Compute Savings Plans and automated Spot instance orchestration to trim up to 42% in AWS compute costs.'
    },
    azure: {
      provider: 'Microsoft Azure Services',
      badge: 'Azure Enterprise Infrastructure',
      tagline: 'Mission-critical Microsoft Azure architectures built for seamless hybrid integration, Active Directory SSO, and compliance.',
      services: [
        { name: 'Azure Kubernetes Service (AKS)', desc: 'Enterprise-hardened Kubernetes with Azure CNI, Pod Sandboxing, and node pool autoscaling.' },
        { name: 'Azure Container Apps & App Service', desc: 'Microservices platforms powered by KEDA event-driven scaling and integrated Dapr runtimes.' },
        { name: 'Azure Cosmos DB & Azure SQL', desc: 'Turnkey geo-replicated databases with 99.999% availability SLAs and single-digit millisecond latency.' },
        { name: 'Azure Front Door & Application Gateway', desc: 'Global web balancing, Anycast routing, SSL offloading, and OWASP rule-enforced WAF.' },
        { name: 'Azure Key Vault & Entra ID', desc: 'Centralized cryptographically backed secret governance with Zero-Trust RBAC access policies.' },
        { name: 'Azure Arc & Hybrid Enclaves', desc: 'Unified control plane extending Azure management to on-premises and sovereign data center clusters.' }
      ],
      finopsAdvantage: 'Azure Hybrid Benefit license portability paired with Reserved Capacity and automated orphaned disk/snapshot garbage collection for up to 45% bill reduction.'
    },
    multicloud: {
      provider: 'Multi-Cloud & Hybrid Cloud Mesh',
      badge: 'Cloud-Agnostic Resilience',
      tagline: 'True vendor-neutral cloud infrastructure preventing vendor lock-in with synchronized failover and distributed service mesh.',
      services: [
        { name: 'Terraform & OpenTofu GitOps', desc: 'Modular, version-controlled Infrastructure-as-Code enabling reproducible multi-cloud environments in minutes.' },
        { name: 'Istio & Cilium Service Mesh', desc: 'Cross-cloud zero-trust network encryption with mTLS, dynamic traffic splitting, and eBPF observability.' },
        { name: 'Multi-Cloud Database Replication', desc: 'Active-Active cross-region database synchronization with conflict-free replication topologies.' },
        { name: 'ArgoCD & Flux GitOps Pipelines', desc: 'Declarative continuous delivery synchronizing Kubernetes cluster states directly from secure Git repositories.' },
        { name: 'Prometheus, Grafana & OpenTelemetry', desc: 'Full-stack distributed tracing and synthetic user journey monitoring across every cloud provider.' },
        { name: 'Zero-Egress Multi-Cloud Peering', desc: 'Optimized direct interconnects and cloud routing fabrics minimizing inter-provider egress fees.' }
      ],
      finopsAdvantage: 'Dynamic workload arbitration directing non-critical batch processing to the lowest-cost compute provider in real-time.'
    }
  };

  const deploymentStrategies = [
    {
      title: 'Blue-Green Deployments',
      badge: 'Zero Downtime',
      desc: 'Maintain two identical production environments (Blue and Green). Traffic routes instantly via load balancer once the new release completes automated smoke tests, with instantaneous 1-click rollback capability.',
      icon: RefreshCw
    },
    {
      title: 'Canary Releases',
      badge: 'Progressive Delivery',
      desc: 'Incrementally shift live production traffic (5% ➔ 25% ➔ 50% ➔ 100%) to the new version. Real-time metric analysis halts and rolls back the deployment if error rates or p99 latencies exceed baseline thresholds.',
      icon: Activity
    },
    {
      title: 'Rolling Zero-Downtime Updates',
      badge: 'Connection-Draining',
      desc: 'Pod-by-pod updates with Kubernetes readiness probes and graceful connection draining, ensuring active user sessions are never severed or aborted during releases.',
      icon: Layers
    },
    {
      title: 'Zero-Downtime DB Migrations',
      badge: 'Expand-Contract Pattern',
      desc: 'Database schema evolutions executed in phased forward-compatible stages (Expand, Migrate, Contract), eliminating lock contention and application read/write outages.',
      icon: Database
    }
  ];

  const hostingTiers = {
    'saas-cluster': {
      title: 'Enterprise Multi-Cloud SaaS Cluster Architecture',
      desc: 'Scalable, fault-tolerant infrastructure tailored for high-growth enterprise SaaS platforms. Powered by auto-scaling Kubernetes worker nodes, isolated database clusters, and zero-trust VPC segmentation across AWS or Azure.',
      specs: [
        '99.99% SLA Uptime with multi-AZ automated failover and self-healing pods',
        'Managed Kubernetes orchestration (AWS EKS / Azure AKS) with Horizontal Pod Autoscaler (HPA)',
        'ArgoCD GitOps deployment pipelines with automated pre-flight security gating',
        'Dedicated high-IOPS PostgreSQL / MySQL clusters with automated read-replicas',
        'Redis Enterprise caching layer for sub-5ms session and token lookups',
        'Automated CI/CD security gating (Trivy image scan, secret detection, SAST/DAST)'
      ]
    },
    'web-portal': {
      title: 'High-Availability Corporate Web & Portal Architecture',
      desc: 'Blazing-fast, unbreachable deployment for high-traffic customer portals, transactional web platforms, and public digital applications. Backed by global edge CDN caching and multi-layer DDoS shielding.',
      specs: [
        'Global edge CDN (CloudFront / Azure Front Door) with sub-30ms delivery across 300+ edge PoPs',
        'Enterprise Web Application Firewall (WAF) blocking OWASP Top 10 exploits & credential stuffing',
        'Automated SSL/TLS certificate lifecycle management & HTTP/3 protocol support',
        'Origin-shield caching preventing backend saturation during traffic surges',
        'Real-time behavioral bot detection and automated rate-limiting algorithms',
        'Automated static fallback pages served instantaneously during origin health checks'
      ]
    },
    'regulated-enclave': {
      title: 'Regulated Sovereign Enclave & FinOps Managed Cloud',
      desc: 'Dedicated private cloud infrastructure designed specifically to satisfy strict regulatory compliance under DPDP Act 2023, ISO 27001, and SOC 2 directives, coupled with continuous FinOps cloud cost optimization.',
      specs: [
        'Strict sovereign data residency within certified enterprise Tier-3/4 data facilities',
        'Hardware Security Module (HSM) dedicated KMS key management (BYOK / HYOK)',
        'Continuous FinOps monitoring eliminating orphaned resources and enforcing budget guardrails',
        'Cryptographically enforced air-gapped backups with immutable WORM storage',
        'Mandatory forensic log archiving with 365-day retention aligned with statutory directives',
        'Quarterly automated DR drills ensuring sub-15 minute RPO and sub-1 hour RTO'
      ]
    }
  };

  const pillars = [
    {
      title: 'Multi-Cloud Architecture',
      desc: 'Engineered across AWS, Microsoft Azure, and private cloud enclaves with cloud-agnostic Terraform IaC.',
      icon: Cloud
    },
    {
      title: 'Zero-Downtime Releases',
      desc: 'Blue-Green deployments, canary rollouts, and graceful connection draining guarantee zero service disruption.',
      icon: Zap
    },
    {
      title: 'DevSecOps & GitOps',
      desc: 'Automated CI/CD pipelines with image vulnerability scanning, secret detection, and ArgoCD synchronization.',
      icon: GitBranch
    },
    {
      title: 'FinOps Cost Governance',
      desc: 'Continuous cloud waste elimination, right-sizing, and Savings Plans delivering 30% to 45% bill reductions.',
      icon: DollarSign
    },
    {
      title: 'Elastic Auto-Scaling',
      desc: 'Dynamic Horizontal Pod Autoscaling (HPA) and cluster node provisioning adjusting instantaneously to traffic spikes.',
      icon: Boxes
    },
    {
      title: 'Zero-Trust Cloud Mesh',
      desc: 'Default-deny network policies, mTLS encryption between microservices, and IAM least-privilege enforcement.',
      icon: Lock
    },
    {
      title: 'SRE & Full-Stack Telemetry',
      desc: 'Distributed tracing via OpenTelemetry, Prometheus, and Grafana with proactive latency and error alerting.',
      icon: Activity
    },
    {
      title: 'Disaster Recovery (DR)',
      desc: 'Continuous incremental backups, cross-region replication, sub-15 min RPO, and verified one-click recovery.',
      icon: RefreshCw
    }
  ];

  const faqs = [
    {
      q: 'How does CYBRAVION achieve zero-downtime deployments for enterprise applications?',
      a: 'We implement Blue-Green deployments and Canary rollouts using modern container orchestration (Kubernetes EKS/AKS) and service mesh routing. New application versions are thoroughly smoke-tested in an isolated environment before production ingress traffic is shifted progressively. If any anomaly or latency spike is detected, automated health gates trigger an instant rollback in milliseconds without user disruption.'
    },
    {
      q: 'Do you support multi-cloud deployments across both AWS and Microsoft Azure?',
      a: 'Yes. Our cloud architects design vendor-neutral infrastructure utilizing Terraform / OpenTofu and Kubernetes. This enables applications to run seamlessly on AWS, Microsoft Azure, or a hybrid configuration, preventing vendor lock-in and allowing workloads to be placed where they achieve optimal latency, regulatory compliance, and cost efficiency.'
    },
    {
      q: 'What is FinOps, and how do you reduce our cloud computing bill?',
      a: 'FinOps is cloud financial management that aligns engineering with business unit costs. We perform comprehensive audits to identify idle resources, unattached storage volumes, and over-provisioned instance types. By implementing automated right-sizing, Compute Savings Plans, Spot instance orchestration, and storage lifecycle tiering, we consistently reduce clients’ monthly cloud expenditures by 30% to 45%.'
    },
    {
      q: 'How do you handle zero-downtime database migrations?',
      a: 'We utilize the "Expand and Contract" migration pattern. First, the database schema is expanded with backward-compatible additive changes. The application is updated to read and write to both schemas, existing data is backfilled asynchronously, and finally the deprecated columns are safely decommissioned. At no point is the database locked or taken offline.'
    },
    {
      q: 'What are your Backup, Recovery Point Objective (RPO), and Recovery Time Objective (RTO) standards?',
      a: 'We establish automated hourly differential snapshots and continuous transaction log shipping to geographically segregated, immutable WORM (Write Once, Read Many) storage. Our standard enterprise deployment SLA guarantees a Recovery Point Objective (RPO) of under 15 minutes and a Recovery Time Objective (RTO) of under 1 hour.'
    },
    {
      q: 'Can CYBRAVION migrate our existing legacy infrastructure to modern cloud containers?',
      a: 'Yes. We provide turnkey cloud modernization services. Our architects perform pre-migration dependency mapping, containerize applications with Docker, construct Infrastructure-as-Code definitions, and execute live database cutovers with zero customer impact.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Enterprise Cloud Deployment, Multi-Cloud & FinOps Solutions',
    serviceType: 'Cloud Deployment, Multi-Cloud Architecture, DevOps, FinOps & Zero-Downtime Infrastructure',
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
    description: 'Enterprise Cloud Deployment by CYBRAVION. Multi-cloud AWS & Azure architecture, Kubernetes auto-scaling, zero-downtime CI/CD deployments, and FinOps cost optimization.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cloud Deployment & DevOps Portfolio',
      itemListElement: [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'AWS Enterprise Architecture & EKS Deployment' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Microsoft Azure Cloud Deployment & AKS' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'DevOps & Zero-Downtime CI/CD Pipelines' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'FinOps Cloud Cost Optimization' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Regulated Sovereign Enclave Hosting' } }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>Enterprise Cloud Deployment & Scalable Infrastructure | CYBRAVION Solutions</title>
        <meta name="description" content="Turnkey multi-cloud deployment, AWS & Azure infrastructure, zero-downtime CI/CD pipelines, Kubernetes auto-scaling, and FinOps cloud cost optimization by CYBRAVION." />
        <link rel="canonical" href="https://cybravions.com/services/cloud-hosting" />
        <meta property="og:title" content="Enterprise Cloud Deployment & Scalable Infrastructure | CYBRAVION Solutions" />
        <meta property="og:description" content="Multi-cloud AWS & Azure deployment, Kubernetes auto-scaling, zero-downtime Blue-Green releases, and FinOps cost reduction." />
        <meta property="og:url" content="https://cybravions.com/services/cloud-hosting" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Background Architectural Vignette */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 70%)' }}
      />

      <PageHeader
        kicker="Multi-Cloud Engineering · DevSecOps · FinOps Governance"
        title="Enterprise Cloud Deployment Solutions"
        italicTitle="Engineered for Zero Downtime."
        description="Turnkey multi-cloud deployment, Kubernetes orchestration, and automated CI/CD pipelines across AWS, Azure, and private enclaves. We engineer resilient, scalable, and FinOps-optimized cloud architectures guaranteed for continuous zero downtime."
        isDarkMode={isDarkMode}
        breadcrumbs={[
          { label: 'Home', onClick: () => setCurrentView?.('home') },
          { label: 'Services', onClick: () => setCurrentView?.('home') },
          { label: 'Cloud Deployment', active: true }
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
              <span>Request Cloud Architecture Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#cloud-providers"
              className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25 transition-all text-slate-700 dark:text-stone-300 hover:text-black dark:hover:text-white"
            >
              Explore Cloud Ecosystems
            </a>
          </div>
        }
      />

      {/* Metrics Ribbon */}
      <section className="relative z-10 py-12 px-6 border-y border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">99.99%</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Uptime Guarantee SLA</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">Zero</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Downtime Deployments</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">AWS &amp; Azure</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Multi-Cloud Ecosystems</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono">30%–45%</div>
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-stone-400 mt-1 font-medium">Avg. FinOps Cost Savings</div>
          </div>
        </div>
      </section>

      {/* Interactive Cloud Provider Matrix: AWS vs Azure vs Multi-Cloud */}
      <section id="cloud-providers" className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-4">
            <Cloud className="w-3.5 h-3.5" />
            <span>CLOUD PROVIDER SPECIALIZATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Full-Stack Cloud Provider Capabilities</h2>
          <p className="text-sm text-slate-600 dark:text-stone-400 mt-2 max-w-2xl mx-auto">
            Whether deploying purely on AWS, scaling inside Microsoft Azure, or architecting a resilient multi-cloud mesh, we deliver turnkey infrastructure excellence.
          </p>
        </div>

        {/* Provider Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(
            [
              { id: 'aws', label: 'Amazon Web Services (AWS)', icon: Server },
              { id: 'azure', label: 'Microsoft Azure Cloud', icon: Cloud },
              { id: 'multicloud', label: 'Multi-Cloud & Hybrid Mesh', icon: Boxes }
            ] as const
          ).map((tab) => {
            const isActive = activeCloudProvider === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setActiveCloudProvider(tab.id);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md'
                    : 'bg-white dark:bg-white/[0.04] text-slate-600 dark:text-stone-400 hover:text-black dark:hover:text-white border border-slate-200/60 dark:border-white/[0.06]'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Provider Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c0d12] border border-slate-200 dark:border-white/10 shadow-xl max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400">
                {cloudEcosystems[activeCloudProvider].badge}
              </span>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                {cloudEcosystems[activeCloudProvider].provider}
              </h3>
            </div>
            <div className="text-xs text-slate-500 dark:text-stone-400 max-w-md">
              {cloudEcosystems[activeCloudProvider].tagline}
            </div>
          </div>

          {/* Service Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
            {cloudEcosystems[activeCloudProvider].services.map((srv, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-white/[0.06] flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 font-bold text-sm text-neutral-900 dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span>{srv.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FinOps Callout Ribbon inside Provider Card */}
          <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-0.5">
                FinOps Cloud Cost Optimization Strategy
              </div>
              <p className="text-xs text-slate-700 dark:text-stone-300 leading-relaxed">
                {cloudEcosystems[activeCloudProvider].finopsAdvantage}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zero-Downtime Deployment Strategies Section */}
      <section className="relative z-10 py-16 px-6 bg-slate-50/60 dark:bg-white/[0.01] border-y border-slate-200/80 dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>HIGH-FREQUENCY CONTINUOUS DELIVERY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Zero-Downtime Deployment Engineering</h2>
            <p className="text-sm text-slate-600 dark:text-stone-400 mt-2 max-w-2xl mx-auto">
              Never schedule a maintenance outage again. We implement advanced deployment topologies ensuring active customer transactions, websocket connections, and API calls persist uninterrupted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deploymentStrategies.map((strat, idx) => {
              const StratIcon = strat.icon;
              return (
                <div 
                  key={idx}
                  className="p-7 rounded-3xl bg-white dark:bg-[#0e111a] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-neutral-900 dark:text-white flex items-center justify-center">
                        <StratIcon className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-stone-300 border border-slate-200/60 dark:border-white/[0.08]">
                        {strat.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2.5">
                      {strat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 leading-relaxed">
                      {strat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold tracking-tight">Core Architectural Pillars</h2>
          <p className="text-sm text-slate-600 dark:text-stone-400 mt-2 max-w-xl mx-auto">
            Engineered with defense-in-depth principles, immutable infrastructure patterns, and automated FinOps budget controls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-neutral-900 dark:text-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Deployment Environments / Tiers */}
      <section id="architectures" className="relative z-10 py-16 px-6 bg-slate-50/60 dark:bg-white/[0.01] border-y border-slate-200/80 dark:border-white/[0.08]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Turnkey Deployment Packages</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 mt-2 max-w-xl mx-auto">
              Select an environment tier to inspect container topologies, automated CI/CD gating, and cloud compliance specifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {(
              [
                { id: 'saas-cluster', label: 'Enterprise Multi-Cloud SaaS' },
                { id: 'web-portal', label: 'High-Traffic Web & API Portal' },
                { id: 'regulated-enclave', label: 'Sovereign Enclave & FinOps' }
              ] as const
            ).map((tab) => {
              const isActive = activeTier === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    cyberAudio.playClick();
                    setActiveTier(tab.id);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md'
                      : 'bg-white dark:bg-white/[0.04] text-slate-600 dark:text-stone-400 hover:text-black dark:hover:text-white border border-slate-200/60 dark:border-white/[0.06]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c0d12] border border-slate-200 dark:border-white/10 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">
              {hostingTiers[activeTier].title}
            </h3>
            <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed mb-6">
              {hostingTiers[activeTier].desc}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold mb-3">
                Included Infrastructure &amp; DevOps Specifications:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hostingTiers[activeTier].specs.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 dark:text-stone-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
              <div className="text-xs text-slate-500 dark:text-stone-400">
                Need a tailored AWS / Azure multi-region deployment plan?
              </div>
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenConsultation?.();
                }}
                className="btn-tactile-primary px-6 py-2.5 rounded-full text-xs font-semibold text-white cursor-pointer"
              >
                Schedule Architecture Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DevOps & FinOps 4-Step Deployment Lifecycle */}
      <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold tracking-tight">Our 4-Phase Cloud Deployment Lifecycle</h2>
          <p className="text-sm text-slate-600 dark:text-stone-400 mt-2 max-w-xl mx-auto">
            From initial cloud architecture assessment to automated zero-downtime cutover and continuous FinOps optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Assessment & FinOps Audit',
              desc: 'Deep audit of existing infrastructure, resource bottlenecks, security gaps, and monthly cloud spend to establish baseline KPIs.'
            },
            {
              step: '02',
              title: 'Terraform IaC & Containerization',
              desc: 'Authoring modular Infrastructure-as-Code, containerizing microservices with Docker, and setting up multi-AZ VPC topologies.'
            },
            {
              step: '03',
              title: 'CI/CD & GitOps Integration',
              desc: 'Building automated GitHub Actions/GitLab CI pipelines, image vulnerability scanners, and ArgoCD zero-downtime rollout triggers.'
            },
            {
              step: '04',
              title: 'Production Cutover & SRE Governance',
              desc: 'Zero-downtime DNS cutover, database synchronization, synthetic uptime monitoring, and continuous FinOps cost tracking.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 relative">
              <div className="text-2xl font-mono font-extrabold text-cyan-600 dark:text-cyan-400 mb-2">
                {item.step}
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="relative z-10 py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 mt-2">
            Details regarding multi-cloud deployment, zero-downtime cutover, and FinOps savings.
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
            Build on Multi-Cloud Infrastructure. Eliminate Downtime.
          </h2>
          <p className="text-neutral-400 dark:text-neutral-600 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Partner with CYBRAVION cloud architects to engineer enterprise-grade AWS, Azure, and multi-cloud Kubernetes deployments with automated CI/CD and proven FinOps cost governance.
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
              Consult a Cloud Architect &amp; Scope Project
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

export default CloudHostingServicePage;
