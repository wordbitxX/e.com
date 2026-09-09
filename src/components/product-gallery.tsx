"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProductImage } from "@/lib/catalog";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [lightbox, setLightbox] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const active = images[index];

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div className="lg:sticky lg:top-24">
      {/* Mobile: swipeable film strip */}
      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto lg:hidden"
        onScroll={(event) => {
          const node = event.currentTarget;
          setIndex(Math.round(node.scrollLeft / node.clientWidth));
        }}
        aria-label={`${name} images, swipe to browse`}
      >
        {images.map((image, i) => (
          <div key={image.url} className="relative aspect-[4/5] w-screen shrink-0 snap-center bg-cream">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5 lg:hidden">
        {images.map((image, i) => (
          <span
            key={image.url}
            className={`h-1 w-6 transition-colors ${i === index ? "bg-ink" : "bg-line"}`}
          />
        ))}
      </div>

      {/* Desktop: hero + thumbnails */}
      <div className="hidden gap-4 lg:flex">
        <div className="flex w-20 shrink-0 flex-col gap-3">
          {images.map((image, i) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              className={`relative aspect-[4/5] overflow-hidden border transition ${
                i === index ? "border-ink" : "border-transparent hover:border-line"
              }`}
            >
              <Image src={image.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>

        <div
          className="relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden bg-cream"
          data-cursor="Zoom"
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onMouseMove={onMove}
          onClick={() => setLightbox(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setLightbox(true);
            }
          }}
          aria-label={`Open ${name} image at full size`}
        >
          <Image
            src={active.url}
            alt={active.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]"
            style={{
              transform: zoomed ? "scale(1.7)" : "scale(1)",
              transformOrigin: origin,
            }}
          />
          <span className="absolute bottom-4 right-4 bg-ivory/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em]">
            {active.kind === "detail"
              ? "Detail"
              : active.kind === "lifestyle"
                ? "In use"
                : `${index + 1} / ${images.length}`}
          </span>
        </div>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} full size image`}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-6 top-6 text-[10px] uppercase tracking-[0.2em] text-ivory"
          >
            Close
          </button>
          <div className="relative h-[86vh] w-full max-w-4xl">
            <Image src={active.url} alt={active.alt} fill sizes="90vw" className="object-contain" />
          </div>
          <div className="absolute bottom-6 flex gap-2">
            {images.map((image, i) => (
              <button
                key={image.url}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setIndex(i);
                }}
                aria-label={`Show image ${i + 1}`}
                className={`h-1.5 w-8 transition-colors ${i === index ? "bg-ivory" : "bg-ivory/35"}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
