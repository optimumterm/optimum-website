import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { markSvg, sheenBleed, sheenSvg, svgDataUri } from "@/lib/brand";

export const alt = "Optimum — the terminal for multiplexer people. Open source, no tabs, no telemetry, no AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

export default async function OpengraphImage() {
  const [mono, inter] = await Promise.all([
    font("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff"),
    font("inter", "inter-latin-500-normal.woff"),
  ]);

  return new ImageResponse(
    <div style={{ width: 1200, height: 630, display: "flex", position: "relative", overflow: "hidden" }}>
      <img
        src={svgDataUri(sheenSvg(1200, 630))}
        width={1200 + 2 * sheenBleed}
        height={630 + 2 * sheenBleed}
        alt=""
        style={{ position: "absolute", left: -sheenBleed, top: -sheenBleed }}
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
        <img src={svgDataUri(markSvg(260))} width={260} height={260} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 112,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              lineHeight: 1,
            }}
          >
            optimum
          </div>
          <div style={{ fontFamily: "Inter", fontSize: 34, color: "#FFFFFF", lineHeight: 1.25 }}>
            The terminal for multiplexer people.
          </div>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 24, color: "#FFFFFF", opacity: 0.92 }}>
            open source · no tabs · no telemetry · no AI
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
