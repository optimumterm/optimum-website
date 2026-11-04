import { DownloadButtons } from "@/components/DownloadButtons";
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
      <main className="flex flex-col gap-16 pb-12 md:gap-32 md:pb-24">
        <section
          aria-labelledby="hero-title"
          className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_90%_0%,var(--color-indigo)_0%,var(--color-night)_40%,var(--color-bg)_75%)] md:bg-[radial-gradient(90%_120%_at_85%_10%,var(--color-indigo)_0%,var(--color-night)_38%,var(--color-bg)_70%)]"
        >
          <div className="relative mx-auto w-full max-w-[1120px] px-5 pt-[72px] pb-16 sm:px-8 md:py-[120px] lg:px-6">
            <div className="min-w-0">
              <p className="m-0 font-mono text-[13px] tracking-[0.08em] text-accent uppercase md:text-sm">
                Terminal emulator · macOS, Windows &amp; Linux
              </p>
              <h1
                id="hero-title"
                className="mt-3 mb-0 font-mono text-[2rem] leading-[1.08] font-semibold tracking-[-0.04em] text-balance md:mt-4 md:text-[2.5rem] md:leading-[1.04] lg:text-[3rem]"
              >
                {site.tagline}
              </h1>
              <p className="mt-4 mb-0 max-w-[560px] text-base leading-[1.55] text-pretty text-fg-2 md:mt-5 md:text-lg">
                One window, one job. No tabs. Your multiplexer handles the rest.
              </p>
              <DownloadButtons />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="principles-title"
          className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-6"
        >
          <h2
            id="principles-title"
            className="m-0 font-mono text-[1.4rem] leading-[1.2] font-semibold tracking-[-0.03em] text-balance md:text-[1.85rem]"
          >
            Everything a terminal needs. Nothing it doesn&apos;t.
          </h2>
          <p className="mt-2 mb-0 max-w-[620px] text-[15px] leading-[1.55] text-pretty text-fg-3 md:mt-2.5 md:text-base">
            Optimum does one thing: renders your shell, fast and sharp. Sessions, windows and panes stay with your
            multiplexer.
          </p>
          <ul className="m-0 mt-6 grid list-none grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3 p-0 md:mt-8 md:gap-3.5">
            {principles.map((p) => (
              <PrincipleCard key={p.title} title={p.title} text={p.text} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
