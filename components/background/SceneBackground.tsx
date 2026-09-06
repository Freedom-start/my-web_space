"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useSyncExternalStore } from "react";
import * as THREE from "three";
import {
  SCENE_BG,
  SCENE_COLOR_PRIMARY,
  SCENE_COLOR_SECONDARY,
  SCENE_COLOR_TERTIARY,
  SCENE_STAR_COLOR,
  SCENE_AMBIENT_GLOW,
} from "@/lib/scene-colors";

/** 种子随机数（mulberry32）：渲染期禁止 Math.random，用确定性序列代替 */
function seededRandom(seed: number) {
  let a = seed;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MOBILE_QUERY = "(max-width: 768px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMobile(callback: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/** 柔和圆形光点贴图：避免粒子渲染成方块 */
function useGlowSprite() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/** 漂浮粒子云 + 星空点阵，带鼠标视差与轻微滚动位移 */
function ParticleField({ count }: { count: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const sprite = useGlowSprite();

  const positions = useMemo(() => {
    const rand = seededRandom(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // 分布在一个宽扁的空间中，营造深度
      arr[i * 3] = (rand() - 0.5) * 24;
      arr[i * 3 + 1] = (rand() - 0.5) * 14;
      arr[i * 3 + 2] = (rand() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  const colors = useMemo(() => {
    const c1 = new THREE.Color(SCENE_COLOR_PRIMARY);
    const c2 = new THREE.Color(SCENE_COLOR_SECONDARY);
    const c3 = new THREE.Color(SCENE_COLOR_TERTIARY);
    const rand = seededRandom(1337);
    const arr = new Float32Array(count * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = rand();
      tmp.copy(r < 0.55 ? c1 : r < 0.85 ? c2 : c3);
      arr[i * 3] = tmp.r;
      arr[i * 3 + 1] = tmp.g;
      arr[i * 3 + 2] = tmp.b;
    }
    return arr;
  }, [count]);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame(({ clock, camera }) => {
    const g = groupRef.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    // 极缓慢的整体漂移
    g.rotation.y = t * 0.015;
    // 鼠标视差（lerp 平滑）
    g.rotation.x += (pointer.current.y * 0.06 - g.rotation.x) * 0.03;
    g.position.x += (pointer.current.x * 0.6 - g.position.x) * 0.03;
    // 滚动视差：整个场随滚动轻微上移
    const scroll = window.scrollY / Math.max(1, document.body.scrollHeight);
    g.position.y = scroll * 4 + Math.sin(t * 0.25) * 0.15;
    camera.position.z = 10;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.09}
          map={sprite}
          vertexColors
          transparent
          opacity={0.85}
          alphaTest={0.02}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* 远景静态星层 */}
      <points>
        <sphereGeometry args={[40, 32, 32]} />
        <pointsMaterial
          size={0.14}
          map={sprite}
          color={SCENE_STAR_COLOR}
          transparent
          opacity={0.4}
          alphaTest={0.02}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/** 首页 3D 背景：性能优先，移动端降低粒子数与分辨率；reduced-motion 下完全静止 */
export default function SceneBackground() {
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  );
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );

  // 保险：极端节流环境下 resize observer 可能失联，挂载后强制 R3F 重新测量一次
  useEffect(() => {
    const t = window.setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden
      className="scene-canvas fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        frameloop={reduced ? "never" : isMobile ? "demand" : "always"}
      >
        <color attach="background" args={[SCENE_BG]} />
        <fog attach="fog" args={[SCENE_BG, 12, 30]} />
        <ParticleField count={isMobile ? 500 : 1400} />
      </Canvas>
      {/* 微弱网格：极低透明度 + 径向 mask 中心可见、边缘消失 */}
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_38%,black,transparent_75%)]" />
      {/* 环境光晕，CSS 层补充氛围（颜色集中管理在 lib/scene-colors.ts） */}
      <div
        className="absolute inset-0"
        style={{ background: SCENE_AMBIENT_GLOW }}
      />
    </div>
  );
}
