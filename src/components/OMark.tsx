import { useId } from "react";
import { mark, type MarkPlat } from "@/lib/brand";

type Props = {
  plat?: MarkPlat;
  className?: string;
  decorative?: boolean;
};

export function OMark({ plat = "mark", className, decorative = false }: Props) {
  const id = useId().replace(/:/g, "");
  const { clip, layers } = mark(plat);

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : "Optimum"}
      aria-hidden={decorative || undefined}
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={clip} />
        </clipPath>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        {layers.map((l) => (
          <path key={l.fill} d={l.d} fill={l.fill} />
        ))}
        <path d={clip} fill={`url(#${id}-sheen)`} />
      </g>
    </svg>
  );
}
