import { ImageResponse } from "next/og";
import { svgDataUri, tileSvg } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <img src={svgDataUri(tileSvg(180))} width={180} height={180} alt="" />,
    size,
  );
}
