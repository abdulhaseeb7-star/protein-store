"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export type ProductCardProps = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isBestseller?: boolean;
};

export default function ProductCard({
  id,
  slug,
  brand,
  name,
  price,
  rating,
  reviewCount,
  imageUrl,
  isBestseller,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Link
      href={`/products/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all hover:-translate-y-1 hover:border-[var(--gold)]/50"
    >
      <div className="relative h-[190px] w-full">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,10,12,0) 0%, rgba(10,10,12,0.35) 100%)" }}
        />
        {isBestseller && (
          <span className="absolute left-3 top-3 rounded-md bg-[var(--ember)] px-2.5 py-1 text-[9.5px] font-extrabold tracking-wide text-white">
            BESTSELLER
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-[10.5px] font-bold uppercase tracking-wide text-[var(--muted)]">{brand}</p>
        <p className="mb-2 mt-1 text-[14.5px] font-bold">{name}</p>

        <div className="mb-3 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-[var(--gold-bright)]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3" fill={i < Math.round(rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-[11px] text-[var(--muted)]">({reviewCount})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-[var(--font-display)] text-[19px] text-[var(--gold-bright)]">
            ${price.toFixed(2)}
          </span>
          <button
            aria-label={`Add ${name} to cart`}
            onClick={(e) => {
              e.preventDefault();
              addItem({ id, slug, name, brand, price, imageUrl });
            }}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-2)] transition-colors hover:border-[var(--gold-bright)] hover:bg-[var(--gold-bright)] hover:text-[#1A1300]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}