"use client";

import { useSyncExternalStore } from "react";
import { released, site, type Platform } from "@/lib/site";

const platforms: { os: Platform; label: string; href: string }[] = [
  { os: "macos", label: "macOS", href: site.links.macos },
  { os: "windows", label: "Windows", href: site.links.windows },
  { os: "linux", label: "Linux", href: site.links.linux },
];

const detectOs = (): Platform | null => {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const source = `${nav.userAgentData?.platform ?? ""} ${nav.platform ?? ""} ${nav.userAgent}`;
  if (/android/i.test(source)) return null;
  if (/win/i.test(source)) return "windows";
  if (/mac|iphone|ipad|ipod/i.test(source)) return "macos";
  if (/linux|x11|cros/i.test(source)) return "linux";
  return null;
};

const subscribe = () => () => {};

const btn =
  "inline-flex min-h-12 items-center justify-center rounded-[10px] px-[22px] text-base font-medium no-underline transition duration-200 ease-out motion-reduce:transition-none";

const primary = `${btn} bg-linear-to-b from-[#f2d27a] to-[#c99a3a] font-semibold text-ink hover:-translate-y-0.5 hover:text-ink hover:shadow-[0_10px_30px_-8px_rgb(233_196_106/0.55)] hover:brightness-110 active:translate-y-0`;

const secondary = `${btn} border border-white/50 text-fg hover:-translate-y-0.5 hover:border-fg hover:bg-white/5 hover:text-fg active:translate-y-0`;

const disabled = `${btn} cursor-not-allowed gap-1.5 border border-white/15 text-fg-3`;

const github = `${btn} group gap-1.5 px-2`;

const isReleased = (os: Platform) => released.includes(os);

export function DownloadButtons() {
  const detected = useSyncExternalStore(subscribe, detectOs, () => null);
  const current = detected && isReleased(detected) ? detected : released[0];
  const rank = (os: Platform) => (os === current ? 0 : isReleased(os) ? 1 : 2);
  const ordered = [...platforms].sort((a, b) => rank(a.os) - rank(b.os));

  return (
    <div className="mt-6 grid grid-cols-1 gap-3 md:mt-7 md:max-w-[500px] md:grid-cols-2">
      {ordered.map((p) =>
        isReleased(p.os) ? (
          <a key={p.os} href={p.href} className={p.os === current ? primary : secondary}>
            Download for {p.label}
          </a>
        ) : (
          <span key={p.os} role="link" aria-disabled="true" className={disabled}>
            {p.label}
            <span className="text-sm text-fg-3/70">· coming soon</span>
          </span>
        ),
      )}
      <a href={site.links.github} rel="noopener" className={github}>
        View on GitHub
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
        >
          →
        </span>
      </a>
    </div>
  );
}
