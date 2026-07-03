import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Check, Truck, ShieldCheck } from "lucide-react";
import Header from "@/components/shop/Header";
import FeatureStrip from "@/components/shop/FeatureStrip";
import ProductDetailClient from "@/components/shop/ProductDetailClient";
import { prisma } from "@/lib/prisma";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { brand: true, category: true, variants: true, reviews: true },
  });

  if (!product) notFound();

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : 0;

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <section className="px-12 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="relative h-[480px] overflow-hidden rounded-3xl border border-[var(--border)]">
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
            {product.isFeatured && (
              <span className="absolute left-4 top-4 rounded-md bg-[var(--ember)] px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-white">
                BESTSELLER
              </span>
            )}
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">{product.brand.name}</p>
            <h1 className="mb-3 mt-1 font-[var(--font-display)] text-[34px] uppercase leading-tight">
              {product.name}
            </h1>

            <div className="mb-5 flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-[var(--gold-bright)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill={i < Math.round(avgRating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-[13px] text-[var(--muted)]">({product.reviews.length} reviews)</span>
            </div>

            <p className="mb-6 max-w-md text-[14px] leading-relaxed text-[var(--muted)]">
              {product.description}
            </p>

            <ProductDetailClient
              productId={product.id}
              slug={product.slug}
              name={product.name}
              brand={product.brand.name}
              basePrice={Number(product.basePrice)}
              imageUrl={product.imageUrl}
              variants={product.variants.map((v) => ({
                id: v.id,
                flavor: v.flavor,
                size: v.size,
                price: Number(v.price),
                stock: v.stock,
              }))}
            />

            <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-6">
              <div className="flex items-center gap-2.5 text-[12.5px] font-semibold">
                <Check className="h-4 w-4 text-[var(--gold-bright)]" /> 100% authentic, lab-verified
              </div>
              <div className="flex items-center gap-2.5 text-[12.5px] font-semibold">
                <Truck className="h-4 w-4 text-[var(--gold-bright)]" /> Fast, safe delivery nationwide
              </div>
              <div className="flex items-center gap-2.5 text-[12.5px] font-semibold">
                <ShieldCheck className="h-4 w-4 text-[var(--gold-bright)]" /> Secure checkout
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeatureStrip />
    </main>
  );
}