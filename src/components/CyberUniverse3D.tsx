import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CyberUniverse3DProps {
  currentView?: string;
}

export const CyberUniverse3D: React.FC<CyberUniverse3DProps> = ({ currentView = 'home' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & RENDERER SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070f, 0.042);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.4, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. LIGHTING SYSTEM (Physical Cyber Space)
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.0);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 3.5);
    dirLight1.position.set(6, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3b82f6, 2.5);
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0xa855f7, 4.0, 30);
    rimLight.position.set(0, -6, -4);
    scene.add(rimLight);

    const alertPointLight = new THREE.PointLight(0xf97316, 2.0, 15);
    alertPointLight.position.set(3, 1, 2);
    scene.add(alertPointLight);

    // 3. MASTER ENVIRONMENT GROUPS
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // --- LANDMARK 1: GLOBAL CYBER DEFENSE CORE (Globe at z = 0 to -1) ---
    const globeGroup = new THREE.Group();
    globeGroup.position.set(1.4, 0.1, 0);
    universeGroup.add(globeGroup);

    const globeRadius = 1.95;

    // Geodesic outer shield
    const icoGeo = new THREE.IcosahedronGeometry(globeRadius, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const wireSphere = new THREE.Mesh(icoGeo, wireMat);
    globeGroup.add(wireSphere);

    // Inner hex core
    const innerGeo = new THREE.IcosahedronGeometry(globeRadius * 0.88, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // Solid dark holographic glass center
    const solidCoreGeo = new THREE.SphereGeometry(globeRadius * 0.82, 32, 32);
    const solidCoreMat = new THREE.MeshStandardMaterial({
      color: 0x030712,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
    });
    const solidCore = new THREE.Mesh(solidCoreGeo, solidCoreMat);
    globeGroup.add(solidCore);

    // Point cloud nodes on globe surface
    const nodeCount = 380;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);
    const cyan = new THREE.Color(0x00f0ff);
    const blue = new THREE.Color(0x3b82f6);
    const orange = new THREE.Color(0xf97316);

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

      if (i % 12 === 0) {
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
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const globeNodes = new THREE.Points(nodeGeo, nodeMat);
    globeGroup.add(globeNodes);

    // Dynamic Orbital Defense Satellites
    const satGroup = new THREE.Group();
    globeGroup.add(satGroup);
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const satMesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.08, 0),
        new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0x00f0ff : 0xf97316,
          emissive: i % 2 === 0 ? 0x00f0ff : 0xf97316,
          emissiveIntensity: 2.5,
        })
      );
      satellites.push(satMesh);
      satGroup.add(satMesh);
    }

    // Great Circle Arcs linking major nodes
    const arcCurves: { curve: THREE.QuadraticBezierCurve3; mesh: THREE.Line; speed: number; progress: number }[] = [];
    const arcCount = 8;
    for (let i = 0; i < arcCount && globeNodeVectors.length >= 2; i++) {
      const start = globeNodeVectors[i % globeNodeVectors.length];
      const end = globeNodeVectors[(i + 4) % globeNodeVectors.length];
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius * 1.4);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(36);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xf97316 : 0x00f0ff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);
      arcCurves.push({ curve, mesh: arcLine, speed: 0.006 + Math.random() * 0.008, progress: Math.random() });
    }

    // --- LANDMARK 2: THREAT RADAR MATRIX (Positioned at x = -2.8, y = -1.2, z = -2.0) ---
    const radarGroup = new THREE.Group();
    radarGroup.position.set(-2.6, -0.6, -1.8);
    radarGroup.rotation.x = 0.55;
    radarGroup.rotation.y = 0.35;
    universeGroup.add(radarGroup);

    // Radar concentric glowing rings
    const ringRadii = [0.9, 1.6, 2.3, 3.0];
    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.015, r + 0.015, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === ringRadii.length - 1 ? 0xf97316 : 0x00f0ff,
        transparent: true,
        opacity: 0.35 - idx * 0.06,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      radarGroup.add(ringMesh);
    });

    // Radar Crosshairs
    const crosshairGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3.2, 0, 0),
      new THREE.Vector3(3.2, 0, 0),
      new THREE.Vector3(0, -3.2, 0),
      new THREE.Vector3(0, 3.2, 0),
    ]);
    const crosshairMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.25,
    });
    const crosshair = new THREE.LineSegments(crosshairGeo, crosshairMat);
    radarGroup.add(crosshair);

    // Radar Sweeping Scan Fan
    const sweepGeo = new THREE.CircleGeometry(3.0, 32, 0, Math.PI / 3);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const sweepFan = new THREE.Mesh(sweepGeo, sweepMat);
    radarGroup.add(sweepFan);

    // Radar 3D Blips (Threat targets)
    const blipGroup = new THREE.Group();
    radarGroup.add(blipGroup);
    const blipMeshes: { mesh: THREE.Mesh; baseScale: number; pulseSpeed: number }[] = [];
    const blipCoords = [
      { r: 1.2, theta: 0.8, color: 0xef4444 },
      { r: 2.1, theta: 2.4, color: 0xf97316 },
      { r: 1.8, theta: 4.1, color: 0x00f0ff },
      { r: 2.7, theta: 5.2, color: 0xef4444 },
    ];
    blipCoords.forEach((b) => {
      const bx = b.r * Math.cos(b.theta);
      const by = b.r * Math.sin(b.theta);
      const blip = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 16, 16),
        new THREE.MeshBasicMaterial({
          color: b.color,
          blending: THREE.AdditiveBlending,
        })
      );
      blip.position.set(bx, by, 0.05);
      blipGroup.add(blip);
      blipMeshes.push({ mesh: blip, baseScale: 1, pulseSpeed: 3 + Math.random() * 3 });
    });

    // --- LANDMARK 3: ENTERPRISE CLOUD INFRASTRUCTURE LATTICE (Positioned at y = 2.5, z = -4.5) ---
    const infraGroup = new THREE.Group();
    infraGroup.position.set(0, 1.8, -4.0);
    universeGroup.add(infraGroup);

    // Infrastructure nodes (Cloud, Gateway, Firewall, Auth, DB)
    const infraNodesData = [
      { name: 'Gateway', pos: new THREE.Vector3(0, 1.2, 0), color: 0x00f0ff, size: 0.35 },
      { name: 'WAF / Edge', pos: new THREE.Vector3(-2.2, 0.2, 0.8), color: 0xf97316, size: 0.28 },
      { name: 'Zero Trust Auth', pos: new THREE.Vector3(2.2, 0.2, 0.8), color: 0x3b82f6, size: 0.28 },
      { name: 'App Mesh', pos: new THREE.Vector3(-1.4, -1.2, -0.5), color: 0x00f0ff, size: 0.25 },
      { name: 'Quantum DB', pos: new THREE.Vector3(1.4, -1.2, -0.5), color: 0xa855f7, size: 0.3 },
      { name: 'SIEM Core', pos: new THREE.Vector3(0, -2.0, -1.2), color: 0x10b981, size: 0.32 },
    ];

    const infraNodeMeshes: THREE.Mesh[] = [];
    infraNodesData.forEach((node) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(node.size, node.size, node.size),
        new THREE.MeshStandardMaterial({
          color: node.color,
          emissive: node.color,
          emissiveIntensity: 1.8,
          wireframe: true,
        })
      );
      mesh.position.copy(node.pos);
      infraGroup.add(mesh);
      infraNodeMeshes.push(mesh);
    });

    // Infrastructure interconnecting laser links
    const infraConnections = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 5],
      [4, 5],
      [1, 2],
      [3, 4],
    ];
    const linkLines: THREE.Line[] = [];
    infraConnections.forEach(([i, j]) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        infraNodesData[i].pos,
        infraNodesData[j].pos,
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      infraGroup.add(line);
      linkLines.push(line);
    });

    // --- LANDMARK 4: ATTACK THREAT VECTOR PARTICLES (Shooting Streams) ---
    const threatStreamCount = 60;
    const threatGeo = new THREE.BufferGeometry();
    const threatPos = new Float32Array(threatStreamCount * 3);
    const threatVel: number[] = [];

    for (let i = 0; i < threatStreamCount; i++) {
      threatPos[i * 3] = (Math.random() - 0.5) * 16;
      threatPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      threatPos[i * 3 + 2] = -12 + Math.random() * 8;
      threatVel.push(0.04 + Math.random() * 0.08);
    }
    threatGeo.setAttribute('position', new THREE.BufferAttribute(threatPos, 3));
    const threatMat = new THREE.PointsMaterial({
      color: 0xef4444,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const threatParticles = new THREE.Points(threatGeo, threatMat);
    universeGroup.add(threatParticles);

    // --- DEEP CYBER SPACE BACKGROUND MATRIX (Dust & Coordinates) ---
    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 32;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      starPos[i * 3 + 2] = -22 + Math.random() * 26;

      const c = Math.random() > 0.7 ? orange : Math.random() > 0.3 ? cyan : blue;
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    universeGroup.add(starField);

    // 4. SCROLL & CAMERA INTERPOLATION SYSTEM
    // Target camera positions & lookAt points for scroll progression (0.0 to 1.0)
    const cameraWaypoints = [
      // 0.0 - 0.20: Hero (Orbiting Globe & Defensive Shield)
      { scroll: 0.0, pos: new THREE.Vector3(0, 0.4, 7.5), look: new THREE.Vector3(0.6, 0, 0) },
      // 0.25 - 0.45: Telemetry & Threat Ingress (Camera swoops in close right)
      { scroll: 0.28, pos: new THREE.Vector3(2.4, -0.6, 4.6), look: new THREE.Vector3(0.5, -0.2, 0) },
      // 0.50 - 0.70: Detection & Threat Radar (Camera swings left into 3D radar sweep)
      { scroll: 0.55, pos: new THREE.Vector3(-2.2, -0.3, 3.8), look: new THREE.Vector3(-1.8, -0.4, -1.0) },
      // 0.75 - 0.90: Cloud Infrastructure (Camera pulls high up with extreme perspective)
      { scroll: 0.80, pos: new THREE.Vector3(0, 2.6, 5.0), look: new THREE.Vector3(0, 1.2, -3.0) },
      // 0.95 - 1.00: Mainframe Advisory / Terminal (Lock onto core security mainframe)
      { scroll: 1.0, pos: new THREE.Vector3(0, 0, 4.5), look: new THREE.Vector3(0, 0, 0) },
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    // Helper: interpolate between camera waypoints
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
      const easeT = segmentT * segmentT * (3 - 2 * segmentT); // smooth cubic ease

      const curPos = new THREE.Vector3().lerpVectors(p1.pos, p2.pos, easeT);
      const curLook = new THREE.Vector3().lerpVectors(p1.look, p2.look, easeT);
      return { pos: curPos, look: curLook };
    };

    // 5. ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const currentCameraPos = camera.position.clone();
    const currentCameraLook = new THREE.Vector3(0.6, 0, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth lerp for scroll and mouse
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.06;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 1. Camera interpolation driven by scroll + subtle mouse parallax
      const camTarget = getCurrentCameraTarget(currentScrollProgress);
      const parallaxPos = camTarget.pos.clone().add(new THREE.Vector3(mouseX * 0.35, -mouseY * 0.25, 0));
      currentCameraPos.lerp(parallaxPos, 0.08);
      currentCameraLook.lerp(camTarget.look, 0.08);

      camera.position.copy(currentCameraPos);
      camera.lookAt(currentCameraLook);

      // 2. Rotate Cyber Globe & Shield Core
      globeGroup.rotation.y = elapsed * 0.12;
      wireSphere.rotation.x = elapsed * 0.05;
      innerSphere.rotation.y = -elapsed * 0.08;

      // Rotate orbital satellites
      satellites.forEach((sat, i) => {
        const satAngle = elapsed * (0.4 + i * 0.1) + (i * Math.PI) / 3;
        const satRadius = globeRadius * 1.35;
        sat.position.set(
          Math.cos(satAngle) * satRadius,
          Math.sin(satAngle * 1.2) * (satRadius * 0.45),
          Math.sin(satAngle) * satRadius
        );
        sat.rotation.x += 0.04;
        sat.rotation.y += 0.05;
      });

      // 3. Threat Radar rotation and blip pulse
      sweepFan.rotation.z = -elapsed * 1.8;
      blipMeshes.forEach((b, i) => {
        const s = b.baseScale + Math.sin(elapsed * b.pulseSpeed + i) * 0.35;
        b.mesh.scale.set(s, s, s);
      });

      // 4. Infrastructure node spin & link pulsation
      infraNodeMeshes.forEach((mesh, idx) => {
        mesh.rotation.x = elapsed * (0.2 + idx * 0.05);
        mesh.rotation.y = elapsed * (0.25 + idx * 0.05);
      });

      // 5. Threat particles stream
      const positions = threatParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < threatStreamCount; i++) {
        positions[i * 3 + 2] += threatVel[i];
        if (positions[i * 3 + 2] > 6) {
          positions[i * 3 + 2] = -14;
          positions[i * 3] = (Math.random() - 0.5) * 16;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        }
      }
      threatParticles.geometry.attributes.position.needsUpdate = true;

      // 6. Alert light pulsing
      alertPointLight.intensity = 2.0 + Math.sin(elapsed * 4.0) * 1.5;

      renderer.render(scene, camera);
    };

    animate();

    // 6. CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [currentView]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #0c1527 0%, #05070f 65%, #020307 100%)',
      }}
      aria-hidden="true"
    />
  );
};
