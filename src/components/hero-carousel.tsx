"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Slide = {
  image: string;
  alt: string;
  tint: string;
  eyebrow: string;
  title: string;
  sub: string;
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
  badge?: string;
};

const SLIDES: Slide[] = [
  {
    image: "https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    alt: "Sunlit atelier interior with a tan leather bag and folded cashmere",
    tint: "bg-[linear-gradient(100deg,rgba(35,44,77,0.94)_0%,rgba(58,63,99,0.78)_48%,rgba(28,24,20,0.3)_100%)]",
    eyebrow: "SS26 new season",
    title: "Fashion, accessories & home",
    sub: "Nine departments, one standard — everything you wear, carry and keep, made in small runs.",
    cta: { label: "Shop now", href: "/shop" },
    secondary: { label: "Explore collections", href: "/collections" },
    badge: "Up to 20% off selected pieces",
  },
  {
    image: "https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    alt: "Signature leather and cashmere pieces on plaster and travertine blocks",
    tint: "bg-[linear-gradient(100deg,rgba(74,52,25,0.94)_0%,rgba(141,106,46,0.78)_48%,rgba(28,24,20,0.3)_100%)]",
    eyebrow: "The signature edit",
    title: "The pieces that define the house",
    sub: "Redrawn at least twice, restocked forever. Leather, cashmere, gold and stoneware we would rebuild from memory.",
    cta: { label: "Shop the signature", href: "/collections/signature-collection" },
    secondary: { label: "View all collections", href: "/collections" },
  },
  {
    image: "https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    alt: "Woman in a bone wool coat on a city street at dusk",
    tint: "bg-[linear-gradient(100deg,rgba(28,24,20,0.95)_0%,rgba(58,51,43,0.8)_48%,rgba(28,24,20,0.28)_100%)]",
    eyebrow: "The dressed house",
    title: "Women & men, cut in Portugal",
    sub: "Coats without linings, shirting with one-piece collars, trousers with side adjusters instead of belts.",
    cta: { label: "Shop the wardrobe", href: "/collections/the-wardrobe" },
    secondary: { label: "Shop women", href: "/shop?category=womenswear" },
  },
  {
    image: "https://images.pexels.com/photos/4862911/pexels-photo-4862911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    alt: "Ivory gift box with champagne ribbon and folded cashmere",
    tint: "bg-[linear-gradient(100deg,rgba(74,29,36,0.94)_0%,rgba(110,47,58,0.78)_48%,rgba(28,24,20,0.3)_100%)]",
    eyebrow: "The gift edit",
    title: "Wrapped by hand, priced for giving",
    sub: "One-size pieces across the house, a written card, and prices never on the packing note.",
    cta: { label: "Find a gift", href: "/gifts" },
    secondary: { label: "Meet the concierge", href: "/journal/the-considered-gift" },
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 6500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  return (
    <section
      aria-label="Veranne campaign"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[480px] w-full overflow-hidden bg-ink md:h-[560px]"
    >
      <Link
        href="/case-studies/ecommerce-experience"
        className="absolute left-5 top-5 z-20 rounded-full border border-champagne/50 bg-ink/55 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.24em] text-champagne backdrop-blur-sm transition hover:bg-ink/85 md:left-10 md:top-6"
      >
        WordbitX · Portfolio Demo
      </Link>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className={`absolute inset-0 ${slide.tint}`} />
          <div className="shell relative flex h-full flex-col justify-end pb-16 md:justify-center md:pb-0">
            <div className="max-w-xl">
              <p className="eyebrow !text-champagne">{slide.eyebrow}</p>
              <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4.6rem)] text-ivory">
                {slide.title}
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory/80">{slide.sub}</p>
              {slide.badge ? (
                <p className="mt-4 inline-block border border-champagne/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
                  {slide.badge}
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={slide.cta.href} className="btn bg-ivory !text-ink hover:bg-accent hover:!text-ivory">
                  {slide.cta.label}
                </Link>
                <Link
                  href={slide.secondary.href}
                  className="btn border-ivory/50 text-ivory hover:bg-ivory hover:text-ink"
                >
                  {slide.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-ivory" : "w-3 bg-ivory/40 hover:bg-ivory/70"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-5 right-5 z-10 hidden gap-2 md:flex">
        <button
          type="button"
          onClick={() => setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length)}
          className="grid h-9 w-9 place-items-center rounded-full border border-ivory/40 text-ivory transition hover:bg-ivory hover:text-ink"
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setIndex((current) => (current + 1) % SLIDES.length)}
          className="grid h-9 w-9 place-items-center rounded-full border border-ivory/40 text-ivory transition hover:bg-ivory hover:text-ink"
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
