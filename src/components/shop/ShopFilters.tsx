"use client";

export default function ShopFilters({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}: {
  categories: string[];
  brands: string[];
  selectedCategory: string | null;
  selectedBrand: string | null;
  onCategoryChange: (c: string | null) => void;
  onBrandChange: (b: string | null) => void;
}) {
  return (
    <aside className="w-full shrink-0 lg:w-60">
      <div className="mb-8">
        <p className="mb-3 text-[11px] font-bold tracking-[1.5px] text-[var(--gold-bright)]">CATEGORY</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onCategoryChange(null)}
            className={`rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition-colors ${
              selectedCategory === null ? "bg-[var(--surface-2)] text-[var(--gold-bright)]" : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className={`rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition-colors ${
                selectedCategory === c ? "bg-[var(--surface-2)] text-[var(--gold-bright)]" : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-[11px] font-bold tracking-[1.5px] text-[var(--gold-bright)]">BRAND</p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onBrandChange(null)}
            className={`rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition-colors ${
              selectedBrand === null ? "bg-[var(--surface-2)] text-[var(--gold-bright)]" : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            All brands
          </button>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => onBrandChange(b)}
              className={`rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition-colors ${
                selectedBrand === b ? "bg-[var(--surface-2)] text-[var(--gold-bright)]" : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}