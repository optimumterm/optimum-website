export const goldStops = [
  ["0", "#FFF3C4"],
  ["0.22", "#E9C46A"],
  ["0.42", "#FFF8E1"],
  ["0.52", "#B8862B"],
  ["0.66", "#F7D9A8"],
  ["0.8", "#F2D27A"],
  ["1", "#A9781F"],
] as const;

export const oilStops = [
  ["0", "#1B2A6B"],
  ["0.16", "#7A3FD1"],
  ["0.3", "#D9468F"],
  ["0.45", "#E9B44C"],
  ["0.6", "#6FD98A"],
  ["0.74", "#2BB8C9"],
  ["0.88", "#3E5BE0"],
  ["1", "#8A3FD1"],
] as const;

const stops = (list: readonly (readonly [string, string])[]) =>
  list.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("");

const markMaskBody =
  '<path d="M7 27a20 20 0 1 0 40 0a20 20 0 1 0 -40 0Z M16 27a11 11 0 1 0 22 0a11 11 0 1 0 -22 0Z" fill="#fff" fill-rule="evenodd"/><rect x="45.25" y="45.25" width="15.5" height="15.5" rx="2" fill="none" stroke="#fff" stroke-width="2.5"/><line x1="53" y1="45.25" x2="53" y2="60.75" stroke="#fff" stroke-width="2.5"/><line x1="53" y1="53" x2="60.75" y2="53" stroke="#fff" stroke-width="2.5"/>';

export const markSvg = (size: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="6 6 56 56"><defs><linearGradient id="g" x1="0" y1="0" x2="0.35" y2="1">${stops(goldStops)}</linearGradient><mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">${markMaskBody}</mask></defs><rect x="0" y="0" width="64" height="64" fill="url(#g)" mask="url(#m)"/></svg>`;

export const sheenBleed = 400;

export const sheenSvg = (w: number, h: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w + 2 * sheenBleed}" height="${h + 2 * sheenBleed}" viewBox="${-sheenBleed} ${-sheenBleed} ${w + 2 * sheenBleed} ${h + 2 * sheenBleed}"><defs><linearGradient id="gr" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#909196"/><stop offset="1" stop-color="#6E6F74"/></linearGradient><linearGradient id="oil" x1="0" y1="0" x2="1" y2="1">${stops(oilStops)}</linearGradient><filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="260" xChannelSelector="R" yChannelSelector="G" result="d"/><feComposite in="d" in2="SourceGraphic" operator="over"/></filter></defs><rect x="${-sheenBleed}" y="${-sheenBleed}" width="${w + 2 * sheenBleed}" height="${h + 2 * sheenBleed}" fill="url(#gr)"/><rect x="${-sheenBleed}" y="${-sheenBleed}" width="${w + 2 * sheenBleed}" height="${h + 2 * sheenBleed}" fill="url(#oil)" filter="url(#sh)" opacity="0.16"/></svg>`;

export const tileSvg = (size: number) => {
  const ms = 10 * 1024 / 824;
  const mt = 512 - 34 * ms;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024"><defs><linearGradient id="g" x1="0" y1="0" x2="0.35" y2="1">${stops(goldStops)}</linearGradient><linearGradient id="gr" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#909196"/><stop offset="1" stop-color="#6E6F74"/></linearGradient><linearGradient id="oil" x1="0" y1="0" x2="1" y2="1">${stops(oilStops)}</linearGradient><filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.0035" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="240" xChannelSelector="R" yChannelSelector="G" result="d"/><feComposite in="d" in2="SourceGraphic" operator="over"/></filter><mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">${markMaskBody}</mask></defs><rect width="1024" height="1024" fill="url(#gr)"/><rect x="-400" y="-400" width="1824" height="1824" fill="url(#oil)" filter="url(#sh)" opacity="0.16"/><g transform="translate(${mt} ${mt}) scale(${ms})" mask="url(#m)"><rect width="64" height="64" fill="url(#g)"/></g></svg>`;
};

export const svgDataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
