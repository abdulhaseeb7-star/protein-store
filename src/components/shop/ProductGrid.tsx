import Link from "next/link";
import ProductCard, { ProductCardProps } from "./ProductCard";

export default function ProductGrid({
  title,
  tag,
  products,
}: {
  title: string;
  tag: string;
  products: ProductCardProps[];
}) {
  return (
    <section className="px-12 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 text-[11px] font-bold tracking-[2px] text-[var(--gold-bright)]">{tag}</p>
          <h2 className="font-[var(--font-display)] text-[34px] uppercase">{title}</h2>
        </div>
        <Link
          href="/products"
          className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-[12.5px] font-bold text-[var(--muted)]"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}