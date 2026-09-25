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

// Zero-allocation flow field scalar calculation
function computeFlowVelocity(
  x: number,
  y: number,
  z: number,
  time: number,
  out: { x: number; y: number; z: number }
): void {
  const scale = 0.12;
  const tx = x * scale + time * 0.06;
  const ty = y * scale + time * 0.04;
  const tz = z * scale + time * 0.05;

  out.x = pseudoNoise3D(tx, ty + 1.3, tz) * 0.008;
  out.y = pseudoNoise3D(tx + 3.7, ty, tz + 2.1) * 0.006;
  out.z = pseudoNoise3D(tx + 7.1, ty + 5.3, tz) * 0.005;
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
      uOpacity: { value: isDarkMode ? 0.15 : 0.20 },
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
        ? vec3(0.01, 0.05, 0.20 + hueShift * 0.1) // Deep cyber sapphire
        : vec3(0.02, 0.06, 0.18);
      vec3 colorB = uDarkMode > 0.5
        ? vec3(0.002, 0.015, 0.06) // Deep obsidian space
        : vec3(0.01, 0.03, 0.10);

      float radial = 1.0 - smoothstep(0.0, 0.75, dist);
      vec3 color = mix(colorB, colorA, radial);

      // Subtle pulsing
      float pulse = sin(uTime * 0.5) * 0.008 + 1.0;

      float alpha = radial * radial * (uDarkMode > 0.5 ? 0.04 : 0.015) * pulse;
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

    // Detect mobile or low-end device profile
    const isMobileDevice = typeof window !== 'undefined' && (
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );

    // =====================================================================
    // 1. SCENE, CAMERA, RENDERER + ADAPTIVE BLOOM POST-PROCESSING
    // =====================================================================
    const scene = new THREE.Scene();
    scene.fog = isDarkMode
      ? new THREE.FogExp2(0x02050e, 0.012)
      : new THREE.FogExp2(0xf1f5f9, 0.010);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.2, 9.2);

    const maxDpr = isMobileDevice ? 1.25 : 1.5;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobileDevice, // Disable MSAA on high-DPI mobile to save fill-rate/memory
      alpha: true,
      powerPreference: isMobileDevice ? 'default' : 'high-performance',
      precision: isMobileDevice ? 'mediump' : 'highp',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDarkMode ? 0.95 : 1.05;
    container.appendChild(renderer.domElement);

    // Adaptive Bloom post-processing pipeline
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(
        window.innerWidth * (isMobileDevice ? 0.5 : 1),
        window.innerHeight * (isMobileDevice ? 0.5 : 1)
      ),
      isDarkMode ? (isMobileDevice ? 0.14 : 0.20) : (isMobileDevice ? 0.08 : 0.12),
      0.5,
      0.72
    );
    composer.addPass(bloomPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // =====================================================================
    // 2. LIGHTING SYSTEM (Refined Sapphire Blue + Subtle Cyber Accents)
    // =====================================================================
    const ambientLight = new THREE.AmbientLight(
      isDarkMode ? 0x0c1e36 : 0xd6e0eb,
      isDarkMode ? 0.70 : 1.2
    );
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(
      isDarkMode ? 0x3b82f6 : 0x1d4ed8,
      isDarkMode ? 1.2 : 1.5
    );
    dirLight1.position.set(8, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(
      isDarkMode ? 0x1d4ed8 : 0x4338ca,
      isDarkMode ? 0.8 : 1.1
    );
    dirLight2.position.set(-8, -6, 5);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(
      isDarkMode ? 0x1e40af : 0x2563eb,
      isDarkMode ? 0.6 : 0.8,
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

    // — Animated flow-field particle system (Adaptive scale) —
    const particleCount = isMobileDevice ? 130 : 250;
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

      const isThreat = Math.random() > 0.92;
      const c = isThreat ? orange : Math.random() > 0.45 ? cyan : blue;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

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
      isHome ? 4.2 : isAI ? 3.6 : 4.4,
      isHome ? 0.20 : isAI ? 0.25 : -0.5,
      isHome ? 0.0 : isAI ? 0.0 : -2.0
    );
    globeGroup.scale.setScalar(isHome ? 1.0 : isAI ? 0.95 : 0.8);
    universeGroup.add(globeGroup);

    const globeRadius = 2.0;

    // 1. Outer Geodesic Wireframe Shield
    const icoGeo = new THREE.IcosahedronGeometry(globeRadius, isMobileDevice ? 2 : 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x3b82f6 : 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: isDarkMode ? 0.13 : 0.08,
    });
    const wireSphere = new THREE.Mesh(icoGeo, wireMat);
    globeGroup.add(wireSphere);

    // 2. Inner Hex Shield
    const innerGeo = new THREE.IcosahedronGeometry(globeRadius * 0.88, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x2563eb : 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: isDarkMode ? 0.10 : 0.06,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 3. Adaptive Solid Core
    const solidCoreGeo = new THREE.SphereGeometry(globeRadius * 0.82, isMobileDevice ? 20 : 28, isMobileDevice ? 20 : 28);
    const solidCoreMat = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x02040a : 0x0284c7,
      roughness: isDarkMode ? 0.2 : 0.9,
      metalness: isDarkMode ? 0.95 : 0.1,
      transparent: true,
      opacity: isDarkMode ? 0.14 : 0.03,
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
      opacity: isDarkMode ? 0.38 : 0.30,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.onBeforeRender = (_renderer, _scene, cam) => {
      shieldMesh.quaternion.copy(cam.quaternion);
    };
    globeGroup.add(shieldMesh);

    // Center Core Light
    const coreGlowLight = new THREE.PointLight(
      isDarkMode ? 0x3b82f6 : 0x1d4ed8,
      isDarkMode ? 0.65 : 0.45,
      globeRadius * 2.2
    );
    globeGroup.add(coreGlowLight);

    // 4. Point cloud nodes on globe surface (Adaptive nodes)
    const nodeCount = isMobileDevice ? 150 : 260;
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
      size: 0.048,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const globeNodes = new THREE.Points(nodeGeo, nodeMat);
    globeGroup.add(globeNodes);

    // 5. Multi-Inclination Orbiting Satellites
    const satGroup = new THREE.Group();
    globeGroup.add(satGroup);
    const satelliteCount = isMobileDevice ? 4 : 7;
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.08, 0);
    const blueSatMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.9,
    });
    const orangeSatMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
    });

    for (let i = 0; i < satelliteCount; i++) {
      const isBlueSat = i % 2 === 0;
      const satMesh = new THREE.Mesh(satGeo, isBlueSat ? blueSatMat : orangeSatMat);
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
    const maxDataStreams = isMobileDevice ? 3 : 6;

    for (let i = 0; i < maxDataStreams && globeNodeVectors.length >= 2; i++) {
      const start = globeNodeVectors[i % globeNodeVectors.length];
      const end = globeNodeVectors[(i + 4) % globeNodeVectors.length];
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.4);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(isMobileDevice ? 24 : 40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xf97316 : 0x2563eb,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      const packets: DataStream['packets'] = [];
      const packetCountForArc = isMobileDevice ? 1 : 2;
      const packetGeo = new THREE.SphereGeometry(0.035, 6, 6);
      for (let j = 0; j < packetCountForArc; j++) {
        const isOrange = i % 3 === 0;
        const packetMat = new THREE.MeshStandardMaterial({
          color: isOrange ? 0xf97316 : 0x3b82f6,
          emissive: isOrange ? 0xf97316 : 0x3b82f6,
          emissiveIntensity: 1.4,
          transparent: true,
          opacity: 0.65,
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
    // LAYER 2.2: TWIN PRIMARY CYBER DEFENSE GLOBE (Synchronized Parallax)
    // =====================================================================
    const globe2Group = new THREE.Group();
    universeGroup.add(globe2Group);

    const globe2Radius = 1.90;

    // 1. Outer Geodesic Wireframe Shield for Globe 2
    const icoGeo2 = new THREE.IcosahedronGeometry(globe2Radius, isMobileDevice ? 2 : 3);
    const wireMat2 = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x60a5fa : 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: isDarkMode ? 0.11 : 0.07,
    });
    const wireSphere2 = new THREE.Mesh(icoGeo2, wireMat2);
    globe2Group.add(wireSphere2);

    // 2. Inner Hex Shield for Globe 2
    const innerGeo2 = new THREE.IcosahedronGeometry(globe2Radius * 0.88, 2);
    const innerMat2 = new THREE.MeshBasicMaterial({
      color: isDarkMode ? 0x3b82f6 : 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: isDarkMode ? 0.09 : 0.05,
    });
    const innerSphere2 = new THREE.Mesh(innerGeo2, innerMat2);
    globe2Group.add(innerSphere2);

    // 3. Adaptive Solid Core for Globe 2
    const solidCoreGeo2 = new THREE.SphereGeometry(globe2Radius * 0.82, isMobileDevice ? 20 : 28, isMobileDevice ? 20 : 28);
    const solidCoreMat2 = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0x02040a : 0x0284c7,
      roughness: isDarkMode ? 0.2 : 0.9,
      metalness: isDarkMode ? 0.95 : 0.1,
      transparent: true,
      opacity: isDarkMode ? 0.12 : 0.03,
      depthWrite: false,
    });
    const solidCore2 = new THREE.Mesh(solidCoreGeo2, solidCoreMat2);
    globe2Group.add(solidCore2);

    // 3.5 Center Inner Cyber Shield for Globe 2
    const shieldWidth2 = globe2Radius * 0.72;
    const shieldHeight2 = globe2Radius * 0.78;
    const shieldGeo2 = new THREE.PlaneGeometry(shieldWidth2, shieldHeight2);
    const shieldMat2 = new THREE.MeshBasicMaterial({
      map: shieldTex,
      transparent: true,
      opacity: isDarkMode ? 0.32 : 0.25,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const shieldMesh2 = new THREE.Mesh(shieldGeo2, shieldMat2);
    shieldMesh2.onBeforeRender = (_renderer, _scene, cam) => {
      shieldMesh2.quaternion.copy(cam.quaternion);
    };
    globe2Group.add(shieldMesh2);

    // Center Core Light for Globe 2
    const coreGlowLight2 = new THREE.PointLight(
      isDarkMode ? 0x3b82f6 : 0x1d4ed8,
      isDarkMode ? 0.50 : 0.35,
      globe2Radius * 2.2
    );
    globe2Group.add(coreGlowLight2);

    // 4. Point cloud nodes on Globe 2 surface (Adaptive nodes)
    const nodeCount2 = isMobileDevice ? 120 : 200;
    const nodePositions2 = new Float32Array(nodeCount2 * 3);
    const nodeColors2 = new Float32Array(nodeCount2 * 3);

    for (let i = 0; i < nodeCount2; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount2);
      const theta = Math.sqrt(nodeCount2 * Math.PI) * phi;
      const r = globe2Radius * (1 + (Math.random() - 0.5) * 0.03);
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      nodePositions2[i * 3] = x;
      nodePositions2[i * 3 + 1] = y;
      nodePositions2[i * 3 + 2] = z;

      const c = i % 18 === 0 ? orange : i % 2 === 0 ? cyan : blue;
      nodeColors2[i * 3] = c.r;
      nodeColors2[i * 3 + 1] = c.g;
      nodeColors2[i * 3 + 2] = c.b;
    }

    const nodeGeo2 = new THREE.BufferGeometry();
    nodeGeo2.setAttribute('position', new THREE.BufferAttribute(nodePositions2, 3));
    nodeGeo2.setAttribute('color', new THREE.BufferAttribute(nodeColors2, 3));
    const nodeMat2 = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.40,
      blending: THREE.AdditiveBlending,
    });
    const globeNodes2 = new THREE.Points(nodeGeo2, nodeMat2);
    globe2Group.add(globeNodes2);

    // 5. Orbiting Satellites on Globe 2
    const satGroup2 = new THREE.Group();
    globe2Group.add(satGroup2);
    const satelliteCount2 = isMobileDevice ? 3 : 5;
    const satellites2: THREE.Mesh[] = [];
    for (let i = 0; i < satelliteCount2; i++) {
      const isBlueSat = i % 2 === 0;
      const satMesh2 = new THREE.Mesh(satGeo, isBlueSat ? blueSatMat : orangeSatMat);
      satellites2.push(satMesh2);
      satGroup2.add(satMesh2);
    }

    // 6. Dual Core Inter-Globe Quantum Synapse Laser Beam (Zero-allocation fixed buffer)
    const dualCoreCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(4.2, 0.20, 0),
      new THREE.Vector3(0.0, 3.4, -1.0),
      new THREE.Vector3(-4.5, 0.40, -3.2)
    );
    const synapseResolution = isMobileDevice ? 24 : 36;
    const dualCorePts = dualCoreCurve.getPoints(synapseResolution);
    const dualCorePosArray = new Float32Array((synapseResolution + 1) * 3);
    for (let p = 0; p <= synapseResolution; p++) {
      const pt = dualCorePts[p] || dualCorePts[dualCorePts.length - 1];
      dualCorePosArray[p * 3] = pt.x;
      dualCorePosArray[p * 3 + 1] = pt.y;
      dualCorePosArray[p * 3 + 2] = pt.z;
    }
    const dualCoreLineGeo = new THREE.BufferGeometry();
    dualCoreLineGeo.setAttribute('position', new THREE.BufferAttribute(dualCorePosArray, 3));
    const dualCoreLineMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: isDarkMode ? 0.12 : 0.06,
      blending: THREE.AdditiveBlending,
    });
    const dualCoreLine = new THREE.Line(dualCoreLineGeo, dualCoreLineMat);
    universeGroup.add(dualCoreLine);

    const dualCorePacketGeo = new THREE.SphereGeometry(0.045, 6, 6);
    const dualCorePacketMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.75,
    });
    const dualCorePacket = new THREE.Mesh(dualCorePacketGeo, dualCorePacketMat);
    universeGroup.add(dualCorePacket);
    let dualCoreProgress = 0;

    // =====================================================================
    // LAYER 2.5: MULTI-DEPTH SENTINEL GLOBE CONSTELLATION NETWORK
    // =====================================================================
    interface SentinelGlobe {
      group: THREE.Group;
      basePos: THREE.Vector3;
      rotSpeedY: number;
      rotSpeedX: number;
      wireMesh: THREE.Mesh;
      innerMesh: THREE.Mesh;
      depthFactor: number;
      satellites: THREE.Mesh[];
    }

    const allSentinelConfigs = [
      {
        pos: new THREE.Vector3(-10.5, 5.5, -11.0),
        scale: 0.32,
        opacity: isDarkMode ? 0.08 : 0.04,
        rotY: 0.06,
        rotX: 0.02,
        depthFactor: 0.028,
        hasSatellites: true,
      },
      {
        pos: new THREE.Vector3(-9.8, -5.8, -12.5),
        scale: 0.28,
        opacity: isDarkMode ? 0.07 : 0.03,
        rotY: -0.05,
        rotX: 0.02,
        depthFactor: 0.022,
        hasSatellites: true,
      },
      {
        pos: new THREE.Vector3(11.0, 5.2, -13.0),
        scale: 0.30,
        opacity: isDarkMode ? 0.07 : 0.03,
        rotY: -0.04,
        rotX: 0.03,
        depthFactor: 0.020,
        hasSatellites: false,
      },
      {
        pos: new THREE.Vector3(10.2, -5.6, -14.0),
        scale: 0.26,
        opacity: isDarkMode ? 0.06 : 0.03,
        rotY: 0.04,
        rotX: -0.02,
        depthFactor: 0.016,
        hasSatellites: false,
      },
      {
        pos: new THREE.Vector3(0.0, 7.8, -17.5),
        scale: 0.22,
        opacity: isDarkMode ? 0.05 : 0.02,
        rotY: 0.03,
        rotX: 0.01,
        depthFactor: 0.012,
        hasSatellites: false,
      },
      {
        pos: new THREE.Vector3(1.5, -8.2, -18.5),
        scale: 0.20,
        opacity: isDarkMode ? 0.04 : 0.02,
        rotY: -0.03,
        rotX: 0.01,
        depthFactor: 0.010,
        hasSatellites: false,
      },
      {
        pos: new THREE.Vector3(-14.0, 0.5, -16.5),
        scale: 0.22,
        opacity: isDarkMode ? 0.05 : 0.02,
        rotY: 0.05,
        rotX: -0.01,
        depthFactor: 0.012,
        hasSatellites: true,
      },
    ];

    // Only render top 3 sentinels on mobile to cut draw calls and matrix math
    const sentinelConfigs = isMobileDevice ? allSentinelConfigs.slice(0, 3) : allSentinelConfigs;
    const sentinelGlobes: SentinelGlobe[] = [];

    sentinelConfigs.forEach((cfg) => {
      const sGroup = new THREE.Group();
      sGroup.position.copy(cfg.pos);
      sGroup.scale.setScalar(cfg.scale);
      universeGroup.add(sGroup);

      const sWireMat = new THREE.MeshBasicMaterial({
        color: isDarkMode ? 0x3b82f6 : 0x1d4ed8,
        wireframe: true,
        transparent: true,
        opacity: cfg.opacity * 0.75,
      });
      const sWire = new THREE.Mesh(icoGeo, sWireMat);
      sGroup.add(sWire);

      const sInnerMat = new THREE.MeshBasicMaterial({
        color: isDarkMode ? 0x2563eb : 0x4f46e5,
        wireframe: true,
        transparent: true,
        opacity: cfg.opacity * 0.50,
      });
      const sInner = new THREE.Mesh(innerGeo, sInnerMat);
      sGroup.add(sInner);

      const sNodeMat = new THREE.PointsMaterial({
        size: 0.038,
        vertexColors: true,
        transparent: true,
        opacity: cfg.opacity * 1.4,
        blending: THREE.AdditiveBlending,
      });
      const sNodes = new THREE.Points(nodeGeo, sNodeMat);
      sGroup.add(sNodes);

      const sShieldMat = new THREE.MeshBasicMaterial({
        map: shieldTex,
        transparent: true,
        opacity: isDarkMode ? Math.min(0.26, cfg.opacity * 1.8) : cfg.opacity * 1.2,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
      });
      const sShield = new THREE.Mesh(shieldGeo, sShieldMat);
      sShield.onBeforeRender = (_renderer, _scene, cam) => {
        sShield.quaternion.copy(cam.quaternion);
      };
      sGroup.add(sShield);

      const sCoreLight = new THREE.PointLight(
        isDarkMode ? 0x3b82f6 : 0x1d4ed8,
        cfg.opacity * 2.0,
        globeRadius * 2.0
      );
      sGroup.add(sCoreLight);

      const sSats: THREE.Mesh[] = [];
      if (cfg.hasSatellites) {
        const satLimit = isMobileDevice ? 1 : 2;
        for (let s = 0; s < satLimit; s++) {
          const sSat = new THREE.Mesh(satGeo, blueSatMat);
          sSats.push(sSat);
          sGroup.add(sSat);
        }
      }

      sentinelGlobes.push({
        group: sGroup,
        basePos: cfg.pos.clone(),
        rotSpeedY: cfg.rotY,
        rotSpeedX: cfg.rotX,
        wireMesh: sWire,
        innerMesh: sInner,
        depthFactor: cfg.depthFactor,
        satellites: sSats,
      });
    });

    // Inter-Globe Constellation Data Backbone Laser Beams
    interface InterNodeBeam {
      curve: THREE.QuadraticBezierCurve3;
      arcLine: THREE.Line;
      packetMesh: THREE.Mesh;
      progress: number;
      speed: number;
    }

    const interNodeBeams: InterNodeBeam[] = [];
    sentinelConfigs.forEach((cfg, idx) => {
      const start = new THREE.Vector3(2.8, 0.15, 0);
      const end = cfg.pos.clone();
      const mid = start.clone().add(end).multiplyScalar(0.5).add(new THREE.Vector3(0, 1.0, 1.2));
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const pts = curve.getPoints(isMobileDevice ? 20 : 32);
      const bGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const bMat = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: isDarkMode ? 0.06 : 0.03,
        blending: THREE.AdditiveBlending,
      });
      const arcLine = new THREE.Line(bGeo, bMat);
      universeGroup.add(arcLine);

      const pGeo = new THREE.SphereGeometry(0.04, 6, 6);
      const pMat = new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        emissive: 0x60a5fa,
        emissiveIntensity: 1.2,
        transparent: true,
        opacity: 0.6,
      });
      const packetMesh = new THREE.Mesh(pGeo, pMat);
      universeGroup.add(packetMesh);

      interNodeBeams.push({
        curve,
        arcLine,
        packetMesh,
        progress: 0.25 * idx,
        speed: 0.002 + idx * 0.0008,
      });
    });

    // =====================================================================
    // VOLUMETRIC GLOW AURA (radial gradient)
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
        float dist = length(vUv - center) * 2.0;
        float glow = exp(-dist * dist * 3.2);

        vec3 blueCore = uDarkMode > 0.5 ? vec3(0.05, 0.45, 0.95) : vec3(0.01, 0.42, 0.88);
        vec3 blueMid  = uDarkMode > 0.5 ? vec3(0.04, 0.18, 0.70) : vec3(0.03, 0.14, 0.60);
        vec3 blueEdge = uDarkMode > 0.5 ? vec3(0.01, 0.06, 0.30) : vec3(0.01, 0.05, 0.20);

        vec3 color = mix(blueCore, blueMid, smoothstep(0.0, 0.50, dist));
        color = mix(color, blueEdge, smoothstep(0.45, 0.90, dist));

        float pulse = sin(uTime * 0.6) * 0.06 + 1.0;
        float alpha = glow * (uDarkMode > 0.5 ? 0.010 : 0.006) * pulse;

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
    glowPlane.onBeforeRender = (_renderer, _scene, cam) => {
      glowPlane.quaternion.copy(cam.quaternion);
    };
    globeGroup.add(glowPlane);

    // =====================================================================
    // SCROLL-DRIVEN 3D CAMERA & SPATIAL WAYPOINTS
    // =====================================================================
    const cameraWaypoints = [
      {
        scroll: 0.0,
        pos: new THREE.Vector3(0, 0.2, 9.2),
        look: new THREE.Vector3(0.0, 0, 0),
        globePos: new THREE.Vector3(4.2, 0.20, 0.0),
        globeScale: 1.0,
        globe2Pos: new THREE.Vector3(-4.5, 0.40, -3.2),
        globe2Scale: 0.92,
      },
      {
        scroll: 0.25,
        pos: new THREE.Vector3(1.8, -0.4, 6.5),
        look: new THREE.Vector3(0.6, 0, 0),
        globePos: new THREE.Vector3(4.6, -0.4, -1.8),
        globeScale: 0.95,
        globe2Pos: new THREE.Vector3(-4.8, 0.8, -4.0),
        globe2Scale: 0.86,
      },
      {
        scroll: 0.50,
        pos: new THREE.Vector3(-1.8, -0.4, 5.5),
        look: new THREE.Vector3(-0.6, -0.5, -2),
        globePos: new THREE.Vector3(-4.4, -0.6, -2.5),
        globeScale: 0.85,
        globe2Pos: new THREE.Vector3(4.4, 0.6, -4.5),
        globe2Scale: 0.80,
      },
      {
        scroll: 0.75,
        pos: new THREE.Vector3(0, 2.5, 6.8),
        look: new THREE.Vector3(0, 1.0, -4.0),
        globePos: new THREE.Vector3(4.2, 1.4, -3.8),
        globeScale: 0.80,
        globe2Pos: new THREE.Vector3(-4.2, -1.4, -5.2),
        globe2Scale: 0.75,
      },
      {
        scroll: 1.0,
        pos: new THREE.Vector3(0, 0, 6.0),
        look: new THREE.Vector3(0, 0, 0),
        globePos: new THREE.Vector3(4.0, 0.1, -1.8),
        globeScale: 0.85,
        globe2Pos: new THREE.Vector3(-4.2, 0.4, -3.6),
        globe2Scale: 0.80,
      },
    ];

    let currentScrollProgress = 0;
    let targetScrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    let responsiveScale1 = 1.0;
    let responsiveScale2 = 0.90;
    let responsiveOffset1X = 0;
    let responsiveOffset2X = 0;

    const updateResponsiveFactors = () => {
      const w = window.innerWidth;
      if (w < 640) {
        responsiveScale1 = 0.62;
        responsiveScale2 = 0.50;
        responsiveOffset1X = -0.5;
        responsiveOffset2X = 0.4;
      } else if (w < 1024) {
        responsiveScale1 = 0.80;
        responsiveScale2 = 0.70;
        responsiveOffset1X = -0.25;
        responsiveOffset2X = 0.2;
      } else {
        responsiveScale1 = 1.0;
        responsiveScale2 = 0.90;
        responsiveOffset1X = 0;
        responsiveOffset2X = 0;
      }
    };
    updateResponsiveFactors();

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
      updateResponsiveFactors();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    // Zero-allocation reusable camera target interpolation structures
    const scratchTarget = {
      pos: new THREE.Vector3(),
      look: new THREE.Vector3(),
      globePos: new THREE.Vector3(),
      globeScale: 1.0,
      globe2Pos: new THREE.Vector3(),
      globe2Scale: 1.0,
    };

    const updateCameraTarget = (t: number) => {
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

      scratchTarget.pos.lerpVectors(p1.pos, p2.pos, easeT);
      scratchTarget.look.lerpVectors(p1.look, p2.look, easeT);
      scratchTarget.globePos.lerpVectors(p1.globePos, p2.globePos, easeT);
      scratchTarget.globeScale = THREE.MathUtils.lerp(p1.globeScale, p2.globeScale, easeT);
      scratchTarget.globe2Pos.lerpVectors(p1.globe2Pos, p2.globe2Pos, easeT);
      scratchTarget.globe2Scale = THREE.MathUtils.lerp(p1.globe2Scale, p2.globe2Scale, easeT);
    };

    // =====================================================================
    // ZERO-ALLOCATION ANIMATION RENDER LOOP & TAB THROTTLING
    // =====================================================================
    let animationFrameId: number;
    let isTabVisible = !document.hidden;
    const clock = new THREE.Clock();
    const currentCameraPos = camera.position.clone();
    const currentCameraLook = new THREE.Vector3(0.5, 0, 0);

    // Pre-allocated scratch vectors to prevent runtime heap thrashing
    const scratchGlobe1TargetPos = new THREE.Vector3();
    const scratchGlobe2TargetPos = new THREE.Vector3();
    const scratchG1World = new THREE.Vector3();
    const scratchG2World = new THREE.Vector3();
    const scratchMidBridge = new THREE.Vector3();
    const flowVelocity = { x: 0, y: 0, z: 0 };

    const animate = () => {
      if (!isTabVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth scroll progress & mouse interpolation
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      updateCameraTarget(currentScrollProgress);
      currentCameraPos.lerp(scratchTarget.pos, 0.09);
      currentCameraLook.lerp(scratchTarget.look, 0.09);

      camera.position.copy(currentCameraPos);
      camera.position.x += mouseX * 0.4;
      camera.position.y -= mouseY * 0.3;
      camera.lookAt(currentCameraLook);

      // --- Globe 1 Animation & Sync ---
      globeGroup.rotation.y = elapsed * 0.10 + currentScrollProgress * Math.PI;
      globeGroup.rotation.x = currentScrollProgress * 0.5;
      wireSphere.rotation.x = elapsed * 0.04;
      innerSphere.rotation.y = -elapsed * 0.06;

      scratchGlobe1TargetPos.copy(scratchTarget.globePos);
      scratchGlobe1TargetPos.x += responsiveOffset1X;
      globeGroup.position.lerp(scratchGlobe1TargetPos, 0.08);
      globeGroup.position.x += mouseX * 0.2;
      globeGroup.position.y -= mouseY * 0.15;
      globeGroup.scale.setScalar(scratchTarget.globeScale * responsiveScale1);

      // --- Globe 2 (Twin Defense Core) Animation & Sync ---
      globe2Group.rotation.y = elapsed * 0.08 + currentScrollProgress * Math.PI;
      globe2Group.rotation.x = currentScrollProgress * 0.4;
      wireSphere2.rotation.x = -elapsed * 0.035;
      innerSphere2.rotation.y = elapsed * 0.05;

      scratchGlobe2TargetPos.copy(scratchTarget.globe2Pos);
      scratchGlobe2TargetPos.x += responsiveOffset2X;
      globe2Group.position.lerp(scratchGlobe2TargetPos, 0.08);
      globe2Group.position.x += mouseX * 0.12;
      globe2Group.position.y -= mouseY * 0.09;
      globe2Group.scale.setScalar(scratchTarget.globe2Scale * responsiveScale2);

      // Globe 1 Satellites
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

      // Globe 2 Satellites
      satellites2.forEach((sat, i) => {
        const satAngle = elapsed * (0.28 + i * 0.07) + (i * Math.PI) / 2.5;
        const satRadius = globe2Radius * (1.25 + (i % 2) * 0.2);
        sat.position.set(
          Math.cos(satAngle) * satRadius,
          Math.sin(satAngle * 1.2) * (satRadius * 0.5),
          Math.sin(satAngle) * satRadius
        );
        sat.rotation.x += 0.03;
        sat.rotation.y += 0.04;
      });

      // Update Dual-Core Quantum Synapse Bridge (In-place buffer update)
      dualCoreProgress = (dualCoreProgress + 0.005) % 1;
      scratchG1World.copy(globeGroup.position);
      scratchG2World.copy(globe2Group.position);
      scratchMidBridge.copy(scratchG1World).add(scratchG2World).multiplyScalar(0.5);
      scratchMidBridge.y += 3.2;
      scratchMidBridge.z -= 0.5;

      dualCoreCurve.v0.copy(scratchG1World);
      dualCoreCurve.v1.copy(scratchMidBridge);
      dualCoreCurve.v2.copy(scratchG2World);

      const bridgePts = dualCoreCurve.getPoints(synapseResolution);
      const bridgeArray = dualCoreLineGeo.attributes.position.array as Float32Array;
      for (let p = 0; p <= synapseResolution; p++) {
        const pt = bridgePts[p] || bridgePts[bridgePts.length - 1];
        bridgeArray[p * 3] = pt.x;
        bridgeArray[p * 3 + 1] = pt.y;
        bridgeArray[p * 3 + 2] = pt.z;
      }
      dualCoreLineGeo.attributes.position.needsUpdate = true;

      const packetPos = dualCoreCurve.getPointAt(dualCoreProgress);
      dualCorePacket.position.copy(packetPos);

      // ── Animated Data-Stream Packets (Globe 1) ──
      dataStreams.forEach((stream) => {
        stream.packets.forEach((packet) => {
          packet.progress += packet.speed;
          if (packet.progress > 1) packet.progress -= 1;
          const pt = stream.curve.getPointAt(packet.progress);
          packet.mesh.position.copy(pt);
          const mat = packet.mesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 1.2 + Math.sin(elapsed * 4 + packet.progress * 10) * 0.4;
        });
      });

      // ── Sentinel Globes Constellation Animation ──
      sentinelGlobes.forEach((sg, i) => {
        sg.group.rotation.y = elapsed * sg.rotSpeedY + currentScrollProgress * 0.4;
        sg.group.rotation.x = elapsed * sg.rotSpeedX;
        sg.wireMesh.rotation.y = -elapsed * 0.03;
        sg.innerMesh.rotation.x = elapsed * 0.02;

        sg.group.position.x = sg.basePos.x + mouseX * sg.depthFactor * 16;
        sg.group.position.y = sg.basePos.y - mouseY * sg.depthFactor * 12 + Math.sin(elapsed * 0.6 + i * 1.5) * 0.12;

        sg.satellites.forEach((sat, si) => {
          const sAngle = elapsed * (0.35 + si * 0.10) + (si * Math.PI) / 1.5;
          const sRad = globeRadius * (1.25 + si * 0.18);
          sat.position.set(
            Math.cos(sAngle) * sRad,
            Math.sin(sAngle * 1.2) * (sRad * 0.45),
            Math.sin(sAngle) * sRad
          );
          sat.rotation.x += 0.03;
        });
      });

      // ── Inter-Globe Data Stream Packets ──
      interNodeBeams.forEach((beam) => {
        beam.progress += beam.speed;
        if (beam.progress > 1) beam.progress -= 1;
        const pt = beam.curve.getPointAt(beam.progress);
        beam.packetMesh.position.copy(pt);
      });

      // ── Volumetric Glow Gradient & Core Lights Update ──
      glowMat.uniforms.uTime.value = elapsed;
      coreGlowLight.intensity = (isDarkMode ? 0.65 : 0.45) + Math.sin(elapsed * 2.0) * 0.10;
      coreGlowLight2.intensity = (isDarkMode ? 0.50 : 0.35) + Math.sin(elapsed * 2.0 + 1.0) * 0.08;

      // ── Zero-Allocation Flow-Field Particle Animation ──
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const px = posArray[ix];
        const py = posArray[ix + 1];
        const pz = posArray[ix + 2];

        computeFlowVelocity(px, py, pz, elapsed, flowVelocity);
        particleVelocities[ix] += flowVelocity.x;
        particleVelocities[ix + 1] += flowVelocity.y;
        particleVelocities[ix + 2] += flowVelocity.z;

        particleVelocities[ix] *= 0.98;
        particleVelocities[ix + 1] *= 0.98;
        particleVelocities[ix + 2] *= 0.98;

        posArray[ix] += particleVelocities[ix];
        posArray[ix + 1] += particleVelocities[ix + 1];
        posArray[ix + 2] += particleVelocities[ix + 2];

        if (Math.abs(posArray[ix]) > 27) posArray[ix] *= -0.8;
        if (Math.abs(posArray[ix + 1]) > 19) posArray[ix + 1] *= -0.8;
        if (Math.abs(posArray[ix + 2]) > 13) posArray[ix + 2] *= -0.8;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // ── Atmospheric Haze Uniform Updates ──
      const curHazeMat = hazeMesh.material as THREE.ShaderMaterial;
      curHazeMat.uniforms.uTime.value = elapsed;
      curHazeMat.uniforms.uScrollProgress.value = currentScrollProgress;

      deepVoidGroup.position.x = mouseX * 0.02;
      deepVoidGroup.position.y = -mouseY * 0.015;

      composer.render();
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        clock.start();
        animationFrameId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
          ? 'radial-gradient(circle at 100% 100%, rgba(255, 107, 0, 0.20) 0%, rgba(249, 115, 22, 0.12) 5%, rgba(234, 88, 12, 0.06) 12%, rgba(234, 88, 12, 0.02) 20%, transparent 30%), radial-gradient(ellipse at 15% 45%, rgba(37, 99, 235, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 30%, #02040b 0%, #010206 60%, #000000 100%)'
          : 'radial-gradient(circle at 100% 100%, rgba(255, 107, 0, 0.14) 0%, rgba(249, 115, 22, 0.08) 5%, rgba(234, 88, 12, 0.04) 12%, rgba(234, 88, 12, 0.01) 20%, transparent 28%), radial-gradient(ellipse at 15% 25%, rgba(2, 132, 199, 0.04) 0%, transparent 50%), linear-gradient(180deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      }}
      aria-hidden="true"
    />
  );
};
