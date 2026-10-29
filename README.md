# optimum-website

The website for Optimum, a minimal terminal emulator for multiplexer users.

Built with Next.js and Tailwind CSS. It's a single static page.

## Getting started

You need Node.js 20+ and pnpm.

```sh
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Build

```sh
pnpm build
pnpm start
```

## Configuration

Copy `.env.example` to `.env.local` and set the site URL:

```sh
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

It's used for canonical links, Open Graph tags, `robots.txt` and `sitemap.xml`. Without it everything points to `http://localhost:3000`.

Page copy, SEO text and links are in `src/lib/site.ts`.

## Downloads

The download buttons point to `/download/macos`, `/download/windows` and `/download/linux`. Each one looks up the latest release of [optimumterm/optimum-term](https://github.com/optimumterm/optimum-term) and redirects to the matching file:

| Route | File |
| --- | --- |
| `/download/windows` | `optimum-setup-*.exe` |
| `/download/macos` | `Optimum-*-macos-*.zip` |
| `/download/linux` | `*.AppImage` |

If there's no release or no matching file, it redirects to the releases page instead. The patterns are in `src/lib/site.ts`.

The GitHub response is cached for 5 minutes. Set `GITHUB_TOKEN` if you hit the API rate limit.

## Project structure

```
public/                   PWA icons for the manifest
src/
  app/
    page.tsx              the page
    layout.tsx            metadata, fonts
    globals.css           Tailwind setup and theme tokens
    opengraph-image.tsx   social preview image
    favicon.ico, icon.svg favicons
    apple-icon.png        iOS home screen icon
    robots.ts, sitemap.ts, manifest.ts
    download/[os]/route.ts  redirects to the latest release file
  components/
    HeroMark.tsx          animated logo
    PrincipleCard.tsx     feature card
    DownloadButtons.tsx   download buttons, picks the visitor's OS
  lib/
    site.ts               copy, links, SEO
    brand.ts              logo and background SVGs
```

## License

[0BSD](LICENSE). Do whatever you want with it. The Inter and JetBrains Mono fonts keep their own license (SIL Open Font License 1.1).
