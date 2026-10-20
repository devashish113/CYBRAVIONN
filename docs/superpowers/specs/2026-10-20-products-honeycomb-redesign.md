# Design Specification: Products Section Honeycomb Redesign

## Goal
Redesign the homepage **Products & Autonomous Platforms** section (`src/components/ProductsShowcase.tsx`) from the previous rectangular cards into an interlocking 3-3 Honeycomb hexagonal cluster matching the cyber-aesthetic of the Services section (`PolygonHexCard`), with interactive water wave ripple dynamics, layout toggles (Honeycomb / Matrix), category filter pills, and neutral gray dark mode harmony.

## Visual & Functional Architecture

### 1. Hexagonal Geometry & Hover Effects
- Reuses the pointy-topped polygon clip-path: `polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`.
- Chamfered outer border layer with reactive hover lighting.
- Ambient background imagery with deep scrim attenuation for zero visual distraction.
- Dynamic water wave ripple physics on pointer movement (`animate-water-wave`).
- Text protection shield (radial scrim) to maintain AAA vector typography contrast.
- Minimalist circular `>` chevron action button at the bottom apex linking to each product view.

### 2. Products Data (6 Honeycomb Engines)
1. **ThreatForge Platform** (`threatforge`)
   - Tag: `THREAT MODELING`
   - Subtitle: `Automated STRIDE & PASTA Engine`
   - Description: `Automated threat modeling and attack surface mapping with live attack tree generation, CVSS 3.1 quantitative scoring, and air-gapped threat narratives.`
   - Icon: `ShieldAlert`
2. **SOC AI Triage** (`soc-ai`)
   - Tag: `AUTONOMOUS SOAR`
   - Subtitle: `Explainable AI Incident Investigation`
   - Description: `Sub-second autonomous SIEM alert investigation. Features SHAP explainable ML verdicts, ReAct investigation agents, and automated SOAR playbooks.`
   - Icon: `BellRing`
3. **AI Exception Manager** (`exception-manager`)
   - Tag: `AI GOVERNANCE`
   - Subtitle: `Automated Risk Waiver Platform`
   - Description: `Centralized compliance exception tracking platform with machine learning risk scoring, automated review workflows, and continuous policy drift governance.`
   - Icon: `ShieldCheck`
4. **CyberRange Arena** (`cyberverse`)
   - Tag: `DEFENSE SANDBOX`
   - Subtitle: `Adversary Emulation & Hands-on Labs`
   - Description: `Browser-based hands-on cyber defense sandboxes, active adversary emulation scenarios, and interactive incident response training for technical teams.`
   - Icon: `Gamepad2`
5. **Threat Intel Collector** (`threat-collector`)
   - Tag: `INGESTION ENGINE`
   - Subtitle: `Unified MISP & OTX Intelligence Hub`
   - Description: `Ingests, deduplicates, and scores IOCs from MISP, AlienVault OTX, and URLhaus with automated STIX 2.1 air-gap export bundles for isolated enclaves.`
   - Icon: `Radio`
6. **Cybravions AI** (`ai`)
   - Tag: `PRIVATE AI CORE`
   - Subtitle: `Private Enterprise Neural Appliance`
   - Description: `Deploy high-performance agentic AI directly inside private infrastructure with mathematical data isolation and zero cloud telemetry.`
   - Icon: `Brain`

### 3. Cluster Arrangement
- **Row 1**: 3 Hexagons (ThreatForge, SOC AI Triage, AI Exception Manager)
- **Row 2**: 3 Hexagons (CyberRange Arena, Threat Intel Collector, Cybravions AI)
- Interlocking nestled negative margin on large screens (`lg:-mt-16`) with connector nodes.
- Responsive fallback to matrix grid on mobile / tablet screens.

### 4. Interactive Controls
- **Filter Pills**:
  - `All Products (6)`
  - `Threat Modeling`
  - `Autonomous SOAR`
  - `AI Governance`
  - `Defense Sandbox`
  - `Private AI`
- **Layout Switcher**:
  - `Honeycomb` (Cluster view)
  - `Matrix` (Grid view)

### 5. Color Palette & Dark Mode Compliance
- **Dark Mode**: Neutral deep graphite `#07080c` / `#111113`, `border-white/15`, neutral white typography, zero blueish tint.
- **Light Mode**: Alabaster `#fafafa` / `#ffffff`, `border-black/10`, deep slate/neutral typography.
