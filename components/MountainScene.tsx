"use client";
import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Mountain({ position, height, width, color }: {
  position: [number, number, number];
  height: number;
  width: number;
  color: string;
}) {
  return (
    <mesh position={position}>
      <coneGeometry args={[width, height, 4, 1]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.05} />
    </mesh>
  );
}

function SnowCap({ position, height }: { position: [number, number, number]; height: number }) {
  return (
    <mesh position={[position[0], position[1] + height * 0.38, position[2]]}>
      <coneGeometry args={[0.18, height * 0.28, 4, 1]} />
      <meshStandardMaterial color="#FAF0DC" roughness={0.5} metalness={0.05}
        emissive="#ffffff" emissiveIntensity={0.06} />
    </mesh>
  );
}

function Temple({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.22, 0.12, 0.22]} />
        <meshStandardMaterial color="#8B6914" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.18, 0.1, 0.18]} />
        <meshStandardMaterial color="#7A5C10" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[0.13, 0.08, 0.13]} />
        <meshStandardMaterial color="#6B4E0C" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.46, 0]}>
        <coneGeometry args={[0.04, 0.18, 8]} />
        <meshStandardMaterial color="#F7941D" roughness={0.3} metalness={0.4}
          emissive="#c06010" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Stars({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const ref  = useRef<THREE.Points>(null);
  const ref2 = useRef<THREE.Points>(null);
  const ref3 = useRef<THREE.Points>(null);

  // Layer 1 — main field, 600 stars spread wide
  const pos1 = useRef((() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 22;
      arr[i*3+1] = Math.random() * 6 + 0.2;
      arr[i*3+2] = (Math.random() - 0.5) * 14 - 1;
    }
    return arr;
  })());

  // Layer 2 — large bright stars, 80 scattered sparsely
  const pos2 = useRef((() => {
    const arr = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 20;
      arr[i*3+1] = Math.random() * 5 + 1;
      arr[i*3+2] = (Math.random() - 0.5) * 12 - 2;
    }
    return arr;
  })());

  // Layer 3 — tiny distant dust, 400 stars
  const pos3 = useRef((() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 18;
      arr[i*3+1] = Math.random() * 4 + 2;
      arr[i*3+2] = (Math.random() - 0.5) * 10 - 3;
    }
    return arr;
  })());

  useFrame((state) => {
    const t  = state.clock.getElapsedTime();
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;
    if (ref.current)  { ref.current.rotation.y  = t * 0.006 + mx * 0.05; ref.current.rotation.x  = my * 0.018; }
    if (ref2.current) { ref2.current.rotation.y = t * 0.004 + mx * 0.03; ref2.current.rotation.x = my * 0.012; }
    if (ref3.current) { ref3.current.rotation.y = t * 0.009 + mx * 0.06; ref3.current.rotation.x = my * 0.022; }
  });

  return (
    <>
      {/* Main field */}
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos1.current, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#FAF0DC" size={0.02} sizeAttenuation transparent opacity={0.75} />
      </points>
      {/* Large bright stars */}
      <points ref={ref2}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos2.current, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#FFF5E0" size={0.045} sizeAttenuation transparent opacity={0.95} />
      </points>
      {/* Distant dust */}
      <points ref={ref3}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos3.current, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#E8D5FF" size={0.012} sizeAttenuation transparent opacity={0.5} />
      </points>
    </>
  );
}

/* Cursor-driven spotlight */
function CursorLight({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (!lightRef.current) return;
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;
    lightRef.current.position.x += (mx * 4 - lightRef.current.position.x) * 0.06;
    lightRef.current.position.y += (my * 2 + 1.5 - lightRef.current.position.y) * 0.06;
  });
  return <pointLight ref={lightRef} position={[0, 2, 3]} intensity={1.2} color="#c8a060" distance={7} />;
}

/* Purple moon that follows cursor horizontally */
function Moon({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const mx = mouse.current?.x ?? 0;
    ref.current.position.x += (mx * 1.5 - ref.current.position.x) * 0.04;
    ref.current.position.y = 1.8 + Math.sin(t * 0.2) * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, 1.8, -2.5]}>
      <sphereGeometry args={[0.22, 24, 24]} />
      <meshStandardMaterial color="#e8d8ff" emissive="#6B2D8B" emissiveIntensity={0.5}
        roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const mx = mouse.current?.x ?? 0;
    const my = mouse.current?.y ?? 0;
    // Smooth parallax tilt following cursor
    groupRef.current.rotation.y += (mx * 0.18 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-my * 0.08 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.position.y = Math.sin(t * 0.25) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Background mountains */}
      <Mountain position={[-2.2, -0.5, -1.5]} height={2.2} width={1.1} color="#E8DDD4" />
      <Mountain position={[2.4,  -0.5, -1.8]} height={2.6} width={1.3} color="#F0EAE2" />
      <Mountain position={[0,    -0.5, -2.0]} height={3.0} width={1.5} color="#FAF6F0" />

      {/* Mid mountains */}
      <Mountain position={[-1.4, -0.6, -0.5]} height={1.6} width={0.9} color="#3D2A1A" />
      <Mountain position={[1.6,  -0.6, -0.6]} height={1.8} width={1.0} color="#352418" />
      <Mountain position={[0.2,  -0.6, -0.8]} height={2.2} width={1.1} color="#2E2010" />

      {/* Snow caps */}
      <SnowCap position={[0,    -0.5, -2.0]} height={3.0} />
      <SnowCap position={[2.4,  -0.5, -1.8]} height={2.6} />
      <SnowCap position={[-2.2, -0.5, -1.5]} height={2.2} />

      {/* Ground */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 5]} />
        <meshStandardMaterial color="#E8DDD4" roughness={1} />
      </mesh>

      {/* Temples */}
      <Temple position={[-0.5, -0.6,  0.2]} />
      <Temple position={[0.6,  -0.6,  0.1]} />
      <Temple position={[0.08, -0.6,  0.4]} />

      <Moon mouse={mouse} />
      <Stars mouse={mouse} />
    </group>
  );
}

export default function MountainScene() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      y: ((e.clientY - rect.top)  / rect.height) * 2 - 1,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouse.current = { x: 0, y: 0 };
  }, []);

  return (
    <div
      className="w-full h-64 md:h-80 cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas camera={{ position: [0, 0.6, 4.5], fov: 45 }} gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}>
        <ambientLight intensity={0.2} color="#ffd8a0" />
        <directionalLight position={[3, 6, 2]} intensity={0.6} color="#fff0d0" />
        <CursorLight mouse={mouse} />
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
