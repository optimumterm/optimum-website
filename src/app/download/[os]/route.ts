import { downloads, site, type Platform } from "@/lib/site";

type Release = {
  html_url: string;
  assets: { name: string; browser_download_url: string }[];
};

const isPlatform = (os: string): os is Platform => os in downloads;

async function latestRelease(): Promise<Release | null> {
  const res = await fetch(`https://api.github.com/repos/${site.repo}/releases/latest`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "optimum-website",
      ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
    },
    next: { revalidate: 300 },
  }).catch(() => null);
  if (!res?.ok) return null;
  return res.json();
}

export async function GET(_request: Request, { params }: { params: Promise<{ os: string }> }) {
  const { os } = await params;
  if (!isPlatform(os)) return new Response("Not found", { status: 404 });

  const release = await latestRelease();
  const asset = release?.assets.find((a) => downloads[os].test(a.name));
  const target = asset?.browser_download_url ?? release?.html_url ?? `${site.links.github}/releases`;

  return Response.redirect(target, 302);
}
