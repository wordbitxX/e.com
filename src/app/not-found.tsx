import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-6 text-[clamp(2.4rem,6vw,4.5rem)]">
        This page has left the atelier
      </h1>
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
        The piece or page you were looking for is not here. Everything currently made is in the
        shop, and the journal holds the guides.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/shop" className="btn btn-ink">
          Browse the shop
        </Link>
        <Link href="/collections" className="btn btn-outline">
          View collections
        </Link>
        <Link href="/journal" className="btn btn-quiet">
          Read the journal
        </Link>
      </div>
    </div>
  );
}
