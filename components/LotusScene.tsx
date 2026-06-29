"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* A single lotus petal — a flattened ellipsoid splayed out from the centre */
function Petal({
  angle, radius, tilt, scale, color, emissive, emissiveIntensity,
}: {
  angle: number;
  radius: number;
  tilt: number;
  scale: [number, number, number];
  color: string;
  emissive: string;
  emissiveIntensity: number;
}) {
  return (
    <group rotation={[0, angle, 0]}>
      <mesh
        position={[0, Math.sin(tilt) * radius, Math.cos(tilt) * radius]}
        rotation={[tilt, 0, 0]}
        scale={scale}
      >
        <sphereGeometry args={[1, 18, 18]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={0.55}
          metalness={0}
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* One radial ring of petals */
function PetalRing({
  count, offset, ...petal
}: {
  count: number;
  offset: number;
  radius: number;
  tilt: number;
  scale: [number, number, number];
  color: string;
  emissive: string;
  emissiveIntensity: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Petal key={i} angle={offset + (i / count) * Math.PI * 2} {...petal} />
      ))}
    </>
  );
}

function Lotus() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.06;           // slow turn
    group.current.position.y = -0.1 + Math.sin(t * 0.4) * 0.05; // gentle bob
    const breathe = 1 + Math.sin(t * 0.6) * 0.02;  // meditative "breathing"
    group.current.scale.setScalar(breathe);
  });

  return (
    <group ref={group}>
      {/* Outer ring — pale lavender-white */}
      <PetalRing count={9} offset={0} radius={0.46} tilt={0.16}
        scale={[0.17, 0.05, 0.52]} color="#EBD9FF" emissive="#6B2D8B" emissiveIntensity={0.18} />
      {/* Mid ring — soft cream-pink, offset half a step */}
      <PetalRing count={9} offset={Math.PI / 9} radius={0.36} tilt={0.5}
        scale={[0.15, 0.05, 0.44]} color="#F8E6D6" emissive="#7A4A12" emissiveIntensity={0.12} />
      {/* Inner ring — saffron-tinted */}
      <PetalRing count={6} offset={Math.PI / 6} radius={0.24} tilt={0.92}
        scale={[0.12, 0.05, 0.32]} color="#F8CE95" emissive="#F7941D" emissiveIntensity={0.3} />

      {/* Seed pod */}
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial color="#F7B95A" emissive="#F7941D" emissiveIntensity={0.6} roughness={0.4} />
      </mesh>
      {/* Centre glow */}
      <pointLight position={[0, 0.4, 0]} intensity={1.4} color="#F7941D" distance={3} />
    </group>
  );
}

/* Slow rising golden dust motes */
function Dust() {
  const ref = useRef<THREE.Points>(null);
  const count = 130;

  const positions = useRef((() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return arr;
  })());

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = positions.current;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.12;            // drift upward
      if (arr[i * 3 + 1] > 2.2) arr[i * 3 + 1] = -2.2; // wrap
    }
    (pts.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    pts.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#F7D9A0" size={0.03} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

export default function LotusScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 2.1], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} color="#e8d8ff" />
      <directionalLight position={[2, 4, 3]} intensity={0.8} color="#fff0d0" />
      <directionalLight position={[-3, 1, -2]} intensity={0.5} color="#b87aff" />
      <Lotus />
      <Dust />
    </Canvas>
  );
}
