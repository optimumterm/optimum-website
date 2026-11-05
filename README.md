# Optimum website

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

The download buttons point to `/download/macos`, `/download/windows` and `/download/linux`. Each one redirects to the matching file of the latest release of [optimumterm/optimum-term](https://github.com/optimumterm/optimum-term) through GitHub's `releases/latest/download` link, so a new release is picked up immediately:

| Route | File |
| --- | --- |
| `/download/windows` | `Optimum.exe` |
| `/download/macos` | `Optimum.dmg` |
| `/download/linux` | `Optimum.AppImage` |

The redirect is sent with `Cache-Control: no-store`. Release files must keep these exact names. They are in `src/lib/site.ts`.

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
    PrincipleCard.tsx     feature card
    DownloadButtons.tsx   download buttons, picks the visitor's OS
  lib/
    site.ts               copy, links, SEO
    brand.ts              logo and background SVGs
```

## License

[0BSD](LICENSE). Do whatever you want with it. The Inter and JetBrains Mono fonts keep their own license (SIL Open Font License 1.1).
