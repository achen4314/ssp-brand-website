import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function NebulaParticles({ count = 4000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const arm = Math.floor(Math.random() * 3);
      const angle = Math.random() * Math.PI * 2 + arm * (Math.PI * 2) / 3;
      const r = 8 + Math.random() * 35;
      const spread = (Math.random() - 0.5) * 6;
      pos[i * 3] = Math.cos(angle) * r + spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = Math.sin(angle) * r + spread;
      const t = Math.random();
      col[i * 3] = 0.4 + t * 0.23;
      col[i * 3 + 1] = 0.55 + t * 0.2;
      col[i * 3 + 2] = 0.12 + t * 0.25;
    }
    return [pos, col];
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 3,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true } as AddEventListenerOptions);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x += delta * 0.008;
    pointsRef.current.rotation.y +=
      (mouseRef.current.x * 0.4 - pointsRef.current.rotation.y) * 0.008;
    pointsRef.current.rotation.x +=
      (mouseRef.current.y * 0.2 - pointsRef.current.rotation.x) * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleUniverse() {
  return (
    <Canvas
      camera={{ position: [0, 2, 28], fov: 55 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <NebulaParticles count={4000} />
      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.3} luminanceSmoothing={0.6} />
        <Vignette darkness={0.5} offset={0.3} />
      </EffectComposer>
    </Canvas>
  );
}
