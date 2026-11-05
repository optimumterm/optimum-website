import { downloads, site, type Platform } from "@/lib/site";

export const dynamic = "force-dynamic";

const isPlatform = (os: string): os is Platform => Object.hasOwn(downloads, os);

export async function GET(_request: Request, { params }: { params: Promise<{ os: string }> }) {
  const { os } = await params;
  if (!isPlatform(os)) return new Response("Not found", { status: 404 });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${site.links.github}/releases/latest/download/${downloads[os]}`,
      "Cache-Control": "no-store",
    },
  });
}
