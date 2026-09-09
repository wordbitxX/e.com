function StarRow({ className }: { className: string }) {
  return (
    <span className={`flex gap-px ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
          <path d="M10 1.6 12.4 6.6l5.5.7-4 3.8 1 5.4L10 13.9 5.1 16.5l1-5.4-4-3.8 5.5-.7L10 1.6Z" />
        </svg>
      ))}
    </span>
  );
}

/** Sample review rating — clearly presented as demonstration content. */
export function RatingStars({
  average,
  count,
  className = "",
}: {
  average: number;
  count: number;
  className?: string;
}) {
  const percent = Math.max(0, Math.min(100, (average / 5) * 100));
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      title="Demonstration rating from sample reviews"
    >
      <span className="relative inline-flex">
        <StarRow className="text-line" />
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${percent}%` }}
        >
          <StarRow className="text-champagne" />
        </span>
      </span>
      <span className="text-[11px] text-ink-muted">
        {average.toFixed(1)} ({count})
      </span>
    </div>
  );
}
