"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Petal({ index, total }: { index: number; total: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 0.52;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = angle + Math.sin(t * 0.4 + index * 0.5) * 0.06;
    ref.current.position.y = Math.sin(t * 0.5 + index * 0.3) * 0.03;
  });

  return (
    <mesh
      ref={ref}
      position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
      rotation={[Math.PI / 2.4, 0, angle + Math.PI / 2]}
    >
      <sphereGeometry args={[0.28, 16, 8, 0, Math.PI]} />
      <meshStandardMaterial
        color="#8DC63F"
        emissive="#4a6e20"
        emissiveIntensity={0.15}
        metalness={0.1}
        roughness={0.6}
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function InnerPetal({ index, total }: { index: number; total: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2 + Math.PI / total;
  const radius = 0.26;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.5 + index * 0.7) * 0.02;
  });

  return (
    <mesh
      ref={ref}
      position={[Math.cos(angle) * radius, 0.04, Math.sin(angle) * radius]}
      rotation={[Math.PI / 2.8, 0, angle + Math.PI / 2]}
    >
      <sphereGeometry args={[0.16, 12, 6, 0, Math.PI]} />
      <meshStandardMaterial
        color="#F7941D"
        emissive="#c06010"
        emissiveIntensity={0.2}
        metalness={0.15}
        roughness={0.5}
        side={THREE.DoubleSide}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function Center() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.3;
  });
  return (
    <mesh ref={ref} position={[0, 0.06, 0]}>
      <sphereGeometry args={[0.13, 24, 24]} />
      <meshStandardMaterial
        color="#F7941D"
        emissive="#d06010"
        emissiveIntensity={0.4}
        metalness={0.3}
        roughness={0.3}
      />
    </mesh>
  );
}

function LotusGroup() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.12;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => <Petal key={i} index={i} total={8} />)}
      {Array.from({ length: 6 }).map((_, i) => <InnerPetal key={i} index={i} total={6} />)}
      <Center />
    </group>
  );
}

export default function FloatingLotus({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "h-40", md: "h-56", lg: "h-72" };
  return (
    <div className={`w-full ${sizeMap[size]}`}>
      <Canvas camera={{ position: [0, 1.8, 2.4], fov: 38 }} gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 4, 2]} intensity={1.0} color="#fff8e8" />
        <directionalLight position={[-2, 1, -2]} intensity={0.3} color="#a8d8ff" />
        <pointLight position={[0, 2, 0]} intensity={0.6} color="#F7941D" distance={5} />
        <LotusGroup />
      </Canvas>
    </div>
  );
}
