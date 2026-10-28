export const site = {
  name: "Optimum",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  title: "Optimum — a minimal terminal emulator for multiplexer users",
  tagline: "A minimal terminal emulator for multiplexer users.",
  description:
    "Optimum is a minimal, open-source terminal emulator for macOS, Windows and Linux built on libghostty. One window, one job. No tabs: your multiplexer handles the rest. No telemetry, no built-in AI.",
  keywords: [
    "terminal emulator",
    "terminal",
    "tmux",
    "zellij",
    "screen",
    "multiplexer",
    "libghostty",
    "ghostty",
    "macOS terminal",
    "Windows terminal",
    "Linux terminal",
    "WSL",
    "open source",
    "minimal terminal",
  ],
  repo: "optimum-term/optimum-term",
  links: {
    macos: "/download/macos",
    windows: "/download/windows",
    linux: "/download/linux",
    github: "https://github.com/optimum-term/optimum-term",
  },
} as const;

export const downloads = {
  macos: /\.dmg$/i,
  windows: /^optimum-setup-.*\.exe$/i,
  linux: /\.appimage$/i,
} as const;

export type Platform = keyof typeof downloads;

export const principles = [
  { title: "Open source", text: "All of the code is public. Read it, build it, fork it." },
  { title: "No tabs", text: "Window management belongs to your multiplexer. Optimum stays out of its way." },
  { title: "No telemetry", text: "No analytics, no crash reports, no tracking of any kind." },
  { title: "No built-in AI", text: "A terminal, not an assistant." },
  {
    title: "Appearance-only config",
    text: "Font, colors and spacing are yours to set. Everything else is kept simple on purpose.",
  },
  { title: "Sharp text", text: "Rendering tuned for crisp, readable glyphs at every size." },
  {
    title: "Cross-platform",
    text: "macOS, Windows and Linux. Runs natively on macOS and Linux. On Windows, it works with your WSL shell.",
  },
  { title: "Non-commercial", text: "No paid tier, no account, no upsell." },
];

export const isRealLink = (href: string) => href !== "#" && href.length > 0;
