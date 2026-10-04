import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cloud, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Layers, 
  GitBranch, 
  Terminal, 
  Server, 
  ChevronDown,
  Sparkles,
  AlertTriangle,
  Database
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cyberAudio } from '../../utils/cyberAudio';

interface CloudSecurityServiceProps {
  setCurrentView?: (view: string) => void;
  isDarkMode?: boolean;
  onOpenConsultation?: () => void;
}

export const CloudSecurityServicePage: React.FC<CloudSecurityServiceProps> = ({
  setCurrentView,
  onOpenConsultation
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCloud, setActiveCloud] = useState<'aws' | 'azure' | 'gcp' | 'k8s'>('aws');

  const cloudPillars = [
    {
      title: 'Cloud Security Posture Management (CSPM)',
      desc: 'Continuous scanning and automated misconfiguration detection across AWS, Azure, and GCP. Auditing S3 bucket permissions, unencrypted storage volumes, open security groups, and configuration drift against CIS Benchmarks.',
      icon: Cloud
    },
    {
      title: 'CIEM & IAM Least Privilege Hardening',
      desc: 'Eliminating excessive privileges, dormant admin credentials, and toxic permission combinations across cloud IAM roles, service principals, and cross-account trust relationships.',
      icon: Lock
    },
    {
      title: 'Kubernetes & Container Security',
      desc: 'Hardening Amazon EKS, Azure AKS, Google GKE, and self-hosted Kubernetes clusters against CIS benchmarks. Implementing Pod Security Standards, namespace isolation, and runtime eBPF monitoring.',
      icon: Cpu
    },
    {
      title: 'DevSecOps & Shift-Left CI/CD Gating',
      desc: 'Embedding automated security gates directly into GitHub Actions, GitLab CI, and Jenkins pipelines. Pre-commit secret scanning, Infrastructure-as-Code (Terraform/OpenTofu) linting, and container image vulnerability gating.',
      icon: GitBranch
    }
  ];

  const cloudDetails = {
    aws: {
      name: 'Amazon Web Services (AWS)',
      badge: 'AWS Certified Security Specialists',
      items: [
        'AWS Organizations, Control Tower & multi-account security baseline auditing',
        'IAM least privilege & cross-account role assumption chain analysis',
        'S3 bucket access policies, KMS envelope encryption & CloudTrail tamper checks',
        'VPC peering, security group egress rule auditing & AWS WAF rule tuning',
        'AWS GuardDuty, Security Hub & Config compliance remediation'
      ]
    },
    azure: {
      name: 'Microsoft Azure',
      badge: 'Azure Security Architect Aligned',
      items: [
        'Microsoft Entra ID (formerly Azure AD) Conditional Access & PIM review',
        'Azure Subscription governance, Management Groups & Azure Policy enforcement',
        'Storage Account SAS token risks, Key Vault access policies & NSG auditing',
        'Microsoft Defender for Cloud benchmark configuration & score optimization',
        'Azure Virtual WAN, Application Gateway & Private Link architecture reviews'
      ]
    },
    gcp: {
      name: 'Google Cloud Platform (GCP)',
      badge: 'GCP Security Engineers',
      items: [
        'GCP Organization resource hierarchy, folder structure & IAM policy audits',
        'Service Account key security, impersonation risks & Workload Identity setup',
        'Cloud Storage bucket public access prevention & VPC Service Controls (VPC-SC)',
        'Google Kubernetes Engine (GKE) private cluster hardening & binary authorization',
        'Security Command Center (SCC) configuration & automated alerting'
      ]
    },
    k8s: {
      name: 'Kubernetes & Cloud-Native Runtime',
      badge: 'CIS Kubernetes Aligned',
      items: [
        'K8s API server, etcd encryption & kubelet CIS benchmark hardening',
        'Role-Based Access Control (RBAC) audit & cluster-admin privilege containment',
        'NetworkPolicy enforcement to prevent lateral pod-to-pod east-west movement',
        'Admission controller enforcement (OPA Gatekeeper / Kyverno)',
        'Container image vulnerability scanning & runtime eBPF anomaly detection'
      ]
    }
  };

  const faqs = [
    {
      q: 'How does CYBRAVION perform a Cloud Security Assessment without disrupting live production traffic?',
      a: 'We perform cloud assessments using read-only IAM audit roles with strictly scoped permissions. Our engineers review configuration APIs, architecture diagrams, and Infrastructure-as-Code (IaC) definitions. Penetration tests against active endpoints are performed according to strict Rules of Engagement during pre-agreed windows with zero customer downtime.'
    },
    {
      q: 'Can you help us achieve compliance with CIS Benchmarks on AWS, Azure, or GCP?',
      a: 'Yes. We benchmark your cloud posture against the CIS Foundations Benchmark (Level 1 & Level 2), NIST SP 800-53, ISO 27001 Annex A, and PCI-DSS requirements. We provide step-by-step remediation scripts and Terraform/CloudFormation code fixes.'
    },
    {
      q: 'How do you integrate security checks into our existing CI/CD pipelines (DevSecOps)?',
      a: 'We implement automated shift-left security tooling into GitHub Actions, GitLab CI, Bitbucket Pipelines, and Jenkins. This includes static code analysis (SAST), dependency scanning (SCA), Infrastructure-as-Code validation (Checkov/tfsec), secret detection (TruffleHog), and container image scanning before deployment.'
    },
    {
      q: 'What deliverables are included in a Cloud Security Architecture Review?',
      a: 'You receive an Executive Cloud Risk Dashboard, a prioritized Threat Remediation Matrix with CVSS scoring, Terraform/IaC hardening code snippets, IAM policy least-privilege JSON templates, and an official Cloud Security Verification Certificate.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cloud Security Assessment & DevSecOps Engineering Services',
    serviceType: 'Cloud Infrastructure & Kubernetes Security Audit',
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
    areaServed: 'Worldwide',
    description: 'Enterprise multi-cloud security assessment for AWS, Azure, GCP, and Kubernetes in India. IAM least privilege auditing, CSPM, and automated DevSecOps CI/CD pipeline gating.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cloud Security Practice Offerings',
      itemListElement: [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'AWS Security Posture Assessment' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Azure Cloud Security Review' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Kubernetes CIS Hardening' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'DevSecOps CI/CD Pipeline Implementation' } }
      ]
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-transparent text-slate-900 dark:text-stone-100 relative">
      <Helmet>
        <title>Cloud Security Assessment &amp; DevSecOps Engineering | CYBRAVION Solutions</title>
        <meta name="description" content="Enterprise cloud security audits for AWS, Azure, GCP, and Kubernetes in India. IAM privilege hardening, CSPM, CIS benchmarks, and automated DevSecOps CI/CD pipeline security." />
        <link rel="canonical" href="https://cybravions.com/cloud-security" />
        <meta property="og:title" content="Cloud Security Assessment &amp; DevSecOps Engineering | CYBRAVION" />
        <meta property="og:description" content="Harden your AWS, Azure, and Kubernetes workloads. Multi-cloud security assessments, IAM least privilege audits, and automated DevSecOps integration from New Delhi." />
        <meta property="og:url" content="https://cybravions.com/cloud-security" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500 dark:text-stone-400">
          <ol className="flex items-center space-x-2">
            <li>
              <button 
                type="button" 
                onClick={() => setCurrentView?.('home')} 
                className="hover:text-cyan-500 transition-colors"
              >
                Home
              </button>
            </li>
            <li>/</li>
            <li>Services</li>
            <li>/</li>
            <li className="text-cyan-600 dark:text-cyan-400 font-medium">Cloud Security &amp; DevSecOps</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mb-20 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <Cloud className="w-4 h-4" />
            <span>Multi-Cloud Architecture &amp; DevSecOps Hardening</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Enterprise <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-orange-500 bg-clip-text text-transparent">Cloud Security Assessment</span> &amp; DevSecOps
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-stone-300 max-w-3xl leading-relaxed mb-8">
            Stop cloud data breaches, privilege escalations, and configuration drift across AWS, Microsoft Azure, Google Cloud Platform, and Kubernetes. CYBRAVION audits your infrastructure against CIS Benchmarks and embeds automated security gates directly into your developer workflows.
          </p>

          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onOpenConsultation?.();
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Schedule Free Cloud Security Review</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#platforms"
              className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-stone-900/80 border border-slate-300 dark:border-stone-800 text-slate-800 dark:text-stone-200 font-semibold hover:bg-slate-200 dark:hover:bg-stone-800 transition-colors"
            >
              Supported Cloud Platforms
            </a>
          </div>
        </header>

        {/* 4 Pillars of Cloud Security */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400 font-bold block mb-2">
              Holistic Defense
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              The 4 Pillars of Modern Cloud Security
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cloudPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl bg-white dark:bg-stone-900/70 border border-slate-200 dark:border-stone-800 hover:border-cyan-500/50 transition-all shadow-sm"
                >
                  <div className="p-3 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 w-fit rounded-2xl mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 dark:text-stone-300 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cloud Platforms Breakdown */}
        <section id="platforms" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Multi-Cloud Assessment Coverage
            </h2>
            <p className="text-slate-600 dark:text-stone-400 max-w-2xl mx-auto">
              Select your primary cloud provider or container runtime to inspect our specialized architecture audit checklist:
            </p>
          </div>

          {/* Cloud Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {(['aws', 'azure', 'gcp', 'k8s'] as const).map(cloud => (
              <button
                key={cloud}
                type="button"
                onClick={() => {
                  cyberAudio.playHover();
                  setActiveCloud(cloud);
                }}
                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase transition-all ${
                  activeCloud === cloud
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white dark:bg-stone-900 text-slate-700 dark:text-stone-300 border border-slate-200 dark:border-stone-800 hover:bg-slate-100 dark:hover:bg-stone-800'
                }`}
              >
                {cloudDetails[cloud].name}
              </button>
            ))}
          </div>

          {/* Detail Box */}
          <div className="p-8 md:p-12 rounded-3xl bg-white dark:bg-stone-900/80 border border-slate-200 dark:border-stone-800 shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-stone-800 mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {cloudDetails[activeCloud].name} Security Audit Scope
              </h3>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                {cloudDetails[activeCloud].badge}
              </span>
            </div>

            <ul className="space-y-4 mb-8">
              {cloudDetails[activeCloud].items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-stone-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-stone-800">
              <span className="text-xs text-slate-500 dark:text-stone-400">
                Assessments performed with read-only audit roles under mutual NDA. Zero production downtime guarantee.
              </span>
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenConsultation?.();
                }}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm transition-colors"
              >
                Audit {cloudDetails[activeCloud].name} Workloads
              </button>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions (Cloud Security)
            </h2>
            <p className="text-slate-600 dark:text-stone-400">
              Clear answers regarding IAM audits, Kubernetes runtime hardening, CIS benchmarks, and DevSecOps pipelines.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => {
                      cyberAudio.playHover();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white hover:text-cyan-500 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-cyan-500' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 dark:text-stone-300 text-sm leading-relaxed border-t border-slate-100 dark:border-stone-800/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="text-center py-16 px-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-orange-500/10 border border-cyan-500/20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Eliminate Dangerous Cloud Misconfigurations Today
          </h2>
          <p className="text-slate-600 dark:text-stone-300 max-w-2xl mx-auto mb-8 text-base">
            Request an architecture review with our Senior Cloud Security Architects in New Delhi to audit your cloud posture against CIS benchmarks and prevent unauthorized data exfiltration.
          </p>
          <button
            type="button"
            onClick={() => {
              cyberAudio.playClick();
              onOpenConsultation?.();
            }}
            className="px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-lg shadow-cyan-500/30 transition-transform transform hover:-translate-y-0.5"
          >
            Schedule Cloud Security Architecture Review
          </button>
        </section>
      </div>
    </div>
  );
};
