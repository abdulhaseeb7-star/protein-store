import Header from "@/components/shop/Header";
import FeatureStrip from "@/components/shop/FeatureStrip";
import ShopPageClient from "@/components/shop/ShopPageClient";
import { prisma } from "@/lib/prisma";

export default async function ShopPage() {
  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true },
      include: { brand: true, category: true, reviews: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  const formattedProducts = products.map((p) => {
    const avgRating =
      p.reviews.length > 0
        ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
        : 0;

    return {
      id: p.id,
      slug: p.slug,
      brand: p.brand.name,
      name: p.name,
      price: Number(p.basePrice),
      rating: avgRating,
      reviewCount: p.reviews.length,
      imageUrl: p.imageUrl,
      isBestseller: p.isFeatured,
      category: p.category.name,
    };
  });

  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <section className="px-12 py-12">
        <p className="mb-2 text-[11px] font-bold tracking-[2px] text-[var(--gold-bright)]">SHOP</p>
        <h1 className="mb-8 font-[var(--font-display)] text-[40px] uppercase">All products</h1>

        <ShopPageClient
          products={formattedProducts}
          categories={categories.map((c) => c.name)}
          brands={brands.map((b) => b.name)}
        />
      </section>
      <FeatureStrip />
    </main>
  );
}