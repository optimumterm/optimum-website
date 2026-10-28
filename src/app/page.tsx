import { DownloadButtons } from "@/components/DownloadButtons";
import { HeroMark } from "@/components/HeroMark";
import { PrincipleCard } from "@/components/PrincipleCard";
import { isRealLink, principles, released, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#app`,
      name: site.name,
      url: site.url,
      description: site.description,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "Terminal emulator",
      operatingSystem: "macOS, Windows, Linux",
      image: `${site.url}/opengraph-image`,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      ...(isRealLink(site.links.github) && {
        sameAs: [site.links.github],
        codeRepository: site.links.github,
      }),
      downloadUrl: released.map((os) => `${site.url}${site.links[os]}`),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main className="flex flex-col gap-20 pt-14 pb-10 md:gap-28 md:pt-20 md:pb-14 lg:gap-32 lg:pt-24 lg:pb-12">
        <section
          aria-labelledby="hero-title"
          className="mx-auto grid w-full max-w-[1120px] items-center gap-5 px-5 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 lg:gap-12 lg:px-6"
        >
          <div className="min-w-0">
            <p className="m-0 font-mono text-[13px] tracking-[0.08em] text-gold uppercase md:text-sm">
              Terminal emulator · macOS, Windows &amp; Linux
            </p>
            <h1
              id="hero-title"
              className="mt-3 mb-0 font-mono text-[2rem] leading-[1.08] font-medium tracking-[-0.03em] text-balance sm:text-[2.25rem] md:mt-4 md:text-[2.5rem] md:leading-[1.05] lg:text-[2.75rem]"
            >
              {site.tagline}
            </h1>
            <p className="mt-4 mb-0 max-w-[560px] text-base leading-[1.55] text-pretty text-fg-2 md:mt-5 md:text-lg">
              One window, one job. No tabs. Your multiplexer handles the rest.
            </p>
            <DownloadButtons />
          </div>
          <div className="order-first md:order-last">
            <HeroMark />
          </div>
        </section>

        <section
          aria-labelledby="principles-title"
          className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-6"
        >
          <h2
            id="principles-title"
            className="m-0 font-mono text-[1.375rem] leading-tight font-medium tracking-[-0.02em] text-balance md:text-[1.75rem]"
          >
            Everything a terminal needs. Nothing it doesn&apos;t.
          </h2>
          <p className="mt-2 mb-0 max-w-[620px] text-[15px] leading-[1.55] text-pretty text-fg-3 md:text-base">
            Optimum does one thing: renders your shell, fast and sharp. Sessions, windows and panes stay with your
            multiplexer.
          </p>
          <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 md:mt-7 lg:grid-cols-4">
            {principles.map((p) => (
              <PrincipleCard key={p.title} title={p.title} text={p.text} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
