import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoPages, notFoundSeo } from '../src/utils/seoPages.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'dist');
const baseHtml = await readFile(path.join(outputRoot, 'index.html'), 'utf8');
const sitemap = await readFile(path.join(outputRoot, 'sitemap.xml'), 'utf8');
const origin = 'https://cybravions.com';
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function replaceMeta(html, attribute, key, value) {
  const escapedKey = escapeRegex(key);
  const pattern = new RegExp(`<meta\\s+${attribute}="${escapedKey}"\\s+content="[^"]*"[^>]*\\/>`, 'i');
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" data-rh="true" />`;
  return html.replace(pattern, tag);
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function removeMarkedJsonLd(html, label) {
  const escapedLabel = escapeRegex(label);
  const pattern = new RegExp(`\\s*<!-- Structured Data: ${escapedLabel}[^>]*-->\\s*<script type="application/ld\\+json"[^>]*>[\\s\\S]*?<\\/script>`, 'i');
  return html.replace(pattern, '');
}

function getNavigationHtml() {
  return `
    <nav aria-label="Main navigation" style="border-bottom: 1px solid #292524; padding-bottom: 1.5rem; margin-bottom: 2.5rem; font-size: 0.95rem;">
      <a href="/" style="color: #f97316; font-weight: bold; margin-right: 1rem;">CYBRAVION</a>
      <span style="color: #78716c; margin-right: 1rem;">|</span>
      <a href="/vapt" style="color: #60a5fa; margin-right: 0.75rem;">VAPT</a> ·
      <a href="/iso-27001" style="color: #60a5fa; margin-right: 0.75rem;">ISO 27001</a> ·
      <a href="/soc-2" style="color: #60a5fa; margin-right: 0.75rem;">SOC 2</a> ·
      <a href="/cloud-security" style="color: #60a5fa; margin-right: 0.75rem;">Cloud Security</a> ·
      <a href="/ai-security" style="color: #60a5fa; margin-right: 0.75rem;">AI Security</a> ·
      <a href="/dpdp-compliance" style="color: #60a5fa; margin-right: 0.75rem;">DPDP Act</a> ·
      <a href="/resources" style="color: #f97316; margin-right: 0.75rem;">Resources &amp; Guides</a> ·
      <a href="/about" style="color: #d6d3d1; margin-right: 0.75rem;">About</a> ·
      <a href="/ai" style="color: #d6d3d1; margin-right: 0.75rem;">Sovereign AI</a> ·
      <a href="/cyberverse" style="color: #d6d3d1; margin-right: 0.75rem;">CyberRange</a> ·
      <a href="/compliance" style="color: #d6d3d1; margin-right: 0.75rem;">Trust Center</a> ·
      <a href="/#contact" style="color: #f97316; font-weight: bold;">Contact</a>
    </nav>
  `;
}

function getCorporateFooterHtml() {
  return `
    <footer style="margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid #292524; font-size: 0.85rem; color: #a8a29e;">
      <p style="margin-bottom: 0.75rem;">
        <strong>CYBRAVION SOLUTIONS PRIVATE LIMITED</strong> | Ministry of Corporate Affairs CIN: <code>U62099DL2026PTC470901</code> (RoC-Delhi).
      </p>
      <p style="margin-bottom: 0.75rem;">
        <strong>Registered Office:</strong> H. IN.KH.NO.293 S/F Western Marg, Saidulajab, Near Kher Singh Estate, New Delhi, Delhi 110030, India.<br />
        <strong>Hotline &amp; Incident Desk:</strong> +91-7258880881 / +91-9358683634 | <strong>Corporate Inquiries:</strong> support@cybravions.com
      </p>
      <p style="color: #78716c;">
        Enterprise cybersecurity consulting, offensive penetration testing, zero-trust engineering, and sovereign air-gapped artificial intelligence defense.
      </p>
    </footer>
  `;
}

function generateRouteSpecificBody(route, metadata) {
  const nav = getNavigationHtml();
  const footer = getCorporateFooterHtml();

  if (route === '/vapt') {
    return `
      <main id="seo-fallback" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #e7e5e4;">
        ${nav}
        <header style="margin-bottom: 2.5rem;">
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem;">${escapeHtml(metadata.title)}</h1>
          <p style="font-size: 1.15rem; color: #a8a29e;">${escapeHtml(metadata.description)}</p>
        </header>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.6rem; color: #f97316; margin-bottom: 1rem;">Enterprise Offensive Security Testing &amp; Ethical Hacking</h2>
          <p>CYBRAVION Solutions delivers enterprise-grade Vulnerability Assessment and Penetration Testing (VAPT) across New Delhi NCR, India, and global digital infrastructures. Our certified offensive security researchers employ adversary emulation tactics aligned with OWASP Top 10 (2021/2025), SANS Top 25, NIST SP 800-115, and CERT-In audit directives.</p>
          
          <h3 style="font-size: 1.25rem; color: #ffffff; margin-top: 1.5rem;">Core Penetration Testing Scopes:</h3>
          <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
            <li><strong>Web Application VAPT:</strong> Deep hunting for business logic bypasses, SQL injection, Cross-Site Scripting (XSS), Server-Side Request Forgery (SSRF), and Insecure Direct Object References (IDOR/BOLA).</li>
            <li><strong>REST &amp; GraphQL API Security:</strong> Auditing authentication token manipulation, rate-limit bypassing, excessive data exposure, mass assignment, and microservices trust boundaries.</li>
            <li><strong>Mobile Application VAPT (iOS &amp; Android):</strong> Reverse engineering resilience, binary protection, insecure local storage, runtime Frida hooking, and SSL pinning bypass analysis.</li>
            <li><strong>Internal &amp; External Network Pentesting:</strong> Active Directory attack paths (Kerberoasting, DCSync), perimeter port exploitation, firewall bypass, and lateral movement simulation.</li>
            <li><strong>Cloud Infrastructure Red Teaming:</strong> AWS, Azure, and GCP IAM role escalation, exposed S3 buckets/blobs, and container/Kubernetes runtime escapes.</li>
          </ul>
        </section>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.6rem; color: #f97316; margin-bottom: 1rem;">Actionable Deliverables &amp; Zero False-Positive Guarantee</h2>
          <p>We reject raw automated scanner dumps. Every vulnerability in CYBRAVION's audit reports includes step-by-step reproduction steps, proof-of-concept exploit artifacts, developer-friendly remediation code snippets, and CVSS v3.1 scoring. Every engagement includes one complimentary re-test within 60 days to formally certify the remediated posture.</p>
          <p><a href="/#contact" style="display: inline-block; padding: 0.75rem 1.5rem; background: #ea580c; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 1rem;">Schedule Free VAPT Scoping Call</a></p>
        </section>
        ${footer}
      </main>
    `;
  }

  if (route === '/iso-27001') {
    return `
      <main id="seo-fallback" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #e7e5e4;">
        ${nav}
        <header style="margin-bottom: 2.5rem;">
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem;">${escapeHtml(metadata.title)}</h1>
          <p style="font-size: 1.15rem; color: #a8a29e;">${escapeHtml(metadata.description)}</p>
        </header>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.6rem; color: #f97316; margin-bottom: 1rem;">Turnkey ISO/IEC 27001:2022 ISMS Implementation</h2>
          <p>CYBRAVION Solutions guides Indian technology scale-ups, SaaS providers, BFSI institutions, and enterprise vendors to achieve ISO/IEC 27001:2022 certification in as little as 8 to 12 weeks. We handle the entire lifecycle from preliminary gap analysis and risk registers to Statement of Applicability (SoA) formulation and Stage 1 / Stage 2 external certification audits.</p>
          
          <h3 style="font-size: 1.25rem; color: #ffffff; margin-top: 1.5rem;">The 4-Phase ISMS Roadmap:</h3>
          <ol style="padding-left: 1.5rem; margin-top: 0.5rem;">
            <li><strong>Phase 1: Gap Assessment &amp; Boundary Scoping:</strong> Reviewing existing controls, IT infrastructure, AWS/cloud setups, and organizational policies against ISO 27001:2022 clauses.</li>
            <li><strong>Phase 2: Risk Treatment &amp; SoA Documentation:</strong> Conducting formal asset-based risk assessments and drafting custom InfoSec policies covering all 93 Annex A controls.</li>
            <li><strong>Phase 3: Control Implementation &amp; Internal Audit:</strong> Enforcing MFA, DLP, secure coding, and conducting a full internal mock audit with executive management review.</li>
            <li><strong>Phase 4: External Certification Audit Representation:</strong> Sitting alongside your team during Stage 1 and Stage 2 audits with accredited bodies (BSI, DNV, TÜV, Bureau Veritas).</li>
          </ol>
        </section>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.6rem; color: #f97316; margin-bottom: 1rem;">Mastering the 11 New 2022 Annex A Controls</h2>
          <p>We implement operational blueprints for all 11 newly mandatory controls in the 2022 revision: Threat Intelligence (A.5.7), Information Security for Cloud Services (A.5.23), ICT Readiness for Business Continuity (A.8.6), Physical Security Monitoring (A.7.4), Configuration Management (A.8.9), Information Deletion (A.8.10), Data Masking (A.8.11), Data Leakage Prevention (A.8.12), Monitoring Activities (A.8.16), Web Filtering (A.8.23), and Secure Coding (A.8.28).</p>
          <p><a href="/#contact" style="display: inline-block; padding: 0.75rem 1.5rem; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 1rem;">Book Free ISO 27001 Gap Consultation</a></p>
        </section>
        ${footer}
      </main>
    `;
  }

  if (route === '/soc-2') {
    return `
      <main id="seo-fallback" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #e7e5e4;">
        ${nav}
        <header style="margin-bottom: 2.5rem;">
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem;">${escapeHtml(metadata.title)}</h1>
          <p style="font-size: 1.15rem; color: #a8a29e;">${escapeHtml(metadata.description)}</p>
        </header>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.6rem; color: #f97316; margin-bottom: 1rem;">Accelerated SOC 2 Type I &amp; Type II Readiness</h2>
          <p>Win enterprise contracts with North American and European enterprise buyers. CYBRAVION prepares SaaS providers, fintechs, and cloud startups for frictionless SOC 2 compliance under the AICPA Trust Services Criteria (Security, Availability, Confidentiality, Processing Integrity, and Privacy).</p>
          
          <h3 style="font-size: 1.25rem; color: #ffffff; margin-top: 1.5rem;">SOC 2 Type I vs. SOC 2 Type II:</h3>
          <p><strong>SOC 2 Type I</strong> assesses whether your controls are suitably designed at a single specific point in time (achievable in 4 to 6 weeks). <strong>SOC 2 Type II</strong> verifies the operational effectiveness of controls over an extended observation period (typically 3, 6, or 12 months) and is the gold standard demanded by Fortune 500 procurement teams.</p>

          <h3 style="font-size: 1.25rem; color: #ffffff; margin-top: 1.5rem;">5-Step Readiness Methodology:</h3>
          <ol style="padding-left: 1.5rem; margin-top: 0.5rem;">
            <li>Scoping and gap analysis of AWS, Azure, GCP, and internal employee directories.</li>
            <li>Policy creation and integration with automated compliance platforms (Vanta, Drata, Sprinto).</li>
            <li>Technical remediation: MFA enforcement, backup encryption, CI/CD code scanning, and penetration testing.</li>
            <li>Observation window management: continuous log capture and control monitoring.</li>
            <li>Liaison with independent licensed AICPA CPA firms to deliver your final attestation report.</li>
          </ol>
        </section>

        <section style="margin-bottom: 2.5rem;">
          <p><a href="/#contact" style="display: inline-block; padding: 0.75rem 1.5rem; background: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">Schedule Free SOC 2 Scoping Call</a></p>
        </section>
        ${footer}
      </main>
    `;
  }

  if (route === '/cloud-security') {
    return `
      <main id="seo-fallback" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #e7e5e4;">
        ${nav}
        <header style="margin-bottom: 2.5rem;">
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem;">${escapeHtml(metadata.title)}</h1>
          <p style="font-size: 1.15rem; color: #a8a29e;">${escapeHtml(metadata.description)}</p>
        </header>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.6rem; color: #f97316; margin-bottom: 1rem;">Multi-Cloud Architecture Audits &amp; DevSecOps Gating</h2>
          <p>Harden your cloud perimeter and eliminate misconfigurations across AWS, Microsoft Azure, Google Cloud Platform (GCP), and Kubernetes. CYBRAVION audits cloud workloads against CIS Benchmarks, enforces IAM least-privilege entitlements, and embeds automated shift-left security checks directly into developer CI/CD pipelines.</p>
          
          <h3 style="font-size: 1.25rem; color: #ffffff; margin-top: 1.5rem;">Key Cloud Security Practices:</h3>
          <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
            <li><strong>Cloud Security Posture Management (CSPM):</strong> Detecting unencrypted S3 buckets, open security groups, and automated configuration drift.</li>
            <li><strong>CIEM &amp; Cloud IAM Hardening:</strong> Eliminating dormant credentials, privilege escalation chains, and toxic cross-account trust roles.</li>
            <li><strong>Kubernetes &amp; Container Security:</strong> Hardening Amazon EKS, Azure AKS, and GKE against CIS Kubernetes benchmarks with eBPF runtime monitoring.</li>
            <li><strong>Shift-Left DevSecOps:</strong> Automated Infrastructure-as-Code (Terraform/OpenTofu) linting, secret detection, and container image gating in GitHub Actions and Jenkins.</li>
          </ul>
        </section>

        <section style="margin-bottom: 2.5rem;">
          <p><a href="/#contact" style="display: inline-block; padding: 0.75rem 1.5rem; background: #0891b2; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">Schedule Cloud Security Architecture Review</a></p>
        </section>
        ${footer}
      </main>
    `;
  }

  if (route === '/ai-security') {
    return `
      <main id="seo-fallback" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #e7e5e4;">
        ${nav}
        <header style="margin-bottom: 2.5rem;">
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem;">${escapeHtml(metadata.title)}</h1>
          <p style="font-size: 1.15rem; color: #a8a29e;">${escapeHtml(metadata.description)}</p>
        </header>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.6rem; color: #f97316; margin-bottom: 1rem;">Offensive AI Red Teaming &amp; Sovereign AI Defense</h2>
          <p>Protect foundation models, retrieval-augmented generation (RAG) pipelines, and autonomous AI agents from prompt injection, training data poisoning, and unauthorized tool execution. Aligned with the OWASP Top 10 for Large Language Models and NIST AI Risk Management Framework (AI RMF 1.0).</p>
          
          <h3 style="font-size: 1.25rem; color: #ffffff; margin-top: 1.5rem;">OWASP Top 10 for LLMs Audit Coverage:</h3>
          <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
            <li>Direct and Indirect Prompt Injection attacks (recursive persona overrides, jailbreaks).</li>
            <li>Sensitive Information Disclosure and PII extraction from model weights and RAG vector databases.</li>
            <li>Supply chain vulnerabilities in open-weight models (HuggingFace) and ML pipelines.</li>
            <li>Excessive Agency: Restricting autonomous agent action capabilities to validated APIs.</li>
            <li>Deployment of CYBRAVION Prompt Armor: Multilayer real-time AI firewalls and air-gapped on-prem appliances.</li>
          </ul>
        </section>

        <section style="margin-bottom: 2.5rem;">
          <p><a href="/#contact" style="display: inline-block; padding: 0.75rem 1.5rem; background: #9333ea; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">Schedule AI Red Teaming Consultation</a></p>
        </section>
        ${footer}
      </main>
    `;
  }

  if (route === '/dpdp-compliance') {
    return `
      <main id="seo-fallback" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #e7e5e4;">
        ${nav}
        <header style="margin-bottom: 2.5rem;">
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem;">${escapeHtml(metadata.title)}</h1>
          <p style="font-size: 1.15rem; color: #a8a29e;">${escapeHtml(metadata.description)}</p>
        </header>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.6rem; color: #f97316; margin-bottom: 1rem;">Digital Personal Data Protection Act (DPDP Act 2023) Advisory</h2>
          <p>Total regulatory compliance advisory for India's Digital Personal Data Protection Act 2023 (Act No. 22 of 2023). CYBRAVION assists Data Fiduciaries and Significant Data Fiduciaries in implementing statutory data governance, consent architectures, and technical safeguards to avoid catastrophic statutory penalties of up to ₹250 Crores.</p>
          
          <h3 style="font-size: 1.25rem; color: #ffffff; margin-top: 1.5rem;">Statutory Compliance Pillars:</h3>
          <ul style="padding-left: 1.5rem; margin-top: 0.5rem;">
            <li><strong>Consent Management:</strong> Multi-lingual consent notices across English and all 22 Eighth Schedule Indian languages.</li>
            <li><strong>Data Principal Rights Automation:</strong> Engineering workflows for Right to Access, Correction, Erasure, and Grievance Redressal.</li>
            <li><strong>DPO as a Service:</strong> Indian-resident Data Protection Officer advisory, DPIAs, and statutory Data Audits.</li>
            <li><strong>Children’s Privacy:</strong> Verifiable parental consent mechanisms and prohibition of behavioral tracking.</li>
            <li><strong>CERT-In Alignment:</strong> Mandatory 6-hour cybersecurity incident reporting SOP integration with DPDP Board alerts.</li>
          </ul>
        </section>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.6rem; color: #f97316; margin-bottom: 1rem;">Statutory Penalties Under DPDP Act 2023</h2>
          <p>Failure to take reasonable security safeguards carries monetary penalties up to <strong>₹250 Crores</strong>. Failure to notify the Data Protection Board and affected users of a breach carries penalties up to <strong>₹200 Crores</strong>.</p>
          <p><a href="/#contact" style="display: inline-block; padding: 0.75rem 1.5rem; background: #059669; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 1rem;">Schedule DPDP Compliance Consultation</a></p>
        </section>
        ${footer}
      </main>
    `;
  }

  if (route === '/resources') {
    return `
      <main id="seo-fallback" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #e7e5e4;">
        ${nav}
        <header style="margin-bottom: 2.5rem;">
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem;">${escapeHtml(metadata.title)}</h1>
          <p style="font-size: 1.15rem; color: #a8a29e;">${escapeHtml(metadata.description)}</p>
        </header>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.6rem; color: #f97316; margin-bottom: 1rem;">Definitive Regulatory Guides &amp; Technical Playbooks</h2>
          <p>Authored by CYBRAVION's senior cybersecurity auditors, regulatory counsel, and offensive security engineers in New Delhi, India.</p>

          <article style="margin-bottom: 2rem; padding: 1.5rem; background: #1c1917; border-radius: 12px; border: 1px solid #292524;">
            <h3 style="font-size: 1.35rem; color: #ffffff;"><a href="/resources" style="color: #60a5fa; text-decoration: underline;">DPDP Act 2023: The Definitive Enterprise Compliance &amp; Implementation Checklist</a></h3>
            <p style="color: #d6d3d1; margin-top: 0.5rem;">An exhaustive regulatory guide for Indian and global enterprises on complying with the Digital Personal Data Protection Act 2023, consent architectures, Data Principal rights, and preventing penalties up to ₹250 Crores.</p>
          </article>

          <article style="margin-bottom: 2rem; padding: 1.5rem; background: #1c1917; border-radius: 12px; border: 1px solid #292524;">
            <h3 style="font-size: 1.35rem; color: #ffffff;"><a href="/resources" style="color: #60a5fa; text-decoration: underline;">ISO 27001:2022 Certification in India: Cost, Timeline &amp; Audit Roadmap (2026 Edition)</a></h3>
            <p style="color: #d6d3d1; margin-top: 0.5rem;">The definitive executive guide to achieving ISO/IEC 27001:2022 certification in India. Realistic timelines, breakdown of consulting and registrar costs, and implementing the 11 new controls.</p>
          </article>

          <article style="margin-bottom: 2rem; padding: 1.5rem; background: #1c1917; border-radius: 12px; border: 1px solid #292524;">
            <h3 style="font-size: 1.35rem; color: #ffffff;"><a href="/resources" style="color: #60a5fa; text-decoration: underline;">VAPT vs Penetration Testing: The Executive Scoping &amp; Deliverables Guide</a></h3>
            <p style="color: #d6d3d1; margin-top: 0.5rem;">Learn the critical difference between automated vulnerability scanning and manual offensive penetration testing. Avoid low-quality commodity scans and demand actionable proof-of-concept reports.</p>
          </article>

          <article style="margin-bottom: 2rem; padding: 1.5rem; background: #1c1917; border-radius: 12px; border: 1px solid #292524;">
            <h3 style="font-size: 1.35rem; color: #ffffff;"><a href="/resources" style="color: #60a5fa; text-decoration: underline;">CERT-In 6-Hour Cyber Incident Reporting Directive: Protocols &amp; SOPs for Indian Businesses</a></h3>
            <p style="color: #d6d3d1; margin-top: 0.5rem;">Navigating CERT-In Direction No. 20(3)/2022-CERT-In. Mandatory 6-hour incident disclosure windows, 180-day ICT system log retention, NTP server synchronization, and emergency response SOPs.</p>
          </article>
        </section>
        ${footer}
      </main>
    `;
  }

  // Fallback for other pages
  return `
    <main id="seo-fallback" style="max-width: 1000px; margin: 0 auto; padding: 4rem 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #e7e5e4;">
      ${nav}
      <header style="margin-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem;">${escapeHtml(metadata.title)}</h1>
        <p style="font-size: 1.15rem; color: #a8a29e;">${escapeHtml(metadata.description)}</p>
      </header>
      <section style="margin-bottom: 2rem;">
        <p>CYBRAVION SOLUTIONS PRIVATE LIMITED provides enterprise cybersecurity consulting, offensive penetration testing (VAPT), governance, risk, and compliance (ISO 27001, SOC 2, DPDP Act 2023), cloud security, and sovereign air-gapped AI appliances from New Delhi, India.</p>
        <p><a href="/#contact" style="display: inline-block; padding: 0.75rem 1.5rem; background: #ea580c; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 1rem;">Contact CYBRAVION Solutions</a></p>
      </section>
      ${footer}
    </main>
  `;
}

function renderPage(html, route, metadata) {
  const url = `${origin}${route}`;
  html = html.replace(/<script\s+type="application\/ld\+json"\s+id="page-seo-schema">[\s\S]*?<\/script>/i, '');
  let output = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`);
  
  // Inject rich route-specific fallback HTML
  if (route !== '/') {
    output = output.replace(/<main\s+id="seo-fallback"[^>]*>[\s\S]*?<\/main>/i, generateRouteSpecificBody(route, metadata));
  }
  
  output = replaceMeta(output, 'name', 'description', metadata.description);
  output = replaceMeta(output, 'property', 'og:url', url);
  output = replaceMeta(output, 'property', 'og:title', metadata.title);
  output = replaceMeta(output, 'property', 'og:description', metadata.description);
  output = replaceMeta(output, 'name', 'twitter:title', metadata.title);
  output = replaceMeta(output, 'name', 'twitter:description', metadata.description);
  output = output.replace(/<link\s+rel="canonical"\s+href="[^"]*"[^>]*\/>/i, `<link rel="canonical" href="${url}" data-rh="true" />`);

  if (route !== '/') {
    output = removeMarkedJsonLd(output, 'Service offerings');
    output = removeMarkedJsonLd(output, 'FAQPage for Google Search Rich Results');
  }

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metadata.title,
    url,
    description: metadata.description,
    isPartOf: { '@id': `${origin}/#website` },
    about: { '@id': `${origin}/#organization` },
  };
  if (route !== '/404') {
    output = output.replace('</head>', `  <script type="application/ld+json" id="page-seo-schema">${JSON.stringify(pageSchema).replaceAll('<', '\\u003c')}</script>\n</head>`);
  }
  return output;
}

function validatePage(html, route, metadata) {
  const canonicalLinks = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]*)"[^>]*\/>/gi)];
  const expectedCanonical = route === '/404' ? 0 : 1;
  assert.equal(canonicalLinks.length, expectedCanonical, `Unexpected canonical count for ${route}`);
  if (expectedCanonical) assert.equal(canonicalLinks[0][1], `${origin}${route}`);
  const escapedTitle = escapeRegex(escapeHtml(metadata.title));
  assert.match(html, new RegExp(`<title>${escapedTitle}</title>`));
  assert.match(html, new RegExp(`<h1[^>]*>${escapedTitle}</h1>`));
  if (route === '/404') assert.match(html, /<meta name="robots" content="noindex, follow"[^>]*\/>/);

  const structuredData = [...html.matchAll(/<script\s+type="application\/ld\+json"(?:\s+id="[^"]+")?>([\s\S]*?)<\/script>/gi)];
  assert.ok(structuredData.length > 0, `Missing structured data for ${route}`);
  for (const [, json] of structuredData) JSON.parse(json);
}

for (const [route, metadata] of Object.entries(seoPages)) {
  assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), `Missing ${route} from sitemap.xml`);
  const html = renderPage(baseHtml, route, metadata);
  validatePage(html, route, metadata);
  if (route !== '/') assert.doesNotMatch(html, /"@type"\s*:\s*"Service"/);
  if (route === '/') {
    await writeFile(path.join(outputRoot, 'index.html'), html);
  } else {
    const routeDirectory = path.join(outputRoot, route.slice(1));
    await mkdir(routeDirectory, { recursive: true });
    await writeFile(path.join(routeDirectory, 'index.html'), html);
  }
}
assert.doesNotMatch(sitemap, /llms\.txt/i, 'Context documents should not be listed as landing pages in sitemap.xml');

let notFoundHtml = renderPage(baseHtml, '/404', notFoundSeo)
  .replace(/<link\s+rel="canonical"\s+href="[^"]*"[^>]*\/>/i, '')
  .replace(/<meta\s+name="robots"\s+content="[^"]*"[^>]*\/>/i, '<meta name="robots" content="noindex, follow" data-rh="true" />');
notFoundHtml = removeMarkedJsonLd(notFoundHtml, 'Service offerings');
notFoundHtml = removeMarkedJsonLd(notFoundHtml, 'FAQPage for Google Search Rich Results');
validatePage(notFoundHtml, '/404', notFoundSeo);
await writeFile(path.join(outputRoot, '404.html'), notFoundHtml);

console.log('SEO pages successfully generated with rich body fallback content!');
