import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const CyberGlobe3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [telemetry, setTelemetry] = useState({
    activeNode: 'Tokyo • London • NY',
    threatsBlocked: '99.98%',
    activeSensors: '1,420',
    encryption: 'Quantum AES-512',
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 7.0;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // 2. Cyber Globe Master Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const sphereRadius = 1.85;

    // A. Outer Geodesic Icosahedron Shield
    const icoGeo = new THREE.IcosahedronGeometry(sphereRadius, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireSphere = new THREE.Mesh(icoGeo, wireMat);
    globeGroup.add(wireSphere);

    // B. Inner Core Cyber Lattice
    const innerGeo = new THREE.IcosahedronGeometry(sphereRadius * 0.88, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // C. High-Density Global Network Nodes (Point Cloud)
    const pointCount = 420;
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const blueColor = new THREE.Color(0x3b82f6);
    const orangeColor = new THREE.Color(0xf97316);

    const nodeCoordinates: THREE.Vector3[] = [];

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;

      const r = sphereRadius * (1 + (Math.random() - 0.5) * 0.04);
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      pointPositions[i * 3] = x;
      pointPositions[i * 3 + 1] = y;
      pointPositions[i * 3 + 2] = z;

      if (i % 10 === 0) {
        nodeCoordinates.push(new THREE.Vector3(x, y, z));
      }

      // Palette distribution: mostly cyan/blue with vivid orange focal threats
      const c = i % 14 === 0 ? orangeColor : i % 2 === 0 ? cyanColor : blueColor;
      pointColors[i * 3] = c.r;
      pointColors[i * 3 + 1] = c.g;
      pointColors[i * 3 + 2] = c.b;
    }

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
    pointGeo.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));

    const pointMat = new THREE.PointsMaterial({
      size: 0.085,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const pointsMesh = new THREE.Points(pointGeo, pointMat);
    globeGroup.add(pointsMesh);

    // D. Connection Arcs between major hubs
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    const arcMaterials = [
      new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.45 }),
      new THREE.LineBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.55 }),
    ];

    for (let i = 0; i < Math.min(nodeCoordinates.length - 1, 14); i += 2) {
      const v1 = nodeCoordinates[i];
      const v2 = nodeCoordinates[(i + 3) % nodeCoordinates.length];

      // Create quadratic bezier curve bulging outward
      const mid = v1.clone().add(v2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(sphereRadius * 1.35);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const curvePoints = curve.getPoints(24);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMesh = new THREE.Line(curveGeo, arcMaterials[i % 2]);
      arcGroup.add(curveMesh);
    }

    // E. Orbital Defense Rings
    const ring1Geo = new THREE.TorusGeometry(sphereRadius * 1.32, 0.012, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    globeGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(sphereRadius * 1.5, 0.008, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    globeGroup.add(ring2);

    // F. Scanning Radar Plane / Laser Ring
    const scanRingGeo = new THREE.RingGeometry(sphereRadius * 0.94, sphereRadius * 1.06, 64);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.rotation.x = Math.PI / 2;
    globeGroup.add(scanRing);

    // G. Orbiting Defense Node Satellites
    const satelliteGroup = new THREE.Group();
    globeGroup.add(satelliteGroup);

    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const satGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const satMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0xf97316,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      satellites.push(sat);
      satelliteGroup.add(sat);
    }

    // 3. Mouse & Touch Interaction with Inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        targetX += deltaX * 0.005;
        targetY += deltaY * 0.005;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      } else {
        const rect = mount.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        targetX = (x / rect.width) * 0.5;
        targetY = -(y / rect.height) * 0.5;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - dragStartX;
        const deltaY = e.touches[0].clientY - dragStartY;
        targetX += deltaX * 0.007;
        targetY += deltaY * 0.007;
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
      }
    };

    const onEnd = () => {
      isDragging = false;
    };

    mount.addEventListener('mousedown', onMouseDown);
    mount.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);

    // 4. Resize Handling
    const onResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // 5. Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow / momentum
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Base globe continuous rotation + interactive rotation
      globeGroup.rotation.y = elapsedTime * 0.16 + mouseX;
      globeGroup.rotation.x = mouseY * 0.4;

      // Vertical laser scan oscillation
      scanRing.position.y = Math.sin(elapsedTime * 1.6) * (sphereRadius * 0.85);

      // Counter-rotating rings
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;

      // Orbiting satellites
      satellites.forEach((sat, idx) => {
        const speed = 0.7 + idx * 0.22;
        const angle = elapsedTime * speed + (idx * Math.PI * 2) / satellites.length;
        const radius = sphereRadius * (1.3 + (idx % 3) * 0.08);
        sat.position.x = Math.cos(angle) * radius;
        sat.position.y = Math.sin(angle * 1.4) * 0.45;
        sat.position.z = Math.sin(angle) * radius;
      });

      // Core pulse
      const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.035;
      innerSphere.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchend', onEnd);
      mount.removeEventListener('mousedown', onMouseDown);
      mount.removeEventListener('touchstart', onTouchStart);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeo.dispose();
      innerGeo.dispose();
      pointGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      scanRingGeo.dispose();
      scanRingMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[620px] lg:max-w-[680px] mx-auto flex items-center justify-center select-none bg-transparent">
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing bg-transparent relative z-10"
      />

      {/* Floating Holographic Telemetry HUD Badges */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/60 border border-cyan-500/30 backdrop-blur-md text-[11px] font-mono text-cyan-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>NODES: {telemetry.activeNode}</span>
      </div>

      <div className="absolute bottom-6 right-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/60 border border-orange-500/30 backdrop-blur-md text-[11px] font-mono text-orange-300">
        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
        <span>SHIELD: {telemetry.threatsBlocked} MITIGATED</span>
      </div>
    </div>
  );
};
