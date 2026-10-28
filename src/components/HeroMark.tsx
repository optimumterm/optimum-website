"use client";

import { useEffect, useId, useRef } from "react";
import { goldStops } from "@/lib/brand";

type Pose = {
  rx: number;
  ry: number;
  ga: number;
  gx: number;
  gy: number;
  sx: number;
  so: number;
};

const rest: Pose = { rx: 0, ry: 0, ga: 0, gx: 0, gy: 0, sx: -1, so: 0 };

export function HeroMark() {
  const id = useId().replace(/:/g, "");
  const stage = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const gold = useRef<SVGLinearGradientElement>(null);
  const shine = useRef<SVGLinearGradientElement>(null);
  const shineRect = useRef<SVGRectElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cur: Pose = { ...rest };
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const target: Pose = {
        rx: Math.sin(t * 0.6) * 3,
        ry: Math.cos(t * 0.45) * 4,
        ga: Math.sin(t * 0.3) * 25,
        gx: Math.sin(t * 0.4) * 0.18,
        gy: Math.cos(t * 0.35) * 0.12,
        sx: ((t * 0.18) % 2.4) - 1.2,
        so: 0.18,
      };

      for (const key of Object.keys(cur) as (keyof Pose)[]) {
        cur[key] += (target[key] - cur[key]) * 0.05;
      }

      tilt.current?.style.setProperty(
        "transform",
        `rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg)`,
      );
      gold.current?.setAttribute(
        "gradientTransform",
        `rotate(${cur.ga.toFixed(2)} 0.5 0.5) translate(${cur.gx.toFixed(3)} ${cur.gy.toFixed(3)})`,
      );
      shine.current?.setAttribute("gradientTransform", `translate(${cur.sx.toFixed(3)} ${cur.sx.toFixed(3)})`);
      shineRect.current?.setAttribute("opacity", cur.so.toFixed(3));

      if (visible) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(tick);
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  const goldId = `${id}-gold`;
  const shineId = `${id}-shine`;
  const maskId = `${id}-mask`;

  return (
    <div
      ref={stage}
      aria-hidden="true"
      className="flex w-full justify-start py-1 perspective-[900px] select-none md:justify-center md:py-2"
    >
      <div ref={tilt} className="relative transform-3d will-change-transform">
        <div className="pointer-events-none absolute inset-[12%] -z-10 rounded-full bg-gold/40 opacity-90 blur-[32px] translate-z-[-60px] md:blur-[48px] lg:blur-[60px]"
        />
        <svg viewBox="6 6 56 56" className="block h-auto w-[88px] sm:w-[104px] md:w-[180px] lg:w-[220px] drop-shadow-[0_24px_40px_rgb(0_0_0/0.55)]">
          <defs>
            <linearGradient ref={gold} id={goldId} x1="0" y1="0" x2="0.35" y2="1" spreadMethod="reflect">
              {goldStops.map(([offset, color]) => (
                <stop key={offset} offset={offset} stopColor={color} />
              ))}
            </linearGradient>
            <linearGradient ref={shine} id={shineId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0.38" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="0.62" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
              <path
                d="M7 27a20 20 0 1 0 40 0a20 20 0 1 0 -40 0Z M16 27a11 11 0 1 0 22 0a11 11 0 1 0 -22 0Z"
                fill="#fff"
                fillRule="evenodd"
              />
              <rect x="45.25" y="45.25" width="15.5" height="15.5" rx="2" fill="none" stroke="#fff" strokeWidth="2.5" />
              <line x1="53" y1="45.25" x2="53" y2="60.75" stroke="#fff" strokeWidth="2.5" />
              <line x1="53" y1="53" x2="60.75" y2="53" stroke="#fff" strokeWidth="2.5" />
            </mask>
          </defs>
          <g mask={`url(#${maskId})`}>
            <rect x="0" y="0" width="64" height="64" fill={`url(#${goldId})`} />
            <rect
              ref={shineRect}
              x="0"
              y="0"
              width="64"
              height="64"
              fill={`url(#${shineId})`}
              opacity="0"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
