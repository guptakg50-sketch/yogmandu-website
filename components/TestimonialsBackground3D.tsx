"use client";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebGLAvailable } from "@/lib/useWebGL";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 80;
  const positions = useRef(new Float32Array(count * 3));
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3]     = (Math.random() - 0.5) * 12;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e8d0ff" size={0.05} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

function Orb({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.3;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.15;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.14, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7}
        transparent opacity={0.75} roughness={0.2} />
    </mesh>
  );
}

export default function TestimonialsBackground3D() {
  const webgl = useWebGLAvailable();
  // Pure decorative backdrop — render nothing when WebGL is unavailable.
  if (!webgl) return null;

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#c090ff" />
      <Particles />
      <Orb position={[-4, 1, -1]}  color="#6B2D8B" speed={0.4} />
      <Orb position={[4, -1, -2]}  color="#F7941D" speed={0.3} />
      <Orb position={[-2, -2, 0]}  color="#8DC63F" speed={0.5} />
      <Orb position={[3,  2, -1]}  color="#a060d0" speed={0.35} />
      <Orb position={[0, 2.5, -2]} color="#F7941D" speed={0.28} />
    </Canvas>
  );
}
