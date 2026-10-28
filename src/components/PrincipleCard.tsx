"use client";

import { useRef, type PointerEvent } from "react";

type Props = {
  title: string;
  text: string;
};

export function PrincipleCard({ title, text }: Props) {
  const ref = useRef<HTMLLIElement>(null);

  const onPointerMove = (e: PointerEvent<HTMLLIElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <li
      ref={ref}
      onPointerMove={onPointerMove}
      className="group relative rounded-[14px] bg-line p-px transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div
        aria-hidden="true"
        className="spotlight-border pointer-events-none absolute inset-0 rounded-[14px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative h-full overflow-hidden rounded-[13px] bg-surface p-5">
        <div
          aria-hidden="true"
          className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <h3 className="relative m-0 font-mono text-base font-medium transition-colors duration-300 group-hover:text-gold-hover">
          {title}
        </h3>
        <p className="relative mt-1.5 mb-0 text-sm leading-normal text-fg-3">{text}</p>
      </div>
    </li>
  );
}
