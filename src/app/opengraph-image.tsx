import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { markSvg, svgDataUri } from "@/lib/brand";

export const alt = "Optimum — a minimal terminal emulator for multiplexer users. Open source, no tabs, no telemetry, no AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

export default async function OpengraphImage() {
  const [mono, inter] = await Promise.all([
    font("jetbrains-mono", "jetbrains-mono-latin-600-normal.woff"),
    font("inter", "inter-latin-500-normal.woff"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0A0817",
        backgroundImage: "radial-gradient(90% 120% at 85% 10%, #2E22A8 0%, #17113D 38%, #0A0817 70%)",
      }}
    >
      <img
        src={svgDataUri(markSvg(760))}
        width={760}
        height={760}
        alt=""
        style={{ position: "absolute", right: -260, top: -280, opacity: 0.12 }}
      />
      <div
        style={{
          position: "relative",
          width: 1200,
          height: 630,
          padding: "0 96px",
          display: "flex",
          alignItems: "center",
          gap: 64,
        }}
      >
        <img src={svgDataUri(markSvg(240))} width={240} height={240} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 112,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              lineHeight: 1,
            }}
          >
            optimum
          </div>
          <div style={{ fontFamily: "Inter", fontSize: 34, color: "#D6D2EE", lineHeight: 1.25 }}>
            A minimal terminal for multiplexer users.
          </div>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 22, color: "#C9B5FF", letterSpacing: "0.04em" }}>
            open source · no tabs · no telemetry · no AI
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: mono, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
