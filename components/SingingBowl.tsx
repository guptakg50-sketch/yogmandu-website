"use client";
import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Bowl({ onClick, isRinging }: { onClick: () => void; isRinging: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const rimRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !rimRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.06;
    rimRef.current.rotation.y = t * 0.15;
    rimRef.current.position.y = Math.sin(t * 0.6) * 0.06 + 0.22;
    if (isRinging) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 18) * 0.015);
    } else {
      meshRef.current.scale.setScalar(1);
    }
  });

  return (
    <group onClick={onClick} style={{ cursor: "pointer" }}>
      {/* Bowl body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.45, 0.45, 64, 1, true]} />
        <meshStandardMaterial
          color={isRinging ? "#c49a2a" : "#b8882a"}
          metalness={0.8}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Bowl bottom */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.02, 64]} />
        <meshStandardMaterial color="#a07820" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Rim ring */}
      <mesh ref={rimRef} position={[0, 0.22, 0]}>
        <torusGeometry args={[0.65, 0.03, 16, 64]} />
        <meshStandardMaterial
          color={isRinging ? "#e8c040" : "#c8a030"}
          metalness={0.9}
          roughness={0.1}
          emissive={isRinging ? "#c8a030" : "#000000"}
          emissiveIntensity={isRinging ? 0.5 : 0}
        />
      </mesh>
      {/* Decorative bands */}
      {[-0.05, 0.05].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.58, 0.008, 8, 64]} />
          <meshStandardMaterial color="#906818" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function RippleRing({ isRinging }: { isRinging: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ringRef.current || !isRinging) return;
    const t = (state.clock.getElapsedTime() % 1.2) / 1.2;
    ringRef.current.scale.setScalar(1 + t * 2.5);
    const mat = ringRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = (1 - t) * 0.4;
  });

  return (
    <mesh ref={ringRef} position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.6, 0.68, 64]} />
      <meshBasicMaterial color="#6B2D8B" transparent opacity={0} side={THREE.DoubleSide} />
    </mesh>
  );
}

function playBowlTone(audioCtx: AudioContext) {
  const frequencies = [220, 440, 660, 880];
  frequencies.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.12 / (i + 1), audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3 - i * 0.4);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 3);
  });
}

export default function SingingBowl() {
  const [isRinging, setIsRinging] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    playBowlTone(audioCtxRef.current);
    setIsRinging(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsRinging(false), 3000);
  }, []);

  return (
    <div className="relative w-full h-full" style={{ cursor: "pointer" }}>
      <Canvas
        camera={{ position: [0, 0.5, 2.8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 3]} intensity={1.2} color="#fff8e8" />
        <directionalLight position={[-2, 2, -2]} intensity={0.4} color="#d4a8ff" />
        <pointLight position={[0, 2, 0]} intensity={isRinging ? 1.5 : 0.3} color="#F7941D" distance={4} />
        <Bowl onClick={handleClick} isRinging={isRinging} />
        <RippleRing isRinging={isRinging} />
      </Canvas>

      {/* Hint text */}
      <div
        className="absolute bottom-4 left-0 right-0 text-center text-xs tracking-widest uppercase transition-opacity duration-500"
        style={{
          color: "#6B2D8B",
          opacity: isRinging ? 0 : 0.5,
          fontFamily: "DM Sans, sans-serif",
          letterSpacing: "0.2em",
        }}
      >
        Touch to Awaken
      </div>

      {/* Ringing label */}
      {isRinging && (
        <div
          className="absolute bottom-4 left-0 right-0 text-center text-xs tracking-widest uppercase animate-fade-in"
          style={{ color: "#6B2D8B", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.2em" }}
        >
          ∿ resonating ∿
        </div>
      )}
    </div>
  );
}
