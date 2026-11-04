export type MarkPlat = "mark" | "fav" | "square" | "maskable";

export const markPalette = ["#17113D", "#2E22A8", "#5B3DF0", "#9A6BFF", "#FF86DC", "#FFF0FA"] as const;

const f = (n: number) => n.toFixed(2);

const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${f(x + r)} ${f(y)}H${f(x + w - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w)} ${f(y + r)}V${f(y + h - r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + w - r)} ${f(y + h)}H${f(x + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y + h - r)}V${f(y + r)}A${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(y)}Z`;

const clips: Record<MarkPlat, string> = {
  mark: rr(0, 0, 100, 100, 30),
  fav: rr(0, 0, 100, 100, 22),
  square: rr(0, 0, 100, 100, 0),
  maskable: rr(0, 0, 100, 100, 0),
};

const scales = [1, 0.78, 0.58, 0.4, 0.25, 0.12];

const layer = (k: number, i: number) => {
  if (i === 0) return "M-5 -5H105V105H-5Z";
  const x = 67 + (6 - 67) * k;
  const y = 33 + (6 - 33) * k;
  const w = 88 * k;
  return rr(x, y, w, w, w * 0.3);
};

export const mark = (plat: MarkPlat = "mark") => ({
  clip: clips[plat],
  layers: scales.map((k, i) => ({ d: layer(k, i), fill: markPalette[i] })),
});

export const markSvg = (size: number, plat: MarkPlat = "mark") => {
  const { clip, layers } = mark(plat);
  const paths = layers.map((l) => `<path d="${l.d}" fill="${l.fill}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100"><defs><clipPath id="c"><path d="${clip}"/></clipPath><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.14"/><stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient></defs><g clip-path="url(#c)">${paths}<path d="${clip}" fill="url(#s)"/></g></svg>`;
};

export const svgDataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
