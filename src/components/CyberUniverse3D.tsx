import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

interface CyberUniverse3DProps {
  currentView?: string;
  isDarkMode?: boolean;
}

/* ─────────────────── Noise helper (Simplex-like 3D) ─────────────────── */
function pseudoNoise3D(x: number, y: number, z: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

function flowField(x: number, y: number, z: number, time: number): THREE.Vector3 {
  const scale = 0.12;
  const tx = x * scale + time * 0.06;
  const ty = y * scale + time * 0.04;
  const tz = z * scale + time * 0.05;

  return new THREE.Vector3(
    pseudoNoise3D(tx, ty + 1.3, tz) * 0.008,
    pseudoNoise3D(tx + 3.7, ty, tz + 2.1) * 0.006,
    pseudoNoise3D(tx + 7.1, ty + 5.3, tz) * 0.005,
  );
}

/* ─────── Fading Horizon Grid — ShaderMaterial ─────── */
function createFadingGrid(isDarkMode: boolean): THREE.Mesh {
  const gridSize = 80;
  const gridDivisions = 60;
  const lineColor = isDarkMode
    ? new THREE.Color(0x2563eb)
    : new THREE.Color(0x1d4ed8);

  const vertexShader = `
    varying vec3 vWorldPos;
    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uGridSize;
    uniform float uDivisions;
    varying vec3 vWorldPos;

    void main() {
      float cellSize = uGridSize / uDivisions;
      vec2 grid = abs(fract(vWorldPos.xz / cellSize - 0.5) - 0.5) / fwidth(vWorldPos.xz / cellSize);
      float line = min(grid.x, grid.y);
      float lineAlpha = 1.0 - min(line, 1.0);

      // Distance-based fade
      float dist = length(vWorldPos.xz);
      float fade = 1.0 - smoothstep(8.0, 38.0, dist);

      // Center glow
      float centerGlow = exp(-dist * 0.06) * 0.3;

      float alpha = lineAlpha * fade * uOpacity + centerGlow * fade * uOpacity * 0.5;
      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  const gridMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uColor: { value: lineColor },
      uOpacity: { value: isDarkMode ? 0.22 : 0.30 },
      uGridSize: { value: gridSize },
      uDivisions: { value: gridDivisions },
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
  });

  const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, 1, 1);
  gridGeometry.rotateX(-Math.PI / 2);
  const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
  gridMesh.position.set(0, -6.8, 0);
  return gridMesh;
}

/* ─────── Atmospheric Haze Plane ─────── */
function createAtmosphereHaze(isDarkMode: boolean): THREE.Mesh {
  const hazeVS = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const hazeFS = `
    uniform float uTime;
    uniform float uScrollProgress;
    uniform float uDarkMode;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5, 0.45);
      float dist = length(vUv - center);

      // Scroll-driven hue shift between cyber blue and warm amber/orange
      float hueShift = sin(uScrollProgress * 3.14159) * 0.15;

      vec3 colorA = uDarkMode > 0.5
        ? vec3(0.01, 0.08, 0.28 + hueShift * 0.2) // Deep cyber blue
        : vec3(0.02, 0.08, 0.22);
      vec3 colorB = uDarkMode > 0.5
        ? vec3(0.32 + hueShift * 0.1, 0.10, 0.01) // Deep cyber orange
        : vec3(0.18, 0.06, 0.02);

      float radial = 1.0 - smoothstep(0.0, 0.75, dist);
      vec3 color = mix(colorB, colorA, radial);

      // Subtle pulsing
      float pulse = sin(uTime * 0.5) * 0.008 + 1.0;

      float alpha = radial * radial * radial * (uDarkMode > 0.5 ? 0.08 : 0.025) * pulse;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const hazeMat = new THREE.ShaderMaterial({
    vertexShader: hazeVS,
    fragmentShader: hazeFS,
    uniforms: {
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uDarkMode: { value: isDarkMode ? 1.0 : 0.0 },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const hazeGeo = new THREE.PlaneGeometry(55, 38, 1, 1);
  const hazeMesh = new THREE.Mesh(hazeGeo, hazeMat);
  hazeMesh.position.set(0, 0, -22);
  return hazeMesh;
}

export const CyberUniverse3D: React.FC<CyberUniverse3DProps> = ({ currentView = 'home', isDarkMode = true }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // =====================================================================
    // 1. SCENE, CAMERA, RENDERER + BLOOM POST-PROCESSING
    // =====================================================================
    const scene = new THREE.Scene();
    scene.fog = isDarkMode
      ? new THREE.FogExp2(0x02050e, 0.022)
      : new THREE.FogExp2(0xf1f5f9, 0.015);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.2, 9.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDarkMode ? 0.95 : 1.05;
    container.appendChild(renderer.domElement);

    // Bloom post-processing pipeline
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      isDarkMode ? 0.35 : 0.18,   // strength
      0.6,                        // radius
      0.72                        // threshold
    );
    composer.addPass(bloomPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // =====================================================================
    // 2. LIGHTING SYSTEM (tuned for balanced subtle contrast)
    // =====================================================================
    const ambientLight = new THREE.AmbientLight(
      isDarkMode ? 0x060f1e : 0xd6e0eb,
      isDarkMode ? 0.85 : 1.4
    );
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(
      isDarkMode ? 0x3b82f6 : 0x1d4ed8,
      isDarkMode ? 1.8 : 2.2
    );
    dirLight1.position.set(8, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(
      isDarkMode ? 0x1d4ed8 : 0x4338ca,
      isDarkMode ? 1.3 : 1.7
    );
    dirLight2.position.set(-8, -6, 5);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(
      isDarkMode ? 0xf97316 : 0xea580c,
      isDarkMode ? 2.5 : 2.0,
      45
    );
    rimLight.position.set(0, -6, -8);
    scene.add(rimLight);

    // Color Palette: Deep Black, Royal/Sapphire Blue & Cyber Orange
    const cyan = isDarkMode ? new THREE.Color(0x60a5fa) : new THREE.Color(0x2563eb);
    const blue = isDarkMode ? new THREE.Color(0x2563eb) : new THREE.Color(0x1d4ed8);
    const orange = isDarkMode ? new THREE.Color(0xf97316) : new THREE.Color(0xea580c);

    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // =====================================================================
    // LAYER 1: DEEP VOID — Fading Grid + Flow-Field Particles + Haze
    // =====================================================================
    const deepVoidGroup = new THREE.Group();
    deepVoidGroup.position.set(0, 0, -26);
    universeGroup.add(deepVoidGroup);

    // — Fading horizon grid (custom shader) —
    const fadingGrid = createFadingGrid(isDarkMode);
    fadingGrid.position.set(0, -6.8, 0);
    deepVoidGroup.add(fadingGrid);

    // — Animated flow-field particle system —
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleLifetimes = new Float32Array(particleCount);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 50;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 22;

      particleVelocities[i * 3] = 0;
      particleVelocities[i * 3 + 1] = 0;
      particleVelocities[i * 3 + 2] = 0;

      particleLifetimes[i] = Math.random();
      particleSizes[i] = 0.03 + Math.random() * 0.05;

      // Mostly cyan/blue with occasional orange sparks
      const isThreat = Math.random() > 0.92;
      const c = isThreat ? orange : Math.random() > 0.45 ? cyan : blue;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    // Custom particle shader with distance-based fade
    const particleVS = `
      attribute float size;
      varying vec3 vColor;
      varying float vDist;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vDist = -mvPosition.z;
        gl_PointSize = size * (200.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const particleFS = `
      varying vec3 vColor;
      varying float vDist;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float soft = 1.0 - smoothstep(0.2, 0.5, d);
        // Fade by distance
        float distFade = 1.0 - smoothstep(5.0, 35.0, vDist);
        gl_FragColor = vec4(vColor, soft * distFade * 0.7);
      }
    `;

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: particleVS,
      fragmentShader: particleFS,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const flowParticles = new THREE.Points(particleGeo, particleMat);
    deepVoidGroup.add(flowParticles);

    // — Atmospheric haze plane (behind globe) —
    const hazeMesh = createAtmosphereHaze(isDarkMode);
    universeGroup.add(hazeMesh);

    // =====================================================================
    // LAYER 2: THE SIGNATURE 3D CYBER DEFENSE GLOBE
    // =====================================================================
    const globeGroup = new THREE.Group();
    const isHome = currentView === 'home';
    const isAI = currentView === 'ai';

    globeGroup.position.set(
      isHome ? 2.8 : isAI ? 2.4 : 3.6,
      isHome ? 0.15 : isAI ? 0.25 : -0.5,
      isHome ? 0.0 : isAI ? 0.0 : -2.0
    );
    globeGroup.scale.setScalar(isHome ? 1.0 : isAI ? 0.95 : 0.8);
    universeGroup.add(globeGroup);

    const globeRadius = 2.0;

    // 1. Outer Geodesic Wireframe Shield
    const icoGeo = new THREE.IcosahedronGeometry(globeRadius, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x3b82f6 : 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: isDarkMode ? 0.22 : 0.12,
    });
    const wireSphere = new THREE.Mesh(icoGeo, wireMat);
    globeGroup.add(wireSphere);

    // 2. Inner Hex Shield
    const innerGeo = new THREE.IcosahedronGeometry(globeRadius * 0.88, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x2563eb : 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: isDarkMode ? 0.18 : 0.10,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 3. Adaptive Solid Core (translucent to reveal inner emblem)
    const solidCoreGeo = new THREE.SphereGeometry(globeRadius * 0.82, 32, 32);
    const solidCoreMat = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x02040a : 0x0284c7,
      roughness: isDarkMode ? 0.2 : 0.9,
      metalness: isDarkMode ? 0.95 : 0.1,
      transparent: true,
      opacity: isDarkMode ? 0.25 : 0.05,
      depthWrite: false,
    });
    const solidCore = new THREE.Mesh(solidCoreGeo, solidCoreMat);
    globeGroup.add(solidCore);

    // 3.5 Center Inner Cyber Shield (~35% globe diameter)
    const textureLoader = new THREE.TextureLoader();
    const shieldTex = textureLoader.load('/shield-cyber.png');
    shieldTex.colorSpace = THREE.SRGBColorSpace;

    const shieldWidth = globeRadius * 0.72;
    const shieldHeight = globeRadius * 0.78;
    const shieldGeo = new THREE.PlaneGeometry(shieldWidth, shieldHeight);
    const shieldMat = new THREE.MeshBasicMaterial({
      map: shieldTex,
      transparent: true,
      opacity: isDarkMode ? 1.0 : 0.88,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.onBeforeRender = (_renderer, _scene, cam) => {
      shieldMesh.quaternion.copy(cam.quaternion);
    };
    globeGroup.add(shieldMesh);

    // Center Core Lights to illuminate dual gold/cyan shield from inside
    const coreGlowLight = new THREE.PointLight(
      isDarkMode ? 0x3b82f6 : 0x1d4ed8,
      isDarkMode ? 2.8 : 1.8,
      globeRadius * 2.2
    );
    globeGroup.add(coreGlowLight);

    const coreAmberLight = new THREE.PointLight(
      0xf97316,
      isDarkMode ? 2.5 : 1.5,
      globeRadius * 1.6
    );
    globeGroup.add(coreAmberLight);

    // 4. Point cloud nodes on globe surface (380 nodes)
    const nodeCount = 380;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);
    const globeNodeVectors: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = globeRadius * (1 + (Math.random() - 0.5) * 0.03);
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      if (i % 14 === 0) {
        globeNodeVectors.push(new THREE.Vector3(x, y, z));
      }

      const c = i % 15 === 0 ? orange : i % 2 === 0 ? cyan : blue;
      nodeColors[i * 3] = c.r;
      nodeColors[i * 3 + 1] = c.g;
      nodeColors[i * 3 + 2] = c.b;
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const globeNodes = new THREE.Points(nodeGeo, nodeMat);
    globeGroup.add(globeNodes);

    // 5. Multi-Inclination Orbiting Satellites (7 Satellites)
    const satGroup = new THREE.Group();
    globeGroup.add(satGroup);
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 7; i++) {
      const isBlueSat = i % 2 === 0;
      const satMesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.08, 0),
        new THREE.MeshStandardMaterial({
          color: isBlueSat ? 0x3b82f6 : 0xf97316,
          emissive: isBlueSat ? 0x3b82f6 : 0xf97316,
          emissiveIntensity: 2.5,
        })
      );
      satellites.push(satMesh);
      satGroup.add(satMesh);
    }

    // 6. Animated Data-Stream Trails (Bezier Arcs with flowing packets)
    interface DataStream {
      curve: THREE.QuadraticBezierCurve3;
      arcLine: THREE.Line;
      packets: { progress: number; speed: number; mesh: THREE.Mesh }[];
    }

    const dataStreams: DataStream[] = [];

    for (let i = 0; i < 7 && globeNodeVectors.length >= 2; i++) {
      const start = globeNodeVectors[i % globeNodeVectors.length];
      const end = globeNodeVectors[(i + 4) % globeNodeVectors.length];
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.4);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(48);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xf97316 : 0x2563eb,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Create 2–3 data packets per arc
      const packets: DataStream['packets'] = [];
      const packetCountForArc = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < packetCountForArc; j++) {
        const packetGeo = new THREE.SphereGeometry(0.035, 6, 6);
        const isOrange = i % 3 === 0;
        const packetMat = new THREE.MeshStandardMaterial({
          color: isOrange ? 0xf97316 : 0x3b82f6,
          emissive: isOrange ? 0xf97316 : 0x3b82f6,
          emissiveIntensity: 3.0,
          transparent: true,
          opacity: 0.9,
        });
        const packetMesh = new THREE.Mesh(packetGeo, packetMat);
        globeGroup.add(packetMesh);
        packets.push({
          progress: j / packetCountForArc,
          speed: 0.003 + Math.random() * 0.004,
          mesh: packetMesh,
        });
      }

      dataStreams.push({ curve, arcLine, packets });
    }

    // =====================================================================
    // VOLUMETRIC GLOW AURA (radial gradient — no hard edges)
    // =====================================================================
    const glowVS = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const glowFS = `
      uniform float uTime;
      uniform float uDarkMode;
      varying vec2 vUv;

      void main() {
        vec2 center = vec2(0.5, 0.5);
        float dist = length(vUv - center) * 2.0; // 0 at center, 1 at edge

        // Smooth exponential falloff — no hard edges
        float glow = exp(-dist * dist * 3.2);

        // Multi-color gradient: core electric blue → mid blue → outer cyber orange
        vec3 blueCore   = uDarkMode > 0.5 ? vec3(0.05, 0.50, 1.0) : vec3(0.01, 0.42, 0.88);
        vec3 blueMid    = uDarkMode > 0.5 ? vec3(0.08, 0.24, 0.85) : vec3(0.05, 0.18, 0.70);
        vec3 orangeOut  = uDarkMode > 0.5 ? vec3(0.95, 0.45, 0.05) : vec3(0.85, 0.35, 0.02);

        vec3 color = mix(blueCore, blueMid, smoothstep(0.0, 0.45, dist));
        color = mix(color, orangeOut, smoothstep(0.40, 0.85, dist));

        // Subtle breathing pulse
        float pulse = sin(uTime * 0.6) * 0.08 + 1.0;

        float alpha = glow * (uDarkMode > 0.5 ? 0.09 : 0.035) * pulse;

        // Kill fully transparent fragments
        if (alpha < 0.002) discard;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const glowMat = new THREE.ShaderMaterial({
      vertexShader: glowVS,
      fragmentShader: glowFS,
      uniforms: {
        uTime: { value: 0 },
        uDarkMode: { value: isDarkMode ? 1.0 : 0.0 },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const glowPlaneGeo = new THREE.PlaneGeometry(9, 9, 1, 1);
    const glowPlane = new THREE.Mesh(glowPlaneGeo, glowMat);
    // Billboard: always faces camera via onBeforeRender
    glowPlane.onBeforeRender = (_renderer, _scene, cam) => {
      glowPlane.quaternion.copy(cam.quaternion);
    };
    globeGroup.add(glowPlane);

    // =====================================================================
    // SCROLL-DRIVEN 3D CAMERA & SPATIAL WAYPOINTS (unchanged)
    // =====================================================================
    const cameraWaypoints = [
      { scroll: 0.0,  pos: new THREE.Vector3(0, 0.2, 9.2),    look: new THREE.Vector3(0.5, 0, 0),     globePos: new THREE.Vector3(2.8, 0.15, 0),     globeScale: 1.0 },
      { scroll: 0.25, pos: new THREE.Vector3(2.6, -0.4, 6.2),  look: new THREE.Vector3(1.2, 0, 0),     globePos: new THREE.Vector3(3.2, -0.3, -2.0),  globeScale: 0.95 },
      { scroll: 0.50, pos: new THREE.Vector3(-2.8, -0.4, 5.0), look: new THREE.Vector3(-1.5, -0.5, -2), globePos: new THREE.Vector3(-3.0, -0.5, -3.0), globeScale: 0.85 },
      { scroll: 0.75, pos: new THREE.Vector3(0, 2.5, 6.8),    look: new THREE.Vector3(0, 1.0, -4.0),   globePos: new THREE.Vector3(0, 1.2, -4.5),      globeScale: 0.80 },
      { scroll: 1.0,  pos: new THREE.Vector3(0, 0, 6.0),      look: new THREE.Vector3(0, 0, 0),        globePos: new THREE.Vector3(2.4, 0, -2.0),      globeScale: 0.85 },
    ];

    let currentScrollProgress = 0;
    let targetScrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        targetScrollProgress = Math.min(Math.max(window.scrollY / docHeight, 0), 1);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    const getCurrentCameraTarget = (t: number) => {
      let idx = 0;
      for (let i = 0; i < cameraWaypoints.length - 1; i++) {
        if (t >= cameraWaypoints[i].scroll && t <= cameraWaypoints[i + 1].scroll) {
          idx = i;
          break;
        }
      }
      const p1 = cameraWaypoints[idx];
      const p2 = cameraWaypoints[Math.min(idx + 1, cameraWaypoints.length - 1)];
      const segmentT = p2.scroll === p1.scroll ? 0 : (t - p1.scroll) / (p2.scroll - p1.scroll);
      const easeT = segmentT * segmentT * (3 - 2 * segmentT);

      const curPos = new THREE.Vector3().lerpVectors(p1.pos, p2.pos, easeT);
      const curLook = new THREE.Vector3().lerpVectors(p1.look, p2.look, easeT);
      const curGlobePos = new THREE.Vector3().lerpVectors(p1.globePos, p2.globePos, easeT);
      const curGlobeScale = THREE.MathUtils.lerp(p1.globeScale, p2.globeScale, easeT);

      return { pos: curPos, look: curLook, globePos: curGlobePos, globeScale: curGlobeScale };
    };

    // =====================================================================
    // ANIMATION RENDER LOOP
    // =====================================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const currentCameraPos = camera.position.clone();
    const currentCameraLook = new THREE.Vector3(0.5, 0, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth scroll progress & mouse interpolation
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const camTarget = getCurrentCameraTarget(currentScrollProgress);
      currentCameraPos.lerp(camTarget.pos, 0.09);
      currentCameraLook.lerp(camTarget.look, 0.09);

      camera.position.copy(currentCameraPos);
      camera.position.x += mouseX * 0.4;
      camera.position.y -= mouseY * 0.3;
      camera.lookAt(currentCameraLook);

      // Globe continuous rotation & scroll response
      globeGroup.rotation.y = elapsed * 0.10 + currentScrollProgress * Math.PI;
      globeGroup.rotation.x = currentScrollProgress * 0.5;
      wireSphere.rotation.x = elapsed * 0.04;
      innerSphere.rotation.y = -elapsed * 0.06;

      // Smoothly update globe position and scale based on scroll
      globeGroup.position.lerp(camTarget.globePos, 0.08);
      globeGroup.position.x += mouseX * 0.2;
      globeGroup.position.y -= mouseY * 0.15;
      globeGroup.scale.setScalar(camTarget.globeScale);

      // Satellites orbiting in true 3D space
      satellites.forEach((sat, i) => {
        const satAngle = elapsed * (0.30 + i * 0.06) + (i * Math.PI) / 3.5;
        const satRadius = globeRadius * (1.3 + (i % 3) * 0.18);
        sat.position.set(
          Math.cos(satAngle) * satRadius,
          Math.sin(satAngle * 1.3) * (satRadius * 0.55),
          Math.sin(satAngle) * satRadius
        );
        sat.rotation.x += 0.03;
        sat.rotation.y += 0.04;
      });

      // ── Animated Data-Stream Packets ──
      dataStreams.forEach((stream) => {
        stream.packets.forEach((packet) => {
          packet.progress += packet.speed;
          if (packet.progress > 1) packet.progress -= 1;
          const pt = stream.curve.getPointAt(packet.progress);
          packet.mesh.position.copy(pt);
          // Pulse glow based on position
          const mat = packet.mesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 2.5 + Math.sin(elapsed * 4 + packet.progress * 10) * 1.0;
        });
      });

      // ── Volumetric Glow Gradient & Core Light Update ──
      glowMat.uniforms.uTime.value = elapsed;
      coreGlowLight.intensity = (isDarkMode ? 2.8 : 1.8) + Math.sin(elapsed * 2.0) * 0.4;
      coreAmberLight.intensity = (isDarkMode ? 2.5 : 1.5) + Math.cos(elapsed * 2.0) * 0.4;

      // ── Flow-Field Particle Animation ──
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const px = posArray[ix];
        const py = posArray[ix + 1];
        const pz = posArray[ix + 2];

        const flow = flowField(px, py, pz, elapsed);
        particleVelocities[ix] += flow.x;
        particleVelocities[ix + 1] += flow.y;
        particleVelocities[ix + 2] += flow.z;

        // Damping
        particleVelocities[ix] *= 0.98;
        particleVelocities[ix + 1] *= 0.98;
        particleVelocities[ix + 2] *= 0.98;

        posArray[ix] += particleVelocities[ix];
        posArray[ix + 1] += particleVelocities[ix + 1];
        posArray[ix + 2] += particleVelocities[ix + 2];

        // Boundary wrap
        if (Math.abs(posArray[ix]) > 27) posArray[ix] *= -0.8;
        if (Math.abs(posArray[ix + 1]) > 19) posArray[ix + 1] *= -0.8;
        if (Math.abs(posArray[ix + 2]) > 13) posArray[ix + 2] *= -0.8;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // ── Atmospheric Haze Uniform Updates ──
      const hazeMat = hazeMesh.material as THREE.ShaderMaterial;
      hazeMat.uniforms.uTime.value = elapsed;
      hazeMat.uniforms.uScrollProgress.value = currentScrollProgress;

      // Deep void subtle parallax
      deepVoidGroup.position.x = mouseX * 0.02;
      deepVoidGroup.position.y = -mouseY * 0.015;

      // Render through bloom composer
      composer.render();
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      composer.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [currentView, isDarkMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700"
      style={{
        background: isDarkMode
          ? 'radial-gradient(ellipse at 80% 20%, rgba(249, 115, 22, 0.08) 0%, transparent 45%), radial-gradient(ellipse at 20% 70%, rgba(37, 99, 235, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 30%, #030712 0%, #020408 60%, #000000 100%)'
          : 'radial-gradient(ellipse at 15% 15%, rgba(2, 132, 199, 0.05) 0%, transparent 45%), radial-gradient(ellipse at 85% 35%, rgba(249, 115, 22, 0.04) 0%, transparent 50%), linear-gradient(180deg, #edf2f7 0%, #e2e8f0 50%, #cbd5e1 100%)',
      }}
      aria-hidden="true"
    />
  );
};
