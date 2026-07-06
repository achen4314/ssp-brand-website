import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const LAYERS = [3, 4, 5, 4, 3];
const VERTICAL_GAP = 3.5;
const HORIZONTAL_GAP = 3.2;
const COLORS = [
  new THREE.Color('#a0c040'),
  new THREE.Color('#7a9a30'),
  new THREE.Color('#c0c060'),
];

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const signalRefs = useRef<THREE.Points[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { nodes, edges } = useMemo(() => {
    const nodesList: THREE.Vector3[] = [];
    const edgesList: [number, number][] = [];
    const totalLayers = LAYERS.length;

    for (let layer = 0; layer < totalLayers; layer++) {
      const count = LAYERS[layer];
      const y = (layer - (totalLayers - 1) / 2) * VERTICAL_GAP;
      for (let i = 0; i < count; i++) {
        const x = (i - (count - 1) / 2) * HORIZONTAL_GAP;
        nodesList.push(new THREE.Vector3(x, y, (Math.random() - 0.5) * 2));
      }
    }

    // Connect each node to all nodes in next layer
    let offset = 0;
    for (let layer = 0; layer < totalLayers - 1; layer++) {
      const currCount = LAYERS[layer];
      const nextCount = LAYERS[layer + 1];
      for (let i = 0; i < currCount; i++) {
        for (let j = 0; j < nextCount; j++) {
          edgesList.push([offset + i, offset + currCount + j]);
        }
      }
      offset += currCount;
    }
    return { nodes: nodesList, edges: edgesList };
  }, []);

  // Edge lines
  const edgeLines = useMemo(() => {
    const positions: number[] = [];
    edges.forEach(([a, b]) => {
      positions.push(nodes[a].x, nodes[a].y, nodes[a].z);
      positions.push(nodes[b].x, nodes[b].y, nodes[b].z);
    });
    return new Float32Array(positions);
  }, [nodes, edges]);

  // Signal particles along edges
  const signalCount = edges.length * 3;
  const [signalPositions, signalProgress] = useMemo(() => {
    const pos = new Float32Array(signalCount * 3);
    const prog = new Float32Array(signalCount);
    for (let i = 0; i < signalCount; i++) {
      const edgeIdx = Math.floor(i / 3);
      const [a, b] = edges[edgeIdx % edges.length];
      const t = Math.random();
      pos[i * 3] = nodes[a].x + (nodes[b].x - nodes[a].x) * t;
      pos[i * 3 + 1] = nodes[a].y + (nodes[b].y - nodes[a].y) * t;
      pos[i * 3 + 2] = nodes[a].z + (nodes[b].z - nodes[a].z) * t;
      prog[i] = Math.random();
    }
    return [pos, prog];
  }, [edges, nodes, signalCount]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 1.5,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true } as AddEventListenerOptions);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouseRef.current.x * 0.3 - groupRef.current.rotation.y) * 0.01;
    groupRef.current.rotation.x += (mouseRef.current.y * 0.15 - groupRef.current.rotation.x) * 0.01;

    // Update signal particles
    signalRefs.current.forEach((points) => {
      if (!points) return;
      const posArr = points.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < signalCount; i++) {
        const edgeIdx = Math.floor(i / 3);
        const [a, b] = edges[edgeIdx % edges.length];
        let p = signalProgress[i] + delta * (0.3 + Math.random() * 0.2);
        if (p > 1.3) p -= 1.3;
        signalProgress[i] = p;
        const t = Math.max(0, Math.min(1, p));
        posArr[i * 3] = nodes[a].x + (nodes[b].x - nodes[a].x) * t;
        posArr[i * 3 + 1] = nodes[a].y + (nodes[b].y - nodes[a].y) * t;
        posArr[i * 3 + 2] = nodes[a].z + (nodes[b].z - nodes[a].z) * t;
      }
      points.geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color={COLORS[i % COLORS.length]}
            emissive={COLORS[i % COLORS.length]}
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
      {/* Edge lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgeLines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#a0c040" transparent opacity={0.06} />
      </lineSegments>
      {/* Signal particles */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <points ref={(el: any) => { signalRefs.current[0] = el; }}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[signalPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#a0c040"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
}

export default function DataNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 50 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.15} />
      <NetworkNodes />
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.5} />
      </EffectComposer>
    </Canvas>
  );
}
