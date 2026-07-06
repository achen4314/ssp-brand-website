import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(modelPosition.x * 0.5 + uTime * 0.3) *
                      cos(modelPosition.z * 0.5 + uTime * 0.2) * 2.5 +
                      sin(modelPosition.x * 1.2 - uTime * 0.4) * 1.0;
    modelPosition.y += elevation;
    vElevation = elevation;
    vUv = uv;
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  void main() {
    float mixVal = (vElevation + 3.5) / 7.0;
    vec3 lowColor = vec3(0.125, 0.25, 0.25);
    vec3 midColor = vec3(0.627, 0.753, 0.251);
    vec3 highColor = vec3(0.753, 0.753, 0.376);
    vec3 color = mix(lowColor, midColor, smoothstep(0.2, 0.5, mixVal));
    color = mix(color, highColor, smoothstep(0.6, 0.9, mixVal));
    float alpha = 0.35 + mixVal * 0.25;
    gl_FragColor = vec4(color, alpha);
  }
`;

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 30, 120, 90);
    geo.rotateX(-Math.PI / 3);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -3, -5]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function TerrainLandscape() {
  return (
    <Canvas
      camera={{ position: [0, 4, 16], fov: 50 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      <ambientLight intensity={0.2} />
      <Terrain />
    </Canvas>
  );
}
