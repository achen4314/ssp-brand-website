import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  void main() {
    vec2 uv = vUv;
    float dist = length(uv - vec2(0.5, 0.5)) * 2.0;
    float fog = sin(uv.x * 5.0 + uTime * 0.3) * cos(uv.y * 4.0 - uTime * 0.25) * 0.5 + 0.5;
    fog += sin(uv.x * 8.0 - uTime * 0.4) * 0.3;
    fog += cos(uv.y * 7.0 + uTime * 0.35) * 0.3;
    fog += sin(dist * 6.0 - uTime * 0.5) * 0.2;
    fog = smoothstep(0.0, 1.0, fog);
    float mouseInfluence = 0.3 * (1.0 - length(uv - uMouse) * 1.5);
    fog += mouseInfluence * 0.3;
    fog = clamp(fog, 0.0, 1.0);
    vec3 green = vec3(0.627, 0.753, 0.251);
    vec3 teal = vec3(0.125, 0.25, 0.25);
    vec3 color = mix(teal, green, fog);
    float alpha = 0.08 + fog * 0.12;
    gl_FragColor = vec4(color, alpha);
  }
`;

function FogPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(30, 20), []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uMouse.value = new THREE.Vector2(
          e.clientX / window.innerWidth,
          1 - e.clientY / window.innerHeight,
        );
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true } as AddEventListenerOptions);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        }}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function FogFluid() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1]}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      <FogPlane />
    </Canvas>
  );
}
