import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SSP_GREEN = new THREE.Color('#a0c040');
const SSP_TEAL = new THREE.Color('#204040');
const SSP_GOLD = new THREE.Color('#c0c060');
const ORB_COLORS = [SSP_GREEN, SSP_TEAL, SSP_GOLD, SSP_GREEN, SSP_TEAL, SSP_GOLD, SSP_GREEN];

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      radius: 0.4 + Math.random() * 1.2,
      speed: 0.2 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      x: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 14,
      baseY: (Math.random() - 0.5) * 8,
      color: ORB_COLORS[i % ORB_COLORS.length],
    })), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.y = orb.baseY + Math.sin(t * orb.speed + orb.phase) * 1.5;
      const s = 1 + Math.sin(t * orb.speed * 1.5 + orb.phase) * 0.2;
      child.scale.setScalar(s);
    });
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={[orb.x, orb.baseY, orb.z]}>
          <sphereGeometry args={[orb.radius, 32, 32]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function LightOrbs() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 55 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.08} />
      <FloatingOrbs />
    </Canvas>
  );
}
