/**
 * Scene3D — Full-viewport React Three Fiber persistent 3D world background.
 * Creates an immersive 3D cyberspace atmosphere with:
 * - Dynamic scroll-reactive camera positioning & pitch
 * - Layered high-density particle matrix with velocity acceleration
 * - Floating cyber polyhedrons and holographic defense rings
 * - Deep space starfield
 * - Post-processing (Bloom, Vignette, Chromatic Aberration)
 * - Mouse parallax depth perception
 */
import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Performance detection
const IS_MOBILE = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const PARTICLE_COUNT = IS_MOBILE ? 800 : 2400;
const GEOMETRY_COUNT = IS_MOBILE ? 4 : 8;

// ---------------------------------------------------------------------------
// 1. Dynamic Particle Cyber Matrix
// ---------------------------------------------------------------------------
interface ParticleMatrixProps {
  scrollProgress: number;
  velocity: number;
}

const ParticleMatrix: React.FC<ParticleMatrixProps> = ({ scrollProgress, velocity }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const targetRotationY = useRef(0);
  const targetRotationX = useRef(0);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    const deepBlue = new THREE.Color('#1d4ed8');
    const royalBlue = new THREE.Color('#2563eb');
    const electricBlue = new THREE.Color('#3b82f6');
    const orange = new THREE.Color('#f97316');
    const amber = new THREE.Color('#ea580c');
    const palette = [deepBlue, royalBlue, electricBlue, orange, amber];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Cylindrical & orbital distribution around the viewport
      const radius = 9 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 70;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const elapsed = state.clock.getElapsedTime();

    // Scroll-induced velocity adds rotational momentum
    const scrollKick = Math.abs(velocity) * 0.00008;
    const baseSpeed = 0.035 + scrollProgress * 0.07 + scrollKick;

    targetRotationY.current += baseSpeed * delta;
    targetRotationX.current = Math.sin(elapsed * 0.3) * 0.08 + (scrollProgress - 0.5) * 0.35;

    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotationY.current, 0.08);
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotationX.current, 0.05);

    // Subtle breathing pulse in scale
    const pulse = 1 + Math.sin(elapsed * 1.6) * 0.018;
    pointsRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={IS_MOBILE ? 0.05 : 0.085}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
};

// ---------------------------------------------------------------------------
// 2. High-Tech Cyber Holographic Structures & Shield Nodes
// ---------------------------------------------------------------------------
interface CyberMeshProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  type: 'shield' | 'radar-ring' | 'crystal-node';
  color: string;
}

const CyberHoloNode: React.FC<CyberMeshProps> = ({ position, scale, speed, type, color }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = t * speed * 0.35;
    groupRef.current.rotation.y = t * speed * 0.75;
    
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * speed * 1.2;
      coreRef.current.rotation.z = t * speed * 0.6;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
      <group ref={groupRef} position={position} scale={scale}>
        {type === 'shield' && (
          <>
            {/* Outer Geodesic Hex-Shield Shell */}
            <mesh>
              <icosahedronGeometry args={[1.2, 1]} />
              <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.32}
                toneMapped={false}
              />
            </mesh>
            {/* Inner Quantum Core */}
            <mesh ref={coreRef}>
              <octahedronGeometry args={[0.55, 0]} />
              <meshBasicMaterial
                color={color === '#f97316' ? '#fb923c' : '#38bdf8'}
                wireframe
                transparent
                opacity={0.65}
                toneMapped={false}
              />
            </mesh>
          </>
        )}

        {type === 'radar-ring' && (
          <>
            {/* Outer Sensor Ring */}
            <mesh>
              <torusGeometry args={[1.4, 0.016, 16, 80]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.55}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
              />
            </mesh>
            {/* Inner Counter-Ring */}
            <mesh ref={coreRef} rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[1.05, 0.012, 16, 64]} />
              <meshBasicMaterial
                color={color === '#f97316' ? '#2563eb' : '#f97316'}
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
              />
            </mesh>
          </>
        )}

        {type === 'crystal-node' && (
          <>
            {/* Holographic Crystalline Sensor Node */}
            <mesh>
              <dodecahedronGeometry args={[1.0, 0]} />
              <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.28}
                toneMapped={false}
              />
            </mesh>
            <mesh ref={coreRef} scale={0.4}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
              />
            </mesh>
          </>
        )}
      </group>
    </Float>
  );
};

const FloatingDefenseGrid: React.FC = () => {
  const elements = useMemo(() => {
    const list: CyberMeshProps[] = [];
    const colors = ['#2563eb', '#3b82f6', '#f97316', '#ea580c', '#1d4ed8'];
    const types: ('shield' | 'radar-ring' | 'crystal-node')[] = ['shield', 'radar-ring', 'crystal-node'];

    for (let i = 0; i < GEOMETRY_COUNT; i++) {
      const angle = (i / GEOMETRY_COUNT) * Math.PI * 2;
      const radius = 11 + Math.random() * 11;
      list.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 32,
          -3 - Math.random() * 12,
        ],
        scale: 0.85 + Math.random() * 1.4,
        speed: 0.18 + Math.random() * 0.32,
        type: types[i % types.length],
        color: colors[i % colors.length],
      });
    }
    return list;
  }, []);

  return (
    <>
      {elements.map((el, i) => (
        <CyberHoloNode key={i} {...el} />
      ))}
    </>
  );
};

// ---------------------------------------------------------------------------
// 3. Foreground Cyber Bokeh & Floating Particles (Extreme Near Parallax)
// ---------------------------------------------------------------------------
const ForegroundCyberFloaters: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = IS_MOBILE ? 40 : 120;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cDeepBlue = new THREE.Color('#1d4ed8');
    const cOrange = new THREE.Color('#f97316');
    const cBlue = new THREE.Color('#3b82f6');

    for (let i = 0; i < count; i++) {
      // Very close to camera (Z: 6 to 11.5), directly in front of the lens
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = 6 + Math.random() * 5.2;

      const c = i % 3 === 0 ? cOrange : i % 2 === 0 ? cDeepBlue : cBlue;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating drift
    pointsRef.current.position.y = Math.sin(t * 0.4) * 0.2;
    pointsRef.current.rotation.y = t * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={IS_MOBILE ? 0.08 : 0.12}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
};

// ---------------------------------------------------------------------------
// 4. Infinite 3D Cyber Perspective Floor (Horizon & Vanishing Point)
// ---------------------------------------------------------------------------
interface CyberGridFloorProps {
  scrollProgress: number;
}

const CyberGridFloor: React.FC<CyberGridFloorProps> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Scrolling texture movement along Z-axis creates continuous travel
    meshRef.current.position.z = ((t * 2.0 + scrollProgress * 28) % 3) - 6;
  });

  return (
    <group position={[0, -7.8, -4]}>
      {/* Infinite Horizon Grid Plane */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2.18, 0, 0]}>
        <planeGeometry args={[75, 75, 36, 36]} />
        <meshBasicMaterial
          color="#2563eb"
          wireframe
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

// ---------------------------------------------------------------------------
// 5. Dynamic Camera & Parallax Rig (Stereoscopic Pitch & Yaw)
// ---------------------------------------------------------------------------
interface CameraRigProps {
  scrollProgress: number;
}

const CameraRig: React.FC<CameraRigProps> = ({ scrollProgress }) => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetMouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1 range
    targetMouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useFrame(() => {
    // Smooth lerp mouse coordinates
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, targetMouse.current.x, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, targetMouse.current.y, 0.05);

    // Deep scroll dolly: as user scrolls down, camera travels through the 3D depth
    const targetZ = 12.5 - Math.sin(scrollProgress * Math.PI) * 4.0;
    const targetY = -scrollProgress * 10 + mouse.current.y * 1.8;
    const targetX = mouse.current.x * 3.2;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);

    // Stereoscopic 3D camera rotation (Yaw, Pitch, Roll)
    camera.rotation.y = -mouse.current.x * 0.16;
    camera.rotation.x = mouse.current.y * 0.12;
    camera.rotation.z = -mouse.current.x * 0.04;
  });

  return null;
};

// ---------------------------------------------------------------------------
// 6. Lighting & Glow
// ---------------------------------------------------------------------------
const SceneLights: React.FC = () => (
  <>
    <ambientLight intensity={0.25} color="#0f172a" />
    <pointLight position={[12, 10, 10]} intensity={1.0} color="#2563eb" distance={45} />
    <pointLight position={[-12, -8, -4]} intensity={0.8} color="#f97316" distance={40} />
    <directionalLight position={[0, 18, 8]} intensity={0.4} color="#3b82f6" />
  </>
);

// ---------------------------------------------------------------------------
// 7. Post-Processing Pipeline
// ---------------------------------------------------------------------------
const PostEffects: React.FC = () => {
  if (IS_MOBILE) return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.9}
        luminanceThreshold={0.18}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.22}
        darkness={0.85}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        offset={new THREE.Vector2(0.0003, 0.0003)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0.0}
      />
    </EffectComposer>
  );
};

// ---------------------------------------------------------------------------
// 8. Master Scene3D Export with Layered Darkness Architecture
// ---------------------------------------------------------------------------
export const Scene3D: React.FC = () => {
  const { progress, velocity } = useScrollAnimation();

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden bg-[#010206]"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 12.5], fov: 55, near: 0.1, far: 100 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        {/* Layer 1 (Deepest Abyss): Pitch black atmospheric volumetric fog */}
        <fog attach="fog" args={['#010206', 4.5, 32]} />

        <Stars
          radius={45}
          depth={55}
          count={IS_MOBILE ? 1200 : 3500}
          factor={2.8}
          saturation={0.3}
          fade
          speed={0.35}
        />
        <SceneLights />
        <CameraRig scrollProgress={progress} />
        <CyberGridFloor scrollProgress={progress} />
        <ForegroundCyberFloaters />
        <ParticleMatrix scrollProgress={progress} velocity={velocity} />
        <FloatingDefenseGrid />
        <PostEffects />
      </Canvas>

      {/* Layer 2 (Atmospheric Veil): 3-Stage Radial Darkness Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 36%, rgba(2, 6, 23, 0.25) 0%, rgba(1, 3, 10, 0.65) 55%, rgba(0, 0, 0, 0.92) 100%)',
        }}
      />
    </div>
  );
};
export default Scene3D;
