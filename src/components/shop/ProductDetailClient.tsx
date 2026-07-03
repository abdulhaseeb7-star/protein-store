"use client";
import { useState, useMemo } from "react";
import { useCartStore } from "@/store/cart-store";

type Variant = {
  id: string;
  flavor: string | null;
  size: string | null;
  price: number;
  stock: number;
};

export default function ProductDetailClient({
  productId,
  slug,
  name,
  brand,
  basePrice,
  imageUrl,
  variants,
}: {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
  variants: Variant[];
}) {
  const addItem = useCartStore((state) => state.addItem);

  const flavors = useMemo(
    () => [...new Set(variants.map((v) => v.flavor).filter(Boolean))] as string[],
    [variants]
  );
  const sizes = useMemo(
    () => [...new Set(variants.map((v) => v.size).filter(Boolean))] as string[],
    [variants]
  );

  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(flavors[0] ?? null);
  const [selectedSize, setSelectedSize] = useState<string | null>(sizes[0] ?? null);

  const matchedVariant = variants.find(
    (v) => v.flavor === selectedFlavor && v.size === selectedSize
  );

  const displayPrice = matchedVariant ? matchedVariant.price : basePrice;
  const inStock = matchedVariant ? matchedVariant.stock > 0 : true;

  const handleAddToCart = () => {
    addItem({
      id: matchedVariant ? `${productId}-${matchedVariant.id}` : productId,
      slug,
      name: matchedVariant
        ? `${name}${selectedFlavor ? ` - ${selectedFlavor}` : ""}${selectedSize ? ` (${selectedSize})` : ""}`
        : name,
      brand,
      price: displayPrice,
      imageUrl,
    });
  };

  return (
    <div className="mb-6">
      <p className="mb-6 font-[var(--font-display)] text-[32px] text-[var(--gold-bright)]">
        ${displayPrice.toFixed(2)}
      </p>

      {flavors.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-[12px] font-semibold text-[var(--muted)]">Flavor</p>
          <div className="flex flex-wrap gap-2">
            {flavors.map((flavor) => (
              <button
                key={flavor}
                onClick={() => setSelectedFlavor(flavor)}
                className={`rounded-lg border px-4 py-2 text-[12.5px] font-semibold transition-colors ${
                  selectedFlavor === flavor
                    ? "border-[var(--gold-bright)] bg-[var(--surface-2)] text-[var(--gold-bright)]"
                    : "border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div className="mb-6">
          <p className="mb-2 text-[12px] font-semibold text-[var(--muted)]">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`rounded-lg border px-4 py-2 text-[12.5px] font-semibold transition-colors ${
                  selectedSize === size
                    ? "border-[var(--gold-bright)] bg-[var(--surface-2)] text-[var(--gold-bright)]"
                    : "border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {!inStock && (
        <p className="mb-4 text-[12.5px] font-semibold text-[var(--ember)]">Out of stock</p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="flex-1 rounded-xl bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] px-7 py-4 text-[13px] font-extrabold text-[#1A1300] disabled:opacity-50"
        >
          Add to cart
        </button>
        <button
          disabled={!inStock}
          className="rounded-xl border border-[var(--border)] px-7 py-4 text-[13px] font-bold text-[var(--text)] disabled:opacity-50"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}