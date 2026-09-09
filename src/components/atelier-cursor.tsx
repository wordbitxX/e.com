"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only pointer companion. Disabled for touch input and for anyone
 * who has asked for reduced motion.
 */
export function AtelierCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      setActive(true);
      const target = event.target as HTMLElement | null;
      const holder = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(holder?.dataset.cursor ?? null);
    };

    const onLeave = () => setActive(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[120] hidden lg:block"
      style={{ opacity: active ? 1 : 0, transition: "opacity .3s ease" }}
    >
      <div
        className="flex items-center justify-center rounded-full border border-ink/25 bg-ivory/70 backdrop-blur-[2px] transition-all duration-300"
        style={{
          width: label ? 74 : 12,
          height: label ? 74 : 12,
        }}
      >
        {label ? (
          <span className="text-[9px] uppercase tracking-[0.22em] text-ink">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
