import Link from "next/link";
import { WORDBITX } from "@/lib/brand";

/**
 * Slim WordbitX portfolio band rendered above the footer so the ownership of
 * the demonstration is visible on every page without competing with the brand.
 */
export function WordbitXStrip() {
  return (
    <section
      aria-label="About WordbitX"
      className="border-t border-line bg-[linear-gradient(120deg,#1c1814_0%,#2c2318_60%,#8d6a2e_135%)] text-ivory"
    >
      <div className="shell flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-champagne/40 font-serif text-2xl text-champagne"
          >
            W
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne">
              {WORDBITX.name} · {WORDBITX.positioning}
            </p>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ivory/70">
              This premium storefront is a working portfolio demonstration, designed and developed
              end to end by {WORDBITX.name}.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
              <a
                href={WORDBITX.primaryPhone.href}
                className="link-underline font-semibold text-ivory"
                aria-label={`Call WordbitX primary office at ${WORDBITX.primaryPhone.label}`}
              >
                {WORDBITX.primaryPhone.region}: {WORDBITX.primaryPhone.label}
              </a>
              <a
                href={WORDBITX.usaPhone.href}
                className="link-underline text-ivory/70 hover:text-ivory"
                aria-label={`Call WordbitX USA line at ${WORDBITX.usaPhone.label}`}
              >
                {WORDBITX.usaPhone.region}: {WORDBITX.usaPhone.label}
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={WORDBITX.primaryPhone.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-ivory !px-5 !py-2.5 !text-[10px] !text-ink hover:bg-accent hover:!text-ivory"
          >
            WhatsApp WordbitX
          </a>
          <Link
            href="/ecommerce-website-development"
            className="btn !px-5 !py-2.5 !text-[10px] border-ivory/40 text-ivory hover:bg-ivory hover:text-ink"
          >
            Build your online store
          </Link>
          <a
            href={WORDBITX.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne"
          >
            {WORDBITX.url.replace("https://", "")} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
