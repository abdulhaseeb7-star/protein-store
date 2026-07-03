"use client";
import { useState, useMemo } from "react";
import ProductCard, { ProductCardProps } from "./ProductCard";
import ShopFilters from "./ShopFilters";

type Product = ProductCardProps & { category: string };

export default function ShopPageClient({
  products,
  categories,
  brands,
}: {
  products: Product[];
  categories: string[];
  brands: string[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      return true;
    });

    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, category, brand, sort]);

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <ShopFilters
        categories={categories}
        brands={brands}
        selectedCategory={category}
        selectedBrand={brand}
        onCategoryChange={setCategory}
        onBrandChange={setBrand}
      />

      <div className="flex-1">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[13px] text-[var(--muted)]">{filtered.length} products</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--text)]"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-[var(--muted)]">No products match these filters.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}