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

Download and GitHub links are in `src/lib/site.ts`, along with the page copy and SEO text.

## Project structure

```
src/
  app/
    page.tsx              the page
    layout.tsx            metadata, fonts
    globals.css           Tailwind setup and theme tokens
    opengraph-image.tsx   social preview image
    apple-icon.tsx        iOS home screen icon
    icon.svg              favicon
    robots.ts, sitemap.ts, manifest.ts
  components/
    HeroMark.tsx          animated logo
    PrincipleCard.tsx     feature card
    DownloadButtons.tsx   download buttons, picks the visitor's OS
  lib/
    site.ts               copy, links, SEO
    brand.ts              logo and background SVGs
```
