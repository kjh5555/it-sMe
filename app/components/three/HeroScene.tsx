"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Environment,
  Icosahedron,
  Torus,
} from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/**
 * A single distorted blob that floats and gently follows the cursor.
 */
function Blob({
  position,
  color,
  speed = 1,
  distort = 0.45,
  radius = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  radius?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.2 * speed) * 0.4;
    ref.current.rotation.y = Math.cos(t * 0.15 * speed) * 0.4;
  });

  return (
    <Float speed={speed * 1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[radius, 16]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={1.6}
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>
    </Float>
  );
}

function WireTorus({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.25;
    ref.current.rotation.y += delta * 0.18;
  });
  return (
    <Float speed={0.6} rotationIntensity={0.4} floatIntensity={0.8}>
      <Torus ref={ref} args={[1.3, 0.04, 16, 96]} position={position}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
      </Torus>
    </Float>
  );
}

function WireIco({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.12;
    ref.current.rotation.z += delta * 0.06;
  });
  return (
    <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <Icosahedron ref={ref} args={[0.9, 1]} position={position}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
      </Icosahedron>
    </Float>
  );
}

/**
 * Camera rig: gently follow pointer + drift on scroll.
 */
function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    const targetX = pointer.x * 0.6;
    const targetY = pointer.y * 0.4 + 0.1;
    const scrollY =
      typeof window !== "undefined"
        ? Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.2)
        : 0;
    const driftZ = 5 + scrollY * 1.4;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (driftZ - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

interface HeroSceneProps {
  className?: string;
}

export default function HeroScene({ className }: HeroSceneProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Distinct accent palette wired to design tokens
  const cyan = isDark ? "#22d3ee" : "#06b6d4";
  const coral = isDark ? "#fb7185" : "#f97316";
  const iris = isDark ? "#a78bfa" : "#7c3aed";
  const lime = isDark ? "#d9f99d" : "#84cc16";

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={isDark ? 0.4 : 0.7} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={isDark ? 1 : 0.8}
            color={cyan}
          />
          <directionalLight
            position={[-5, -2, 3]}
            intensity={0.6}
            color={coral}
          />

          {/* Hero blobs */}
          <Blob position={[-2.2, 0.3, 0]} color={iris} speed={0.9} radius={1.05} distort={0.5} />
          <Blob position={[2.3, -0.4, -0.6]} color={cyan} speed={1.2} radius={0.85} distort={0.4} />
          <Blob position={[0.2, 1.6, -1.2]} color={coral} speed={0.7} radius={0.55} distort={0.55} />

          {/* Wireframe accents */}
          <WireTorus position={[1.7, 1.4, -2]} color={lime} />
          <WireIco position={[-2.2, -1.6, -1.5]} color={cyan} />

          <Environment preset="city" />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
