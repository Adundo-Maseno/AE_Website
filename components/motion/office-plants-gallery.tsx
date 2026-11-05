"use client";

import { useRef, Suspense, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, MotionValue, useTransform, motion } from "framer-motion";
import { useTexture, Environment, Preload } from "@react-three/drei";
import * as THREE from "three";

// Suppress known internal warnings from @react-three/fiber and Three.js
if (typeof console !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const msg = args.map(arg => typeof arg === "string" ? arg : "").join(" ");
    if (msg.includes("THREE.Clock: This module has been deprecated")) return;
    if (msg.includes("cannot be represented accurately in double precision")) return;
    originalWarn(...args);
  };
}

const SETTLED_POSITIONS = [
  // Left side (Slightly pushed to edges, but tight enough to look cohesive)
  { x: -6.3, y: 3.8, z: 1, rotZ: -0.05 },
  { x: -8.6, y: 1.2, z: 2, rotZ: 0.08 },
  { x: -4.6, y: -0.5, z: 0, rotZ: -0.02 },
  { x: -7.1, y: -2.8, z: 3, rotZ: 0.04 },
  { x: -5.5, y: -5.5, z: -1, rotZ: -0.07 },
  // Right side (Slightly pushed to edges)
  { x: 5.5, y: 4.2, z: 2, rotZ: 0.06 },
  { x: 8.3, y: 2.0, z: 0, rotZ: -0.03 },
  { x: 5.2, y: -1.0, z: 3, rotZ: 0.05 },
  { x: 9.0, y: -2.5, z: 1, rotZ: -0.08 },
  { x: 4.8, y: -4.5, z: -1, rotZ: 0.02 },
];

function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}

function easeInCubic(x: number): number {
  return x * x * x;
}

function PlantFrame({
  url,
  index,
  progress,
}: {
  url: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseGroupRef = useRef<THREE.Group>(null);
  const floatGroupRef = useRef<THREE.Group>(null);

  const texture = useTexture(url);
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  const target = SETTLED_POSITIONS[index];

  const initial = useMemo(() => {
    const isLeft = target.x < 0;
    // Mathematically guarantee 0 collisions: By scaling their coordinates apart by 2.0x,
    // the distance between frames is massive during flight, meaning their spinning corners 
    // literally cannot reach each other. As they stop spinning, they condense into target.
    const startX = (target.x * 2.0) + (isLeft ? -15 : 15);
    const startY = (target.y * 2.0) + (target.y > 0 ? 15 : -15);
    const startZ = target.z - 25;

    const startRotX = Math.PI * 4 * (index % 2 === 0 ? 1 : -1);
    const startRotY = Math.PI * 4 * (index % 3 === 0 ? 1 : -1);
    const startRotZ = Math.PI * 4 * (index % 2 === 0 ? -1 : 1);
    return { startX, startY, startZ, startRotX, startRotY, startRotZ };
  }, [target, index]);

  const exitTarget = useMemo(() => {
    const isLeft = target.x < 0;
    // Scale apart during exit to prevent clipping during the warp explosion
    const endX = (target.x * 2.0) + (isLeft ? -10 : 10);
    const endY = (target.y * 2.0) + (target.y > 0 ? 10 : -10);
    const endZ = target.z + 15;

    const endRotX = Math.PI * 2 * (index % 2 === 0 ? -1 : 1);
    const endRotY = Math.PI * 2 * (index % 3 === 0 ? -1 : 1);
    const endRotZ = Math.PI * 2 * (index % 2 === 0 ? 1 : -1);
    return { endX, endY, endZ, endRotX, endRotY, endRotZ };
  }, [target, index]);

  useFrame((state) => {
    if (!groupRef.current || !mouseGroupRef.current || !floatGroupRef.current) return;

    const rawP = progress.get();

    // FLOAT ANIMATION (Replaces <Float> to fix THREE.Clock deprecation warning)
    const t = performance.now() / 1000;
    const offset = index * 1000; // Random offset per frame
    floatGroupRef.current.position.y = Math.sin(t * 2 + offset) * 0.05;
    floatGroupRef.current.rotation.x = Math.sin(t * 1 + offset) * 0.02;
    floatGroupRef.current.rotation.y = Math.cos(t * 1.5 + offset) * 0.02;

    // MOUSE PARALLAX (Active throughout the entire scroll sequence)
    const mouseMultiplier = 1;

    const mx = state.pointer.x * mouseMultiplier;
    const my = state.pointer.y * mouseMultiplier;
    const targetRotX = -(my * 0.25);
    const targetRotY = (mx * 0.25);
    const targetPosX = mx * 0.6;
    const targetPosY = my * 0.6;

    mouseGroupRef.current.rotation.x = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.x, targetRotX, 0.08);
    mouseGroupRef.current.rotation.y = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.y, targetRotY, 0.08);
    mouseGroupRef.current.position.x = THREE.MathUtils.lerp(mouseGroupRef.current.position.x, targetPosX, 0.08);
    mouseGroupRef.current.position.y = THREE.MathUtils.lerp(mouseGroupRef.current.position.y, targetPosY, 0.08);

    // SCROLL ANIMATION
    const depthIndex = target.z + 1; // 0 to 4

    if (rawP <= 0.30) {
      // ENTER
      // Fix clipping: Reversing the stagger ensures front frames move first, so Z-arcs never cross!
      const staggerDelay = (4 - depthIndex) * 0.02;
      const staggerWindow = 0.30 - staggerDelay;
      let p = Math.max(0, Math.min(1, (rawP - staggerDelay) / staggerWindow));
      p = easeOutCirc(p);

      // The epic Z-arc that made it look great
      const arcZ = Math.sin(p * Math.PI) * 12;

      groupRef.current.position.x = THREE.MathUtils.lerp(initial.startX, target.x, p);
      groupRef.current.position.y = THREE.MathUtils.lerp(initial.startY, target.y, p);
      groupRef.current.position.z = THREE.MathUtils.lerp(initial.startZ, target.z, p) + arcZ;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(initial.startRotX, 0, p);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(initial.startRotY, 0, p);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(initial.startRotZ, target.rotZ, p);

      const scale = 0.2 + p * 0.8;
      groupRef.current.scale.set(scale, scale, scale);

    } else if (rawP <= 0.70) {
      // HOLD
      groupRef.current.position.set(target.x, target.y, target.z);
      groupRef.current.rotation.set(0, 0, target.rotZ);
      groupRef.current.scale.set(1, 1, 1);

    } else if (rawP <= 1.0) {
      // EXIT
      const staggerDelay = (4 - depthIndex) * 0.02;
      const staggerWindow = 0.30 - staggerDelay;
      let p = Math.max(0, Math.min(1, (rawP - 0.70 - staggerDelay) / staggerWindow));
      p = easeInCubic(p);

      groupRef.current.position.x = THREE.MathUtils.lerp(target.x, exitTarget.endX, p);
      groupRef.current.position.y = THREE.MathUtils.lerp(target.y, exitTarget.endY, p);
      groupRef.current.position.z = THREE.MathUtils.lerp(target.z, exitTarget.endZ, p);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(0, exitTarget.endRotX, p);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(0, exitTarget.endRotY, p);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(target.rotZ, exitTarget.endRotZ, p);

      const scale = 1.0 - p * 0.8;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  const frameW = 2.4;
  const frameH = 3.3;
  const frameDepth = 0.15;
  const glassW = frameW - 0.3;
  const glassH = frameH - 0.3;

  return (
    <group ref={groupRef}>
      <group ref={mouseGroupRef}>
        <group ref={floatGroupRef}>
          <group>
            {/* Frame Body (Edges perfectly color-matched via Gallery Wrap) */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[frameW, frameH, frameDepth]} />
              <meshStandardMaterial map={texture} roughness={0.6} />
            </mesh>

            {/* Front Photo */}
            <mesh position={[0, 0, frameDepth / 2 + 0.001]}>
              <planeGeometry args={[frameW, frameH]} />
              <meshStandardMaterial
                map={texture}
                roughness={0.2}
                emissive={new THREE.Color(0xffffff)}
                emissiveMap={texture}
                emissiveIntensity={0.15}
              />
            </mesh>

            {/* Glass (Standard Material with Environment Reflection) */}
            <mesh position={[0, 0, frameDepth / 2 + 0.002]}>
              <planeGeometry args={[glassW, glassH]} />
              <meshStandardMaterial
                transparent
                opacity={0.2}
                roughness={0.0}
                metalness={0.9}
                envMapIntensity={2.0}
              />
            </mesh>

            {/* Cardboard Backing */}
            <mesh position={[0, 0, -frameDepth / 2 - 0.001]} rotation={[0, Math.PI, 0]} receiveShadow>
              <planeGeometry args={[frameW - 0.2, frameH - 0.2]} />
              <meshStandardMaterial color="#6d4c41" roughness={1.0} />
            </mesh>

            {/* Metal Backing Clips */}
            {[
              [-frameW / 2 + 0.15, 0, 0],
              [frameW / 2 - 0.15, 0, 0],
              [0, -frameH / 2 + 0.15, Math.PI / 2],
              [0, frameH / 2 - 0.15, Math.PI / 2]
            ].map((pos, i) => (
              <mesh
                key={i}
                position={[pos[0], pos[1], -frameDepth / 2 - 0.002]}
                rotation={[0, 0, pos[2]]}
                castShadow
              >
                <boxGeometry args={[0.08, 0.03, 0.015]} />
                <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
              </mesh>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}

const plantImages = Array.from({ length: 10 }, (_, i) => ({
  id: `plant-${i + 1}`,
  src: `/office-plants/${i + 1}.webp`,
}));



export default function OfficePlantsGallery({ showMissionVision = false }: { showMissionVision?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Defer texture preloading until after initial paint to prevent freezing the home page
    const timer = setTimeout(() => {
      plantImages.forEach((img) => {
        useTexture.preload(img.src);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Hero text animations (Visible initially, fades out as you scroll down)
  const heroOpacity = useTransform(scrollYProgress, [0.20, 0.28], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0.20, 0.28], [0, -40]);

  // Mission text animations
  const missionOpacity = useTransform(scrollYProgress, [0.28, 0.35, 0.45, 0.50], [0, 1, 1, 0]);
  const missionY = useTransform(scrollYProgress, [0.28, 0.35, 0.45, 0.50], [40, 0, 0, -40]);

  // Vision text animations
  const visionOpacity = useTransform(scrollYProgress, [0.50, 0.55, 0.65, 0.70], [0, 1, 1, 0]);
  const visionY = useTransform(scrollYProgress, [0.50, 0.55, 0.65, 0.70], [40, 0, 0, -40]);

  return (
    <section ref={containerRef} className={`relative w-full ${showMissionVision ? 'h-[300vh]' : 'h-[150vh]'} bg-white`}>
      {showMissionVision && (
        <div className="absolute top-0 left-0 w-full min-h-[100dvh] z-30 flex items-center justify-center pointer-events-none px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-3xl text-center p-10 space-y-8"
          >
            <h1 className="text-5xl lg:text-7xl font-serif text-deep-forest font-bold tracking-tight pb-2">Old and New by Design</h1>
            <p className="text-lg lg:text-xl text-charcoal/90 leading-relaxed font-light drop-shadow-sm bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-xl">
              Agri Experience is both an old and new company. Old because the direct experience of our group of principals dates back to 1991. New because Agri Experience, Ltd. was founded in 2012.
            </p>
          </motion.div>
        </div>
      )}
      <div className="sticky top-0 w-full min-h-[100dvh] overflow-hidden">

        {/* HTML Text Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4">
          {showMissionVision && (
            <>


              {/* Mission */}
              <motion.div
                style={{ opacity: missionOpacity, y: missionY }}
                className="absolute flex flex-col items-center max-w-2xl text-center bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/40"
              >
                <h2 className="text-deep-forest text-5xl font-serif mb-4 drop-shadow-sm">Our Mission</h2>
                <p className="text-charcoal/90 text-xl leading-relaxed font-light drop-shadow-sm">
                  To deliver high-quality, experience-based field analysis, recommendations, and implementation support for seed systems development.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                style={{ opacity: visionOpacity, y: visionY }}
                className="absolute flex flex-col items-center max-w-2xl text-center bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/40"
              >
                <h2 className="text-deep-forest text-5xl font-serif mb-4 drop-shadow-sm">Our Vision</h2>
                <p className="text-charcoal/90 text-xl leading-relaxed font-light drop-shadow-sm">
                  Meaningful and sustainable systemic change through close collaboration with local officials and seed sector stakeholders.
                </p>
              </motion.div>
            </>
          )}
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-10 touch-pan-y">
          <Canvas
            shadows={{ type: THREE.PCFShadowMap }}
            camera={{ position: [0, 0, 18], fov: 42 }}
            dpr={[1, 1]}
            style={{ touchAction: 'pan-y' }}
          >
            <Environment preset="city" />
            <ambientLight intensity={1.2} />
            <spotLight position={[0, 12, 15]} intensity={2.5} penumbra={1} castShadow />
            <spotLight position={[-12, 5, 10]} intensity={1} penumbra={1} />
            <spotLight position={[12, 5, 10]} intensity={1} penumbra={1} />

            <Suspense fallback={null}>
              {plantImages.map((img, index) => (
                <PlantFrame
                  key={img.id}
                  url={img.src}
                  index={index}
                  progress={scrollYProgress}
                />
              ))}
              <Preload all />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}
