# CYBRAVIONN --- Immersive 3D Website Redesign

## Master Execution Plan for Antigravity

> **Purpose:** Redesign the existing CYBRAVIONN website from a
> conventional 2D landing page with a 3D background into a genuinely
> immersive 3D cybersecurity experience.
>
> **Execution model:** Execute **ONE TASK AT A TIME**. After completing
> a task, stop and report the result. Do not automatically continue to
> the next task.
>
> **Important:** Visual design must be approved before large-scale
> implementation. Use image generation wherever this document explicitly
> asks for a concept image.

------------------------------------------------------------------------

# 0. PROJECT CONTEXT

The existing CYBRAVIONN project already contains substantial 3D
infrastructure, including Three.js scenes, a persistent
`CyberUniverse3D`, a globe, radar, infrastructure nodes, particles,
camera interpolation, scroll logic, and post-processing.

However, the current experience still reads visually as:

``` text
NORMAL HTML / REACT WEBSITE
        +
3D ANIMATED BACKGROUND
```

The target is:

``` text
3D DIGITAL CYBERSECURITY WORLD
        +
HTML / React INFORMATION LAYER
```

The 3D world must become the primary visual experience.

The user should feel that they are **physically navigating a digital
cybersecurity infrastructure**, not browsing a normal webpage with
decorative Three.js effects.

------------------------------------------------------------------------

# 1. NON-NEGOTIABLE DESIGN PRINCIPLES

## 1.1 The 3D world is the website

Do not treat Three.js as wallpaper.

The environment itself must communicate:

-   scale
-   infrastructure
-   network topology
-   security boundaries
-   data movement
-   threat activity
-   defense
-   resilience

HTML is responsible for:

-   semantic content
-   headings
-   service descriptions
-   forms
-   accessibility
-   SEO
-   detailed information

Three.js is responsible for:

-   environment
-   spatial storytelling
-   major transitions
-   infrastructure
-   network visualization
-   threat/defense visualization
-   cinematic camera movement

------------------------------------------------------------------------

## 1.2 Avoid the "giant glowing object" trap

Do NOT make the hero revolve around:

-   a giant globe
-   a giant glowing sphere
-   a crystal
-   a reactor
-   a floating AI brain
-   a generic holographic orb

A small central security system may exist, but the **environment itself
is the hero**.

The visual metaphor is:

> **A gigantic digital security city / infrastructure ecosystem.**

------------------------------------------------------------------------

## 1.3 Avoid generic cyberpunk

Do NOT use:

-   excessive neon
-   rainbow colors
-   random particles
-   random glowing rings
-   random floating shapes
-   crypto-style interfaces
-   gaming UI
-   excessive HUD decorations
-   purple/cyan/orange everywhere
-   giant glowing wireframe spheres

The aesthetic should feel:

-   premium
-   enterprise
-   architectural
-   cinematic
-   technological
-   sophisticated
-   futuristic
-   believable

------------------------------------------------------------------------

# 2. TARGET VISUAL LANGUAGE

## 2.1 Environment

The environment should contain:

-   massive data towers
-   server structures
-   elevated platforms
-   security gateways
-   network bridges
-   data corridors
-   architectural beams
-   catwalks
-   conduits
-   protected zones
-   monitoring structures
-   distant infrastructure
-   atmospheric depth

The viewer should feel small compared with the environment.

------------------------------------------------------------------------

## 2.2 Spatial depth

Every major scene must clearly contain:

``` text
FOREGROUND
    ↓
MIDGROUND
    ↓
BACKGROUND
    ↓
DEEP ATMOSPHERIC DISTANCE
```

Use:

-   perspective
-   scale differences
-   occlusion
-   shadows
-   fog
-   parallax
-   physical lighting
-   depth-based detail reduction

Some objects must physically cross the camera view.

Some network paths must pass behind structures.

Some must pass in front.

Some must disappear into the distance.

------------------------------------------------------------------------

## 2.3 Color system

Base:

``` text
Deep Titanium Black  #020408
Dark Graphite       #080B12
Deep Navy           #0B1220
```

Primary active infrastructure:

``` text
Electric Cyan       #00F0FF
Electric Blue       #2563EB
```

Secondary intelligence:

``` text
Indigo / Violet     #6366F1 or a restrained equivalent
```

Subtle system indicator:

``` text
Teal                #14B8A6
```

Warning:

``` text
Amber               #F59E0B
```

Threat:

``` text
Red                 #EF4444
```

Text:

``` text
Cold White          #F8FAFC
Muted White         #CBD5E1
```

### Color semantics

-   Cyan = active network/data
-   Blue = infrastructure
-   Indigo = intelligence/AI/security analysis
-   Teal = healthy/verified system state
-   Amber = warning/attention
-   Red = actual threat
-   White = information
-   Black/navy = environment

Do not use all colors simultaneously.

Do not make the whole environment cyan.

------------------------------------------------------------------------

# 3. CURRENT PROJECT RULES

Before changing code:

1.  Inspect the actual current project.
2.  Do not rely on an earlier audit if the code has changed.
3.  Identify which components are actually imported and rendered.
4.  Identify unused legacy components.
5.  Preserve business content and functional logic unless explicitly
    redesigned.
6.  Do not delete old components until the new replacement is working.
7.  Do not rewrite the whole project in one task.
8.  Keep the application buildable after each implementation task.
9.  Keep a clear rollback point before major architectural changes.
10. Do not introduce a new library if an existing dependency already
    solves the problem.

The current project already contains Three.js / React Three Fiber / Drei
/ GSAP-related dependencies. Verify actual usage before deciding whether
to migrate rendering architecture.

**Do not migrate from imperative Three.js to React Three Fiber merely
for the sake of migration.** The visual result is the priority.

------------------------------------------------------------------------

# 4. MASTER EXPERIENCE ARCHITECTURE

The final experience should have these chapters:

``` text
01 — THE DIGITAL WORLD
        ↓
02 — THE THREAT
        ↓
03 — THE DEFENSE
        ↓
04 — THE ECOSYSTEM
        ↓
05 — SECURITY CAPABILITIES
        ↓
06 — THE SECURE HORIZON / CTA
```

These are not six disconnected pages.

They are different states of the same visual world.

------------------------------------------------------------------------

# 5. MASTER WORLD ARCHITECTURE

Conceptually:

``` text
CyberSecurityWorld
│
├── Environment
│   ├── ForegroundStructures
│   ├── Catwalks
│   ├── DataTowers
│   ├── NetworkBridges
│   ├── SecurityZones
│   └── AtmosphericDepth
│
├── Network
│   ├── Nodes
│   ├── Conduits
│   ├── DataPackets
│   └── RoutingPaths
│
├── Security
│   ├── Gateways
│   ├── MonitoringSystems
│   ├── DefenseBarriers
│   └── SecurityCore
│
├── Threat
│   ├── ThreatPackets
│   ├── IntrusionPaths
│   └── ImpactEffects
│
├── Camera
│   ├── Waypoints
│   ├── LookTargets
│   └── ScrollTimeline
│
└── UI Layer
    ├── Hero
    ├── Telemetry
    ├── ServicePanels
    ├── CaseStudies
    └── CTA
```

------------------------------------------------------------------------

# 6. EXECUTION PROTOCOL FOR ANTIGRAVITY

For every task:

1.  Read the task.
2.  Inspect relevant existing code.
3.  Implement ONLY that task.
4.  Run TypeScript/build checks.
5.  Run the dev server if required.
6.  Visually inspect the browser.
7.  Fix obvious regressions caused by that task.
8.  Stop.
9.  Report:
    -   files changed
    -   what changed
    -   screenshot/result
    -   build status
    -   known issues
10. Wait for explicit instruction before starting the next task.

Do not silently combine multiple tasks.

------------------------------------------------------------------------

# TASK 01 --- CREATE A VISUAL BASELINE

## Goal

Before modifying the design, document the current state.

## Actions

Inspect:

-   `src/App.tsx`
-   `src/components/CyberUniverse3D.tsx`
-   `src/components/CyberGlobe3D.tsx`
-   `src/components/Scene3D.tsx`
-   `src/components/ThreatRadar3D.tsx`
-   `src/hooks/useScrollAnimation.ts`
-   `src/index.css`
-   all major content sections
-   package/dependency structure

Determine:

-   which 3D components are actually used
-   which are legacy/unused
-   which effects are duplicated
-   which sections are opaque
-   which sections can expose the 3D world
-   where scroll state currently originates
-   where camera state currently originates

## Deliverable

Create:

``` text
docs/REDESIGN_AUDIT.md
```

Do not change the visual implementation yet.

------------------------------------------------------------------------

# TASK 02 --- VISUAL DIRECTION IMAGE: MASTER WORLD

## Goal

Create the primary visual reference for the entire website.

### IMAGE GENERATION PROMPT

Use the image-generation capability and generate a high-end cinematic
concept image:

``` text
Create a premium cinematic concept-art reference for CYBRAVIONN, an enterprise cybersecurity company.

Show a gigantic futuristic digital-security infrastructure city viewed from INSIDE the environment.

This is NOT a normal datacenter and NOT a cyberpunk city.

The viewer is physically standing inside a massive digital infrastructure ecosystem.

Foreground:
large dark titanium architectural beams, catwalks, structural frames, network conduits, partially occluding the camera.

Midground:
multiple security gateways, server towers, elevated platforms, protected network sectors, data corridors and interconnected infrastructure.

Background:
huge vertical data towers and infrastructure disappearing into deep atmospheric fog.

Create a true spatial 3D network:
physical conduits and luminous data paths connect different infrastructure nodes across multiple depths.

Some data paths pass behind structures.
Some pass in front.
Some disappear into the distance.

Do NOT use a giant globe, giant sphere, crystal, reactor, or floating AI brain as the central visual.

Instead, the environment itself is the hero.

Color palette:
deep titanium black, dark graphite and navy as the foundation.

Use electric blue for infrastructure lighting.
Use electric cyan for active network/data paths.
Use restrained indigo/violet for intelligence systems.
Use subtle teal for healthy verified systems.
Use small amber indicators for warnings.
Use red only for actual threats.

The image must NOT be dominated by cyan.

Most physical architecture should remain dark.

Lighting:
cinematic architectural lighting with strong shadows and controlled highlights.
Cold white highlights reveal metal geometry.
Blue/cyan light originates from actual infrastructure.
Deep shadows remain visible.

Materials:
dark brushed titanium,
anodized graphite,
smoked glass,
dark metal,
subtle reflective surfaces.

Atmosphere:
deep volumetric haze,
strong aerial perspective,
large sense of scale.

The scene should communicate:
"gigantic cybersecurity infrastructure that I can physically enter."

Premium enterprise technology aesthetic.
High-end cinematic sci-fi architecture.
Realistic physical depth.
Sophisticated, not gaming-oriented.

No people as the focus.
No text-heavy UI.
No random particle field.
No rainbow neon.
No excessive bloom.
No generic cyberpunk.

16:9 composition.
```

## Approval gate

Do not implement the master world until the visual direction is
accepted.

------------------------------------------------------------------------

# TASK 03 --- CREATE THE HERO VISUAL REFERENCE

## Goal

Design Chapter 01 specifically.

### IMAGE GENERATION PROMPT

``` text
Create a high-end cinematic hero environment for CYBRAVIONN.

The camera is physically located inside a gigantic futuristic cybersecurity infrastructure.

Do NOT show a normal website screenshot.

Do NOT create a 50/50 split layout.

The entire frame is a 3D environment.

Foreground:
very large dark structural beams and a nearby catwalk partially occlude the frame.

Midground:
a sophisticated cybersecurity infrastructure network consisting of:
security gateways,
server towers,
network bridges,
data conduits,
protected sectors,
monitoring structures.

Create a central security system, but keep it integrated into the environment.

Do NOT use a giant glowing globe.
Do NOT use a giant crystal.
Do NOT use a giant reactor.

The security system should be a medium-scale architectural installation connected to surrounding infrastructure.

Network topology must have real 3D depth:
nodes at different distances,
conduits crossing different Z positions,
data paths passing behind and in front of structures.

Use dark black/navy architecture.

Color:
electric blue infrastructure,
electric cyan active data,
restrained indigo intelligence,
subtle teal healthy-state indicators,
tiny amber warnings.

Do not flood the image with cyan.

Lighting must create:
foreground shadow,
midground highlights,
deep background atmospheric depth.

Leave some natural negative space on the left for:
CYBRAVIONN
SECURE THE DIGITAL FRONTIER.
supporting copy
CTA

But do not make the environment look like a conventional split-screen landing page.

The 3D environment must continue behind the text area.

The viewer should feel like they are standing inside the facility.

Premium enterprise cybersecurity.
Cinematic.
Architectural.
Immersive.
Physically believable.
16:9.
```

## Approval gate

Do not code the final hero until the hero reference is accepted.

------------------------------------------------------------------------

# TASK 04 --- BUILD THE NEW 3D WORLD FOUNDATION

## Goal

Create the first real master 3D environment.

## Actions

Create a modular world, preferably:

``` text
src/components/3d/
  CyberSecurityWorld.tsx
  Environment.tsx
  Infrastructure.tsx
  NetworkTopology.tsx
  SecuritySystems.tsx
  LightingRig.tsx
  CameraSystem.tsx
```

Exact filenames may differ if the existing architecture has a better
organization.

Build:

-   dark environment
-   foreground beams
-   catwalk
-   distant towers
-   structural platforms
-   network conduits
-   basic security gateways
-   atmospheric fog
-   physically believable materials

At this stage:

**NO threat animation.**

**NO service cards.**

**NO giant hero text redesign.**

The goal is purely to prove that the environment itself feels 3D.

## Acceptance criteria

When animation is paused:

-   the scene still looks good
-   depth is obvious
-   foreground/midground/background are clear
-   architecture feels physical
-   the environment does not look like a flat background

------------------------------------------------------------------------

# TASK 05 --- BUILD THE NETWORK TOPOLOGY

## Goal

Make the cybersecurity world communicate through meaningful spatial
network infrastructure.

## Build

Nodes representing:

-   gateways
-   servers
-   protected sectors
-   data stores
-   cloud/infrastructure nodes
-   monitoring points

Connections should be:

-   actual 3D curves/tubes
-   depth-aware
-   partially occluded
-   connected to physical infrastructure

Do not make a flat wireframe.

## Data packets

Add a small number of packets.

Target:

``` text
5–15 active packets
```

Use:

-   cyan
-   blue
-   subtle teal

Packets must follow actual routes.

No random particles.

------------------------------------------------------------------------

# TASK 06 --- BUILD HERO UI INTEGRATION

## Goal

Stop the hero from looking like:

``` text
HTML
+
3D background
```

## UI

Use semantic HTML positioned as an information layer over the world.

Hero:

``` text
CYBRAVIONN

SECURE THE
DIGITAL FRONTIER.

Advanced cybersecurity solutions...

ENTER THE NETWORK →
```

Telemetry:

``` text
SYSTEM STATUS
SECURE

NETWORK
ONLINE

PROTECTED NODES
3.2K
```

Rules:

-   no giant opaque hero panel
-   no giant glass rectangle
-   no heavy blur over the environment
-   UI must preserve visibility of 3D world
-   typography should use strong hierarchy
-   telemetry can use monospace

The environment must visually continue behind the UI.

------------------------------------------------------------------------

# TASK 07 --- HERO CAMERA SYSTEM

## Goal

Make the user feel like they are moving through a real world.

Use one primary camera.

Define camera waypoints.

Example:

``` text
Hero start
  ↓
Approach
  ↓
Enter infrastructure
  ↓
Focus on network
  ↓
Transition toward threat route
```

Use smooth interpolation.

Mouse movement should provide only subtle physical parallax.

Avoid:

-   game-like camera movement
-   excessive shaking
-   fast spinning
-   forced motion sickness

The camera should feel cinematic.

------------------------------------------------------------------------

# TASK 08 --- CREATE CHAPTER 02 VISUAL CONCEPT: THE THREAT

Before implementation, generate an image.

### IMAGE GENERATION PROMPT

``` text
Create a cinematic continuation of the CYBRAVIONN cybersecurity infrastructure world.

The camera is deep inside the same futuristic digital-security city from the previous chapter.

Show a healthy protected network infrastructure in the environment.

A single malicious intrusion is entering the network.

Represent the threat as a controlled red data vector traveling through a physical network conduit.

The threat should be visually distinct but not huge.

The surrounding infrastructure remains primarily:
black,
dark navy,
electric blue,
cyan,
subtle indigo.

Only the intrusion uses controlled red.

Show the network reacting:
small warning indicators,
localized red illumination,
affected network nodes,
security monitoring activation.

Do NOT turn the entire scene red.

The threat must feel like an event occurring inside a functioning digital ecosystem.

Strong foreground/midground/background depth.
Large architectural structures.
Physical conduits.
Server towers.
Security gateways.
Atmospheric fog.

No giant red explosion.
No generic cyberpunk.
No random particles.

The scene should feel like:
"a real cyber attack entering a real digital infrastructure."

16:9.
```

------------------------------------------------------------------------

# TASK 09 --- IMPLEMENT THE THREAT CHAPTER

## Goal

Create a meaningful event.

Flow:

``` text
Healthy network
      ↓
Threat enters
      ↓
Network detects anomaly
      ↓
Warning state
      ↓
Camera follows intrusion
```

Technical behavior:

-   threat packet follows a defined conduit
-   affected node changes state
-   local warning lights activate
-   nearby data traffic changes
-   red light is localized
-   environment remains mostly dark/blue/cyan

Do not use giant explosions.

------------------------------------------------------------------------

# TASK 10 --- CREATE CHAPTER 03 VISUAL CONCEPT: DEFENSE

### IMAGE GENERATION PROMPT

``` text
Create a cinematic continuation of the CYBRAVIONN digital-security world.

The environment is the same massive futuristic cybersecurity infrastructure.

The malicious red intrusion is approaching a protected security boundary.

Show a sophisticated physical cybersecurity defense gateway.

The gateway should feel architectural and engineered:
large structural frames,
layered security barriers,
embedded sensors,
data conduits,
monitoring lights.

A controlled cyan/blue defensive field activates between the security structures.

The red threat approaches the barrier and is stopped.

The visual story is:
THREAT IN → SECURITY DETECTS → DEFENSE ACTIVATES → THREAT BLOCKED.

Do not create a superhero shield.
Do not create a magical fantasy barrier.

Make it feel like advanced enterprise cybersecurity infrastructure.

Environment:
dark titanium,
graphite,
navy,
electric blue,
cyan,
small red threat,
subtle amber indicators.

Strong physical depth.
Foreground structural occlusion.
Midground defense gateway.
Background infrastructure fading into fog.

Premium enterprise technology aesthetic.
Cinematic lighting.
Realistic materials.
16:9.
```

------------------------------------------------------------------------

# TASK 11 --- IMPLEMENT DEFENSE

Create:

-   security gateway
-   detection state
-   defense barrier
-   threat impact
-   neutralization
-   recovery state

Animation sequence:

``` text
Threat
  ↓
Detection pulse
  ↓
Security gateway activates
  ↓
Defense field forms
  ↓
Threat is blocked
  ↓
Red activity disappears
  ↓
Network returns to blue/cyan healthy state
```

Keep the animation sophisticated.

No explosive game VFX.

------------------------------------------------------------------------

# TASK 12 --- CREATE CHAPTER 04 VISUAL CONCEPT: THE ECOSYSTEM

### IMAGE GENERATION PROMPT

``` text
Create a wide cinematic reveal of the CYBRAVIONN cybersecurity infrastructure world.

The camera has pulled far back from the previous security gateway.

Reveal a gigantic interconnected digital-security ecosystem.

Show:

multiple data towers,
cloud infrastructure,
server sectors,
network bridges,
security zones,
protected data facilities,
monitoring systems,
communication corridors,
multiple interconnected network layers.

The environment should feel enormous.

The viewer should understand that the security gateway seen earlier was only one part of a much larger protected ecosystem.

Use deep black and navy architecture.

Use electric blue for infrastructure.

Use cyan for active network routes.

Use subtle indigo for intelligence systems.

Use tiny teal indicators for healthy systems.

No excessive glow.

Strong atmospheric depth.
Distant structures fade into fog.

Cinematic aerial/architectural camera.

Do not create a globe.

Do not create a flat network diagram.

Do not use random particles.

The result should feel like a gigantic living cybersecurity infrastructure.

16:9.
```

------------------------------------------------------------------------

# TASK 13 --- IMPLEMENT THE ECOSYSTEM REVEAL

Camera pulls back dramatically but smoothly.

Reveal:

-   multiple infrastructure zones
-   cloud/data sectors
-   network topology
-   security perimeters
-   protected systems

The earlier chapters must feel spatially connected to this view.

The user should understand:

> "Everything I have seen so far exists inside this larger system."

------------------------------------------------------------------------

# TASK 14 --- CREATE CHAPTER 05 SERVICE ECOSYSTEM

## Goal

Turn existing service content into part of the world.

Existing business services must not be discarded.

Represent service areas as physical/visual sectors.

Possible mapping:

``` text
GRC / Compliance
    → Governance sector

VAPT
    → Assessment / testing sector

Cloud Security
    → Cloud infrastructure sector

AI Security / Governance
    → Intelligence sector

Threat Intelligence / SOC
    → Monitoring sector

Security Architecture
    → Core architecture sector
```

The exact service labels must come from the existing project content.

Do not invent business claims.

------------------------------------------------------------------------

# TASK 15 --- SERVICE ECOSYSTEM IMAGE

### IMAGE GENERATION PROMPT

``` text
Create a premium cinematic visualization of a futuristic cybersecurity service ecosystem.

Use the same CYBRAVIONN digital-security world.

Show six distinct but interconnected physical sectors inside the infrastructure.

Each sector represents a cybersecurity capability:

Governance / GRC
Vulnerability Assessment
Cloud Security
AI Security
Threat Intelligence / SOC
Security Architecture

Do not display these as six flat website cards.

Represent them as six physical infrastructure sectors or nodes connected to a central protected network.

Each sector should have its own subtle visual identity while sharing the same design language.

Use:
dark titanium,
deep navy,
electric blue,
electric cyan,
restrained indigo,
subtle teal.

Use small labels only where needed.

The scene should feel like one large cybersecurity city with specialized districts.

Do not make six floating holographic cards.

Do not make six glowing circles.

Strong 3D spatial relationships.
Architectural depth.
Physical infrastructure.
Cinematic lighting.
16:9.
```

------------------------------------------------------------------------

# TASK 16 --- IMPLEMENT SERVICE INTERACTION

When a user hovers/focuses a capability:

-   node highlights
-   camera subtly moves toward it
-   relevant UI information appears
-   other areas dim slightly
-   network relationship remains visible

The interaction should feel like inspecting infrastructure.

Do not create a completely separate page for every service unless
existing routing/business requirements demand it.

Existing service modal/dossier functionality should remain available.

------------------------------------------------------------------------

# TASK 17 --- CASE STUDIES / TRUST / STANDARDS

These sections can use a more conventional HTML information layer.

Do not force everything into 3D.

Use:

-   transparent dark surfaces
-   minimal borders
-   subtle depth
-   strong typography
-   small technical metadata
-   occasional environmental 3D continuation

The rule:

``` text
Important visual storytelling → 3D
Detailed reading → HTML
```

Case studies should remain readable.

Standards and certifications should remain scannable.

Do not turn every piece of information into a floating hologram.

------------------------------------------------------------------------

# TASK 18 --- CREATE FINAL CTA VISUAL CONCEPT

### IMAGE GENERATION PROMPT

``` text
Create the final calm state of the CYBRAVIONN cybersecurity infrastructure world.

The viewer is looking across a vast protected digital-security ecosystem after all threats have been neutralized.

The environment is calm and stable.

Show:

large dark infrastructure,
distant data towers,
secure network pathways,
blue/cyan active systems,
subtle indigo intelligence structures,
soft atmospheric depth.

No red threat activity.

The network is healthy.

Use a cinematic elevated viewpoint.

The environment should communicate:
security,
resilience,
trust,
scale,
stability,
continuity.

Leave a clean visual area for:

SECURE WHAT MATTERS.
Build resilient digital infrastructure.
GET IN TOUCH

The CTA should feel like the natural conclusion of the journey.

Premium enterprise cybersecurity.
Sophisticated.
Minimal.
Cinematic.
16:9.
```

------------------------------------------------------------------------

# TASK 19 --- FINAL CTA IMPLEMENTATION

Camera reaches a calm elevated state.

Network remains active.

Threat activity is absent.

CTA appears as an integrated information layer.

Do not make it look like a generic SaaS footer.

------------------------------------------------------------------------

# TASK 20 --- RESTRUCTURE EXISTING 2D SECTIONS

Now audit every existing section.

For each section decide:

``` text
KEEP AS HTML
MOVE INTO 3D WORLD
HYBRID
REMOVE
MERGE
```

### Keep primarily HTML

-   detailed FAQ
-   contact form
-   detailed compliance information
-   training content
-   long-form insights
-   detailed case-study information

### Hybrid

-   services
-   trust/standards
-   case studies
-   industry solutions
-   why choose us

### Primarily 3D

-   hero
-   threat visualization
-   defense story
-   ecosystem reveal

Do not convert everything into 3D.

------------------------------------------------------------------------

# TASK 21 --- REMOVE OLD VISUAL NOISE

After the new world is stable, remove/reduce legacy effects.

Potential candidates:

-   generic star field
-   random particle cloud
-   abstract dodecahedrons
-   meaningless toruses
-   redundant radar rings
-   excessive bloom
-   chromatic aberration
-   orange/cyan random objects
-   giant wireframe globe
-   decorative geometry with no semantic meaning

Do not remove anything merely because it is old.

Remove it if the new design replaces its purpose.

------------------------------------------------------------------------

# TASK 22 --- NAVIGATION REDESIGN

Navigation should feel like navigating a system.

Keep it simple.

Possible structure:

``` text
CYBRAVIONN

01 WORLD
02 THREAT
03 DEFENSE
04 ECOSYSTEM
05 CAPABILITIES
06 CONTACT
```

or a minimal navigation plus chapter indicator.

Do not overload the navbar.

Existing routing to Compliance and Training must continue to work.

------------------------------------------------------------------------

# TASK 23 --- CHAPTER INDICATOR

Create a subtle persistent chapter indicator:

``` text
01 WORLD
02 THREAT
03 DEFENSE
04 ECOSYSTEM
05 CAPABILITIES
06 CONTACT
```

Current chapter is highlighted.

The indicator must be small and elegant.

Do not turn it into a large dashboard.

------------------------------------------------------------------------

# TASK 24 --- MASTER SCROLL TIMELINE

Create one coordinated scroll timeline.

Conceptually:

``` text
0.00 ── Hero / Digital World
0.20 ── Network exploration
0.35 ── Threat ingress
0.50 ── Detection
0.62 ── Defense
0.72 ── Ecosystem reveal
0.84 ── Capabilities
1.00 ── CTA
```

These percentages are starting points, not rigid requirements.

Camera movement, world state, and UI transitions must be synchronized.

Do not simply translate HTML sections upward while moving a background
camera.

------------------------------------------------------------------------

# TASK 25 --- PERFORMANCE PASS

Target:

-   smooth desktop performance
-   acceptable laptop performance
-   responsive fallback

Optimize:

-   draw calls
-   geometry count
-   lights
-   shadows
-   particles
-   post-processing
-   repeated structures

Use instancing where appropriate.

Avoid hundreds/thousands of independent meshes for repeated elements.

Create quality levels if necessary:

``` text
High
Medium
Low
```

Mobile should reduce:

-   background complexity
-   dynamic packets
-   shadows
-   post-processing
-   camera movement

Do not destroy the experience on mobile.

------------------------------------------------------------------------

# TASK 26 --- LIGHTING / MATERIAL POLISH

Tune:

-   roughness
-   metalness
-   emissive intensity
-   fog
-   exposure
-   shadow softness
-   bloom threshold
-   contrast

The scene must look good with animation paused.

If the scene only looks good when everything is glowing/moving, the
materials and lighting are not finished.

------------------------------------------------------------------------

# TASK 27 --- TYPOGRAPHY / UI POLISH

Use:

### Main typography

Clean modern sans-serif.

### Technical typography

Monospace.

Avoid excessive futuristic fonts.

Hero heading should be:

-   large
-   confident
-   readable
-   restrained

Technical labels should be:

-   small
-   precise
-   spaced
-   low-noise

------------------------------------------------------------------------

# TASK 28 --- ACCESSIBILITY / SEMANTIC CONTENT

Even though the experience is highly visual:

-   maintain semantic headings
-   maintain keyboard navigation
-   maintain accessible buttons
-   maintain readable contrast
-   provide meaningful labels
-   do not place essential information only inside WebGL
-   maintain contact form accessibility
-   maintain routing/accessibility for Compliance and Training

Three.js is an enhancement, not the only source of information.

------------------------------------------------------------------------

# TASK 29 --- RESPONSIVE DESIGN

Desktop:

Full cinematic experience.

Tablet:

Reduce environment density and camera movement.

Mobile:

Use a simplified 3D environment.

Priorities on mobile:

1.  content
2.  navigation
3.  CTA
4.  simplified 3D atmosphere

Do not attempt to force the desktop scene unchanged onto mobile.

------------------------------------------------------------------------

# TASK 30 --- FINAL QA

Verify:

## Visual

-   Does it feel like a 3D world?
-   Does the user feel physically inside it?
-   Is there obvious depth?
-   Are foreground objects close?
-   Are background objects distant?
-   Is there real occlusion?
-   Does the environment have scale?

## Color

-   Is cyan controlled?
-   Is blue meaningful?
-   Is red reserved for threats?
-   Are dark areas still dark?
-   Is the environment visually rich without rainbow neon?

## Story

-   Does the user understand the sequence?
-   Digital world → threat → defense → ecosystem → capabilities → CTA

## UX

-   Is text readable?
-   Are buttons obvious?
-   Can users navigate normally?
-   Does the 3D experience interfere with content?

## Performance

-   No excessive GPU load
-   No runaway animation loops
-   No unnecessary particle systems
-   No memory leaks
-   Proper renderer cleanup

## Technical

Run:

``` bash
npm run lint
npm run build
```

Fix all TypeScript/build errors before considering the redesign
complete.

------------------------------------------------------------------------

# 7. GLOBAL "DO NOT" LIST

Never do these just because they look futuristic:

``` text
NO random glowing circles
NO random torus rings
NO random dodecahedrons
NO giant globe
NO giant reactor
NO rainbow particles
NO excessive cyan
NO full-screen neon glow
NO giant opaque glass cards
NO fake 3D perspective applied to 2D cards
NO meaningless network lines
NO excessive HUD
NO chromatic aberration everywhere
NO constant camera spinning
NO excessive motion
NO giant explosions
NO gaming UI
NO crypto aesthetic
NO generic AI template aesthetic
```

------------------------------------------------------------------------

# 8. VISUAL QUALITY RULE

Every visual element must answer:

> "Why does this exist?"

Examples:

### Good

``` text
Data conduit
→ carries data

Security gateway
→ represents security control

Node
→ represents infrastructure

Data packet
→ represents network activity

Red anomaly
→ represents threat

Defense barrier
→ represents protection
```

### Bad

``` text
Random ring
→ looks cool

Random particle
→ fills empty space

Random glowing triangle
→ looks futuristic
```

If an element has no semantic or compositional purpose, remove it.

------------------------------------------------------------------------

# 9. IMPLEMENTATION SAFETY RULE

Before any major architecture rewrite:

Create a git checkpoint/commit.

Suggested checkpoints:

``` text
redesign/baseline
redesign/world-foundation
redesign/hero
redesign/threat
redesign/defense
redesign/ecosystem
redesign/services
redesign/polish
redesign/final
```

Do not make a destructive change without a rollback point.

------------------------------------------------------------------------

# 10. DEFINITION OF DONE

The redesign is complete only when the experience feels fundamentally
different from the original site.

### Original mental model

``` text
NAVBAR
↓
HTML HERO
↓
HTML CARDS
↓
HTML SECTIONS
↓
3D BACKGROUND
```

### Target mental model

``` text
                3D WORLD
                   │
       ┌───────────┼───────────┐
       │           │           │
     WORLD       THREAT      DEFENSE
       │           │           │
       └───────────┼───────────┘
                   │
               ECOSYSTEM
                   │
             CAPABILITIES
                   │
                CTA
```

The user should feel:

> "I am moving through CYBRAVIONN's digital security infrastructure."

Not:

> "I am scrolling through a website with 3D effects."

------------------------------------------------------------------------

# 11. EXECUTION ORDER SUMMARY

Execute exactly in this order:

``` text
TASK 01  → Audit / baseline
TASK 02  → Master world concept image
TASK 03  → Hero concept image
TASK 04  → 3D world foundation
TASK 05  → Network topology
TASK 06  → Hero UI
TASK 07  → Camera
TASK 08  → Threat concept image
TASK 09  → Threat implementation
TASK 10  → Defense concept image
TASK 11  → Defense implementation
TASK 12  → Ecosystem concept image
TASK 13  → Ecosystem implementation
TASK 14  → Service ecosystem architecture
TASK 15  → Service ecosystem concept image
TASK 16  → Service interaction
TASK 17  → HTML content integration
TASK 18  → Final CTA concept image
TASK 19  → CTA implementation
TASK 20  → Existing section restructuring
TASK 21  → Remove legacy visual noise
TASK 22  → Navigation redesign
TASK 23  → Chapter indicator
TASK 24  → Master scroll timeline
TASK 25  → Performance
TASK 26  → Lighting/material polish
TASK 27  → Typography/UI polish
TASK 28  → Accessibility
TASK 29  → Responsive
TASK 30  → Final QA
```

------------------------------------------------------------------------

# 12. MOST IMPORTANT INSTRUCTION TO ANTIGRAVITY

**Do not rush.**

Do not execute all tasks automatically.

After each task:

``` text
STOP
REPORT
SHOW RESULT
WAIT
```

The visual direction must be approved at every major image/design
checkpoint.

If a generated image is weak, regenerate the concept before coding it.

If an implementation does not visually match the approved concept, stop
and fix the implementation before continuing.

The objective is not to add more 3D.

The objective is to make CYBRAVIONN feel like a **real navigable 3D
cybersecurity world**.
