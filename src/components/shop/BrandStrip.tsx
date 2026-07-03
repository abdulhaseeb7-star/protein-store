import Link from "next/link";

const brands = ["Optimum Nutrition", "Muscletech", "BSN", "Dymatize", "Cellucor", "MyProtein"];

export default function BrandStrip() {
  return (
    <div className="flex items-center justify-between border-y border-[var(--border)] px-12 py-5">
      <div className="flex items-center gap-12">
        {brands.map((b) => (
          <span
            key={b}
            className="cursor-pointer text-sm font-bold tracking-wide text-[var(--muted)] opacity-70 transition-opacity hover:opacity-100 hover:text-[var(--text)]"
          >
            {b.toUpperCase()}
          </span>
        ))}
      </div>
      <Link href="/brands" className="flex items-center gap-1 text-xs font-bold text-[var(--gold-bright)]">
        View all brands →
      </Link>
    </div>
  );
}