"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/** 全站顺滑惯性滚动；reduced motion 环境下降级为原生滚动 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
